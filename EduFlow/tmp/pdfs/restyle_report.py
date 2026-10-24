from pathlib import Path
from io import BytesIO
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

base=Path(__file__).resolve().parent
source=base/'build_report.py'
ns={'__file__':str(source)}
text=source.read_text(encoding='utf-8')
exec(text[:text.index("p('République Tunisienne'")],ns)
for name,file in [('TNR','times.ttf'),('TNR-Bold','timesbd.ttf'),('TNR-Italic','timesi.ttf'),('TNR-BoldItalic','timesbi.ttf')]:
    pdfmetrics.registerFont(TTFont(name,'C:/Windows/Fonts/'+file))
pdfmetrics.registerFontFamily('TNR',normal='TNR',bold='TNR-Bold',italic='TNR-Italic',boldItalic='TNR-BoldItalic')
styles=ns['styles']
for name in ['BodyFR','CenterFR','SectionFR','SubFR','CodeFR']:
    s=styles[name]; s.fontName='TNR-Bold' if name in ['SectionFR','SubFR'] else 'TNR'
    s.fontSize=12; s.leading=15.5; s.textColor=ns['colors'].black
    s.backColor=None; s.borderPadding=0
styles['CodeFR'].fontSize=10; styles['CodeFR'].leading=13
styles['SectionFR'].spaceAfter=22
styles['SubFR'].spaceAfter=8
styles['SectionFR'].fontSize=17; styles['SectionFR'].leading=22
styles['SectionFR'].keepWithNext=True
styles['SubFR'].fontSize=13.5; styles['SubFR'].leading=18
styles['SubFR'].keepWithNext=True
def footer(c,d):
    c.setFillColorRGB(0,0,0); c.setFont('Helvetica',12); c.drawCentredString(297.625,53,str(d.page+1))
ns['footer']=footer
body=text[text.index("page('Plan du rapport')"):text.index('SimpleDocTemplate(')]
body=body.replace("page('Plan du rapport')","p('Plan :', 'SectionFR')")
body=body.replace(',250)', ',215)')
tech='''page('4. Implémentation : technologies')
p('EduFlow utilise trois technologies principales pour son interface. Les logos ci-dessous sont accompagnés d’une définition simple et de leur rôle dans le projet.')
technology('html5', 'HTML5', 'Langage de balisage qui organise le contenu d’une page web : titres, textes, images, liens et formulaires. Dans EduFlow, il structure les cinq pages.')
technology('css3', 'CSS3', 'Langage de style qui définit les couleurs, les polices, les espacements et la disposition des éléments. Il permet aussi d’adapter EduFlow aux écrans mobiles.')
technology('javascript', 'JavaScript', 'Langage de programmation qui rend les pages interactives. Il gère la recherche, les filtres, les favoris, les leçons et le calcul de la progression.')
h('Stockage dans le navigateur : localStorage')
p('localStorage est une API du navigateur permettant de conserver des données localement. EduFlow l’utilise pour enregistrer les favoris, la progression et l’objectif personnel. Ce mécanisme n’a pas de logo standard distinct ; il est utilisé depuis JavaScript.')
p('React, Python, Flutter et SQL sont des thèmes du catalogue, pas les technologies de développement de cette version.')
page('3. Conception : outils utilisés')
p('Conformément au modèle de compte rendu, cette partie présente les outils de rédaction du code, de lancement local, de collaboration et de vérification. Le README du projet décrit cet environnement de travail.')
technology('vscode', 'Visual Studio Code', 'Éditeur de code permettant d’écrire et d’organiser les fichiers HTML, CSS et JavaScript. Le README recommande son utilisation pour ouvrir le dossier EduFlow.')
technology('live-server', 'Live Server', 'Extension de Visual Studio Code qui lance un serveur web local et actualise la page après la sauvegarde des fichiers. Elle permet de conserver la même origine pour les données localStorage.')
technology('git', 'Git', 'Outil de gestion de versions qui suit les modifications des fichiers et facilite la collaboration. Le projet possède un dépôt Git.')
technology('github', 'GitHub', 'Plateforme d’hébergement de dépôts Git qui permet de partager le code et de collaborer. Le workflow décrit dans le README prévoit la publication d’une branche et l’intégration du travail du binôme.')
technology('github-desktop', 'GitHub Desktop', 'Application graphique pour consulter les changements, créer des commits et publier une branche sur GitHub. Le README présente ces étapes pour coordonner le travail du binôme.')
technology('chrome', 'Navigateur web : Google Chrome', 'Logiciel qui affiche le site et permet de vérifier les liens, les formulaires et les interactions. Ses outils de développement facilitent l’inspection des pages et les essais sur différentes largeurs d’écran.')
p('Logos : bibliothèque Devicon et dépôts officiels Live Server (ritwickdey/vscode-live-server) et GitHub Desktop (desktop/desktop).')

'''
from reportlab.platypus import Table, TableStyle, Paragraph, Spacer, Image
def technology(icon,title,definition):
    drawing=Image(str(ns['out']/'logos'/f'{icon}.png'),width=30,height=30)
    table=Table([[drawing,Paragraph('<font size="13.5"><b>'+title+'</b></font><br/>'+definition,styles['BodyFR'])]],colWidths=[42,409])
    table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),7)]))
    ns['story'].append(table)
ns['technology']=technology
tools_start=tech.index("page('3. Conception : outils utilisés')")
tech=tech[tools_start:]+tech[:tools_start]
from uml_diagrams import use_cases, classes
def diagram(kind):
    drawing=use_cases() if kind=='usecase' else classes()
    factor=min(451/drawing.width,420/drawing.height)
    drawing.scale(factor,factor); drawing.width*=factor; drawing.height*=factor
    ns['story'].append(drawing)
ns['diagram']=diagram
uml='''page('3. Conception : cas d’utilisation')
p('Le diagramme présente les fonctions accessibles à l’apprenant. Cet acteur représente la personne utilisant le navigateur ; la version actuelle ne demande pas de compte utilisateur.')
diagram('usecase')
p('Diagramme de cas d’utilisation corrigé - EduFlow.', 'CenterFR')
p('La consultation du programme permet de parcourir les modules et leurs leçons. Les favoris, la validation des leçons et l’objectif personnel complètent les fonctions du diagramme initial. Les associations sont simples : aucun lien include ou extend n’est nécessaire pour décrire ces actions indépendantes.')
page('3. Conception : diagramme de classes')
p('Ce modèle conceptuel représente les données de la version actuelle. Les classes ne correspondent pas à des déclarations class en JavaScript : les données sont implémentées par des objets, des tableaux et localStorage.')
diagram('class')
p('Diagramme de classes conceptuel corrigé - EduFlow.', 'CenterFR')
p('Un cours contient un ou plusieurs modules ; chaque module contient une ou plusieurs leçons. Un profil local conserve de zéro à plusieurs progressions, chacune liée à un seul cours. La validation d’une leçon est enregistrée dans cette progression, et non comme un état universel de la leçon.')
p('Les favoris sont indépendants de l’inscription. La barre de menu et la barre de progression sont des composants d’interface ; elles ne sont pas des entités de ce modèle de données. Le pourcentage est calculé à partir des leçons terminées. Aucun identifiant ni nom de compte étudiant n’est stocké dans la version actuelle.')

'''
tech=uml+tech
begin=body.index("page('4. Implémentation : technologies')")
end=body.index("page('4. Implémentation : code et fonctionnement')")
body=body[:begin]+tech+body[end:]
results='''page('5. Résultat final')
p('Les illustrations suivantes sont des captures réelles de la version locale d’EduFlow, réalisées dans le navigateur à une largeur de 1440 pixels. Elles remplacent les maquettes de conception.')
figure(Path('output/pdf/captures/accueil.png'), 'Figure 1 - Capture réelle de la page d’accueil.', 220)
p('L’accueil présente la plateforme et donne accès au catalogue et aux cours populaires.')
figure(Path('output/pdf/captures/catalogue.png'), 'Figure 2 - Capture réelle du catalogue de cours.', 220)
p('Le catalogue affiche les cours, les filtres et le tri. Les actions permettent de consulter une fiche, de commencer un cours ou de modifier les favoris.')
page('5. Résultat final : cours et apprentissage')
figure(Path('output/pdf/captures/fiche.png'), 'Figure 3 - Capture réelle de la fiche HTML/CSS.', 230)
p('La fiche regroupe la présentation du cours, le programme et le suivi de progression.')
figure(Path('output/pdf/captures/apprentissage.png'), 'Figure 4 - Capture réelle de l’espace d’apprentissage.', 230)
p('L’apprenant consulte une fiche textuelle et un exercice, puis valide la leçon avec le bouton dédié. Le programme permet de naviguer entre les leçons.')
page('5. Résultat final : suivi et version mobile')
figure(Path('output/pdf/captures/tableau-de-bord.png'), 'Figure 5 - Capture réelle du tableau de bord.', 215)
p('Pour cette démonstration, la première leçon HTML/CSS a été validée dans un navigateur de test. Le tableau de bord affiche la progression correspondante et les activités récentes.')
figure(Path('output/pdf/captures/catalogue-mobile.png'), 'Figure 6 - Capture réelle du catalogue sur mobile (390 pixels).', 280)
p('La vue mobile montre la réorganisation de la navigation et des filtres lorsque la largeur de l’écran diminue.')

'''
begin=body.index("page('5. Résultat final')")
end=body.index("page('6. Difficultés rencontrées et solutions')")
body=body[:begin]+results+body[end:]
body=body.replace('Les illustrations de conception sont identifiées comme des maquettes ; elles ne constituent pas des captures de la version exécutée.', 'Les illustrations du résultat final sont des captures réelles de la version exécutée localement.')
body=body.replace('Avant la remise, une vérification visuelle de la version exécutée sur ordinateur et mobile, ainsi qu’un parcours au clavier, restent à documenter avec des captures réelles.', 'Des captures réelles des cinq pages sur ordinateur et du catalogue sur mobile ont été réalisées pour ce rapport. Un test automatisé a ouvert chaque page et validé une leçon avant la capture du tableau de bord. Ces vérifications ne constituent pas un audit complet d’accessibilité.')
body=body.replace('Illustrations : maquettes locales du dossier design/desktop/.', 'Illustrations : captures réelles réalisées dans un navigateur local ; logos des technologies provenant de la bibliothèque Devicon.')
body=body.replace('Ajouter des captures réelles de l’application exécutée pour compléter les illustrations du résultat final.', 'Les captures de l’application exécutée figurent dans la partie Résultat final.')
# Prepare a submission-ready narrative, without notes about report revisions.
body=body[body.index("page('1. Introduction')"):]
body="p('Table des matières', 'SectionFR')\ntable_of_contents()\n"+body
replacements={
' corrigé - EduFlow.':' - EduFlow.',
'Les favoris, la validation des leçons et l’objectif personnel complètent les fonctions du diagramme initial. Les associations sont simples : aucun lien include ou extend n’est nécessaire pour décrire ces actions indépendantes.':'L’apprenant peut également gérer ses favoris, valider une leçon et définir un objectif personnel. Chaque action est reliée directement à l’acteur qui la réalise.',
'Ce modèle conceptuel représente les données de la version actuelle. Les classes ne correspondent pas à des déclarations class en JavaScript : les données sont implémentées par des objets, des tableaux et localStorage.':'Le diagramme de classes présente l’organisation des données : cours, modules, leçons et progression. Dans le site, ces éléments sont représentés par des objets et des tableaux JavaScript ; les données personnelles de suivi sont conservées dans localStorage.',
'La validation d’une leçon est enregistrée dans cette progression, et non comme un état universel de la leçon.':'Les validations des leçons sont enregistrées dans la progression du profil local.',
'Les favoris sont indépendants de l’inscription. La barre de menu et la barre de progression sont des composants d’interface ; elles ne sont pas des entités de ce modèle de données. Le pourcentage est calculé à partir des leçons terminées. Aucun identifiant ni nom de compte étudiant n’est stocké dans la version actuelle.':'Un cours peut être ajouté aux favoris avant de commencer son apprentissage. Le pourcentage de progression est calculé à partir des leçons terminées. Le profil représente les préférences et le suivi enregistrés dans le navigateur, sans compte utilisateur.',
'Conformément au modèle de compte rendu, cette partie présente les outils de rédaction du code, de lancement local, de collaboration et de vérification. Le README du projet décrit cet environnement de travail.':'L’environnement de travail réunit un éditeur de code, un serveur local, des outils de gestion de versions et un navigateur. Chacun intervient à une étape précise, de la modification des fichiers à la vérification du site.',
'Le README recommande son utilisation pour ouvrir le dossier EduFlow.':'Il permet de travailler sur les fichiers du dossier EduFlow dans un même espace.',
'Le workflow décrit dans le README prévoit la publication d’une branche et l’intégration du travail du binôme.':'Les branches permettent de préparer les modifications avant de les intégrer au travail commun.',
'Le README présente ces étapes pour coordonner le travail du binôme.':'Ces fonctions facilitent la coordination du travail en binôme.',
'Ce mécanisme n’a pas de logo standard distinct ; il est utilisé depuis JavaScript.':'Les données restent disponibles après le rechargement des pages.',
'EduFlow utilise trois technologies principales pour son interface. Les logos ci-dessous sont accompagnés d’une définition simple et de leur rôle dans le projet.':'Nous avons retenu HTML5, CSS3 et JavaScript pour construire EduFlow. Ces technologies couvrent la structure des pages, leur présentation et les interactions avec l’apprenant.',
'Les illustrations suivantes sont des captures réelles de la version locale d’EduFlow, réalisées dans le navigateur à une largeur de 1440 pixels. Elles remplacent les maquettes de conception.':'Cette partie présente les principales pages d’EduFlow. Les captures sur ordinateur ont été réalisées dans le navigateur à une largeur de 1440 pixels.',
'Capture réelle de':'Vue de',
'Capture réelle du':'Vue du',
'Les points ci-dessous décrivent les contraintes techniques traitées par le code. Ils ne prétendent pas reconstituer un historique de travail qui n’a pas été fourni.':'La réalisation d’un site multipage demande de maintenir la cohérence des données, d’adapter la mise en page et de fiabiliser la sauvegarde. Les solutions retenues pour EduFlow sont présentées ci-dessous.',
'Vérification effectuée pour le rapport':'Vérification du fonctionnement',
'Le test tests/storage.cjs a été exécuté avec succès : progression, reprise, favoris, données corrompues, erreurs et données des huit cours. Le test tests/interfaces.cjs existe, mais sa réexécution a été bloquée par l’absence de la dépendance facultative jsdom. Aucun résultat réussi de cette suite n’est donc affirmé ici.':'Les tests de stockage ont permis de vérifier la progression, la reprise des cours, les favoris et le traitement des données invalides. Ils se sont terminés avec succès. Une suite de tests d’interface est également présente ; son exécution nécessite la dépendance facultative jsdom.',
'Des captures réelles des cinq pages sur ordinateur et du catalogue sur mobile ont été réalisées pour ce rapport. Un test automatisé a ouvert chaque page et validé une leçon avant la capture du tableau de bord. Ces vérifications ne constituent pas un audit complet d’accessibilité.':'Le parcours de démonstration couvre les cinq pages, la validation d’une leçon et l’affichage de la progression dans le tableau de bord. La vue du catalogue sur mobile permet également d’observer l’adaptation de la mise en page. La navigation au clavier et l’accessibilité restent des points à approfondir.',
'L’apprentissage en ligne nécessite une interface qui permette de trouver des ressources, de consulter un programme et de suivre son avancement. EduFlow répond à ce besoin à travers un mini LMS, c’est-à-dire un système simplifié de gestion de l’apprentissage.':'Dans ce mini projet, nous proposons EduFlow, une plateforme d’apprentissage en ligne. Notre objectif est de réunir dans un même site la consultation des cours, la lecture des leçons et le suivi de progression. EduFlow prend ainsi la forme d’un mini LMS, c’est-à-dire un système simplifié de gestion de l’apprentissage.',
'Ce mini projet permet de mobiliser la manipulation du DOM, la gestion des événements, les paramètres d’URL et la persistance locale. Il illustre aussi l’importance d’une validation explicite des actions et d’un traitement des erreurs de stockage.':'Ce mini projet nous a permis de mettre en pratique la structuration des pages, la manipulation du DOM et la sauvegarde locale. Il montre aussi qu’une interface doit rendre les actions compréhensibles : consulter une leçon, la terminer et retrouver sa progression correspondent à des étapes distinctes.',
}
for old,new in replacements.items(): body=body.replace(old,new)
annex=body.index("h('C. Éléments de référence')")
body=body[:annex]+'''h('C. Organisation des livrables')
p('Le dossier du projet contient les cinq pages HTML, les feuilles de style, les scripts JavaScript, les images et les fichiers de test. Le fichier README.md présente le lancement local et les règles de fonctionnement du stockage.')
h('D. Sources des illustrations')
p('Les captures présentent le site EduFlow exécuté localement dans Google Chrome. Les diagrammes décrivent les fonctions et les données du projet. Les logos des technologies proviennent de Devicon ; ceux de Live Server et GitHub Desktop proviennent des dépôts officiels de ces outils.')
'''
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.styles import ParagraphStyle
toc=TableOfContents()
toc.dotsMinLevel=0
toc.tableStyle=TableStyle([('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0),('VALIGN',(0,0),(-1,-1),'TOP')])
toc.levelStyles=[
    ParagraphStyle(name='TOCMain',fontName='TNR-Bold',fontSize=10.5,leading=13,leftIndent=0,firstLineIndent=0,spaceBefore=6,rightIndent=20),
    ParagraphStyle(name='TOCSub',fontName='TNR',fontSize=10,leading=12,leftIndent=13,firstLineIndent=0,spaceBefore=2,rightIndent=20),
]
def table_of_contents():
    # The framed title follows the professor's reference layout.
    ns['story'].pop()
    title=Paragraph('TABLE DES MATIÈRES',ParagraphStyle(name='TOCTitle',fontName='TNR-Bold',fontSize=12,leading=15,alignment=1))
    frame=Table([[title]],colWidths=[451])
    frame.setStyle(TableStyle([('BOX',(0,0),(-1,-1),0.6,ns['colors'].black),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3)]))
    ns['story'].extend([frame,Spacer(1,19),toc])
ns['table_of_contents']=table_of_contents
class ReportDoc(ns['SimpleDocTemplate']):
    def beforeDocument(self):
        self.chapter=None; self.subsection=0
    def afterFlowable(self,flowable):
        if isinstance(flowable,Paragraph) and flowable.style.name in ['SectionFR','SubFR']:
            heading=flowable.getPlainText()
            if flowable.style.name=='SectionFR':
                number=heading.split('.')[0]
                if number!=self.chapter:
                    self.chapter=number; self.subsection=0
                    main=heading.split(' : ')[0]
                    self.notify('TOCEntry',(0,main.upper(),self.page+1))
                if ' : ' in heading:
                    self.subsection+=1
                    self.notify('TOCEntry',(1,f'{number}.{self.subsection}. '+heading.split(' : ',1)[1].capitalize(),self.page+1))
            elif self.chapter:
                self.subsection+=1
                if self.chapter=='8' and len(heading)>3 and heading[1:3]=='. ': heading=heading[3:]
                self.notify('TOCEntry',(1,f'{self.chapter}.{self.subsection}. '+heading,self.page+1))
exec(body,ns)
ReportDoc(str(base/'body.pdf'),pagesize=(595.25,842),rightMargin=72,leftMargin=72,topMargin=72,bottomMargin=80).multiBuild(ns['story'],onFirstPage=footer,onLaterPages=footer)

# Keep the original cover artwork and all original text except the fields
# that identify the project, its authors and academic year.
original=PdfReader(r'C:/Users/21624/Downloads/Mini_Projet_ Part1/Mini_Projet_ Part1/modèle_de_compte-rendu.pdf')
from pypdf.generic import ContentStream
cover=original.pages[0]
cs=ContentStream(cover.get_contents(),original)
drop=['Titre de mini Projet','Étudiant 1 :','Étudiant 2 :','A.U. : 2025/2026']
# Word splits strings into several text operators: replace complete text
# objects selected using their concatenated visible text.
ops=[]; block=None
for operands,operator in cs.operations:
    if operator==b'BT': block=[(operands,operator)]
    elif block is not None:
        block.append((operands,operator))
        if operator==b'ET':
            content=''.join(str(v) for args,op in block if op in [b'Tj',b'TJ'] for a in args for v in (a if isinstance(a,list) else [a]) if not isinstance(v,(int,float)))
            if not any(s in content for s in drop): ops.extend(block)
            block=None
    else: ops.append((operands,operator))
cs.operations=ops; cover.replace_contents(cs)
buf=BytesIO(); c=canvas.Canvas(buf,pagesize=(595.25,842))
# White rectangles also clear field fragments if source text is split
# across text objects. The surrounding cover, logos and frame are untouched.
c.setFillColorRGB(1,1,1)
for x,y,w,h in [(105,319,400,50),(200,170,330,49),(75,89,200,18)]: c.rect(x,y,w,h,stroke=0,fill=1)
c.setFillColorRGB(0,0,0)
c.setFont('TNR-Italic',27); c.drawCentredString(297.625,336,'EduFlow - mini projet LMS')
c.setFont('TNR',18); c.drawString(208.1,195.2,'IDRISS Zidane'); c.drawString(208.1,175.2,'BELAID Amine')
c.setFont('TNR',12); c.drawString(77.5,93.4,'A.U. : 2026/2027')
c.save(); buf.seek(0); cover.merge_page(PdfReader(buf).pages[0])
w=PdfWriter(); w.add_page(cover)
for page in PdfReader(base/'body.pdf').pages: w.add_page(page)
w.add_metadata({'/Title':'EduFlow - mini projet LMS','/Author':'IDRISS Zidane ; BELAID Amine'})
output=ns['out']/'Rapport_EduFlow_2026-2027.pdf'
with output.open('wb') as f: w.write(f)
print(output)
