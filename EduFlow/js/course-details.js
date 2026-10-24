
(() => {
    const courseId = new URLSearchParams(window.location.search).get("id") || "html-css";
    const course = window.EduFlowData.courses.find(course => course.id === courseId);
    const feedback = document.querySelector("#course-feedback");

    if (!course) {
        document.title = "Cours introuvable — EduFlow";
        document.querySelector(".course-details-layout").hidden = true;
        document.querySelector('.breadcrumbs [aria-current="page"]').textContent = "Cours introuvable";
        feedback.textContent = "Ce cours est introuvable. Retrouvez les cours disponibles dans le catalogue.";
        const link = document.createElement("a");
        link.href = "courses.html";
        link.className = "button button-primary";
        link.textContent = "Voir tous les cours";
        feedback.after(link);
        return;
    }

    const lessonCount = course.modules.reduce((total, module) => total + module.lessons.length, 0);
    const setText = (selector, value) => { document.querySelector(selector).textContent = value; };
    const reviews = course.reviews.toLocaleString("fr-FR");
    document.title = `${course.title} — EduFlow`;
    document.querySelector('meta[name="description"]').content = course.description;
    setText("#course-title", course.title);
    setText('.breadcrumbs [aria-current="page"]', course.title);
    const categoryLink = document.querySelector(".breadcrumbs li:nth-child(3) a");
    categoryLink.textContent = course.category;
    categoryLink.href = "courses.html";
    setText(".course-category", course.category);
    setText(".course-description", course.description);
    const image = document.querySelector(".course-preview img");
    image.src = course.image;
    image.alt = course.imageAlt;
    image.removeAttribute("width");
    image.removeAttribute("height");
    setText(".course-preview figcaption", `Présentation du cours ${course.title}.`);

    const highlights = document.querySelectorAll(".course-highlights dd");
    [course.level, `${lessonCount} leçons`, `${course.duration} heures`, "Certificat"].forEach((value, index) => {
        highlights[index].textContent = value;
    });
    const proof = document.querySelectorAll(".course-social-proof p");
    proof[0].textContent = `★ ${course.rating} / 5 (${reviews} avis)`;
    proof[1].hidden = !course.students;
    if (course.students) proof[1].textContent = `${course.students} étudiants`;
    setText(".reviews-summary", `★ ${course.rating} / 5 · ${reviews} avis`);
    setText("#about-title + p", course.about);

    function renderList(list, items) {
        list.replaceChildren();
        items.forEach(value => {
            const item = document.createElement("li");
            item.textContent = value;
            list.append(item);
        });
    }

    const checklists = document.querySelectorAll(".course-checklist");
    renderList(checklists[0], course.objectives);
    renderList(checklists[1], course.prerequisites);
    const program = document.querySelector("#programme");
    program.querySelectorAll(".course-module").forEach(module => module.remove());
    setText(".panel-heading p", `${course.modules.length} modules · ${lessonCount} leçons · ${course.duration} heures`);
    let lessonNumber = 1;
    course.modules.forEach((module, index) => {
        const details = document.createElement("details");
        details.className = "course-module";
        details.open = index === 0;
        const summary = document.createElement("summary");
        summary.textContent = module.title;
        const count = document.createElement("span");
        count.textContent = `${module.lessons.length} ${module.lessons.length === 1 ? "leçon" : "leçons"}`;
        summary.append(count);
        const list = document.createElement("ol");
        list.className = "lesson-list";
        list.start = lessonNumber;
        renderList(list, module.lessons);
        lessonNumber += module.lessons.length;
        details.append(summary, list);
        program.append(details);
    });

    const facts = document.querySelectorAll(".course-facts dd");
    [course.category, course.level, `${course.duration} heures`, `${lessonCount} leçons`].forEach((value, index) => {
        facts[index].textContent = value;
    });
    const instructorImage = document.querySelector(".instructor-avatar");
    instructorImage.src = course.instructor.image;
    setText(".instructor-name", course.instructor.name);
    setText(".course-instructor p", course.instructor.role);
    setText(".course-details-sidebar section:last-child > p", course.instructor.bio);

    // La même progression est utilisée sur toutes les pages.
    const progress = document.querySelector("#course-progress");
    progress.max = lessonCount;
    const savedProgress = window.EduFlowStorage.getCourseProgress(course.id, lessonCount);
    progress.value = savedProgress.completed.length;
    setText(".progress-line strong", `${savedProgress.percent}%`);
    setText(".progress-description", `${savedProgress.completed.length} / ${lessonCount} leçons terminées`);
    document.querySelectorAll('a[href^="learning.html"]').forEach(link => {
        link.href = window.EduFlowUI.learningUrl(course);
    });
    document.querySelector('.course-progress .button-primary').textContent = savedProgress.enrolled ? (savedProgress.percent === 100 ? 'Revoir le cours →' : 'Continuer le cours →') : 'Commencer le cours →';
    highlights[3].textContent = 'Exercices pratiques';
    facts[facts.length - 1].textContent = 'Non délivré (démonstration)';

    const storage = window.EduFlowStorage;
    const button = document.querySelector(".favorite-button");
    button.disabled = false;
    button.dataset.courseId = course.id;

    function updateFavoriteButton() {
        const isFavorite = storage.getFavorites().includes(course.id);
        button.setAttribute("aria-pressed", String(isFavorite));
        button.setAttribute("aria-label", `${isFavorite ? "Retirer" : "Ajouter"} le cours ${course.title} ${isFavorite ? "des" : "aux"} favoris`);
        const icon = document.createElement("span");
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = isFavorite ? "♥" : "♡";
        button.replaceChildren(icon, document.createTextNode(isFavorite ? " Retirer des favoris" : " Ajouter aux favoris"));
    }

    updateFavoriteButton();
    button.addEventListener("click", () => {
        const result = storage.toggleFavorite(course.id);
        if (!result.success) {
            feedback.textContent = "Impossible d’enregistrer vos favoris : le stockage du navigateur est indisponible.";
            return;
        }
        updateFavoriteButton();
        if (result.isFavorite) storage.recordActivity('favorite', course.id);
        feedback.textContent = result.isFavorite ? "Cours ajouté aux favoris." : "Cours retiré des favoris.";
    });
    window.addEventListener("storage", event => {
        if (event.key === storage.favoritesKey || event.key === null) updateFavoriteButton();
    });
})();
