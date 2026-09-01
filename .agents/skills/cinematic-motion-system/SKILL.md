---
name: cinematic-motion-system
description: Award-winning kinetic typography, 3D specular glare card physics, bespoke supersonic HUD cursors, 3D overlapping card decks, and Awwwards-grade velocity scroll skew animation system with GSAP and Vanilla CSS.
---

# 🎬 Cinematic Motion & Kinetic Typography Animation System

This skill provides a complete, reusable architecture and copy-paste recipes for creating **Awwwards / Apple Pro-grade web animations**. It covers 5 core pillars:

1. **🔤 Kinetic Typography & Character Split Engine** (3D flip-in character stagger reveals)
2. **🎴 3D Specular Glare & Gyro-Tilt Card Physics** (Real-time cursor-tracking specular light & Z-axis depth)
3. **⚡ Velocity Scroll Skew & Inertial Bounce** (Scroll-speed-driven dynamic card/text skewing)
4. **✈️ Aerodynamic Custom HUD Flight Cursor** (Velocity angle rotation, radar lock-on HUD, and sonic click shockwave)
5. **🎴 3D Overlapping Card Deck & Cinematic Reel Sequence** (Overlapping deck stack, hover focus pop-out, and auto-playback reel)

---

## 1. Kinetic Typography & Character Split Engine

### HTML Setup
```html
<h2 class="heading-lg">Command the Skies & Executive Fleet</h2>
```

### CSS System (`styles.css`)
```css
/* Split Word & Character Structure */
.split-word {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  margin-right: 0.28em;
}

.split-char {
  display: inline-block;
  will-change: transform, opacity, filter;
  transform-origin: 50% 100%;
}

/* Luminous Gold Shimmer Gradient Flow */
.text-gold {
  background: linear-gradient(135deg, #F5E5C0 0%, #DFBA67 50%, #B89240 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: goldTextFlow 4s linear infinite;
}

@keyframes goldTextFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### JavaScript Engine (`app.js`)
```javascript
function initKineticTypography() {
  const headings = document.querySelectorAll('.heading-lg, .heading-xl');
  headings.forEach(heading => {
    if (heading.dataset.splitApplied) return;
    heading.dataset.splitApplied = "true";

    const childNodes = Array.from(heading.childNodes);
    heading.innerHTML = '';

    childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/\s+/).filter(Boolean);
        words.forEach(word => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'split-word';
          Array.from(word).forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'split-char';
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
          });
          heading.appendChild(wordSpan);
          heading.appendChild(document.createTextNode(' '));
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node;
        const text = el.innerText;
        el.innerHTML = '';
        const words = text.split(/\s+/).filter(Boolean);
        words.forEach(word => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'split-word';
          Array.from(word).forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'split-char';
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
          });
          el.appendChild(wordSpan);
          el.appendChild(document.createTextNode(' '));
        });
        heading.appendChild(el);
      }
    });

    const chars = heading.querySelectorAll('.split-char');
    if (chars.length > 0) {
      gsap.fromTo(chars,
        {
          opacity: 0,
          y: 35,
          rotateX: -60,
          scale: 0.92,
          filter: "blur(4px)"
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  });
}
```

---

## 2. 3D Specular Glare & Gyro-Tilt Card Physics

### CSS (`styles.css`)
```css
.specular-card {
  position: relative;
  transform-style: preserve-3d;
  perspective: 1200px;
  transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, border-color 0.25s ease;
  overflow: hidden;
}

.card-glare {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, rgba(244, 226, 181, 0.22) 0%, transparent 65%);
  opacity: 0;
  transition: opacity 0.35s ease;
  mix-blend-mode: overlay;
  z-index: 15;
}

.specular-card:hover .card-glare {
  opacity: 1;
}

/* Z-Axis 3D Layer Elevation */
.specular-card .card-badge,
.specular-card .card-price,
.specular-card .btn {
  transform: translateZ(25px);
  transform-style: preserve-3d;
}

.specular-card .card-img-wrapper {
  transform: translateZ(12px);
}
```

### JavaScript Engine (`app.js`)
```javascript
function init3DCardPhysics() {
  const cards = document.querySelectorAll('.card, .jet-card, .studio-card, .opt-card, .stat-card, .glass-panel');
  cards.forEach(card => {
    card.classList.add('specular-card');

    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    const glareEl = card.querySelector('.card-glare');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = -((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      if (glareEl) {
        glareEl.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(244, 226, 181, 0.28) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
```

---

## 3. Velocity Scroll Skew & Inertial Bounce (Awwwards Style)

### CSS Optimization (`styles.css`)
```css
.skew-target, .card, .jet-card, .studio-card, .section-header {
  transform-origin: center center;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
}
```

### JavaScript Engine (`app.js`)
```javascript
function setupVelocityScrollSkew() {
  const skewTargets = '.card, .jet-card, .studio-card, .opt-card, .stat-card, .section-header';
  
  const skewSetter = gsap.quickTo(skewTargets, "skewY", {
    duration: 0.35,
    ease: "power2.out"
  });

  const clamp = gsap.utils.clamp(-3.2, 3.2);

  ScrollTrigger.create({
    onUpdate: (self) => {
      const velocity = self.getVelocity();
      const skewAngle = clamp(velocity / -280);
      skewSetter(skewAngle);
    }
  });

  // Inertial smooth spring bounce back when user stops scrolling
  let scrollStopTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
      gsap.to(skewTargets, {
        skewY: 0,
        duration: 0.75,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto"
      });
    }, 120);
  }, { passive: true });
}
```

---

## 4. Bespoke Aviation Supersonic Flight HUD Cursor

### HTML Markup
```html
<div class="jet-cursor-system" id="jetCursorSystem">
  <!-- Supersonic Pointer -->
  <div class="jet-cursor-plane" id="jetCursorPlane">
    <svg viewBox="0 0 32 32" class="jet-icon-svg" fill="none">
      <path d="M16 2 L19 12 L29 17 L29 20 L19 18 L18 26 L22 29 L22 31 L16 29 L10 31 L10 29 L14 26 L13 18 L3 20 L3 17 L13 12 Z" 
            fill="url(#goldCursorGrad)" stroke="#DFBA67" stroke-width="0.8"/>
      <defs>
        <linearGradient id="goldCursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="50%" stop-color="#DFBA67"/>
          <stop offset="100%" stop-color="#A88334"/>
        </linearGradient>
      </defs>
    </svg>
    <div class="jet-contrail-glow"></div>
  </div>

  <!-- Radar HUD Reticle -->
  <div class="jet-cursor-radar" id="jetCursorRadar">
    <div class="radar-crosshair radar-ch-h"></div>
    <div class="radar-crosshair radar-ch-v"></div>
    <div class="radar-ring"></div>
    <div class="radar-tag" id="radarTargetTag">FLIGHT HUD • MACH 0.92</div>
  </div>

  <!-- Click Sonic Burst Ring -->
  <div class="jet-click-burst" id="jetClickBurst"></div>
</div>
```

### CSS (`styles.css`)
```css
@media (pointer: fine) {
  body, a, button, input, select, .card {
    cursor: none !important;
  }
}

.jet-cursor-system {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 100000;
}

.jet-cursor-plane {
  position: fixed;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 8px rgba(223, 186, 103, 0.7));
  will-change: transform;
  pointer-events: none;
  z-index: 100002;
}

.jet-cursor-radar {
  position: fixed;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  z-index: 100001;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.radar-ring {
  position: absolute;
  inset: 0;
  border: 1px dashed rgba(223, 186, 103, 0.4);
  border-radius: 50%;
  animation: radarRotate 12s linear infinite;
}

.jet-cursor-radar.hovered {
  width: 78px;
  height: 78px;
  border-radius: 12px;
  background: rgba(223, 186, 103, 0.08);
  border: 1.5px solid #DFBA67;
  box-shadow: 0 0 25px rgba(223, 186, 103, 0.4);
}

.jet-click-burst.animate {
  animation: sonicShockwave 0.6s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
}

@keyframes sonicShockwave {
  0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(8); opacity: 0; }
}

@keyframes radarRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### JavaScript Engine (`app.js`)
```javascript
let lastMouseX = 0;
let lastMouseY = 0;
let currentJetAngle = 0;

function setupAviationJetCursor() {
  const jetPlane = document.getElementById('jetCursorPlane');
  const jetRadar = document.getElementById('jetCursorRadar');
  const radarTag = document.getElementById('radarTargetTag');
  const clickBurst = document.getElementById('jetClickBurst');

  if (!jetPlane || !jetRadar) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 1.5) {
      currentJetAngle = (Math.atan2(dy, dx) * 180 / Math.PI) + 90;
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    gsap.to(jetPlane, {
      x: mouseX,
      y: mouseY,
      rotation: currentJetAngle,
      duration: 0.12,
      ease: "power2.out"
    });

    gsap.to(jetRadar, {
      x: mouseX,
      y: mouseY,
      duration: 0.32,
      ease: "power3.out"
    });
  });

  // Target Lock-On for Interactive Targets
  document.querySelectorAll('a, button, .card, select, input').forEach(el => {
    el.addEventListener('mouseenter', () => {
      jetRadar.classList.add('hovered');
      jetPlane.classList.add('hovered');
      if (radarTag) radarTag.innerText = 'TARGET ACQUIRED';
    });
    el.addEventListener('mouseleave', () => {
      jetRadar.classList.remove('hovered');
      jetPlane.classList.remove('hovered');
      if (radarTag) radarTag.innerText = 'FLIGHT HUD • MACH 0.92';
    });
  });

  // Click Shockwave
  window.addEventListener('mousedown', (e) => {
    if (!clickBurst) return;
    clickBurst.style.left = `${e.clientX}px`;
    clickBurst.style.top = `${e.clientY}px`;
    clickBurst.classList.remove('animate');
    void clickBurst.offsetWidth;
    clickBurst.classList.add('animate');
  });
}
```

---

## 5. 3D Overlapping Card Deck & Cinematic Reel Sequence

### CSS (`styles.css`)
```css
.horizontal-track.overlap-active {
  display: flex;
  gap: 0;
  padding: 1rem 3rem 2.5rem;
  perspective: 1200px;
}

.horizontal-track.overlap-active .card {
  margin-right: -75px;
  transform: perspective(1000px) rotateY(-4deg) scale(0.96);
  filter: brightness(0.92);
}

.horizontal-track.overlap-active .card:nth-child(even) {
  transform: perspective(1000px) rotateY(3deg) translateY(6px) scale(0.96);
}

.horizontal-track.overlap-active .card:hover,
.horizontal-track.overlap-active .card.anime-focus {
  z-index: 50 !important;
  transform: perspective(1000px) translateY(-18px) scale(1.06) rotateY(0deg) !important;
  border-color: #DFBA67 !important;
  box-shadow: 0 0 35px rgba(223, 186, 103, 0.5), 0 25px 50px rgba(0, 0, 0, 0.9) !important;
}
```

### JavaScript Engine (`app.js`)
```javascript
let isAnimeSequenceRunning = false;
let animeSequenceInterval = null;
let currentAnimeCardIndex = 0;

function toggleAnimeSequence() {
  const container = document.getElementById('horizontalContainer');
  const track = document.getElementById('horizontalTrack');
  const cards = track ? track.querySelectorAll('.card, .studio-card') : [];
  if (!container || cards.length === 0) return;

  isAnimeSequenceRunning = !isAnimeSequenceRunning;

  if (isAnimeSequenceRunning) {
    playAnimeCardStep(cards, container);
    animeSequenceInterval = setInterval(() => {
      currentAnimeCardIndex = (currentAnimeCardIndex + 1) % cards.length;
      playAnimeCardStep(cards, container);
    }, 1800);
  } else {
    clearInterval(animeSequenceInterval);
    cards.forEach(c => c.classList.remove('anime-focus'));
  }
}

function playAnimeCardStep(cards, container) {
  cards.forEach((card, idx) => {
    if (idx === currentAnimeCardIndex) {
      card.classList.add('anime-focus');
      const scrollPos = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2);
      container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    } else {
      card.classList.remove('anime-focus');
    }
  });
}
```
