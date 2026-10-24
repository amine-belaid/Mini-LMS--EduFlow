
window.EduFlowStorage = (() => {
    const favoritesKey = "eduflow.favorites";

    function getFavorites() {
        try {
            const savedFavorites = JSON.parse(localStorage.getItem(favoritesKey) || "[]");

            if (!Array.isArray(savedFavorites)) {
                return [];
            }

            return [...new Set(savedFavorites.filter(id => typeof id === "string" && id.trim() !== ""))];
        } catch {
            return [];
        }
    }

    function toggleFavorite(courseId) {
        const favorites = getFavorites();
        const isFavorite = !favorites.includes(courseId);
        const updatedFavorites = isFavorite
            ? [...favorites, courseId]
            : favorites.filter(id => id !== courseId);

        try {
            localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
            return { success: true, isFavorite };
        } catch {
            return { success: false };
        }
    }




    const progressKey = "eduflow.progress";
    const activitiesKey = "eduflow.activities";

    function readValue(key, fallback) {
        try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
        catch { return fallback; }
    } // Lire une valeur JSON depuis le stockage local, ou retourner une valeur par défaut si la lecture échoue.


    function validCourseId(courseId) {
        return typeof courseId === "string" && /^[a-z0-9-]+$/.test(courseId)
            && !["constructor", "prototype"].includes(courseId);
    }

    function getProgress() {
        const saved = readValue(progressKey, {});
        const progress = {};
        if (!saved || typeof saved !== "object" || Array.isArray(saved)) return progress;
        Object.entries(saved).forEach(([id, value]) => {
            if (!validCourseId(id) || !value || typeof value !== "object") return;
            progress[id] = {
                completed: Array.isArray(value.completed)
                    ? [...new Set(value.completed.filter(n => Number.isInteger(n) && n >= 0))] : [],
                lastLesson: Number.isInteger(value.lastLesson) && value.lastLesson >= 0 ? value.lastLesson : 0,
                enrolledAt: typeof value.enrolledAt === "string" ? value.enrolledAt : "",
                updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : ""
            };
        });
        return progress;
    }// Lire la progression de tous les cours depuis le stockage local, en filtrant les valeurs invalides.

    function getCourseProgress(courseId, lessonCount) {
        const saved = getProgress()[courseId];
        const completed = saved ? saved.completed.filter(n => n < lessonCount) : [];
        return {
            enrolled: Boolean(saved),
            completed,
            lastLesson: saved && saved.lastLesson < lessonCount ? saved.lastLesson : 0,
            percent: lessonCount ? Math.round(completed.length / lessonCount * 100) : 0
        };
    }// Lire la progression d'un cours spécifique depuis le stockage local, en filtrant les valeurs invalides.

    function getActivities() {
        const saved = readValue(activitiesKey, []);
        return Array.isArray(saved) ? saved.filter(a => a && validCourseId(a.courseId)
            && ["enrolled", "completed", "favorite"].includes(a.type)
            && typeof a.date === "string" && !Number.isNaN(Date.parse(a.date))).slice(0, 20) : [];
    }// Lire les 20 dernières activités depuis le stockage local, en filtrant les valeurs invalides.

    function recordActivity(type, courseId, lessonIndex = null) {
        try {
            const activities = [{ type, courseId, lessonIndex, date: new Date().toISOString() }, ...getActivities()].slice(0, 20);
            localStorage.setItem(activitiesKey, JSON.stringify(activities));
        } catch { /* La progression reste sauvegardée même si l'historique ne peut pas l'être. */ }
    } // Enregistrer une activité dans l'historique, en conservant les 20 dernières activités. Ne pas échouer si l'écriture échoue.

    function saveLesson(courseId, lessonIndex, lessonCount, completed) {
        if (!validCourseId(courseId) || !Number.isInteger(lessonIndex) || lessonIndex < 0 || lessonIndex >= lessonCount) {
            return { success: false };
        }
        const progress = getProgress();
        const previous = getCourseProgress(courseId, lessonCount);
        const finished = new Set(previous.completed);
        if (completed === true) finished.add(lessonIndex);
        if (completed === false) finished.delete(lessonIndex);
        const now = new Date().toISOString();
        progress[courseId] = {
            completed: [...finished].sort((a, b) => a - b), lastLesson: lessonIndex,
            enrolledAt: progress[courseId]?.enrolledAt || now, updatedAt: now
        };
        try { localStorage.setItem(progressKey, JSON.stringify(progress)); }
        catch { return { success: false }; }
        if (!previous.enrolled) recordActivity("enrolled", courseId);
        if (completed === true && !previous.completed.includes(lessonIndex)) recordActivity("completed", courseId, lessonIndex);
        return { success: true };
    }// Enregistrer la progression d'une leçon dans le stockage local, en filtrant les valeurs invalides. Retourne un objet indiquant si l'enregistrement a réussi.

    return { favoritesKey, progressKey, activitiesKey, getFavorites, toggleFavorite,
        getProgress, getCourseProgress, saveLesson, getActivities, recordActivity };
})();// Fournit des fonctions pour gérer les favoris, la progression et l'historique des activités dans le stockage local.
