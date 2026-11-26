/* Данные страницы Юридического комитета. Подключается перед main.js. Новости — демо, заменить на реальные. */
window.WDC_PAGE = {
  chair: {
    kicker: 'Юридический комитет', title: 'Написать <em>руководителю</em>',
    lead: 'Сообщение придёт председателю комитета Светлане Чижовой в Telegram и на почту. Отвечаем в течение 2 рабочих дней.',
    chipsLabel: 'Тема', chips: ['Законодательство', 'Экспертиза', 'Аналитика', 'Другое'],
    img: 'c-law',
  },
  news: [
    { t: 'Комитет запустил международный реестр норм в сфере дайвинга', c: 'Юридический комитет', dt: '20 ноября 2026', d: 'В базу вошли нормативные акты 18 стран, реестр будет пополняться ежеквартально', img: 'c-law' },
    { t: 'Обзор страховой практики: ответственность инструкторов', c: 'Юридический комитет', dt: '06 ноября 2026', d: 'Сравнили подходы судов и страховщиков в Европе, Азии и на Ближнем Востоке', img: 'c-std' },
    { t: 'Правовая экспертиза инициатив по охране подводного наследия', c: 'Юридический комитет', dt: '24 октября 2026', d: 'Заключение подготовлено для руководящих органов Конфедерации', img: 'p-wreck' },
    { t: 'Консультация для регуляторов по сертификации дайв-центров', c: 'Юридический комитет', dt: '10 октября 2026', d: 'Эксперты поделились мировым опытом взаимного признания квалификаций', img: 'mission' },
    { t: 'Методические рекомендации по гармонизации национальных стандартов', c: 'Юридический комитет', dt: '25 сентября 2026', d: 'Документ направлен Национальным Дайв Лигам для обсуждения', img: 'hero-2v2' },
  ],
};
if (document.documentElement.lang === 'en') {
  window.WDC_PAGE.chair = {
    kicker: 'Legal Committee', title: 'Write to <em>the chair</em>',
    lead: 'Your message goes to committee chair Svetlana Chizhova on Telegram and by e-mail. We reply within 2 business days.',
    chipsLabel: 'Topic', chips: ['Legislation', 'Expertise', 'Analytics', 'Other'],
    img: 'c-law',
  };
  window.WDC_PAGE.news = [
    { t: 'The committee launches an international register of diving rules', c: 'Legal Committee', dt: '20 November 2026', d: 'The database covers regulations from 18 countries and will be updated quarterly', img: 'c-law' },
    { t: 'Insurance practice review: instructor liability', c: 'Legal Committee', dt: '6 November 2026', d: 'Comparing the approaches of courts and insurers in Europe, Asia and the Middle East', img: 'c-std' },
    { t: 'Legal review of initiatives to protect underwater heritage', c: 'Legal Committee', dt: '24 October 2026', d: 'The opinion was prepared for the Confederation’s governing bodies', img: 'p-wreck' },
    { t: 'Advice for regulators on dive centre certification', c: 'Legal Committee', dt: '10 October 2026', d: 'Experts shared global experience in the mutual recognition of qualifications', img: 'mission' },
    { t: 'Guidelines on harmonising national standards', c: 'Legal Committee', dt: '25 September 2026', d: 'The document has been sent to the National Dive Leagues for discussion', img: 'hero-2v2' },
  ];
}
