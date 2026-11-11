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
  const clean = (d) => d.replace(/\s*(Три подкомитета|Подкомитеты|Three subcommittees|Subcommittees):$/, '');
  const EN = document.documentElement.lang === 'en', T = (ru, en) => (EN ? en : ru);
  /* ---------- плавная прокрутка ---------- */
  let lenis = null;
  if (window.Lenis && !reduce && !qy) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
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
  /* переключатель языка — выпадашка в стиле меню */
  $$('.lsw').forEach((lsw) => {
    let lT; const lBtn = $('.lsw__btn', lsw);
    const lSet = (o) => { lsw.classList.toggle('is-open', o); lBtn.setAttribute('aria-expanded', o); };
    lsw.addEventListener('mouseenter', () => { if (fine) { clearTimeout(lT); lSet(true); } });
    lsw.addEventListener('mouseleave', () => { if (fine) lT = setTimeout(() => lSet(false), 200); });
    lBtn.addEventListener('click', () => lSet(!lsw.classList.contains('is-open')));
    document.addEventListener('click', (e) => { if (!lsw.contains(e.target)) lSet(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lSet(false); });
  });
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
    <a href="#" class="pc rv" style="--i:${Math.min(i, 3)}">
      <span class="pc__ph">${pic(p.img, p.t)}</span>
      <span class="pc__tag">${p.tag}</span>
      <i class="pc__go">${arUp}</i>
      <span class="pc__b"><h3>${p.t}</h3><p>${p.d}</p></span>
    </a>`).join('');

  /* ---------- комитеты: слайдер ---------- */
  $('#comGrid').innerHTML = D.committees.map((c, i) => `
    <a href="#" class="cc rv" style="--i:${Math.min(i, 3)}">
      <span class="cc__ph">${pic(c.img, c.t)}<span class="cc__n">${n2(i)}</span></span>
      <i class="cc__ic">${icon(c.k)}</i>
      <span class="cc__b"><small>${c.sub ? c.sub.join(' · ') : T('Комитет', 'Committee')}</small><h3>${c.t}</h3><p>${clean(c.d).replace(/\.$/, '')}</p><span class="nc__more">${T('Подробнее', 'Read more')}<i>${arUp}</i></span></span>
    </a>`).join('');

  /* ---------- новости ---------- */
  $('#newsGrid').innerHTML = D.news.map((n, i) => `
    <a href="#" class="nc rv" style="--i:${Math.min(i, 3)}">
      <span class="nc__ph">${pic(n.img, n.t)}<span class="nc__dt">${n.dt}</span></span>
      <span class="nc__b"><span class="nc__c">${n.c}</span><h3>${n.t}</h3><p>${n.d}</p><span class="nc__more">${T('Подробнее', 'Read more')}<i>${arUp}</i></span></span>
    </a>`).join('');

  /* адаптив слайдеров: ссылка «Все …» — к таблетке, стрелки — под карточками по бокам точек */
  const mobMQ = matchMedia('(max-width: 720px)');
  const sliderHeads = $$('.head__side').map((side) => {
    const head = side.closest('.head'), chip = $('.chip', head), link = $('.alink', side), nav = $('.sl-nav', side);
    const btns = $$('button', nav), sl = $(`#${btns[0].dataset.sl}`), dots = $(`.sl-dots[data-for="${sl.id}"]`);
    const row = document.createElement('div'); row.className = 'head__row';
    const bar = document.createElement('div'); bar.className = 'sl-bar';
    return { side, chip, link, nav, btns, dots, row, bar };
  });
  function placeSliderCtrls() {
    sliderHeads.forEach(({ side, chip, link, nav, btns, dots, row, bar }) => {
      if (mobMQ.matches) {
        if (!row.isConnected) { chip.before(row); row.append(chip, link); }
        if (!bar.isConnected) { dots.before(bar); bar.append(btns[0], dots, btns[1]); }
      } else {
        if (row.isConnected) { row.before(chip); side.prepend(link); row.remove(); }
        if (bar.isConnected) { bar.before(dots); nav.append(...btns); bar.remove(); }
      }
    });
  }
  placeSliderCtrls();
  mobMQ.addEventListener('change', placeSliderCtrls);

  /* слайдеры проектов и новостей */
  $$('.slider').forEach((sl) => {
    const btns = $$(`[data-sl="${sl.id}"]`);
    const step = () => { const c = sl.firstElementChild; return c ? c.offsetWidth + parseFloat(getComputedStyle(sl).columnGap || 18) : sl.clientWidth; };
    const dots = $(`.sl-dots[data-for="${sl.id}"]`);
    let pages = 0;
    const build = () => {
      const st = step(), n = Math.max(1, sl.children.length - Math.round((sl.clientWidth + 18) / st) + 1);
      if (n === pages) return;
      pages = n;
      dots.innerHTML = Array.from({ length: n }, (_, i) => `<button aria-label="${T('Слайд', 'Slide')} ${i + 1}" data-i="${i}"></button>`).join('');
      dots.hidden = n < 2;
    };
    const upd = () => {
      const max = sl.scrollWidth - sl.clientWidth - 2;
      btns.forEach((b) => { b.disabled = b.dataset.dir < 0 ? sl.scrollLeft <= 2 : sl.scrollLeft >= max; });
      const cur = sl.scrollLeft >= max ? pages - 1 : Math.round(sl.scrollLeft / step());
      $$('button', dots).forEach((d, i) => d.classList.toggle('is-on', i === cur));
    };
    btns.forEach((b) => b.addEventListener('click', () => sl.scrollBy({ left: step() * b.dataset.dir, behavior: 'smooth' })));
    dots.addEventListener('click', (e) => { const d = e.target.closest('button'); if (d) sl.scrollTo({ left: step() * d.dataset.i, behavior: 'smooth' }); });
    sl.addEventListener('scroll', upd, { passive: true });
    addEventListener('resize', () => { build(); upd(); });
    build(); upd();
  });

  /* ---------- партнёры ---------- */
  const marks = ['<path d="M3 14c3-3 6-3 9 0s6 3 9 0"/><path d="M3 9c3-3 6-3 9 0s6 3 9 0"/>', '<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/>', '<path d="M12 3v15M7 8h10M5 14a7 7 0 0 0 14 0"/>', '<path d="M4 18 12 5l8 13z"/><path d="M8 18l4-6 4 6"/>', '<path d="M3 12c4-6 14-6 18 0-4 6-14 6-18 0z"/><circle cx="16" cy="12" r="1.5"/>', '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 15c2-4 6-4 8 0"/>'];
  const half = Math.ceil(D.partners.length / 2);
  [[$('#mq1'), D.partners.slice(0, half)], [$('#mq2'), D.partners.slice(half)]].forEach(([el, arr]) => {
    const h = arr.map((p, i) => `<span class="plogo"><svg viewBox="0 0 24 24">${marks[i % marks.length]}</svg>${p}</span>`).join('');
    $('.mq__track', el).innerHTML = `<div class="mq__set">${h}</div><div class="mq__set" aria-hidden="true">${h}</div>`;
  });

  /* ---------- баннер ---------- */
  const hero = $('#hero'), slides = $$('.hero__slide'), texts = $$('.hero__t'), ghosts = $$('.hero__ghost span'), bars = $$('#heroBars button');
  const heroImgs = ['hero-1v2', 'hero-2v2', 'hero-3v2'], heroTitles = texts.map((t) => $('h1', t).textContent);
  let cur = 0, timer, paused = false;
  function go(n) {
    cur = (n + slides.length) % slides.length;
    [slides, texts, ghosts, bars].forEach((arr) => arr.forEach((el, i) => el.classList.toggle('is-on', i === cur)));
    $('#heroNum').textContent = n2(cur);
    $('#heroCta').textContent = (EN ? ['Join WDC', 'Take part', 'Read the story'] : ['Вступить в WDC', 'Принять участие', 'Читать репортаж'])[cur];
    $('#heroCta').parentElement.dataset.modal = ['join', 'cup', ''][cur];
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
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -40px 0px', threshold: 0 });
  $$('.rv').forEach((el) => io.observe(el));

  /* ---------- счётчики ---------- */
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, EN ? ',' : ' ');
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
    const locImg = (o) => 'img/loc/loc-' + String(D.offices.indexOf(o) + 1).padStart(2, '0') + '.webp';
    const all = topojson.feature(WORLD, WORLD.objects.countries);
    all.features = all.features.filter((f) => f.id !== '010');
    const proj = d3.geoNaturalEarth1().fitExtent([[8, 8], [W - 8, H - 8]], all), path = d3.geoPath(proj), mem = new Set(D.members);
    svg.html(`<defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EAD8B0"/><stop offset=".55" stop-color="#CFAE72"/><stop offset="1" stop-color="#A3834E"/></linearGradient><radialGradient id="pinGlow"><stop offset="0" stop-color="#9CC4FF" stop-opacity=".9"/><stop offset="1" stop-color="#9CC4FF" stop-opacity="0"/></radialGradient></defs>`);
    svg.append('path').attr('class', 'map__grat').attr('d', path(d3.geoGraticule10()));
    svg.append('g').selectAll('path').data(all.features).join('path').attr('d', path).attr('class', (f) => 'map__c' + (mem.has(f.id) ? ' is-mem' : ''));
    const pins = svg.append('g').selectAll('g').data(D.offices).join('g').attr('class', 'pin').attr('tabindex', 0).attr('role', 'button').attr('aria-label', (o) => `${o.city}, ${o.c}`)
      .attr('transform', (o) => { const [x, y] = proj(o.ll); o.x = x; o.y = y; return `translate(${x.toFixed(1)} ${y.toFixed(1)})`; });
    pins.append('circle').attr('class', 'pin__glow').attr('r', 14);
    pins.append('circle').attr('class', 'pin__ring').attr('r', 6).style('animation-delay', (o, i) => `${(-i * 0.37) % 3}s`);
    pins.append('circle').attr('class', 'pin__dot').attr('r', 3.6);
    const stage = $('#geoStage'), card = $('#mapCard'), pan = $('#geoPan'), hint = $('.geo__hint');
    pan.appendChild(card); // карточка не масштабируется вместе с картой
    /* планшет и телефон: карта увеличивается двумя пальцами и двигается одним */
    const zoomMQ = matchMedia('(max-width: 1060px)');
    const Z = { s: 1, tx: 0, ty: 0 }, S_MIN = 1, S_MAX = 6;
    const regionX = { all: .56, eu: .53, as: .7, af: .53, am: .28, oc: .84 };
    const sizeW = () => stage.clientWidth, sizeH = () => stage.clientHeight;
    function applyZ(anim) {
      Z.s = Math.min(S_MAX, Math.max(S_MIN, Z.s));
      const vw = zoomMQ.matches ? pan.clientWidth : sizeW(), vh = zoomMQ.matches ? pan.clientHeight : sizeH(), w = sizeW() * Z.s, h = sizeH() * Z.s;
      Z.tx = w <= vw ? (vw - w) / 2 : Math.min(0, Math.max(vw - w, Z.tx));
      Z.ty = h <= vh ? (vh - h) / 2 : Math.min(0, Math.max(vh - h, Z.ty));
      stage.classList.toggle('is-anim', !!anim);
      stage.style.transform = !zoomMQ.matches && Z.s === 1 ? '' : `translate(${Z.tx}px, ${Z.ty}px) scale(${Z.s})`;
      pan.classList.toggle('is-zoomed', Z.s > 1.01);
    }
    function zoomAt(ns, cx, cy, anim) {
      const k = Math.min(S_MAX, Math.max(S_MIN, ns)) / Z.s;
      Z.tx = cx - (cx - Z.tx) * k; Z.ty = cy - (cy - Z.ty) * k; Z.s *= k; applyZ(anim);
    }
    function centerOn(fx, fy, anim) {
      if (!zoomMQ.matches) return;
      Z.tx = pan.clientWidth / 2 - fx * sizeW() * Z.s; Z.ty = pan.clientHeight / 2 - fy * sizeH() * Z.s; applyZ(anim);
    }
    const panTo = (fx, fy = .42) => centerOn(fx, fy, true);
    function resetZ() {
      if (zoomMQ.matches) { Z.s = pan.clientHeight / sizeH() * 1.15; centerOn(regionX.all, .42, false); } else { Z.s = 1; Z.tx = Z.ty = 0; applyZ(false); }
    }
    requestAnimationFrame(resetZ);
    zoomMQ.addEventListener('change', resetZ);
    $$('#mapTabs button').forEach((b) => b.addEventListener('click', () => panTo(regionX[b.dataset.r] || .5)));
    // жесты: один палец двигает, два — увеличивают
    const pts = new Map(); let g0 = null, moved = 0;
    const local = (e) => { const r = pan.getBoundingClientRect(); return [e.clientX - r.left - stage.offsetLeft, e.clientY - r.top - stage.offsetTop]; };
    const gesture = () => {
      const p = [...pts.values()];
      if (p.length === 1) return { x: p[0][0], y: p[0][1], d: 0 };
      return { x: (p[0][0] + p[1][0]) / 2, y: (p[0][1] + p[1][1]) / 2, d: Math.hypot(p[0][0] - p[1][0], p[0][1] - p[1][1]) };
    };
    const snap = () => { g0 = { ...gesture(), s: Z.s, tx: Z.tx, ty: Z.ty }; };
    pan.addEventListener('pointerdown', (e) => {
      if (!zoomMQ.matches || e.pointerType === 'mouse' || e.target.closest('.geo__card, .geo__zoom')) return;
      pts.set(e.pointerId, local(e)); snap(); if (pts.size === 1) moved = 0;
      hint && hint.classList.add('is-off');
    });
    pan.addEventListener('pointermove', (e) => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, local(e)); const g = gesture(); moved += 1;
      if (pts.size >= 2 && g0.d) {
        const ns = Math.min(S_MAX, Math.max(S_MIN, g0.s * g.d / g0.d)), k = ns / g0.s;
        Z.s = ns; Z.tx = g.x - (g0.x - g0.tx) * k; Z.ty = g.y - (g0.y - g0.ty) * k;
      } else { Z.tx = g0.tx + g.x - g0.x; Z.ty = g0.ty + g.y - g0.y; }
      applyZ(false);
    });
    // iOS Safari: не даём щипку масштабировать всю страницу поверх карты
    ['gesturestart', 'gesturechange'].forEach((t) => pan.addEventListener(t, (e) => { if (zoomMQ.matches) e.preventDefault(); }));
    pan.addEventListener('touchmove', (e) => { if (zoomMQ.matches && e.touches.length > 1) e.preventDefault(); }, { passive: false });
    const up = (e) => { if (pts.delete(e.pointerId) && pts.size) snap(); };
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((t) => pan.addEventListener(t, up));
    pan.addEventListener('click', (e) => { if (moved > 4) { e.stopPropagation(); e.preventDefault(); moved = 0; } }, true);
    $$('.geo__zoom button').forEach((b) => b.addEventListener('click', () => { zoomAt(Z.s * (b.dataset.z > 0 ? 1.6 : 1 / 1.6), pan.clientWidth / 2, pan.clientHeight / 2, true); hint && hint.classList.add('is-off'); }));
    function open(o, el) {
      $$('.pin.is-active').forEach((p) => p.classList.remove('is-active')); el.classList.add('is-active');
      $('#mcCountry').textContent = o.c; $('#mcCity').textContent = o.city; $('#mcText').textContent = o.t; $('#mcImg').src = locImg(o);
      card.hidden = false;
      const fx = o.x / W, fy = o.y / H;
      if (zoomMQ.matches) { if (Z.s < 2) Z.s = 2.4; centerOn(fx, Math.max(.35, fy), true); }
      const pw = pan.clientWidth, sx = stage.offsetLeft + Z.tx + fx * sizeW() * Z.s, sy = stage.offsetTop + Z.ty + fy * sizeH() * Z.s, cw = card.offsetWidth, ch = card.offsetHeight;
      let top = sy - ch - 18; if (top < 0) top = sy + 18;
      if (zoomMQ.matches) { card.style.left = card.style.top = ''; } else { card.style.left = Math.max(8, Math.min(pw - cw - 8, sx - cw / 2)) + 'px'; card.style.top = top + 'px'; }
      card.classList.remove('is-show'); void card.offsetWidth; card.classList.add('is-show');
    }
    const pinOf = (o) => pins.filter((d) => d === o).node();
    pins.on('click', function (e, o) { open(o, this); }).on('keydown', function (e, o) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(o, this); } });
    $('#mcClose').addEventListener('click', () => { card.hidden = true; $$('.pin.is-active').forEach((p) => p.classList.remove('is-active')); });
    // открытые превью нескольких локаций (с крестиком — можно закрыть и увидеть точки за ними)
    const featIdx = [20, 3, 30, 25]; // Дахаб, Байкал, Кэрнс, Канкун
    const thumbs = featIdx.map((k, i) => {
      const o = D.offices[k], el = document.createElement('div');
      el.className = 'geo__thumb geo__thumb--' + i; el.dataset.r = o.r;
      el.style.left = (o.x / W * 100) + '%'; el.style.top = (o.y / H * 100) + '%';
      el.innerHTML = `<button class="geo__thumb-open" aria-label="${o.city}"><span class="geo__thumb-ph"><img src="${locImg(o)}" alt="" loading="lazy"></span><span class="geo__thumb-cap">${o.city.split(' · ').pop()}</span></button><button class="geo__thumb-x" aria-label="${T('Скрыть фото', 'Hide photo')}"><svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7 7 17"/></svg></button>`;
      $('.geo__thumb-open', el).addEventListener('click', () => open(o, pinOf(o)));
      $('.geo__thumb-x', el).addEventListener('click', (e) => { e.stopPropagation(); el.classList.add('is-closed'); });
      stage.appendChild(el); return el;
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
    // стрелки у списка городов
    const glBtns = $$('[data-gl]');
    const glUpd = () => { const max = list.scrollWidth - list.clientWidth - 2; glBtns.forEach((b) => { b.disabled = b.dataset.gl < 0 ? list.scrollLeft <= 2 : list.scrollLeft >= max; }); };
    glBtns.forEach((b) => b.addEventListener('click', () => list.scrollBy({ left: b.dataset.gl * list.clientWidth * 0.7, behavior: 'smooth' })));
    list.addEventListener('scroll', glUpd, { passive: true });
    addEventListener('resize', glUpd);
    $$('#mapTabs button').forEach((b) => b.addEventListener('click', () => requestAnimationFrame(glUpd)));
    setRegion('all'); glUpd();
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
      const on = tabBtns[people[at].li]; if (on && tabs.scrollWidth > tabs.clientWidth) tabs.scrollTo({ left: on.offsetLeft - (tabs.clientWidth - on.offsetWidth) / 2, behavior: 'smooth' });
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

  /* ---------- винтажный компас: блок миссии и подвал ---------- */
  [[document.getElementById('compass'), '#B3A493', 'cpHatch', false], [document.querySelector('.compass--ft'), '#4E6B8C', 'cpHatchFt', true]].forEach(([box, hatch, hid, noRays]) => { if (box) compass(box, hatch, hid, noRays); });
  function compass(box, hatchColor, hatchId, noRays) {
    const C = 400, f = (n) => n.toFixed(1), pt = (r, a) => [C + r * Math.sin(a * Math.PI / 180), C - r * Math.cos(a * Math.PI / 180)];
    let s = '';
    // контуры «карты» и острова
    s += `<g class="cp-map">
      <path d="M470 120c30-18 70-10 96 8 22 15 30 40 58 46 30 6 52-12 78 2 20 12 22 38 8 58-12 18-38 22-44 44-7 26 14 52 4 78-10 24-40 30-64 22-22-8-36-30-60-30-30 0-44 30-72 34-24 3-44-14-50-36-6-20 6-40 0-60-7-22-34-32-38-56-4-26 18-50 44-60 14-6 26-8 40-18z"/>
      <path d="M560 520c24-10 52-6 72 10 18 14 20 40 40 52 22 13 52 4 70 22 16 16 10 44-8 58-20 16-50 10-72 22-20 11-30 36-54 40-26 4-48-16-56-40-7-22 4-46-6-66-9-18-32-26-34-46-2-22 18-44 48-52z"/>
      <path d="M120 40c18-8 40-4 52 10 10 12 8 30 20 40 14 12 38 6 48 22 8 14-2 32-18 36-20 5-38-8-58-4-18 4-30 22-48 18-18-4-26-24-22-42 3-16 18-24 18-40 0-14-8-30 8-40z"/>
      <path d="M300 690c20-6 42 0 56 14 12 12 14 30 30 38 18 9 40 2 52 18 10 14 2 34-16 40-20 7-40-6-60-4-22 2-38 20-60 16-20-4-30-26-24-44 5-16 20-26 20-42 0-16-14-30 2-36z"/>
      <g class="cp-dots">${Array.from({ length: 46 }, (_, i) => { const a = i * 137.5, r = 180 + (i * 53) % 330, [x, y] = pt(r, a); return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(2 + (i % 4))}" ry="${f(1.2 + (i % 3) * 0.6)}" transform="rotate(${(i * 29) % 180} ${f(x)} ${f(y)})"/>`; }).join('')}</g>
    </g>`;
    // длинные лучи
    if (!noRays) s += `<g class="cp-rays">${[-28, 22, 64, 98, 152, 205, 248].map((a) => { const [x, y] = pt(760, a); return `<line x1="${C}" y1="${C}" x2="${f(x)}" y2="${f(y)}"/>`; }).join('')}</g>`;
    // кольца и деления
    s += `<g class="cp-ring"><circle cx="${C}" cy="${C}" r="232"/><circle cx="${C}" cy="${C}" r="222"/><circle cx="${C}" cy="${C}" r="176"/><circle cx="${C}" cy="${C}" r="168" stroke-dasharray="2 7"/><circle cx="${C}" cy="${C}" r="96"/>`;
    for (let a = 0; a < 360; a += 5) { const big = a % 45 === 0, [x1, y1] = pt(222, a), [x2, y2] = pt(big ? 204 : a % 15 === 0 ? 212 : 216, a); s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`; }
    for (let a = 11.25; a < 360; a += 22.5) { const [x1, y1] = pt(176, a), [x2, y2] = pt(198, a), [hx, hy] = pt(204, a), [lx, ly] = pt(194, a - 1.6), [rx, ry] = pt(194, a + 1.6); s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/><path d="M${f(lx)} ${f(ly)}L${f(hx)} ${f(hy)}L${f(rx)} ${f(ry)}"/>`; }
    s += '</g>';
    // роза ветров со штриховкой
    let star = '';
    const ray = (a, len, w) => {
      const [tx, ty] = pt(len, a), [lx, ly] = pt(w, a - 45), [rx, ry] = pt(w, a + 45);
      return `<path class="cp-hatch" d="M${C} ${C}L${f(tx)} ${f(ty)}L${f(lx)} ${f(ly)}Z"/><path class="cp-blank" d="M${C} ${C}L${f(tx)} ${f(ty)}L${f(rx)} ${f(ry)}Z"/>`;
    };
    [45, 135, 225, 315].forEach((a) => { star += ray(a, 150, 30); });
    [0, 90, 180, 270].forEach((a) => { star += ray(a, 250, 40); });
    star += `<circle class="cp-blank" cx="${C}" cy="${C}" r="12"/><circle cx="${C}" cy="${C}" r="4"/>`;
    s += `<g class="cp-star">${star}</g>`;
    // подписи сторон света
    const lbl = (t, r, a, cls) => { const [x, y] = pt(r, a); return `<text class="${cls}" x="${f(x)}" y="${f(y)}" transform="rotate(${a} ${f(x)} ${f(y)})">${t}</text>`; };
    s += `<g class="cp-txt">${lbl('N', 262, 0, 'cp-big')}${lbl('E', 262, 90, 'cp-big')}${lbl('S', 262, 180, 'cp-big')}${lbl('W', 262, 270, 'cp-big')}${lbl('ne', 188, 45, 'cp-sm')}${lbl('se', 188, 135, 'cp-sm')}${lbl('sw', 188, 225, 'cp-sm')}${lbl('nw', 188, 315, 'cp-sm')}</g>`;
    box.innerHTML = `<svg viewBox="0 0 800 800"><defs><pattern id="${hatchId}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="5" stroke="${hatchColor}" stroke-width="1.1"/></pattern></defs>${s.replace(/class="cp-hatch"/g, `class="cp-hatch" fill="url(#${hatchId})"`)}</svg>`;
    // роза плавно поворачивается при прокрутке
    const rose = box.querySelector('.cp-star');
    if (!reduce && !qy) {
      let target = 0, curA = 0;
      addEventListener('scroll', () => { target = (scrollY - box.parentElement.offsetTop) * 0.04; }, { passive: true });
      (function spin() { curA += (target - curA) * 0.06; rose.style.transform = `rotate(${curA.toFixed(2)}deg)`; requestAnimationFrame(spin); })();
    }
  }

  /* ---------- шапка, глубина, параллакс ---------- */
  const toTop = document.getElementById('toTop');
  toTop.addEventListener('click', () => { lenis ? lenis.scrollTo(0, { duration: 1.6 }) : scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  const hd = $('#hd'), pill = $('#depthPill'), dv = $('#depthV'), slidesBox = $('.hero__slides'), secs = $$('[data-depth]');
  let lastY = 0;
  function onScroll() {
    const y = scrollY, hh = hero.offsetHeight;
    hd.classList.toggle('is-solid', y > 40);
    lastY = y;
    if (!reduce && y < hh) slidesBox.style.transform = `translate3d(0, ${(y * 0.25).toFixed(1)}px, 0)`;
    pill.classList.toggle('is-on', y > hh * 0.6 && y + innerHeight < document.documentElement.scrollHeight - 90);
    toTop.classList.toggle('is-on', y > hh * 0.8);
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
