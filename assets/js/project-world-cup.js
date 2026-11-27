/* Данные страницы проекта «Кубок мира по фридайвингу 2027». Подключается перед main.js. Статьи — демо, заменить на реальные. */
window.WDC_PAGE = {
  news: [
    { t: 'Открыта регистрация сборных на Кубок мира 2027', c: 'Спортивный комитет', dt: '30 октября 2026', d: 'Три этапа и финал у Голубой дыры Дахаба, заявки до 1 февраля', img: 'n-medal' },
    { t: 'Как готовятся к финалу в Дахабе: репортаж со сборов', c: 'Подкомитет фридайвинга', dt: '28 сентября 2026', d: 'Две недели тренировок на глубине с тренерами WDC', img: 'hero-2v2' },
    { t: 'Новые правила судейства на этапах кубка', c: 'Спортивный комитет', dt: '22 октября 2026', d: 'Видеофиксация и единые протоколы вступают в силу с января', img: 'c-sport' },
    { t: 'Сборная России взяла три медали на чемпионате', c: 'Спортивный комитет', dt: '05 ноября 2026', d: 'Спортсменки установили национальный рекорд в дисциплине CWT', img: 'p-worldcup-medals' },
    { t: 'Безопасность на глубине: как работает команда страховки', c: 'Поисково-спасательный комитет', dt: '12 октября 2026', d: 'Страхующие водолазы, врачи и протоколы на каждом этапе', img: 'c-sar' },
  ],
};
if (document.documentElement.lang === 'en') window.WDC_PAGE.news = [
  { t: 'National team registration for the 2027 World Cup is open', c: 'Sports Committee', dt: '30 October 2026', d: 'Three stages and a final at Dahab’s Blue Hole, applications until 1 February', img: 'n-medal' },
  { t: 'Preparing for the final in Dahab: a report from the training camp', c: 'Freediving subcommittee', dt: '28 September 2026', d: 'Two weeks of deep training with WDC coaches', img: 'hero-2v2' },
  { t: 'New judging rules for the cup stages', c: 'Sports Committee', dt: '22 October 2026', d: 'Video review and unified protocols take effect in January', img: 'c-sport' },
  { t: 'Russian team wins three medals at the championship', c: 'Sports Committee', dt: '5 November 2026', d: 'The athletes set a national record in the CWT discipline', img: 'p-worldcup-medals' },
  { t: 'Safety at depth: how the safety team works', c: 'Search & Rescue Committee', dt: '12 October 2026', d: 'Safety divers, doctors and protocols at every stage', img: 'c-sar' },
];
