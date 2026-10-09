import { clinicTour } from "@/content/site";
import { Eyebrow } from "@/components/ui/typography";

export function ClinicTourSection() {
  return (
    <section id="clinic-tour" className="section-y bg-bg-alt pt-0!">
      <div className="wrap">
        <div className="mx-auto mb-8 max-w-[680px] text-center">
          <Eyebrow>{clinicTour.eyebrow}</Eyebrow>
          <h2 className="text-h2-sm">{clinicTour.title}</h2>
          <p className="mt-3 text-muted">{clinicTour.description}</p>
        </div>
        <figure className="mx-auto max-w-[1000px] overflow-hidden rounded-band border border-line bg-dark shadow-sticker max-md:rounded-card">
          <video
            className="block aspect-video w-full bg-dark"
            controls
            playsInline
            preload="metadata"
            poster={clinicTour.poster}
            width={1280}
            height={720}
            aria-label={clinicTour.alt}
          >
            <source src={clinicTour.src} type="video/mp4" />
            Your browser does not support this video.
          </video>
        </figure>
        <p className="mx-auto mt-3 max-w-[1000px] text-center text-[13px] text-muted">
          Watch the full clinic video. Playback starts when you press play.
        </p>
      </div>
    </section>
  );
}
