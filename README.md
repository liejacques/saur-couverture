# Martin — démonstration de site couvreur

Prototype multi-pages d’un site de couverture et zinguerie, conçu autour de trois principes :

- une direction éditoriale calme et artisanale, sans codes visuels « site IA » ;
- des preuves de confiance concrètes, toujours signalées comme fictives dans cette démo ;
- un parcours de devis plein écran, court et sans défilement aux formats usuels.

## Pages

- accueil, prestations et six fiches métier ;
- réalisations et quatre études de cas composites ;
- entreprise, urgence toiture, contact ;
- devis en cinq étapes ;
- mentions légales et confidentialité.

## Lancer le projet

Node.js 22.13 ou plus récent est requis.

```bash
npm install
npm run dev
npm run lint
npm test
```

## Avant une publication commerciale

Cette version est volontairement en `noindex`. Il faut remplacer l’identité, les coordonnées, les photos, les cas chantier, les avis, la zone, les délais et toutes les preuves d’assurance ou de qualification par des éléments vérifiés. Le formulaire ne transmet actuellement aucune donnée : il conserve seulement un brouillon dans le navigateur.

Les photographies du prototype sont illustratives et proviennent d’Unsplash. Elles ne doivent jamais être présentées comme des chantiers de l’entreprise réelle.
