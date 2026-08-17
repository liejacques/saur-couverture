import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Choisissez le moyen de contact adapté à votre besoin dans cette démonstration de site de couvreur.",
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main-content">
        <section className="page-hero page-hero--compact">
          <div className="page-hero__copy">
            <p className="eyebrow">Contact</p>
            <h1>Choisissez le chemin le plus direct.</h1>
            <p className="page-hero__intro">
              Dans la version réelle, une urgence se traiterait d’abord par téléphone. Un projet planifié peut commencer par
              quatre informations puis une confirmation, sans mesurer votre toiture ni rédiger un long message.
            </p>
          </div>
        </section>

        <section className="section-shell">
          <div className="contact-grid">
            <article className="contact-card contact-card--urgent">
              <p className="eyebrow">Fuite ou danger en cours</p>
              <h2>Appelez d’abord.</h2>
              <p>Le numéro ci-dessous est fictif et ne fournit aucune assistance réelle.</p>
              <span className="contact-card__value">
                03 89 00 00 00
              </span>
              <Link className="button button--light" href="/urgence-toiture">Consignes de sécurité</Link>
            </article>

            <article className="contact-card">
              <p className="eyebrow">Projet ou entretien</p>
              <h2>Décrivez le besoin.</h2>
              <p>Le parcours de démonstration prépare un premier échange en cinq étapes et ne transmet aucune donnée.</p>
              <Link className="button button--dark" href="/devis">Commencer · 2 min <span aria-hidden="true">→</span></Link>
            </article>

            <article className="contact-card">
              <p className="eyebrow">Question écrite</p>
              <h2>Adresse de démonstration.</h2>
              <p>Cette adresse utilise un domaine réservé et ne correspond à aucune boîte de l’entreprise.</p>
              <span className="contact-card__value">
                bonjour@saur-couverture.example
              </span>
              <Link className="text-link" href="/confidentialite">Comment les données seront traitées</Link>
            </article>
          </div>
        </section>

        <section className="section-shell section-shell--ink">
          <header className="section-heading">
            <div>
              <p className="eyebrow eyebrow--light">Informations pratiques</p>
              <h2>Les coordonnées réelles restent à publier.</h2>
            </div>
            <p className="section-heading__intro">
              Aucun atelier, horaire ou rayon d’intervention fictif ne doit être interprété comme un engagement commercial.
            </p>
          </header>
          <dl className="detail-list detail-list--columns">
            <div className="detail-list__row"><dt>Adresse de l’atelier</dt><dd>À renseigner et à vérifier</dd></div>
            <div className="detail-list__row"><dt>Horaires d’appel</dt><dd>À confirmer par l’entreprise</dd></div>
            <div className="detail-list__row"><dt>Délai de rappel</dt><dd>Aucun délai promis dans la démo</dd></div>
            <div className="detail-list__row"><dt>Zone habituelle</dt><dd>À valider commune par commune</dd></div>
          </dl>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
