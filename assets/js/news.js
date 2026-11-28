/* Страница «Новости» (news.html): список новостей, фильтр по направлениям, «Показать ещё».
   Подключается после data.js и до main.js. Новости — демо, заменить на реальные. */
(function () {
  const NEWS = [
    { t: 'Комитет запустил международный реестр норм в сфере дайвинга', c: 'Юридический комитет', tag: 'law', dt: '20 ноября 2026', d: 'В открытой базе собраны законы и практики 47 стран — от сертификации до ответственности инструкторов', img: 'c-law' },
    { t: 'Открыта регистрация сборных на Кубок мира по фридайвингу 2027', c: 'Спортивный комитет', tag: 'sport', dt: '14 ноября 2026', d: 'Три этапа и финал у Голубой дыры Дахаба. Заявки национальных сборных принимаются до 1 февраля', img: 'p-worldcup-medals' },
    { t: 'Сборная России взяла три медали на чемпионате по фридайвингу', c: 'Спортивный комитет', tag: 'sport', dt: '05 ноября 2026', d: 'Спортсменки установили национальный рекорд в дисциплине CWT', img: 'n-medal' },
    { t: 'Найден неизвестный корабль XVIII века у острова Гогланд', c: 'Научный комитет', tag: 'sci', dt: '01 ноября 2026', d: 'Судно лежит на глубине 42 метров и отлично сохранилось. Начато 3D-моделирование', img: 'hero-3', u: 1 },
    { t: 'Утверждён новый стандарт подготовки инструкторов', c: 'Комитет стандартизации', tag: 'edu', dt: '28 октября 2026', d: 'Документ гармонизирован с ISO 24801 и вступает в силу с 1 января', img: 'c-std' },
    { t: 'Волонтёры WDC очистили 12 км побережья Красного моря', c: 'Экологический комитет', tag: 'eco', dt: '24 октября 2026', d: 'Собрано более 3 тонн мусора, в акции участвовали 400 дайверов из 11 стран', img: 'n-beach' },
    { t: 'Открыт набор в детско-юношескую экспедицию на Белое море', c: 'Детско-юношеский комитет', tag: 'edu', dt: '20 октября 2026', d: 'Участники от 12 до 17 лет пройдут обучение и погружения под присмотром инструкторов', img: 'n-whitesea' },
    { t: 'Спасатели WDC провели учения в Новороссийске', c: 'Поисково-спасательный комитет', tag: 'safe', dt: '16 октября 2026', d: 'Отработаны сценарии поиска на глубине до 60 метров', img: 'c-sar' },
    { t: 'Подводный дрон WDC прошёл испытания в Арктике', c: 'Технологический комитет', tag: 'sci', dt: '12 октября 2026', d: 'Аппарат передаёт видео в 4K подо льдом при температуре −2 °C', img: 'c-tech' },
    { t: 'Итоги фотоконкурса «Голубая планета»', c: 'Комитет культуры и искусств', tag: 'art', dt: '08 октября 2026', d: 'Жюри выбрало 30 лучших работ из 2 400 присланных снимков', img: 'p-art' },
    { t: 'Экспедиция «Байкал подо льдом» завершила первый этап', c: 'Экспедиционный комитет', tag: 'sci', dt: '02 октября 2026', d: 'Учёные собрали пробы подлёдной экосистемы на 14 станциях', img: 'p-ice' },
    { t: 'Водолазы WDC прошли аттестацию по новым правилам', c: 'Комитет водолазного дела', tag: 'safe', dt: '27 сентября 2026', d: 'Первые 120 специалистов получили международные свидетельства', img: 'c-dive' },
    { t: 'Дайв-сафари WDC: новые маршруты сезона 2027', c: 'Комитет дайвинг-туризма', tag: 'tour', dt: '22 сентября 2026', d: 'Красное море, Филиппины и Мальдивы — с инструкторами конфедерации', img: 'c-tour' },
    { t: '«Дайвинг без границ»: первые погружения для людей с инвалидностью', c: 'Комитет парадайвинга', tag: 'sport', dt: '15 сентября 2026', d: 'Адаптивные программы стартовали в пяти городах', img: 'p-para' },
    { t: 'Обзор страховой практики: ответственность инструкторов', c: 'Юридический комитет', tag: 'law', dt: '09 сентября 2026', d: 'Сравнили подходы 18 стран к спорам после несчастных случаев под водой', img: 'p-wreck' },
    { t: 'Школа юного дайвера открылась ещё в 12 городах', c: 'Детско-юношеский комитет', tag: 'edu', dt: '01 сентября 2026', d: 'Бесплатные курсы для подростков теперь доступны в 40 городах', img: 'p-youth' },
    { t: 'Кубок WDC по дайвингу собрал 300 участников в Казани', c: 'Спортивный комитет', tag: 'sport', dt: '25 августа 2026', d: 'Скоростные дисциплины в бассейне и первый командный зачёт лиг', img: 'c-sport' },
    { t: 'Риф-мониторинг: волонтёры проверили 40 участков Красного моря', c: 'Экологический комитет', tag: 'eco', dt: '18 августа 2026', d: 'Данные о состоянии кораллов попадут в открытую карту рифов', img: 'p-reef' },
    { t: 'Аттестация инструкторов прошла в шести странах', c: 'Образовательный комитет', tag: 'edu', dt: '11 августа 2026', d: '210 инструкторов подтвердили квалификацию по стандартам WDC', img: 'c-edu' },
    { t: 'Фестиваль подводного кино открыл приём работ', c: 'Комитет культуры и искусств', tag: 'art', dt: '04 августа 2026', d: 'Короткий метр, документалистика и фото — заявки до 1 октября', img: 'hero-2' },
    { t: 'Учёные WDC обследовали затонувший пароход у Таллина', c: 'Научный комитет', tag: 'sci', dt: '28 июля 2026', d: 'Собрана фотограмметрия корпуса для 3D-модели', img: 'p-wreck' },
    { t: 'Медицинская подготовка: новый курс первой помощи для дайверов', c: 'Поисково-спасательный комитет', tag: 'safe', dt: '21 июля 2026', d: 'Курс доступен в 30 центрах и онлайн', img: 'mission' },
    { t: 'Сборная Казахстана выиграла командный этап по фридайвингу', c: 'Спортивный комитет', tag: 'sport', dt: '14 июля 2026', d: 'Второе место у Египта, третье — у России', img: 'p-freedive' },
    { t: 'Открыт новый маршрут дайв-сафари на Мальдивах', c: 'Комитет дайвинг-туризма', tag: 'tour', dt: '07 июля 2026', d: 'Десять дней на атоллах с инструкторами WDC', img: 'hero-3v2' },
  ];
  let TAGS = [['all', 'Все новости'], ['sport', 'Спорт'], ['sci', 'Наука и экспедиции'], ['edu', 'Образование'], ['eco', 'Экология'], ['safe', 'Безопасность'], ['tour', 'Туризм'], ['art', 'Культура'], ['law', 'Право']];
  const EN = document.documentElement.lang === 'en';
  const L = EN
    ? { more: 'Read more', prev: 'Previous page', next: 'Next page' }
    : { more: 'Подробнее', prev: 'Предыдущая страница', next: 'Следующая страница' };
  if (EN) {
    // EN-тексты в том же порядке, что и RU; направление и фото берутся из RU
    const E = [
      ['The committee launched an international register of diving regulations', 'Legal Committee', '20 November 2026', 'An open database of laws and practice in 47 countries — from certification to instructor liability'],
      ['National team registration for the 2027 Freediving World Cup is open', 'Sports Committee', '14 November 2026', 'Three stages and a final at Dahab’s Blue Hole. National teams can apply until 1 February'],
      ['Russian team wins three medals at the freediving championship', 'Sports Committee', '5 November 2026', 'The athletes set a national record in the CWT discipline'],
      ['An unknown 18th-century ship found off Gogland Island', 'Science Committee', '1 November 2026', 'The vessel lies at 42 metres and is well preserved. 3D modelling has begun'],
      ['New instructor training standard approved', 'Standards Committee', '28 October 2026', 'The document is harmonised with ISO 24801 and takes effect on 1 January'],
      ['WDC volunteers cleaned 12 km of the Red Sea coast', 'Ecology Committee', '24 October 2026', 'Over 3 tonnes of waste collected by 400 divers from 11 countries'],
      ['Applications open for a youth expedition to the White Sea', 'Children & Youth Committee', '20 October 2026', 'Participants aged 12–17 will train and dive under instructor supervision'],
      ['WDC rescuers hold drills in Novorossiysk', 'Search & Rescue Committee', '16 October 2026', 'Search scenarios practised at depths of up to 60 metres'],
      ['WDC underwater drone tested in the Arctic', 'Technology Committee', '12 October 2026', 'The vehicle streams 4K video under ice at −2 °C'],
      ['Results of the “Blue Planet” photo contest', 'Culture & Arts Committee', '8 October 2026', 'The jury chose the 30 best works out of 2,400 entries'],
      ['The “Baikal Under the Ice” expedition completes its first stage', 'Expeditions Committee', '2 October 2026', 'Scientists sampled the under-ice ecosystem at 14 stations'],
      ['WDC divers certified under the new rules', 'Commercial Diving Committee', '27 September 2026', 'The first 120 specialists received international certificates'],
      ['WDC dive safaris: new routes for the 2027 season', 'Dive Tourism Committee', '22 September 2026', 'The Red Sea, the Philippines and the Maldives — with confederation instructors'],
      ['“Diving Without Limits”: first dives for people with disabilities', 'Para-diving Committee', '15 September 2026', 'Adaptive programmes have launched in five cities'],
      ['Insurance practice review: instructor liability', 'Legal Committee', '9 September 2026', 'Comparing how 18 countries handle disputes after underwater accidents'],
      ['Young Divers School opens in 12 more cities', 'Children & Youth Committee', '1 September 2026', 'Free courses for teenagers are now available in 40 cities'],
      ['WDC diving cup gathers 300 participants in Kazan', 'Sports Committee', '25 August 2026', 'Speed pool disciplines and the first league team ranking'],
      ['Reef monitoring: volunteers surveyed 40 sites in the Red Sea', 'Ecology Committee', '18 August 2026', 'Coral health data will go into the open reef map'],
      ['Instructor certification held in six countries', 'Education Committee', '11 August 2026', '210 instructors confirmed their qualifications under WDC standards'],
      ['Underwater film festival opens submissions', 'Culture & Arts Committee', '4 August 2026', 'Short films, documentaries and photos — entries until 1 October'],
      ['WDC scientists surveyed a sunken steamer near Tallinn', 'Science Committee', '28 July 2026', 'Photogrammetry of the hull collected for a 3D model'],
      ['Medical training: a new first aid course for divers', 'Search & Rescue Committee', '21 July 2026', 'The course is available in 30 centres and online'],
      ['Kazakhstan wins the team freediving stage', 'Sports Committee', '14 July 2026', 'Egypt took second place and Russia third'],
      ['A new dive safari route opens in the Maldives', 'Dive Tourism Committee', '7 July 2026', 'Ten days on the atolls with WDC instructors'],
    ];
    E.forEach(([t, c, dt, d], i) => { if (NEWS[i]) Object.assign(NEWS[i], { t, c, dt, d }); });
    TAGS = [['all', 'All news'], ['sport', 'Sport'], ['sci', 'Science & expeditions'], ['edu', 'Education'], ['eco', 'Ecology'], ['safe', 'Safety'], ['tour', 'Tourism'], ['art', 'Culture'], ['law', 'Law']];
  }

  const P = new URLSearchParams(location.search);
  const ASSETS = (document.currentScript ? document.currentScript.src : '').replace(/js\/[^/]*$/, '');
  const ar = '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>';
  const pic = (n, alt, eager) => `<img src="${ASSETS}img/${n}.jpg" alt="${alt}" loading="${eager || P.get('y') ? 'eager' : 'lazy'}" decoding="async">`;
  const MQ = matchMedia('(max-width: 720px)');
  let STEP = MQ.matches ? 5 : 8; // новостей на одной странице: телефон — 5, ПК и планшет — 8

  /* детальная страница новости (пока одна демо-статья RU/EN — на неё ведут все карточки) */
  const ROOT = ASSETS.replace(/assets\/$/, '');
  const HREF = ROOT + (EN ? 'en/' : '') + 'news-gogland.html';
  const share = document.getElementById('arShare');
  if (share) {
    // «Другие новости» внизу статьи — свежие новости без текущей (рисует main.js в #newsGrid)
    window.WDC_PAGE = Object.assign(window.WDC_PAGE || {}, { news: NEWS.filter((n) => !n.u).slice(0, 8) });
    const url = encodeURIComponent(location.href.split('#')[0]), title = encodeURIComponent(document.querySelector('h1').textContent);
    // содержание: подсветка раздела, который сейчас на экране
    const toc = [...document.querySelectorAll('#arToc a')].map((a) => [a, document.querySelector(a.getAttribute('href'))]).filter(([, el]) => el);
    const spy = () => {
      let on = toc[0];
      toc.forEach((t) => { if (t[1].getBoundingClientRect().top < innerHeight * .35) on = t; });
      toc.forEach((t) => t[0].classList.toggle('is-on', t === on));
    };
    if (toc.length) { addEventListener('scroll', spy, { passive: true }); spy(); }
    const ok = document.getElementById('arCopied');
    share.addEventListener('click', (e) => {
      const a = e.target.closest('[data-share]'); if (!a) return;
      e.preventDefault();
      const k = a.dataset.share;
      if (k === 'tg') open('https://t.me/share/url?url=' + url + '&text=' + title, '_blank', 'noopener');
      else if (k === 'vk') open('https://vk.com/share.php?url=' + url + '&title=' + title, '_blank', 'noopener');
      else if (navigator.clipboard) navigator.clipboard.writeText(decodeURIComponent(url)).then(() => { ok.hidden = false; clearTimeout(ok.t); ok.t = setTimeout(() => { ok.hidden = true; }, 2200); });
    });
  }

  const tabs = document.getElementById('nwTabs'), grid = document.getElementById('nwGrid'), more = document.getElementById('nwMore'), empty = document.getElementById('nwEmpty'), pager = document.getElementById('nwPager');
  if (!tabs) return;
  // from — первая показанная страница, to — последняя (кнопка «Показать ещё» расширяет to, пагинация ставит from = to)
  let cur = TAGS.some(([k]) => k === P.get('f')) ? P.get('f') : 'all';
  let from = Math.max(1, +P.get('p') || 1), to = from;

  tabs.innerHTML = TAGS.filter(([k]) => k === 'all' || NEWS.some((n) => n.tag === k)).map(([k, l]) => `<button type="button" data-f="${k}" aria-pressed="${k === cur}">${l}</button>`).join('');

  const card = (n) => `<a href="${HREF}" class="nc"><span class="nc__ph">${pic(n.img, n.t)}<span class="nc__dt">${n.dt}</span></span><span class="nc__b"><span class="nc__c">${n.c}</span><h3>${n.t}</h3><p>${n.d}</p><span class="nc__more">${L.more}<i>${ar}</i></span></span></a>`;
  const chev = (d) => `<svg viewBox="0 0 24 24"><path d="${d}"/></svg>`;

  function syncUrl() {
    const u = new URL(location.href);
    cur === 'all' ? u.searchParams.delete('f') : u.searchParams.set('f', cur);
    to > 1 ? u.searchParams.set('p', to) : u.searchParams.delete('p');
    history.replaceState(null, '', u);
  }
  function render() {
    const list = NEWS.filter((n) => cur === 'all' || n.tag === cur);
    const pages = Math.max(1, Math.ceil(list.length / STEP));
    if (from > pages) from = to = pages;
    grid.innerHTML = list.slice((from - 1) * STEP, to * STEP).map(card).join('');
    more.hidden = to >= pages;
    empty.hidden = list.length > 0;
    if (pages < 2) { pager.innerHTML = ''; pager.hidden = true; return; }
    pager.hidden = false;
    let h = `<button type="button" class="nwpg__ar" data-p="${from - 1}" aria-label="${L.prev}"${from <= 1 ? ' disabled' : ''}>${chev('M15 6l-6 6 6 6')}</button>`;
    // при большом числе страниц: 1 … соседние … последняя
    const keep = (i) => pages <= 7 || i === 1 || i === pages || (i >= from - 1 && i <= to + 1);
    for (let i = 1; i <= pages; i++) {
      if (keep(i)) h += `<button type="button" data-p="${i}"${i >= from && i <= to ? ' aria-current="page"' : ''}>${i}</button>`;
      else if (keep(i - 1)) h += '<span class="nwpg__gap">…</span>';
    }
    h += `<button type="button" class="nwpg__ar" data-p="${to + 1}" aria-label="${L.next}"${to >= pages ? ' disabled' : ''}>${chev('M9 6l6 6-6 6')}</button>`;
    pager.innerHTML = h;
  }
  const toList = () => { const y = tabs.getBoundingClientRect().top + scrollY - 110; window.__lenis ? window.__lenis.scrollTo(y) : scrollTo({ top: y, behavior: 'smooth' }); };

  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    cur = b.dataset.f; from = to = 1;
    tabs.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
    syncUrl(); render();
  });
  more.addEventListener('click', () => { to += 1; syncUrl(); render(); });
  pager.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    from = to = +b.dataset.p; syncUrl(); render(); toList();
  });
  MQ.addEventListener('change', () => { STEP = MQ.matches ? 5 : 8; from = to = 1; syncUrl(); render(); });
  render();
})();
