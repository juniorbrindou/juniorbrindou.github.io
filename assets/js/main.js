(function() {
  "use strict";

  /**
   * Page Loader
   */
  window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('loaded');
        setTimeout(() => {
          loader.remove();
        }, 500);
      }, 2000); 
    }
  });

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  function initTyped(strings) {
    const typed = select('.typed')
    if (typed && strings) {
      new Typed('.typed', {
        strings: strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }

  const counters = select('.counter', true);
  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; 
    const step = target / (duration / 16); 
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const formattedNumber = Math.floor(current).toLocaleString();
      counter.textContent = formattedNumber;
    }, 16);
  }
  
  function initCounters() {
    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible && !counter.classList.contains('animated')) {
        counter.classList.add('animated');
        animateCounter(counter);
      }
    });
  }
  
  window.addEventListener('scroll', initCounters);
  window.addEventListener('load', initCounters);

  function renderNavigation(data, currentPage) {
    const navWrapper = document.getElementById('nav-wrapper');
    if (!navWrapper) return;

    const nav = data.header.nav;
    const info = data.contact.info;
    const isDetails = currentPage.includes('portfolio-details.html');
    const pathPrefix = isDetails ? 'index.html' : '';

    navWrapper.innerHTML = `
      <!-- ======= Top Contact Bar ======= -->
      <div id="top-contact" class="top-contact d-flex align-items-center">
        <div class="container d-flex justify-content-center justify-content-md-between">
          <div class="contact-info d-flex align-items-center">
            <div class="info-item">
              <i class="bi bi-envelope"></i>
              <a href="mailto:${info.email}">${info.email}</a>
            </div>
            <div class="info-item ms-4 d-none d-sm-flex">
              <i class="bi bi-phone"></i>
              <span>${info.phone}</span>
            </div>
            <div class="info-item ms-4 d-none d-md-flex">
              <i class="bi bi-geo-alt"></i>
              <span>${info.address}</span>
            </div>
          </div>
          <div class="top-social d-none d-md-flex align-items-center">
            <a href="https://github.com/juniorbrindou" target="_blank"><i class="bx bxl-github"></i></a>
            <a href="https://www.linkedin.com/in/juniorbrindou/" target="_blank"><i class="bx bxl-linkedin"></i></a>
          </div>
        </div>
      </div>

      <!-- ======= Mobile nav toggle button ======= -->
      <i class="bi bi-list mobile-nav-toggle d-xl-none"></i>

      <!-- ======= Theme Toggle Button ======= -->
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark/light mode">
        <i class="bi ${localStorage.getItem('theme') === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill'}" id="theme-icon"></i>
      </button>

      <!-- ======= Header ======= -->
      <header id="header">
        <div class="d-flex flex-column h-100">
          <div class="profile">
            <a href="${pathPrefix}#hero" class="profile-logo">
              <img src="assets/img/logo-jb-new.png" alt="JB Logo" class="logo-img">
            </a>
            <img src="assets/img/junior.png" alt="${data.header.name}" class="img-fluid profile-photo">
            <h1 class="text-light"><a href="${pathPrefix}#hero">${data.header.name}</a></h1>
            <div class="social-links">
              <a href="https://github.com/juniorbrindou" target="_blank" title="GitHub"><i class="bx bxl-github"></i></a>
              <a href="https://www.linkedin.com/in/juniorbrindou/" target="_blank" title="LinkedIn"><i class="bx bxl-linkedin"></i></a>
              <a href="https://twitter.com/juniorbrindou" target="_blank" title="Twitter"><i class="bx bxl-twitter"></i></a>
              <a href="mailto:${info.email}" title="Email"><i class="bx bx-envelope"></i></a>
            </div>
            <span class="status-badge">${data.header.status}</span>
          </div>

          <nav id="navbar" class="nav-menu navbar">
            <ul>
              <li><a href="${pathPrefix}#hero" class="nav-link scrollto ${isDetails ? '' : 'active'}"><i class="bx bx-home"></i> <span>${nav.home}</span></a></li>
              <li><a href="${pathPrefix}#about" class="nav-link scrollto"><i class="bx bx-user"></i> <span>${nav.about}</span></a></li>
              <li><a href="${pathPrefix}#skills" class="nav-link scrollto"><i class="bx bx-list-check"></i> <span>${nav.skills}</span></a></li>
              <li><a href="${pathPrefix}#resume" class="nav-link scrollto"><i class="bx bx-file-blank"></i> <span>${nav.resume}</span></a></li>
              <li><a href="${pathPrefix}#portfolio" class="nav-link scrollto ${isDetails ? 'active' : ''}"><i class="bx bx-book-content"></i> <span>${nav.portfolio}</span></a></li>
              <li><a href="${pathPrefix}#services" class="nav-link scrollto"><i class="bx bx-server"></i> <span>${nav.services}</span></a></li>
              <li><a href="${pathPrefix}#contact" class="nav-link scrollto"><i class="bx bx-envelope"></i> <span>${nav.contact}</span></a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;

    // Re-bind navbar links after injection
    navbarlinks = select('#navbar .scrollto', true);
    
    // Re-bind theme toggle click since it was replaced
    const newToggle = select('#theme-toggle');
    if (newToggle) {
        newToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            const icon = select('#theme-icon');
            if (icon) icon.className = newTheme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        });
    }

    // Re-bind mobile toggle
    on('click', '.mobile-nav-toggle', function(e) {
        select('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    });
  }

  // Updated Theme logic - move common parts to renderNavigation
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // --- Dynamic Loading Functions ---

  function renderSkills(categories) {
    const container = document.querySelector('[data-list="skills.categories"]');
    if (!container || !categories) return;
    
    container.innerHTML = categories.map((cat, idx) => `
      <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${idx * 100}">
        <div class="skill-card">
          <div class="skill-card-header">
            <div class="skill-icon ${cat.name.toLowerCase().includes('backend') ? 'backend' : cat.name.toLowerCase().includes('frontend') ? 'frontend' : 'devops'}">
              <i class="bi ${cat.name.toLowerCase().includes('backend') ? 'bi-server' : cat.name.toLowerCase().includes('frontend') ? 'bi-palette' : 'bi-gear'}"></i>
            </div>
            <h3>${cat.name}</h3>
          </div>
          <div class="skill-card-body">
            ${cat.items.map(skill => {
              const levelInt = parseInt(skill.level) || 0;
              const levelClass = levelInt >= 90 ? 'expert' : levelInt >= 80 ? 'pro' : '';
              return `
              <div class="skill-tag ${levelClass}">
                <i class="bi bi-patch-check-fill"></i>
                <span>${skill.name}</span>
                ${levelInt >= 90 ? '<span class="level-dot"></span>' : ''}
              </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderResume(items, type) {
    const container = document.querySelector(`[data-list="resume.${type}"]`);
    if (!container || !items) return;

    if (type === 'education') {
      container.innerHTML = `<div class="resume-item">${items.map(item => `
        <div class="mb-4">
          <h4>${item.degree}</h4>
          <h5>${item.year}</h5>
          <p><em>${item.school}</em></p>
          ${item.desc ? `<p>${item.desc}</p>` : ''}
        </div>`).join('')}</div>`;
    } else {
      container.innerHTML = items.map(item => `
        <div class="resume-item">
          <h4>${item.title}</h4>
          <h5>${item.period}</h5>
          <p><em>${item.company}</em></p>
          ${item.desc ? `<p>${item.desc}</p>` : ''}
          ${item.tasks ? `<ul>${item.tasks.map(task => `<li>${task}</li>`).join('')}</ul>` : ''}
        </div>`).join('');
    }
  }

  function renderServices(items) {
    const container = document.querySelector('[data-list="services.items"]');
    if (!container || !items) return;
    const icons = ['bi-laptop', 'bi-phone', 'bi-code-square', 'bi-cart3', 'bi-gear', 'bi-graph-up'];
    container.innerHTML = items.map((item, idx) => `
      <div class="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="${idx * 100}">
        <div class="icon-box h-100">
          <div class="icon"><i class="bi ${icons[idx] || 'bi-briefcase'}"></i><div class="icon-bg"></div></div>
          <h4 class="title">${item.title}</h4>
          <div class="description"><ul>${item.features.map(f => `<li>${f}</li>`).join('')}</ul></div>
        </div>
      </div>`).join('');
  }

  function renderPortfolio(portfolio) {
    const itemsContainer = document.querySelector('[data-list="portfolio.items"]');
    const filterContainer = document.querySelector('[data-list="portfolio.filters"]');
    
    if (filterContainer && portfolio.filters) {
      filterContainer.innerHTML = portfolio.filters.map(f => `
        <li data-filter="${f.id}" class="${f.id === '*' ? 'filter-active' : ''}">${f.label}</li>`).join('');
    }

    if (itemsContainer && portfolio.items) {
      itemsContainer.innerHTML = portfolio.items.map((item, idx) => {
        const gallery = item.gallery || [item.img];
        const extraImages = gallery.slice(1).map(img => 
          `<a href="${img}" data-gallery="gallery-${idx}" class="portfolio-lightbox" title="${item.title}"></a>`
        ).join('');

        return `
        <div class="col-lg-4 col-md-6 portfolio-item ${item.category}">
          <div class="portfolio-wrap">
            <div class="portfolio-img-container">
              <img src="${item.img}" class="img-fluid" alt="${item.title}">
              <div class="portfolio-links">
                <a href="${item.img}" data-gallery="gallery-${idx}" class="portfolio-lightbox" title="${item.title}"><i class="bx bx-plus"></i></a>
                <div style="display:none">${extraImages}</div>
                <a href="portfolio-details.html?id=${idx}" title="Plus de détails"><i class="bx bx-link"></i></a>
              </div>
            </div>
            <div class="portfolio-info-bottom"><h4>${item.title}</h4><p>${item.description || ''}</p></div>
          </div>
        </div>`;
      }).join('');
    }
  }

  function initPortfolioIsotope() {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, { itemSelector: '.portfolio-item' });
      let portfolioFilters = select('#portfolio-flters li', true);
      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');
        portfolioIsotope.arrange({ filter: this.getAttribute('data-filter') });
        portfolioIsotope.on('arrangeComplete', () => AOS.refresh());
      }, true);
    }
  }

  async function loadProjectDetails(data) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const project = (data.portfolio && data.portfolio.items) ? data.portfolio.items[id] : null;

    if (!project) {
        const descEl = document.getElementById('project-description');
        if (descEl) descEl.innerHTML = "Projet introuvable.";
        return;
    }

    const setE = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setE('project-full-title', project.title);
    setE('project-breadcrumb-title', project.title);
    setE('project-category', project.category.replace('filter-', '').toUpperCase());
    setE('project-client', project.client || "---");
    setE('project-date', project.date || "---");
    setE('project-description', project.description);
    
    const urlLink = document.getElementById('project-url');
    if (urlLink) {
        urlLink.textContent = project.url && project.url !== '#' ? project.url.replace('https://', '') : "N/A";
        urlLink.href = project.url || "#";
    }

    const galleryContainer = document.getElementById('project-gallery-container');
    if (galleryContainer) {
        const images = project.gallery || [project.img];
        galleryContainer.innerHTML = images.map(img => `<div class="swiper-slide"><img src="${img}" alt="${project.title}"></div>`).join('');
        new Swiper('.portfolio-details-slider', {
          speed: 400, loop: true, autoplay: { delay: 5000, disableOnInteraction: false },
          pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
        });
    }
  }

  async function loadContent() {
    try {
      const response = await fetch('assets/data/content.json');
      if (!response.ok) return;
      const data = await response.json();

      const startDate = new Date(data.config.careerStartDate || "2020-03-01");
      const expYears = Math.abs(new Date(Date.now() - startDate.getTime()).getUTCFullYear() - 1970);

      document.title = data.meta.title.replace('{exp}', expYears);
      const metaKeys = ['description', 'keywords', 'og:title', 'og:description', 'twitter:title', 'twitter:description'];
      metaKeys.forEach(key => {
          const meta = document.querySelector(`meta[name="${key}"], meta[property="${key}"]`);
          if (meta && data.meta[key]) meta.setAttribute('content', data.meta[key].replace('{exp}', expYears));
      });

      // Render Reusable Navigation
      renderNavigation(data, window.location.pathname);

      const currentYear = new Date().getFullYear();
      document.querySelectorAll('[data-content]').forEach(el => {
        const key = el.getAttribute('data-content');
        const value = key.split('.').reduce((obj, i) => obj ? obj[i] : null, data);
        if (value && typeof value === 'string') {
            el.innerHTML = value.replace(new RegExp('{year}', 'g'), currentYear).replace(new RegExp('{exp}', 'g'), expYears);
        }
      });

      if (window.location.pathname.includes('portfolio-details.html')) {
        loadProjectDetails(data);
      } else {
        renderSkills(data.skills.categories);
        renderResume(data.resume.education, 'education');
        renderResume(data.resume.experience, 'experience');
        renderServices(data.services.items);
        renderPortfolio(data.portfolio);

        if (data.stats && data.stats.items) {
            const statsCounters = document.querySelectorAll('.counter');
            data.stats.items.forEach((item, idx) => {
                if (statsCounters[idx]) {
                  let target = item.target === "{exp}" ? expYears : item.target;
                  statsCounters[idx].setAttribute('data-target', target);
                }
            });
        }
        if (data.hero && data.hero.typedItems) initTyped(data.hero.typedItems);
        initPortfolioIsotope();
      }

      AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false });
      GLightbox({ selector: '.portfolio-lightbox' });

    } catch (e) { console.error('Error:', e); }
  }

  loadContent();

})();