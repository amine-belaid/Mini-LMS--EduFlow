# EduFlow

Mini LMS développé en **HTML5, CSS3 et JavaScript Vanilla**, sans backend.

## Démarrer

Ouvrir le dossier dans VS Code et lancer `index.html` avec **Live Server**. Utiliser la même adresse et le même port pour toutes les pages : localStorage appartient à l’origine du site. L’ouverture directe par `file://` peut donner un stockage différent selon le navigateur.

## Pages

- `index.html` : accueil et cours populaires.
- `courses.html` : recherche, catégories, niveaux, durée, favoris et tri.
- `course-details.html?id=html-css` : présentation et programme du cours.
- `learning.html?course=html-css&lesson=0` : lecture, exercices, navigation et validation des leçons.
- `dashboard.html` : cours inscrits, favoris, statistiques, activités et objectif personnel.

## Organisation

`js/data.js` centralise les huit cours et leurs identifiants. `js/storage.js` conserve les favoris, les leçons terminées et les activités. `js/ui.js` partage les cartes et les liens de reprise entre les pages. `js/main.js` gère l’en-tête et les cours populaires. Chaque page dispose de son CSS et de son script spécifique ; `css/style.css`, `css/app.css` et `css/responsive.css` complètent les styles partagés.

Les données sont stockées sous `eduflow.favorites`, `eduflow.progress`, `eduflow.activities` et `eduflow.goal`. Aucun compte utilisateur ni synchronisation entre appareils. Les cours sont inscrits à leur ouverture ; une leçon est terminée uniquement lorsque le bouton de validation est utilisé. La progression globale correspond aux leçons terminées divisées par le total des leçons des cours inscrits.

## Contenu de démonstration

Les visuels, formateurs et évaluations reprennent les maquettes. Les douze leçons HTML/CSS comportent une fiche et un exercice ; les autres cours proposent des fiches de découverte à enrichir. Aucune vidéo, authentification, discussion ou délivrance de certificat n’est intégrée.

## Travail avec GitHub Desktop

Avant de fusionner avec le catalogue du binôme, comparer `courses.html`, `css/courses.css`, `js/courses.js` et les fichiers partagés. Conserver les identifiants des cours pour préserver les favoris et la progression. Vérifier les changements dans GitHub Desktop, saisir un résumé de commit puis publier la branche lorsque vous êtes prêts.

## Vérifications

Exécuter `node tests/storage.cjs` pour vérifier la sauvegarde, la reprise, la validation des entrées et les erreurs de stockage. Les interactions des cinq pages ont aussi été vérifiées avec `tests/interfaces.cjs` (dépendance de test facultative : jsdom).

Vérifier ensuite les cinq pages dans le navigateur, au clavier et aux largeurs mobile, tablette et ordinateur.
