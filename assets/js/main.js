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
      }, 2000); // Minimum display time for effect
    }
  });

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
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

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
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

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
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

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
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

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  /**
   * Hero type effect - MOVED TO loadContent for dynamic sync
   */
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

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter - MOVED TO loadContent for dynamic rendering
   */

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Gestion du formulaire de contact
   */
  document.addEventListener('DOMContentLoaded', function() {
    const messageTypeSelect = document.getElementById('messageType');
    const subjectInput = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');

    const templates = {
      contact: {
        subject: "Prise de contact",
        message: "Bonjour,\n\nJe souhaite prendre contact avec vous pour discuter d'une éventuelle collaboration.\n\nCordialement,"
      },
      prestation: {
        subject: "Demande de prestation de service",
        message: "Bonjour,\n\nJe souhaite faire appel à vos services pour le développement d'un projet.\n\nType de projet :\nBudget estimé :\nDélai souhaité :\n\nDescription du projet :\n\nCordialement,"
      },
      devis: {
        subject: "Demande de devis",
        message: "Bonjour,\n\nJe souhaiterais obtenir un devis pour le projet suivant :\n\nType de projet :\nFonctionnalités souhaitées :\nDélai souhaité :\n\nMerci d'avance,\nCordialement,"
      }
    };

    if (messageTypeSelect) {
      messageTypeSelect.addEventListener('change', function(e) {
        const selected = e.target.value;
        const template = templates[selected];
        
        if (template) {
          subjectInput.value = template.subject;
          messageTextarea.value = template.message;
        } else {
          subjectInput.value = '';
          messageTextarea.value = '';
        }
      });
    }
  });

  /**
   * Calculate years of experience
   */
  function updateExperienceYears() {
    const startYear = 2021;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    const experienceElement = document.getElementById('experienceYears');
    if (experienceElement) {
      experienceElement.textContent = years;
    }
  }

  // Update experience years when page loads
  window.addEventListener('load', updateExperienceYears);

  /**
   * Animated Counters
   */
  const counters = select('.counter', true);
  
  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format the number (add commas for thousands)
      const formattedNumber = Math.floor(current).toLocaleString();
      counter.textContent = formattedNumber + (target >= 1000 ? '' : '');
    }, 16);
  }
  
  // Initialize counters when they come into view
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
  
  // Run on scroll and initial load
  window.addEventListener('scroll', initCounters);
  window.addEventListener('load', initCounters);

  /**
   * Theme Toggle Functionality
   */
  const themeToggle = select('#theme-toggle');
  const themeIcon = select('#theme-icon');
  
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  function updateThemeIcon(theme) {
    if (themeIcon) {
      if (theme === 'dark') {
          themeIcon.className = 'bi bi-sun-fill';
      } else {
          themeIcon.className = 'bi bi-moon-fill';
      }
    }
  }

  /**
   * Load Content from content.json
   */
  async function loadContent() {
    try {
      const response = await fetch('assets/data/content.json');
      if (!response.ok) return;
      const data = await response.json();

      // Update Meta Tags
      document.title = data.meta.title;
      const metaValues = {
        'description': data.meta.description,
        'keywords': data.meta.keywords,
        'og:title': data.meta.title,
        'og:description': data.meta.description,
        'twitter:title': data.meta.title,
        'twitter:description': data.meta.description
      };

      for (const [name, value] of Object.entries(metaValues)) {
        const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        if (meta) meta.setAttribute('content', value);
      }

      // Simple Text Elements (data-content)
      const currentYear = new Date().getFullYear();
      document.querySelectorAll('[data-content]').forEach(el => {
        const key = el.getAttribute('data-content');
        const value = key.split('.').reduce((obj, i) => obj ? obj[i] : null, data);
        if (value) {
            let processedValue = value;
            if (typeof value === 'string') {
              processedValue = value.replace('{year}', currentYear);
            }

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.value = processedValue;
            } else {
                el.innerHTML = processedValue;
            }
        }
      });

      // Render Dynamic Lists
      renderSkills(data.skills.categories);
      renderResume(data.resume.education, 'education');
      renderResume(data.resume.experience, 'experience');
      renderServices(data.services.items);
      renderPortfolio(data.portfolio);

      // Update Stats Targets
      if (data.stats && data.stats.items) {
          const statsCounters = document.querySelectorAll('.counter');
          data.stats.items.forEach((item, idx) => {
              if (statsCounters[idx]) statsCounters[idx].setAttribute('data-target', item.target);
          });
      }

      // Update Typed Items
      if (data.hero && data.hero.typedItems) {
        initTyped(data.hero.typedItems);
      }

      updateExperienceYears();
      
      // Re-initialize AOS
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });

      // Initialize Isotope after content is loaded
      initPortfolioIsotope();
      
      // Initialize Lightbox
      GLightbox({
        selector: '.portfolio-lightbox'
      });

    } catch (error) {
      console.error('Error loading content:', error);
    }
  }

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

    container.innerHTML = items.map(item => `
      <div class="resume-item">
        <h4>${item.degree || item.title}</h4>
        <h5>${item.year || item.period}</h5>
        <p><em>${item.school || item.company}</em></p>
        ${item.desc ? `<p>${item.desc}</p>` : ''}
        ${item.tasks ? `
          <ul>
            ${item.tasks.map(task => `<li>${task}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');
  }

  function renderServices(items) {
    const container = document.querySelector('[data-list="services.items"]');
    if (!container || !items) return;

    const icons = ['bi-laptop', 'bi-phone', 'bi-code-square', 'bi-cart3', 'bi-gear', 'bi-graph-up'];

    container.innerHTML = items.map((item, idx) => `
      <div class="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="${idx * 100}">
        <div class="icon-box h-100">
          <div class="icon">
            <i class="bi ${icons[idx] || 'bi-briefcase'}"></i>
            <div class="icon-bg"></div>
          </div>
          <h4 class="title">${item.title}</h4>
          <div class="description">
            <ul>
              ${item.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderPortfolio(portfolio) {
    const filterContainer = document.querySelector('[data-list="portfolio.filters"]');
    const itemsContainer = document.querySelector('[data-list="portfolio.items"]');
    
    if (filterContainer && portfolio.filters) {
      filterContainer.innerHTML = portfolio.filters.map(f => `
        <li data-filter="${f.id}" class="${f.id === '*' ? 'filter-active' : ''}">${f.label}</li>
      `).join('');
    }

    if (itemsContainer && portfolio.items) {
      itemsContainer.innerHTML = portfolio.items.map((item, idx) => {
        // Prepare gallery links (first image is visible, others are hidden)
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
                <a href="portfolio-details.html" title="Plus de détails"><i class="bx bx-link"></i></a>
              </div>
            </div>
            <div class="portfolio-info-bottom">
              <h4>${item.title}</h4>
              <p>${item.description || ''}</p>
            </div>
          </div>
        </div>
        `;
      }).join('');
    }
  }



  function initPortfolioIsotope() {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }
  }

  loadContent();

})()