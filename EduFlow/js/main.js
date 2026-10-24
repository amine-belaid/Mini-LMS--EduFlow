/* Navigation et petites interactions communes aux cinq pages. */
(() => {
    const button = document.querySelector(".notification-button");
    if (button) {
        button.disabled = false;
        const panel = document.createElement("div");
        panel.className = "notifications-panel"; panel.id = "notifications-panel"; panel.hidden = true;
        const heading = document.createElement("h2"); heading.textContent = "Notifications";
        const text = document.createElement("p"); text.textContent = "Aucune notification pour le moment.";
        panel.append(heading, text); button.parentElement.append(panel);
        button.setAttribute("aria-expanded", "false"); button.setAttribute("aria-controls", panel.id);
        function close() { panel.hidden = true; button.setAttribute("aria-expanded", "false"); }
        button.addEventListener("click", () => { panel.hidden = !panel.hidden; button.setAttribute("aria-expanded", String(!panel.hidden)); });
        document.addEventListener("click", event => { if (!panel.contains(event.target) && !button.contains(event.target)) close(); });
        document.addEventListener("keydown", event => { if (event.key === "Escape" && !panel.hidden) { close(); button.focus(); } });
    }
    if (!document.querySelector(".hero")) return;
    const grid = document.querySelector(".course-grid");
    const feedback = document.querySelector(".favorites-feedback");
    const refresh = () => window.EduFlowUI.renderCards(grid, window.EduFlowData.courses.slice(0, 4), { showProgress: false, feedback });
    refresh();
    // On rafraîchit la liste des cours favoris si elle change dans un autre onglet.
    window.addEventListener("storage", refresh);
})();
