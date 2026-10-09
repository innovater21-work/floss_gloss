import type { Metadata } from "next";
import { CallbackPanel } from "@/components/home/callback";
import { Breadcrumbs } from "@/components/site/page-elements";

export const metadata: Metadata = {
  title: "Request a Callback",
  description: "Send Floss & Gloss Dental Clinic a callback request. The clinic will follow up using the contact details you provide.",
  alternates: { canonical: "/callback" },
};

export default function CallbackPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Request a callback" }]} />
      <section className="section-y pt-0!">
        <CallbackPanel headingLevel="h1" />
      </section>
    </main>
  );
}
