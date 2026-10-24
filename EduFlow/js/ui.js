
window.EduFlowUI = (() => {
    const { courses, getLessons } = window.EduFlowData;
    const storage = window.EduFlowStorage;
    
    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }
    function link(label, href, className = "") {
        const node = element("a", className, label); node.href = href; return node;
    }
    function learningUrl(course) {
        const progress = storage.getCourseProgress(course.id, getLessons(course).length);
        return `learning.html?course=${encodeURIComponent(course.id)}&lesson=${progress.lastLesson}`;
    }




    function favoriteButton(course, feedback) {
        const button = element("button", "favorite-button"); button.type = "button";
        button.dataset.courseId = course.id;
        const refresh = () => {
            const saved = storage.getFavorites().includes(course.id);
            button.textContent = saved ? "♥" : "♡";
            button.setAttribute("aria-pressed", String(saved));
            button.setAttribute("aria-label", `${saved ? "Retirer" : "Ajouter"} ${course.title} ${saved ? "des" : "aux"} favoris`);
        };
        refresh();
        button.addEventListener("click", () => {
            const result = storage.toggleFavorite(course.id);
            if (!result.success) { if (feedback) feedback.textContent = "Le navigateur ne permet pas d’enregistrer les favoris."; return; }
            if (result.isFavorite) storage.recordActivity("favorite", course.id);
            refresh();
            if (feedback) feedback.textContent = result.isFavorite ? "Cours ajouté aux favoris." : "Cours retiré des favoris.";
            document.dispatchEvent(new CustomEvent("eduflow:favorites"));
        });
        return button;
    }



    function courseCard(course, { showProgress = true, feedback = null } = {}) {
        const card = element("article", "course-card");
        const media = element("div", "course-card-media");
        const image = element("img", "course-card-image");
        image.src = course.id === "html-css" ? "assets/images/courses/html.png" : course.image;
        image.alt = course.imageAlt; image.width = 302; image.height = 106; image.loading = "lazy";
        
        
        media.append(image, favoriteButton(course, feedback));
        const body = element("div", "course-card-content");
        body.append(element("p", "course-category", course.category), element("h3", "", course.title));
        const meta = element("ul", "course-meta");
        const count = getLessons(course).length;
        [`${count} leçons`, `${course.duration} heures`, course.level].forEach(value => meta.append(element("li", "", value)));
        body.append(meta);

        const progress = storage.getCourseProgress(course.id, count);
        if (showProgress) {
            const bar = element("progress", "card-progress"); bar.max = count; bar.value = progress.completed.length;
            bar.setAttribute("aria-label", `Progression dans ${course.title}`);
            body.append(bar, element("p", "card-progress-label", `${progress.percent}% terminé`));
        }
        const teacher = element("div", "course-instructor");
        const avatar = element("img", "instructor-avatar"); avatar.src = course.instructor.image; avatar.alt = ""; avatar.width = 38; avatar.height = 38;
        const identity = element("div"); identity.append(element("p", "instructor-name", course.instructor.name), element("p", "course-rating", `★ ${course.rating} (${course.reviews.toLocaleString("fr-FR")})`));
        teacher.append(avatar, identity); body.append(teacher);
        const actions = element("div", "card-actions");
        if (showProgress) actions.append(link(progress.enrolled ? (progress.percent === 100 ? "Revoir le cours" : "Continuer") : "Commencer le cours", learningUrl(course), "button button-primary"));
        actions.append(link(showProgress ? "Voir les détails →" : "Voir le cours →", `course-details.html?id=${encodeURIComponent(course.id)}`, "button button-outline"));
        body.append(actions); card.append(media, body); return card;
    }
    function renderCards(container, list, options) {
        container.replaceChildren(...list.map(course => courseCard(course, options)));
    }
    function renderEmpty(container, text) {
        container.replaceChildren(element("p", "empty-state", text));
    }
    return { element, link, learningUrl, courseCard, renderCards, renderEmpty, courses };
})();
