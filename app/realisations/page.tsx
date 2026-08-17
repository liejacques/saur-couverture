import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { demoNotice, projects } from "@/app/data/siteData";

const title = "Démonstration — études de cas couverture et zinguerie";
const description =
  "Quatre cas fictifs et composites montrant comment documenter un problème, un choix technique et un résultat.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | Saur Couverture`,
    description,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary",
    title: `${title} | Saur Couverture`,
    description,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <header className="work-index-hero">
          <div className="content-shell work-index-hero__copy">
            <p className="eyebrow">Cas fictifs de démonstration</p>
            <h1>Le résultat compte. Les décisions qui y mènent aussi.</h1>
            <p className="work-index-hero__intro">
              Ces cas composites illustrent la structure éditoriale attendue.
              Les lieux, dates, surfaces, durées, récits et images ne documentent
              aucun chantier réel de l’entreprise.
            </p>
          </div>
        </header>

        <section className="projects-section" aria-labelledby="projects-heading">
          <div className="content-shell">
            <div className="projects-section__heading">
              <div>
                <p className="eyebrow">Du diagnostic à la réception</p>
                <h2 id="projects-heading">Quatre chantiers, quatre contraintes.</h2>
              </div>
              <p>
                Ardoise, terre cuite ou zinc&nbsp;: la solution part toujours du
                bâtiment et du chemin réel de l’eau.
              </p>
            </div>

            <p className="site-disclaimer" role="note">
              {demoNotice}
            </p>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={project.slug}>
                  <Link
                    className="project-card__link"
                    href={`/realisations/${project.slug}`}
                    aria-label={`Découvrir le cas fictif ${project.type.toLocaleLowerCase("fr-FR")} à ${project.location}`}
                  >
                    <div className="project-card__media">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        width={1800}
                        height={1200}
                        sizes="(max-width: 820px) 100vw, 50vw"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                      <span className="project-card__number" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="project-card__body">
                      <p className="project-card__meta">
                        <span>{project.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.type}</span>
                      </p>
                      <h3>{project.title}</h3>
                      <p className="project-card__summary">{project.short}</p>
                      <dl className="project-card__facts">
                        <div>
                          <dt>Surface</dt>
                          <dd>{project.surface}</dd>
                        </div>
                        <div>
                          <dt>Durée</dt>
                          <dd>{project.duration}</dd>
                        </div>
                        <div>
                          <dt>Matière</dt>
                          <dd>{project.material}</dd>
                        </div>
                      </dl>
                      <span className="project-card__action" aria-hidden="true">
                        Voir le chantier <span>↗</span>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-cta" aria-labelledby="projects-cta-title">
          <div className="content-shell page-cta__inner">
            <div className="page-cta__copy">
              <p className="eyebrow eyebrow--light">Votre toiture</p>
              <h2 id="projects-cta-title">Commençons par décrire le problème.</h2>
              <p>
                Quelques réponses suffisent pour orienter le premier échange,
                sans formulaire interminable.
              </p>
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
