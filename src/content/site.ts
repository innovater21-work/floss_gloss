import type { IconName } from "@/components/ui/icon";

export const clinic = {
  name: "Floss & Gloss",
  tagline: "Family Dental Clinic",
  area: "Shela",
  phone: "+91 91045 91919",
  phoneHref: "tel:+919104591919",
  whatsapp: "https://api.whatsapp.com/send?phone=919104591919",
  email: "drarchanamal@gmail.com",
  address: "130, First Floor, Orchid Sky, Shela, Ahmedabad 380058",
  mapEmbed:
    "https://maps.google.com/maps?q=Floss%20%26%20Gloss%20Dental%20Clinic%2C%20Orchid%20Sky%2C%20Shela%2C%20Ahmedabad&z=15&output=embed",
  directions:
    "https://www.google.com/maps/search/?api=1&query=Floss%20%26%20Gloss%20Dental%20Clinic%2C%20Orchid%20Sky%2C%20Shela%2C%20Ahmedabad",
  rating: "5.0",
  reviewCount: 84,
  since: 2007,
  serviceAreas: "Shela, Bopal, South Bopal, Applewoods & Shilaj",
};

/** Images are served from the live site (floss-gloss.in). To self-host, drop the files into
 *  public/images and change these to "/images/…" paths. */
export const ASSET_BASE = "https://floss-gloss.in/images";

export const logo = { src: `${ASSET_BASE}/logo.png`, width: 269, height: 81 };

export const photos = {
  clinic: { src: `${ASSET_BASE}/infrastructure/1.jpg`, alt: "Clinic entrance", label: "Clinic" },
  doctor: { src: `${ASSET_BASE}/infrastructure/2.jpg`, alt: "Dr. Archana Mal", label: "Dr. Archana" },
  treatment: { src: `${ASSET_BASE}/infrastructure/3.jpg`, alt: "Treatment room", label: "Treatment" },
};

export const nav = [
  { label: "Home", href: "#" },
  { label: "Treatments", href: "#treatments" },
  { label: "Our doctor", href: "#doctor" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

export const ages: { icon: IconName; title: string; text: string; tags: string[] }[] = [
  { icon: "kid", title: "Little ones", text: "Fear-free first visits that build healthy habits early.", tags: ["Pediatric care", "Fillings", "Habit advice"] },
  { icon: "align", title: "Teens", text: "Straighter smiles and wisdom-tooth care, done right.", tags: ["Braces", "Invisalign", "Wisdom teeth"] },
  { icon: "smile", title: "Adults", text: "Fix pain fast, protect your gums and love your smile.", tags: ["Root canal", "Smile design", "Veneers"] },
  { icon: "heart", title: "Seniors", text: "Comfortable replacements that let you eat and smile freely.", tags: ["Implants", "Dentures", "Gum care"] },
];

export const promises: { icon: IconName; title: string; text: string }[] = [
  { icon: "chat", title: "Every step explained", text: "You'll always know what's happening and why." },
  { icon: "clock", title: "Never rushed", text: "Appointment-based visits mean no waiting and no hurry." },
  { icon: "card", title: "Clear pricing", text: "Costs discussed upfront, with multiple payment options." },
  { icon: "kid", title: "Great with kids", text: "Patient, playful care that calms little nerves." },
];

export type TreatmentCategory = "Preventive" | "Restorative" | "Cosmetic" | "Surgical" | "Kids";
export type Treatment = { name: string; category: TreatmentCategory; icon: IconName; description: string };

export const treatments: Treatment[] = [
  { name: "Scaling & Polishing", category: "Preventive", icon: "spark", description: "A professional deep clean that removes tartar and stains and protects your gums." },
  { name: "Periodontal (Gum) Surgery", category: "Preventive", icon: "gum", description: "Specialist treatment for gum disease from an MDS Periodontist." },
  { name: "Tooth-coloured Fillings", category: "Restorative", icon: "fill", description: "Composite fillings that blend with your natural teeth — no silver showing." },
  { name: "Root Canal Treatment", category: "Restorative", icon: "root", description: "Save an infected tooth and end the pain — explained step by step." },
  { name: "Crown & Bridge", category: "Restorative", icon: "crown", description: "Fixed teeth that restore strength and a natural look." },
  { name: "Dental Implants", category: "Restorative", icon: "implant", description: "Permanent titanium-rooted teeth that look and feel natural." },
  { name: "Dentures", category: "Restorative", icon: "denture", description: "Comfortable full or partial dentures for a confident bite." },
  { name: "Smile Designing", category: "Cosmetic", icon: "smile", description: "A planned makeover of shape, shade and symmetry, tailored to you." },
  { name: "Veneers", category: "Cosmetic", icon: "veneer", description: "Thin porcelain or composite shells that fix chips, stains and gaps." },
  { name: "Cosmetic Treatment", category: "Cosmetic", icon: "spark", description: "Whitening and aesthetic touch-ups for a brighter, even smile." },
  { name: "Orthodontics & Invisalign", category: "Cosmetic", icon: "align", description: "Straighten teeth with braces or near-invisible clear aligners." },
  { name: "Extraction", category: "Surgical", icon: "pull", description: "Gentle, comfortable removal when a tooth cannot be saved." },
  { name: "Wisdom Tooth Surgery", category: "Surgical", icon: "wisdom", description: "Safe removal of impacted or painful wisdom teeth." },
  { name: "Pediatric Dentistry", category: "Kids", icon: "kid", description: "Friendly, fear-free care that builds healthy habits early." },
];

const byCategory = (...cats: TreatmentCategory[]) =>
  cats.flatMap((c) => treatments.filter((t) => t.category === c));

export const treatmentGroups = [
  { title: "Everyday care", text: "Keep teeth and gums healthy", items: byCategory("Preventive", "Kids") },
  { title: "Repair & restore", text: "Fix pain, damage and gaps", items: byCategory("Restorative") },
  { title: "Smile makeovers", text: "Look and feel your best", items: byCategory("Cosmetic") },
  { title: "Gentle surgery", text: "Safe, calm and comfortable", items: byCategory("Surgical") },
];

export const reviews = [
  { name: "Aum Desai", text: "Had a very good experience with Dr. Archana for my wisdom tooth extraction. She explained everything clearly and made me feel comfortable throughout. The procedure went smoothly and the staff was friendly and supportive. Would definitely recommend this clinic." },
  { name: "Kraft N Krati", text: "Dr. Archana was very gentle and explained every step of my son’s tooth extraction, which really helped calm him — he felt comfortable with the doctor. The office was spotless and easy to find. Highly recommended for kids as well as adults." },
  { name: "Rahul Mishra", text: "Had a root canal and an extraction in a month. The dentist was patient, explained everything and made sure I was okay the whole time. No scary surprises, no rush. Pricing was clear too. 5 stars — if you want someone who actually cares." },
  { name: "Divya", text: "You are an amazing dentist who works with great care and dedication. Thank you for making every treatment comfortable and giving such wonderful care!" },
  { name: "Sunayna Thakur", text: "Exceptional service and great hospitality provided by Dr. Archana. The procedures were carried out very professionally." },
  { name: "Komal Agrawal", text: "Good experience, and the doctor explained my issues in detail." },
];

export const faqs = [
  { q: "What should I expect during my first visit?", a: "We review your medical history, do a comprehensive dental exam, take X-rays if needed, and talk you through any treatment plan before anything begins." },
  { q: "I’m nervous about the dentist. Can you help?", a: "Absolutely. We take a calm, patient-centred approach — every step is explained, nothing is rushed, and you can pause whenever you need to." },
  { q: "Do you treat children?", a: "Yes. We offer pediatric dentistry and focus on making every child’s visit comfortable and positive." },
  { q: "How do I know if I need a root canal?", a: "Severe tooth pain, lingering sensitivity to hot or cold, swollen gums or a darkening tooth are common signs. An exam and X-ray will confirm it." },
  { q: "What are dental implants?", a: "A permanent replacement for a missing tooth — a titanium post placed in the jawbone topped with a crown that looks and works like a natural tooth." },
  { q: "How often should I visit the dentist?", a: "Every six months for a check-up and cleaning, or more often if your dentist recommends it for your oral health." },
];
