# Product

## Register

product

## Users

**Collectivités, EPCI, aménageurs.** Trouver des références de transformations
réussies sur leur territoire ou un voisin comparable, bénéficier de l'essaimage
des bonnes pratiques, citer une source quand on défend un budget mutation.

**Urbanistes, chercheurs, journalistes spécialisés.** Accéder à une donnée
structurée, citable, géolocalisée sur les ZAC et entrées de ville françaises.
Le job-to-be-done : nommer une zone, lire son histoire, comparer ses chiffres,
exporter un extrait pour un rapport ou un article.

## Product Purpose

Open Zone Acte est une base de données collaborative qui centralise,
géolocalise, valorise et diffuse les projets de transformation des entrées de
ville et des zones commerciales périphériques françaises. Outil de référence
métier pour les acteurs de la mutation urbaine.

Succès = densité documentaire (nb de fiches, complétude des champs), citabilité
(stabilité des URLs, source visible), fluidité d'usage métier (filtres carte,
exports, fiches lisibles).

## Brand Personality

Sobre · urbaniste-éditoriale · précise. Voix collective (« on »), pas
commerciale. Vocabulaire signature : *marge · périphérie · sodium · plum ·
monopole · échelle · cartouche · slate*. Refuse explicitement : *vibrant ·
bold · fresh · innovative · seamless · unlock*. Le ton est celui d'une revue
d'urbanisme, pas d'une charte de marque.

## Anti-references

- **SaaS marketing générique** — gradients violets, hero émotionnel, CTAs
  « Get started for free », illustrations stock isométriques.
- **Dashboards templates** — Tailwind UI / shadcn par défaut, cartes empilées
  toutes pareilles, zero point de vue.
- **Sites de retail park / centres commerciaux** — ironie : on parle des ZAC
  mais on ne doit pas avoir l'esthétique (jaune criard, photos shopping,
  bandeaux promo, polices décoratives).
- **Civic-tech aride** — Excel à nu, typographie sans soin, contraste hostile.

## Strategic Principles

- **Le design SERT l'usage métier** — outil de référence pour aménageurs et
  urbanistes ; le « feel » éditorial cinématique vient en complément, jamais
  contre la rapidité d'usage.
- **Trois monopoles chromatiques verrouillés** : eau (bleu cendré uniquement),
  commerce + axes routiers (violet grisé uniquement), signal Paris/Texas
  (magenta de Jane sur la carte ; rouge Travis sur le web — un seul signal par
  vue).
- **Trois polices verrouillées** : Anton (display, all-caps, single weight),
  Supreme (body, 300/400/500/700 + italique), JetBrains Mono (data).
- **Aucun emoji.** Glyphes Unicode admis : `·` `—` `↗` `●` `°` `−`.
- **Animation quasi absente** — transitions CSS sobres uniquement. Pas de
  scroll-jacking, pas de spring, pas de bounce.
- **Lightmode strict.** Open Zone Acte est en lightmode crème pellicule
  (`--bg-canvas: #E8E2D8`). Toute proposition de darkmode pour le canvas du
  site est refusée. Les exceptions ciblées par fragment (typiquement un footer
  plus sombre) sont à arbitrer au cas par cas, jamais étendues par défaut.
- **Narration en 6 heures réservée aux supports éditoriaux non-utilitaires.**
  Le système chromatique a été pensé pour traverser une journée
  (`hour-dawn` → `hour-return`), mais le site React est figé sur `dawn`
  (arbitrage 2026-04-28). La narration complète reste disponible pour poster,
  A3, page about, présentation. Sur le site opérationnel : pas de gradient
  temporel, fond canvas uniforme.

## Accessibility

WCAG AA cible plancher (4.5:1 texte normal, 3:1 large, focus visibles, ordre de
tabulation = ordre visuel). `prefers-reduced-motion` strictement respecté —
toute animation passe par un `@media` qui la coupe.

## Sources & héritage

Le travail de recherche amont — héritage Deuxième Acte, généalogie de la
palette, polices imposées, structure narrative en heures, références
culturelles qui nourrissent la direction artistique — est consolidé dans
`C:\Users\batth\Desktop\OZA_V5\` (voir le `README.md` du dossier pour la
structure).

Ces fichiers sont des **gardes opérationnelles internes** pour les commandes
`/impeccable shape` et `/impeccable craft` qui touchent à la profondeur
narrative ou à l'héritage chromatique. La skill peut s'y référer mais ne les
charge pas automatiquement (la source de vérité opérationnelle reste
PRODUCT.md + DESIGN.md + tokens.css).

**Matière de travail, jamais d'exposition.** Les références qui nourrissent
la DA (cinéma, peinture, lieux, citations, ancêtres typographiques) ne se
citent pas dans le contenu produit — pas dans l'interface du site, pas dans
les copy, pas dans la communication publique. Elles sont l'outillage du
regard, pas le discours. Le projet doit pouvoir tenir debout sans les nommer.
