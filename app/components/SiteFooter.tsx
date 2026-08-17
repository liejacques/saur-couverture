import Link from "next/link";
import { demoNotice } from "@/app/data/siteData";

const primaryLinks = [
  { href: "/prestations", label: "Savoir-faire" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/entreprise", label: "L’atelier" },
  { href: "/urgence-toiture", label: "Urgence toiture" },
];

const utilityLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="site-footer__notice">{demoNotice}</p>

      <div className="site-footer__main">
        <div className="site-footer__brand">
          <Link className="brand brand--footer" href="/" aria-label="Martin, retour à l’accueil">
            <span className="brand__name">MARTIN</span>
            <span className="brand__trade">Couverture · Zinguerie</span>
          </Link>
          <p className="site-footer__tagline">
            Une démonstration de site pour un atelier de couverture : sobre, locale et fondée sur des preuves à vérifier.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Navigation de pied de page">
          <p className="eyebrow eyebrow--light">Explorer</p>
          {primaryLinks.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div className="site-footer__contact">
          <p className="eyebrow eyebrow--light">Contact de démonstration</p>
          <span className="site-footer__number">
            03 89 00 00 00
          </span>
          <span>Numéro fictif · appel désactivé</span>
          <Link className="button button--light" href="/devis">Décrire mon besoin</Link>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>Prototype Martin · aucune preuve commerciale publiée</span>
        <nav aria-label="Informations légales">
          {utilityLinks.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
