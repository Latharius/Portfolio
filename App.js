/**
 * Renders the animated spectrum-analyzer visualization behind the hero.
 * Encapsulates its own canvas state, bar data, and render loop.
 */
class SpectrumVisualizer {
  #canvas;
  #ctx;
  #container;
  #bars = [];
  #barCount;
  #reduceMotion;
  #time = 0;
  #animationId = null;

  constructor(canvas, container, { barCount = 64, reduceMotion = false } = {}) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext('2d');
    this.#container = container;
    this.#barCount = barCount;
    this.#reduceMotion = reduceMotion;
    this.#initBars();
  }

  #initBars() {
    for (let i = 0; i < this.#barCount; i++) {
      this.#bars.push({
        height: 0,
        target: Math.random(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8
      });
    }
  }

  /** Recalculates canvas pixel dimensions for the current container size and DPR. */
  resize() {
    const dpr = window.devicePixelRatio || 1;
    const width = this.#container.offsetWidth;
    const height = this.#container.offsetHeight;
    this.#canvas.width = width * dpr;
    this.#canvas.height = height * dpr;
    this.#canvas.style.width = `${width}px`;
    this.#canvas.style.height = `${height}px`;
  }

  #drawFrame() {
    const ctx = this.#ctx;
    const width = this.#canvas.width;
    const height = this.#canvas.height;
    const gap = width / this.#barCount;
    const barWidth = gap * 0.55;

    this.#time += 0.016;
    ctx.clearRect(0, 0, width, height);

    this.#bars.forEach((bar, i) => {
      if (Math.random() < 0.01) bar.target = Math.random();
      const wave = (Math.sin(this.#time * bar.speed + bar.phase) + 1) / 2;
      const mix = wave * 0.6 + bar.target * 0.4;
      bar.height += (mix - bar.height) * 0.08;

      const barHeight = bar.height * height * 0.5;
      const x = i * gap + (gap - barWidth) / 2;
      const y = height - barHeight;

      const gradient = ctx.createLinearGradient(0, y, 0, height);
      const isSignal = i % 5 === 0;
      gradient.addColorStop(0, isSignal ? 'rgba(255,159,69,0.9)' : 'rgba(95,211,196,0.55)');
      gradient.addColorStop(1, 'rgba(95,211,196,0.02)');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
    });
  }

  start() {
    if (this.#reduceMotion) {
      this.#drawFrame();
      return;
    }
    const loop = () => {
      this.#drawFrame();
      this.#animationId = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    if (this.#animationId !== null) cancelAnimationFrame(this.#animationId);
  }
}

/**
 * Controls the full-screen mobile navigation overlay: open/close state,
 * toggle button, and dismissal on link click or Escape key.
 */
class MobileNavigation {
  #toggleButton;
  #menu;
  #isOpen = false;

  constructor(toggleButton, menu) {
    this.#toggleButton = toggleButton;
    this.#menu = menu;
    this.#bindEvents();
  }

  #bindEvents() {
    this.#toggleButton.addEventListener('click', () => this.toggle());
    this.#menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => this.close());
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.close();
    });
  }

  open() {
    this.#isOpen = true;
    this.#menu.classList.add('is-open');
    this.#toggleButton.setAttribute('aria-expanded', 'true');
  }

  close() {
    this.#isOpen = false;
    this.#menu.classList.remove('is-open');
    this.#toggleButton.setAttribute('aria-expanded', 'false');
  }

  toggle() {
    this.#isOpen ? this.close() : this.open();
  }
}

/**
 * Top-level application controller. Wires up each independent component
 * and keeps the visualizer sized correctly across devices, orientation
 * changes, and viewport resizes.
 */
class PortfolioApp {
  #visualizer = null;
  #resizeObserver = null;

  init() {
    this.#setupSpectrumVisualizer();
    this.#setupMobileNavigation();
  }

  #setupSpectrumVisualizer() {
    const canvas = document.getElementById('spectrum');
    const hero = document.querySelector('.hero');
    if (!canvas || !hero) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.#visualizer = new SpectrumVisualizer(canvas, hero, { barCount: 64, reduceMotion });
    this.#visualizer.resize();
    this.#visualizer.start();

    if ('ResizeObserver' in window) {
      this.#resizeObserver = new ResizeObserver(() => this.#visualizer.resize());
      this.#resizeObserver.observe(hero);
    } else {
      window.addEventListener('resize', () => this.#visualizer.resize());
    }
    window.addEventListener('orientationchange', () => this.#visualizer.resize());
  }

  #setupMobileNavigation() {
    const toggleButton = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    if (toggleButton && menu) new MobileNavigation(toggleButton, menu);
  }
}

document.addEventListener('DOMContentLoaded', () => new PortfolioApp().init());
