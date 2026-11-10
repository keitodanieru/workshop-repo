import { site } from "@/content/site";
import { ButtonLink } from "@/app/_components/ui";

/**
 * Landing page (home route).
 *
 * - Renders without authentication (Requirement 1.1) and is identical for
 *   anonymous and authenticated visitors (Requirement 1.3).
 * - Provides a navigation path to the catalog (Requirement 1.2).
 * - All customizable text/branding comes from the editable content file
 *   content/site.ts (Requirement 1.4).
 *
 * Composes the Task 6.5 design-system tokens + primitives (Requirement 15):
 * the hero is left-aligned and token-spaced (no oversized centered hero / badge
 * pills) and the CTA is the shared Button primitive with full interactive
 * states. The optional photo (site.heroImage) sits beside the text on wide
 * screens and below it on phones.
 */
export default function HomePage() {
  const hasImage = site.heroImage.trim() !== "";

  return (
    <section className="hero">
      <div className={`container${hasImage ? " hero__grid" : ""}`}>
        <div className="hero__text">
          <h1 className="hero__headline">{site.headline}</h1>
          <p className="hero__tagline">{site.tagline}</p>
          <p className="hero__intro">{site.intro}</p>
          <ButtonLink href="/catalog">{site.catalogCtaLabel}</ButtonLink>
        </div>
        {hasImage ? (
          // Plain <img>: a static file in public/images/, like the catalog
          // cards. The photo is cropped to fit, so any shape works.
          <img
            className="hero__media"
            src={site.heroImage}
            alt={site.heroImageAlt}
            width={1000}
            height={1250}
          />
        ) : null}
      </div>
    </section>
  );
}
