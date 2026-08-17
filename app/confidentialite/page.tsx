import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Fonctionnement actuel des données dans la démonstration et informations à compléter avant la mise en ligne d’un formulaire réel.",
};

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main-content">
        <header className="page-hero page-hero--compact">
          <div className="page-hero__copy">
            <p className="eyebrow">Données personnelles</p>
            <h1>Ce que fait réellement cette démonstration.</h1>
            <p className="page-hero__intro">
              Le parcours de devis est simulé : il ne transmet aucune demande à une entreprise. Un brouillon peut être conservé
              uniquement dans le navigateur utilisé. Il n’expire pas automatiquement et disparaît après la fin du parcours ou
              lorsque les données du site sont effacées.
            </p>
          </div>
        </header>

        <section className="section-shell">
          <div className="privacy-summary">
            <article className="privacy-summary__item">
              <span>01</span>
              <h2>Aucun envoi serveur</h2>
              <p>Les réponses saisies dans le devis de démonstration ne sont envoyées ni par e-mail ni à une base de données.</p>
            </article>
            <article className="privacy-summary__item">
              <span>02</span>
              <h2>Brouillon sur l’appareil</h2>
              <p>Le navigateur utilise un stockage local nommé « saur-quote-draft » pour permettre de reprendre le parcours.</p>
            </article>
            <article className="privacy-summary__item">
              <span>03</span>
              <h2>Pas de prospection</h2>
              <p>Aucun outil publicitaire, profil marketing ou inscription à une liste commerciale n’est prévu dans le prototype.</p>
            </article>
          </div>
        </section>

        <div className="legal-layout section-shell section-shell--soft">
          <nav className="legal-nav" aria-label="Sommaire de la politique de confidentialité">
            <p className="eyebrow">Sur cette page</p>
            <a href="#brouillon">Effacer le brouillon</a>
            <a href="#publication">Avant publication</a>
            <a href="#cookies">Cookies et mesure</a>
            <a href="#droits">Vos droits</a>
          </nav>

          <div className="legal-content">
            <section className="legal-section" id="brouillon">
              <h2>Effacer le brouillon local</h2>
              <p>
                Terminer le parcours supprime automatiquement le brouillon. Sinon, aucune expiration automatique n’est prévue :
                il peut être retiré en effaçant les données de ce site dans les réglages du navigateur. Aucune copie distante
                n’est créée par le prototype.
              </p>
            </section>

            <section className="legal-section" id="publication">
              <h2>Informations à publier avec un vrai formulaire</h2>
              <p>
                Avant d’activer un envoi réel, l’entreprise devra identifier le responsable du traitement, les finalités,
                la base juridique, les champs obligatoires, les destinataires, la durée de conservation et le moyen d’exercer ses droits.
              </p>
              <p>
                La collecte devra rester limitée aux informations nécessaires au rappel et à la préparation du rendez-vous.
                Une demande de devis ne doit pas entraîner automatiquement des messages commerciaux.
              </p>
            </section>

            <section className="legal-section" id="cookies">
              <h2>Cookies et mesure d’audience</h2>
              <p>
                Le prototype ne comporte pas de traceur publicitaire. Si une mesure d’audience ou un service tiers est ajouté,
                cette rubrique et, lorsque nécessaire, le mécanisme de consentement devront être adaptés avant publication.
              </p>
            </section>

            <section className="legal-section" id="droits">
              <h2>Exercer ses droits</h2>
              <p>
                Aucun responsable réel ne peut être contacté depuis cette démonstration. La version finale devra fournir une adresse
                suivie pour les demandes d’accès, de rectification, d’effacement, de limitation ou d’opposition, ainsi que les informations utiles sur la CNIL.
              </p>
              <div className="page-hero__actions">
                <Link className="button button--dark" href="/devis">Voir le devis de démonstration</Link>
                <Link className="text-link" href="/contact">Contact de démonstration</Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
