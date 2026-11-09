/* WDC — главная: поведение */
(function () {
  const D = window.WDC, $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${D.icons[k]}</svg>`;
  const pic = (n, alt) => `<img src="img/${n}.jpg" alt="${alt || ''}" loading="lazy" decoding="async">`;

  /* ---------- меню комитетов ---------- */
  $('#megaGrid').innerHTML = D.committees.map((c) =>
    `<a href="#" class="mega__item">${icon(c.k)}<span><b>${c.t}</b>${c.sub ? `<small>${c.sub.join(' · ')}</small>` : ''}</span></a>`).join('');
  $('#mnavSub').innerHTML = D.committees.map((c) => `<a href="#">${icon(c.k)}${c.t}</a>`).join('');

  const dd = $('.nav__dd'), ddBtn = $('.nav__btn');
  let ddT;
  const ddSet = (o) => { dd.classList.toggle('is-open', o); ddBtn.setAttribute('aria-expanded', o); };
  dd.addEventListener('mouseenter', () => { clearTimeout(ddT); ddSet(true); });
  dd.addEventListener('mouseleave', () => { ddT = setTimeout(() => ddSet(false), 180); });
  ddBtn.addEventListener('click', () => ddSet(!dd.classList.contains('is-open')));

  const burger = $('#burger'), mnav = $('#mnav');
  const mnavSet = (o) => { document.body.classList.toggle('mnav-open', o); burger.setAttribute('aria-expanded', o); mnav.setAttribute('aria-hidden', !o); };
  burger.addEventListener('click', () => mnavSet(!document.body.classList.contains('mnav-open')));
  $$('a', mnav).forEach((a) => a.addEventListener('click', () => mnavSet(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { ddSet(false); mnavSet(false); } });

  /* ---------- проекты ---------- */
  $('#projGrid').innerHTML = D.projects.map((p, i) => `
    <article class="pcard reveal${i > 3 ? ' is-hidden' : ''}" style="--i:${i % 4}">
      <a href="#" class="pcard__a">
        <div class="pcard__ph">${pic(p.img, p.t)}</div>
        <span class="tag">${p.tag}</span>
        <div class="pcard__b"><h3>${p.t}</h3><p>${p.d}</p><span class="link-arrow link-arrow--gold">Подробнее</span></div>
      </a>
    </article>`).join('');

  /* ---------- комитеты ---------- */
  /* плитка: иконка + название, при наведении — фото и описание */
  $('#comTiles').insertAdjacentHTML('beforeend', D.committees.map((c, i) => `
    <a href="#" class="tile reveal" style="--i:${i % 5}">
      <span class="tile__ph">${pic(c.img, c.t)}</span>
      <span class="tile__n">${String(i + 1).padStart(2, '0')}</span>
      <span class="tile__ic">${icon(c.k)}</span>
      <span class="tile__b">
        <b>${c.t}</b>
        ${c.sub ? `<small>${c.sub.join(' · ')}</small>` : ''}
        <span class="tile__d">${c.d.replace(/\s*(Три подкомитета|Подкомитеты):$/, '')}</span>
      </span>
      <span class="tile__go" aria-hidden="true"></span>
    </a>`).join(''));

  /* ---------- новости ---------- */
  $('#newsGrid').innerHTML = D.news.map((n, i) => `
    <article class="ncard reveal${i > 3 ? ' is-hidden' : ''}" style="--i:${i % 4}">
      <a href="#" class="ncard__a">
        <div class="ncard__ph">${pic(n.img, n.t)}</div>
        <div class="ncard__b">
          <div class="ncard__meta"><span class="ncard__c">${n.c}</span><time>${n.dt}</time></div>
          <h3>${n.t}</h3><p>${n.d}</p>
          <span class="link-arrow">Подробнее</span>
        </div>
      </a>
    </article>`).join('');

  function moreBtn(btn, grid, allText) {
    btn.addEventListener('click', () => {
      const hidden = $$('.is-hidden', grid);
      hidden.slice(0, 4).forEach((el, i) => { el.classList.remove('is-hidden', 'is-in'); setTimeout(() => el.classList.add('is-in'), 30 + i * 90); });
      if (hidden.length <= 4) { const a = document.createElement('a'); a.href = '#'; a.className = btn.className; a.textContent = allText; btn.replaceWith(a); }
    });
  }
  moreBtn($('#projMore'), $('#projGrid'), 'Все проекты');
  moreBtn($('#newsMore'), $('#newsGrid'), 'Все новости');

  /* ---------- партнёры ---------- */
  const marks = [
    '<path d="M3 14c3-3 6-3 9 0s6 3 9 0"/><path d="M3 9c3-3 6-3 9 0s6 3 9 0"/>',
    '<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/>',
    '<path d="M12 3v15M7 8h10M5 14a7 7 0 0 0 14 0"/>',
    '<path d="M4 18 12 5l8 13z"/><path d="M8 18l4-6 4 6"/>',
    '<path d="M3 12c4-6 14-6 18 0-4 6-14 6-18 0z"/><circle cx="16" cy="12" r="1.5"/>',
    '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 15c2-4 6-4 8 0"/>',
  ];
  const pl = (arr) => arr.map((p, i) => `<span class="plogo"><svg viewBox="0 0 24 24">${marks[i % marks.length]}</svg>${p}</span>`).join('');
  const half = Math.ceil(D.partners.length / 2);
  [[$('#mq1'), D.partners.slice(0, half)], [$('#mq2'), D.partners.slice(half)]].forEach(([el, arr]) => {
    const h = pl(arr);
    $('.marquee__track', el).innerHTML = `<div class="marquee__set">${h}</div><div class="marquee__set" aria-hidden="true">${h}</div>`;
  });

  /* ---------- баннер ---------- */
  const hdr = $('#hdr'), hero = $('#hero'), slides = $$('.hero__slide'), texts = $$('.hero__txt'), dots = $$('#heroDots button');
  let cur = 0, timer, paused = false;
  function go(n) {
    cur = (n + slides.length) % slides.length;
    [slides, texts, dots].forEach((arr) => arr.forEach((el, i) => el.classList.toggle('is-active', i === cur)));
    $('#heroNum').textContent = String(cur + 1).padStart(2, '0');
    restart();
  }
  function restart() { clearTimeout(timer); if (!paused && !reduce) timer = setTimeout(() => go(cur + 1), 7000); }
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  $('#heroNext').addEventListener('click', () => go(cur + 1));
  $('#heroPrev').addEventListener('click', () => go(cur - 1));
  hero.addEventListener('mouseenter', () => { paused = true; hero.classList.add('is-paused'); clearTimeout(timer); });
  hero.addEventListener('mouseleave', () => { paused = false; hero.classList.remove('is-paused'); restart(); });
  let tx = null;
  hero.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', (e) => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); tx = null; });
  restart();

  // лёгкий параллакс фото: от мыши и при прокрутке
  let mx = 0, my = 0, ax = 0, ay = 0;
  hero.addEventListener('mousemove', (e) => { const r = hero.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - 0.5; my = (e.clientY - r.top) / r.height - 0.5; });
  const slidesBox = $('.hero__slides');
  (function loop() {
    if (reduce) return;
    ax += (mx - ax) * 0.05; ay += (my - ay) * 0.05;
    const sy = Math.min(scrollY, innerHeight) * 0.3;
    slidesBox.style.transform = `translate3d(${(-ax * 24).toFixed(1)}px, ${(sy - ay * 14).toFixed(1)}px, 0)`;
    requestAnimationFrame(loop);
  })();

  // пузыри
  (() => {
    const b = $('#heroBubbles'); let h = '';
    for (let i = 0; i < 18; i++) {
      const s = 3 + Math.random() * 9;
      h += `<i style="left:${(40 + Math.random() * 60).toFixed(1)}%;width:${s.toFixed(1)}px;height:${s.toFixed(1)}px;animation-duration:${(8 + Math.random() * 9).toFixed(1)}s;animation-delay:${(-Math.random() * 14).toFixed(1)}s;--dx:${((Math.random() - 0.5) * 50).toFixed(0)}px"></i>`;
    }
    b.innerHTML = h;
  })();

  /* ---------- появление ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  $$('.reveal').forEach((el) => io.observe(el));

  /* ---------- счётчики ---------- */
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    $$('[data-count]', e.target).forEach((el) => {
      const to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1600;
      const step = (t) => { const k = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - k, 3))); el.textContent = fmt(v) + (k === 1 ? suf : ''); if (k < 1) requestAnimationFrame(step); };
      reduce ? (el.textContent = fmt(to) + suf) : requestAnimationFrame(step);
    });
  }), { threshold: 0.3 });
  cio.observe($('#stats'));

  /* ---------- карта ---------- */
  (function map() {
    if (!window.d3 || !window.topojson || !window.WORLD) return;
    const svg = d3.select('#mapSvg'), W = 1000, H = 520;
    const all = topojson.feature(WORLD, WORLD.objects.countries);
    all.features = all.features.filter((f) => f.id !== '010');
    const proj = d3.geoNaturalEarth1().fitExtent([[8, 8], [W - 8, H - 8]], all);
    const path = d3.geoPath(proj);
    const mem = new Set(D.members);
    svg.html(`<defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7DC8C"/><stop offset=".55" stop-color="#E2B04A"/><stop offset="1" stop-color="#B9832A"/></linearGradient>
      <radialGradient id="pinGlow"><stop offset="0" stop-color="#FFE7A3" stop-opacity=".9"/><stop offset="1" stop-color="#FFE7A3" stop-opacity="0"/></radialGradient></defs>`);
    svg.append('path').attr('class', 'map__grat').attr('d', path(d3.geoGraticule10()));
    svg.append('g').selectAll('path').data(all.features).join('path').attr('d', path).attr('class', (f) => 'map__c' + (mem.has(f.id) ? ' is-mem' : ''));
    const pins = svg.append('g').selectAll('g').data(D.offices).join('g')
      .attr('class', 'pin').attr('tabindex', 0).attr('role', 'button').attr('aria-label', (o) => `${o.city}, ${o.c}`)
      .attr('transform', (o) => { const [x, y] = proj(o.ll); o.x = x; o.y = y; return `translate(${x.toFixed(1)} ${y.toFixed(1)})`; });
    pins.append('circle').attr('class', 'pin__glow').attr('r', 14);
    pins.append('circle').attr('class', 'pin__ring').attr('r', 6).style('animation-delay', (o, i) => `${(-i * 0.37) % 3}s`);
    pins.append('circle').attr('class', 'pin__dot').attr('r', 3.6);

    const stage = $('.map__stage'), card = $('#mapCard');
    function open(o, el) {
      $$('.pin.is-active').forEach((p) => p.classList.remove('is-active'));
      el.classList.add('is-active');
      $('#mcCountry').textContent = o.c; $('#mcCity').textContent = o.city; $('#mcText').textContent = o.t;
      $('#mcImg').src = `img/${D.regionImg[o.r]}.jpg`;
      card.hidden = false;
      const bw = stage.clientWidth, px = o.x / W * bw, py = o.y / H * stage.clientHeight;
      const cw = card.offsetWidth, ch = card.offsetHeight;
      let top = py - ch - 18;
      if (top < 0) top = py + 18;
      card.style.left = Math.max(8, Math.min(bw - cw - 8, px - cw / 2)) + 'px'; card.style.top = top + 'px';
      card.classList.remove('is-show'); void card.offsetWidth; card.classList.add('is-show');
    }
    const pinOf = (o) => pins.filter((d) => d === o).node();
    pins.on('click', function (e, o) { open(o, this); }).on('keydown', function (e, o) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(o, this); } });
    $('#mcClose').addEventListener('click', () => { card.hidden = true; $$('.pin.is-active').forEach((p) => p.classList.remove('is-active')); });

    // фото-выноски (только ПК)
    const feat = [['Дахаб', 'p-freedive', 'Голубая дыра'], ['Иркутск · Байкал', 'p-ice', 'Байкал'], ['Кэрнс', 'p-reef', 'Барьерный риф'], ['Канкун', 'm-cenote', 'Сеноты']];
    const thumbs = feat.map(([city, im, cap], i) => {
      const o = D.offices.find((x) => x.city === city);
      const el = document.createElement('button');
      el.className = 'map__thumb map__thumb--' + i; el.dataset.r = o.r;
      el.style.left = (o.x / W * 100) + '%'; el.style.top = (o.y / H * 100) + '%';
      el.innerHTML = `<span class="map__thumb-ph">${pic(im)}</span><span class="map__thumb-cap">${cap}</span>`;
      el.addEventListener('click', () => open(o, pinOf(o)));
      stage.appendChild(el);
      return el;
    });

    const list = $('#mapList');
    function setRegion(r) {
      $$('#mapTabs button').forEach((b) => b.classList.toggle('is-on', b.dataset.r === r));
      pins.classed('is-dim', (o) => r !== 'all' && o.r !== r);
      thumbs.forEach((t) => t.classList.toggle('is-dim', r !== 'all' && t.dataset.r !== r));
      list.innerHTML = D.offices.filter((o) => r === 'all' || o.r === r).map((o) => `<button data-i="${D.offices.indexOf(o)}"><b>${o.city}</b><span>${o.c}</span></button>`).join('');
      list.scrollLeft = 0; card.hidden = true;
    }
    $$('#mapTabs button').forEach((b) => b.addEventListener('click', () => setRegion(b.dataset.r)));
    list.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; const o = D.offices[+b.dataset.i]; open(o, pinOf(o)); });
    list.addEventListener('mouseover', (e) => { const b = e.target.closest('button'); pins.classed('is-hl', (o) => b && D.offices[+b.dataset.i] === o); });
    list.addEventListener('mouseleave', () => pins.classed('is-hl', false));
    setRegion('all');
  })();

  /* ---------- национальные лиги ---------- */
  (function crew() {
    const stage = $('#crewStage'), flags = $('#crewFlags');
    let li = 0;
    flags.innerHTML = D.leagues.map((l, i) => `<button data-i="${i}"><b>${l.code}</b><span>${l.country}</span></button>`).join('');
    function setPerson(pi) {
      const L = D.leagues[li], p = L.people[pi];
      $$('.crew__p', stage).forEach((el, i) => el.classList.toggle('is-active', i === pi));
      const info = $('#crewInfo'); info.classList.remove('is-show'); void info.offsetWidth; info.classList.add('is-show');
      $('#crLeague').textContent = `${L.code} · ${L.league}`; $('#crName').textContent = p.n; $('#crRole').textContent = p.r; $('#crBio').textContent = p.b;
      $('#crMeta').innerHTML = (p.m || []).map((m) => `<span>${m}</span>`).join('');
    }
    function setLeague(i) {
      li = (i + D.leagues.length) % D.leagues.length;
      const L = D.leagues[li];
      $$('button', flags).forEach((b, k) => b.classList.toggle('is-on', k === li));
      stage.classList.remove('is-show');
      stage.innerHTML = L.people.map((p, k) => `<button class="crew__p" style="--k:${k}" aria-label="${p.n}, ${p.r}">
          <span class="crew__img">${pic(p.img, p.n)}</span>
          <span class="crew__cap"><b>${p.n}</b><small>${p.r}</small></span></button>`).join('');
      void stage.offsetWidth; stage.classList.add('is-show');
      $$('.crew__p', stage).forEach((el, k) => ['mouseenter', 'focus', 'click'].forEach((ev) => el.addEventListener(ev, () => setPerson(k))));
      setPerson(0);
    }
    flags.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) setLeague(+b.dataset.i); });
    $('#crewPrev').addEventListener('click', () => setLeague(li - 1));
    $('#crewNext').addEventListener('click', () => setLeague(li + 1));
    setLeague(0);
  })();

  /* ---------- глубиномер и шапка ---------- */
  const secs = $$('[data-depth]'), fill = $('#depthFill'), dot = $('#depthDot'), val = $('#depthVal');
  function onScroll() {
    hdr.classList.toggle('is-scrolled', scrollY > 40);
    const mid = scrollY + innerHeight * 0.5;
    let d = 0;
    for (let i = 0; i < secs.length; i++) {
      const top = secs[i].offsetTop, next = secs[i + 1], bot = next ? next.offsetTop : document.documentElement.scrollHeight;
      if (mid >= top && mid < bot) { const a = +secs[i].dataset.depth, b = next ? +next.dataset.depth : a; d = a + (b - a) * ((mid - top) / (bot - top)); break; }
    }
    if (scrollY < 10) d = 0;
    const k = Math.min(1, d / 200);
    fill.style.transform = `scaleY(${k})`; dot.style.top = (k * 100) + '%'; val.textContent = Math.round(d);
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* предпросмотр: ?y=1200 — открыть страницу прокрученной и сразу показать блоки (для проверки вёрстки) */
  const qy = +new URLSearchParams(location.search).get('y');
  if (qy) {
    $$('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; });
    document.head.insertAdjacentHTML('beforeend', '<style>*,*::before,*::after{transition:none!important;animation-duration:0s!important;animation-delay:0s!important}</style>');
  }
  if (qy) addEventListener('load', () => { $$('.reveal').forEach((e) => e.classList.add('is-in')); scrollTo({ top: qy, behavior: 'instant' }); });
})();
