"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CATEGORIES,
  COMPUTER_OPTIONS,
  EXAM_PRESETS,
  GENDERS,
  JOB_PACKS,
  MARITAL,
  SOFT_SKILL_OPTIONS,
  STORAGE_KEY,
  createEmptyBiodata,
  emptyCert,
  emptyEducation,
  emptyExperience,
  emptyLanguage,
  requiredMissing,
  type BiodataData,
  type JobPackId,
  type SkillChip,
  type SkillLevel,
} from "@/lib/biodata";

const inputCls =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]";
const labelCls = "mb-1.5 block text-sm font-semibold text-[var(--ink)]";

function toggleChip(
  list: SkillChip[],
  label: string,
  on: boolean,
  level: SkillLevel = "working"
): SkillChip[] {
  if (on) {
    if (list.some((s) => s.label === label)) return list;
    return [...list, { id: `${label}-${Date.now()}`, label, level }];
  }
  return list.filter((s) => s.label !== label);
}

function Section({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-white p-4 sm:p-5">
      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]">{title}</h2>
      {sub ? <p className="mt-1 text-sm text-[var(--muted)]">{sub}</p> : null}
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelCls}>
        {label}
        {required ? <span className="text-amber-700"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

export function BiodataMaker() {
  const [data, setData] = useState<BiodataData>(() => createEmptyBiodata());
  const [hydrated, setHydrated] = useState(false);
  const [printWarn, setPrintWarn] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as BiodataData;
        setData({ ...createEmptyBiodata(), ...parsed });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      // Keep photo in draft too (may be large); still client-only.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* quota — drop photo and retry */
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, photoDataUrl: null }));
      } catch {
        /* ignore */
      }
    }
  }, [data, hydrated]);

  const missing = useMemo(() => requiredMissing(data), [data]);

  function patch(partial: Partial<BiodataData>) {
    setData((d) => ({ ...d, ...partial }));
  }

  function onPhoto(file: File | null) {
    if (!file) {
      patch({ photoDataUrl: null });
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file (JPG/PNG).");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      alert("Photo is larger than 4 MB. Compress it first (SizeToKB), then upload.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      patch({ photoDataUrl: result });
    };
    reader.readAsDataURL(file);
  }

  function applyPreset(id: string) {
    const preset = EXAM_PRESETS.find((p) => p.id === id);
    if (!preset) return;
    const computerSkills = preset.computer.map((label) => ({
      id: `c-${label}`,
      label,
      level: "working" as SkillLevel,
    }));
    const packSkills: SkillChip[] = [];
    for (const packId of preset.packs) {
      const pack = JOB_PACKS.find((p) => p.id === packId);
      if (!pack) continue;
      for (const label of pack.skills) {
        packSkills.push({ id: `p-${label}`, label, level: "working" });
      }
    }
    patch({
      applyingFor: preset.applyingFor,
      jobPacks: preset.packs,
      computerSkills,
      packSkills,
    });
  }

  function togglePack(id: JobPackId) {
    const on = !data.jobPacks.includes(id);
    const packs = on ? [...data.jobPacks, id] : data.jobPacks.filter((p) => p !== id);
    const pack = JOB_PACKS.find((p) => p.id === id);
    let packSkills = data.packSkills;
    if (pack) {
      if (on) {
        for (const label of pack.skills) {
          packSkills = toggleChip(packSkills, label, true);
        }
      } else {
        const drop = new Set(pack.skills);
        packSkills = packSkills.filter((s) => !drop.has(s.label));
      }
    }
    patch({ jobPacks: packs, packSkills });
  }

  function handlePrint() {
    const miss = requiredMissing(data);
    setPrintWarn(miss);
    if (miss.length) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.print();
  }

  const corrAddress = data.sameAddress ? data.permanentAddress : data.correspondenceAddress;

  return (
    <div className="biodata-app pb-20">
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .biodata-print, .biodata-print * { visibility: visible !important; }
          .biodata-print {
            position: absolute !important;
            left: 0; top: 0; width: 100%;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
            padding: 12mm !important;
          }
          .no-print { display: none !important; }
          @page { margin: 12mm; }
        }
      `}</style>

      <div className="no-print mb-6 flex flex-wrap items-center gap-2">
        {EXAM_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyPreset(p.id)}
            className="rounded-lg border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
          >
            Preset: {p.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            if (confirm("Clear all biodata fields on this device?")) {
              setData(createEmptyBiodata());
              localStorage.removeItem(STORAGE_KEY);
            }
          }}
          className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-[var(--wash)]"
        >
          Clear draft
        </button>
      </div>

      {printWarn.length > 0 ? (
        <div className="no-print mb-4 rounded-xl border border-amber-600/30 bg-[var(--wash)] px-4 py-3 text-sm text-amber-700">
          Fill required fields before printing: {printWarn.join(", ")}.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <div className="no-print space-y-4">
          <Section
            title="1. Photo & profile"
            sub="Photo stays on your device only — never uploaded to our servers."
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-36 w-28 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[var(--line)] bg-[var(--wash)]">
                  {data.photoDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={data.photoDataUrl} alt="Passport photo preview" className="h-full w-full object-cover" />
                  ) : (
                    <span className="px-2 text-center text-xs text-[var(--muted)]">Passport photo</span>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => onPhoto(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-bold text-white"
                  onClick={() => fileRef.current?.click()}
                >
                  Upload photo
                </button>
                {data.photoDataUrl ? (
                  <button
                    type="button"
                    className="text-xs font-semibold text-amber-700"
                    onClick={() => {
                      patch({ photoDataUrl: null });
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                  >
                    Remove photo
                  </button>
                ) : null}
                <Link
                  href="/compress-to-50kb/"
                  className="text-center text-[0.7rem] font-semibold text-[var(--accent-ink)] hover:underline"
                >
                  Compress photo to 50KB first →
                </Link>
              </div>
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input className={inputCls} value={data.fullName} onChange={(e) => patch({ fullName: e.target.value })} />
                </Field>
                <Field label="Father's / husband's name" required>
                  <input className={inputCls} value={data.fatherName} onChange={(e) => patch({ fatherName: e.target.value })} />
                </Field>
                <Field label="Mother's name">
                  <input className={inputCls} value={data.motherName} onChange={(e) => patch({ motherName: e.target.value })} />
                </Field>
                <Field label="Date of birth" required>
                  <input type="date" className={inputCls} value={data.dob} onChange={(e) => patch({ dob: e.target.value })} />
                </Field>
                <Field label="Gender" required>
                  <select className={inputCls} value={data.gender} onChange={(e) => patch({ gender: e.target.value })}>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Category" required>
                  <select className={inputCls} value={data.category} onChange={(e) => patch({ category: e.target.value })}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Nationality">
                  <input className={inputCls} value={data.nationality} onChange={(e) => patch({ nationality: e.target.value })} />
                </Field>
                <Field label="Religion">
                  <input className={inputCls} value={data.religion} onChange={(e) => patch({ religion: e.target.value })} />
                </Field>
                <Field label="Marital status">
                  <select className={inputCls} value={data.maritalStatus} onChange={(e) => patch({ maritalStatus: e.target.value })}>
                    {MARITAL.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Applying for / target post">
                  <input className={inputCls} value={data.applyingFor} onChange={(e) => patch({ applyingFor: e.target.value })} placeholder="e.g. IBPS Clerk / SSC CHSL" />
                </Field>
              </div>
            </div>
            <Field label="Short objective (optional)">
              <textarea rows={2} className={inputCls} value={data.objective} onChange={(e) => patch({ objective: e.target.value })} />
            </Field>
          </Section>

          <Section title="2. Contact & address">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Mobile" required>
                <input className={inputCls} value={data.mobile} onChange={(e) => patch({ mobile: e.target.value })} />
              </Field>
              <Field label="Email" required>
                <input type="email" className={inputCls} value={data.email} onChange={(e) => patch({ email: e.target.value })} />
              </Field>
            </div>
            <Field label="Permanent address" required>
              <textarea rows={2} className={inputCls} value={data.permanentAddress} onChange={(e) => patch({ permanentAddress: e.target.value })} />
            </Field>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="District">
                <input className={inputCls} value={data.district} onChange={(e) => patch({ district: e.target.value })} />
              </Field>
              <Field label="State" required>
                <input className={inputCls} value={data.state} onChange={(e) => patch({ state: e.target.value })} />
              </Field>
              <Field label="PIN" required>
                <input className={inputCls} value={data.pin} onChange={(e) => patch({ pin: e.target.value })} />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={data.sameAddress}
                onChange={(e) => patch({ sameAddress: e.target.checked })}
                className="accent-[var(--accent)]"
              />
              Correspondence address same as permanent
            </label>
            {!data.sameAddress ? (
              <Field label="Correspondence address">
                <textarea rows={2} className={inputCls} value={data.correspondenceAddress} onChange={(e) => patch({ correspondenceAddress: e.target.value })} />
              </Field>
            ) : null}
          </Section>

          <Section title="3. Education" sub="At least one complete row is required.">
            {data.education.map((row, i) => (
              <div key={row.id} className="grid gap-2 rounded-xl border border-[var(--line)] bg-[var(--wash)] p-3 sm:grid-cols-2">
                <input placeholder="Exam / degree *" className={inputCls} value={row.exam} onChange={(e) => {
                  const education = [...data.education];
                  education[i] = { ...row, exam: e.target.value };
                  patch({ education });
                }} />
                <input placeholder="Board / University *" className={inputCls} value={row.board} onChange={(e) => {
                  const education = [...data.education];
                  education[i] = { ...row, board: e.target.value };
                  patch({ education });
                }} />
                <input placeholder="Year *" className={inputCls} value={row.year} onChange={(e) => {
                  const education = [...data.education];
                  education[i] = { ...row, year: e.target.value };
                  patch({ education });
                }} />
                <input placeholder="% / CGPA *" className={inputCls} value={row.score} onChange={(e) => {
                  const education = [...data.education];
                  education[i] = { ...row, score: e.target.value };
                  patch({ education });
                }} />
                <input placeholder="Subjects / stream" className={`${inputCls} sm:col-span-2`} value={row.subjects} onChange={(e) => {
                  const education = [...data.education];
                  education[i] = { ...row, subjects: e.target.value };
                  patch({ education });
                }} />
                <button type="button" className="text-left text-xs font-semibold text-amber-700 sm:col-span-2" onClick={() => patch({ education: data.education.filter((e) => e.id !== row.id) })}>
                  Remove row
                </button>
              </div>
            ))}
            <button type="button" className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold" onClick={() => patch({ education: [...data.education, emptyEducation()] })}>
              + Add education
            </button>
          </Section>

          <Section title="4. Experience & training" sub="Optional — add jobs, internships or vocational training.">
            {data.experience.map((row, i) => (
              <div key={row.id} className="grid gap-2 rounded-xl border border-[var(--line)] bg-[var(--wash)] p-3 sm:grid-cols-2">
                <input placeholder="Organisation / institute" className={inputCls} value={row.org} onChange={(e) => {
                  const experience = [...data.experience];
                  experience[i] = { ...row, org: e.target.value };
                  patch({ experience });
                }} />
                <input placeholder="Post / course" className={inputCls} value={row.role} onChange={(e) => {
                  const experience = [...data.experience];
                  experience[i] = { ...row, role: e.target.value };
                  patch({ experience });
                }} />
                <input placeholder="From" className={inputCls} value={row.from} onChange={(e) => {
                  const experience = [...data.experience];
                  experience[i] = { ...row, from: e.target.value };
                  patch({ experience });
                }} />
                <input placeholder="To" className={inputCls} value={row.to} onChange={(e) => {
                  const experience = [...data.experience];
                  experience[i] = { ...row, to: e.target.value };
                  patch({ experience });
                }} />
                <input placeholder="Key work / details" className={`${inputCls} sm:col-span-2`} value={row.detail} onChange={(e) => {
                  const experience = [...data.experience];
                  experience[i] = { ...row, detail: e.target.value };
                  patch({ experience });
                }} />
                <button type="button" className="text-left text-xs font-semibold text-amber-700 sm:col-span-2" onClick={() => patch({ experience: data.experience.filter((e) => e.id !== row.id) })}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold" onClick={() => patch({ experience: [...data.experience, emptyExperience()] })}>
              + Add experience
            </button>
          </Section>

          <Section title="5. Skills studio" sub="Pick packs and chips — this is what makes a sarkari biodata look complete.">
            <div>
              <p className={labelCls}>Job-family packs</p>
              <div className="flex flex-wrap gap-2">
                {JOB_PACKS.map((pack) => {
                  const on = data.jobPacks.includes(pack.id);
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => togglePack(pack.id)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                        on ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-ink)]" : "border-[var(--line)] bg-white text-[var(--ink)]"
                      }`}
                    >
                      {pack.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {data.packSkills.length > 0 ? (
              <div>
                <p className={labelCls}>Pack skills (tap to remove)</p>
                <div className="flex flex-wrap gap-2">
                  {data.packSkills.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className="rounded-lg border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium"
                      onClick={() => patch({ packSkills: data.packSkills.filter((x) => x.id !== s.id) })}
                    >
                      {s.label} ×
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <p className={labelCls}>Computer & digital</p>
              <div className="flex flex-wrap gap-2">
                {COMPUTER_OPTIONS.map((label) => {
                  const on = data.computerSkills.some((s) => s.label === label);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        patch({ computerSkills: toggleChip(data.computerSkills, label, !on) })
                      }
                      className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                        on ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-ink)]" : "border-[var(--line)] bg-white"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="English typing (WPM)">
                <input className={inputCls} value={data.typingEnglish} onChange={(e) => patch({ typingEnglish: e.target.value })} placeholder="e.g. 35" />
              </Field>
              <Field label="Hindi typing (WPM)">
                <input className={inputCls} value={data.typingHindi} onChange={(e) => patch({ typingHindi: e.target.value })} placeholder="e.g. 30" />
              </Field>
              <Field label="Stenography">
                <input className={inputCls} value={data.stenography} onChange={(e) => patch({ stenography: e.target.value })} placeholder="e.g. Eng 80 wpm" />
              </Field>
            </div>

            <div>
              <p className={labelCls}>Languages</p>
              {data.languages.map((row, i) => (
                <div key={row.id} className="mb-2 flex flex-wrap items-center gap-2">
                  <input className={`${inputCls} max-w-[140px]`} value={row.name} onChange={(e) => {
                    const languages = [...data.languages];
                    languages[i] = { ...row, name: e.target.value };
                    patch({ languages });
                  }} />
                  {(["read", "write", "speak"] as const).map((k) => (
                    <label key={k} className="flex items-center gap-1 text-xs capitalize">
                      <input
                        type="checkbox"
                        checked={row[k]}
                        onChange={(e) => {
                          const languages = [...data.languages];
                          languages[i] = { ...row, [k]: e.target.checked };
                          patch({ languages });
                        }}
                        className="accent-[var(--accent)]"
                      />
                      {k}
                    </label>
                  ))}
                  <button type="button" className="text-xs font-semibold text-amber-700" onClick={() => patch({ languages: data.languages.filter((l) => l.id !== row.id) })}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-semibold" onClick={() => patch({ languages: [...data.languages, emptyLanguage()] })}>
                + Language
              </button>
            </div>

            <div>
              <p className={labelCls}>Soft skills</p>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILL_OPTIONS.map((label) => {
                  const on = data.softSkills.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        patch({
                          softSkills: on
                            ? data.softSkills.filter((s) => s !== label)
                            : [...data.softSkills, label],
                        })
                      }
                      className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                        on ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-ink)]" : "border-[var(--line)] bg-white"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className={labelCls}>Certifications / achievements</p>
              {data.certifications.map((row, i) => (
                <div key={row.id} className="mb-2 grid gap-2 sm:grid-cols-3">
                  <input placeholder="Certificate" className={inputCls} value={row.name} onChange={(e) => {
                    const certifications = [...data.certifications];
                    certifications[i] = { ...row, name: e.target.value };
                    patch({ certifications });
                  }} />
                  <input placeholder="Year" className={inputCls} value={row.year} onChange={(e) => {
                    const certifications = [...data.certifications];
                    certifications[i] = { ...row, year: e.target.value };
                    patch({ certifications });
                  }} />
                  <input placeholder="Authority" className={inputCls} value={row.authority} onChange={(e) => {
                    const certifications = [...data.certifications];
                    certifications[i] = { ...row, authority: e.target.value };
                    patch({ certifications });
                  }} />
                </div>
              ))}
              <button type="button" className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-semibold" onClick={() => patch({ certifications: [...data.certifications, emptyCert()] })}>
                + Certificate
              </button>
            </div>

            <Field label="Other skills (free text)">
              <textarea rows={2} className={inputCls} value={data.otherSkills} onChange={(e) => patch({ otherSkills: e.target.value })} placeholder="Anything else worth mentioning…" />
            </Field>
          </Section>

          <Section title="6. Extra (police / physical forms)" sub="Leave blank if not needed.">
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Height">
                <input className={inputCls} value={data.height} onChange={(e) => patch({ height: e.target.value })} placeholder="e.g. 168 cm" />
              </Field>
              <Field label="Weight">
                <input className={inputCls} value={data.weight} onChange={(e) => patch({ weight: e.target.value })} placeholder="e.g. 62 kg" />
              </Field>
              <Field label="Identification marks">
                <input className={inputCls} value={data.idMarks} onChange={(e) => patch({ idMarks: e.target.value })} />
              </Field>
            </div>
          </Section>

          <Section title="7. Declaration">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Place" required>
                <input className={inputCls} value={data.place} onChange={(e) => patch({ place: e.target.value })} />
              </Field>
              <Field label="Date" required>
                <input type="date" className={inputCls} value={data.declarationDate} onChange={(e) => patch({ declarationDate: e.target.value })} />
              </Field>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Also useful:{" "}
              <Link href="/passport-photo/" className="font-semibold text-[var(--accent-ink)]">
                passport photo maker
              </Link>{" "}
              ·{" "}
              <Link href="/signature-cleaner/" className="font-semibold text-[var(--accent-ink)]">
                signature to 10–20KB
              </Link>{" "}
              ·{" "}
              <Link href="/form-wizard/" className="font-semibold text-[var(--accent-ink)]">
                form photo pack
              </Link>
            </p>
          </Section>

          <div className="sticky bottom-3 z-10 flex flex-wrap gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 p-3 shadow-sm backdrop-blur">
            <button type="button" className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white" onClick={handlePrint}>
              Print / Save as PDF
            </button>
            <p className="self-center text-xs text-[var(--muted)]">
              {missing.length
                ? `${missing.length} required field(s) left`
                : "Ready to print — use browser Save as PDF"}
            </p>
          </div>
        </div>

        {/* Preview */}
        <aside className="biodata-print rounded-2xl border border-[var(--line)] bg-white p-5 text-[0.82rem] leading-snug text-[var(--ink)] shadow-sm lg:sticky lg:top-24 lg:self-start">
          <div className="flex gap-3 border-b border-[var(--line)] pb-3">
            <div className="min-w-0 flex-1">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]">
                Bio-data / Resume
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em]">
                {data.fullName || "Your name"}
              </h2>
              {data.applyingFor ? (
                <p className="mt-0.5 text-[var(--muted)]">Applying for: {data.applyingFor}</p>
              ) : null}
              <p className="mt-1 text-[var(--muted)]">
                {[data.mobile, data.email].filter(Boolean).join(" · ") || "Mobile · Email"}
              </p>
            </div>
            <div className="h-28 w-[5.5rem] shrink-0 overflow-hidden rounded border border-[var(--line)] bg-[var(--wash)]">
              {data.photoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.photoDataUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center px-1 text-center text-[0.65rem] text-[var(--muted)]">
                  Photo
                </div>
              )}
            </div>
          </div>

          {data.objective ? (
            <p className="mt-3 text-[var(--muted)]">{data.objective}</p>
          ) : null}

          <PreviewBlock title="Personal details">
            <PreviewLine label="Father / Husband" value={data.fatherName} />
            <PreviewLine label="Mother" value={data.motherName} />
            <PreviewLine label="Date of birth" value={data.dob} />
            <PreviewLine label="Gender" value={data.gender} />
            <PreviewLine label="Category" value={data.category} />
            <PreviewLine label="Nationality" value={data.nationality} />
            <PreviewLine label="Religion" value={data.religion} />
            <PreviewLine label="Marital status" value={data.maritalStatus} />
            {(data.height || data.weight) && (
              <PreviewLine label="Height / Weight" value={[data.height, data.weight].filter(Boolean).join(" / ")} />
            )}
            {data.idMarks ? <PreviewLine label="ID marks" value={data.idMarks} /> : null}
          </PreviewBlock>

          <PreviewBlock title="Address">
            <p>{data.permanentAddress || "—"}</p>
            <p className="mt-1 text-[var(--muted)]">
              {[data.district, data.state, data.pin].filter(Boolean).join(", ")}
            </p>
            {!data.sameAddress && corrAddress ? (
              <p className="mt-2">
                <span className="font-semibold">Correspondence: </span>
                {corrAddress}
              </p>
            ) : null}
          </PreviewBlock>

          <PreviewBlock title="Education">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[0.65rem] uppercase text-[var(--muted)]">
                  <th className="pb-1 pr-2">Exam</th>
                  <th className="pb-1 pr-2">Board</th>
                  <th className="pb-1 pr-2">Year</th>
                  <th className="pb-1">Score</th>
                </tr>
              </thead>
              <tbody>
                {data.education
                  .filter((e) => e.exam.trim())
                  .map((e) => (
                    <tr key={e.id} className="border-t border-[var(--line)]/80">
                      <td className="py-1 pr-2 align-top">
                        <div className="font-medium">{e.exam}</div>
                        {e.subjects ? <div className="text-[0.72rem] text-[var(--muted)]">{e.subjects}</div> : null}
                      </td>
                      <td className="py-1 pr-2 align-top">{e.board || "—"}</td>
                      <td className="py-1 pr-2 align-top">{e.year || "—"}</td>
                      <td className="py-1 align-top">{e.score || "—"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </PreviewBlock>

          {data.experience.some((e) => e.org.trim() || e.role.trim()) ? (
            <PreviewBlock title="Experience / training">
              <ul className="space-y-2">
                {data.experience
                  .filter((e) => e.org.trim() || e.role.trim())
                  .map((e) => (
                    <li key={e.id}>
                      <span className="font-semibold">{e.role || "Role"}</span>
                      {e.org ? ` — ${e.org}` : ""}
                      {(e.from || e.to) && (
                        <span className="text-[var(--muted)]"> ({[e.from, e.to].filter(Boolean).join(" – ")})</span>
                      )}
                      {e.detail ? <div className="text-[var(--muted)]">{e.detail}</div> : null}
                    </li>
                  ))}
              </ul>
            </PreviewBlock>
          ) : null}

          <PreviewBlock title="Skills">
            {data.languages.some((l) => l.name.trim()) ? (
              <p className="mb-1">
                <span className="font-semibold">Languages: </span>
                {data.languages
                  .filter((l) => l.name.trim())
                  .map((l) => {
                    const bits = [
                      l.read ? "R" : null,
                      l.write ? "W" : null,
                      l.speak ? "S" : null,
                    ].filter(Boolean);
                    return `${l.name}${bits.length ? ` (${bits.join("/")})` : ""}`;
                  })
                  .join("; ")}
              </p>
            ) : null}
            {(data.typingEnglish || data.typingHindi || data.stenography) && (
              <p className="mb-1">
                <span className="font-semibold">Typing / Steno: </span>
                {[
                  data.typingEnglish && `Eng ${data.typingEnglish} WPM`,
                  data.typingHindi && `Hindi ${data.typingHindi} WPM`,
                  data.stenography,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            {data.computerSkills.length > 0 ? (
              <p className="mb-1">
                <span className="font-semibold">Computer: </span>
                {data.computerSkills.map((s) => s.label).join(", ")}
              </p>
            ) : null}
            {data.packSkills.length > 0 ? (
              <p className="mb-1">
                <span className="font-semibold">Job skills: </span>
                {data.packSkills.map((s) => s.label).join(", ")}
              </p>
            ) : null}
            {data.softSkills.length > 0 ? (
              <p className="mb-1">
                <span className="font-semibold">Soft skills: </span>
                {data.softSkills.join(", ")}
              </p>
            ) : null}
            {data.otherSkills ? (
              <p>
                <span className="font-semibold">Other: </span>
                {data.otherSkills}
              </p>
            ) : null}
          </PreviewBlock>

          {data.certifications.some((c) => c.name.trim()) ? (
            <PreviewBlock title="Certifications">
              <ul className="list-disc space-y-1 pl-4">
                {data.certifications
                  .filter((c) => c.name.trim())
                  .map((c) => (
                    <li key={c.id}>
                      {c.name}
                      {c.year ? ` (${c.year})` : ""}
                      {c.authority ? ` — ${c.authority}` : ""}
                    </li>
                  ))}
              </ul>
            </PreviewBlock>
          ) : null}

          <PreviewBlock title="Declaration">
            <p className="text-[var(--muted)]">
              I hereby declare that the information given above is true to the best of my knowledge
              and belief.
            </p>
            <div className="mt-6 flex justify-between gap-4">
              <div>
                <p>Place: {data.place || "________"}</p>
                <p>Date: {data.declarationDate || "________"}</p>
              </div>
              <div className="text-right">
                <p className="mb-8 text-[var(--muted)]">Signature</p>
                <p className="font-semibold">{data.fullName || "________"}</p>
              </div>
            </div>
          </PreviewBlock>

          <p className="no-print mt-4 text-[0.7rem] text-[var(--muted)]">
            Live preview — use Print / Save as PDF when ready. Draft auto-saves in this browser.
          </p>
        </aside>
      </div>
    </div>
  );
}

function PreviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 border-b border-[var(--line)] pb-3 last:border-0">
      <h3 className="mb-1.5 text-[0.7rem] font-bold uppercase tracking-[0.05em] text-[var(--accent)]">{title}</h3>
      {children}
    </div>
  );
}

function PreviewLine({ label, value }: { label: string; value?: string }) {
  if (!value?.trim()) return null;
  return (
    <p>
      <span className="font-semibold">{label}: </span>
      {value}
    </p>
  );
}
