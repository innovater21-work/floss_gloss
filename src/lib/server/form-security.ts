const MAX_BODY_BYTES = 12_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 8;
const submissions = new Map<string, { count: number; resetAt: number }>();

export type JsonObject = Record<string, unknown>;

export async function readJsonObject(request: Request): Promise<JsonObject | null> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return null;
  if (!request.body) return null;

  try {
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const value: unknown = JSON.parse(new TextDecoder().decode(bytes));
    return value !== null && typeof value === "object" && !Array.isArray(value)
      ? (value as JsonObject)
      : null;
  } catch {
    return null;
  }
}

export function getText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) return null;
  return trimmed;
}

export function getOptionalText(value: unknown, maxLength: number): string | null {
  if (value === undefined || value === null) return "";
  if (typeof value === "string" && !value.trim()) return "";
  return getText(value, maxLength);
}

export function cleanSingleLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/[\u0000-\u001f\u007f]/g, "").trim();
}

export function cleanMultiline(value: string): string {
  return value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

export function isEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const requestHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim()
      || request.headers.get("host")
      || new URL(request.url).host;
    return originHost === requestHost;
  } catch {
    return false;
  }
}

export function isWithinSubmissionLimit(request: Request): boolean {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0].trim()
    || request.headers.get("x-real-ip")
    || "unknown";
  const now = Date.now();
  const current = submissions.get(ip);

  if (!current || current.resetAt <= now) {
    submissions.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  } else if (current.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return false;
  } else {
    current.count += 1;
  }

  if (submissions.size > 2_000) {
    for (const [key, entry] of submissions) {
      if (entry.resetAt <= now) submissions.delete(key);
    }
    while (submissions.size > 2_000) {
      const oldest = submissions.keys().next().value;
      if (!oldest) break;
      submissions.delete(oldest);
    }
  }

  return true;
}

export function jsonError(status: number, error: string): Response {
  return Response.json({ error }, { status });
}
