import { clinic } from "@/content/site";

const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Floss & Gloss <onboarding@resend.dev>";

export type SendClinicEmailResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "provider-error" };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendClinicEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<SendClinicEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { ok: false, reason: "not-configured" };

  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [clinic.email],
      subject,
      text,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;white-space:pre-wrap">${escapeHtml(text)}</div>`,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
    signal: AbortSignal.timeout(12_000),
  }).catch(() => null);

  if (!response?.ok) return { ok: false, reason: "provider-error" };

  const result: unknown = await response.json().catch(() => null);
  return result !== null && typeof result === "object" && "id" in result && typeof result.id === "string"
    ? { ok: true }
    : { ok: false, reason: "provider-error" };
}

export function sendResultResponse(result: SendClinicEmailResult): Response {
  if (result.ok) return Response.json({ ok: true });

  if (result.reason === "not-configured") {
    return Response.json(
      { error: "Email sending is not configured yet. Please call, WhatsApp, or email the clinic directly." },
      { status: 503 },
    );
  }

  return Response.json(
    { error: "We could not send your message just now. Please try again or contact the clinic directly." },
    { status: 502 },
  );
}
