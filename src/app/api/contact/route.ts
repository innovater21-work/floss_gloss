import { cleanMultiline, cleanSingleLine, getOptionalText, getText, isEmail, isSameOrigin, isWithinSubmissionLimit, jsonError, readJsonObject } from "@/lib/server/form-security";
import { sendClinicEmail, sendResultResponse } from "@/lib/server/resend-mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError(403, "This form request could not be verified. Refresh the page and try again.");

  const body = await readJsonObject(request);
  if (!body) return jsonError(400, "Please check the form fields and try again.");
  if (typeof body.website === "string" && body.website.trim()) return Response.json({ ok: true });
  if (!isWithinSubmissionLimit(request)) return jsonError(429, "Too many requests. Please wait a few minutes and try again.");

  const name = getText(body.name, 120);
  const email = getText(body.email, 254);
  const phone = getOptionalText(body.phone, 40);
  const subject = getText(body.subject, 140);
  const message = getText(body.message, 4_000);

  if (!name || !email || !isEmail(email) || phone === null || !subject || !message) {
    return jsonError(400, "Please check the required fields and enter a valid email address.");
  }

  const cleanName = cleanSingleLine(name);
  const cleanSubject = cleanSingleLine(subject);
  const cleanPhone = phone ? cleanSingleLine(phone) : "Not provided";
  const cleanMessage = cleanMultiline(message);
  const text = [
    "Website contact enquiry",
    "",
    `Name: ${cleanName}`,
    `Email: ${email}`,
    `Phone: ${cleanPhone}`,
    `Subject: ${cleanSubject}`,
    "",
    cleanMessage,
  ].join("\n");

  const result = await sendClinicEmail({
    subject: `Website enquiry: ${cleanSubject}`,
    text,
    replyTo: email,
  });

  return sendResultResponse(result);
}
