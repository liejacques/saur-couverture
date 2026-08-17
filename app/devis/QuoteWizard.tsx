"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type QuoteData = {
  need: string;
  sourceService: string;
  postcode: string;
  city: string;
  timing: string;
  contactMethod: "phone" | "email";
  contact: string;
  firstName: string;
  consent: boolean;
};

const initialData: QuoteData = {
  need: "", sourceService: "", postcode: "", city: "", timing: "", contactMethod: "phone",
  contact: "", firstName: "", consent: false,
};

const needs = [
  ["fuite", "Fuite en cours", "Mise hors d’eau ou recherche de fuite"],
  ["reparer", "Réparer", "Tuiles, solins, rive ou faîtage"],
  ["renover", "Rénover", "Réfection partielle ou complète"],
  ["zinguerie", "Zinguerie", "Gouttière, chéneau ou joint debout"],
  ["isoler", "Isoler", "Sarking ou fenêtre de toit"],
  ["inconnu", "Je ne sais pas", "Nous vous aidons à qualifier le besoin"],
];

const timings = [
  ["urgent", "Maintenant", "Un dégât ou une infiltration est en cours"],
  ["soon", "Dans les 3 mois", "Le projet doit avancer prochainement"],
  ["planning", "Je prépare le projet", "Je souhaite étudier les options et le budget"],
];

const cityByPostcode: Record<string, string> = {
  "68000": "Colmar", "68124": "Wintzenheim", "68230": "Turckheim",
  "68140": "Munster", "68420": "Eguisheim",
};

const prefillByService: Record<string, { need: string; label: string }> = {
  "reparation-fuite": { need: "reparer", label: "Recherche de fuite & réparation" },
  "renovation-couverture": { need: "renover", label: "Rénovation de couverture" },
  "zinguerie-gouttieres": { need: "zinguerie", label: "Zinguerie & évacuation des eaux" },
  "isolation-toiture": { need: "isoler", label: "Isolation par la toiture" },
  "fenetres-de-toit": { need: "isoler", label: "Fenêtres de toit" },
  "entretien-demoussage": { need: "inconnu", label: "Entretien & démoussage" },
};

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>(initialData);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [urgentEntry, setUrgentEntry] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const hydrateFromClient = () => {
      try {
        const saved = window.localStorage.getItem("saur-quote-draft");
        const nextData = saved ? { ...initialData, ...JSON.parse(saved), consent: false } : initialData;
        const parameters = new URLSearchParams(window.location.search);
        const servicePrefill = prefillByService[parameters.get("prestation") ?? ""];

        if (parameters.get("urgence") === "1") {
          setData({ ...nextData, need: "fuite", timing: "urgent" });
          setUrgentEntry(true);
          setStep(1);
        } else if (servicePrefill) {
          setData({
            ...nextData,
            need: servicePrefill.need,
            sourceService: servicePrefill.label,
          });
          setStep(1);
        } else if (saved) {
          setData(nextData);
        }
      } catch {
        /* The form remains usable without local storage. */
      } finally {
        setHydrated(true);
      }
    };
    const timeout = window.setTimeout(hydrateFromClient, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (submitted || !hydrated) return;
    try { window.localStorage.setItem("saur-quote-draft", JSON.stringify(data)); }
    catch { /* Ignore storage restrictions. */ }
  }, [data, hydrated, submitted]);

  useEffect(() => { titleRef.current?.focus(); }, [step, submitted]);

  const update = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const selectNeed = (value: string) => {
    setData((current) => ({ ...current, need: value, sourceService: "" }));
    setError("");
  };

  const validateStep = () => {
    if (step === 0 && !data.need) return "Choisissez le besoin le plus proche de votre situation.";
    if (step === 1 && !/^\d{5}$/.test(data.postcode)) return "Saisissez un code postal français à 5 chiffres.";
    if (step === 1 && !data.city.trim()) return "Indiquez la commune du chantier.";
    if (step === 2 && !data.timing) return "Indiquez le délai de votre projet.";
    if (step === 3 && !data.firstName.trim()) return "Indiquez votre prénom.";
    if (step === 3 && data.contactMethod === "phone" && data.contact.replace(/\D/g, "").length < 10)
      return "Saisissez un numéro de téléphone valide.";
    if (step === 3 && data.contactMethod === "email" && !/^\S+@\S+\.\S+$/.test(data.contact))
      return "Saisissez une adresse e-mail valide.";
    if (step === 4 && !data.consent) return "Confirmez que nous pouvons utiliser ces informations pour vous répondre.";
    return "";
  };

  const next = () => {
    const message = validateStep();
    if (message) return setError(message);
    if (step === 1 && urgentEntry) {
      setStep(3);
      return;
    }
    setStep((current) => Math.min(4, current + 1));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (step < 4) {
      next();
      return;
    }
    const message = validateStep();
    if (message) return setError(message);
    setSubmitted(true);
    window.localStorage.removeItem("saur-quote-draft");
  };

  const needLabel = data.sourceService || needs.find(([value]) => value === data.need)?.[1] || "À préciser";
  const timingLabel = timings.find(([value]) => value === data.timing)?.[1] ?? "À préciser";

  return (
    <main className="quote-app" id="main-content">
      <header className="quote-header">
        <Link className="brand brand--quote" href="/" aria-label="Retour à l’accueil">
          <span className="brand__name">SAUR</span><span className="brand__trade">Couverture · Zinguerie</span>
        </Link>
        <span className="quote-header__promise">Simulation en 2 minutes</span>
        <Link href="/contact">Besoin d’aide ? <strong>Contact démo</strong></Link>
      </header>

      <div className="quote-layout">
        <aside className="quote-aside">
          <div>
            <p className="eyebrow eyebrow--light">Votre demande</p>
            <h1>Une question à la fois.</h1>
            <p>Ce prototype organise vos réponses en brouillon local. Il ne calcule aucun prix et ne transmet aucune donnée.</p>
          </div>
          <dl className="quote-summary">
            <div><dt>Besoin</dt><dd>{needLabel}</dd></div>
            <div><dt>Chantier</dt><dd>{data.city || "À préciser"}</dd></div>
            <div><dt>Délai</dt><dd>{timingLabel}</dd></div>
          </dl>
          <p className="quote-aside__note">Mode démonstration · Brouillon local uniquement, aucune transmission.</p>
        </aside>

        <form className="quote-panel" onSubmit={submit} noValidate>
          <div className="quote-progress">
            <span>Étape {submitted ? 5 : step + 1} sur 5</span>
            <div
              aria-label={`${submitted ? 100 : (step + 1) * 20} % terminé`}
              aria-valuemax={100} aria-valuemin={0} aria-valuenow={submitted ? 100 : (step + 1) * 20}
              className="quote-progress__track" role="progressbar"
            ><span style={{ width: `${submitted ? 100 : (step + 1) * 20}%` }} /></div>
            <span className="quote-progress__demo">Démo · non transmis</span>
          </div>

          <div className="quote-stage">
            {submitted ? (
              <section className="quote-success" aria-live="polite">
                <span className="quote-success__mark" aria-hidden="true">✓</span>
                <p className="eyebrow">Parcours terminé</p>
                <h2 ref={titleRef} tabIndex={-1}>La demande est prête.</h2>
                <p>Cette démo ne transmet aucune donnée. Dans la version finale, l’équipe confirmerait ici la réception et le délai de rappel.</p>
                <Link className="button button--dark" href="/">Revenir à l’accueil</Link>
              </section>
            ) : (
              <>
                {step === 0 && (
                  <fieldset className="quote-step">
                    <legend className="sr-only">Votre besoin</legend>
                    <p className="eyebrow">Commençons simplement</p>
                    <h2 ref={titleRef} tabIndex={-1}>Quel est votre besoin ?</h2>
                    <p className="quote-step__hint">Choisissez la situation la plus proche. Vous pourrez préciser ensuite.</p>
                    <div className="choice-grid choice-grid--six">
                      {needs.map(([value, label, description]) => (
                        <label aria-label={`Besoin : ${label}`} className="choice-card" htmlFor={`need-${value}`} key={value}>
                          <input checked={data.need === value} id={`need-${value}`} name="need" onChange={() => selectNeed(value)} type="radio" value={value} />
                          <span><strong>{label}</strong><small>{description}</small></span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 1 && (
                  <section className="quote-step">
                    <p className="eyebrow">Le chantier</p>
                    <h2 ref={titleRef} tabIndex={-1}>Où devons-nous intervenir ?</h2>
                    <p className="quote-step__hint">Le code postal nous permet de vérifier rapidement la zone de déplacement.</p>
                    <div className="field-pair">
                      <label className="field-label">Code postal
                        <input autoComplete="postal-code" inputMode="numeric" maxLength={5}
                          onChange={(event) => {
                            const value = event.target.value.replace(/\D/g, "");
                            update("postcode", value);
                            if (cityByPostcode[value]) update("city", cityByPostcode[value]);
                          }} placeholder="68000" value={data.postcode} />
                      </label>
                      <label className="field-label">Commune
                        <input autoComplete="address-level2" onChange={(event) => update("city", event.target.value)} placeholder="Colmar" value={data.city} />
                      </label>
                    </div>
                    <p className="field-note">Zone habituelle : 40 km autour de Colmar. Hors zone ? Nous vous répondons tout de même.</p>
                  </section>
                )}

                {step === 2 && (
                  <fieldset className="quote-step">
                    <legend className="sr-only">Votre délai</legend>
                    <p className="eyebrow">Votre calendrier</p>
                    <h2 ref={titleRef} tabIndex={-1}>Quand souhaitez-vous avancer ?</h2>
                    <p className="quote-step__hint">Une urgence est traitée différemment d’un projet à préparer.</p>
                    <div className="choice-list">
                      {timings.map(([value, label, description]) => (
                        <label aria-label={`Délai : ${label}`} className="choice-card choice-card--row" htmlFor={`timing-${value}`} key={value}>
                          <input checked={data.timing === value} id={`timing-${value}`} name="timing" onChange={() => update("timing", value)} type="radio" value={value} />
                          <span><strong>{label}</strong><small>{description}</small></span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 3 && (
                  <section className="quote-step">
                    <p className="eyebrow">Votre réponse</p>
                    <h2 ref={titleRef} tabIndex={-1}>Comment pouvons-nous vous joindre ?</h2>
                    <div className="contact-switch" role="group" aria-label="Moyen de contact préféré">
                      <button aria-pressed={data.contactMethod === "phone"} onClick={() => { update("contactMethod", "phone"); update("contact", ""); }} type="button">Par téléphone</button>
                      <button aria-pressed={data.contactMethod === "email"} onClick={() => { update("contactMethod", "email"); update("contact", ""); }} type="button">Par e-mail</button>
                    </div>
                    <div className="field-pair">
                      <label className="field-label">Prénom
                        <input autoComplete="given-name" onChange={(event) => update("firstName", event.target.value)} placeholder="Julie" value={data.firstName} />
                      </label>
                      <label className="field-label">{data.contactMethod === "phone" ? "Téléphone" : "Adresse e-mail"}
                        <input autoComplete={data.contactMethod === "phone" ? "tel" : "email"} inputMode={data.contactMethod === "phone" ? "tel" : "email"}
                          onChange={(event) => update("contact", event.target.value)} placeholder={data.contactMethod === "phone" ? "06 12 34 56 78" : "julie@exemple.fr"}
                          type={data.contactMethod === "phone" ? "tel" : "email"} value={data.contact} />
                      </label>
                    </div>
                    <p className="field-note">Un seul moyen de contact est nécessaire. Aucun message commercial.</p>
                  </section>
                )}

                {step === 4 && (
                  <section className="quote-step quote-step--review">
                    <p className="eyebrow">Dernière vérification</p>
                    <h2 ref={titleRef} tabIndex={-1}>Tout est juste ?</h2>
                    <dl className="review-list">
                      <div><dt>Besoin</dt><dd>{needLabel}</dd></div>
                      <div><dt>Chantier</dt><dd>{data.postcode} · {data.city}</dd></div>
                      <div><dt>Délai</dt><dd>{timingLabel}</dd></div>
                      <div><dt>Réponse</dt><dd>{data.firstName} · {data.contact}</dd></div>
                    </dl>
                    <label className="consent-check">
                      <input checked={data.consent} onChange={(event) => update("consent", event.target.checked)} type="checkbox" />
                      <span>J’accepte que ces informations soient utilisées uniquement pour répondre à cette demande.</span>
                    </label>
                    <p className="demo-note">
                      Mode démonstration : aucune donnée ne sera transmise. <Link href="/confidentialite">Lire le fonctionnement du brouillon local</Link>.
                    </p>
                  </section>
                )}
              </>
            )}
          </div>

          {!submitted && (
            <div className="quote-actions">
              <button className="button button--ghost" disabled={step === 0}
                onClick={() => {
                  setError("");
                  setStep((current) => current === 3 && urgentEntry ? 1 : Math.max(0, current - 1));
                }} type="button">← Retour</button>
              <p aria-live="polite" className="form-error">{error}</p>
              {step < 4 ? (
                <button className="button button--dark" onClick={next} type="button">Continuer <span aria-hidden="true">→</span></button>
              ) : (
                <button className="button button--copper" type="submit">Terminer la démo <span aria-hidden="true">→</span></button>
              )}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
