import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { services } from "@/app/data/siteData";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Prestation introuvable",
      description: "Cette prestation n’existe pas ou n’est plus disponible.",
      robots: { follow: false, index: false },
    };
  }

  const origin = await getRequestOrigin();
  const pageUrl = origin ? new URL(`/prestations/${service.slug}`, origin) : undefined;
  const imageUrl = origin ? new URL(service.image, origin) : undefined;
  const socialTitle = `Démonstration — ${service.title}`;

  return {
    title: service.title,
    description: `Contenu fictif à adapter. ${service.short}`,
    robots: { index: false, follow: false },
    alternates: pageUrl ? { canonical: pageUrl } : undefined,
    openGraph: {
      type: "article",
      locale: "fr_FR",
      siteName: "Démonstration Saur Couverture",
      url: pageUrl,
      title: socialTitle,
      description: `Contenu fictif à adapter. ${service.short}`,
      images: imageUrl ? [{ url: imageUrl, alt: `Illustration de démonstration — ${service.alt}` }] : [],
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: socialTitle,
      description: `Contenu fictif à adapter. ${service.short}`,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  const servicePosition = services.findIndex((item) => item.slug === service.slug);
  const nextService = services[(servicePosition + 1) % services.length];

  return (
    <div className="site-shell">
      <SiteHeader />

      <main className="service-detail" id="main-content">
        <nav aria-label="Fil d’Ariane" className="breadcrumb">
          <ol>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/prestations">Savoir-faire</Link></li>
            <li aria-current="page">{service.title}</li>
          </ol>
        </nav>

        <article>
          <header className="service-detail__hero">
            <div className="service-detail__hero-copy">
              <p className="eyebrow">
                Prestation {service.index} · Couverture &amp; zinguerie
              </p>
              <h1>{service.title}</h1>
              <p className="service-detail__intro">{service.intro}</p>
              <div className="service-detail__actions">
                <Link
                  className="button button--dark"
                  href={`/devis?prestation=${encodeURIComponent(service.slug)}`}
                >
                  Parler de ce besoin <span aria-hidden="true">→</span>
                </Link>
                <Link className="text-link" href="/contact">
                  Contact <span>coordonnées démo</span>
                </Link>
              </div>
            </div>

            <figure className="service-detail__visual">
              <Image
                alt={service.alt}
                fill
                priority
                sizes="(max-width: 820px) 100vw, 50vw"
                src={service.image}
              />
              <figcaption>
                <span>Le détail juste, au bon endroit.</span>
                <strong>{service.title}</strong>
              </figcaption>
            </figure>
          </header>

          <section
            aria-labelledby="service-result-title"
            className="service-detail__overview"
          >
            <div className="service-detail__overview-heading">
              <p className="eyebrow">Lire la situation avant d’agir</p>
              <h2 id="service-result-title">
                Un diagnostic compréhensible, un résultat contrôlable.
              </h2>
            </div>

            <div className="service-detail__lists">
              <section aria-labelledby="service-problems-title">
                <h3 id="service-problems-title">Ce qui peut vous amener à nous appeler</h3>
                <ul>
                  {service.problems.map((problem) => (
                    <li key={problem}>{problem}</li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="service-outcomes-title">
                <h3 id="service-outcomes-title">Ce que l’intervention doit rendre clair</h3>
                <ul>
                  {service.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </section>
            </div>
          </section>

          <section aria-labelledby="service-process-title" className="service-process">
            <div className="service-process__heading">
              <p className="eyebrow">Méthode</p>
              <h2 id="service-process-title">Quatre temps, sans zone floue.</h2>
              <p>
                Chaque étape prépare la suivante. Le choix technique est expliqué
                avant d’être exécuté et les points sensibles restent documentés.
              </p>
            </div>

            <ol className="service-process__steps">
              {service.steps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </section>

          <section className="service-detail__technical">
            <div aria-labelledby="service-materials-title" className="service-materials">
              <p className="eyebrow">Supports &amp; matériaux</p>
              <h2 id="service-materials-title">Choisis pour le bâtiment, pas sur catalogue.</h2>
              <ul>
                {service.materials.map((material) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
            </div>

            <div aria-labelledby="service-faq-title" className="service-faq">
              <p className="eyebrow">Questions fréquentes</p>
              <h2 id="service-faq-title">Avant la visite.</h2>
              <div className="service-faq__items">
                {service.faq.map(([question, answer]) => (
                  <details key={question}>
                    <summary>{question}</summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <aside aria-labelledby="next-service-title" className="next-service">
            <p className="eyebrow eyebrow--light">À découvrir ensuite</p>
            <h2 id="next-service-title">{nextService.title}</h2>
            <p>{nextService.short}</p>
            <Link href={`/prestations/${nextService.slug}`}>
              Voir la prestation <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}

async function getRequestOrigin(): Promise<URL | null> {
  try {
    const requestHeaders = await headers();
    const forwardedHost = requestHeaders.get("x-forwarded-host");
    const host = (forwardedHost ?? requestHeaders.get("host"))
      ?.split(",")[0]
      .trim();
    const forwardedProtocol = requestHeaders
      .get("x-forwarded-proto")
      ?.split(",")[0]
      .trim();

    if (host) {
      const localHost =
        host.startsWith("localhost") ||
        host.startsWith("127.0.0.1") ||
        host.startsWith("[::1]");
      const protocol =
        forwardedProtocol === "http" || (!forwardedProtocol && localHost)
          ? "http"
          : "https";
      const requestOrigin = new URL(`${protocol}://${host}`);
      requestOrigin.pathname = "/";
      requestOrigin.search = "";
      requestOrigin.hash = "";
      return requestOrigin;
    }
  } catch {
    // Static generation has no incoming request; use the configured origin below.
  }

  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredOrigin) {
    try {
      return new URL(configuredOrigin);
    } catch {
      // Ignore malformed configuration; relative metadata is safer than an invented domain.
    }
  }

  return null;
}
