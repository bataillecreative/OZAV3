"""
Build the Open Zone Acte handover PDF.
Generates a print-ready PDF for both external developer onboarding and
client annotation (questionnaire + modification request log).
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, HRFlowable, Image, Flowable, ListFlowable, ListItem
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from datetime import date
import os

# ---------------------------------------------------------------------------
# Tokens — palette + tokens éditoriaux extraits de DESIGN.md
# ---------------------------------------------------------------------------
NEUTRAL_100 = HexColor('#F0EBDF')
BG_CANVAS   = HexColor('#E8E2D8')
NEUTRAL_200 = HexColor('#D6CFC0')
NEUTRAL_400 = HexColor('#A8A097')
NEUTRAL_900 = HexColor('#2C2820')
TEXT_TERTIARY = HexColor('#5E5850')
TEXT_SECONDARY = HexColor('#3F3A30')
WATER_700   = HexColor('#3C5E68')
WATER_400   = HexColor('#8AAFB6')
WATER_100   = HexColor('#DCE6E8')
NETWORK_700 = HexColor('#4E4360')
WARM_700    = HexColor('#7A5224')
GREEN_700   = HexColor('#5F7066')
SIGNAL_500  = HexColor('#B5483A')

# ---------------------------------------------------------------------------
# Page setup
# ---------------------------------------------------------------------------
PAGE_W, PAGE_H = A4
MARGIN_L = 22 * mm
MARGIN_R = 22 * mm
MARGIN_T = 22 * mm
MARGIN_B = 24 * mm

OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'OpenZoneActe-Handover.pdf')


# ---------------------------------------------------------------------------
# Header / footer drawn on every page
# ---------------------------------------------------------------------------
def draw_page_chrome(canvas, doc):
    canvas.saveState()
    # Top-left running head
    canvas.setFont('Helvetica', 7)
    canvas.setFillColor(TEXT_TERTIARY)
    canvas.drawString(MARGIN_L, PAGE_H - 12 * mm, 'OPEN  ZONE  ACTE  ·  DOSSIER  DE  REMISE')
    # Top-right project tag
    canvas.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 12 * mm, 'v0.1.0  ·  ' + date.today().isoformat())
    # Top rule
    canvas.setStrokeColor(NEUTRAL_200)
    canvas.setLineWidth(0.4)
    canvas.line(MARGIN_L, PAGE_H - 14 * mm, PAGE_W - MARGIN_R, PAGE_H - 14 * mm)

    # Bottom rule + page number
    canvas.line(MARGIN_L, MARGIN_B - 8 * mm, PAGE_W - MARGIN_R, MARGIN_B - 8 * mm)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(TEXT_TERTIARY)
    canvas.drawString(MARGIN_L, MARGIN_B - 14 * mm, 'Deuxieme Acte  ·  association loi 1901')
    canvas.drawRightString(PAGE_W - MARGIN_R, MARGIN_B - 14 * mm, f'{doc.page:02d}')
    canvas.restoreState()


def draw_cover_chrome(canvas, doc):
    """Cover page: no running head/footer, instead full-bleed framing."""
    canvas.saveState()
    # Letterbox top strip
    canvas.setFillColor(NEUTRAL_900)
    canvas.rect(0, PAGE_H - 18 * mm, PAGE_W, 18 * mm, fill=1, stroke=0)
    # Letterbox bottom strip
    canvas.rect(0, 0, PAGE_W, 18 * mm, fill=1, stroke=0)
    # Title-strip text
    canvas.setFont('Helvetica', 7)
    canvas.setFillColor(NEUTRAL_100)
    canvas.drawString(MARGIN_L, PAGE_H - 12 * mm, 'OPEN  ZONE  ACTE')
    canvas.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 12 * mm, 'DOSSIER  DE  REMISE  ·  v0.1.0')
    canvas.drawString(MARGIN_L, 8 * mm, 'CONFIDENTIEL  ·  USAGE  INTERNE')
    canvas.drawRightString(PAGE_W - MARGIN_R, 8 * mm, date.today().isoformat())
    canvas.restoreState()


# ---------------------------------------------------------------------------
# Paragraph styles
# ---------------------------------------------------------------------------
styles = getSampleStyleSheet()

S_COVER_PRETITLE = ParagraphStyle(
    'CoverPretitle', parent=styles['Normal'],
    fontName='Helvetica', fontSize=8, leading=12,
    textColor=TEXT_TERTIARY, spaceAfter=24, alignment=TA_LEFT,
)
S_COVER_TITLE = ParagraphStyle(
    'CoverTitle', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=42, leading=46,
    textColor=NEUTRAL_900, spaceAfter=10, alignment=TA_LEFT,
)
S_COVER_SUBTITLE = ParagraphStyle(
    'CoverSubtitle', parent=styles['Normal'],
    fontName='Helvetica', fontSize=14, leading=20,
    textColor=TEXT_SECONDARY, spaceAfter=24, alignment=TA_LEFT,
)
S_COVER_META = ParagraphStyle(
    'CoverMeta', parent=styles['Normal'],
    fontName='Helvetica', fontSize=8, leading=14,
    textColor=TEXT_TERTIARY, alignment=TA_LEFT,
)
S_COVER_META_VAL = ParagraphStyle(
    'CoverMetaVal', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=10, leading=14,
    textColor=NEUTRAL_900, alignment=TA_LEFT,
)

S_EYEBROW = ParagraphStyle(
    'Eyebrow', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=7, leading=10,
    textColor=WATER_700, spaceBefore=18, spaceAfter=6,
)
S_H1 = ParagraphStyle(
    'H1', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=22, leading=26,
    textColor=NEUTRAL_900, spaceBefore=2, spaceAfter=12,
)
S_H2 = ParagraphStyle(
    'H2', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=14, leading=18,
    textColor=NEUTRAL_900, spaceBefore=14, spaceAfter=6,
)
S_H3 = ParagraphStyle(
    'H3', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=10, leading=14,
    textColor=NEUTRAL_900, spaceBefore=10, spaceAfter=4,
)

S_BODY = ParagraphStyle(
    'Body', parent=styles['Normal'],
    fontName='Helvetica', fontSize=9.5, leading=14,
    textColor=TEXT_SECONDARY, spaceAfter=6, alignment=TA_LEFT,
)
S_BODY_JUST = ParagraphStyle(
    'BodyJ', parent=S_BODY, alignment=TA_JUSTIFY,
)
S_NOTE = ParagraphStyle(
    'Note', parent=S_BODY, fontSize=8.5, textColor=TEXT_TERTIARY,
    fontName='Helvetica-Oblique',
)
S_MONO = ParagraphStyle(
    'Mono', parent=styles['Normal'],
    fontName='Courier', fontSize=8.5, leading=12,
    textColor=TEXT_SECONDARY,
)
S_MONO_SMALL = ParagraphStyle(
    'MonoSmall', parent=S_MONO, fontSize=7.5, leading=11,
)
S_LIST = ParagraphStyle(
    'List', parent=S_BODY, leftIndent=14, bulletIndent=2,
    spaceAfter=3,
)

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def eyebrow(label):
    return Paragraph(label.upper(), S_EYEBROW)


def h1(text):
    return Paragraph(text, S_H1)


def h2(text):
    return Paragraph(text, S_H2)


def h3(text):
    return Paragraph(text, S_H3)


def body(text):
    return Paragraph(text, S_BODY)


def bodyj(text):
    return Paragraph(text, S_BODY_JUST)


def note(text):
    return Paragraph(text, S_NOTE)


def rule(color=NEUTRAL_200, thickness=0.6, space_before=4, space_after=8):
    return HRFlowable(
        width='100%', color=color, thickness=thickness,
        spaceBefore=space_before, spaceAfter=space_after,
    )


def mono(text):
    return Paragraph(text, S_MONO)


def bullet_list(items, style=None):
    style = style or S_LIST
    lst = []
    for it in items:
        lst.append(Paragraph(f'<bullet>&middot;</bullet>&nbsp;{it}', style))
    return lst


class ColorSwatch(Flowable):
    """A small hex color swatch with its name and value."""
    def __init__(self, hex_color, name, value, width=18*mm, height=12*mm):
        Flowable.__init__(self)
        self.color = HexColor(hex_color)
        self.name = name
        self.value = value
        self.width = width
        self.height = height

    def draw(self):
        c = self.canv
        c.setFillColor(self.color)
        c.setStrokeColor(NEUTRAL_200)
        c.setLineWidth(0.3)
        c.rect(0, 0, self.width, self.height, fill=1, stroke=1)
        c.setFillColor(NEUTRAL_900)
        c.setFont('Helvetica-Bold', 6.5)
        c.drawString(self.width + 3, self.height - 5, self.name.upper())
        c.setFont('Courier', 6.5)
        c.setFillColor(TEXT_TERTIARY)
        c.drawString(self.width + 3, self.height - 11, self.value)


# ---------------------------------------------------------------------------
# Document content
# ---------------------------------------------------------------------------
story = []

# ============================================================================
# COVER
# ============================================================================
story.append(Spacer(1, 50 * mm))
story.append(Paragraph(
    'DOSSIER&nbsp;&nbsp;DE&nbsp;&nbsp;REMISE&nbsp;&nbsp;&middot;&nbsp;&nbsp;HANDOVER',
    S_COVER_PRETITLE,
))
story.append(Paragraph('Open Zone Acte', S_COVER_TITLE))
story.append(Paragraph(
    'Atlas urbaniste-editorial des zones commerciales peripheriques francaises. '
    'Documentation de remise pour client + developpeur externe.',
    S_COVER_SUBTITLE,
))

# Meta block (4 rows: Client, Prepare par, Version, Date)
cover_meta = Table([
    [Paragraph('CLIENT', S_COVER_META), Paragraph('Deuxieme Acte', S_COVER_META_VAL)],
    [Paragraph('PROJET', S_COVER_META), Paragraph('Open Zone Acte v0.1.0', S_COVER_META_VAL)],
    [Paragraph('DATE', S_COVER_META), Paragraph(date.today().isoformat(), S_COVER_META_VAL)],
    [Paragraph('STATUT', S_COVER_META), Paragraph('Pret a transferer', S_COVER_META_VAL)],
], colWidths=[35 * mm, None])
cover_meta.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
]))
story.append(cover_meta)

story.append(Spacer(1, 40 * mm))
story.append(Paragraph(
    'Ce document accompagne le code source du site Open Zone Acte. '
    'Il vise deux usages :',
    S_COVER_META,
))
story.append(Spacer(1, 4 * mm))
story.append(Paragraph(
    '<b>1.</b>&nbsp; Permettre au client de relire l\'etat livre et d\'indiquer ses '
    'modifications via le questionnaire et le journal en fin de document.',
    S_COVER_META,
))
story.append(Paragraph(
    '<b>2.</b>&nbsp; Onboarder un developpeur externe charge de la suite des travaux : '
    'stack, structure, conventions, ce qui reste a faire.',
    S_COVER_META,
))

story.append(PageBreak())

# ============================================================================
# TABLE OF CONTENTS
# ============================================================================
story.append(eyebrow('Table des matieres'))
story.append(h1('Sommaire'))
story.append(rule())

toc_data = [
    ['I',    'Vue d\'ensemble du projet',           '4'],
    ['II',   'Etat actuel : ce qui est livre',      '5'],
    ['III',  'Design system : palette, polices',    '7'],
    ['IV',   'Stack technique & architecture',      '9'],
    ['V',    'Structure des fichiers',              '10'],
    ['VI',   'Resultats de l\'audit qualite',       '11'],
    ['VII',  'Travail restant a faire',             '12'],
    ['VIII', 'Onboarding developpeur',              '13'],
    ['IX',   'Questionnaire client',                '14'],
    ['X',    'Journal des modifications demandees', '16'],
    ['XI',   'Contacts & ressources',               '18'],
]
toc_table = Table(toc_data, colWidths=[15*mm, 130*mm, None])
toc_table.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, -1), 'Helvetica', 10),
    ('FONT', (0, 0), (0, -1), 'Courier', 8.5),
    ('FONT', (2, 0), (2, -1), 'Courier', 8.5),
    ('TEXTCOLOR', (0, 0), (0, -1), WATER_700),
    ('TEXTCOLOR', (2, 0), (2, -1), TEXT_TERTIARY),
    ('TEXTCOLOR', (1, 0), (1, -1), NEUTRAL_900),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
]))
story.append(toc_table)

story.append(PageBreak())

# ============================================================================
# I. VUE D'ENSEMBLE
# ============================================================================
story.append(eyebrow('I  ·  Vue d\'ensemble'))
story.append(h1('Qu\'est-ce qu\'Open Zone Acte ?'))
story.append(rule())

story.append(bodyj(
    'Open Zone Acte est une base de donnees collaborative qui centralise, geolocalise, '
    'valorise et diffuse les projets de transformation des entrees de ville et des '
    'zones commerciales peripheriques francaises (ZAC, retail parks, hypermarches, '
    'axes desservants). C\'est un outil de reference metier pour les acteurs de la '
    'mutation urbaine.'
))

story.append(h2('Utilisateurs cibles'))
story.append(body('<b>Collectivites, EPCI, amenageurs.</b> Trouver des references de '
    'transformations reussies sur leur territoire ou un voisin comparable, beneficier '
    'de l\'essaimage des bonnes pratiques, citer une source quand on defend un budget '
    'mutation.'))
story.append(body('<b>Urbanistes, chercheurs, journalistes specialises.</b> Acceder a '
    'une donnee structuree, citable, geolocalisee sur les ZAC et entrees de ville '
    'francaises. Le job-to-be-done : nommer une zone, lire son histoire, comparer '
    'ses chiffres, exporter un extrait pour un rapport ou un article.'))

story.append(h2('Mesures de succes'))
for p in [
    '<b>Densite documentaire</b> : nombre de fiches publiees, completude des champs.',
    '<b>Citabilite</b> : stabilite des URLs, sources visibles.',
    '<b>Fluidite metier</b> : filtres carte, exports, fiches lisibles.',
]:
    story.append(Paragraph(f'<bullet>&middot;</bullet>&nbsp;{p}', S_LIST))

story.append(h2('Personnalite de marque'))
story.append(body('Sobre, urbaniste-editoriale, precise. Voix collective (« on »), pas '
    'commerciale. Le ton est celui d\'une revue d\'urbanisme, pas d\'une charte de marque. '
    'Aucun emoji, aucun gradient SaaS, aucune carte empilee generique.'))

story.append(h2('Anti-references explicites'))
for p in [
    'SaaS marketing generique (gradients violets, hero emotionnel, CTAs « Get started »).',
    'Dashboards templates (Tailwind UI / shadcn par defaut, cartes empilees toutes pareilles).',
    'Sites de retail park (jaune criard, photos shopping, polices decoratives).',
    'Civic-tech aride (Excel a nu, contraste hostile).',
]:
    story.append(Paragraph(f'<bullet>&middot;</bullet>&nbsp;{p}', S_LIST))

story.append(PageBreak())

# ============================================================================
# II. ETAT ACTUEL
# ============================================================================
story.append(eyebrow('II  ·  Etat actuel'))
story.append(h1('Ce qui est livre dans v0.1.0'))
story.append(rule())

story.append(body('Le site est une SPA React 19 + Vite + TypeScript, deployable comme '
    'fichiers statiques. Quatre ecrans completement fonctionnels avec 14 fiches projets '
    'reelles (Plan-de-Campagne, Rosny 2, Val d\'Europe, Polygone Riviera, Velizy 2, '
    'Odysseum, Carre Senart, etc.) servant de seeds editoriaux.'))

# Pages table
pages_data = [
    ['Page',    'Description',                                                       'Route'],
    ['Home',    'Hero, KPIs (3 chiffres + date de mise a jour), mini-carte FR cliquable, deux colonnes editoriales (pourquoi / qui sommes-nous).', '/home'],
    ['Carte',   'Sidebar filtres (etat, typologie, region, surface min, recherche) + carte interactive MapLibre avec 14 markers. Popover fiche ancre au marker, ferme au pan.', '/carte'],
    ['Galerie', 'Vue grille + vue liste, filtres par typologie en tabs, vignettes SVG procedurales sur 3 variantes.', '/galerie'],
    ['Fiche',   'Hero (toponyme, etat, typologie, progression 5 etapes), citation editoriale, mini-carte SVG legendee, grille metadonnees, paragraphes editoriaux.', '/fiche/:id'],
]
pages_table = Table(pages_data, colWidths=[22*mm, None, 22*mm])
pages_table.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Helvetica', 9),
    ('FONT', (0, 1), (0, -1), 'Helvetica-Bold', 9),
    ('FONT', (2, 1), (2, -1), 'Courier', 7.5),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_SECONDARY),
    ('TEXTCOLOR', (0, 1), (0, -1), NEUTRAL_900),
    ('TEXTCOLOR', (2, 1), (2, -1), TEXT_TERTIARY),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 8),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
]))
story.append(pages_table)

story.append(h2('Fonctionnalites cles'))
for p in [
    '<b>Carte interactive MapLibre</b> avec 14 POIs, filtres etat/typologie/region/surface, search par toponyme/commune.',
    '<b>Popover fiche projet</b> ancre au marker selectionne (clamp viewport, repositionne au resize, ferme au pan/zoom).',
    '<b>Mini-carte SVG legendee</b> sur la page Fiche, avec respect des 3 monopoles chromatiques (eau bleu cendre, commerce violet grise, signal magenta unique).',
    '<b>Navigation mobile</b> via drawer slide-in droite avec focus-trap, escape, return-focus et inert sur le reste de la page.',
    '<b>Reveal on scroll</b> sobre via IntersectionObserver (respecte <i>prefers-reduced-motion</i>).',
    '<b>Toast feedback</b> pour les actions « Ajouter un projet » et « Connexion » (en attente d\'implementation backend).',
    '<b>WCAG AA</b> sur l\'ensemble : focus visible, semantique correcte (main/aside/nav/article), aria-modal, contraste >= 4.5:1.',
]:
    story.append(Paragraph(f'<bullet>&middot;</bullet>&nbsp;{p}', S_LIST))

story.append(PageBreak())

# Add a second page to "Etat actuel" with feature inventory by completion status
story.append(eyebrow('II  ·  Etat actuel (suite)'))
story.append(h1('Inventaire des fonctionnalites'))
story.append(rule())

inv_data = [
    ['Fonctionnalite', 'Statut', 'Note'],
    ['Home : hero + 3 KPIs + mini-carte', 'Termine', 'Les chiffres KPI sont des placeholders.'],
    ['Carte : filtres + MapLibre + popover', 'Termine', '14 fiches seeds.'],
    ['Galerie : grille + liste + tabs', 'Termine', 'Vignettes SVG generees, non photographiques.'],
    ['Fiche : hero + meta + mini-carte + editorial', 'Termine', 'Citations et paragraphes sont des seeds.'],
    ['Navigation desktop + drawer mobile', 'Termine', 'Connexion bouton present, redirige vers toast.'],
    ['Design system (palette, polices, composants)', 'Termine', 'Tokens.css + DESIGN.md a jour.'],
    ['A11y dialog (drawer + popover Carte)', 'Termine', 'useDialog hook reutilisable.'],
    ['Reveal on scroll', 'Termine', 'Sobre, respecte reduced-motion.'],
    ['Code-split routes (Carte / Galerie / Fiche)', 'Termine', 'Bundle initial 64.6 kB gzip.'],
    ['Formulaire de contribution', 'A faire', 'UI + validation + backend a definir.'],
    ['Espace contributeur / compte', 'A faire', 'Authentification, dashboard, edition fiches.'],
    ['Backend / base de donnees', 'A faire', 'Donnees actuellement en dur dans src/data/projects.ts.'],
    ['Export PDF / CSV de fiche', 'A faire', 'Demande utilisateur priori metier.'],
    ['Recherche full-text avancee', 'A faire', 'La recherche actuelle est par toponyme/commune.'],
    ['Photos reelles des projets', 'A faire', 'Actuellement vignettes SVG abstraites.'],
    ['Page « A propos » / mentions legales', 'A faire', 'Liens existent dans le footer, pas de page cible.'],
    ['Modal RGPD / cookies', 'A faire', 'Si tracking analytics envisage.'],
    ['SEO : meta tags, OpenGraph, sitemap', 'A faire', 'Le head est minimal pour l\'instant.'],
    ['Analytics (Plausible / Matomo)', 'A faire', 'A trancher selon politique.'],
]
inv_table = Table(inv_data, colWidths=[60*mm, 22*mm, None])
inv_table.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Helvetica', 8.5),
    ('FONT', (1, 1), (1, -1), 'Helvetica-Bold', 8),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_SECONDARY),
    ('TEXTCOLOR', (0, 1), (0, -1), NEUTRAL_900),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    # Color the status column based on value
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
]))
# Color status cells
for i, row in enumerate(inv_data[1:], start=1):
    color = GREEN_700 if row[1] == 'Termine' else WARM_700
    inv_table.setStyle(TableStyle([('TEXTCOLOR', (1, i), (1, i), color)]))
story.append(inv_table)

story.append(PageBreak())

# ============================================================================
# III. DESIGN SYSTEM
# ============================================================================
story.append(eyebrow('III  ·  Design system'))
story.append(h1('Palette, polices, regles non-negociables'))
story.append(rule())

story.append(body('Le systeme de design est tres opinionne. Trois regles verrouillees '
    'sont mentionnees ici : toute proposition qui les enfreindrait doit etre refusee '
    'ou explicitement discutee avec le client.'))

story.append(h2('Palette : 18 tokens, 5 familles + signal'))
# Swatches in rows of 3
palette_groups = [
    ('Neutral (5 paliers)', [
        ('#F0EBDF', 'neutral-100', '#F0EBDF'),
        ('#D6CFC0', 'neutral-200', '#D6CFC0'),
        ('#A8A097', 'neutral-400', '#A8A097'),
        ('#2C2820', 'neutral-900', '#2C2820'),
        ('#E8E2D8', 'bg-canvas',   '#E8E2D8'),
    ]),
    ('Water (monopole)', [
        ('#DCE6E8', 'water-100', '#DCE6E8'),
        ('#8AAFB6', 'water-400', '#8AAFB6'),
        ('#3C5E68', 'water-700', '#3C5E68'),
    ]),
    ('Network (monopole commerce + axes)', [
        ('#BAAFC2', 'network-300', '#BAAFC2'),
        ('#8C7B96', 'network-500', '#8C7B96'),
        ('#4E4360', 'network-700', '#4E4360'),
    ]),
    ('Warm (sodium + bati)', [
        ('#E8C282', 'warm-300', '#E8C282'),
        ('#D4A975', 'warm-400', '#D4A975'),
        ('#7A5224', 'warm-700', '#7A5224'),
    ]),
    ('Green (perméables + realisé)', [
        ('#BBC5BB', 'green-300', '#BBC5BB'),
        ('#8FA597', 'green-500', '#8FA597'),
        ('#5F7066', 'green-700', '#5F7066'),
    ]),
    ('Signal (carte / web — un seul par vue)', [
        ('#F5DDD7', 'signal-100', '#F5DDD7'),
        ('#D63A6E', 'signal-400 (Jane, carte)', '#D63A6E'),
        ('#B5483A', 'signal-500 (Travis, web)', '#B5483A'),
        ('#5A1F2E', 'signal-700', '#5A1F2E'),
    ]),
]
for group_name, swatches in palette_groups:
    story.append(h3(group_name))
    # Two columns of swatches
    rows = []
    row = []
    for hex_v, name, val in swatches:
        row.append(ColorSwatch(hex_v, name, val))
        if len(row) == 3:
            rows.append(row)
            row = []
    if row:
        while len(row) < 3:
            row.append('')
        rows.append(row)
    tbl = Table(rows, colWidths=[55*mm, 55*mm, 55*mm])
    tbl.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(tbl)

story.append(h2('Polices verrouillees (3, pas une de plus)'))
fonts_data = [
    ['Famille', 'Usage', 'Poids'],
    ['Anton', 'Display / titres H1-H4, grandes valeurs metier', '400'],
    ['Supreme', 'Body, lede, quote italique', '300/400/500/700 + italique'],
    ['JetBrains Mono', 'Data : labels, slates, cartouches, coordonnees', '400/500'],
]
fonts_tbl = Table(fonts_data, colWidths=[35*mm, None, 50*mm])
fonts_tbl.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Helvetica', 9),
    ('FONT', (0, 1), (0, -1), 'Helvetica-Bold', 9),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
]))
story.append(fonts_tbl)

story.append(h2('Regles non-negociables'))
for p in [
    '<b>Three Monopoles Rule</b> : eau = bleu cendre uniquement ; commerce + axes = violet grise uniquement ; signal Paris/Texas (magenta carte, rouge web — un seul par vue).',
    '<b>Three Fonts Rule</b> : Anton + Supreme + JetBrains Mono. Toute 4e police est refusee.',
    '<b>Lightmode Strict</b> : canvas <i>#E8E2D8</i> en permanence. Le footer en water-700 est l\'unique exception delimitee.',
    '<b>Aucun emoji</b>. Glyphes Unicode admis : · — ↗ ● ° −.',
    '<b>Pas de #000 ni de #fff</b>. Tous les neutres sont tintes warm.',
    '<b>Pas de side-stripe colore</b> (border-left/right > 1px en accent). Pas de gradient text. Pas de glassmorphism.',
    '<b>prefers-reduced-motion</b> strictement respecte. Pas d\'animation bounce ou elastique.',
]:
    story.append(Paragraph(f'<bullet>&middot;</bullet>&nbsp;{p}', S_LIST))

story.append(PageBreak())

# ============================================================================
# IV. STACK TECHNIQUE
# ============================================================================
story.append(eyebrow('IV  ·  Stack technique'))
story.append(h1('Architecture & dependances'))
story.append(rule())

stack_data = [
    ['Categorie',         'Choix',                           'Version'],
    ['Framework UI',      'React',                            '19.2.x'],
    ['Build tool',        'Vite',                             '8.x'],
    ['Langage',           'TypeScript',                       '6.x strict'],
    ['Cartographie',      'maplibre-gl (lazy-loaded)',        '5.x'],
    ['Styles',            'CSS pur via tokens + utilities',   'aucun framework CSS'],
    ['Animations',        'CSS keyframes + transitions',      'pas de framer-motion'],
    ['Routing',           'State-based (App.tsx + lib/router.ts)', 'pas de react-router'],
    ['Linting',           'ESLint 10 + typescript-eslint',    'config moderne'],
    ['Polices',           'Anton + JetBrains Mono (Google Fonts) + Supreme (self-hosted)', 'WOFF2'],
]
stack_tbl = Table(stack_data, colWidths=[40*mm, None, 35*mm])
stack_tbl.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Helvetica', 9),
    ('FONT', (0, 1), (0, -1), 'Helvetica-Bold', 9),
    ('FONT', (2, 1), (2, -1), 'Courier', 8),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
]))
story.append(stack_tbl)

story.append(h2('Choix d\'architecture notables'))
for p in [
    '<b>Pas de framework CSS</b> (Tailwind n\'est pas utilise meme s\'il est dans package.json comme legacy). Le design system est en CSS pur via <i>tokens.css</i> et <i>app.css</i>. C\'est volontaire — le projet refuse les esthetiques Tailwind UI / shadcn par defaut.',
    '<b>Pas de bibliotheque d\'animation</b> (framer-motion retire). Les transitions sont des CSS keyframes + transitions natives, plus legeres et plus robustes pour ce contenu editorial.',
    '<b>Pas de react-router</b>. Le routing est state-based dans <i>App.tsx</i>. Suffisant pour 4 ecrans, sera a remplacer par react-router (ou similaire) quand l\'arborescence grossira.',
    '<b>Pas de backend</b>. Les 14 fiches sont en dur dans <i>src/data/projects.ts</i>. Le formulaire de contribution et l\'espace contributeur necessiteront un backend (Firebase, Supabase, ou stack custom).',
    '<b>Hook <i>useDialog</i></b> partage entre le drawer mobile et le popover Carte : focus-move, Escape, Tab-trap, return-focus, inert sur les freres. Pret pour tout futur modal/popover.',
]:
    story.append(Paragraph(f'<bullet>&middot;</bullet>&nbsp;{p}', S_LIST))

story.append(h2('Tailles de bundle (production)'))
bundle_data = [
    ['Asset', 'Raw', 'Gzip'],
    ['index (entry, Home eager)', '204.2 kB', '64.6 kB'],
    ['Carte chunk (lazy, MapLibre)', '1037 kB', '275.8 kB'],
    ['Galerie chunk (lazy)', '7.1 kB', '2.0 kB'],
    ['Fiche chunk (lazy)', '11.4 kB', '2.7 kB'],
    ['Pill chunk (partage)', '17.8 kB', '6.7 kB'],
    ['CSS global', '46.5 kB', '7.9 kB'],
    ['CSS Carte (MapLibre)', '69.8 kB', '10.1 kB'],
]
bundle_tbl = Table(bundle_data, colWidths=[None, 35*mm, 35*mm])
bundle_tbl.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Courier', 8.5),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_SECONDARY),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('ALIGN', (1, 1), (-1, -1), 'RIGHT'),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
]))
story.append(bundle_tbl)

story.append(PageBreak())

# ============================================================================
# V. STRUCTURE DES FICHIERS
# ============================================================================
story.append(eyebrow('V  ·  Structure'))
story.append(h1('Cartographie du repository'))
story.append(rule())

tree = """OpenZoneActe_Impecable/
|
|-- .claude/                       Outils Claude Code (a ignorer)
|-- public/
|   |-- font/Supreme_Complete/     Police Supreme self-hostee (WOFF2)
|   |-- ds/                        Design system preview HTML (interne)
|   `-- map/style8.json            Style MapLibre (carte)
|-- src/
|   |-- App.tsx                    Shell + routing state-based + Suspense
|   |-- main.tsx                   Entry React (StrictMode + createRoot)
|   |-- index.css                  Import tokens + app
|   |-- styles/
|   |   |-- tokens.css             Source de verite : palette, typo, spacing
|   |   `-- app.css                Composants .oz-*, layout, responsive
|   |-- lib/
|   |   |-- router.ts              Type Route + RouterState
|   |   |-- useReveal.ts           Hook IntersectionObserver pour reveal
|   |   |-- useDialog.ts           Hook a11y partage (focus-trap, Escape, inert)
|   |   `-- geo.ts                 Parse coords + FRANCE_CENTER/ZOOM
|   |-- data/
|   |   |-- taxonomy.ts            Etats, typologies, regions (sans couleurs)
|   |   `-- projects.ts            14 fiches projets (seeds en dur)
|   |-- components/
|   |   |-- Header.tsx             Sticky header + drawer mobile
|   |   |-- Footer.tsx             Footer water-700 + 4 liens meta
|   |   |-- Pill.tsx               Pill etat data-state[amont|etudes|...]
|   |   |-- ProjectThumb.tsx       Vignette SVG procedurale (3 variantes)
|   |   |-- FranceMapGL.tsx        Wrapper MapLibre + markers HTML + sync
|   |   `-- FicheMapMini.tsx       Mini-carte SVG legendee sur la Fiche
|   `-- pages/
|       |-- Home.tsx
|       |-- Carte.tsx
|       |-- Galerie.tsx
|       `-- Fiche.tsx
|-- DESIGN.md                      Design system reference (palette + typo + composants)
|-- PRODUCT.md                     Vision produit, users, anti-references
|-- README.md                      Setup et conventions
|-- DESIGN.json                    Tokens en JSON (machine-readable)
|-- package.json                   Dependances (framer-motion retire)
|-- vite.config.ts
|-- tsconfig.*.json
`-- eslint.config.js"""

story.append(Paragraph(
    '<pre>' + tree.replace('\n', '<br/>') + '</pre>',
    ParagraphStyle('Tree', parent=S_MONO, fontSize=7.5, leading=10),
))

story.append(PageBreak())

# ============================================================================
# VI. AUDIT
# ============================================================================
story.append(eyebrow('VI  ·  Audit qualite'))
story.append(h1('Score 20/20 — Excellent'))
story.append(rule())

story.append(body('Le code a ete soumis a 8 commandes successives de qualification (extract, '
    'harden, optimize, adapt, layout, clarify, token-fix, polish). Le score final passe '
    'de 15/20 (Good) a 20/20 (Excellent). Les 5 dimensions sont au maximum.'))

audit_data = [
    ['Dimension', 'Avant', 'Apres', 'Verdict'],
    ['Accessibility',  '3/4', '4/4', 'Dialog focus complet + contraste WCAG AA'],
    ['Performance',    '3/4', '4/4', 'Initial bundle 64.6 kB gzip (-83 %)'],
    ['Responsive',     '3/4', '4/4', 'Popover ancre + drawer-login mobile'],
    ['Theming',        '2/4', '4/4', '100 % des hex confines a tokens.css'],
    ['Anti-Patterns',  '4/4', '4/4', 'Inchange — toujours zero AI slop'],
    ['TOTAL',          '15/20', '20/20', 'EXCELLENT — READY TO SHIP'],
]
audit_tbl = Table(audit_data, colWidths=[35*mm, 18*mm, 18*mm, None])
audit_tbl.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -2), 'Helvetica', 9),
    ('FONT', (0, -1), (-1, -1), 'Helvetica-Bold', 9),
    ('FONT', (0, 1), (0, -2), 'Helvetica-Bold', 9),
    ('FONT', (1, 1), (2, -1), 'Courier', 9),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('TEXTCOLOR', (0, -1), (-1, -1), GREEN_700),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('BACKGROUND', (0, -1), (-1, -1), HexColor('#E8F0EA')),
    ('ALIGN', (1, 1), (2, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEABOVE', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
]))
story.append(audit_tbl)

story.append(h2('Points forts notables'))
for p in [
    '<b>Zero AI slop</b> : palette tintee warm, polices verrouillees, pas de side-stripe, pas de gradient text, pas de glass. L\'esthetique est distinctive et intentionnelle.',
    '<b>A11y dialog production-grade</b> : focus-trap, Escape, return-focus to trigger, inert sur les freres. Hook reutilisable.',
    '<b>Token coverage 100 %</b> : impossible de driver vers une couleur hors monopole sans toucher tokens.css. Three Monopoles Rule mecaniquement protegee.',
    '<b>Bundle initial leger</b> : 64.6 kB gzip sur Home. MapLibre ne se charge qu\'a l\'arrivee sur la Carte.',
    '<b>WCAG AA</b> sur les contrastes, focus visible, semantique correcte.',
]:
    story.append(Paragraph(f'<bullet>&middot;</bullet>&nbsp;{p}', S_LIST))

story.append(h2('Points hygiene restants (P3, non bloquants)'))
for p in [
    'README.md et DESIGN.json mentionnent encore framer-motion (retire du code).',
    'public/ds/index.html utilise l\'ancien wordmark « Open Zones Act » (pluriel + EN).',
    'POPOVER_H = 340 dans Carte.tsx est une estimation ; mesure dynamique via useLayoutEffect plus robuste.',
    'Vite warning sur le chunk Carte > 500 kB : c\'est MapLibre lazy-loaded, hors critical path. Faire taire avec <i>build.chunkSizeWarningLimit</i> ou laisser comme info.',
]:
    story.append(Paragraph(f'<bullet>&middot;</bullet>&nbsp;{p}', S_LIST))

story.append(PageBreak())

# ============================================================================
# VII. RESTANT A FAIRE
# ============================================================================
story.append(eyebrow('VII  ·  Roadmap'))
story.append(h1('Travail restant a faire'))
story.append(rule())

story.append(body('Ces items sont indispensables ou hautement souhaitables pour atteindre '
    'le produit final. Ordre approximatif de priorite. Le developpeur externe peut les '
    'prendre dans cet ordre, sauf instruction du client (cf. questionnaire et journal).'))

roadmap = [
    ('Backend + base de donnees',
     'P0 — bloquant',
     'Les 14 fiches sont en dur dans src/data/projects.ts. Pour publier reellement et atteindre la densite cible, un backend est requis. Options : Supabase (Postgres + auth + storage), Firebase, ou stack custom (Node + Postgres). Schema a definir avec le client.'),
    ('Formulaire de contribution',
     'P0',
     'UI present dans le toast (« contribuer@open-zones-act.fr »). Implementation : modal ou page dediee, validation cote client, soumission backend, accuse de reception. Workflow de moderation a definir.'),
    ('Espace contributeur (auth + dashboard)',
     'P1',
     'Inscription, login, edition de fiches existantes, soumission de nouvelles fiches. Permissions (lecture / edition / moderation). Lie au backend.'),
    ('Photos reelles des projets',
     'P1',
     'Actuellement vignettes SVG procedurales. Strategie : appel a contribution photo (DR / Creative Commons), commande photographique, ou utiliser Mapillary / Google Street View en attente.'),
    ('Pages « A propos » + mentions legales + RGPD',
     'P1',
     'Liens footer pointent vers des ancres internes vides. A creer en cohesion avec le ton editorial.'),
    ('SEO : meta tags, OpenGraph, sitemap',
     'P1',
     'Le <head> de index.html est minimal. Ajouter description, OG tags, twitter:card, sitemap.xml, robots.txt.'),
    ('Export PDF / CSV de fiche',
     'P2',
     'Besoin metier exprime dans PRODUCT.md (« exporter un extrait pour un rapport »). Generation cote client (jsPDF) ou serveur.'),
    ('Recherche full-text avancee',
     'P2',
     'Actuelle : toponyme + commune. A etendre : texte des paragraphes editoriaux, locomotives, axes. Avec backend : Postgres full-text ou Algolia.'),
    ('Analytics (Plausible / Matomo)',
     'P2',
     'A trancher selon politique RGPD du client.'),
    ('Bundle Carte : trim MapLibre si possible',
     'P3',
     '1 MB raw / 276 kB gzip est lourd. Explorer maplibre-gl slim build ou alternative.'),
    ('Test suite (unit + e2e)',
     'P3',
     'Aucun test pour l\'instant. Vitest + Playwright recommandes.'),
    ('CI/CD pipeline',
     'P3',
     'A definir selon hebergement (Vercel, Netlify, OVH...).'),
]

road_rows = [['Item', 'Priorite', 'Note']]
for item, prio, desc in roadmap:
    road_rows.append([item, prio, desc])
road_tbl = Table(road_rows, colWidths=[55*mm, 25*mm, None])
road_tbl.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Helvetica', 8.5),
    ('FONT', (0, 1), (0, -1), 'Helvetica-Bold', 9),
    ('FONT', (1, 1), (1, -1), 'Helvetica-Bold', 8),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('TEXTCOLOR', (0, 1), (0, -1), NEUTRAL_900),
    ('TEXTCOLOR', (1, 1), (1, -1), SIGNAL_500),
    ('TEXTCOLOR', (2, 1), (2, -1), TEXT_SECONDARY),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
]))
story.append(road_tbl)

story.append(PageBreak())

# ============================================================================
# VIII. ONBOARDING DEVELOPPEUR
# ============================================================================
story.append(eyebrow('VIII  ·  Onboarding'))
story.append(h1('Setup developpeur externe'))
story.append(rule())

story.append(h2('Prerequis'))
for p in [
    'Node.js >= 20 LTS',
    'npm 10+ (ou pnpm / yarn equivalents)',
    'Un editeur avec support TypeScript (VS Code recommande)',
    'Connaissance React 19, Hooks, CSS modulaire',
]:
    story.append(Paragraph(f'<bullet>&middot;</bullet>&nbsp;{p}', S_LIST))

story.append(h2('Commandes essentielles'))
cmd_data = [
    ['Commande',                  'Effet'],
    ['npm install',               'Installation des dependances'],
    ['npm run dev',               'Vite dev server sur localhost:5173 avec HMR'],
    ['npm run build',             'Build production dans dist/ (tsc + vite build)'],
    ['npm run preview',           'Servir le build sur localhost:4173'],
    ['npm run typecheck',         'tsc --noEmit (verification types sans build)'],
    ['npm run lint',              'ESLint sur l\'ensemble du projet'],
]
cmd_tbl = Table(cmd_data, colWidths=[55*mm, None])
cmd_tbl.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Courier', 8.5),
    ('FONT', (1, 1), (-1, -1), 'Helvetica', 9),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('TEXTCOLOR', (0, 1), (0, -1), NEUTRAL_900),
    ('TEXTCOLOR', (1, 1), (1, -1), TEXT_SECONDARY),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
]))
story.append(cmd_tbl)

story.append(h2('Conventions a respecter'))
for p in [
    '<b>Toute couleur</b> passe par un token CSS (<i>var(--token)</i>) ou par une classe semantique. Aucun hex en dur dans les fichiers .tsx ou .ts.',
    '<b>Toute police</b> est une des 3 du systeme (Anton / Supreme / JetBrains Mono). Pas d\'ajout.',
    '<b>Pas d\'emoji</b>. Glyphes Unicode admis dans les copy : · — ↗ ● ° −.',
    '<b>Tout dialog</b> (modal, popover, drawer) utilise le hook <i>useDialog</i> et expose role="dialog" + aria-modal="true".',
    '<b>Toute animation</b> respecte <i>prefers-reduced-motion</i> (regle globale dans app.css L1700+).',
    '<b>Documentation</b> : lire PRODUCT.md (vision) et DESIGN.md (composants) avant d\'ajouter / modifier.',
    '<b>Pas de Tailwind</b> ni de framework CSS. Le choix est documente — c\'est une garde anti-AI-slop.',
]:
    story.append(Paragraph(f'<bullet>&middot;</bullet>&nbsp;{p}', S_LIST))

story.append(h2('Outils Claude Code (optionnels)'))
story.append(body('Le projet a ete realise avec l\'aide de la skill <i>impeccable</i> de '
    'Claude Code (audits, refactors, polish). Le repository contient un dossier <i>.claude/</i> '
    'avec les workflows, traceable mais ignorable pour le developpement classique. Les commandes '
    '/impeccable audit, /impeccable polish, etc. peuvent etre re-executees a tout moment pour '
    'verifier qu\'aucune regression de qualite n\'a ete introduite.'))

story.append(PageBreak())

# ============================================================================
# IX. QUESTIONNAIRE CLIENT
# ============================================================================
story.append(eyebrow('IX  ·  Questionnaire client'))
story.append(h1('Questions a discuter avant la suite des travaux'))
story.append(rule())

story.append(body('Ces questions necessitent une reponse du client avant que le developpeur '
    'externe ne commence. Imprimez cette section et annotez, ou remplissez dans un PDF editor.'))


def question(label, lines=3):
    """Render a question label followed by N writable lines."""
    flow = [Paragraph(f'<b>{label}</b>', S_BODY)]
    for _ in range(lines):
        flow.append(HRFlowable(width='100%', color=NEUTRAL_200, thickness=0.4,
                                spaceBefore=12, spaceAfter=0))
    flow.append(Spacer(1, 8))
    return KeepTogether(flow)


story.append(h2('Backend & donnees'))
story.append(question('Q1. Quel hebergement / quel backend souhaitez-vous ? '
    '(Supabase, Firebase, stack custom, autre)'))
story.append(question('Q2. Combien de fiches estimez-vous publier la 1ere annee ? '
    'Cela influence le choix backend.'))
story.append(question('Q3. Qui aura les droits d\'edition ? (Equipe interne uniquement, '
    'contributeurs externes valides, ouvert ?)'))

story.append(h2('Contribution & moderation'))
story.append(question('Q4. Workflow de moderation : auto-publication ou validation '
    'par un editeur avant mise en ligne ?'))
story.append(question('Q5. Champs obligatoires sur le formulaire de contribution ? '
    'Toponyme, surface, etat, sources, autres ?'))

story.append(PageBreak())

story.append(eyebrow('IX  ·  Questionnaire client (suite)'))
story.append(h2('Identite & SEO'))
story.append(question('Q6. URL de production cible ? (open-zone-acte.fr, autre)'))
story.append(question('Q7. Slogan / description meta a utiliser pour OG tags et SEO ?'))
story.append(question('Q8. Souhaitez-vous des analytics ? Si oui, lequel '
    '(Plausible RGPD-friendly, Matomo, Google Analytics) ?'))

story.append(h2('Photos & visuels'))
story.append(question('Q9. Strategie photos des projets : commande pro, contribution '
    'beneficie, banque d\'images, ou continuer avec illustrations abstraites ?'))
story.append(question('Q10. Souhaitez-vous une page « Methodologie » expliquant le '
    'choix editorial (palette urbaniste, monopoles chromatiques, etc.) ?'))

story.append(h2('Roadmap & priorites'))
story.append(question('Q11. Quelle priorite donnez-vous aux items P0-P3 listes en '
    'section VII ? Reorganiser dans l\'ordre souhaite.'))
story.append(question('Q12. Date cible de mise en production publique ? Date cible '
    'd\'ouverture du formulaire de contribution ?'))
story.append(question('Q13. Budget restant alloue a la suite des travaux (indicatif) ?'))

story.append(h2('Autres remarques'))
story.append(question('Q14. Toute autre remarque, contrainte, ou demande non couverte '
    'par les questions ci-dessus :', lines=6))

story.append(PageBreak())

# ============================================================================
# X. JOURNAL DES MODIFICATIONS DEMANDEES
# ============================================================================
story.append(eyebrow('X  ·  Journal de modifications'))
story.append(h1('Modifications demandees par le client'))
story.append(rule())

story.append(body('Tableau a remplir par le client. Decrire chaque modification souhaitee, '
    'son emplacement (page, composant), sa priorite (P0 bloquant a P3 nice-to-have), '
    'et une echeance si applicable. Le developpeur traitera dans cet ordre.'))

# Empty modification log — 12 rows
log_header = ['#', 'Page / composant', 'Modification demandee', 'Prio', 'Echeance']
log_rows = [log_header]
for i in range(1, 13):
    log_rows.append([f'{i:02d}', '', '', '', ''])
log_tbl = Table(log_rows, colWidths=[10*mm, 38*mm, None, 14*mm, 22*mm], rowHeights=[10*mm] + [16*mm]*12)
log_tbl.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Helvetica', 9),
    ('FONT', (0, 1), (0, -1), 'Courier', 9),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('TEXTCOLOR', (0, 1), (0, -1), TEXT_TERTIARY),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ('TOPPADDING', (0, 0), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
    ('LINEAFTER', (0, 0), (-2, -1), 0.2, NEUTRAL_200),
]))
story.append(log_tbl)

story.append(PageBreak())

story.append(eyebrow('X  ·  Journal (suite)'))
log_rows2 = [log_header]
for i in range(13, 25):
    log_rows2.append([f'{i:02d}', '', '', '', ''])
log_tbl2 = Table(log_rows2, colWidths=[10*mm, 38*mm, None, 14*mm, 22*mm], rowHeights=[10*mm] + [16*mm]*12)
log_tbl2.setStyle(log_tbl.getStyle() if hasattr(log_tbl, 'getStyle') else TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Helvetica', 9),
    ('FONT', (0, 1), (0, -1), 'Courier', 9),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('TEXTCOLOR', (0, 1), (0, -1), TEXT_TERTIARY),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 4),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ('TOPPADDING', (0, 0), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
    ('LINEAFTER', (0, 0), (-2, -1), 0.2, NEUTRAL_200),
]))
story.append(log_tbl2)

story.append(Spacer(1, 6*mm))
story.append(note('Legende des priorites :   '
    '<font color="#B5483A"><b>P0</b></font> bloquant   ·   '
    '<font color="#B5483A"><b>P1</b></font> majeur   ·   '
    '<font color="#7A5224"><b>P2</b></font> mineur   ·   '
    '<font color="#5F7066"><b>P3</b></font> nice-to-have'))

story.append(PageBreak())

# ============================================================================
# XI. CONTACTS & RESSOURCES
# ============================================================================
story.append(eyebrow('XI  ·  Contacts'))
story.append(h1('Contacts & ressources'))
story.append(rule())

contacts_data = [
    ['Role', 'Personne / canal'],
    ['Direction projet', 'Deuxieme Acte (association loi 1901)'],
    ['Contact general', 'contact@open-zones-act.fr'],
    ['Contributions / contenu', 'contribuer@open-zones-act.fr'],
    ['Site association', 'https://deuxieme-acte.fr/'],
    ['Repository git', 'A renseigner par le client'],
    ['Hebergement actuel', 'A definir (Vercel / Netlify / OVH...)'],
]
contacts_tbl = Table(contacts_data, colWidths=[55*mm, None])
contacts_tbl.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Helvetica', 9.5),
    ('FONT', (0, 1), (0, -1), 'Helvetica-Bold', 9.5),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('TEXTCOLOR', (0, 1), (0, -1), NEUTRAL_900),
    ('TEXTCOLOR', (1, 1), (1, -1), TEXT_SECONDARY),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
]))
story.append(contacts_tbl)

story.append(h2('Documents sources accompagnant ce dossier'))
docs_data = [
    ['Fichier', 'Role'],
    ['PRODUCT.md', 'Vision produit, utilisateurs, anti-references, principes strategiques. Source de verite pour les arbitrages.'],
    ['DESIGN.md', 'Reference design system : palette, typographie, composants, named rules. Source de verite visuelle.'],
    ['DESIGN.json', 'Tokens machine-readable. Pour generer un Figma library ou un import dans un autre outil.'],
    ['README.md', 'Setup minimal, conventions de base. A enrichir par le client / dev externe.'],
    ['src/styles/tokens.css', 'Implementation des tokens en CSS variables. Source de verite implementation.'],
]
docs_tbl = Table(docs_data, colWidths=[55*mm, None])
docs_tbl.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('FONT', (0, 1), (-1, -1), 'Helvetica', 9),
    ('FONT', (0, 1), (0, -1), 'Courier', 8.5),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('TEXTCOLOR', (0, 1), (0, -1), NEUTRAL_900),
    ('TEXTCOLOR', (1, 1), (1, -1), TEXT_SECONDARY),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ('LINEBELOW', (0, 0), (-1, -2), 0.3, NEUTRAL_200),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
]))
story.append(docs_tbl)

story.append(h2('Signature de remise'))
story.append(body('Le client confirme avoir recu ce dossier et le code source associe :'))
story.append(Spacer(1, 6*mm))

sig_tbl = Table([
    ['Date', 'Nom du signataire', 'Signature'],
    ['', '', ''],
], colWidths=[40*mm, 60*mm, None], rowHeights=[8*mm, 22*mm])
sig_tbl.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 7.5),
    ('TEXTCOLOR', (0, 0), (-1, 0), WATER_700),
    ('BACKGROUND', (0, 0), (-1, 0), NEUTRAL_100),
    ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ('TOPPADDING', (0, 0), (-1, -1), 4),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ('LINEABOVE', (0, 0), (-1, 0), 0.6, NEUTRAL_900),
    ('LINEBELOW', (0, -1), (-1, -1), 0.6, NEUTRAL_900),
    ('LINEAFTER', (0, 0), (-2, -1), 0.2, NEUTRAL_200),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
]))
story.append(sig_tbl)

story.append(Spacer(1, 6*mm))
story.append(note('Fin du dossier. Pour toute question sur ce document ou sur le code source, '
    'contactez Deuxieme Acte. Ce document est confidentiel.'))


# ---------------------------------------------------------------------------
# Build PDF
# ---------------------------------------------------------------------------
def on_first_page(canvas, doc):
    draw_cover_chrome(canvas, doc)


def on_later_pages(canvas, doc):
    draw_page_chrome(canvas, doc)


doc = SimpleDocTemplate(
    OUTPUT_PATH,
    pagesize=A4,
    leftMargin=MARGIN_L,
    rightMargin=MARGIN_R,
    topMargin=MARGIN_T,
    bottomMargin=MARGIN_B,
    title='Open Zone Acte — Dossier de remise',
    author='Deuxième Acte',
    subject='Documentation handover client + developpeur',
)
doc.build(story, onFirstPage=on_first_page, onLaterPages=on_later_pages)

print(f'PDF generated: {OUTPUT_PATH}')
print(f'Size: {os.path.getsize(OUTPUT_PATH) / 1024:.1f} kB')
