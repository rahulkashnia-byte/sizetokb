"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { downloadBlob } from "@/lib/image";
import {
  exportEditedPdf,
  exportFilledFormPdf,
  extractFormFields,
  extractPageTextItems,
  hitTest,
  loadPdfDocument,
  paintAnnotations,
  renderPdfPage,
  uid,
  type Annotation,
  type FormFieldInfo,
  type PageTextItem,
  type PdfTool,
} from "@/lib/pdfEditor";

const COLORS = ["#111827", "#e85d04", "#dc2626", "#2563eb", "#16a34a", "#ca8a04", "#ffffff"];
const HIGHLIGHT = "#facc15";

type PdfJsDoc = Awaited<ReturnType<typeof loadPdfDocument>>["pdf"];

export function PdfEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [bytes, setBytes] = useState<ArrayBuffer | null>(null);
  const [pdf, setPdf] = useState<PdfJsDoc | null>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState({ w: 0, h: 0 });
  const [displayScale] = useState(1.35);
  const [annos, setAnnos] = useState<Annotation[]>([]);
  const [history, setHistory] = useState<Annotation[][]>([]);
  const [future, setFuture] = useState<Annotation[][]>([]);
  const [tool, setTool] = useState<PdfTool>("edit-text");
  const [color, setColor] = useState("#111827");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [fontSize, setFontSize] = useState(16);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draggingFile, setDraggingFile] = useState(false);
  const [textItems, setTextItems] = useState<PageTextItem[]>([]);
  const [formFields, setFormFields] = useState<FormFieldInfo[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string | boolean>>({});
  const [showTextLayer, setShowTextLayer] = useState(true);

  const stageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const draftRef = useRef<Annotation | null>(null);
  const dragMove = useRef<{
    id: string;
    ox: number;
    oy: number;
    start: Annotation;
    snapshot: Annotation[];
  } | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const clickPos = useRef<{ x: number; y: number } | null>(null);

  const pushHistory = useCallback(
    (next: Annotation[]) => {
      setHistory((h) => [...h.slice(-40), annos]);
      setFuture([]);
      setAnnos(next);
    },
    [annos]
  );

  const undo = () => {
    setHistory((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setFuture((f) => [annos, ...f]);
      setAnnos(prev);
      return h.slice(0, -1);
    });
  };

  const redo = () => {
    setFuture((f) => {
      if (!f.length) return f;
      const [next, ...rest] = f;
      setHistory((h) => [...h, annos]);
      setAnnos(next);
      return rest;
    });
  };

  const loadFile = async (f: File | null) => {
    setError(null);
    setAnnos([]);
    setHistory([]);
    setFuture([]);
    setSelectedId(null);
    setPage(0);
    setTextItems([]);
    setFormFields([]);
    setFormValues({});
    setFile(f);
    setBytes(null);
    setPageUrl(null);
    setPdf(null);
    if (!f) return;
    setBusy(true);
    setProgress("Loading PDF…");
    try {
      const loaded = await loadPdfDocument(f);
      setPdf(loaded.pdf);
      setBytes(loaded.bytes);
      setPageCount(loaded.pdf.numPages);
      setProgress("Reading form fields…");
      const fields = await extractFormFields(loaded.bytes, displayScale);
      setFormFields(fields);
      const vals: Record<string, string | boolean> = {};
      fields.forEach((field) => {
        vals[field.name] =
          field.type === "checkbox" ? !!field.checked : field.value;
      });
      setFormValues(vals);
      if (fields.length) setTool("form");
      else setTool("edit-text");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open PDF");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!pdf) return;
      setBusy(true);
      try {
        const { canvas, width, height } = await renderPdfPage(pdf, page, displayScale);
        if (cancelled) return;
        setPageUrl(canvas.toDataURL("image/jpeg", 0.92));
        setPageSize({ w: width, h: height });
        const items = await extractPageTextItems(pdf, page, displayScale);
        if (!cancelled) setTextItems(items);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Render failed");
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pdf, page, displayScale]);

  const pageAnnos = annos.filter((a) => a.page === page);
  const pageForms = formFields.filter((f) => f.pageIndex === page);

  useEffect(() => {
    const canvas = overlayRef.current;
    if (!canvas || !pageSize.w) return;
    canvas.width = pageSize.w;
    canvas.height = pageSize.h;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const draw = async () => {
      for (const a of pageAnnos) {
        if (a.kind === "image") {
          await new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, a.x, a.y, a.w, a.h);
              resolve();
            };
            img.onerror = () => resolve();
            img.src = a.dataUrl;
          });
        }
      }
      paintAnnotations(
        ctx,
        pageAnnos.filter((a) => a.kind !== "image" && a.kind !== "text")
      );
      // Added text drawn via HTML overlays for live edit — still paint non-selected on canvas? 
      // We use HTML for all text + textReplace for live editing, skip canvas text kinds
      if (draftRef.current && draftRef.current.page === page && draftRef.current.kind !== "text") {
        paintAnnotations(ctx, [draftRef.current].filter((a) => a.kind !== "image") as Annotation[]);
      }
      const sel = pageAnnos.find((a) => a.id === selectedId);
      if (
        sel &&
        (sel.kind === "image" ||
          sel.kind === "rect" ||
          sel.kind === "ellipse" ||
          sel.kind === "highlight")
      ) {
        ctx.save();
        ctx.strokeStyle = "#e85d04";
        ctx.setLineDash([4, 3]);
        ctx.lineWidth = 1.5;
        ctx.strokeRect(sel.x - 2, sel.y - 2, sel.w + 4, sel.h + 4);
        ctx.restore();
      }
    };
    void draw();
  }, [pageAnnos, pageSize, selectedId, page]);

  const toLocal = (e: React.PointerEvent) => {
    const el = stageRef.current;
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * pageSize.w,
      y: ((e.clientY - rect.top) / rect.height) * pageSize.h,
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!pdf || !pageSize.w) return;
    if (tool === "edit-text" || tool === "form") return; // HTML layer handles these
    const { x, y } = toLocal(e);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);

    if (tool === "select" || tool === "erase") {
      const hit = [...pageAnnos].reverse().find((a) => hitTest(a, x, y));
      if (tool === "erase") {
        if (hit) pushHistory(annos.filter((a) => a.id !== hit.id));
        setSelectedId(null);
        return;
      }
      if (hit) {
        setSelectedId(hit.id);
        dragMove.current = {
          id: hit.id,
          ox: x,
          oy: y,
          start: structuredClone(hit),
          snapshot: annos,
        };
      } else setSelectedId(null);
      return;
    }

    if (tool === "text") {
      const id = uid();
      const anno: Annotation = {
        id,
        kind: "text",
        page,
        x,
        y,
        w: Math.min(260, pageSize.w - x),
        h: fontSize * 1.6,
        text: "Type here",
        fontSize,
        color,
      };
      pushHistory([...annos, anno]);
      setSelectedId(id);
      return;
    }

    if (tool === "image") {
      clickPos.current = { x, y };
      imageInputRef.current?.click();
      return;
    }

    if (tool === "pen") {
      draftRef.current = {
        id: uid(),
        kind: "path",
        page,
        points: [{ x, y }],
        color,
        width: strokeWidth,
      };
      return;
    }

    if (tool === "highlight" || tool === "rect" || tool === "ellipse") {
      draftRef.current = {
        id: uid(),
        kind: tool === "highlight" ? "highlight" : tool,
        page,
        x,
        y,
        w: 0,
        h: 0,
        color: tool === "highlight" ? HIGHLIGHT : color,
        fill: tool !== "rect",
        strokeWidth: tool === "highlight" ? 0 : strokeWidth,
      };
      return;
    }

    if (tool === "line" || tool === "arrow") {
      draftRef.current = {
        id: uid(),
        kind: tool,
        page,
        x1: x,
        y1: y,
        x2: x,
        y2: y,
        color,
        width: strokeWidth,
      };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const { x, y } = toLocal(e);
    if (dragMove.current) {
      const { id, ox, oy, start } = dragMove.current;
      const dx = x - ox;
      const dy = y - oy;
      setAnnos((list) =>
        list.map((a) => {
          if (a.id !== id) return a;
          if (a.kind === "line" || a.kind === "arrow") {
            const s = start as Extract<Annotation, { kind: "line" | "arrow" }>;
            return { ...a, x1: s.x1 + dx, y1: s.y1 + dy, x2: s.x2 + dx, y2: s.y2 + dy };
          }
          if (a.kind === "path") {
            const s = start as Extract<Annotation, { kind: "path" }>;
            return { ...a, points: s.points.map((p) => ({ x: p.x + dx, y: p.y + dy })) };
          }
          if ("x" in start && "y" in start) {
            return { ...a, x: (start as { x: number }).x + dx, y: (start as { y: number }).y + dy };
          }
          return a;
        })
      );
      return;
    }
    const draft = draftRef.current;
    if (!draft) return;
    if (draft.kind === "path") {
      draft.points.push({ x, y });
      draftRef.current = { ...draft, points: [...draft.points] };
    } else if (draft.kind === "line" || draft.kind === "arrow") {
      draftRef.current = { ...draft, x2: x, y2: y };
    } else if (draft.kind === "rect" || draft.kind === "ellipse" || draft.kind === "highlight") {
      draftRef.current = { ...draft, w: x - draft.x, h: y - draft.y };
    }
    setPageSize((s) => ({ ...s }));
  };

  const onPointerUp = () => {
    if (dragMove.current) {
      const snap = dragMove.current.snapshot;
      dragMove.current = null;
      setHistory((h) => [...h.slice(-40), snap]);
      setFuture([]);
      return;
    }
    const draft = draftRef.current;
    draftRef.current = null;
    if (!draft) return;
    if (draft.kind === "path" && draft.points.length < 2) return;
    if (
      (draft.kind === "rect" || draft.kind === "ellipse" || draft.kind === "highlight") &&
      Math.abs(draft.w) < 4 &&
      Math.abs(draft.h) < 4
    )
      return;
    if (
      (draft.kind === "line" || draft.kind === "arrow") &&
      Math.hypot(draft.x2 - draft.x1, draft.y2 - draft.y1) < 4
    )
      return;

    let finalAnno: Annotation = draft;
    if (draft.kind === "rect" || draft.kind === "ellipse" || draft.kind === "highlight") {
      finalAnno = {
        ...draft,
        x: Math.min(draft.x, draft.x + draft.w),
        y: Math.min(draft.y, draft.y + draft.h),
        w: Math.abs(draft.w),
        h: Math.abs(draft.h),
      };
    }
    pushHistory([...annos, finalAnno]);
    setSelectedId(finalAnno.id);
  };

  const onImagePicked = async (list: FileList | null) => {
    const f = list?.[0];
    if (!f) return;
    const at = clickPos.current ?? { x: 40, y: 40 };
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(f);
    });
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = dataUrl;
    });
    const maxW = Math.min(220, pageSize.w * 0.45);
    const scale = maxW / img.naturalWidth;
    const anno: Annotation = {
      id: uid(),
      kind: "image",
      page,
      x: at.x,
      y: at.y,
      w: img.naturalWidth * scale,
      h: img.naturalHeight * scale,
      dataUrl,
    };
    pushHistory([...annos, anno]);
    setSelectedId(anno.id);
    setTool("select");
  };

  const applyExistingTextEdit = (item: PageTextItem, next: string) => {
    if (next === item.text) {
      // remove replace if reverted
      setAnnos((list) => list.filter((a) => !(a.kind === "textReplace" && a.id === item.id)));
      return;
    }
    const replace: Annotation = {
      id: item.id,
      kind: "textReplace",
      page: item.page,
      x: item.x,
      y: item.y,
      w: Math.max(item.w, next.length * item.fontSize * 0.55),
      h: item.h,
      text: next,
      fontSize: item.fontSize,
      color,
      original: item.text,
    };
    setAnnos((list) => {
      const without = list.filter((a) => a.id !== item.id);
      return [...without, replace];
    });
  };

  const updateAddedText = (id: string, text: string) => {
    setAnnos((list) => list.map((a) => (a.id === id && a.kind === "text" ? { ...a, text } : a)));
  };

  const hasAnnotates = annos.some((a) => a.kind !== "textReplace") || annos.some((a) => a.kind === "textReplace");
  // actually textReplace also needs flatten
  const needsFlatten = annos.length > 0;

  const exportPdf = async (mode: "smart" | "flatten" | "form-only") => {
    if (!pdf || !bytes) return;
    setBusy(true);
    setError(null);
    try {
      const base = file?.name.replace(/\.pdf$/i, "") || "document";
      const formDirty = Object.keys(formValues).length > 0 && formFields.length > 0;

      if (mode === "form-only" || (mode === "smart" && formDirty && !needsFlatten)) {
        setProgress("Saving form fields into PDF…");
        const blob = await exportFilledFormPdf(bytes, formValues, true);
        downloadBlob(blob, `${base}-filled.pdf`);
        return;
      }

      // If forms + annotations: fill forms first, reload, then flatten
      let pdfForFlat = pdf;
      if (formDirty) {
        setProgress("Applying form values…");
        const filled = await exportFilledFormPdf(bytes, formValues, false);
        const buf = await filled.arrayBuffer();
        const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
        GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        pdfForFlat = await getDocument({ data: new Uint8Array(buf) }).promise;
      }

      setProgress("Flattening pages with live edits…");
      const blob = await exportEditedPdf({
        pdf: pdfForFlat,
        annotations: annos,
        displayScale,
        onProgress: setProgress,
      });
      downloadBlob(blob, `${base}-edited.pdf`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const tools: { id: PdfTool; label: string }[] = [
    { id: "edit-text", label: "Edit text" },
    { id: "form", label: "Form fields" },
    { id: "text", label: "Add text" },
    { id: "select", label: "Select" },
    { id: "image", label: "Image" },
    { id: "pen", label: "Draw" },
    { id: "highlight", label: "Highlight" },
    { id: "rect", label: "Rect" },
    { id: "ellipse", label: "Ellipse" },
    { id: "line", label: "Line" },
    { id: "arrow", label: "Arrow" },
    { id: "erase", label: "Erase" },
  ];

  const replaceMap = new Map(
    annos.filter((a): a is Extract<Annotation, { kind: "textReplace" }> => a.kind === "textReplace").map((a) => [a.id, a])
  );
  const addedTexts = pageAnnos.filter((a): a is Extract<Annotation, { kind: "text" }> => a.kind === "text");

  return (
    <div className="space-y-4">
      {!pdf && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDraggingFile(true);
          }}
          onDragLeave={() => setDraggingFile(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDraggingFile(false);
            const f = e.dataTransfer.files?.[0];
            if (f?.type === "application/pdf" || f?.name.toLowerCase().endsWith(".pdf")) {
              void loadFile(f);
            }
          }}
          className={`rounded-3xl border-2 border-dashed p-10 text-center transition ${
            draggingFile ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--line)] bg-white"
          }`}
        >
          <p className="font-[family-name:var(--font-display)] text-xl font-bold">
            Drop PDF to edit text, forms & annotate
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Live text editing, AcroForm fill, highlights, drawings — private in your browser.
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-white"
          >
            Choose PDF
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => void loadFile(e.target.files?.[0] ?? null)}
          />
        </div>
      )}

      {pdf && (
        <>
          <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/50 p-3 text-sm text-[var(--ink)]">
            <strong>Edit text</strong> — click any existing text and type (covers & rewrites that
            line). <strong>Form fields</strong> — fill real PDF form fields when the file has them.{" "}
            <strong>Add text / draw</strong> — annotate like a markup editor.
          </div>

          <div className="sticky top-14 z-30 rounded-2xl border border-[var(--line)] bg-white/95 p-3 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-center gap-2">
              {tools.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTool(t.id)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${
                    tool === t.id ? "bg-[var(--ink)] text-white" : "border border-[var(--line)] bg-[var(--wash)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
              <div className="flex items-center gap-1">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`h-6 w-6 rounded-full border ${color === c ? "ring-2 ring-[var(--accent)]" : "border-[var(--line)]"}`}
                    style={{ background: c }}
                  />
                ))}
              </div>
              <button type="button" onClick={undo} className="rounded-lg border border-[var(--line)] px-2 py-1.5 text-xs font-bold">
                Undo
              </button>
              <button type="button" onClick={redo} className="rounded-lg border border-[var(--line)] px-2 py-1.5 text-xs font-bold">
                Redo
              </button>
              <label className="flex items-center gap-1 text-[11px] font-semibold">
                <input type="checkbox" checked={showTextLayer} onChange={(e) => setShowTextLayer(e.target.checked)} />
                Show text boxes
              </label>
              <button
                type="button"
                disabled={busy}
                onClick={() => void exportPdf("smart")}
                className="ml-auto rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-bold text-white disabled:opacity-60"
              >
                {busy ? "Saving…" : "Download edited PDF"}
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <button type="button" disabled={page <= 0} onClick={() => setPage((p) => p - 1)} className="rounded border border-[var(--line)] px-2 py-1 font-bold disabled:opacity-40">
                ← Prev
              </button>
              <span className="font-semibold text-[var(--muted)]">
                Page {page + 1} / {pageCount}
              </span>
              <button type="button" disabled={page >= pageCount - 1} onClick={() => setPage((p) => p + 1)} className="rounded border border-[var(--line)] px-2 py-1 font-bold disabled:opacity-40">
                Next →
              </button>
              {formFields.length > 0 && (
                <span className="rounded bg-emerald-50 px-2 py-1 font-semibold text-emerald-800">
                  {formFields.length} form field(s) detected
                </span>
              )}
              <button type="button" onClick={() => void loadFile(null)} className="rounded border border-[var(--line)] px-2 py-1 font-semibold text-[var(--muted)]">
                Close
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="overflow-auto rounded-2xl border border-[var(--line)] bg-[#2a3140] p-3 sm:p-4">
              <div
                ref={stageRef}
                className="relative mx-auto touch-none shadow-2xl"
                style={{
                  width: "min(100%, 900px)",
                  aspectRatio: `${pageSize.w || 1} / ${pageSize.h || 1}`,
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                {pageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pageUrl} alt="" className="pointer-events-none absolute inset-0 h-full w-full select-none" draggable={false} />
                )}
                <canvas ref={overlayRef} className="pointer-events-none absolute inset-0 h-full w-full" />

                {/* Live existing text editors */}
                {showTextLayer &&
                  (tool === "edit-text" || tool === "select") &&
                  textItems.map((item) => {
                    const edited = replaceMap.get(item.id);
                    return (
                      <textarea
                        key={item.id}
                        defaultValue={edited?.text ?? item.text}
                        onBlur={(e) => applyExistingTextEdit(item, e.target.value)}
                        className="absolute resize-none overflow-hidden border border-sky-400/80 bg-sky-200/25 p-0.5 leading-tight text-[var(--ink)] outline-none focus:bg-white/95 focus:ring-2 focus:ring-[var(--accent)]"
                        style={{
                          left: `${(item.x / pageSize.w) * 100}%`,
                          top: `${(item.y / pageSize.h) * 100}%`,
                          width: `${(Math.max(item.w, 40) / pageSize.w) * 100}%`,
                          height: `${(Math.max(item.h, item.fontSize) / pageSize.h) * 100}%`,
                          fontSize: `${Math.max(10, item.fontSize * 0.95)}px`,
                          pointerEvents: tool === "edit-text" ? "auto" : "none",
                        }}
                      />
                    );
                  })}

                {/* Live added text */}
                {addedTexts.map((a) => (
                  <textarea
                    key={a.id}
                    value={a.text}
                    onChange={(e) => updateAddedText(a.id, e.target.value)}
                    onFocus={() => setSelectedId(a.id)}
                    className="absolute resize-none border border-[var(--accent)] bg-white/90 p-1 outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    style={{
                      left: `${(a.x / pageSize.w) * 100}%`,
                      top: `${(a.y / pageSize.h) * 100}%`,
                      width: `${(a.w / pageSize.w) * 100}%`,
                      minHeight: `${(a.h / pageSize.h) * 100}%`,
                      fontSize: `${a.fontSize}px`,
                      color: a.color,
                      pointerEvents: "auto",
                    }}
                  />
                ))}

                {/* Form field widgets on page */}
                {(tool === "form" || tool === "select") &&
                  pageForms.map((field) => (
                    <div
                      key={field.name}
                      className="absolute"
                      style={{
                        left: `${(field.x / pageSize.w) * 100}%`,
                        top: `${(field.y / pageSize.h) * 100}%`,
                        width: `${(field.w / pageSize.w) * 100}%`,
                        height: `${(field.h / pageSize.h) * 100}%`,
                        pointerEvents: tool === "form" ? "auto" : "none",
                      }}
                    >
                      {field.type === "checkbox" ? (
                        <input
                          type="checkbox"
                          className="h-full w-full"
                          checked={!!formValues[field.name]}
                          onChange={(e) =>
                            setFormValues((v) => ({ ...v, [field.name]: e.target.checked }))
                          }
                        />
                      ) : field.type === "dropdown" || field.type === "radio" ? (
                        <select
                          className="h-full w-full rounded border border-emerald-500 bg-emerald-50/90 text-xs"
                          value={String(formValues[field.name] ?? "")}
                          onChange={(e) =>
                            setFormValues((v) => ({ ...v, [field.name]: e.target.value }))
                          }
                        >
                          <option value="">—</option>
                          {(field.options ?? []).map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="h-full w-full rounded border border-emerald-500 bg-emerald-50/90 px-1 text-xs"
                          value={String(formValues[field.name] ?? "")}
                          onChange={(e) =>
                            setFormValues((v) => ({ ...v, [field.name]: e.target.value }))
                          }
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <aside className="space-y-3">
              <div className="rounded-2xl border border-[var(--line)] bg-white p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Form fields ({formFields.length})
                </p>
                {formFields.length === 0 ? (
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    No AcroForm fields in this PDF. You can still edit text & annotate. (Scanned /
                    flat PDFs have no fillable fields.)
                  </p>
                ) : (
                  <ul className="mt-2 max-h-72 space-y-2 overflow-y-auto">
                    {formFields.map((field) => (
                      <li key={field.name} className="text-xs">
                        <button
                          type="button"
                          className="mb-1 font-semibold text-[var(--accent-ink)]"
                          onClick={() => {
                            setTool("form");
                            setPage(field.pageIndex);
                          }}
                        >
                          {field.name}
                        </button>
                        {field.type === "checkbox" ? (
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={!!formValues[field.name]}
                              onChange={(e) =>
                                setFormValues((v) => ({ ...v, [field.name]: e.target.checked }))
                              }
                            />
                            Checked
                          </label>
                        ) : (
                          <input
                            className="w-full rounded border border-[var(--line)] px-2 py-1"
                            value={String(formValues[field.name] ?? "")}
                            onChange={(e) =>
                              setFormValues((v) => ({ ...v, [field.name]: e.target.value }))
                            }
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {formFields.length > 0 && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void exportPdf("form-only")}
                    className="mt-3 w-full rounded-lg border border-[var(--line)] py-2 text-xs font-bold"
                  >
                    Download form-filled PDF (keeps real fields)
                  </button>
                )}
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-white p-3 text-xs leading-relaxed text-[var(--muted)]">
                <p className="font-bold text-[var(--ink)]">Why not 100% like iLovePDF?</p>
                <p className="mt-1">
                  iLovePDF uses a proprietary PDF engine (often server-side) that rewrites PDF
                  content streams, fonts, and XFA. Open-source browser stacks can&apos;t fully mutate
                  every existing text run safely. We give you the closest private alternative: live
                  edit overlays, real AcroForm fill, and annotation export.
                </p>
              </div>
            </aside>
          </div>
        </>
      )}

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          void onImagePicked(e.target.files);
          e.target.value = "";
        }}
      />

      {progress && <p className="text-center text-sm text-[var(--muted)]">{progress}</p>}
      {error && <p className="text-center text-sm text-amber-700">{error}</p>}
    </div>
  );
}
