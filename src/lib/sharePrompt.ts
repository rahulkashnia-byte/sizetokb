/** Fire after a successful download so ShareAfterDownload can show WhatsApp CTA. */
export function triggerSharePrompt() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("stk-share-prompt"));
}

export const SHARE_PROMPT_EVENT = "stk-share-prompt";
