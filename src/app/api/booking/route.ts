import { hours, treatments } from "@/content/site";
import { cleanMultiline, cleanSingleLine, getOptionalText, getText, isEmail, isSameOrigin, isWithinSubmissionLimit, jsonError, readJsonObject } from "@/lib/server/form-security";
import { sendClinicEmail, sendResultResponse } from "@/lib/server/resend-mail";

export const runtime = "nodejs";

const weekdayHours = hours.find((item) => item.day.includes("Monday"));
const sundayHours = hours.find((item) => item.day === "Sunday");
const preferredWindows = [
  ...(weekdayHours?.time.split(" & ").map((window) => `${weekdayHours.day}: ${window}`) ?? []),
  ...(sundayHours ? [`${sundayHours.day}: ${sundayHours.time}`] : []),
];

function indiaToday(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value && value >= indiaToday();
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError(403, "This form request could not be verified. Refresh the page and try again.");

  const body = await readJsonObject(request);
  if (!body) return jsonError(400, "Please check the form fields and try again.");
  if (typeof body.website === "string" && body.website.trim()) return Response.json({ ok: true });
  if (!isWithinSubmissionLimit(request)) return jsonError(429, "Too many requests. Please wait a few minutes and try again.");

  const name = getText(body.name, 120);
  const phone = getText(body.phone, 40);
  const email = getOptionalText(body.email, 254);
  const date = getText(body.date, 10);
  const hoursValue = getText(body.hours, 100);
  const treatment = getOptionalText(body.treatment, 100);
  const note = getOptionalText(body.note, 1_200);

  if (
    !name
    || !phone
    || !/^[+()\d\s.-]{7,40}$/.test(phone)
    || email === null
    || (email !== "" && !isEmail(email))
    || !date
    || !isValidDate(date)
    || !hoursValue
    || !preferredWindows.includes(hoursValue)
    || treatment === null
    || (treatment !== "" && !treatments.some((item) => item.name === treatment))
    || note === null
  ) {
    return jsonError(400, "Please check the required fields, date, and contact details.");
  }

  const cleanName = cleanSingleLine(name);
  const cleanPhone = cleanSingleLine(phone);
  const cleanTreatment = treatment ? cleanSingleLine(treatment) : "I'm not sure yet";
  const cleanNote = note ? cleanMultiline(note) : "Not provided";
  const text = [
    "Appointment request from the website",
    "",
    `Name: ${cleanName}`,
    `Phone: ${cleanPhone}`,
    `Email: ${email || "Not provided"}`,
    `Treatment interest: ${cleanTreatment}`,
    `Preferred date: ${date}`,
    `Preferred clinic hours: ${hoursValue}`,
    "",
    `Note: ${cleanNote}`,
    "",
    "This is a request only. No appointment slot has been reserved or confirmed.",
  ].join("\n");

  const result = await sendClinicEmail({
    subject: `Appointment request: ${cleanTreatment}`,
    text,
    ...(email ? { replyTo: email } : {}),
  });

  return sendResultResponse(result);
}
