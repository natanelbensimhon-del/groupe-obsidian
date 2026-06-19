# 📂 Médias à fournir (placez vos fichiers ici)

Ce dossier `/public` est servi tel quel à la racine du site.
Déposez ici vos médias définitifs, puis référencez-les dans le code.

## À ajouter

| Fichier attendu | Usage | Où c'est utilisé |
|---|---|---|
| `logo.svg` | Votre logo vectoriel définitif | `components/ui/Logo.tsx` (remplacer le logotype provisoire) |
| `favicon.ico` + `icon.png` | Favicon / icône | racine `app/` (Next gère `app/icon.png`) |
| `og.jpg` (1200×630) | Image de partage réseaux sociaux | `lib/seo.ts` |
| `tertiaire/*.jpg` | Photos de bâtiments tertiaires | page `/tertiaire` |
| `travaux/*.jpg` | Photos de chantiers | page `/travaux` |
| `obsibat/*.jpg` | Photos gros œuvre / démolition | page `/obsibat` |
| `apiryon/*.jpg` | Visuels aviation d'affaires | page `/apiryon` |
| `references/*` | Logos clients / certifications (RGE, Qualibat…) | accueil + `lib/site.ts` |

## Recommandations
- Préférez des images sombres, contrastées, haut de gamme (cohérence obsidienne).
- Optimisez avant import (WebP/AVIF possible). `next/image` fera le reste.
- Cherchez les marqueurs `⚠️ À COMPLÉTER` dans le code pour les emplacements exacts.
