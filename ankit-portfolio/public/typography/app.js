/* ==========================================================================
   EXJET - Executive Aviation Platform Logic & Motion System
   ========================================================================== */

// Executive Fleet Dataset
const FLEET_DATA = [
  {
    id: 'g700',
    name: 'Gulfstream G700',
    category: 'ultra-long',
    tag: 'Flagship Ultra Long-Range',
    image: 'assets/hero_jet.jpg',
    speed: 'Mach 0.90',
    range: '7,500 nmi',
    passengers: 'Up to 19',
    hourlyRate: 11500,
    desc: 'The ultimate pinnacle of executive aviation. Ultra-wide cabin with 5 living areas and whispering acoustic engineering.'
  },
  {
    id: 'global7500',
    name: 'Bombardier Global 7500',
    category: 'ultra-long',
    tag: 'Master Suite & Dining',
    image: 'assets/cabin_luxury.jpg',
    speed: 'Mach 0.925',
    range: '7,700 nmi',
    passengers: 'Up to 19',
    hourlyRate: 12200,
    desc: 'Featuring a permanent master suite with full-size bed and Nuage ergonomically optimized zero-gravity seating.'
  },
  {
    id: 'falcon10x',
    name: 'Dassault Falcon 10X',
    category: 'ultra-long',
    tag: 'Penthouse of the Skies',
    image: 'assets/hero_jet.jpg',
    speed: 'Mach 0.925',
    range: '7,500 nmi',
    passengers: 'Up to 16',
    hourlyRate: 11800,
    desc: 'The largest cabin cross-section in business aviation with revolutionary high-lift wing aerodynamics.'
  },
  {
    id: 'cl605',
    name: 'Challenger 650',
    category: 'heavy',
    tag: 'Heavy Executive',
    image: 'assets/cabin_luxury.jpg',
    speed: '470 knots',
    range: '4,000 nmi',
    passengers: 'Up to 12',
    hourlyRate: 7800,
    desc: 'Widest-in-class heavy jet cabin designed for maximum productivity and seamless Transcontinental charter.'
  },
  {
    id: 'praetor600',
    name: 'Embraer Praetor 600',
    category: 'super-mid',
    tag: 'Super Midsize Leader',
    image: 'assets/hero_jet.jpg',
    speed: '466 knots',
    range: '4,018 nmi',
    passengers: 'Up to 9',
    hourlyRate: 6400,
    desc: 'Full fly-by-wire technology with turbulence reduction tech and best-in-class 5,800 ft cabin altitude.'
  },
  {
    id: 'citationX',
    name: 'Cessna Citation Longitude',
    category: 'super-mid',
    tag: 'Super Midsize Speed',
    image: 'assets/cabin_luxury.jpg',
    speed: '483 knots',
    range: '3,500 nmi',
    passengers: 'Up to 12',
    hourlyRate: 5900,
    desc: 'Exceptionally quiet cabin atmosphere paired with transcontinental non-stop range and sleek modern styling.'
  }
];

// Airport Coordinates & Distance Calculator (Nautical Miles)
const AIRPORTS = {
  TEB: { name: 'New York (Teterboro)', x: 0.25, y: 0.4, distFactor: { FAB: 3470, LBG: 3620, DWC: 6850, NCE: 3950, HND: 6740, ASE: 1720 } },
  FAB: { name: 'London (Farnborough)', x: 0.48, y: 0.32, distFactor: { TEB: 3470, LBG: 220, DWC: 3400, NCE: 640, HND: 5950, ASE: 4700 } },
  LBG: { name: 'Paris (Le Bourget)', x: 0.50, y: 0.34, distFactor: { TEB: 3620, FAB: 220, DWC: 3240, NCE: 430, HND: 6050, ASE: 4850 } },
  DWC: { name: 'Dubai (Al Maktoum)', x: 0.68, y: 0.48, distFactor: { TEB: 6850, FAB: 3400, LBG: 3240, NCE: 3020, HND: 4280, ASE: 7500 } },
  NCE: { name: 'Nice / Monaco', x: 0.52, y: 0.38, distFactor: { TEB: 3950, FAB: 640, LBG: 430, DWC: 3020, HND: 6200, ASE: 5100 } },
  HND: { name: 'Tokyo (Haneda)', x: 0.88, y: 0.44, distFactor: { TEB: 6740, FAB: 5950, LBG: 6050, DWC: 4280, NCE: 6200, ASE: 5350 } },
  ASE: { name: 'Aspen (Pitkin County)', x: 0.18, y: 0.42, distFactor: { TEB: 1720, FAB: 4700, LBG: 4850, DWC: 7500, NCE: 5100, HND: 5350 } }
};

// Initial State Variables
let selectedCategory = 'all';
let customizerOptions = [
  { name: 'Michelin 3-Course', price: 1200 },
  { name: 'Dom Pérignon Vintage', price: 650 },
  { name: 'Starlink Ultra-Fast Wi-Fi', price: 450 }
];

// Initialize GSAP Motion Plugin if available
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  renderFleetGrid();
  initFleetFilters();
  initSearchTabs();
  updateCustomizerPreview();
  initRouteRadarCanvas();
  initMotionSystem();
});

/* ==========================================================================
   GSAP Motion System & ScrollTrigger Architecture
   ========================================================================== */
function initMotionSystem() {
  // Check Accessibility Reduced Motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal, .reveal-blur, .reveal-spring, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
    return;
  }

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    initFallbackObserver();
    return;
  }

  const mm = gsap.matchMedia();

  // Desktop Motion (> 1024px)
  mm.add("(min-width: 1025px)", () => {
    setupHeroTimeline();
    setupSectionScrollTriggers();
    setupPinnedSanctuarySection();
    setupHorizontalScrollTrack();
    setupStatCounters();
    setupMagneticButtons();
    setupScrollProgressBar();
    setupParallaxBackgrounds();
    setupCustomStudioCursor();
  });

  // Tablet Motion (769px - 1024px)
  mm.add("(min-width: 769px) and (max-width: 1024px)", () => {
    setupHeroTimeline();
    setupSectionScrollTriggers();
    setupHorizontalScrollTrack();
    setupStatCounters();
    setupScrollProgressBar();
  });

  // Mobile Motion (< 768px)
  mm.add("(max-width: 768px)", () => {
    setupSimplifiedMobileMotion();
    setupStatCounters();
    setupScrollProgressBar();
  });
}

/* --------------------------------------------------------------------------
   1. Hero Entrance Sequence Timeline
   -------------------------------------------------------------------------- */
function setupHeroTimeline() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(".hero-bg-img", 
    { scale: 1.12, opacity: 0.8 }, 
    { scale: 1.0, opacity: 1, duration: 1.6, ease: "power2.out" }
  )
  .fromTo(".hero-badge", 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.7 }, "-=1.2"
  )
  .fromTo(".heading-xl", 
    { y: 40, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.85 }, "-=0.5"
  )
  .fromTo(".hero .subheading", 
    { y: 25, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.7 }, "-=0.6"
  )
  .fromTo(".search-widget", 
    { y: 50, opacity: 0, scale: 0.97 }, 
    { y: 0, opacity: 1, scale: 1.0, duration: 0.85, ease: "power3.out" }, "-=0.5"
  )
  .fromTo(".hero-stats .stat-card", 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.4"
  );
}

/* --------------------------------------------------------------------------
   2. ScrollTrigger Section Entrance Reveals
   -------------------------------------------------------------------------- */
function setupSectionScrollTriggers() {
  // Section Headers - Animations trigger every time user scrolls up/down into view
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.fromTo(header, 
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 88%",
          end: "bottom 10%",
          toggleActions: "restart reverse restart reverse"
        }
      }
    );
  });

  // Reveal Glass Cards & Panels on Every Scroll
  gsap.utils.toArray('.reveal, .reveal-scale, .glass-panel, .testimonial-card, .matrix-row').forEach(el => {
    gsap.fromTo(el,
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.75, ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 5%",
          toggleActions: "restart reverse restart reverse"
        }
      }
    );
  });

  // Radar Wrapper Entrance
  const radarWrapper = document.querySelector('.radar-wrapper');
  if (radarWrapper) {
    gsap.fromTo(radarWrapper,
      { y: 60, opacity: 0, scale: 0.93 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: radarWrapper,
          start: "top 85%",
          end: "bottom 10%",
          toggleActions: "restart reverse restart reverse"
        }
      }
    );
  }

  // Empty Leg Banner
  const emptyBanner = document.querySelector('.empty-leg-banner');
  if (emptyBanner) {
    gsap.fromTo(emptyBanner,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: {
          trigger: emptyBanner,
          start: "top 88%",
          end: "bottom 10%",
          toggleActions: "restart reverse restart reverse"
        }
      }
    );
  }
}

/* --------------------------------------------------------------------------
   3. Pinned Cabin Sanctuary Storytelling Section (Desktop)
   -------------------------------------------------------------------------- */
function setupPinnedSanctuarySection() {
  const previewCard = document.querySelector('.customizer-preview');
  const grid = document.querySelector('.customizer-grid');

  if (!previewCard || !grid) return;

  ScrollTrigger.create({
    trigger: grid,
    start: "top 15%",
    end: "bottom 85%",
    pin: previewCard,
    pinSpacing: false,
    anticipatePin: 1
  });
}

/* --------------------------------------------------------------------------
   4. Stat Counter Numeric Count-Up
   -------------------------------------------------------------------------- */
function setupStatCounters() {
  const statElements = document.querySelectorAll('.stat-val');

  statElements.forEach(el => {
    const rawText = el.innerText.trim();
    const numericVal = parseFloat(rawText.replace(/[^0-9.]/g, ''));
    const isPercent = rawText.includes('%');
    const isPlus = rawText.includes('+');

    if (isNaN(numericVal)) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: numericVal,
          duration: 2.0,
          ease: "power2.out",
          onUpdate: () => {
            let formatted = counterObj.val.toLocaleString('en-US', {
              maximumFractionDigits: isPercent ? 1 : 0
            });
            if (isPlus) formatted += '+';
            if (isPercent) formatted += '%';
            el.innerText = formatted;
          }
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Typography Studio Horizontal Scroll Track
   -------------------------------------------------------------------------- */
function setupHorizontalScrollTrack() {
  // Uses native CSS smooth horizontal scroll snapping
}

/* --------------------------------------------------------------------------
   6. Custom Typography Studio Interactive Cursor
   -------------------------------------------------------------------------- */
function setupCustomStudioCursor() {
  const cursor = document.getElementById('studioCursor');
  const cursorDot = document.getElementById('studioCursorDot');
  if (!cursor || !cursorDot) return;

  window.addEventListener('mousemove', (e) => {
    gsap.to(cursorDot, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out"
    });

    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.35,
      ease: "power3.out"
    });
  });

  const hoverTargets = document.querySelectorAll('a, button, .jet-card, .studio-card, .opt-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
}

/* --------------------------------------------------------------------------
   7. Restrained Parallax Backgrounds
   -------------------------------------------------------------------------- */
function setupParallaxBackgrounds() {
  const heroImg = document.querySelector('.hero-bg-img');
  if (!heroImg) return;

  gsap.to(heroImg, {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
}

/* --------------------------------------------------------------------------
   6. Magnetic CTA Buttons Micro-Motion
   -------------------------------------------------------------------------- */
function setupMagneticButtons() {
  const goldBtns = document.querySelectorAll('.btn-gold');

  goldBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const deltaX = e.clientX - (rect.left + rect.width / 2);
      const deltaY = e.clientY - (rect.top + rect.height / 2);

      gsap.to(btn, {
        x: deltaX * 0.2,
        y: deltaY * 0.2,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power3.out"
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Top Scroll Progress Bar Scrub
   -------------------------------------------------------------------------- */
function setupScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  gsap.to(progressBar, {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1
    }
  });
}

/* --------------------------------------------------------------------------
   8. Simplified Mobile Entrance Fallback
   -------------------------------------------------------------------------- */
function setupSimplifiedMobileMotion() {
  gsap.utils.toArray('.reveal, .reveal-blur, .reveal-spring, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    gsap.fromTo(el, 
      { y: 25, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  });
}

/* Fallback IntersectionObserver if GSAP CDN is blocked */
function initFallbackObserver() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-blur, .reveal-spring, .reveal-left, .reveal-right, .reveal-scale');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      } else {
        entry.target.classList.remove('reveal-active');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Navigation Scroll Glass Effect
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   Fleet Showcase Rendering & Staggered ScrollTrigger Entrance
   -------------------------------------------------------------------------- */
function renderFleetGrid() {
  const grid = document.getElementById('fleetGrid');
  grid.innerHTML = '';

  const filteredFleet = selectedCategory === 'all' 
    ? FLEET_DATA 
    : FLEET_DATA.filter(jet => jet.category === selectedCategory);

  filteredFleet.forEach((jet, idx) => {
    const card = document.createElement('div');
    card.className = `jet-card glass-panel`;
    card.innerHTML = `
      <div class="jet-img-wrapper">
        <img src="${jet.image}" alt="${jet.name}" class="jet-img">
        <span class="jet-tag">${jet.tag}</span>
      </div>
      <div class="jet-body">
        <div>
          <h3 class="jet-title">${jet.name}</h3>
          <p class="jet-desc">${jet.desc}</p>
          <div class="jet-specs">
            <div class="spec-item">
              <span class="spec-val">${jet.speed}</span>
              <span class="spec-lbl">Max Speed</span>
            </div>
            <div class="spec-item">
              <span class="spec-val">${jet.range}</span>
              <span class="spec-lbl">Max Range</span>
            </div>
            <div class="spec-item">
              <span class="spec-val">${jet.passengers}</span>
              <span class="spec-lbl">Capacity</span>
            </div>
          </div>
        </div>
        <div class="jet-footer">
          <div class="jet-price">
            <span class="price-amount">$${jet.hourlyRate.toLocaleString()}</span>
            <span class="price-unit">per flight hour</span>
          </div>
          <button class="btn btn-gold btn-sm" onclick="openModal('${jet.name}')">Book Charter</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Trigger Staggered Card Entrance via GSAP if loaded
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo('.fleet-grid .jet-card', 
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.75, ease: "power2.out", stagger: 0.12,
        scrollTrigger: {
          trigger: '.fleet-grid',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }
}

function initFleetFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCategory = btn.getAttribute('data-category');
      renderFleetGrid();
    });
  });
}

/* --------------------------------------------------------------------------
   Search Bar Tabs
   -------------------------------------------------------------------------- */
function initSearchTabs() {
  const tabs = document.querySelectorAll('.search-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   Flight Estimate Calculation & Modal Handling
   -------------------------------------------------------------------------- */
function calculateRouteQuote() {
  const origin = document.getElementById('originSelect').value;
  const dest = document.getElementById('destSelect').value;
  
  if (origin === dest) {
    alert('Please select different Origin and Destination airports.');
    return;
  }

  const origObj = AIRPORTS[origin];
  const distance = (origObj && origObj.distFactor[dest]) ? origObj.distFactor[dest] : 3200;
  
  const hoursDecimal = distance / 480;
  const hours = Math.floor(hoursDecimal);
  const minutes = Math.round((hoursDecimal - hours) * 60);

  const ratePerHour = 11500;
  const totalCost = Math.round(hoursDecimal * ratePerHour + 3500);

  document.getElementById('summaryRoute').innerText = `${origin} -> ${dest} (${distance.toLocaleString()} nmi)`;
  document.getElementById('summaryAircraft').innerText = `Gulfstream G700 Flagship`;
  document.getElementById('summaryTime').innerText = `${hours} hrs ${minutes} mins (Non-stop)`;
  document.getElementById('summaryTotal').innerText = `$${totalCost.toLocaleString()} USD`;

  openModal('Charter Quote Calculator');
}

function openModal(title) {
  const modal = document.getElementById('bookingModal');
  document.getElementById('modalTitle').innerText = title;
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('bookingModal');
  modal.classList.remove('active');
}

/* --------------------------------------------------------------------------
   Interactive Cabin Customizer
   -------------------------------------------------------------------------- */
function toggleOption(cardElement, optionName, price) {
  cardElement.classList.toggle('selected');
  
  const index = customizerOptions.findIndex(o => o.name === optionName);
  if (index >= 0) {
    customizerOptions.splice(index, 1);
  } else {
    customizerOptions.push({ name: optionName, price: price });
  }

  updateCustomizerPreview();
}

function updateCustomizerPreview() {
  const totalPrice = customizerOptions.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('customizerPrice').innerText = `+$${totalPrice.toLocaleString()}`;

  const pillsContainer = document.getElementById('activePills');
  pillsContainer.innerHTML = '';

  customizerOptions.forEach(opt => {
    const pill = document.createElement('span');
    pill.className = 'amenity-pill';
    pill.innerHTML = `✓ ${opt.name}`;
    pillsContainer.appendChild(pill);
  });
}

/* --------------------------------------------------------------------------
   Canvas Radar Flight Corridor Map Visualizer
   -------------------------------------------------------------------------- */
function initRouteRadarCanvas() {
  const canvas = document.getElementById('routeCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let radarAngle = 0;

  const flightPaths = [
    { from: 'TEB', to: 'FAB', progress: 0.35, speed: 0.0012 },
    { from: 'FAB', to: 'DWC', progress: 0.65, speed: 0.0018 },
    { from: 'LBG', to: 'HND', progress: 0.15, speed: 0.0010 },
    { from: 'ASE', to: 'NCE', progress: 0.80, speed: 0.0015 }
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(223, 186, 103, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    radarAngle += 0.008;

    const radarRadius = Math.max(canvas.width, canvas.height) * 0.7;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radarRadius, radarAngle, radarAngle + 0.25);
    ctx.closePath();

    const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radarRadius);
    gradient.addColorStop(0, 'rgba(223, 186, 103, 0.15)');
    gradient.addColorStop(1, 'rgba(223, 186, 103, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();

    Object.keys(AIRPORTS).forEach(code => {
      const airport = AIRPORTS[code];
      const px = airport.x * canvas.width;
      const py = airport.y * canvas.height;

      ctx.beginPath();
      ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(223, 186, 103, 0.15)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#DFBA67';
      ctx.fill();

      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(code, px + 8, py - 6);
    });

    flightPaths.forEach(path => {
      const p1 = AIRPORTS[path.from];
      const p2 = AIRPORTS[path.to];
      if (!p1 || !p2) return;

      const x1 = p1.x * canvas.width;
      const y1 = p1.y * canvas.height;
      const x2 = p2.x * canvas.width;
      const y2 = p2.y * canvas.height;

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 - 60;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(midX, midY, x2, y2);
      ctx.strokeStyle = 'rgba(223, 186, 103, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      path.progress += path.speed;
      if (path.progress > 1) path.progress = 0;

      const t = path.progress;
      const jetX = Math.pow(1 - t, 2) * x1 + 2 * (1 - t) * t * midX + Math.pow(t, 2) * x2;
      const jetY = Math.pow(1 - t, 2) * y1 + 2 * (1 - t) * t * midY + Math.pow(t, 2) * y2;

      ctx.beginPath();
      ctx.arc(jetX, jetY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF';
      ctx.shadowColor = '#DFBA67';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}

/* --------------------------------------------------------------------------
   Font Lab Interactive Type Specimen Inspector
   -------------------------------------------------------------------------- */
function updateTypeSpecimen() {
  const family = document.getElementById('fontFamilySelect').value;
  const size = document.getElementById('fontSizeRange').value;
  const spacing = document.getElementById('spacingRange').value;
  const isGradient = document.getElementById('gradientToggle').checked;

  const specimen = document.getElementById('specimenText');
  if (!specimen) return;

  specimen.style.fontFamily = family;
  specimen.style.fontSize = `${size}px`;
  specimen.style.letterSpacing = `${spacing}em`;

  if (isGradient) {
    specimen.classList.add('text-gold');
  } else {
    specimen.classList.remove('text-gold');
    specimen.style.color = '#FFFFFF';
  }

  document.getElementById('fontSizeVal').innerText = `${size}px`;
  document.getElementById('letterSpacingVal').innerText = `${spacing}em`;

  const fontCleanName = family.split(',')[0].replace(/'/g, '');
  document.getElementById('specimenMetaFont').innerText = `Family: ${fontCleanName}`;
  document.getElementById('specimenMetaSize').innerText = `${size}px`;
  document.getElementById('specimenMetaSpacing').innerText = `${spacing}em`;
}

function copyTypeSpecimenCSS() {
  const family = document.getElementById('fontFamilySelect').value;
  const size = document.getElementById('fontSizeRange').value;
  const spacing = document.getElementById('spacingRange').value;

  const cssSnippet = `font-family: ${family};\nfont-size: ${size}px;\nletter-spacing: ${spacing}em;\ncolor: #DFBA67;`;
  navigator.clipboard.writeText(cssSnippet).then(() => {
    alert('Copied Type Specimen CSS Snippet to Clipboard!');
  }).catch(() => {
    alert(cssSnippet);
  });
}

/* --------------------------------------------------------------------------
   VIP JetCard Membership Hours Calculator
   -------------------------------------------------------------------------- */
function updateMembershipCalculator() {
  const hours = parseInt(document.getElementById('membershipHoursRange').value);
  document.getElementById('hoursDisplay').innerText = `${hours} Hours`;

  const tierSilver = document.getElementById('tierSilver');
  const tierGold = document.getElementById('tierGold');
  const tierPlatinum = document.getElementById('tierPlatinum');

  tierSilver.classList.remove('active-tier');
  tierGold.classList.remove('active-tier');
  tierPlatinum.classList.remove('active-tier');

  if (hours <= 25) {
    tierSilver.classList.add('active-tier');
  } else if (hours <= 75) {
    tierGold.classList.add('active-tier');
  } else {
    tierPlatinum.classList.add('active-tier');
  }
}

/* --------------------------------------------------------------------------
   FAQ Accordion Toggle
   -------------------------------------------------------------------------- */
function toggleFAQ(element) {
  element.classList.toggle('active');
}

/* --------------------------------------------------------------------------
   Cabin Atmosphere Circadian Mood Controls
   -------------------------------------------------------------------------- */
function setCabinMood(mode) {
  const img = document.getElementById('atmosphereImg');
  const tag = document.getElementById('moodModeTag');
  const title = document.getElementById('moodModeTitle');
  if (!img) return;

  if (mode === 'sunset') {
    img.style.filter = 'sepia(0.6) saturate(1.8) hue-rotate(-20deg) brightness(0.9)';
    tag.innerText = 'Mode: Sunset Solace';
    title.innerText = 'Golden Hour Circadian Glow';
  } else if (mode === 'aurora') {
    img.style.filter = 'hue-rotate(90deg) saturate(1.6) brightness(0.95)';
    tag.innerText = 'Mode: Aurora Borealis';
    title.innerText = 'Bio-Calming Emerald Aura';
  } else if (mode === 'deepnight') {
    img.style.filter = 'hue-rotate(200deg) saturate(1.4) brightness(0.7)';
    tag.innerText = 'Mode: Deep Night Rest';
    title.innerText = 'REMEDY Melatonin Spectrum';
  } else if (mode === 'daylight') {
    img.style.filter = 'contrast(1.1) brightness(1.15)';
    tag.innerText = 'Mode: Alpine Daylight';
    title.innerText = 'Full-Spectrum Energizing Daylight';
  }
}

/* --------------------------------------------------------------------------
   Jet Engine Sound FX WebAudio Synthesizer
   -------------------------------------------------------------------------- */
let audioCtx = null;
let engineOsc = null;
let engineGain = null;

function playEngineSound(type) {
  const statusText = document.getElementById('audioStatusText');
  const bars = document.querySelectorAll('#audioVisualizer .v-bar');
  
  if (type === 'mute') {
    if (engineGain) engineGain.gain.setValueAtTime(0, audioCtx.currentTime);
    if (statusText) statusText.innerText = 'Current Noise Profile: Whisper Mute Active (0dB Sound Cancellation)';
    bars.forEach(bar => bar.style.height = '10%');
    return;
  }

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (!engineOsc) {
    engineOsc = audioCtx.createOscillator();
    engineGain = audioCtx.createGain();
    engineOsc.type = 'sawtooth';
    engineOsc.frequency.setValueAtTime(75, audioCtx.currentTime);
    engineGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    engineOsc.connect(engineGain);
    engineGain.connect(audioCtx.destination);
    engineOsc.start();
  }

  if (type === 'takeoff') {
    engineOsc.frequency.exponentialRampToValueAtTime(160, audioCtx.currentTime + 1.2);
    engineGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.8);
    if (statusText) statusText.innerText = 'Current Noise Profile: Takeoff Power (85dB Exterior Rolls-Royce Pearl 700 Thrust)';
    bars.forEach((bar, i) => bar.style.height = `${(i % 3 + 1) * 30}%`);
  } else if (type === 'cruise') {
    engineOsc.frequency.exponentialRampToValueAtTime(85, audioCtx.currentTime + 1.0);
    engineGain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.8);
    if (statusText) statusText.innerText = 'Current Noise Profile: Mach 0.90 Cruise (48dB Acoustic Whisper-Quiet Cabin)';
    bars.forEach((bar, i) => bar.style.height = `${(i % 2 + 1) * 20}%`);
  }
}

/* --------------------------------------------------------------------------
   Seat Selector Handler
   -------------------------------------------------------------------------- */
function selectSeat(btn, seatTitle, zoneName) {
  document.querySelectorAll('.seat-btn').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');

  const titleEl = document.getElementById('seatSelectedTitle');
  if (titleEl) {
    titleEl.innerText = `${seatTitle} (${zoneName})`;
  }
}

/* --------------------------------------------------------------------------
   Flight Fuel Burn & Carbon Offset Calculator
   -------------------------------------------------------------------------- */
function updateFuelCalculator() {
  const dist = parseInt(document.getElementById('fuelDistRange').value);
  const isSaf = document.getElementById('safToggle').checked;

  document.getElementById('nmiDisplay').innerText = `${dist.toLocaleString()} nmi`;

  // Fuel calculation formula ~ 4.1 lbs per nmi for ultra long-range jet
  const fuelLbs = Math.round(dist * 4.1);
  const hours = Math.floor(dist / 515);
  const mins = Math.round(((dist / 515) - hours) * 60);

  document.getElementById('fuelLbs').innerText = `${fuelLbs.toLocaleString()} lbs Jet-A1`;
  document.getElementById('flightHoursEst').innerText = `${hours} hrs ${mins} mins`;

  const carbonTons = (dist * 0.0035).toFixed(1);
  const carbonEl = document.getElementById('carbonOffset');

  if (isSaf) {
    carbonEl.innerText = '0.0 Tons CO2 (100% SAF Net Zero Offset)';
    carbonEl.style.color = 'var(--accent-emerald)';
  } else {
    carbonEl.innerText = `${carbonTons} Tons CO2`;
    carbonEl.style.color = 'var(--accent-rose)';
  }
}
