"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "/prestations", label: "Savoir-faire" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/entreprise", label: "L’atelier" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const dialog = document.getElementById("mobile-menu");
        const focusable = Array.from(
          dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <a className="skip-link" href="#main-content">Aller au contenu</a>
        <Link className="brand" href="/" aria-label="Martin, accueil">
          <span className="brand__name">MARTIN</span>
          <span className="brand__trade">Couverture · Zinguerie</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <Link className={pathname.startsWith(item.href) ? "is-current" : ""} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link className="header-phone" href="/contact">
            <span className="header-phone__label">Contact démo</span>
            <span className="header-phone__number">Coordonnées fictives</span>
          </Link>
          <Link className="header-quote" href="/devis">Devis <span aria-hidden="true">↗</span></Link>
          <button
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="Ouvrir le menu"
            className="menu-toggle"
            onClick={() => setOpen(true)}
            ref={toggleRef}
            type="button"
          >
            Menu
          </button>
        </div>

        {open && (
          <div aria-labelledby="mobile-menu-title" className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true">
            <div className="mobile-menu__top">
              <span className="brand__name" id="mobile-menu-title">MARTIN</span>
              <button
                aria-label="Fermer le menu"
                className="menu-close"
                onClick={() => { setOpen(false); toggleRef.current?.focus(); }}
                ref={closeRef}
                type="button"
              >
                Fermer
              </button>
            </div>
            <nav aria-label="Navigation mobile">
              {navigation.map((item, index) => (
                <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
                  <span>{item.label}</span><small>0{index + 1}</small>
                </Link>
              ))}
              <Link href="/urgence-toiture" onClick={() => setOpen(false)}><span>Urgence toiture</span><small>04</small></Link>
            </nav>
            <div className="mobile-menu__actions">
              <Link className="button button--light" href="/devis" onClick={() => setOpen(false)}>Décrire mon besoin</Link>
              <Link href="/contact" onClick={() => setOpen(false)}>Contact de démonstration</Link>
            </div>
          </div>
        )}
      </header>
      <p className="demo-banner demo-banner--global" role="note">
        Prototype · entreprise, chantiers, coordonnées et preuves fictifs.
      </p>
    </>
  );
}
