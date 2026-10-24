from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Preformatted, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.utils import ImageReader

root=Path(__file__).resolve().parents[2]
out=root/'output/pdf'
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='BodyFR',fontName='Helvetica',fontSize=10.5,leading=16,spaceAfter=10,textColor=colors.HexColor('#182745')))
styles.add(ParagraphStyle(name='TitleFR',fontName='Helvetica-Bold',fontSize=24,leading=31,spaceAfter=20,textColor=colors.HexColor('#0062ff'),alignment=TA_CENTER))
styles.add(ParagraphStyle(name='CenterFR',parent=styles['BodyFR'],alignment=TA_CENTER))
styles.add(ParagraphStyle(name='SectionFR',fontName='Helvetica-Bold',fontSize=19,leading=24,spaceAfter=18,textColor=colors.HexColor('#0062ff')))
styles.add(ParagraphStyle(name='SubFR',fontName='Helvetica-Bold',fontSize=12,leading=17,spaceBefore=8,spaceAfter=7,textColor=colors.HexColor('#090f3d')))
styles.add(ParagraphStyle(name='CodeFR',fontName='Courier',fontSize=8,leading=11,backColor=colors.HexColor('#eaf3ff'),borderPadding=9,spaceAfter=12))
story=[]; md=[]
def p(t,style='BodyFR'):
    story.append(Paragraph(escape(t),styles[style])); md.append(t+'\n')
def h(t): p(t,'SubFR')
def page(t):
    story.append(PageBreak()); p(t,'SectionFR'); md.append('---\n')
def code(t):
    story.append(Preformatted(t,styles['CodeFR'])); md.append('```\n'+t+'\n```\n')
def figure(path,caption,maxh=275):
    w,h=ImageReader(str(root/path)).getSize(); ratio=min(480/w,maxh/h)
    story.append(Image(str(root/path),width=w*ratio,height=h*ratio)); p(caption,'CenterFR')
def footer(c,d):
    c.setStrokeColor(colors.HexColor('#e2ecfa')); c.line(50,43,545,43)
    c.setFont('Helvetica',8); c.setFillColor(colors.HexColor('#53658f'))
    c.drawString(50,30,'EduFlow | Rapport de mini projet web | 2026-2027'); c.drawRightString(545,30,str(d.page))

p('République Tunisienne','CenterFR')
p('Ministère de l’Enseignement Supérieur et de la Recherche Scientifique','CenterFR')
p('Université de Sousse','CenterFR')
p('Institut Supérieur des Sciences Appliquées et de Technologie de Sousse','CenterFR')
story.append(Spacer(1,65))
p('DÉPARTEMENT INFORMATIQUE','CenterFR')
p('RAPPORT DE MINI PROJET WEB','TitleFR')
p('FIA3','CenterFR'); story.append(Spacer(1,40))
p('EduFlow - mini projet LMS','TitleFR')
p('Plateforme web d’apprentissage et de suivi de progression','CenterFR')
story.append(Spacer(1,65))
p('Élaboré par :','CenterFR'); p('IDRISS Zidane','CenterFR'); p('BELAID Amine','CenterFR')
story.append(Spacer(1,40)); p('Année universitaire : 2026-2027','CenterFR')

page('Plan du rapport')
for t in ['1. Introduction','2. Cahier des charges / Objectifs','3. Conception','4. Implémentation (code et explications)','5. Résultat final','6. Difficultés rencontrées et solutions','7. Conclusion','8. Annexes']:
    h(t)
p('Le rapport décrit la version présente dans le dossier du projet. Les illustrations de conception sont identifiées comme des maquettes ; elles ne constituent pas des captures de la version exécutée.')

page('1. Introduction')
p('L’apprentissage en ligne nécessite une interface qui permette de trouver des ressources, de consulter un programme et de suivre son avancement. EduFlow répond à ce besoin à travers un mini LMS, c’est-à-dire un système simplifié de gestion de l’apprentissage.')
p('Le projet propose un parcours complet : découvrir la plateforme, rechercher un cours, consulter sa fiche, lire les leçons et retrouver sa progression dans un tableau de bord. Il s’adresse principalement aux apprenants souhaitant découvrir des compétences numériques et organiser leur apprentissage à leur rythme.')
h('Présentation générale')
p('EduFlow est un site multipage développé en HTML5, CSS3 et JavaScript Vanilla. Son fonctionnement repose sur le navigateur : les contenus pédagogiques sont définis dans les fichiers JavaScript et les informations de suivi sont enregistrées localement avec localStorage. Aucun serveur applicatif ni base de données distante n’est nécessaire pour cette version.')
h('Périmètre du mini projet')
p('Le catalogue contient huit cours : HTML/CSS, JavaScript, UI/UX, SQL, Python, React, Flutter et intelligence artificielle. Le parcours HTML/CSS comporte douze leçons avec des fiches et des exercices. Les autres parcours proposent des contenus de découverte à enrichir.')
p('Les noms de formateurs, notes et nombres d’avis constituent des données de démonstration. Cette version ne comporte ni authentification, ni vidéos intégrées, ni forum de discussion, ni délivrance effective de certificats.')

page('2. Cahier des charges / Objectifs')
h('Objectif principal')
p('Concevoir une plateforme pédagogique cohérente, responsive et interactive, permettant de parcourir un catalogue de cours et de conserver un suivi individuel dans le navigateur.')
h('Besoins fonctionnels')
for t in [
'Accueil : présenter EduFlow, ses avantages et une sélection de cours populaires.',
'Catalogue : rechercher un cours par texte, filtrer par catégorie, niveau et durée, afficher les favoris et trier les résultats.',
'Fiche de cours : présenter la description, les objectifs, les prérequis, le formateur, le programme et la progression.',
'Apprentissage : afficher le contenu et l’exercice de chaque leçon, naviguer entre les leçons et marquer une leçon comme terminée ou non terminée.',
'Tableau de bord : consulter les cours inscrits, les cours terminés, les favoris, la progression globale, les activités récentes et un objectif personnel.',
'Persistance : conserver les favoris, la dernière leçon consultée et les validations après un rechargement de page.'
]: p('• '+t)
h('Exigences de qualité')
p('Le site doit conserver une identité graphique commune sur les cinq pages et s’adapter aux écrans d’ordinateur, de tablette et de téléphone. Les formulaires possèdent des libellés, les images des textes alternatifs et les contrôles un indicateur de focus pour la navigation au clavier.')
p('Les liens invalides et les erreurs de sauvegarde doivent produire un message compréhensible. La validation d’une leçon reste une action explicite de l’apprenant : ouvrir une page ne suffit pas à terminer la leçon.')

page('3. Conception')
h('Architecture et parcours utilisateur')
p('Le parcours principal suit la chaîne Accueil → Catalogue → Fiche du cours → Apprentissage → Tableau de bord. Les pages échangent le contexte du cours et de la leçon grâce aux paramètres de l’URL, par exemple course-details.html?id=html-css et learning.html?course=html-css&lesson=0.')
h('Structure du dossier')
code('EduFlow/\n  index.html              Accueil\n  courses.html            Catalogue\n  course-details.html     Fiche du cours\n  learning.html           Espace d’apprentissage\n  dashboard.html          Tableau de bord\n  css/                    Styles communs et par page\n  js/                     Données, stockage et interactions\n  assets/                 Images, icônes et formateurs\n  design/                 Maquettes desktop et mobile\n  tests/                  Vérifications automatisées\n  README.md               Présentation et lancement')
h('Organisation des données')
p('Chaque cours possède un identifiant stable, un titre, une catégorie, un niveau, une durée, une illustration et une liste de modules. Les modules regroupent les titres des leçons. La progression conserve les indices des leçons terminées et la dernière leçon consultée ; les favoris conservent les identifiants des cours.')
h('Charte graphique et structure HTML')
p('La palette utilise le bleu #0062ff pour les actions, le bleu foncé #090f3d pour les textes, le fond clair #f7fbff et des surfaces blanches. La police principale est Arial, avec Helvetica et sans-serif en repli. Les cartes arrondies, les espacements et les boutons assurent une continuité visuelle.')
p('Les pages s’organisent autour de header, nav, main et footer. La barre de navigation présente les liens Accueil et Cours ; l’accès au tableau de bord se fait par le lien de profil. La mise en page combine Flexbox, CSS Grid et des media queries.')

page('4. Implémentation : technologies')
h('HTML5 : structuration du contenu')
p('HTML5 définit les cinq pages, les titres, les formulaires de recherche, les cartes, les listes de modules et les zones de progression. Les attributs aria-label, aria-current et aria-pressed apportent des informations aux technologies d’assistance. Un lien d’évitement donne accès au contenu principal.')
h('CSS3 : présentation et adaptation')
p('Les styles communs définissent les couleurs et la typographie. Des feuilles spécifiques complètent les vues catalogue, fiche, apprentissage et tableau de bord. Le fichier responsive.css ajuste notamment l’en-tête, les grilles et les colonnes lorsque la largeur disponible diminue.')
h('JavaScript Vanilla : interactions')
p('Le projet utilise les fonctions natives du navigateur sans framework applicatif. data.js centralise les cours et les contenus ; storage.js gère les sauvegardes ; ui.js construit les éléments partagés. Les scripts propres aux pages rendent les résultats et réagissent aux événements de formulaire et de bouton.')
h('API du navigateur')
p('URLSearchParams lit les paramètres de navigation. Le DOM permet de créer les cartes et de modifier les contenus affichés. localStorage conserve les données sous forme de chaînes JSON. Les événements personnalisés et l’événement storage permettent de rafraîchir certaines vues après une modification.')
h('Outils et environnement')
p('Le README recommande VS Code avec l’extension Live Server pour lancer le site. Git assure le versionnement du dossier ; GitHub Desktop est décrit comme outil de collaboration. Les fichiers de conception sont conservés dans design/. Node.js sert à exécuter les tests et jsdom est une dépendance facultative des tests d’interface ; ils ne sont pas requis pour consulter le site.')
p('React, Python, Flutter et SQL sont des sujets du catalogue. Ils ne constituent pas les technologies utilisées pour développer cette version d’EduFlow.')

page('4. Implémentation : code et fonctionnement')
h('Extrait HTML : navigation commune')
code('<nav class="main-nav" aria-label="Navigation principale">\n  <ul class="nav-list">\n    <li><a href="index.html">Accueil</a></li>\n    <li><a href="courses.html">Cours</a></li>\n  </ul>\n</nav>')
p('Cet extrait de la structure commune permet de circuler entre l’accueil et le catalogue. La liste regroupe les liens de navigation et son libellé précise son rôle.')
h('Extrait CSS : grille adaptée aux écrans')
code('@media (max-width: 1100px) {\n    .course-grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n}')
p('Cette règle issue de responsive.css affiche les cartes sur deux colonnes à partir du seuil indiqué. Les autres règles adaptent également l’en-tête et les panneaux des pages.')
h('Extrait JavaScript : normalisation de la recherche')
code("const normalize = text => text.normalize('NFD')\n    .replace(/[\\u0300-\\u036f]/g, '').toLowerCase();\nconst search = normalize(query.value.trim());")
p('Ce code de courses.js rend la recherche insensible aux majuscules et aux accents. Les critères de texte, de catégorie, de niveau, de durée et de favoris sont combinés avant le tri et l’affichage des cartes.')
h('Sauvegarde et calcul de la progression')
p('Les clés eduflow.favorites, eduflow.progress, eduflow.activities et eduflow.goal séparent les données sauvegardées. Les lectures et écritures sensibles sont protégées par try/catch et les valeurs relues sont contrôlées. Les données restent propres au navigateur et à l’origine du site.')
p('Progression d’un cours = leçons terminées / total des leçons × 100. La progression globale applique la même formule à l’ensemble des cours inscrits, avec un arrondi. Le tableau de bord mesure l’objectif personnel à partir du nombre de cours entièrement terminés.')

page('5. Résultat final')
h('Les cinq pages réalisées')
p('L’accueil met en avant les cours populaires. Le catalogue affiche les huit cours et actualise les résultats lorsque les filtres changent. La fiche fournit le programme du cours sélectionné. L’espace d’apprentissage affiche une leçon, son exercice et les commandes de progression. Le tableau de bord récapitule les activités et permet de reprendre un parcours.')
h('Cohérence et adaptation')
p('Les pages partagent le logo, les couleurs, la navigation et les composants de cartes. Les règles responsive réorganisent les éléments lorsque l’écran devient plus étroit. Les captures présentes dans design/ illustrent l’intention graphique ; les images ci-dessous sont des maquettes de conception et peuvent différer de la version actuelle.')
figure(Path('design/desktop/catalogue_du_cours.png'),'Figure 1 - Maquette de conception du catalogue.',300)
p('Le catalogue matérialise la séparation entre les critères de recherche et les cartes de cours. Aucun lien de démonstration publique n’est indiqué dans les éléments examinés du projet.')

page('5. Résultat final : apprentissage et suivi')
figure(Path('design/desktop/apprentissage.png'),'Figure 2 - Maquette de conception de l’espace d’apprentissage.',250)
p('L’organisation de l’espace d’apprentissage rapproche le programme, la leçon et le suivi. Dans la version implémentée, le contenu est constitué de fiches textuelles, de code selon la leçon et d’un exercice à réaliser ; aucune lecture vidéo n’est intégrée.')
figure(Path('design/desktop/dashboard.png'),'Figure 3 - Maquette de conception du tableau de bord.',250)
p('Le tableau de bord implémenté reprend les cours inscrits et la progression enregistrée. Les chiffres sont calculés à partir des validations locales, tandis que l’objectif personnel est modifiable par l’apprenant.')

page('6. Difficultés rencontrées et solutions')
p('Les points ci-dessous décrivent les contraintes techniques traitées par le code. Ils ne prétendent pas reconstituer un historique de travail qui n’a pas été fourni.')
h('Conserver une cohérence entre plusieurs pages')
p('La duplication de données peut provoquer des écarts entre le catalogue, les fiches et le tableau de bord. EduFlow centralise les cours dans data.js et partage les fonctions de stockage et de rendu. Les identifiants stables relient les contenus, les favoris et la progression.')
h('Adapter les mises en page')
p('Les grilles et panneaux latéraux demandent plus de place sur ordinateur que sur téléphone. Flexbox, Grid et les media queries réorganisent l’en-tête et les colonnes selon la largeur disponible.')
h('Fiabiliser la sauvegarde locale')
p('Le stockage peut être indisponible ou contenir des données invalides. Le code intercepte les erreurs, élimine certains doublons et valeurs incohérentes, et affiche un message lorsque la sauvegarde échoue. Il faut conserver la même adresse et le même port pendant l’utilisation.')
h('Distinguer consultation et validation')
p('La consultation enregistre la dernière leçon et inscrit le cours au suivi. Seul le bouton de validation modifie les leçons terminées. L’apprenant peut annuler une validation, ce qui recalcule la progression.')
h('Vérification effectuée pour le rapport')
p('Le test tests/storage.cjs a été exécuté avec succès : progression, reprise, favoris, données corrompues, erreurs et données des huit cours. Le test tests/interfaces.cjs existe, mais sa réexécution a été bloquée par l’absence de la dépendance facultative jsdom. Aucun résultat réussi de cette suite n’est donc affirmé ici.')
p('Avant la remise, une vérification visuelle de la version exécutée sur ordinateur et mobile, ainsi qu’un parcours au clavier, restent à documenter avec des captures réelles.')

page('7. Conclusion')
p('EduFlow met en pratique la réalisation d’un site web multipage consacré à l’apprentissage. Le projet associe la structuration sémantique en HTML5, la mise en forme responsive en CSS3 et les interactions en JavaScript Vanilla.')
p('Le résultat couvre la découverte des cours, la recherche, la consultation du programme, la lecture des leçons et le suivi de progression. La centralisation des données et l’utilisation de composants partagés rendent l’ensemble plus cohérent et facilitent son évolution.')
p('Ce mini projet permet de mobiliser la manipulation du DOM, la gestion des événements, les paramètres d’URL et la persistance locale. Il illustre aussi l’importance d’une validation explicite des actions et d’un traitement des erreurs de stockage.')
h('Limites et perspectives')
p('La version actuelle reste un prototype pédagogique fonctionnant dans un navigateur. Les données ne sont pas synchronisées entre appareils et peuvent disparaître si le stockage local est effacé. Les exercices ne sont pas corrigés automatiquement et plusieurs parcours nécessitent un enrichissement pédagogique.')
p('Les évolutions possibles comprennent un serveur applicatif, une base de données, une authentification, la synchronisation de la progression et un espace de gestion des cours. Des quiz corrigés, de véritables ressources vidéo et un dispositif de certification pourraient ensuite compléter la plateforme.')

page('8. Annexes')
h('A. Lancement local')
p('Ouvrir le dossier EduFlow dans VS Code, lancer index.html avec Live Server, puis utiliser les liens internes. Garder la même origine pour retrouver les données sauvegardées. L’ouverture directe des pages avec file:// peut produire des comportements de stockage différents selon le navigateur.')
h('B. Scénario de démonstration')
for i,t in enumerate(['Ouvrir l’accueil puis accéder au catalogue.','Rechercher un cours, appliquer un filtre et ajouter un favori.','Ouvrir la fiche HTML/CSS et consulter les modules.','Commencer une leçon, lire la fiche et consulter l’exercice.','Marquer la leçon comme terminée et passer à la suivante.','Ouvrir le tableau de bord et observer la progression.','Recharger le site puis reprendre le cours ; modifier l’objectif personnel.'],1): p(f'{i}. {t}')
h('C. Éléments de référence')
p('Modèle fourni : modèle_de_compte-rendu.pdf. Sources du projet examinées : README.md, pages HTML, feuilles de style, scripts de données et d’interaction, tests/storage.cjs et tests/interfaces.cjs. Illustrations : maquettes locales du dossier design/desktop/.')
h('D. Compléments avant remise')
p('Le groupe FIA3 et les intitulés institutionnels sont repris du modèle fourni. Les auteurs et l’année universitaire ont été renseignés selon les informations communiquées : IDRISS Zidane, BELAID Amine, 2026-2027. Ajouter des captures réelles de l’application exécutée pour compléter les illustrations du résultat final.')

SimpleDocTemplate(str(out/'Rapport_EduFlow_2026-2027.pdf'),pagesize=(595.28,841.89),rightMargin=52,leftMargin=52,topMargin=48,bottomMargin=60,title='EduFlow - mini projet LMS',author='IDRISS Zidane ; BELAID Amine').build(story,onFirstPage=footer,onLaterPages=footer)
(out/'Rapport_EduFlow_2026-2027.md').write_text('\n'.join(md),encoding='utf-8')
print(out/'Rapport_EduFlow_2026-2027.pdf')
