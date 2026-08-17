import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { demoNotice } from "@/app/data/siteData";

export const metadata: Metadata = {
  title: "Urgence toiture",
  description: "Les premiers gestes sûrs face à une fuite ou un élément de toiture déplacé, dans une page de démonstration sans service d’urgence réel.",
};

const safetySteps = [
  ["01", "Restez au sol", "Ne montez pas sur la toiture, même pour déplacer une tuile ou tendre une bâche."],
  ["02", "Éloignez les personnes", "Isolez la zone sous un élément instable. En cas de danger immédiat pour une personne, appelez le 112."],
  ["03", "Limitez les dégâts sans vous exposer", "Déplacez les biens accessibles et recueillez l’eau seulement si cela peut être fait en sécurité."],
  ["04", "Photographiez depuis un endroit sûr", "Une vue générale et la zone intérieure touchée suffisent pour préparer le premier échange."],
];

export default function EmergencyRoofPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main-content">
        <p className="demo-banner demo-banner--critical">{demoNotice} Le numéro présenté ici ne joint aucun service réel.</p>

        <section className="page-hero page-hero--urgency">
          <div className="page-hero__copy">
            <p className="eyebrow">Fuite · tempête · élément déplacé</p>
            <h1>La priorité : vous mettre en sécurité.</h1>
            <p className="page-hero__intro">
              Ne montez pas sur le toit. Éloignez-vous d’un élément qui menace de tomber et appelez un professionnel réel
              de votre secteur. Cette page illustre le parcours attendu, elle ne fournit pas d’assistance.
            </p>
            <div className="call-panel" aria-label="Appel de démonstration">
              <span>Numéro fictif · aucun service réel</span>
              <span className="call-panel__number">03 89 00 00 00</span>
              <p className="call-panel__meta">
                La version publiée devra indiquer ici les horaires, le coût du déplacement et le délai de rappel réellement tenable.
              </p>
            </div>
            <div className="page-hero__actions">
              <span aria-disabled="true" className="button button--copper">Appel désactivé dans la démo</span>
              <Link className="text-link" href="/devis?urgence=1">Je ne peux pas appeler</Link>
            </div>
          </div>
          <figure className="page-hero__visual">
            <Image
              alt="Eau s’écoulant au bord d’une toiture sombre dans la pluie"
              height="900"
              sizes="(max-width: 820px) 100vw, 50vw"
              src="/images/gutter-detail.jpg"
              width="1200"
            />
            <figcaption className="page-hero__caption">Image illustrative · pas une intervention Saur</figcaption>
          </figure>
        </section>

        <section className="section-shell">
          <header className="section-heading">
            <div>
              <p className="eyebrow">Avant toute intervention</p>
              <h2>Quatre gestes simples, sans prendre de risque.</h2>
            </div>
            <p className="section-heading__intro">
              Une fuite visible peut avoir commencé ailleurs. La recherche de cause vient après la mise en sécurité des personnes et du bâtiment.
            </p>
          </header>
          <ol className="safety-list">
            {safetySteps.map(([index, title, text]) => (
              <li key={index}>
                <span>{index}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section-shell section-shell--ink">
          <div className="content-grid">
            <div>
              <p className="eyebrow eyebrow--light">Ce qu’un professionnel doit clarifier</p>
              <h2>Rappel, déplacement et réparation ne sont pas le même délai.</h2>
            </div>
            <div>
              <ul className="detail-list">
                <li className="detail-list__row"><strong>Au téléphone</strong><span>Nature du danger, accès, commune et météo.</span></li>
                <li className="detail-list__row"><strong>Avant le départ</strong><span>Créneau réaliste et éventuel forfait de déplacement.</span></li>
                <li className="detail-list__row"><strong>Sur place</strong><span>Mise hors d’eau possible, diagnostic et limites liées à la sécurité.</span></li>
                <li className="detail-list__row"><strong>Après sécurisation</strong><span>Réparation durable ou devis séparé si des travaux plus larges sont nécessaires.</span></li>
              </ul>
              <p>
                Aucune promesse « sous 24 h » n’est faite dans cette démonstration. L’entreprise réelle devra publier uniquement le niveau de service qu’elle peut assurer.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
