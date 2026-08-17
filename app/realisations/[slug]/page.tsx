import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { demoNotice, projects } from "@/app/data/siteData";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

async function requestOrigin() {
  const requestHeaders = await headers();
  const host = (
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host")
  )
    ?.split(",")[0]
    .trim();

  if (!host) return null;

  const forwardedProtocol = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0]
    .trim();
  const protocol =
    forwardedProtocol === "http" || forwardedProtocol === "https"
      ? forwardedProtocol
      : host.startsWith("localhost") || host.startsWith("127.0.0.1")
        ? "http"
        : "https";

  try {
    return new URL(`${protocol}://${host}`);
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return {
      title: "Chantier introuvable",
      robots: { index: false, follow: false },
    };
  }

  const origin = await requestOrigin();
  const pageUrl = origin
    ? new URL(`/realisations/${project.slug}`, origin).toString()
    : undefined;
  const imageUrl = origin
    ? new URL(project.image, origin).toString()
    : undefined;
  const title = `Démonstration — ${project.title} — ${project.location}`;
  const socialTitle = `${title} | Martin Couverture`;
  const description = `Cas fictif et composite. ${project.short} ${project.surface}, ${project.material}, ${project.duration}.`;
  const socialImage = imageUrl
    ? [{ url: imageUrl, alt: project.alt }]
    : [];

  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: pageUrl ? { canonical: pageUrl } : undefined,
    openGraph: {
      title: socialTitle,
      description,
      type: "article",
      locale: "fr_FR",
      url: pageUrl,
      images: socialImage,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      images: socialImage,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <SiteHeader />
      <main className="project-page" id="main-content">
        <nav className="content-shell project-breadcrumbs" aria-label="Fil d’Ariane">
          <ol>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/realisations">Réalisations</Link></li>
            <li><span aria-current="page">{project.location}</span></li>
          </ol>
        </nav>

        <article>
          <header className="project-hero">
            <div className="content-shell project-hero__grid">
              <div className="project-hero__copy">
                <p className="eyebrow">Cas fictif · structure de démonstration</p>
                <p className="project-hero__meta">
                  <span>{project.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.type}</span>
                </p>
                <h1>{project.title}</h1>
                <p className="project-hero__lead">{project.short}</p>
                <p className="site-disclaimer" role="note">
                  Les données et le récit ci-dessous sont composites. Ils ne décrivent aucun chantier réel de Martin.
                </p>
              </div>

              <figure className="project-hero__figure">
                <Image
                  className="project-hero__image"
                  src={project.image}
                  alt={project.alt}
                  width={1800}
                  height={1200}
                  sizes="(max-width: 820px) 100vw, 64vw"
                  priority
                />
                <figcaption className="project-hero__caption">
                  <span>Photographie illustrative</span>
                  <span>Cas fictif · {project.location}, {project.year}</span>
                </figcaption>
              </figure>
            </div>
          </header>

          <dl className="content-shell project-facts" aria-label="Repères du chantier">
            <div className="project-facts__item">
              <dt>Surface</dt>
              <dd>{project.surface}</dd>
            </div>
            <div className="project-facts__item">
              <dt>Durée</dt>
              <dd>{project.duration}</dd>
            </div>
            <div className="project-facts__item">
              <dt>Matériau principal</dt>
              <dd>{project.material}</dd>
            </div>
            <div className="project-facts__item">
              <dt>Intervention</dt>
              <dd>{project.type}</dd>
            </div>
          </dl>

          <section className="project-story" aria-labelledby="project-story-title">
            <div className="content-shell project-story__grid">
              <div className="project-story__intro">
                <p className="eyebrow">Lecture du chantier</p>
                <h2 id="project-story-title">Du constat au résultat.</h2>
                <p>
                  Trois repères pour comprendre ce qui a été observé, décidé et
                  obtenu sur ce chantier.
                </p>
              </div>

              <ol className="project-story__steps">
                <li className="project-story__step">
                  <span className="project-story__number" aria-hidden="true">01</span>
                  <div>
                    <h3>Le problème</h3>
                    <p>{project.problem}</p>
                  </div>
                </li>
                <li className="project-story__step">
                  <span className="project-story__number" aria-hidden="true">02</span>
                  <div>
                    <h3>La décision technique</h3>
                    <p>{project.decision}</p>
                  </div>
                </li>
                <li className="project-story__step">
                  <span className="project-story__number" aria-hidden="true">03</span>
                  <div>
                    <h3>Le résultat</h3>
                    <p>{project.result}</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <div className="content-shell">
            <p className="site-disclaimer" role="note">
              {demoNotice}
            </p>
          </div>
        </article>

        <aside className="project-next" aria-labelledby="next-project-title">
          <div className="content-shell project-next__inner">
            <div>
              <p className="project-next__label">Chantier suivant · {nextProject.location}</p>
              <h2 id="next-project-title">{nextProject.title}</h2>
            </div>
            <Link
              className="button button--light"
              href={`/realisations/${nextProject.slug}`}
              aria-label={`Découvrir le chantier suivant à ${nextProject.location}`}
            >
              Découvrir <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </aside>

        <section className="page-cta" aria-labelledby="project-cta-title">
          <div className="content-shell page-cta__inner">
            <div className="page-cta__copy">
              <p className="eyebrow eyebrow--light">Un projet à étudier</p>
              <h2 id="project-cta-title">Votre toiture a sa propre histoire.</h2>
              <p>Décrivez le besoin en quelques réponses, avant toute visite.</p>
            </div>
            <Link className="button button--light" href="/devis">
              Décrire mon besoin <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
