/* WDC v2 — всплывающие формы заявок */
(function () {
  const lenis = () => window.__lenis;
  const F = {
    join: {
      kicker: 'Членство', title: 'Вступить в <em>WDC</em>',
      lead: 'Оставьте контакты — координатор национальной лиги свяжется с вами в течение 2 рабочих дней и расскажет, как оформить членство.',
      chipsLabel: 'Кто вы', chips: ['Дайвер', 'Фридайвер', 'Инструктор', 'Клуб или школа'],
      fields: [['name', 'Имя', 'Как к вам обращаться'], ['contact', 'Телефон или e-mail', '+7 900 000-00-00']],
      submit: 'Отправить заявку',
      done: ['Заявка отправлена', 'Спасибо! Координатор свяжется с вами в течение 2 рабочих дней. А пока — загляните в наш Telegram-канал.'],
      img: 'hero-1v2',
    },
    cup: {
      kicker: 'Кубок мира 2027', title: 'Принять <em>участие</em>',
      lead: 'Регистрация сборных открыта. Оставьте контакты — пришлём положение о соревнованиях и форму регистрации.',
      chipsLabel: 'Ваша роль', chips: ['Спортсмен', 'Тренер', 'Представитель сборной', 'Судья'],
      fields: [['name', 'Имя', 'Как к вам обращаться'], ['contact', 'Телефон или e-mail', '+7 900 000-00-00']],
      submit: 'Получить положение',
      done: ['Заявка отправлена', 'Спасибо! Положение и форма регистрации придут на указанный контакт в ближайшее время.'],
      img: 'hero-2v2',
    },
    partner: {
      kicker: 'Партнёрство', title: 'Стать <em>партнёром</em>',
      lead: 'Расскажем о форматах сотрудничества и пришлём презентацию для партнёров WDC.',
      chipsLabel: 'Интересный формат', chips: ['Спонсорство', 'Оборудование', 'Медиа', 'Наука и экология'],
      fields: [['company', 'Компания', 'Название организации'], ['name', 'Имя', 'Контактное лицо'], ['contact', 'Телефон или e-mail', '+7 900 000-00-00']],
      submit: 'Получить презентацию',
      done: ['Заявка отправлена', 'Спасибо! Менеджер по партнёрствам свяжется с вами в течение рабочего дня.'],
      img: 'mission',
    },
  };
  const EN = document.documentElement.lang === 'en';
  const UI = EN
    ? { close: 'Close', fill: 'Please fill in this field', contact: 'Enter a phone number (10+ digits) or e-mail', agree: 'I agree to the processing of my personal data under the <a href="#">privacy policy</a>', ok: 'OK' }
    : { close: 'Закрыть', fill: 'Заполните поле', contact: 'Укажите телефон (от 10 цифр) или e-mail', agree: 'Согласен на обработку персональных данных согласно <a href="#">политике конфиденциальности</a>', ok: 'Хорошо' };
  if (EN) Object.assign(F, {
    join: { ...F.join, kicker: 'Membership', title: 'Join <em>WDC</em>',
      lead: 'Leave your contact details — a national league coordinator will get in touch within 2 business days and explain how to become a member.',
      chipsLabel: 'You are', chips: ['Diver', 'Freediver', 'Instructor', 'Club or school'],
      fields: [['name', 'Name', 'How should we address you'], ['contact', 'Phone or e-mail', '+1 555 000 0000']],
      submit: 'Send request', done: ['Request sent', 'Thank you! A coordinator will contact you within 2 business days. Meanwhile, check out our Telegram channel.'] },
    cup: { ...F.cup, kicker: 'World Cup 2027', title: 'Take <em>part</em>',
      lead: 'National team registration is open. Leave your contact details and we’ll send you the competition rules and the registration form.',
      chipsLabel: 'Your role', chips: ['Athlete', 'Coach', 'Team representative', 'Judge'],
      fields: [['name', 'Name', 'How should we address you'], ['contact', 'Phone or e-mail', '+1 555 000 0000']],
      submit: 'Get the rules', done: ['Request sent', 'Thank you! The rules and the registration form will arrive at your contact shortly.'] },
    partner: { ...F.partner, kicker: 'Partnership', title: 'Become a <em>partner</em>',
      lead: 'We’ll tell you about partnership formats and send you the WDC partner deck.',
      chipsLabel: 'Format of interest', chips: ['Sponsorship', 'Equipment', 'Media', 'Science & ecology'],
      fields: [['company', 'Company', 'Organisation name'], ['name', 'Name', 'Contact person'], ['contact', 'Phone or e-mail', '+1 555 000 0000']],
      submit: 'Get the deck', done: ['Request sent', 'Thank you! Our partnerships manager will contact you within one business day.'] },
  });
  const ar = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const box = document.createElement('div');
  box.className = 'md'; box.setAttribute('aria-hidden', 'true'); box.setAttribute('data-lenis-prevent', '');
  box.innerHTML = '<div class="md__veil" data-close></div><div class="md__win" role="dialog" aria-modal="true" aria-labelledby="mdTitle"><button class="md__x" data-close aria-label="' + UI.close + '"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button><div class="md__ph"><img alt=""></div><div class="md__body"></div></div>';
  document.body.appendChild(box);
  const win = box.querySelector('.md__win'), body = box.querySelector('.md__body'), img = box.querySelector('.md__ph img');
  let lastFocus = null, cur = null;

  function render(k) {
    const f = F[k]; cur = k;
    img.src = 'img/' + f.img + '.jpg';
    body.innerHTML = `
      <span class="chip">${f.kicker}</span>
      <h3 class="md__t" id="mdTitle">${f.title}</h3>
      <p class="md__lead">${f.lead}</p>
      <form class="md__form" novalidate>
        <fieldset class="md__chips"><legend>${f.chipsLabel}</legend>${f.chips.map((c, i) => `<label><input type="radio" name="kind" value="${c}"${i ? '' : ' checked'}><span>${c}</span></label>`).join('')}</fieldset>
        ${f.fields.map(([n, l, p]) => `<label class="md__f"><span>${l}</span><input name="${n}" autocomplete="${n === 'contact' ? 'email' : n === 'name' ? 'name' : 'organization'}" placeholder="${p}" required><em class="md__err"></em></label>`).join('')}
        <button class="btn btn--blue md__go" type="submit">${f.submit} <i class="btn__ar">${ar}</i></button>
        <label class="md__ok"><input type="checkbox" name="agree" checked required><span>${UI.agree}</span></label>
      </form>`;
    body.querySelector('form').addEventListener('submit', submit);
    body.querySelectorAll('input').forEach((i) => i.addEventListener('input', () => { const w = i.closest('.md__f, .md__ok'); if (w) w.classList.remove('is-bad'); }));
  }
  function bad(input, msg) {
    const w = input.closest('.md__f, .md__ok'); w.classList.add('is-bad');
    const e = w.querySelector('.md__err'); if (e) e.textContent = msg; return false;
  }
  function submit(e) {
    e.preventDefault();
    const form = e.target; let ok = true, first = null;
    form.querySelectorAll('.md__f input').forEach((i) => {
      const v = i.value.trim();
      let good = v.length > 1;
      if (i.name === 'contact') good = /^\S+@\S+\.\S+$/.test(v) || v.replace(/\D/g, '').length >= 10;
      if (!good) { ok = bad(i, i.name === 'contact' ? UI.contact : UI.fill); first = first || i; }
    });
    const ag = form.querySelector('[name=agree]');
    if (!ag.checked) { ok = bad(ag); first = first || ag; }
    if (!ok) { first.focus(); return; }
    const btn = form.querySelector('.md__go'); btn.disabled = true; btn.classList.add('is-load');
    // здесь будет отправка на сервер; пока — имитация
    setTimeout(() => {
      const [t, d] = F[cur].done;
      body.innerHTML = `<div class="md__done"><span class="md__check"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><h3 class="md__t" id="mdTitle">${t}</h3><p class="md__lead">${d}</p><button class="btn btn--dark" data-close>${UI.ok} <i class="btn__ar">${ar}</i></button></div>`;
      body.querySelector('[data-close]').focus();
    }, 700);
  }
  function open(k) {
    if (!F[k]) return;
    render(k); lastFocus = document.activeElement;
    box.classList.add('is-open'); box.setAttribute('aria-hidden', 'false'); document.documentElement.classList.add('md-lock');
    if (lenis()) lenis().stop();
    setTimeout(() => { const i = body.querySelector('.md__f input'); if (i && matchMedia('(hover: hover)').matches) i.focus({ preventScroll: true }); }, 350);
  }
  function close() {
    if (!box.classList.contains('is-open')) return;
    box.classList.remove('is-open'); box.setAttribute('aria-hidden', 'true'); document.documentElement.classList.remove('md-lock');
    if (lenis()) lenis().start();
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-modal]');
    if (t && t.dataset.modal) {
      e.preventDefault();
      if (document.body.classList.contains('mm-open')) { const b = document.querySelector('.burger'); if (b) b.click(); }
      open(t.dataset.modal); return;
    }
    if (e.target.closest('[data-close]') && box.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') { // фокус не уходит из окна
      const f = [...win.querySelectorAll('button, input, a[href]')].filter((x) => !x.disabled && x.offsetParent);
      if (!f.length) return; const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
  window.wdcModal = open;
})();
