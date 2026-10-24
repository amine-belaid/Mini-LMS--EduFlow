(() => {
    const ui = window.EduFlowUI,
     storage = window.EduFlowStorage,
      data = window.EduFlowData;
    const feedback = document.querySelector('#feedback'),
     view = document.querySelector('#view'), 
     goal = document.querySelector('#goal');
    try {
    const saved = Number(localStorage.getItem('eduflow.goal'));
     if (Number.isInteger(saved) && saved >= 1 && saved <= 50) goal.value = saved; } catch {}
    function render() {

        const courses = data.courses.map(course => ({course, count: data.getLessons(course).length, progress: storage.getCourseProgress(course.id, data.getLessons(course).length)}));
        const enrolled = courses.filter(item => item.progress.enrolled);
        const completed = enrolled.filter(item => item.progress.percent === 100).length;
        const started = enrolled.filter(item => item.progress.percent > 0 && item.progress.percent < 100).length;


        document.querySelector('#stats')
        .replaceChildren(...[[enrolled.length,'Cours inscrits'],[completed,'Cours terminés'],[started,'Cours en cours'],[enrolled.length-completed-started,'Non commencés']]
        .map(([number,label]) => { const stat = ui.element('div'); stat.append(ui.element('strong','',number),ui.element('span','',label)); return stat; }));
        const list = courses.filter(item => view.value === 'favorites'
             ? storage.getFavorites().includes(item.course.id) 
             : item.progress.enrolled && (view.value !== 'completed' || item.progress.percent === 100)).map(item => item.course);
        const container = document.querySelector('#my-courses');
        if (list.length)
             ui.renderCards(container, list, {feedback}); 
        else {
             ui.renderEmpty(container, view.value === 'favorites' ? 'Vous n’avez pas encore de favoris.' : view.value === 'completed' ? 'Aucun cours terminé pour le moment.' : 'Commencez un cours pour retrouver votre progression ici.');
              container.append(ui.link('Explorer les cours →','courses.html','button button-primary'));
             }
        const total = enrolled.reduce((sum,item) => sum+item.count,0),
        done = enrolled.reduce((sum,item) => sum+item.progress.completed.length,0), percent = total ? Math.round(done/total*100) : 0;
        document.querySelector('#global-percent').textContent = `${percent}%`;
        document.querySelector('#global-progress').style.setProperty('--progress', `${percent}%`);
        document.querySelector('#global-description').textContent = `${done} / ${total} leçons terminées dans vos cours inscrits.`;
        
        const target = Number(goal.value);
        const bar = document.querySelector('#goal-progress');
        bar.max = target; bar.value = Math.min(completed,target);
        document.querySelector('#goal-label').textContent = `${completed} / ${target} cours terminés`;
        
        
        const activities = document.querySelector('#activities');
        activities.replaceChildren();
        storage.getActivities().forEach(activity => {
            const course = data.courses.find(item => item.id === activity.courseId); if (!course) return;
            const lesson = data.getLessons(course)[activity.lessonIndex];
            const text = activity.type === 'completed' ? `Leçon terminée : ${lesson?.title || course.title}` : activity.type === 'favorite' ? `Ajout aux favoris : ${course.title}` : `Cours commencé : ${course.title}`;
            const item = ui.element('li'); item.append(ui.link(text,ui.learningUrl(course)),ui.element('time','',new Date(activity.date).toLocaleString('fr-FR'))); activities.append(item);
        });
        if (!activities.children.length) activities.append(ui.element('li','','Vos prochaines activités apparaîtront ici.'));
    }
    document.querySelector('#goal-form').addEventListener('submit', event => { event.preventDefault(); if (!goal.checkValidity()) return; try { localStorage.setItem('eduflow.goal',goal.value); feedback.textContent = 'Objectif enregistré.'; } catch { feedback.textContent = 'Impossible d’enregistrer cet objectif dans le navigateur.'; } render(); });
    view.addEventListener('change',render); document.addEventListener('eduflow:favorites',render); window.addEventListener('storage',render); render();

})();
