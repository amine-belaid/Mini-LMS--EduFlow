from reportlab.graphics.shapes import Drawing, Rect, Line, String, Ellipse, Circle, Polygon
from reportlab.lib import colors

def label(d,x,y,t,size=12,anchor='start',bold=False):
    d.add(String(x,y,t,fontName='TNR-Bold' if bold else 'TNR',fontSize=size,textAnchor=anchor,fillColor=colors.black))

def use_cases():
    d=Drawing(650,610)
    d.add(Rect(140,15,495,580,fillColor=None,strokeColor=colors.black))
    label(d,387,570,'EduFlow - Mini LMS',16,'middle',True)
    d.add(Circle(65,330,15,fillColor=None)); d.add(Line(65,315,65,265))
    for x,y in [(40,290),(90,290),(40,235),(90,235)]:
        d.add(Line(65,290 if y==290 else 265,x,y))
    label(d,65,215,'Apprenant',14,'middle')
    cases=['Rechercher et filtrer les cours','Consulter la fiche et le programme','Commencer ou reprendre un cours','Consulter et parcourir les leçons','Valider ou annuler une validation','Gérer les cours favoris','Consulter sa progression et ses activités','Définir un objectif personnel']
    for i,t in enumerate(cases):
        y=520-i*62
        d.add(Line(90,287,208,y))
        d.add(Ellipse(410,y,202,23,fillColor=colors.white,strokeColor=colors.black))
        label(d,410,y-4,t,13,'middle')
    return d

def classes():
    d=Drawing(760,670)
    def box(x,y,w,title,attrs):
        h=42+20*len(attrs)
        d.add(Rect(x,y,w,h,fillColor=colors.white,strokeColor=colors.black))
        d.add(Line(x,y+h-32,x+w,y+h-32)); label(d,x+w/2,y+h-22,title,16,'middle',True)
        for i,t in enumerate(attrs): label(d,x+9,y+h-53-20*i,t,12)
        return (x,y,w,h)
    profile=box(20,475,245,'ProfilLocal', ['favoris : String[]','objectifCours : Integer'])
    course=box(460,430,275,'Cours',['id : String','titre : String','description : String','categorie : String','niveau : String','duree : Number'])
    prog=box(20,160,300,'ProgressionCours',['courseId : String','leconsTerminees : Integer[]','derniereLecon : Integer','dateInscription : Date','dateMiseAJour : Date','/pourcentage : Integer'])
    module=box(460,230,275,'Module',['titre : String','ordre : Integer'])
    lesson=box(460,30,275,'Lecon',['indiceGlobal : Integer','titre : String','contenu : Texte / Code','exercice : String'])
    def diamond(x,y):
        d.add(Polygon([x,y,x-6,y-11,x,y-22,x+6,y-11],fillColor=colors.black))
    # Composition: course owns modules, module owns lessons.
    for top,bottom in [(course,module),(module,lesson)]:
        x=top[0]+top[2]/2; y=top[1]; end=bottom[1]+bottom[3]
        diamond(x,y); d.add(Line(x,y-22,x,end))
        label(d,x+12,y-24,'1'); label(d,x+12,end+8,'1..*')
    # Local profile owns a progress entry per enrolled course.
    d.add(Line(130,475,130,322)); diamond(130,475)
    label(d,142,445,'1'); label(d,142,335,'0..*')
    label(d,148,395,'conserve')
    # Each progress entry references exactly one course.
    d.add(Line(320,280,385,280)); d.add(Line(385,280,385,450)); d.add(Line(385,450,460,450))
    label(d,332,290,'0..*'); label(d,432,460,'1'); label(d,370,370,'suit',12,'end')
    # Favorites are a separate association, independent of enrollment.
    d.add(Line(265,545,460,545)); label(d,280,555,'1'); label(d,423,555,'0..*')
    label(d,360,523,'favoris',12,'middle')
    return d
