/* Identifiants identiques à ceux des liens et favoris de la homepage.
   Le catalogue pourra réutiliser ces données communes. */
window.EduFlowData = {
    courses: [
        {
            id: "html-css",
            title: "Développement Web avec HTML & CSS",
            category: "Développement Web", level: "Débutant", duration: 3,
            image: "assets/images/preview.png", imageAlt: "Illustration des technologies HTML5 et CSS3",
            rating: "4.8", reviews: 1200, students: "10k+",
            description: "Apprenez à créer des sites web modernes et responsive avec HTML5 et CSS3, depuis les bases jusqu’à la création d’un projet complet.",
            about: "Ce cours vous permettra d’apprendre les bases du développement web avec HTML et CSS. Vous découvrirez comment structurer une page web, la styliser avec CSS, et créer un site moderne et responsive. À la fin du cours, vous réaliserez un projet complet.",
            objectives: ["Comprendre la structure d’une page HTML.", "Utiliser les balises HTML principales (head, body, div, p, h1, ...).", "Styliser vos pages avec CSS (couleurs, polices, mise en page).", "Créer un design responsive pour tous les écrans.", "Réaliser un projet web complet de A à Z."],
            prerequisites: ["Aucune connaissance préalable en programmation n’est nécessaire.", "Un ordinateur avec un navigateur web (Chrome, Firefox, etc.)."],
            instructor: { name: "Ahmed Ben Ali", image: "assets/instructors/ahmed.png", role: "Développeur Web & Formateur", bio: "Passionné par le développement web, Ahmed partage son expérience à travers des cours clairs et pratiques pour aider les débutants à progresser." },
            modules: [
                { title: "Introduction au HTML", lessons: ["Qu’est-ce que le HTML ?", "Structure d’une page", "Installation des outils"] },
                { title: "Les bases du HTML", lessons: ["Les balises essentielles", "Textes et titres", "Listes et liens", "Images et médias"] },
                { title: "Introduction au CSS", lessons: ["Sélecteurs et propriétés CSS", "Couleurs, polices et modèle de boîte"] },
                { title: "Mise en page", lessons: ["Organiser une page avec Flexbox et Grid", "Adapter une page aux différents écrans"] },
                { title: "Projet final", lessons: ["Créer votre premier site web complet"] }
            ]
        },
        {
            id: "javascript", title: "JavaScript Interactif pour Débutants",
            category: "Programmation", level: "Intermédiaire", duration: 4,
            image: "assets/images/courses/js.png", imageAlt: "Logo JavaScript",
            rating: "4.7", reviews: 856, students: null,
            description: "Découvrez JavaScript et ajoutez des interactions à vos pages web grâce à des exercices pratiques.",
            about: "Apprenez à manipuler les données, réagir aux événements et modifier le contenu d’une page avec JavaScript Vanilla. Vous construirez une petite application interactive.",
            objectives: ["Utiliser les variables et les types de données.", "Écrire des conditions, des boucles et des fonctions.", "Manipuler le DOM et gérer les événements.", "Enregistrer des données avec localStorage."],
            prerequisites: ["Connaître les bases du HTML et du CSS.", "Disposer d’un navigateur récent et d’un éditeur de code."],
            instructor: { name: "Sarra Mansouri", image: "assets/instructors/sarra.png", role: "Formatrice en programmation", bio: "Sarra accompagne les apprenants dans la découverte de JavaScript à travers des exemples et des exercices pratiques." },
            modules: [
                { title: "Premiers pas", lessons: ["Découvrir JavaScript", "Configurer son environnement", "Variables et constantes"] },
                { title: "Les fondamentaux", lessons: ["Types de données", "Opérateurs", "Conditions", "Boucles", "Fonctions"] },
                { title: "Données et collections", lessons: ["Tableaux", "Objets"] },
                { title: "Interagir avec la page", lessons: ["Sélectionner des éléments du DOM", "Modifier le contenu", "Gérer les événements"] },
                { title: "Projet pratique", lessons: ["Enregistrer les données avec localStorage", "Créer une application interactive"] }
            ]
        },
        {
            id: "ui-ux", title: "UI/UX Design Moderne",
            category: "Design", level: "Débutant", duration: 3,
            image: "assets/images/courses/ui.png", imageAlt: "Interface graphique présentée sur un écran",
            rating: "4.6", reviews: 620, students: null,
            description: "Concevez des interfaces claires et agréables, de la compréhension des utilisateurs au prototype.",
            about: "Découvrez les principes du design d’interface et de l’expérience utilisateur. Organisez le contenu, créez des maquettes et préparez un prototype dans Figma.",
            objectives: ["Comprendre les différences entre UI et UX.", "Construire un parcours utilisateur et des wireframes.", "Choisir les couleurs, la typographie et les espacements.", "Créer et présenter un prototype dans Figma."],
            prerequisites: ["Aucune expérience en design n’est nécessaire.", "Disposer d’un ordinateur et d’un accès à Figma."],
            instructor: { name: "Yassine Kchaou", image: "assets/instructors/yassine.png", role: "Formateur UI/UX Design", bio: "Yassine guide les apprenants dans la conception d’interfaces cohérentes et faciles à utiliser." },
            modules: [
                { title: "Comprendre les utilisateurs", lessons: ["Introduction à l’UI et à l’UX", "Identifier les besoins", "Construire un parcours utilisateur"] },
                { title: "Concevoir une interface", lessons: ["Wireframes", "Couleurs et contrastes", "Typographie", "Espacements et hiérarchie"] },
                { title: "Prototyper dans Figma", lessons: ["Créer une maquette", "Relier les écrans", "Présenter et améliorer son prototype"] }
            ]
        },
        {
            id: "sql", title: "Bases de Données SQL",
            category: "Bases de Données", level: "Intermédiaire", duration: 2,
            image: "assets/images/courses/sql.png", imageAlt: "Illustration de base de données SQL",
            rating: "4.8", reviews: 940, students: null,
            description: "Apprenez à organiser et interroger des données avec les principales commandes SQL.",
            about: "Découvrez les bases de données relationnelles, créez des tables et écrivez des requêtes pour sélectionner, modifier et relier vos données.",
            objectives: ["Comprendre les tables, les clés et les relations.", "Créer et modifier une base de données.", "Filtrer et trier les résultats d’une requête.", "Utiliser les jointures et les fonctions d’agrégation."],
            prerequisites: ["Être à l’aise avec les outils informatiques.", "Disposer d’un environnement permettant d’exécuter des requêtes SQL."],
            instructor: { name: "Meriem Ben Salem", image: "assets/instructors/meriem.png", role: "Formatrice en bases de données", bio: "Meriem accompagne les apprenants dans la compréhension des bases de données et la rédaction de requêtes SQL." },
            modules: [
                { title: "Bases relationnelles", lessons: ["Tables et relations", "Créer une base et des tables"] },
                { title: "Manipuler les données", lessons: ["Insérer et modifier les données", "Sélectionner avec SELECT", "Filtrer et trier"] },
                { title: "Aller plus loin", lessons: ["Relier les tables avec les jointures", "Regrouper et agréger les résultats", "Exercices pratiques"] }
            ]
        }
    ]
};

/* Cours complémentaires du catalogue. Les contenus restent des exemples pédagogiques. */
const additionalCourses = [
    { id: "python", title: "Python pour la Data Science", category: "Programmation", level: "Intermédiaire", duration: 6, rating: "4.9", reviews: 1500, name: "Karim Haddad", initials: "KH", modules: [
        ["Découvrir Python", "Installer Python", "Variables et types", "Conditions", "Boucles", "Fonctions"],
        ["Organiser les données", "Listes", "Dictionnaires", "Compréhensions", "Fichiers", "Exceptions"],
        ["Analyser les données", "NumPy", "Pandas", "Nettoyer les données", "Filtrer les données", "Statistiques descriptives"],
        ["Présenter une analyse", "Graphiques", "Comparer des groupes", "Explorer un jeu de données", "Interpréter les résultats", "Projet de synthèse"]
    ] },
    { id: "react", title: "React.js - Projets pratiques", category: "Développement Web", level: "Avancé", duration: 5, rating: "4.7", reviews: 980, name: "Ines Gharsalli", initials: "IG", modules: [
        ["Fondations React", "Créer un projet", "JSX", "Composants", "Props", "Listes et clés", "Composition"],
        ["Interfaces interactives", "État local", "Événements", "Formulaires", "Effets", "Hooks personnalisés", "Contexte"],
        ["Projet pratique", "Navigation", "Charger des données", "Gérer les erreurs", "Tester les composants", "Accessibilité", "Finaliser le projet"]
    ] },
    { id: "flutter", title: "Flutter - Applications mobiles", category: "Développement Mobile", level: "Intermédiaire", duration: 5, rating: "4.6", reviews: 720, name: "Omar Trabelsi", initials: "OT", modules: [
        ["Démarrer avec Flutter", "Installer Flutter", "Bases de Dart", "Widgets", "Arbre de widgets"],
        ["Construire les écrans", "Contraintes et mise en page", "Listes", "Images et icônes", "Thèmes"],
        ["Ajouter des interactions", "État local", "Formulaires", "Navigation", "Gestion des erreurs"],
        ["Projet mobile", "Stockage local", "Requêtes réseau", "Tests", "Préparer une application"]
    ] },
    { id: "ai", title: "Introduction à l’IA", category: "Intelligence Artificielle", level: "Débutant", duration: 4, rating: "4.8", reviews: 1100, name: "Leila Nouira", initials: "LN", modules: [
        ["Comprendre l’IA", "Définir l’IA", "Données et modèles", "Apprentissage supervisé", "Apprentissage non supervisé", "Exemples d’applications"],
        ["Construire une démarche", "Préparer des données", "Entraîner un modèle", "Évaluer un modèle", "Surapprentissage", "Interpréter les résultats"],
        ["Utiliser l’IA avec recul", "Biais et limites", "Confidentialité", "IA générative", "Projet de découverte"]
    ] }
];

additionalCourses.forEach(course => {
    window.EduFlowData.courses.push({
        ...course, image: `assets/images/courses/${course.id}.png`, imageAlt: course.title, students: null,
        description: `Découvrez ${course.title.toLowerCase()} grâce à un parcours progressif et des exercices pratiques.`,
        about: `Ce parcours présente les notions essentielles de ${course.title.toLowerCase()}. Chaque module propose une lecture guidée et une activité pour mettre les notions en pratique.`,
        objectives: ["Comprendre les notions essentielles du domaine.", "Appliquer les concepts dans des exercices guidés.", "Construire et présenter un petit projet personnel."],
        prerequisites: [course.level === "Débutant" ? "Aucune expérience préalable dans le domaine n’est nécessaire." : "Connaître les bases du domaine avant de commencer.", "Disposer d’un ordinateur et d’un navigateur récent."],
        instructor: { name: course.name, image: `assets/instructors/${course.id}.svg`, role: "Formateur EduFlow", bio: "Un parcours guidé pour apprendre progressivement et pratiquer à chaque étape." },
        modules: course.modules.map(([title, ...lessons]) => ({ title, lessons }))
    });
});

window.EduFlowData.getLessons = course => course.modules.flatMap((module, moduleIndex) =>
    module.lessons.map((title, index) => ({ title, module: module.title, moduleIndex, index })));

/* Fiches de lecture de démonstration : pas de vidéo ni de certificat officiel. */
const htmlLessons = [
    ["HTML décrit la structure d’un document web. Le navigateur interprète ses éléments pour présenter titres, paragraphes, liens et médias.", "Un élément possède généralement une balise ouvrante, un contenu et une balise fermante. Le CSS gère la présentation ; JavaScript ajoute les interactions.", "<p>Bonjour EduFlow !</p>", "Créez un document contenant un titre et deux paragraphes."],
    ["Un document HTML5 commence par le doctype. La racine html contient head pour les métadonnées et body pour le contenu visible.", "Déclarez la langue du document, l’encodage UTF-8 et le viewport pour préparer une page accessible sur différents écrans.", '<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <title>Ma page</title>\n</head>\n<body><h1>Bienvenue</h1></body>\n</html>', "Créez index.html puis ouvrez-le dans votre navigateur."],
    ["Un éditeur de texte, un navigateur et des outils de développement suffisent pour commencer. Organisez vos fichiers HTML, CSS et images dans des dossiers clairs.", "Inspectez votre page avec les outils du navigateur. La console aide à repérer les erreurs et l’inspecteur permet de comprendre la structure du document.", "projet/\n  index.html\n  css/style.css\n  assets/images/", "Créez cette arborescence et vérifiez le chemin d’une image."],
    ["Les balises donnent un sens au contenu : h1 pour le titre principal, p pour un paragraphe, a pour un lien et section pour un groupe thématique.", "Choisissez un élément selon son rôle. Un lien navigue vers une destination ; un bouton déclenche une action. Évitez d’utiliser div pour tout.", '<section aria-labelledby="titre">\n  <h1 id="titre">Mon cours</h1>\n  <p>Une introduction.</p>\n  <a href="courses.html">Voir les cours</a>\n</section>', "Structurez une présentation avec un titre, un paragraphe et un lien."],
    ["Les titres h1 à h6 organisent le document. Leur niveau reflète la hiérarchie du contenu, pas la taille souhaitée du texte.", "Utilisez p pour les paragraphes, strong pour une importance particulière et em pour une emphase. La mise en forme visuelle sera gérée par CSS.", "<h1>Apprendre le web</h1>\n<h2>Premiers pas</h2>\n<p>Une notion <strong>essentielle</strong>.</p>", "Écrivez un article avec un titre principal et deux sous-sections."],
    ["ul représente une liste sans ordre, ol une liste ordonnée et li chaque élément. a crée un lien grâce à son attribut href.", "Un texte de lien doit expliquer sa destination. Une ancre comme #programme rejoint un élément portant cet identifiant dans la page.", '<ul>\n  <li><a href="#programme">Programme</a></li>\n  <li><a href="index.html">Accueil</a></li>\n</ul>', "Créez une navigation qui relie deux pages et une section interne."],
    ["L’élément img affiche une image. Fournissez un texte alternatif utile pour les images porteuses de sens et un alt vide pour une décoration.", "Précisez les dimensions pour réserver l’espace. Utilisez des contrôles natifs pour les médias et proposez des sous-titres quand une vidéo est disponible.", '<img src="assets/images/hero.png"\n     alt="Une étudiante apprend sur son ordinateur"\n     width="474" height="375">', "Ajoutez une image avec un chemin correct et un texte alternatif pertinent."],
    ["Une règle CSS associe un sélecteur à des déclarations composées d’une propriété et d’une valeur. Une classe permet de réutiliser un style.", "La cascade tient compte de l’origine, de la spécificité et de l’ordre des règles. Préférez des classes simples et évitez les sélecteurs inutilement complexes.", ".course-card {\n  background: white;\n  padding: 16px;\n  border-radius: 12px;\n}", "Reliez style.css à votre page et stylisez une carte avec une classe."],
    ["Le modèle de boîte comprend contenu, padding, bordure et marge. box-sizing: border-box inclut padding et bordures dans la largeur déclarée.", "Choisissez des couleurs contrastées et une hauteur de ligne confortable. Des variables CSS regroupent les couleurs communes.", "* { box-sizing: border-box; }\n:root { --color-primary: #0062ff; }\nbody { font-family: Arial, sans-serif; line-height: 1.5; }", "Créez une carte avec un padding de 16px et une bordure visible."],
    ["Flexbox organise des éléments sur un axe, comme une navigation. Grid organise des lignes et des colonnes, comme une grille de cartes.", "Utilisez gap pour les espacements et minmax(0, 1fr) pour permettre aux colonnes de se réduire sans forcer un débordement.", ".course-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}", "Construisez une grille de trois cartes et une navigation en Flexbox."],
    ["Une page responsive adapte sa disposition à l’espace disponible. Les media queries modifient des règles selon la largeur de l’écran.", "Vérifiez la lisibilité, l’absence de défilement horizontal et l’accès au clavier. Une image doit pouvoir se réduire dans son conteneur.", "img { max-width: 100%; height: auto; }\n@media (max-width: 600px) {\n  .course-grid { grid-template-columns: 1fr; }\n}", "Testez votre grille à 375px, 768px et 1440px de largeur."],
    ["Assemblez un site comprenant une navigation, une présentation, une grille de cartes et un appel à l’action. Réutilisez les classes communes.", "Vérifiez les liens, les images, la hiérarchie des titres, le focus clavier et le rendu mobile avant de partager votre travail.", "1. Structurer le HTML\n2. Ajouter les styles communs\n3. Adapter la mise en page\n4. Vérifier et corriger", "Réalisez une page personnelle complète puis expliquez vos choix HTML et CSS."]
];

window.EduFlowData.getLessonContent = (course, lessonIndex) => {
    if (course.id === "html-css") {
        const [intro, explanation, code, exercise] = htmlLessons[lessonIndex];
        return { paragraphs: [intro, explanation], code, exercise };
    }
    const lesson = window.EduFlowData.getLessons(course)[lessonIndex];
    return {
        paragraphs: [
            `Cette fiche de découverte porte sur « ${lesson.title} », dans le module « ${lesson.module} ». Commencez par définir cette notion avec vos propres mots et identifiez son rôle dans votre projet.`,
            course.about,
            "Comparez une solution simple et une solution plus complète. Notez leurs différences, vérifiez votre résultat et gardez un exemple commenté dans votre dossier de travail."
        ],
        code: null,
        exercise: `Préparez un petit exemple autour de « ${lesson.title} ». Décrivez votre objectif, réalisez une première version, puis notez ce que vous avez appris et une amélioration possible.`
    };
};
