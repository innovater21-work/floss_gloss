import siteJson from "./site.json";
import treatmentJson from "./treatments.json";
import blogJson from "./blog.json";
import { iconNames, type IconName } from "@/components/ui/icon";

type JsonObject = Record<string, unknown>;
type IconRecord = { icon: IconName; title: string; text: string };
type PhotoAsset = { src: string; alt: string; label: string };

export type TreatmentCategory = "Preventive" | "Restorative" | "Cosmetic" | "Surgical" | "Kids";
export type TreatmentSection = { title: string; paragraphs: string[] };
export type Treatment = {
  name: string;
  slug: string;
  category: TreatmentCategory;
  icon: IconName;
  description: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  legacyPaths: string[];
  sections: TreatmentSection[];
};
export type Faq = { q: string; a: string; featured: boolean };
export type Review = { name: string; text: string };
export type BlogPost = {
  slug: string;
  title: string;
  publishedAt: string;
  author: string;
  excerpt: string;
  image: PhotoAsset;
  sections: TreatmentSection[];
  sources: { label: string; url: string }[];
};
export type HomepageSlide = { title: string; text: string; image: PhotoAsset };

function object(value: unknown, path: string): JsonObject {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`Invalid content JSON at ${path}: expected an object.`);
  }
  return value as JsonObject;
}

function string(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid content JSON at ${path}: expected a non-empty string.`);
  }
  return value;
}

function number(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Invalid content JSON at ${path}: expected a finite number.`);
  }
  return value;
}

function bool(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") throw new Error(`Invalid content JSON at ${path}: expected a boolean.`);
  return value;
}

function array(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`Invalid content JSON at ${path}: expected an array.`);
  return value;
}

function strings(value: unknown, path: string): string[] {
  return array(value, path).map((item, index) => string(item, `${path}[${index}]`));
}

function icon(value: unknown, path: string): IconName {
  const candidate = string(value, path);
  if (!(iconNames as readonly string[]).includes(candidate)) {
    throw new Error(`Invalid content JSON at ${path}: unknown icon "${candidate}".`);
  }
  return candidate as IconName;
}

function parseSections(value: unknown, path: string): TreatmentSection[] {
  return array(value, path).map((item, index) => {
    const row = object(item, `${path}[${index}]`);
    return {
      title: string(row.title, `${path}[${index}].title`),
      paragraphs: strings(row.paragraphs, `${path}[${index}].paragraphs`),
    };
  });
}

const root = object(siteJson, "site");
const clinicJson = object(root.clinic, "site.clinic");
export const clinic = {
  name: string(clinicJson.name, "site.clinic.name"),
  tagline: string(clinicJson.tagline, "site.clinic.tagline"),
  area: string(clinicJson.area, "site.clinic.area"),
  phone: string(clinicJson.phone, "site.clinic.phone"),
  phoneHref: string(clinicJson.phoneHref, "site.clinic.phoneHref"),
  whatsapp: string(clinicJson.whatsapp, "site.clinic.whatsapp"),
  email: string(clinicJson.email, "site.clinic.email"),
  address: string(clinicJson.address, "site.clinic.address"),
  mapEmbed: string(clinicJson.mapEmbed, "site.clinic.mapEmbed"),
  directions: string(clinicJson.directions, "site.clinic.directions"),
  bookingUrl: string(clinicJson.bookingUrl, "site.clinic.bookingUrl"),
  kiviBookingUrl: string(clinicJson.kiviBookingUrl, "site.clinic.kiviBookingUrl"),
  googleSearchUrl: string(clinicJson.googleSearchUrl, "site.clinic.googleSearchUrl"),
  googleReviewUrl: string(clinicJson.googleReviewUrl, "site.clinic.googleReviewUrl"),
  facebookUrl: string(clinicJson.facebookUrl, "site.clinic.facebookUrl"),
  instagramUrl: string(clinicJson.instagramUrl, "site.clinic.instagramUrl"),
  rating: string(clinicJson.rating, "site.clinic.rating"),
  reviewCount: number(clinicJson.reviewCount, "site.clinic.reviewCount"),
  since: number(clinicJson.since, "site.clinic.since"),
  serviceAreas: string(clinicJson.serviceAreas, "site.clinic.serviceAreas"),
};

const logoJson = object(root.logo, "site.logo");
export const logo = {
  src: string(logoJson.src, "site.logo.src"),
  width: number(logoJson.width, "site.logo.width"),
  height: number(logoJson.height, "site.logo.height"),
};

function parsePhoto(value: unknown, path: string): PhotoAsset {
  const row = object(value, path);
  return {
    src: string(row.src, `${path}.src`),
    alt: string(row.alt, `${path}.alt`),
    label: string(row.label, `${path}.label`),
  };
}

const photosJson = object(root.photos, "site.photos");
export const photos = {
  clinic: parsePhoto(photosJson.clinic, "site.photos.clinic"),
  doctor: parsePhoto(photosJson.doctor, "site.photos.doctor"),
  treatment: parsePhoto(photosJson.treatment, "site.photos.treatment"),
};

function parsePhotoArray(value: unknown, path: string): PhotoAsset[] {
  return array(value, path).map((item, index) => parsePhoto(item, `${path}[${index}]`));
}

export const infrastructurePhotos = parsePhotoArray(root.infrastructurePhotos, "site.infrastructurePhotos");
export const galleryPhotos = parsePhotoArray(root.galleryPhotos, "site.galleryPhotos");
export const certificatePhotos = parsePhotoArray(root.certificatePhotos, "site.certificatePhotos");

const policyPhotosJson = object(root.policyPhotos, "site.policyPhotos");
export const policyPhotos = {
  vision: parsePhoto(policyPhotosJson.vision, "site.policyPhotos.vision"),
  mission: parsePhoto(policyPhotosJson.mission, "site.policyPhotos.mission"),
  quality: parsePhoto(policyPhotosJson.quality, "site.policyPhotos.quality"),
};

export const homepageSlides: HomepageSlide[] = array(root.homepageSlides, "site.homepageSlides").map((item, index) => {
  const path = `site.homepageSlides[${index}]`;
  const row = object(item, path);
  return {
    title: string(row.title, `${path}.title`),
    text: string(row.text, `${path}.text`),
    image: parsePhoto(row.image, `${path}.image`),
  };
});

function parseIconRecord(value: unknown, path: string): IconRecord {
  const row = object(value, path);
  return {
    icon: icon(row.icon, `${path}.icon`),
    title: string(row.title, `${path}.title`),
    text: string(row.text, `${path}.text`),
  };
}

export const ages = array(root.ages, "site.ages").map((item, index) => {
  const path = `site.ages[${index}]`;
  const row = object(item, path);
  return {
    icon: icon(row.icon, `${path}.icon`),
    title: string(row.title, `${path}.title`),
    text: string(row.text, `${path}.text`),
    tags: strings(row.tags, `${path}.tags`),
  };
});

export const promises = array(root.promises, "site.promises").map((item, index) => parseIconRecord(item, `site.promises[${index}]`));
export const features = array(root.features, "site.features").map((item, index) => parseIconRecord(item, `site.features[${index}]`));

const doctorJson = object(root.doctor, "site.doctor");
export const doctor = {
  name: string(doctorJson.name, "site.doctor.name"),
  title: string(doctorJson.title, "site.doctor.title"),
  registration: string(doctorJson.registration, "site.doctor.registration"),
  since: number(doctorJson.since, "site.doctor.since"),
  education: array(doctorJson.education, "site.doctor.education").map((item, index) => {
    const path = `site.doctor.education[${index}]`;
    const row = object(item, path);
    return {
      degree: string(row.degree, `${path}.degree`),
      institution: string(row.institution, `${path}.institution`),
    };
  }),
  biography: strings(doctorJson.biography, "site.doctor.biography"),
  vision: string(doctorJson.vision, "site.doctor.vision"),
  mission: string(doctorJson.mission, "site.doctor.mission"),
  qualityPolicy: string(doctorJson.qualityPolicy, "site.doctor.qualityPolicy"),
};

export const hours = array(root.hours, "site.hours").map((item, index) => {
  const path = `site.hours[${index}]`;
  const row = object(item, path);
  return {
    day: string(row.day, `${path}.day`),
    time: string(row.time, `${path}.time`),
  };
});

export const seoCopy = strings(root.seoCopy, "site.seoCopy");
export const reviews: Review[] = array(root.reviews, "site.reviews").map((item, index) => {
  const path = `site.reviews[${index}]`;
  const row = object(item, path);
  return {
    name: string(row.name, `${path}.name`),
    text: string(row.text, `${path}.text`),
  };
});
export const faqs: Faq[] = array(root.faqs, "site.faqs").map((item, index) => {
  const path = `site.faqs[${index}]`;
  const row = object(item, path);
  return {
    q: string(row.q, `${path}.q`),
    a: string(row.a, `${path}.a`),
    featured: bool(row.featured, `${path}.featured`),
  };
});
export const featuredFaqs = faqs.filter((faq) => faq.featured);

export const treatments: Treatment[] = array(treatmentJson, "treatments").map((item, index) => {
  const path = `treatments[${index}]`;
  const row = object(item, path);
  const category = string(row.category, `${path}.category`);
  if (!["Preventive", "Restorative", "Cosmetic", "Surgical", "Kids"].includes(category)) {
    throw new Error(`Invalid content JSON at ${path}.category: unknown treatment category.`);
  }
  return {
    name: string(row.name, `${path}.name`),
    slug: string(row.slug, `${path}.slug`),
    category: category as TreatmentCategory,
    icon: icon(row.icon, `${path}.icon`),
    description: string(row.description, `${path}.description`),
    intro: string(row.intro, `${path}.intro`),
    metaTitle: string(row.metaTitle, `${path}.metaTitle`),
    metaDescription: string(row.metaDescription, `${path}.metaDescription`),
    legacyPaths: strings(row.legacyPaths, `${path}.legacyPaths`),
    sections: parseSections(row.sections, `${path}.sections`),
  };
});

const byCategory = (...categories: TreatmentCategory[]) =>
  categories.flatMap((category) => treatments.filter((treatment) => treatment.category === category));

export const treatmentGroups = [
  { title: "Everyday care", text: "Keep teeth and gums healthy", items: byCategory("Preventive", "Kids") },
  { title: "Repair & restore", text: "Fix pain, damage and gaps", items: byCategory("Restorative") },
  { title: "Smile makeovers", text: "Look and feel your best", items: byCategory("Cosmetic") },
  { title: "Gentle surgery", text: "Safe, calm and comfortable", items: byCategory("Surgical") },
];

export const blogPosts: BlogPost[] = array(blogJson, "blog").map((item, index) => {
  const path = `blog[${index}]`;
  const row = object(item, path);
  const publishedAt = string(row.publishedAt, `${path}.publishedAt`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    throw new Error(`Invalid content JSON at ${path}.publishedAt: expected YYYY-MM-DD.`);
  }
  return {
    slug: string(row.slug, `${path}.slug`),
    title: string(row.title, `${path}.title`),
    publishedAt,
    author: string(row.author, `${path}.author`),
    excerpt: string(row.excerpt, `${path}.excerpt`),
    image: parsePhoto(row.image, `${path}.image`),
    sections: parseSections(row.sections, `${path}.sections`),
    sources: array(row.sources, `${path}.sources`).map((source, sourceIndex) => {
      const sourcePath = `${path}.sources[${sourceIndex}]`;
      const sourceRow = object(source, sourcePath);
      return {
        label: string(sourceRow.label, `${sourcePath}.label`),
        url: string(sourceRow.url, `${sourcePath}.url`),
      };
    }),
  };
});

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

