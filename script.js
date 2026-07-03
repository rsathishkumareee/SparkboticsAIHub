// =========================================================
// SPARKBOTICS AI HUB — interactions
// =========================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- sticky nav background on scroll ---------- */
const nav = document.getElementById('siteNav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.textContent = open ? '✕' : '☰';
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    navToggle.textContent = '☰';
  });
});

/* ---------- scroll-reveal ---------- */
const revealTargets = document.querySelectorAll(
  '.section-head, .about-fact, .course-card, .faculty-card, .testi-card, .contact-info-item, .form, .location-box'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => io.observe(el));

/* ---------- testimonial carousel controls ---------- */
const track = document.getElementById('testiTrack');
const prevBtn = document.getElementById('testiPrev');
const nextBtn = document.getElementById('testiNext');
const scrollAmount = () => (track.querySelector('.testi-card')?.offsetWidth || 320) + 22;

prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));

/* ---------- course category filter ---------- */
const filterBar = document.getElementById('filterBar');
if (filterBar) {
  const filterBtns = filterBar.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('#courseGrid .course-card');
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const filter = btn.dataset.filter;
    courseCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
}

/* ---------- poster lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || 'Poster';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.course-poster[data-poster]').forEach(btn => {
  btn.addEventListener('click', () => openLightbox(btn.dataset.poster, btn.dataset.alt));
});
const heroPosterBtn = document.getElementById('heroPosterBtn');
if (heroPosterBtn) {
  heroPosterBtn.addEventListener('click', () => {
    const img = heroPosterBtn.querySelector('img');
    openLightbox(img.src, img.alt);
  });
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

/* ---------- contact form (front-end only demo) ---------- */
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  success.classList.add('show');
  form.reset();
  setTimeout(() => success.classList.remove('show'), 6000);
});

/* ---------- hero signature element: circuit / neural-network fusion ---------- */
(function buildHeroNetwork() {
  const svg = document.querySelector('.hero-net');
  if (!svg) return;
  const edgeGroup = document.getElementById('netEdges');
  const nodeGroup = document.getElementById('netNodes');
  const W = 1200, H = 800;
  const NODE_COUNT = 22;
  const nodes = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      big: Math.random() > 0.8
    });
  }

  // connect each node to its 2 nearest neighbours to form a plausible network
  const edges = [];
  nodes.forEach((n, i) => {
    const dists = nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter(o => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    dists.forEach(o => {
      const key = [i, o.j].sort().join('-');
      if (!edges.find(e => e.key === key)) edges.push({ key, a: nodes[i], b: nodes[o.j] });
    });
  });

  const ns = 'http://www.w3.org/2000/svg';
  edges.forEach(({ a, b }) => {
    const path = document.createElementNS(ns, 'path');
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - 30;
    path.setAttribute('d', `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`);
    path.setAttribute('class', 'edge');
    edgeGroup.appendChild(path);
  });

  nodes.forEach((n) => {
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', n.x);
    c.setAttribute('cy', n.y);
    c.setAttribute('r', n.big ? 4 : 2.2);
    c.setAttribute('class', 'node' + (Math.random() > 0.6 ? ' node--g' : ''));
    nodeGroup.appendChild(c);
  });

  // traveling pulses along a few random edges
  if (edges.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const pulseCount = Math.min(5, edges.length);
    for (let i = 0; i < pulseCount; i++) {
      const e = edges[Math.floor(Math.random() * edges.length)];
      const pulse = document.createElementNS(ns, 'circle');
      pulse.setAttribute('r', 3);
      pulse.setAttribute('class', 'pulse');
      const animate = document.createElementNS(ns, 'animateMotion');
      animate.setAttribute('dur', (4 + Math.random() * 4).toFixed(1) + 's');
      animate.setAttribute('repeatCount', 'indefinite');
      animate.setAttribute('path', `M${e.a.x},${e.a.y} Q${(e.a.x + e.b.x) / 2},${(e.a.y + e.b.y) / 2 - 30} ${e.b.x},${e.b.y}`);
      pulse.appendChild(animate);
      nodeGroup.appendChild(pulse);
    }
  }
})();
