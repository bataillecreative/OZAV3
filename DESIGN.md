# Design

> Source de vérité visuelle. Lue par toute commande `/impeccable` avant
> exécution. Format inspiré de Google Stitch DESIGN.md.

## Visual theme

Désaturée, chaude, terreuse. Crème pellicule en fond canvas, sodium d'enseigne
sur le bâti, plum d'heure bleue au footer. **Aucune couleur saturée pure** ne
traverse le système — le seul accent saturé est le duo *Paris, Texas* (magenta
+ rouge terracotta), réservé aux signaux. Inspiration cinéma Wim Wenders /
peinture Edward Hopper, transposée à la marge périurbaine française.

## Color palette

20 tokens, 5 familles + 1 signal. Source : [src/styles/tokens.css](./src/styles/tokens.css).

| Famille | Tokens | Hex | Rôle |
|---|---|---|---|
| Neutral | `--neutral-100/200/400/900` | `#F0EBDF · #D6CFC0 · #A8A097 · #2C2820` | fonds, contours, texte |
| Green | `--green-300/500/700` | `#BBC5BB · #8FA597 · #5F7066` | sols perméables, parcs |
| **Water** (monopole) | `--water-100/400/700` | `#DCE6E8 · #8AAFB6 · #3C5E68` | **eau uniquement** |
| **Network** (monopole) | `--network-300/500/700` | `#BAAFC2 · #8C7B96 · #4E4360` | **commerce + axes routiers uniquement** |
| Warm | `--warm-300/400/700` | `#E8C282 · #D4A975 · #7A5224` | sodium, bâti, artères |
| **Signal** (Paris/Texas) | `--signal-100/400/500/700` | `#F5DDD7 · #D63A6E · #B5483A · #5A1F2E` | magenta carte / rouge web |

Tokens sémantiques dérivés : `--bg-canvas`, `--bg-surface`, `--text-primary/secondary/tertiary`, `--border-subtle/default`, `--action-default/hover`, `--focus-ring`.

## Typography

Trois polices, jamais mélangées dans le même rôle.

| Police | CDN | Rôle | Token taille |
|---|---|---|---|
| Anton | Google Fonts | Display, all-caps, single weight | `--type-h1/h2/h3-size` + `--type-display-xxl-size` |
| Supreme | Fontshare (300/400/500/700 + 300i) | Body, prose, UI | `--type-lede/body/small-size` |
| JetBrains Mono | Google Fonts | Data, métadonnées, cartouches | `--type-meta/eyebrow-size` |

Classes utilitaires miroir : `.h1` `.h2` `.h3` `.lede` `.body` `.small` `.quote` `.meta` `.eyebrow` `.mono` `.sc`.

## Spacing & layout

Échelle base 4 : `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80` (`--space-1` → `--space-9`). Largeur de contenu max suggérée : 1280–1320 px centrée. Marges latérales : `var(--space-9)`.

## Radii

Échelle stricte — rien de plus arrondi que 10 px sauf pills 999 px.

| Token | Valeur | Usage |
|---|---|---|
| `--radius-sm` | 3 px | swatches, alerts |
| `--radius-md` | 6 px | boutons, inputs |
| `--radius-lg` | 10 px | cartes principales |
| `--radius-pill` | 999 px | pills de status |

## Shadows

Trois niveaux discrets, **toujours en noir chaud** `rgba(44, 40, 32, *)` — jamais en gris-bleu froid.

- `--shadow-sm` — cartes simples
- `--shadow-md` — toolbars, tooltips
- `--shadow-lg` — élévations importantes

## Components

À composer via `/impeccable craft` selon les surfaces. Conventions :

- Cartes : `bg-surface` + `border-subtle` 1 px + `radius-lg` + `shadow-sm`. Pas de bordure colorée à gauche, pas de header coloré.
- Boutons primary : `--signal-500` → hover `--signal-700`. Pills 999 px pour le CTA principal de la nav.
- Pills de status : `radius-pill`, fond et bordure tintés depuis le token de l'état.
- Inputs : `border-default` + focus `box-shadow: 0 0 0 3px var(--focus-ring)` + bordure `--signal-500`.

## Motion

Quasi absente. Transitions CSS uniquement, durées `--duration-fast` 0.15 s / `--duration-medium` 0.3 s / `--duration-slow` 0.4 s. Easing canonique : `--ease-default: cubic-bezier(0.4, 0, 0.2, 1)`. Aucun spring, aucun bounce, aucun scroll-jacking. Tout est gated derrière `@media (prefers-reduced-motion: no-preference)` quand l'animation est non-essentielle.

## Imagery

Chaude, désaturée, grain pellicule. Référents : Hopper (peinture), Wenders + Müller (cinéma). Pas de B&W pur, pas de cool tones, pas d'imagerie commerciale léchée.

## Iconography

Quasi absente. Glyphes typographiques préférés (`·` `—` `↗` `●` `°` `−`). Si une icône doit exister : stroke 1.5 px, jamais filled, palette neutral-900 ou text-tertiary. Aucun emoji.
