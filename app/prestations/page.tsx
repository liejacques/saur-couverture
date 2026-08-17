import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { services } from "@/app/data/siteData";

const pageTitle = "Savoir-faire toiture";
const pageDescription =
  "Réparation de fuite, rénovation, zinguerie, isolation, fenêtres de toit et entretien autour de Colmar.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: pageTitle,
    description: pageDescription,
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function ServicesPage() {
  return (
    <div className="site-shell">
      <SiteHeader />

      <main className="services-index" id="main-content">
        <header className="services-index__hero">
          <div className="services-index__heading">
            <p className="eyebrow">Savoir-faire · Couverture &amp; zinguerie</p>
            <h1>Le toit se joue dans les détails.</h1>
          </div>
          <div className="services-index__introduction">
            <p>
              Une intervention utile commence par comprendre le chemin de l’eau,
              l’état du support et les contraintes du bâtiment. Nous distinguons ce
              qui doit être réparé, conservé ou repris, puis nous l’expliquons
              clairement avant les travaux.
            </p>
            <Link className="text-link" href="/devis">
              Décrire mon besoin <span>Réponse adaptée au projet</span>
            </Link>
          </div>
        </header>

        <section
          aria-labelledby="services-catalogue-title"
          className="services-index__catalogue"
        >
          <div className="services-index__section-heading">
            <p className="eyebrow">Six domaines d’intervention</p>
            <h2 id="services-catalogue-title">
              De la recherche de fuite à la rénovation complète.
            </h2>
          </div>

          <ol className="service-list">
            {services.map((service) => (
              <li className="service-list__item" key={service.slug}>
                <article className="service-card">
                  <Link
                    aria-label={`Découvrir la prestation : ${service.title}`}
                    className="service-card__link"
                    href={`/prestations/${service.slug}`}
                  >
                    <figure className="service-card__media">
                      <Image
                        alt={service.alt}
                        fill
                        sizes="(max-width: 820px) 100vw, 50vw"
                        src={service.image}
                      />
                      <figcaption>
                        <span>Prestation</span>
                        <strong>{service.index}</strong>
                      </figcaption>
                    </figure>

                    <div className="service-card__body">
                      <div className="service-card__title-row">
                        <h3>{service.title}</h3>
                        <span aria-hidden="true">↗</span>
                      </div>
                      <p>{service.short}</p>
                      <ul aria-label={`Matériaux associés à ${service.title}`}>
                        {service.materials.slice(0, 3).map((material) => (
                          <li key={material}>{material}</li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="services-orientation-title"
          className="services-orientation"
        >
          <div>
            <p className="eyebrow eyebrow--light">Vous hésitez sur la prestation ?</p>
            <h2 id="services-orientation-title">
              Décrivez le symptôme. Le diagnostic vient avant la solution.
            </h2>
          </div>
          <div className="services-orientation__actions">
            <Link className="button button--light" href="/devis">
              Décrire mon besoin <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact">
              <span>Contact de démonstration</span>
              <strong>Coordonnées fictives</strong>
            </Link>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
