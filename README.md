# Groupe Obsidian — Site premium

Site institutionnel haut de gamme du **Groupe Obsidian** : rénovation énergétique
tertiaire, optimisation CEE, travaux, **OBSI'BAT** (gros œuvre & démolition) et
**APIRYON** (aviation d'affaires).

Direction artistique noir / obsidienne / verre / métal, avec un **puzzle 3D
interactif signature** sur la page d'accueil.

---

## 🧱 Stack technique

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design tokens obsidienne)
- **Framer Motion** (UI, transitions, scroll reveals)
- **React Three Fiber / Three.js / drei / postprocessing** (puzzle 3D + bloom)
- SEO intégré : `metadata` par page, Open Graph, `sitemap.xml`, `robots.txt`,
  JSON-LD Organization
- Accessibilité : fallback 2.5D automatique (mobile / sans WebGL /
  `prefers-reduced-motion`)

---

## 🚀 Installation & lancement

Prérequis : **Node.js ≥ 18** (testé sur Node 20+).

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
# → http://localhost:3000

# 3. Build de production
npm run build

# 4. Démarrer le build de production en local
npm run start
```

---

## ☁️ Déploiement sur Vercel

1. Poussez le projet sur un dépôt Git (GitHub, GitLab…).
2. Sur [vercel.com](https://vercel.com) → **New Project** → importez le dépôt.
3. Vercel détecte Next.js automatiquement — aucune config nécessaire.
4. (Optionnel) Variables d'environnement : ajoutez `RESEND_API_KEY` si vous
   branchez l'envoi d'e-mails (voir ci-dessous).
5. **Deploy**. C'est tout.

Alternative en ligne de commande :

```bash
npm i -g vercel
vercel        # déploiement de préversion
vercel --prod # déploiement en production
```

---

## 📁 Structure du projet

```
app/
  layout.tsx              Layout racine (nav, footer, transitions, SEO global)
  page.tsx                Accueil (hero puzzle 3D + sections)
  le-groupe/              Le Groupe
  tertiaire/              Pôle tertiaire (page pilier)
  travaux/                Travaux
  obsibat/                OBSI'BAT — gros œuvre & démolition
  optimisation-cee/       Optimisation CEE (animation data-flow)
  particuliers/           Particuliers
  apiryon/                APIRYON — aviation d'affaires (univers gold)
  contact/                Contact (formulaire premium)
  api/contact/route.ts    Endpoint formulaire (à brancher)
  sitemap.ts / robots.ts  SEO technique
components/
  layout/                 Navbar, Footer, PageHero, PageTransition
  ui/                     Logo, GlassCard, ExpertiseCard, Reveal, SectionHeader, CustomCursor
  puzzle/                 PuzzleHero, PuzzleScene (3D), Puzzle2D (fallback)
  sections/               HomeHero, CTASection, DataFlowCEE, ContactForm, Blocks
lib/                      site.ts (données), seo.ts, utils.ts
public/                   VOS MÉDIAS (voir public/À-LIRE_MEDIAS.md)
```

---

## ✍️ Personnalisation rapide

| Quoi | Où |
|---|---|
| Coordonnées (tél, e-mail, adresse, WhatsApp) | `lib/site.ts` → `SITE.contact` |
| Navigation, pièces du puzzle, partenaires | `lib/site.ts` |
| URL de production (SEO / sitemap) | `lib/site.ts` → `SITE.url` |
| Couleurs / typo / animations | `tailwind.config.ts` + `app/globals.css` |
| Logo | `components/ui/Logo.tsx` (ou déposez `public/logo.svg`) |
| Textes des pages | fichiers `app/**/page.tsx` |

---

## 📨 Brancher le formulaire de contact

Par défaut, l'endpoint `app/api/contact/route.ts` **valide et journalise** la
demande sans envoyer d'e-mail. Pour recevoir réellement les messages, suivez les
instructions commentées dans ce fichier (option **Resend** recommandée, ou
Formspree). Ajoutez ensuite `RESEND_API_KEY` dans les variables Vercel.

---

## ⚠️ À COMPLÉTER avant mise en ligne

Cherchez `⚠️ À COMPLÉTER` dans le code. Points clés :

- [ ] **Logo** définitif (`components/ui/Logo.tsx` / `public/logo.svg`)
- [ ] **Photos** chantiers / bâtiments / aviation (`public/…`, voir `À-LIRE_MEDIAS.md`)
- [ ] **Coordonnées** définitives (`lib/site.ts`)
- [ ] **URL de production** (`lib/site.ts`)
- [ ] **Image OG** `public/og.jpg` (1200×630)
- [ ] **Mentions légales** (`app/mentions-legales/page.tsx`)
- [ ] **Politique de confidentialité** (`app/politique-confidentialite/page.tsx`)
- [ ] **Références clients / certifications** (RGE, Qualibat…)
- [ ] **Branchement e-mail** du formulaire

---

## 🎨 Notes de direction artistique

- Palette : obsidienne `#0A0B0D`, anthracite, blanc cassé `#EDEEF0`, accents
  platine/acier/or selon l'entité (Obsidian / OBSI'BAT / APIRYON).
- Typo : **Clash Display** (titres, via Fontshare) + **Inter** (corps).
- Toutes les animations respectent `prefers-reduced-motion`.

© Groupe Obsidian.
