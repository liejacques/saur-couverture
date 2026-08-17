import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "État des informations légales à compléter avant la publication commerciale du site de démonstration Martin.",
};

const legalSections = [
  {
    id: "editeur",
    title: "Éditeur du site",
    body: "Raison sociale, forme juridique, capital social le cas échéant, adresse du siège, numéro SIREN, inscription au RCS ou au RNE et numéro de TVA intracommunautaire : toutes ces informations restent à renseigner.",
  },
  {
    id: "publication",
    title: "Direction de la publication",
    body: "Le nom du responsable de publication doit être ajouté après validation par l’entreprise.",
  },
  {
    id: "contact",
    title: "Coordonnées",
    body: "Le téléphone, l’adresse électronique et l’adresse postale visibles dans la démonstration sont fictifs ou volontairement laissés en attente. Ils ne doivent pas être utilisés pour joindre une entreprise réelle.",
  },
  {
    id: "hebergement",
    title: "Hébergement",
    body: "Le nom, la raison sociale, l’adresse et le téléphone de l’hébergeur seront ajoutés une fois le mode de publication choisi.",
  },
  {
    id: "activite",
    title: "Activité, assurance et qualifications",
    body: "Les références de l’assurance professionnelle, les activités garanties et les qualifications éventuellement détenues devront être reproduites depuis des documents valides. La démonstration ne revendique aucune certification.",
  },
  {
    id: "mediation",
    title: "Médiation de la consommation",
    body: "Les coordonnées du médiateur dont relève réellement l’entreprise ainsi que le lien vers son site devront être ajoutés avant toute relation commerciale avec des consommateurs.",
  },
  {
    id: "contenus",
    title: "Contenus et propriété intellectuelle",
    body: "Les textes et visuels actuels composent un prototype. Avant publication, l’entreprise devra disposer des droits nécessaires sur les photographies, marques, textes et documents utilisés.",
  },
];

export default function LegalNoticesPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main-content">
        <header className="page-hero page-hero--compact">
          <div className="page-hero__copy">
            <p className="eyebrow">Informations légales</p>
            <h1>Mentions légales à compléter.</h1>
            <p className="page-hero__intro">
              Cette page décrit les informations manquantes ; elle ne constitue pas les mentions légales d’une entreprise réelle
              et doit être finalisée puis vérifiée avant publication commerciale.
            </p>
          </div>
        </header>

        <div className="legal-layout section-shell">
          <nav className="legal-nav" aria-label="Sommaire des mentions légales">
            <p className="eyebrow">Sur cette page</p>
            {legalSections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>{section.title}</a>
            ))}
          </nav>

          <div className="legal-content">
            <p className="legal-placeholder">
              Statut du document : prototype incomplet. Remplacer chaque mention « à renseigner » par une donnée officielle vérifiée.
            </p>
            {legalSections.map((section) => (
              <section className="legal-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <section className="legal-section" id="contact-legal">
              <h2>Signaler une information</h2>
              <p>Dans la version publiée, cette rubrique devra renvoyer vers un moyen de contact réel et suivi.</p>
              <Link className="text-link" href="/contact">Voir la page contact de démonstration</Link>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
