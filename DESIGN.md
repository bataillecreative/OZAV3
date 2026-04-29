---
name: Open Zone Acte
description: Atlas urbaniste-éditorial des zones commerciales périphériques françaises.
colors:
  neutral-100-cream-pellicule: "#F0EBDF"
  neutral-200-warm-ash: "#D6CFC0"
  neutral-400-mid-warm-grey: "#A8A097"
  neutral-900-film-ink: "#2C2820"
  green-300-pale-sage: "#BBC5BB"
  green-500-grey-sage: "#8FA597"
  green-700-deep-sage: "#5F7066"
  water-100-pale-water: "#DCE6E8"
  water-400-cendre-blue: "#8AAFB6"
  water-700-deep-water: "#3C5E68"
  network-300-pale-plum: "#BAAFC2"
  network-500-grey-plum: "#8C7B96"
  network-700-deep-plum: "#4E4360"
  warm-300-pale-sodium: "#E8C282"
  warm-400-sodium-gold: "#D4A975"
  warm-700-burnt-amber: "#7A5224"
  signal-100-soft-salmon: "#F5DDD7"
  signal-400-jane-magenta: "#D63A6E"
  signal-500-travis-red: "#B5483A"
  signal-700-dark-brick: "#5A1F2E"
  bg-canvas-dawn: "#E8E2D8"
  bg-tone-dawn: "#DCD4D2"
typography:
  display:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(40px, 4.5vw, 68px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "0"
  headline:
    fontFamily: "Anton, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.10
    letterSpacing: "0"
  title:
    fontFamily: "Anton, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0"
  body:
    fontFamily: "Supreme, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.005em"
  lede:
    fontFamily: "Supreme, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: 1.60
    letterSpacing: "0"
  quote:
    fontFamily: "Supreme, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: 1.40
    letterSpacing: "0"
    fontStyle: "italic"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.18em"
  eyebrow:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.18em"
  coord:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  sm: "3px"
  md: "6px"
  lg: "10px"
  pill: "999px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "80px"
components:
  button-primary:
    backgroundColor: "{colors.water-700-deep-water}"
    textColor: "{colors.neutral-100-cream-pellicule}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.neutral-900-film-ink}"
    textColor: "{colors.neutral-100-cream-pellicule}"
  button-secondary:
    backgroundColor: "{colors.neutral-100-cream-pellicule}"
    textColor: "{colors.neutral-900-film-ink}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-400-mid-warm-grey}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  pill-status:
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  nav-item:
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  card-fiche:
    backgroundColor: "{colors.bg-canvas-dawn}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input-field:
    backgroundColor: "{colors.bg-canvas-dawn}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  letterbox:
    backgroundColor: "{colors.neutral-900-film-ink}"
    textColor: "{colors.neutral-100-cream-pellicule}"
    typography: "{typography.label}"
    height: "36px"
---

# Design System: Open Zone Acte

## 1. Overview

**Creative North Star: "L'Atlas Cendré"**

Open Zone Acte est un atlas urbaniste-éditorial des zones commerciales périphériques françaises — ZAC, retail parks, hypermarchés, autoroutes desservantes. Le design SERT l'usage métier (collectivités, urbanistes, chercheurs, journalistes spécialisés) plus qu'il ne se met en scène. Le « feel » éditorial cinématique vient en complément, jamais contre la rapidité d'usage. Voix collective, pas commerciale. Une revue d'urbanisme, pas une charte de marque.

La palette est **désaturée, chaude, terreuse**. Crème pellicule en fond, sodium d'enseigne sur le bâti, plum d'heure bleue ponctuel. Aucune couleur saturée pure ne traverse le système — le seul accent saturé est le duo signal réservé aux POI cartographiques (magenta) et aux focus web (rouge terracotta). Les neutres sont systématiquement tintés vers le chaud ; le noir vrai est interdit ; le blanc papier aussi. Le système rejette explicitement les esthétiques SaaS (gradients violets, hero émotionnel, CTAs `Get started`), les dashboards templates (cartes empilées toutes pareilles), les sites de retail park (jaune criard, bandeaux promo) et la civic-tech aride (Excel à nu, contraste hostile).

**Key Characteristics:**
- Désaturation systématique — chaque hex est tinté chaud ou cendré.
- Trois monopoles chromatiques verrouillés : eau (bleu cendré), commerce + axes (violet grisé), signal Paris/Texas (magenta carte / rouge web).
- Trois polices verrouillées : Anton (display), Supreme (body), JetBrains Mono (data).
- Lightmode strict pour le canvas du site ; le footer s'appuie sur la couleur d'accent eau (`--water-700`) en sombre, et ses variantes claire/foncée — exception ciblée et délimitée.
- Animation quasi absente — transitions CSS sobres, jamais de bounce, jamais de spring.
- Aucun emoji ; glyphes Unicode admis (`·` `—` `↗` `●` `°` `−`).

## 2. Colors

Une palette de 18 tokens organisée en 5 familles thématiques + 1 signal. Le footer s'appuie sur la famille water existante (water-700 background, water-100 alpha texte, water-100 hover).

### Primary
- **Cendre Blue** (`#8AAFB6`, `--water-400`) : bleu cendré pour la signalétique eau sur la carte ; aussi accent visuel principal du site (CTA secondaires, dropcaps, états actifs nav). Source du `--hour-accent` figé sur dawn.
- **Deep Water** (`#3C5E68`, `--water-700`) : token d'action principal (`--action-default`). Boutons primaires, focus inputs, navigation active, dropcaps éditoriales.

### Secondary
- **Travis Red** (`#B5483A`, `--signal-500`) : rouge terracotta web — focus, alertes critiques, signal d'erreur web. Réservé au signal, jamais en couleur d'action courante.
- **Jane Magenta** (`#D63A6E`, `--signal-400`) : magenta cartographique — POI majeurs sur la carte uniquement. Jamais utilisé sur le web hors carte.

### Tertiary
- **Sodium Gold** (`#D4A975`, `--warm-400`) : lumière d'enseigne, bâti courant, projets en études (état pill).
- **Grey Sage** (`#8FA597`, `--green-500`) : sols perméables, parcs, mobilité douce, projets réalisés (état pill).
- **Grey Plum** (`#8C7B96`, `--network-500`) : commerce + axes routiers (monopole strict). Jamais utilisé pour du violet décoratif.

### Neutral
- **Cream Pellicule** (`#F0EBDF`, `--neutral-100`) : fond surface, contraste sur emphase, fond badge. Tinté warm, pas de blanc papier.
- **Dawn Canvas** (`#E8E2D8`, `--bg-canvas`) : fond canvas du site (légèrement plus froid que neutral-100, dawn cendré pré-aube).
- **Warm Ash** (`#D6CFC0`, `--neutral-200`) : bordure subtile, séparateur léger.
- **Mid Warm Grey** (`#A8A097`, `--neutral-400`) : bordure courante, état désactivé.
- **Film Ink** (`#2C2820`, `--neutral-900`) : texte primaire, fond emphase, letterbox cinemascope. Encre brun-pellicule, jamais noir vrai.

### Footer (exception délimitée — water family)
- **Deep Water** (`#3C5E68`, `--water-700`) : background du footer. Repris de la couleur d'accent du site, en sombre.
- **Pale Water** (`#DCE6E8`, `--water-100`) : texte du footer (à 55 % d'alpha au repos), couleur des liens au hover (full).
- *Aucun token plum ne traverse plus le système (retiré 2026-04-29).* Le footer reste l'unique exception délimitée au lightmode strict.

### Named Rules

**The Three Monopoles Rule.** Le bleu cendré est l'unique bleu — monopole strict de l'eau. Le violet grisé est exclusif au commerce et à ses axes routiers. Le signal est bicéphale : magenta sur la carte, rouge sur le web. **Un seul signal par vue.** Toute couleur hors palette ou tout détournement de monopole est refusé.

**The Bicéphale Signal Rule.** Le magenta `#D63A6E` n'apparaît jamais sur le web hors carte. Le rouge `#B5483A` n'apparaît jamais sur la carte. Jamais les deux dans la même surface visible.

**The Saturation-Off Rule.** Aucune couleur saturée pure ne traverse le système — y compris les neutres, qui sont tintés warm (chroma 0.005–0.01 vers la marque). Le noir vrai (`#000`) et le blanc papier (`#fff`) sont prohibés.

**The Lightmode Strict Rule.** Le canvas du site reste light en permanence (`--bg-canvas: #E8E2D8`, dawn cendré). Le footer en water-700 (couleur d'accent en sombre) est l'unique exception délimitée. Aucun darkmode global, aucun gradient temporel sur les pages utilitaires.

## 3. Typography

**Display Font:** Anton (with Impact, sans-serif fallback)
**Body Font:** Supreme (with system-ui, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** Pattern Deuxième Acte hérité — display brutaliste serré (Anton, all-caps optionnel) sur sans humaniste (Supreme, échelle 100–900 variable + italique). JetBrains Mono ajouté pour la charge data cartographique : cartouches `HH·MM`, codes tokens, coordonnées, mesures. Aucune police au-delà des trois.

### Hierarchy
- **Display** (Anton 400, `clamp(40–68px)`, lh 1.08) : H1 éditorial, fiches, hero galerie. Letter-spacing 0, mixed-case (registre éditorial doux, arbitrage 2026-04-28).
- **Headline** (Anton 400, 32px, lh 1.10) : H2 sections, grandes valeurs métier (surface en hectares dans les fiches).
- **Title** (Anton 400, 22px, lh 1.15) : H3 sous-sections, popovers, toponymes de fiche.
- **Body** (Supreme 400, 14.5px, lh 1.65) : prose courante. Cap line length 65–75ch.
- **Lede** (Supreme 300, 16px, lh 1.60) : entrées d'article, hero subtitle, leads de fiche.
- **Quote** (Supreme 300 italique, 18px, lh 1.40) : pull-quotes éditoriales — encadrées par règles top/bottom (jamais side-stripe).
- **Label** (JetBrains Mono 400, 10px, tracking 0.18em, uppercase) : slates, cartouches, micro-mono.
- **Eyebrow** (JetBrains Mono 500, 11px, tracking 0.18em, uppercase, color signal-500 ou water-700) : labels de section, surtitres.
- **Coord** (JetBrains Mono 400, 13px, tracking 0.04em) : coordonnées géo, mesures, métadonnées numériques.

### Named Rules

**The Three Fonts Rule.** Le système n'admet que trois polices : Anton, Supreme, JetBrains Mono. Aucune serif éditoriale, aucun geometric SaaS, aucun display alternatif. Toute proposition d'une 4ème police est refusée par défaut.

**The Display Mixed-Case Rule.** Anton est utilisé en mixed-case sur les titres display (H1–H4) — registre éditorial doux. Les utilitaires `.meta` / `.eyebrow` / `.slate` (mono) restent uppercase. Pas d'all-caps sur les titres Anton dans le site React (arbitrage 2026-04-28).

**The Letter-Spacing Rule.** Anton à 0 (jamais positif sur du display, ça l'écrase). Supreme à `-0.005em` à neutre selon la taille. JetBrains Mono à 0.18em sur labels/eyebrow, 0.04em sur coord.

## 4. Elevation

Système **quasi-flat avec ombres rares**. Trois niveaux d'ombre discrets en noir chaud (`rgba(44, 40, 32, *)`) — jamais en gris-bleu froid. Les ombres servent à signaler une élévation fonctionnelle (popover, toast, hover state du CTA hero), jamais à décorer une carte au repos.

### Shadow Vocabulary
- **shadow-sm** (`box-shadow: 0 1px 2px rgba(44, 40, 32, 0.06)`) : cartes simples, contrôles MapLibre.
- **shadow-md** (`box-shadow: 0 4px 12px -4px rgba(44, 40, 32, 0.10), 0 2px 4px -2px rgba(44, 40, 32, 0.06)`) : toolbars, tooltips.
- **shadow-lg** (`box-shadow: 0 16px 32px -12px rgba(44, 40, 32, 0.16), 0 4px 8px -2px rgba(44, 40, 32, 0.08)`) : popovers de fiche carte, toasts.

### Named Rules

**The Warm-Shadow Rule.** Toutes les ombres utilisent une teinte noire chaude `rgba(44, 40, 32, *)`. Une ombre en gris-bleu froid (par exemple `rgba(0, 0, 0, *)` ou `rgba(15, 23, 42, *)`) est interdite — elle casse la cohérence pellicule.

**The Flat-At-Rest Rule.** Les surfaces sont plates au repos. Une ombre apparaît en réponse à un état (hover sur un CTA hero, popover ouvert, toast visible). Une carte en grille de galerie reste plate ; elle se distingue par un translateY subtil au hover, pas par une ombre flottante.

## 5. Components

### Buttons (`.oz-btn`)
- **Shape:** rounded-md (`6px`).
- **Primary:** background `--action-default` (water-700, `#3C5E68`), text `--neutral-100`. Padding `12px 20px`. Typography label (mono 12px, tracking 0.14em, uppercase).
- **Hover:** background `--action-hover` (water-700 mixé 20% neutral-900). Pas de transform.
- **Secondary:** background `--bg-surface`, border `--border-default`, text `--text-primary`. Hover : border `--text-primary`.
- **Ghost:** background transparent, border `--border-subtle`, text `--text-secondary`. Hover : background `--water-100`, color `--action-hover`, border `--water-700`.
- **Hero CTA (`.oz-btn.lg`)** : capsule pill (radius 999px), padding `14px 32px`, min-width 240px. Hover : `translateY(-1px)` + shadow water-tinted (0 10px 28px -8px rgba(60, 94, 104, 0.45)).
- **Focus:** `box-shadow: 0 0 0 3px var(--focus-ring)` (water-700 alpha 0.30).

### Pills (`.oz-pill`)
- **Style:** background tinté de la famille du token d'état, border 1px de la même famille (palier moyen), text `palier foncé` (lecture WCAG). Radius pill (999px), padding `4px 10px`, typography mono 10px tracking 0.12em uppercase.
- **States** (5 états métier) :
  - `amont` — network family (violet : `#4E4360` text, `#BAAFC2` border, fond mixte 18%)
  - `etudes` — warm family (sodium : `#7A5224` text, `#E8C282` border)
  - `chantier` — signal family (terracotta : `#5A1F2E` text, `#B5483A` border)
  - `realise` — green family (sage : `#5F7066` text, `#8FA597` border)
  - `arrete` — neutral family (`text-tertiary` + border default)
- **Dot:** point coloré `6×6px` à gauche, couleur du palier moyen de la famille.

### Cards (galerie + fiche popover)
- **Galerie card** : flex column gap 12px, thumbnail `aspect-ratio: 4/3` background `--bg-tone` border-radius `radius-sm` (3px) avec border `--border-subtle`. Hover : `translateY(-3px)` (transform medium 0.3s, jamais shadow). Stretched-link via `<button>` overlay invisible — pattern accessibilité.
- **Fiche popover** : background `--bg-canvas`, border `--border-default`, radius `radius-lg` (10px), shadow-lg. Padding `24px`. Stats en grid 2 colonnes séparées par règles haut/bas.
- **Pas de bordure colorée à gauche** sur aucune carte (règle absolue impeccable).
- **Pas de header coloré** sur les cards.

### Inputs (`.oz-filter-search`, `.oz-range-input`)
- **Style:** background `--bg-canvas`, border `--border-default` 1px, radius `radius-md` (6px), padding `10px 12px`, typography body 13px.
- **Focus:** outline none, border `--water-700`, box-shadow `0 0 0 3px var(--focus-ring)`.
- **Range slider:** track `--border-subtle` 4px, thumb `--water-700` 16px, radius 50%.
- **Checkbox** (filtres carte) : 14×14px, border `--border-default` radius 2px. État coché : background `--water-700`, border `--water-700`, glyphe ✓ en `--neutral-100`.

### Navigation (`.oz-header`, `.oz-nav-item`, `.oz-login`)
- **Header** : sticky top, z-50, background `--bg-canvas`, border-bottom `--border-subtle`. Hauteur `56px` (`--header-clearance`).
- **Wordmark** : Anton lowercase, h4 size, accent point (`.dot`) en `--water-700`.
- **Nav item** : pill (radius 999px), padding `10px 16px`, mono 10px tracking 0.16em uppercase, color `--text-tertiary`. Hover : background `rgba(44, 40, 32, 0.04)`. Active : background mix water-700 14%, color `--water-700`, weight 600.
- **Login button** : pill outline, border `--border-default`, color `--text-secondary`. Hover : border `--text-primary`.
- **Mobile (≤720px)** : `.oz-nav` masquée, header en 2 colonnes (wordmark + actions).

### Footer (`.oz-footer`)
- Background `--water-700` (`#3C5E68`, couleur d'accent eau en sombre), text `rgba(220, 230, 232, 0.55)` (water-100 à 55 % alpha). **Seule exception délimitée au lightmode strict.** Une seule ligne de méta (mono 10px tracking 0.14em uppercase, centrée), liens avec hover vers `--water-100`.

### Letterbox cinemascope (`.oz-letterbox`)
- Composant signature OZA. Bandeau `36px` background `--neutral-900`, mono small-caps tracking 0.18em, color `rgba(240, 235, 223, 0.65)`. Lignes de fuite intérieures (inset shadows 1px).
- Usage : encadrer une page ou un fragment éditorial pour évoquer un format cinémascope. Composant rare et fonctionnel.

### POI cartographique (`.oz-poi-gl`)
- Marker rond 22×22px sur fond carte. Halo en `rgba(240, 235, 223, 0.55)` autour, ring magenta `rgba(214, 58, 110, 0.18)` au hover. Core 1.5px stroke (jamais filled), couleur du palier de la famille du POI. État sélectionné : core 2px.

### Status progression (`.oz-fiche-progress`)
- Barre flex en bordure 1px `--border-default` radius `radius-sm`, sans gap entre étapes (overflow:hidden). Chaque step :
  - **default** : background `--bg-canvas`, color `--text-tertiary`, mono 10px uppercase.
  - **done** : background `--bg-surface`, color `--text-secondary`.
  - **current** : background `--water-700`, color `--neutral-100`.
- Affiche label uppercase + année micro (`--type-micro-size`, opacity 0.7).

### Toast (`.oz-toast`)
- Position fixed top-center sous header sticky (calc clearance + space-3). Background `--bg-emphasis` (neutral-900), text `--text-on-emphasis`, radius `radius-md`, shadow-lg. Animation entrée fade + translateY 8px en `var(--ease-default)` sur 0.3s.

## 6. Do's and Don'ts

### Do:
- **Do** utiliser `--action-default` (`#3C5E68`, water-700) comme couleur de bouton primaire. Le rouge Travis n'est pas un CTA — c'est un signal.
- **Do** réserver `--signal-400` (`#D63A6E`, magenta) aux POI cartographiques uniquement, et `--signal-500` (`#B5483A`, rouge Travis) aux focus / alertes web uniquement.
- **Do** tinter les neutres vers warm (chroma 0.005–0.01 vers la marque). `--neutral-900: #2C2820` au lieu de `#000`.
- **Do** utiliser des ombres en `rgba(44, 40, 32, *)` — toujours en noir chaud.
- **Do** garder les pulls-quotes éditoriaux encadrés par règles top/bottom uniquement, jamais avec side-stripe.
- **Do** respecter `prefers-reduced-motion` sur toute animation — c'est dans `app.css` (lignes 1274–1283), tout transition descend à 0.01ms.
- **Do** capper la longueur de ligne body à 65–75ch.
- **Do** utiliser `text-wrap: balance` sur les titres et `text-wrap: pretty` sur les paragraphes (déjà en place).

### Don't:
- **Don't** introduire un darkmode global du site. Le canvas reste `#E8E2D8` en permanence (Lightmode Strict Rule). Le footer en water-700 (couleur d'accent en sombre) est l'unique exception délimitée.
- **Don't** utiliser de gradient temporel (`hour-dawn → hour-return`) sur les pages utilitaires. La narration en 6 heures est réservée aux supports éditoriaux non-utilitaires (poster, A3, about).
- **Don't** introduire un bleu non-cendré. Le bleu vif (`#78C9FF`, `#5BBDFF`, etc., héritage Deuxième Acte) est explicitement refusé.
- **Don't** utiliser `--signal-400` magenta sur le web hors carte. Don't utiliser `--signal-500` rouge sur la carte.
- **Don't** mélanger les deux signaux (magenta + rouge) dans la même vue visible. Un seul signal par surface.
- **Don't** utiliser `border-left` ou `border-right` > 1px comme accent coloré (side-stripe banni — règle absolue impeccable).
- **Don't** utiliser `background-clip: text` sur du gradient (gradient text banni).
- **Don't** empiler des cards identiques en grille (anti-référence dashboard template).
- **Don't** introduire un emoji. Glyphes Unicode admis : `·` `—` `↗` `●` `°` `−`.
- **Don't** introduire une 4ème police. Anton + Supreme + JetBrains Mono — point.
- **Don't** utiliser un shadow gris-bleu froid (`rgba(0, 0, 0, *)` ou bleu corporate). Toujours `rgba(44, 40, 32, *)`.
- **Don't** mettre le rouge Travis (`#B5483A`) sur les boutons d'action courante. Il est réservé au signal.
- **Don't** utiliser des éclairages SaaS (gradients violets, hero émotionnel, CTAs « Get started for free »). C'est listé en anti-référence dans PRODUCT.md.
- **Don't** copier l'esthétique des sites de retail park (jaune criard, photos shopping, bandeaux promo). Le sujet du projet n'est pas son esthétique.
- **Don't** réintroduire des marges latérales calculées en JS (héritage Deuxième Acte refusé). Le site est HTML+CSS pur, marges en `clamp()`.
