(() => {
    const ui = window.EduFlowUI;
    const form = document.querySelector('#filters');
    const query = document.querySelector('#query');
    const category = document.querySelector('#category');
    const level = document.querySelector('#level');
    const duration = document.querySelector('#duration');
    const favorites = document.querySelector('#favorites-only');
    const sort = document.querySelector('#sort');
    const params = new URLSearchParams(location.search);
    query.value = params.get('q') || '';
    [...new Set(ui.courses.map(course => course.category))].forEach(value => {
        const option = ui.element('option', '', value); option.value = value; category.append(option);
    });
    category.value = params.get('category') === 'web' ? 'Développement Web' : (params.get('category') || '');
    
    
    
    
    
    function render() {
        const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const search = normalize(query.value.trim());
        const saved = window.EduFlowStorage.getFavorites();
        const list = ui.courses.filter(course => normalize(`${course.title} ${course.category} ${course.description}`).includes(search)
            && (!category.value || course.category === category.value)
            && (!level.value || course.level === level.value)
            && (!duration.value || (duration.value === 'short' ? course.duration < 4 : course.duration >= 4))
            && (!favorites.checked || saved.includes(course.id)));
        list.sort(sort.value === 'title' ? (a,b) => a.title.localeCompare(b.title, 'fr') : sort.value === 'duration' ? (a,b) => a.duration-b.duration : (a,b) => b.reviews-a.reviews);
        document.querySelector('#result-count').textContent = `${list.length} cours disponible${list.length > 1 ? 's' : ''}`;
        const container = document.querySelector('#results');
        if (list.length)
             ui.renderCards(container, list, { feedback: document.querySelector('#feedback') });
        else
             ui.renderEmpty(container, 'Aucun cours ne correspond à vos critères. Modifiez les filtres.');
    }




    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('input', render); sort.addEventListener('change', render);
    form.addEventListener('reset', () => setTimeout(render, 0));
    document.addEventListener('eduflow:favorites', () => { if (favorites.checked) render(); });
    window.addEventListener('storage', render); render();
})();
