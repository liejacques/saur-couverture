import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./components/ScrollReveal";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { projects, services } from "./data/siteData";

export const metadata: Metadata = {
  title: "Saur — Couverture & zinguerie à Colmar",
  description: "Diagnostic, réparation et rénovation de toiture à Colmar et dans la vallée de Munster.",
};

const concerns = [
  ["Une infiltration", "Trouver l’entrée d’eau, sécuriser et proposer la réparation juste.", "/urgence-toiture"],
  ["Des tuiles déplacées", "Contrôler les fixations, les raccords voisins et le risque immédiat.", "/devis?prestation=reparation-fuite"],
  ["Une toiture à rénover", "Distinguer ce qui peut rester de ce qui doit réellement être repris.", "/devis?prestation=renovation-couverture"],
  ["Une gouttière qui déborde", "Vérifier pente, section, naissance et évacuation avant de remplacer.", "/devis?prestation=zinguerie-gouttieres"],
  ["Des combles inconfortables", "Étudier ensemble isolation, vapeur d’eau, ventilation et couverture.", "/devis?prestation=isolation-toiture"],
  ["Un doute après la tempête", "Documenter l’état du toit sans vous demander d’y monter.", "/urgence-toiture"],
] as const;

const method = [
  ["01", "Écouter", "Votre problème, son urgence et ce que vous avez déjà observé."],
  ["02", "Diagnostiquer", "Voir la toiture, photographier les détails et expliquer la cause probable."],
  ["03", "Chiffrer", "Un devis poste par poste, avec options séparées quand elles ont du sens."],
  ["04", "Réaliser", "Protéger, intervenir, documenter puis réceptionner le travail avec vous."],
] as const;

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <SiteHeader />
      <main id="main-content">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero__copy">
            <p className="eyebrow">Couvreur-zingueur · Colmar & vallée de Munster</p>
            <h1 id="home-title">Une toiture saine.<em>Des explications claires.</em></h1>
            <p className="home-hero__intro">
              Diagnostic, réparation et rénovation par la même équipe. Un devis détaillé après visite, sans jargon ni surprise.
            </p>
            <div className="home-hero__actions">
              <Link className="button button--dark" href="/devis">Décrire mon besoin <span aria-hidden="true">↗</span></Link>
              <Link className="text-link" href="/contact">Voir le contact <span aria-hidden="true">coordonnées démo</span></Link>
            </div>
            <Link className="urgent-link" href="/urgence-toiture"><span className="urgent-link__dot" aria-hidden="true" />Une fuite en cours ? Accès urgence</Link>
          </div>
          <figure className="home-hero__visual">
            <Image
              alt="Deux couvreurs posent des tuiles sur une toiture en rénovation"
              height={1200}
              priority
              sizes="(max-width: 820px) 100vw, 56vw"
              src="/images/hero-roofers.jpg"
              width={1600}
            />
            <figcaption><span>Visuel de démonstration</span><span>Photographie illustrative · Unsplash</span></figcaption>
          </figure>
        </section>

        <section className="proof-rail" aria-label="Repères de confiance">
          <div><strong>Délai</strong><span>à confirmer par l’entreprise</span></div>
          <div><strong>Assurance</strong><span>preuve réelle à intégrer</span></div>
          <div><strong>Zone locale</strong><span>communes à valider</span></div>
          <div><strong>Avis Google</strong><span>source réelle à connecter</span></div>
        </section>

        <section className="editorial-section needs-section" data-reveal>
          <header className="section-heading">
            <p className="eyebrow">Commencer par votre problème</p>
            <h2>Vous n’avez pas besoin de connaître le nom de la pièce qui fuit.</h2>
            <p>Décrivez ce que vous voyez. Le diagnostic sert précisément à traduire un symptôme en décision de chantier.</p>
          </header>
          <div className="concern-list">
            {concerns.map(([title, text, href], index) => (
              <Link href={href} key={title}>
                <small>0{index + 1}</small>
                <span><strong>{title}</strong><em>{text}</em></span>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="editorial-section projects-section" data-reveal>
          <header className="section-heading section-heading--row">
            <div><p className="eyebrow">Études de cas fictives</p><h2>Une démonstration du niveau de preuve attendu.</h2></div>
            <Link className="arrow-link" href="/realisations">Toutes les réalisations <span aria-hidden="true">→</span></Link>
          </header>
          <div className="project-grid">
            {projects.slice(0, 3).map((project, index) => (
              <Link className={`project-card project-card--${index + 1}`} href={`/realisations/${project.slug}`} key={project.slug}>
                <figure>
                  <Image alt={project.alt} height={1200} sizes="(max-width: 820px) 100vw, 33vw" src={project.image} width={1600} />
                </figure>
                <div className="project-card__meta"><span>{project.location} · {project.year}</span><span>{project.type}</span></div>
                <h3>{project.title}</h3>
                <p>{project.short}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="dark-section method-section" data-reveal>
          <div className="dark-section__intro">
            <p className="eyebrow eyebrow--light">Avant de commencer</p>
            <h2>Vous savez où vous allez.</h2>
            <p>Le chantier devient rassurant quand les décisions, les limites et les prochaines étapes sont explicites.</p>
          </div>
          <ol className="method-list">
            {method.map(([number, title, text]) => (
              <li key={number}><small>{number}</small><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
        </section>

        <section className="editorial-section services-preview" data-reveal>
          <header className="section-heading section-heading--row">
            <div><p className="eyebrow">Savoir-faire</p><h2>La bonne intervention, au bon endroit.</h2></div>
            <Link className="arrow-link" href="/prestations">Voir les six expertises <span aria-hidden="true">→</span></Link>
          </header>
          <div className="service-index">
            {services.slice(0, 4).map((service) => (
              <Link href={`/prestations/${service.slug}`} key={service.slug}>
                <small>{service.index}</small><h3>{service.title}</h3><p>{service.short}</p><span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="feature-case" data-reveal>
          <figure>
            <Image
              alt="Maison en bois avec toiture métallique sombre à joints debout"
              height={1200}
              sizes="(max-width: 820px) 100vw, 65vw"
              src="/images/zinc-balcony.jpg"
              width={1600}
            />
          </figure>
          <div className="feature-case__copy">
            <p className="eyebrow">Cas composite de démonstration · Turckheim</p>
            <h2>Le zinc comme ligne d’architecture.</h2>
            <dl>
              <div><dt>Constat</dt><dd>Une extension à faible pente, avec des évacuations à intégrer sans casser les lignes du bardage.</dd></div>
              <div><dt>Décision</dt><dd>Calepiner les bacs depuis les ouvertures et coordonner rives, plis et descentes avant la pose.</dd></div>
              <div><dt>Résultat</dt><dd>Une couverture mate, régulière et silencieuse visuellement.</dd></div>
            </dl>
            <Link className="button button--dark" href="/realisations/joint-debout-turckheim">Lire le cas complet <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="editorial-section atelier-preview" data-reveal>
          <div className="atelier-preview__copy">
            <p className="eyebrow">L’atelier</p>
            <h2>Un interlocuteur identifié du diagnostic à la réception.</h2>
            <p>La confiance se construit par une responsabilité claire : qui répond, qui visite et qui travaille sur votre toit.</p>
            <ul>
              <li>Un interlocuteur identifié avant la visite</li>
              <li>Les activités couvertes par l’assurance montrées avant signature</li>
              <li>Des photos datées aux étapes qui seront ensuite cachées</li>
            </ul>
            <Link className="arrow-link" href="/entreprise">Découvrir l’atelier <span aria-hidden="true">→</span></Link>
          </div>
          <figure>
            <Image
              alt="Deux artisans travaillent ensemble sur une couverture en ardoise et tuile"
              height={1200}
              sizes="(max-width: 820px) 100vw, 60vw"
              src="/images/roof-hands.jpg"
              width={1600}
            />
            <figcaption>Photographie de démonstration · à remplacer par l’équipe réelle</figcaption>
          </figure>
        </section>

        <section className="testimonial-section" data-reveal>
          <p className="eyebrow">Ce qui rassure vraiment</p>
          <blockquote>“On nous a montré d’où venait l’eau, ce qui pouvait attendre et ce qu’il fallait traiter tout de suite. Le prix final est resté celui du devis.”</blockquote>
          <footer><span>Exemple d’avis client · contenu de démonstration</span><span>Réparation de fuite · Wintzenheim</span></footer>
        </section>

        <section className="editorial-section faq-zone" data-reveal>
          <div className="zone-card">
            <p className="eyebrow">Zone d’intervention</p>
            <h2>Colmar, la plaine et la vallée.</h2>
            <p>Rayon de démonstration : 40 km autour de Colmar. Saisissez votre code postal dans le devis pour orienter la demande sans refus brutal.</p>
            <div className="place-list"><span>Colmar</span><span>Wintzenheim</span><span>Turckheim</span><span>Eguisheim</span><span>Munster</span><span>Ribeauvillé</span></div>
            <Link className="button button--dark" href="/devis">Indiquer ma commune <span aria-hidden="true">→</span></Link>
          </div>
          <div className="faq-list">
            <p className="eyebrow">Questions concrètes</p>
            <h2>Avant de nous confier votre toit.</h2>
            <details><summary>Faites-vous les petites réparations ? <span>+</span></summary><p>Oui lorsqu’une réparation ciblée peut être durable. La visite sert aussi à dire honnêtement quand elle ne le serait pas.</p></details>
            <details><summary>Le déplacement est-il payant ? <span>+</span></summary><p>Le caractère gratuit ou payant du diagnostic doit être annoncé avant tout rendez-vous. Le montant affiché ici sera renseigné avec l’entreprise réelle.</p></details>
            <details><summary>Comment protégez-vous la maison s’il pleut ? <span>+</span></summary><p>Le phasage, les bâches et les zones ouvertes sont anticipés. Une couverture n’est découverte que sur une surface maîtrisable.</p></details>
            <details><summary>Le devis peut-il changer en cours de chantier ? <span>+</span></summary><p>Un imprévu est photographié et chiffré avant décision. Aucun travail supplémentaire n’est présenté comme acquis.</p></details>
          </div>
        </section>

        <section className="final-cta" data-reveal>
          <p className="eyebrow eyebrow--light">Votre toit, simplement</p>
          <h2>Décrivez ce que vous voyez.<br />Nous vous dirons quoi faire ensuite.</h2>
          <div><Link className="button button--light" href="/devis">Démarrer ma demande <span aria-hidden="true">↗</span></Link><Link href="/contact">Voir le contact de démonstration</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
