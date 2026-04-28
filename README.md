# Open Zone Acte — Scaffold Impeccable

Base de travail propre pour itérer sur Open Zone Acte avec la skill
[`impeccable`](https://github.com/pbakaus/impeccable) déjà branchée.

## Stack

- Vite 8 · React 19 · TypeScript 6 strict
- Polices CDN (Anton + JetBrains Mono via Google Fonts) + Supreme local (`/public/font`)
- Tokens DS v6 dans `src/styles/tokens.css` (palette + typo + espacement)
- Composants `.oz-*` dans `src/styles/app.css` (port du prototype HTML/CSS)
- framer-motion (page transitions), maplibre-gl (carte) et tailwind sont
  installés et activement utilisés ; toujours pas d'autre dépendance UI
  par défaut

## Démarrer

```bash
npm install
npm run dev          # → http://localhost:5173
npm run typecheck    # tsc --noEmit
npm run build        # tsc -b && vite build
```

## Skill impeccable

Installée à `.claude/skills/impeccable/`. Les fichiers `PRODUCT.md` et
`DESIGN.md` à la racine satisfont les pre-flight gates (context + product +
design) — toute commande peut tourner sans `/impeccable teach` au préalable.

Commandes les plus utiles ici :

| Commande | Quand |
|---|---|
| `/impeccable shape <surface>` | Avant de coder une nouvelle surface — interview brève qui confirme l'intention |
| `/impeccable craft` | Génère le code après confirmation du shape brief |
| `/impeccable audit [zone]` | Détecte anti-patterns DS sur une page existante |
| `/impeccable critique [zone]` | Lecture critique du rendu actuel |
| `/impeccable polish [zone]` | Passes de finition contrôlées |
| `/impeccable document` | Rafraîchit DESIGN.md depuis le code |

## Verrous DS (cf. PRODUCT.md / DESIGN.md)

- **3 monopoles chromatiques** : eau / commerce / signal — non négociables
- **3 polices** : Anton / Supreme / JetBrains Mono — non négociables
- **Aucun emoji** : glyphes Unicode admis `·` `—` `↗` `●` `°` `−`
- **Animation quasi absente** : transitions CSS sobres + `prefers-reduced-motion` respecté

## Structure

```
OpenZoneActe_Impecable/
├── .claude/
│   ├── launch.json              ← preview vite-dev / vite-preview
│   └── skills/impeccable/       ← skill (35 references + scripts)
├── src/
│   ├── App.tsx                  ← shell + routeur d'état
│   ├── main.tsx
│   ├── index.css                ← entry point (import tokens + app)
│   ├── components/              ← Header, Footer, HourSwitcher, Pill…
│   ├── pages/                   ← Home, Carte, Galerie, Fiche
│   ├── data/                    ← projects, taxonomy
│   ├── lib/                     ← router (state-based)
│   └── styles/
│       ├── tokens.css           ← 20 tokens + échelle typo (DS v6)
│       └── app.css              ← composants .oz-* + responsive
├── public/                      ← assets statiques (favicon, fonts si besoin)
├── PRODUCT.md                   ← register + users + purpose + anti-refs (gate)
├── DESIGN.md                    ← palette + typo + foundations (gate)
├── package.json
├── tsconfig.json (+ app/node)
├── vite.config.ts
├── index.html
└── README.md
```
