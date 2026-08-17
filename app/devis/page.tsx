import type { Metadata } from "next";
import { QuoteWizard } from "./QuoteWizard";

export const metadata: Metadata = {
  title: "Décrire mon besoin",
  description: "Une demande de devis simple, en cinq questions et sans défilement.",
};

export default function QuotePage() {
  return <QuoteWizard />;
}
