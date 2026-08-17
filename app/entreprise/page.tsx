import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "L’atelier",
  description: "Découvrez la méthode et les preuves qui devront identifier clairement l’entreprise de couverture présentée dans cette démonstration.",
};

const proofItems = [
  {
    label: "Identité de l’entreprise",
    state: "À renseigner",
    text: "Raison sociale, forme juridique, adresse d’atelier et immatriculation devront correspondre aux registres officiels.",
  },
  {
    label: "Assurance décennale",
    state: "À vérifier",
    text: "L’attestation réelle devra préciser sa période de validité et les activités de couverture effectivement garanties.",
  },
  {
    label: "Qualifications",
    state: "Non revendiquées",
    text: "Aucun label RGE ou Qualibat ne sera affiché avant vérification de son domaine et de sa validité.",
  },
  {
    label: "Avis et réalisations",
    state: "Démonstration",
    text: "Les témoignages et chiffres fictifs sont exclus. Seuls des chantiers documentés et des avis reliés à leur source pourront être publiés.",
  },
];

const method = [
  ["01", "Écouter avant de chiffrer", "Comprendre le symptôme, l’usage du bâtiment et le niveau d’urgence avant de proposer une visite."],
  ["02", "Montrer le diagnostic", "Photographier les points utiles et expliquer ce qui doit être réparé, surveillé ou laissé en place."],
  ["03", "Écrire les arbitrages", "Détailler matériaux, protections, limites de prestation, délais et variantes dans le devis."],
  ["04", "Réceptionner proprement", "Faire le tour du chantier, remettre les photos utiles et garder un interlocuteur identifiable."],
];

export default function EnterprisePage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main-content">
        <section className="page-hero">
          <div className="page-hero__copy">
            <p className="eyebrow">L’atelier</p>
            <h1>Une équipe identifiable. Une méthode lisible.</h1>
            <p className="page-hero__intro">
              La confiance ne vient pas d’un badge décoratif. Elle vient de personnes que l’on peut nommer,
              de documents que l’on peut contrôler et d’un chantier expliqué avant de commencer.
            </p>
            <div className="page-hero__actions">
              <Link className="button button--dark" href="/devis">Décrire mon besoin <span aria-hidden="true">→</span></Link>
              <Link className="text-link" href="/realisations">Voir les réalisations</Link>
            </div>
          </div>
          <figure className="page-hero__visual">
            <Image
              alt="Mains gantées travaillant sur un détail de couverture, visuel utilisé pour la démonstration"
              height="900"
              sizes="(max-width: 820px) 100vw, 50vw"
              src="/images/roof-hands.jpg"
              width="1200"
            />
            <figcaption className="page-hero__caption">Visuel de démonstration · à remplacer par l’équipe réelle</figcaption>
          </figure>
        </section>

        <section className="section-shell">
          <header className="section-heading">
            <div>
              <p className="eyebrow">Les preuves avant les promesses</p>
              <h2>Ce qui devra être vérifiable avant publication.</h2>
            </div>
            <p className="section-heading__intro">
              Cette page expose volontairement l’état des informations au lieu de transformer des éléments fictifs en arguments commerciaux.
            </p>
          </header>
          <div className="status-list">
            {proofItems.map((item) => (
              <article className="status-item" key={item.label}>
                <div>
                  <p className="status-item__state">{item.state}</p>
                  <h3>{item.label}</h3>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell section-shell--ink">
          <header className="section-heading">
            <div>
              <p className="eyebrow eyebrow--light">La méthode proposée</p>
              <h2>Du premier échange à la réception.</h2>
            </div>
            <p className="section-heading__intro">
              Ces engagements constituent une direction éditoriale. L’entreprise réelle devra les confirmer et les adapter à son organisation.
            </p>
          </header>
          <div className="editorial-grid">
            {method.map(([index, title, text]) => (
              <article className="editorial-card" key={index}>
                <span className="editorial-card__index">{index}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <div className="content-grid">
            <div>
              <p className="eyebrow">Les personnes derrière le chantier</p>
              <h2>Pas de portraits inventés.</h2>
            </div>
            <div>
              <p>
                La version finale présentera ici le dirigeant, le conducteur de chantier et les compagnons avec leur vrai rôle.
                Si une partie du travail est sous-traitée, elle sera indiquée simplement.
              </p>
              <p>
                Une photo de groupe à l’atelier, un numéro d’immatriculation contrôlable et une attestation correspondant
                aux travaux rassurent davantage qu’une longue liste de superlatifs.
              </p>
              <Link className="text-link" href="/contact">Voir les moyens de contact</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
