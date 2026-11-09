/* WDC — главная, версия 2: поведение */
(function () {
  const D = window.WDC, $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const qy = +new URLSearchParams(location.search).get('y'); // предпросмотр для проверки вёрстки
  const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${D.icons[k]}</svg>`;
  const pic = (n, alt) => `<img src="img/${n}.jpg" alt="${alt || ''}" loading="${qy ? 'eager' : 'lazy'}" decoding="async">`;
  const arUp = '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>';
  const n2 = (i) => String(i + 1).padStart(2, '0');
  const clean = (d) => d.replace(/\s*(Три подкомитета|Подкомитеты):$/, '');

  /* ---------- плавная прокрутка ---------- */
  let lenis = null;
  if (window.Lenis && !reduce && !qy) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = $(id); if (!t) return;
    e.preventDefault(); closeMenu();
    lenis ? lenis.scrollTo(t, { offset: -20 }) : t.scrollIntoView({ behavior: 'smooth' });
  }));

  /* ---------- меню ---------- */
  $('#ddGrid').innerHTML = D.committees.map((c) => `<a href="#"><i>${icon(c.k)}</i><span><b>${c.t}</b>${c.sub ? `<small>${c.sub.join(' · ')}</small>` : ''}</span></a>`).join('');
  $('#mmSub').innerHTML = D.committees.map((c) => `<a href="#">${icon(c.k)}${c.t}</a>`).join('');
  const dd = $('.dd'); let ddT;
  const ddSet = (o) => { dd.classList.toggle('is-open', o); $('.dd__btn').setAttribute('aria-expanded', o); };
  dd.addEventListener('mouseenter', () => { clearTimeout(ddT); ddSet(true); });
  dd.addEventListener('mouseleave', () => { ddT = setTimeout(() => ddSet(false), 200); });
  $('.dd__btn').addEventListener('click', () => ddSet(!dd.classList.contains('is-open')));
  const burger = $('#burger'), mm = $('#mm');
  function closeMenu() { document.body.classList.remove('mm-open'); burger.setAttribute('aria-expanded', false); mm.setAttribute('aria-hidden', true); lenis && lenis.start(); }
  burger.addEventListener('click', () => {
    const o = !document.body.classList.contains('mm-open');
    if (!o) return closeMenu();
    document.body.classList.add('mm-open'); burger.setAttribute('aria-expanded', true); mm.setAttribute('aria-hidden', false); lenis && lenis.stop();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { ddSet(false); closeMenu(); } });

  /* ---------- проекты ---------- */
  $('#projGrid').innerHTML = D.projects.map((p, i) => `
    <a href="#" class="pc rv${i > 3 ? ' is-hidden' : ''}" style="--i:${i % 4}">
      <span class="pc__ph">${pic(p.img, p.t)}</span>
      <span class="pc__tag">${p.tag}</span>
      <i class="pc__go">${arUp}</i>
      <span class="pc__b"><h3>${p.t}</h3><p>${p.d}</p></span>
    </a>`).join('');

  /* ---------- комитеты: мозаика ---------- */
  const mosaic = $('#mosaic');
  const tiles = D.committees.map((c, t) => {
    const cell = t + 2, photo = (Math.floor(cell / 4) + cell % 4) % 2 === 0;
    return `<a href="#" class="mt mt--${photo ? 'photo' : 'line'} rv" style="--i:${cell % 4}">
      <span class="mt__ph">${pic(c.img, c.t)}</span>
      <span class="mt__n">${n2(t)}</span>
      <span class="mt__ic">${icon(c.k)}</span>
      <span class="mt__t"><b>${c.t}</b>${c.sub ? `<small>${c.sub.join(' · ')}</small>` : ''}<span class="mt__d">${clean(c.d)}</span></span>
    </a>`;
  }).join('');
  mosaic.insertAdjacentHTML('beforeend', tiles + `
    <div class="mt mt--brand rv" style="--i:3">
      <svg class="brand__mark" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M9 27c4-3 7-3 10 0s6 3 10 0 7-3 10 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M24 6v13M19 13l5-7 5 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span><b>Найдите свой комитет</b><a href="#" class="link">Все комитеты <i>${arUp}</i></a></span>
    </div>`);

  /* ---------- новости ---------- */
  const comByName = (c) => (D.committees.find((x) => c.toLowerCase().includes(x.t.toLowerCase().slice(0, 6))) || D.committees[0]).k;
  $('#newsGrid').innerHTML = D.news.map((n, i) => `
    <a href="#" class="nc rv${i > 3 ? ' is-hidden' : ''}" style="--i:${i % 4}">
      <span class="nc__ph">${pic(n.img, n.t)}<i class="nc__ic">${icon(comByName(n.c))}</i><span class="nc__dt">${n.dt}</span></span>
      <span class="nc__b"><span class="nc__c">${n.c}</span><h3>${n.t}</h3><p>${n.d}</p><span class="nc__more">Подробнее<i>${arUp}</i></span></span>
    </a>`).join('');

  function more(btn, grid, text) {
    btn.addEventListener('click', () => {
      const hidden = $$('.is-hidden', grid);
      hidden.slice(0, 4).forEach((el, i) => { el.classList.remove('is-hidden', 'is-in'); setTimeout(() => el.classList.add('is-in'), 40 + i * 100); });
      if (hidden.length <= 4) { const a = document.createElement('a'); a.href = '#'; a.className = btn.className; a.innerHTML = `${text} <i class="btn__ar">${arUp}</i>`; btn.replaceWith(a); }
      lenis && lenis.resize();
    });
  }
  more($('#projMore'), $('#projGrid'), 'Все проекты');
  more($('#newsMore'), $('#newsGrid'), 'Все новости');

  /* ---------- партнёры ---------- */
  const marks = ['<path d="M3 14c3-3 6-3 9 0s6 3 9 0"/><path d="M3 9c3-3 6-3 9 0s6 3 9 0"/>', '<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/>', '<path d="M12 3v15M7 8h10M5 14a7 7 0 0 0 14 0"/>', '<path d="M4 18 12 5l8 13z"/><path d="M8 18l4-6 4 6"/>', '<path d="M3 12c4-6 14-6 18 0-4 6-14 6-18 0z"/><circle cx="16" cy="12" r="1.5"/>', '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 15c2-4 6-4 8 0"/>'];
  const half = Math.ceil(D.partners.length / 2);
  [[$('#mq1'), D.partners.slice(0, half)], [$('#mq2'), D.partners.slice(half)]].forEach(([el, arr]) => {
    const h = arr.map((p, i) => `<span class="plogo"><svg viewBox="0 0 24 24">${marks[i % marks.length]}</svg>${p}</span>`).join('');
    $('.mq__track', el).innerHTML = `<div class="mq__set">${h}</div><div class="mq__set" aria-hidden="true">${h}</div>`;
  });

  /* ---------- баннер ---------- */
  const hero = $('#hero'), slides = $$('.hero__slide'), texts = $$('.hero__t'), ghosts = $$('.hero__ghost span'), bars = $$('#heroBars button');
  const heroImgs = ['hero-1', 'hero-2', 'hero-3'], heroTitles = texts.map((t) => $('h1', t).textContent);
  let cur = 0, timer, paused = false;
  function go(n) {
    cur = (n + slides.length) % slides.length;
    [slides, texts, ghosts, bars].forEach((arr) => arr.forEach((el, i) => el.classList.toggle('is-on', i === cur)));
    $('#heroNum').textContent = n2(cur);
    $('#heroCta').textContent = ['Вступить в WDC', 'Принять участие', 'Читать репортаж'][cur];
    const nx = (cur + 1) % slides.length;
    $('#hnImg').src = `img/${heroImgs[nx]}.jpg`; $('#hnTitle').textContent = heroTitles[nx];
    restart();
  }
  function restart() { clearTimeout(timer); if (!paused && !reduce) timer = setTimeout(() => go(cur + 1), 7000); }
  bars.forEach((b, i) => b.addEventListener('click', () => go(i)));
  $('#heroNextCard').addEventListener('click', () => go(cur + 1));
  hero.addEventListener('mouseenter', () => { paused = true; hero.classList.add('is-paused'); clearTimeout(timer); });
  hero.addEventListener('mouseleave', () => { paused = false; hero.classList.remove('is-paused'); restart(); });
  let tx = null;
  hero.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', (e) => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); tx = null; });
  go(0);

  /* ---------- магнитные кнопки ---------- */
  if (fine && !reduce) $$('.mag').forEach((el) => {
    el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px)`; });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    el.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1), background .3s, color .3s, box-shadow .4s';
  });

  /* ---------- появление ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.rv').forEach((el) => io.observe(el));

  /* ---------- счётчики ---------- */
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    $$('[data-count]', e.target).forEach((el, k) => {
      const to = +el.dataset.count, suf = el.dataset.suffix || '', dur = 1800, t0 = performance.now() + k * 120;
      const step = (t) => { const q = Math.max(0, Math.min(1, (t - t0) / dur)), v = Math.round(to * (1 - Math.pow(1 - q, 4))); el.textContent = fmt(v) + (q === 1 ? suf : ''); if (q < 1) requestAnimationFrame(step); };
      reduce || qy ? (el.textContent = fmt(to) + suf) : requestAnimationFrame(step);
    });
  }), { threshold: 0.3 });
  cio.observe($('#stats'));

  /* ---------- карта ---------- */
  (function map() {
    if (!window.d3 || !window.topojson || !window.WORLD) return;
    const svg = d3.select('#mapSvg'), W = 1000, H = 520;
    const all = topojson.feature(WORLD, WORLD.objects.countries);
    all.features = all.features.filter((f) => f.id !== '010');
    const proj = d3.geoNaturalEarth1().fitExtent([[8, 8], [W - 8, H - 8]], all), path = d3.geoPath(proj), mem = new Set(D.members);
    svg.html(`<defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7DC8C"/><stop offset=".55" stop-color="#E2B04A"/><stop offset="1" stop-color="#B9832A"/></linearGradient><radialGradient id="pinGlow"><stop offset="0" stop-color="#8DEBDA" stop-opacity=".9"/><stop offset="1" stop-color="#8DEBDA" stop-opacity="0"/></radialGradient></defs>`);
    svg.append('path').attr('class', 'map__grat').attr('d', path(d3.geoGraticule10()));
    svg.append('g').selectAll('path').data(all.features).join('path').attr('d', path).attr('class', (f) => 'map__c' + (mem.has(f.id) ? ' is-mem' : ''));
    const pins = svg.append('g').selectAll('g').data(D.offices).join('g').attr('class', 'pin').attr('tabindex', 0).attr('role', 'button').attr('aria-label', (o) => `${o.city}, ${o.c}`)
      .attr('transform', (o) => { const [x, y] = proj(o.ll); o.x = x; o.y = y; return `translate(${x.toFixed(1)} ${y.toFixed(1)})`; });
    pins.append('circle').attr('class', 'pin__glow').attr('r', 14);
    pins.append('circle').attr('class', 'pin__ring').attr('r', 6).style('animation-delay', (o, i) => `${(-i * 0.37) % 3}s`);
    pins.append('circle').attr('class', 'pin__dot').attr('r', 3.6);
    const stage = $('#geoStage'), card = $('#mapCard');
    function open(o, el) {
      $$('.pin.is-active').forEach((p) => p.classList.remove('is-active')); el.classList.add('is-active');
      $('#mcCountry').textContent = o.c; $('#mcCity').textContent = o.city; $('#mcText').textContent = o.t; $('#mcImg').src = `img/${D.regionImg[o.r]}.jpg`;
      card.hidden = false;
      const bw = stage.clientWidth, px = o.x / W * bw, py = o.y / H * stage.clientHeight, cw = card.offsetWidth, ch = card.offsetHeight;
      let top = py - ch - 18; if (top < 0) top = py + 18;
      card.style.left = Math.max(8, Math.min(bw - cw - 8, px - cw / 2)) + 'px'; card.style.top = top + 'px';
      card.classList.remove('is-show'); void card.offsetWidth; card.classList.add('is-show');
    }
    const pinOf = (o) => pins.filter((d) => d === o).node();
    pins.on('click', function (e, o) { open(o, this); }).on('keydown', function (e, o) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(o, this); } });
    $('#mcClose').addEventListener('click', () => { card.hidden = true; $$('.pin.is-active').forEach((p) => p.classList.remove('is-active')); });
    const feat = [['Дахаб', 'p-freedive', 'Голубая дыра'], ['Иркутск · Байкал', 'p-ice', 'Байкал'], ['Кэрнс', 'p-reef', 'Барьерный риф'], ['Канкун', 'm-cenote', 'Сеноты']];
    const thumbs = feat.map(([city, im, cap], i) => {
      const o = D.offices.find((x) => x.city === city), el = document.createElement('button');
      el.className = 'geo__thumb geo__thumb--' + i; el.dataset.r = o.r;
      el.style.left = (o.x / W * 100) + '%'; el.style.top = (o.y / H * 100) + '%';
      el.innerHTML = `<span class="geo__thumb-ph">${pic(im)}</span><span class="geo__thumb-cap">${cap}</span>`;
      el.addEventListener('click', () => open(o, pinOf(o))); stage.appendChild(el); return el;
    });
    const list = $('#mapList');
    function setRegion(r) {
      $$('#mapTabs button').forEach((b) => b.classList.toggle('is-on', b.dataset.r === r));
      pins.classed('is-dim', (o) => r !== 'all' && o.r !== r);
      thumbs.forEach((t) => t.classList.toggle('is-dim', r !== 'all' && t.dataset.r !== r));
      list.innerHTML = D.offices.filter((o) => r === 'all' || o.r === r).map((o) => `<button data-i="${D.offices.indexOf(o)}">${o.city}<span>${o.c}</span></button>`).join('');
      list.scrollLeft = 0; card.hidden = true;
    }
    $$('#mapTabs button').forEach((b) => b.addEventListener('click', () => setRegion(b.dataset.r)));
    list.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; const o = D.offices[+b.dataset.i]; open(o, pinOf(o)); });
    list.addEventListener('mouseover', (e) => { const b = e.target.closest('button'); pins.classed('is-hl', (o) => b && D.offices[+b.dataset.i] === o); });
    list.addEventListener('mouseleave', () => pins.classed('is-hl', false));
    setRegion('all');
  })();

  /* ---------- лиги: карусель-«ковёр» ---------- */
  (function flow() {
    const box = $('#flow'), tabs = $('#flowTabs');
    const people = []; D.leagues.forEach((L, li) => L.people.forEach((p) => people.push({ ...p, li, L })));
    box.innerHTML = people.map((p, i) => `<div class="fc" data-i="${i}">${pic(p.img, p.n)}<div class="fc__b"><span class="fc__lg"><i>${p.L.code}</i>${p.L.country}</span><b>${p.n}</b><span class="fc__r">${p.r}</span><span class="fc__bio">${p.b}</span></div></div>`).join('');
    tabs.innerHTML = D.leagues.map((L, i) => `<button data-l="${i}"><b>${L.code}</b>${L.country}</button>`).join('');
    const cards = $$('.fc', box), tabBtns = $$('button', tabs);
    let at = 0;
    function layout() {
      const sp = innerWidth < 720 ? 150 : 240;
      cards.forEach((c, i) => {
        const n = cards.length; let d = i - at; if (d > n / 2) d -= n; if (d < -n / 2) d += n; const a = Math.abs(d), s = 1 - Math.min(a, 3) * 0.12;
        c.style.transform = `translateX(${d * sp - Math.sign(d) * Math.max(0, a - 1) * sp * 0.25}px) translateY(${Math.min(a, 3) * 14}px) scale(${s})`;
        c.style.zIndex = 20 - a; c.style.opacity = a > 3 ? 0 : 1; c.style.filter = a ? `brightness(${1 - Math.min(a, 3) * 0.17})` : 'none';
        c.style.pointerEvents = a > 3 ? 'none' : ''; c.classList.toggle('is-on', !a);
      });
      tabBtns.forEach((b, k) => b.classList.toggle('is-on', k === people[at].li));
    }
    const set = (i) => { at = ((i % people.length) + people.length) % people.length; layout(); };
    $('#flowPrev').addEventListener('click', () => set(at - 1));
    $('#flowNext').addEventListener('click', () => set(at + 1));
    tabs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) set(people.findIndex((p) => p.li === +b.dataset.l)); });
    let x0 = null, moved = false;
    box.addEventListener('pointerdown', (e) => { x0 = e.clientX; moved = false; box.classList.add('is-drag'); });
    addEventListener('pointerup', (e) => {
      if (x0 === null) return; const dx = e.clientX - x0; box.classList.remove('is-drag'); x0 = null;
      if (Math.abs(dx) > 40) { moved = true; set(at + (dx < 0 ? 1 : -1) * (Math.abs(dx) > 220 ? 2 : 1)); }
    });
    box.addEventListener('click', (e) => { if (moved) return; const c = e.target.closest('.fc'); if (c) set(+c.dataset.i); });
    box.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') set(at + 1); if (e.key === 'ArrowLeft') set(at - 1); });
    box.tabIndex = 0;
    addEventListener('resize', layout);
    set(0);
  })();

  /* ---------- шапка, глубина, параллакс ---------- */
  const hd = $('#hd'), pill = $('#depthPill'), dv = $('#depthV'), slidesBox = $('.hero__slides'), secs = $$('[data-depth]');
  let lastY = 0;
  function onScroll() {
    const y = scrollY, hh = hero.offsetHeight;
    hd.classList.toggle('is-solid', y > hh - 90);
    hd.classList.toggle('is-hidden-up', y > hh && y > lastY + 2 && !document.body.classList.contains('mm-open') && !dd.classList.contains('is-open'));
    if (y < lastY - 2) hd.classList.remove('is-hidden-up');
    lastY = y;
    if (!reduce && y < hh) slidesBox.style.transform = `translate3d(0, ${(y * 0.25).toFixed(1)}px, 0)`;
    pill.classList.toggle('is-on', y > hh * 0.6);
    const mid = y + innerHeight / 2; let d = 0;
    for (let i = 0; i < secs.length; i++) {
      const top = secs[i].offsetTop, nx = secs[i + 1], bot = nx ? nx.offsetTop : document.documentElement.scrollHeight;
      if (mid >= top && mid < bot) { const a = +secs[i].dataset.depth, b = nx ? +nx.dataset.depth : a; d = a + (b - a) * ((mid - top) / (bot - top)); break; }
    }
    dv.textContent = Math.round(d);
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  if (qy) {
    document.head.insertAdjacentHTML('beforeend', '<style>*,*::before,*::after{transition:none!important;animation-duration:0s!important;animation-delay:0s!important}</style>');
    addEventListener('load', () => { $$('.rv').forEach((e) => e.classList.add('is-in')); scrollTo({ top: qy, behavior: 'instant' }); });
  }
})();
