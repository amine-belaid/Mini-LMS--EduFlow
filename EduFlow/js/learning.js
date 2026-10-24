(() => {
    const ui = window.EduFlowUI,
     data = window.EduFlowData,
     storage = window.EduFlowStorage;
    const params = new URLSearchParams(location.search);
    const course = data.courses.find(item => item.id === (params.get('course') || 'html-css')); 
    const feedback = document.querySelector('#feedback');
    const lessons = course ? data.getLessons(course) : [];
    const saved = course ? storage.getCourseProgress(course.id, lessons.length) : null;
    const index = params.has('lesson') ? Number(params.get('lesson')) : saved?.lastLesson;

    if (!course || !Number.isInteger(index) || index < 0 || index >= lessons.length) {
        document.querySelector('.learning-layout').hidden = true;
        feedback.append(ui.element('p', '', 'Ce cours ou cette leçon est introuvable.'), ui.link('Retour au catalogue', 'courses.html', 'button button-primary')); return;
    }



    const url = number => `learning.html?course=${encodeURIComponent(course.id)}&lesson=${number}`;
    if (!storage.saveLesson(course.id, index, lessons.length).success)
         feedback.textContent = 'Le stockage est indisponible : votre progression ne pourra pas être enregistrée.';
        
    
    document.title = `${lessons[index].title} — EduFlow`;
    document.querySelector('#details-link').href = `course-details.html?id=${encodeURIComponent(course.id)}`;
    document.querySelector('#course-name').textContent = course.title;
    document.querySelector('#module-name').textContent = lessons[index].module;
    document.querySelector('#lesson-title').textContent = `${index+1}. ${lessons[index].title}`;
    const content = data.getLessonContent(course, index), body = document.querySelector('#lesson-body');
    content.paragraphs.forEach(text => body.append(ui.element('p', '', text)));
    if (content.code) { const pre = ui.element('pre'); pre.append(ui.element('code', '', content.code)); body.append(pre); }
    body.append(ui.element('h2', '', 'À vous de pratiquer'), ui.element('p', 'lesson-exercise', content.exercise));
    
    
    
    

    const complete = document.querySelector('#complete');
        
    function renderProgress() {
        const progress = storage.getCourseProgress(course.id, lessons.length);
        complete.textContent = progress.completed.includes(index) ? 'Marquer comme non terminée' : 'Marquer comme terminée';
        complete.setAttribute('aria-pressed', String(progress.completed.includes(index)));
        document.querySelector('#progress-label').textContent = `${progress.completed.length} / ${lessons.length} leçons terminées · ${progress.percent}%`;
        const bar = document.querySelector('#progress'); bar.max = lessons.length; bar.value = progress.completed.length;
        const modules = document.querySelector('#modules'); modules.replaceChildren(); let offset = 0;
        course.modules.forEach(module => {
            const start = offset, details = ui.element('details'); details.open = index >= start && index < start+module.lessons.length;
            const count = module.lessons.filter((_,i) => progress.completed.includes(start+i)).length;
            details.append(ui.element('summary', '', `${module.title} (${count}/${module.lessons.length})`));
            const list = ui.element('ol'); list.start = start+1;
            module.lessons.forEach((title,i) => {
                const number = start+i, item = ui.element('li');
                const anchor = ui.link(`${progress.completed.includes(number) ? '✓ ' : ''}${title}`, url(number));
                if (number === index) anchor.setAttribute('aria-current', 'step'); item.append(anchor); list.append(item);
            }); details.append(list); modules.append(details); offset += module.lessons.length;
        });
    }
    complete.addEventListener('click', () => {
        const previous = storage.getCourseProgress(course.id, lessons.length);
        const done = !previous.completed.includes(index);
        if (!storage.saveLesson(course.id, index, lessons.length, done).success) { feedback.textContent = 'Impossible de sauvegarder la progression dans ce navigateur.'; return; }
        renderProgress();
        feedback.textContent = storage.getCourseProgress(course.id, lessons.length).percent === 100 ? 'Bravo ! Vous avez terminé ce cours.' : done ? 'Leçon terminée. Vous pouvez passer à la suivante.' : 'Leçon marquée comme non terminée.';
    });


    ['previous','next'].forEach((id,i) => {
         const anchor = document.querySelector(`#${id}`), target = index+(i ? 1 : -1); anchor.hidden = target < 0 || target >= lessons.length;
          if (!anchor.hidden) anchor.href = url(target); });
    window.addEventListener('storage', renderProgress); renderProgress();
})();
