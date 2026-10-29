(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function notFound() {
    $('title').textContent = 'Projet introuvable';
    $('description').innerHTML = 'Ce projet n\'existe pas. <a href="index.html#projets">Voir tous les projets</a>.';
  }

  async function init() {
    $('year').textContent = new Date().getFullYear();
    const id = new URLSearchParams(location.search).get('id');
    if (!id || !/^[a-z0-9_-]+$/i.test(id)) return notFound();

    const res = await fetch('assets/projects/' + id + '/project-info.json');
    if (!res.ok) return notFound();
    const p = await res.json();
    const base = 'assets/projects/' + id + '/';

    document.title = p.title + ' - Junior Brindou';
    $('title').textContent = p.title;
    $('client').textContent = p.client || '-';
    $('date').textContent = p.date || '-';
    $('description').textContent = p.fullDescription || p.description || '';

    const url = $('url');
    if (p.url && p.url !== '#') {
      url.href = p.url;
      url.textContent = p.urlLabel || p.url.replace('https://', '');
    } else {
      url.replaceWith(document.createTextNode('Non public'));
    }

    if (p.techStack && p.techStack.length) {
      $('stack').innerHTML = p.techStack.map((t) => '<li>' + esc(t.name) + '</li>').join('');
      $('stack-box').hidden = false;
    }
    if (p.benefits && p.benefits.length) {
      $('benefits').innerHTML = p.benefits.map((b) => '<li><h3>' + esc(b.title) + '</h3><p>' + esc(b.description) + '</p></li>').join('');
      $('benefits-box').hidden = false;
    }
    const shots = p.gallery || [];
    if (shots.length) {
      $('gallery').innerHTML = shots.map((s, i) =>
        '<a href="' + base + esc(s) + '" target="_blank" rel="noopener"><img src="' + base + esc(s)
        + '" alt="Capture ' + (i + 1) + ' de ' + esc(p.title) + '" loading="lazy" width="1600" height="900"></a>').join('');
      $('gallery-box').hidden = false;
    }
  }

  init().catch(notFound);
})();
