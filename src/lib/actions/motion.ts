/**
 * tilt3d — Svelte action
 * Applies a smooth 3D tilt effect that follows the mouse position.
 *
 * Usage:
 *   <div use:tilt3d>...</div>
 *   <div use:tilt3d={{ max: 12, scale: 1.03, glare: true }}>...</div>
 */

interface TiltOptions {
  /** Max rotation in degrees on each axis */
  max?: number;
  /** Hover scale */
  scale?: number;
  /** Glare highlight overlay */
  glare?: boolean;
  /** Disable on small screens */
  disableMobile?: boolean;
  /** Transition duration when leaving (ms) */
  resetMs?: number;
}

export function tilt3d(node: HTMLElement, options: TiltOptions = {}) {
  const opts: Required<TiltOptions> = {
    max: 10,
    scale: 1.02,
    glare: false,
    disableMobile: true,
    resetMs: 400,
    ...options
  };

  let glareEl: HTMLDivElement | null = null;
  let rafId = 0;

  if (opts.disableMobile && window.matchMedia('(hover: none)').matches) {
    return { destroy() {} };
  }
  // Désactiver sur écrans étroits ou si l'utilisateur préfère moins d'animations
  if (
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return { destroy() {} };
  }

  node.style.transformStyle = 'preserve-3d';
  node.style.transition = `transform ${opts.resetMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
  node.style.willChange = 'transform';

  if (opts.glare) {
    glareEl = document.createElement('div');
    glareEl.style.cssText = `
      position:absolute;inset:0;pointer-events:none;border-radius:inherit;
      background:radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35), transparent 60%);
      opacity:0;transition:opacity ${opts.resetMs}ms ease;mix-blend-mode:overlay;
    `;
    if (getComputedStyle(node).position === 'static') node.style.position = 'relative';
    if (getComputedStyle(node).overflow === 'visible') node.style.overflow = 'hidden';
    node.appendChild(glareEl);
  }

  function handleMove(e: MouseEvent) {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      const rx = (0.5 - py) * opts.max * 2;
      const ry = (px - 0.5) * opts.max * 2;
      node.style.transform =
        `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${opts.scale})`;
      if (glareEl) {
        glareEl.style.background =
          `radial-gradient(circle at ${(px * 100).toFixed(0)}% ${(py * 100).toFixed(0)}%, rgba(255,255,255,0.35), transparent 60%)`;
        glareEl.style.opacity = '1';
      }
    });
  }

  function handleEnter() {
    node.style.transition = 'transform 120ms ease-out';
  }

  function handleLeave() {
    cancelAnimationFrame(rafId);
    node.style.transition = `transform ${opts.resetMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    node.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    if (glareEl) glareEl.style.opacity = '0';
  }

  node.addEventListener('mousemove', handleMove);
  node.addEventListener('mouseenter', handleEnter);
  node.addEventListener('mouseleave', handleLeave);

  return {
    destroy() {
      cancelAnimationFrame(rafId);
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseenter', handleEnter);
      node.removeEventListener('mouseleave', handleLeave);
      if (glareEl && glareEl.parentNode === node) node.removeChild(glareEl);
    }
  };
}

/**
 * reveal — Svelte action
 * Adds `in-view` class when the element enters the viewport (uses IntersectionObserver).
 *
 * Usage:
 *   <div class="reveal" use:reveal>...</div>
 *   <div class="reveal-scale" use:reveal={{ delay: 200, threshold: 0.2 }}>...</div>
 */

interface RevealOptions {
  /** Delay before adding the class (ms) */
  delay?: number;
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
  /** Trigger only once (default true) */
  once?: boolean;
  /** rootMargin override */
  rootMargin?: string;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
  const opts: Required<RevealOptions> = {
    delay: 0,
    threshold: 0.12,
    once: true,
    rootMargin: '0px 0px -8% 0px',
    ...options
  };

  let timeoutId: number | undefined;

  function showInView() {
    if (opts.delay > 0) {
      timeoutId = window.setTimeout(() => node.classList.add('in-view'), opts.delay);
    } else {
      node.classList.add('in-view');
    }
    if (opts.once) observer.unobserve(node);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showInView();
        } else if (!opts.once) {
          node.classList.remove('in-view');
        }
      });
    },
    { threshold: opts.threshold, rootMargin: opts.rootMargin }
  );

  observer.observe(node);

  // Éléments déjà visibles au chargement (hero, titres au-dessus de la ligne de flottaison)
  requestAnimationFrame(() => {
    const rect = node.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (visible) showInView();
  });

  return {
    destroy() {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    }
  };
}
