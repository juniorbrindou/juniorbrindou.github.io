(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const PROJECT_ORDER = ['eclat', 'lamaisondessophos', 'gestock'];

  function renderProjects(list) {
    $('#projects').innerHTML = list.map((p) => {
      const base = 'assets/projects/' + p.id + '/';
      const stack = (p.techStack || []).map((t) => esc(t.name)).join(', ');
      const live = p.url && p.url !== '#'
        ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.urlLabel || 'Voir le site') + '</a>' : '';
      return '<article class="project">'
        + '<a class="shot" href="portfolio-details.html?id=' + p.id + '" aria-label="Détails du projet ' + esc(p.title) + '">'
        + '<img src="' + base + esc(p.thumbnail) + '" alt="Capture de ' + esc(p.title) + '" loading="lazy" width="1600" height="900"></a>'
        + '<div class="info"><h3>' + esc(p.title) + '</h3>'
        + '<p class="when">' + esc(p.date || '') + (p.client && p.client !== p.title ? ' · ' + esc(p.client) : '') + '</p>'
        + '<p>' + esc(p.description) + '</p>'
        + (stack ? '<p class="stack">' + stack + '</p>' : '')
        + '<div class="links">' + live + '<a href="portfolio-details.html?id=' + p.id + '">Voir le détail</a></div></div>'
        + '</article>';
    }).join('');
  }

  function renderExperience(items) {
    $('#experience').innerHTML = items.map((x) =>
      '<li><p class="when">' + esc(x.period) + '</p><div><h3>' + esc(x.title) + '</h3>'
      + '<p class="who">' + esc(x.company) + '</p>'
      + (x.tasks ? '<ul class="tasks">' + x.tasks.map((t) => '<li>' + esc(t) + '</li>').join('') + '</ul>' : '')
      + '</div></li>').join('');
  }

  function renderEducation(items) {
    $('#education').innerHTML = items.map((x) =>
      '<li><p class="when">' + esc(x.year) + '</p><div><h3>' + esc(x.degree) + '</h3>'
      + '<p class="who">' + esc(x.school) + '</p></div></li>').join('');
  }

  function renderSkills(cats) {
    $('#skills').innerHTML = cats.map((c) =>
      '<div><h3>' + esc(c.name) + '</h3><ul>'
      + c.items.map((i) => '<li><span>' + esc(i.name) + '</span><span>' + esc(i.level) + '</span></li>').join('')
      + '</ul></div>').join('');
  }

  function renderServices(items) {
    $('#services').innerHTML = items.map((s) =>
      '<li><h3>' + esc(s.title) + '</h3><p>' + s.features.map(esc).join(', ') + '</p></li>').join('');
  }

  function initTemplates(templates) {
    const type = $('#messageType'), subject = $('#subject'), message = $('#message');
    if (!type || !templates) return;
    type.addEventListener('change', () => {
      const t = templates[type.value];
      subject.value = t ? t.subject : '';
      message.value = t ? t.message : '';
    });
  }

  async function getJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(url);
    return r.json();
  }

  async function init() {
    document.getElementById('year').textContent = new Date().getFullYear();
    if (location.search.indexOf('message=success') !== -1) $('#sent').classList.add('show');

    const [data, ids] = await Promise.all([getJSON('assets/data/content.json'), getJSON('assets/projects/projects.json')]);
    const years = new Date().getFullYear() - new Date(data.config.careerStartDate).getFullYear();
    document.querySelectorAll('[data-years]').forEach((el) => { el.textContent = years; });

    renderExperience(data.resume.experience);
    renderEducation(data.resume.education);
    renderSkills(data.skills.categories);
    renderServices(data.services.items);
    initTemplates(data.contact.templates);

    const order = PROJECT_ORDER.filter((id) => ids.indexOf(id) !== -1).concat(ids.filter((id) => PROJECT_ORDER.indexOf(id) === -1));
    const projects = (await Promise.all(order.map((id) =>
      getJSON('assets/projects/' + id + '/project-info.json').then((p) => Object.assign(p, { id }), () => null)))).filter(Boolean);
    renderProjects(projects);
  }

  init().catch((e) => console.error(e));
})();
