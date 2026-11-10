/* WDC — English content for index-v2-en.html. Loaded after data.js: replaces texts, keeps icons, images and map codes. */
(function (D) {
  const img = (arr) => arr.map((x) => x.img);

  const cImg = img(D.committees);
  D.committees = [
    { k: 'sport', t: 'Sports', d: 'Competitions, rankings and national teams. Three subcommittees:', sub: ['Freediving', 'Scuba diving', 'Phygital diving'], wide: true },
    { k: 'edu', t: 'Education', d: 'Training programmes for instructors and divers of every level' },
    { k: 'exp', t: 'Expeditions', d: 'Expeditions to the most remote waters of the world' },
    { k: 'youth', t: 'Youth', d: 'Children’s and youth schools, camps and first dives' },
    { k: 'std', t: 'Standards & Certification', d: 'GOST and ISO standards for the underwater industry' },
    { k: 'rec', t: 'World Records', d: 'Recording and judging records under international rules' },
    { k: 'sci', t: 'Science', d: 'Research into the underwater world and its history. Subcommittees:', sub: ['History', 'Archaeology'], wide: true },
    { k: 'sar', t: 'Search & Rescue', d: 'Training rescuers and supporting search operations' },
    { k: 'tech', t: 'Technology', d: 'Equipment, underwater drones and digital solutions' },
    { k: 'eco', t: 'Ecology', d: 'Cleaning waters and protecting reefs and marine life' },
    { k: 'para', t: 'Para-diving', d: 'Adaptive diving for people with disabilities' },
    { k: 'art', t: 'Culture & Arts', d: 'Underwater photography, film, exhibitions and festivals' },
    { k: 'law', t: 'Legal', d: 'Legal support for leagues, clubs and members' },
  ].map((c, i) => ({ ...c, img: cImg[i] }));

  const pImg = img(D.projects);
  D.projects = [
    { t: 'Freediving World Cup 2027', d: 'Three stages and a final in Dahab. National team registration is open', tag: 'Sport' },
    { t: 'Shipwrecks of the Baltic', d: 'Surveying and 3D-modelling 14 historic vessels', tag: 'Science' },
    { t: 'Clean Sea', d: 'An international coastal clean-up in 20 countries', tag: 'Ecology' },
    { t: 'Baikal Under the Ice', d: 'A winter expedition studying the under-ice ecosystem', tag: 'Expeditions' },
    { t: 'Diving Without Limits', d: 'Adaptive dives for people with disabilities', tag: 'Para-diving' },
    { t: 'Young Divers School', d: 'Free courses for teenagers in 40 cities', tag: 'Youth' },
    { t: 'Underwater Film Festival', d: 'The best films and photos of the underwater world', tag: 'Culture' },
    { t: 'Reef Map', d: 'An open database on the health of coral reefs', tag: 'Science' },
  ].map((p, i) => ({ ...p, img: pImg[i] }));

  const nImg = img(D.news);
  D.news = [
    { t: 'Russian team wins three medals at the Freediving Championship', c: 'Sports Committee', dt: '5 November 2026', d: 'The athletes set a national record in the CWT discipline' },
    { t: 'Unknown 18th-century ship found off Gogland Island', c: 'Science Committee', dt: '1 November 2026', d: 'The vessel lies at a depth of 42 metres and is well preserved' },
    { t: 'New instructor training standard approved', c: 'Standards Committee', dt: '28 October 2026', d: 'The document is aligned with ISO 24801 and takes effect in 2027' },
    { t: 'WDC volunteers clean 12 km of the Red Sea coast', c: 'Ecology Committee', dt: '24 October 2026', d: 'Over 3 tonnes of waste collected by 400 divers' },
    { t: 'Applications open for the youth White Sea expedition', c: 'Youth Committee', dt: '20 October 2026', d: 'Participants aged 16–25 will train and dive under the ice' },
    { t: 'WDC rescuers hold drills in Novorossiysk', c: 'Search & Rescue Committee', dt: '16 October 2026', d: 'Search scenarios practised at depths of up to 60 metres' },
    { t: 'WDC underwater drone tested in the Arctic', c: 'Technology Committee', dt: '12 October 2026', d: 'The vehicle streams 4K video from depths of up to 300 metres' },
    { t: '“Blue Planet” photo contest results', c: 'Culture & Arts Committee', dt: '8 October 2026', d: 'The jury chose the 30 best works out of 2,400 entries' },
  ].map((n, i) => ({ ...n, img: nImg[i] }));

  const lImg = D.leagues.map((L) => img(L.people));
  D.leagues = [
    { code: 'RU', country: 'Russia', league: 'Russian Dive League', people: [
      { n: 'Alexey Morozov', r: 'League President', b: 'Instructor-trainer with 25 years underwater, leader of 40 expeditions to the Arctic and Lake Baikal.', m: ['5,200 dives', 'WDC since 2015'] },
      { n: 'Irina Volkova', r: 'Vice President', b: 'Freediving world champion, in charge of sport and national team training.', m: ['−102 m CWT', 'Master of Sport'] },
      { n: 'Dmitry Sokolov', r: 'Executive Director', b: 'Oversees 34 regional branches and the work with clubs.', m: ['34 regions', '180 clubs'] },
      { n: 'Maria Belova', r: 'Head of Education', b: 'Author of instructor training programmes, PhD in Education.', m: ['1,200 graduates'] },
      { n: 'Sergey Orlov', r: 'Chief Judge', b: 'International-category judge at 30 world and European championships.', m: ['30 events'] },
    ] },
    { code: 'BY', country: 'Belarus', league: 'Belarusian Underwater Federation', people: [
      { n: 'Andrey Kovalev', r: 'Chairman', b: 'Organiser of national underwater sports championships and rescue training camps.', m: ['WDC since 2017'] },
      { n: 'Olga Novik', r: 'Deputy Chairman', b: 'Runs youth diving schools in six regions.', m: ['6 schools'] },
    ] },
    { code: 'KZ', country: 'Kazakhstan', league: 'Kazakhstan Dive League', people: [
      { n: 'Yerlan Abenov', r: 'League President', b: 'Explorer of the Caspian Sea and the alpine lakes of the Tien Shan.', m: ['12 expeditions'] },
      { n: 'Aigerim Sarsenova', r: 'Vice President', b: 'Leads environmental projects on the Caspian Sea.', m: ['8 projects'] },
    ] },
    { code: 'EG', country: 'Egypt', league: 'Egyptian Diving League', people: [
      { n: 'Ahmed Hassan', r: 'League President', b: 'Founder of dive centres in Hurghada and Dahab, Red Sea reef expert.', m: ['9,000 dives'] },
      { n: 'Leila Mansour', r: 'Development Director', b: 'Develops international projects and competitions on the Red Sea.', m: ['WDC since 2019'] },
    ] },
    { code: 'AE', country: 'UAE', league: 'Emirates Dive League', people: [
      { n: 'Khalid Al Mansouri', r: 'League President', b: 'Promotes diving and the restoration of artificial reefs in the Persian Gulf.', m: ['3 reefs'] },
      { n: 'Sara Al Zahra', r: 'Vice President', b: 'Responsible for education programmes and instructor training.', m: ['600 graduates'] },
    ] },
    { code: 'ID', country: 'Indonesia', league: 'Indonesia Diving League', people: [
      { n: 'Budi Santoso', r: 'League President', b: 'Marine biologist and expert on Coral Triangle biodiversity.', m: ['PhD'] },
      { n: 'Dewi Lestari', r: 'Vice President', b: 'Leads the protection programme for manta rays and sea turtles.', m: ['2 reserves'] },
    ] },
  ].map((L, li) => ({ ...L, people: L.people.map((p, pi) => ({ ...p, img: lImg[li][pi] })) }));

  const en = [
    ['Russia', 'Moscow', 'WDC headquarters and the Russian Dive League'],
    ['Russia', 'Saint Petersburg', 'Baltic underwater archaeology centre'],
    ['Russia', 'Murmansk', 'Arctic expedition base'],
    ['Russia', 'Irkutsk · Baikal', 'Ice diving centre'],
    ['Russia', 'Vladivostok', 'Pacific branch'],
    ['Belarus', 'Minsk', 'Belarusian Underwater Federation'],
    ['Serbia', 'Belgrade', 'Balkan office'],
    ['Turkey', 'Antalya', 'Mediterranean training centre'],
    ['Armenia', 'Yerevan · Sevan', 'High-altitude diving on Lake Sevan'],
    ['Kazakhstan', 'Almaty', 'Kazakhstan Dive League'],
    ['Uzbekistan', 'Tashkent', 'Central Asian branch'],
    ['UAE', 'Dubai', 'Emirates Dive League'],
    ['Maldives', 'Malé', 'Ocean reef monitoring station'],
    ['India', 'Goa', 'Indian Ocean diving school'],
    ['Thailand', 'Phuket', 'Andaman dive centre'],
    ['Vietnam', 'Nha Trang', 'South China Sea training centre'],
    ['China', 'Sanya', 'Hainan Dive League'],
    ['Philippines', 'Cebu', 'Sea turtle protection centre'],
    ['Indonesia', 'Bali', 'Indonesia Diving League'],
    ['Egypt', 'Hurghada', 'Egyptian Diving League'],
    ['Egypt', 'Dahab', 'Freediving centre at the Blue Hole'],
    ['Tunisia', 'Tabarka', 'Mediterranean school'],
    ['Tanzania', 'Zanzibar', 'Ecology station'],
    ['Seychelles', 'Victoria', 'Marine reserve'],
    ['South Africa', 'Cape Town', 'Cold-water diving school'],
    ['Mexico', 'Cancun', 'Cave diving centre (cenotes)'],
    ['Cuba', 'Havana', 'Caribbean office'],
    ['Brazil', 'Rio de Janeiro', 'South American Dive League'],
    ['Argentina', 'Buenos Aires', 'Antarctic expedition centre'],
    ['Venezuela', 'Caracas', 'WDC office'],
    ['Australia', 'Cairns', 'Great Barrier Reef station'],
    ['Australia', 'Perth', 'Western Australia branch'],
  ];
  D.offices = D.offices.map((o, i) => ({ ...o, c: en[i][0], city: en[i][1], t: en[i][2] }));

  D.partners = ['AQUALINE', 'Sea Fund', 'DEEP RIFT', 'NAUTIKA', 'Depth', 'BLUE HOLE', 'OCEANIX', 'Reef Centre', 'TRITON', 'SEA LAB', 'Abyssal', 'KORAL GROUP', 'Arctic Geo', 'MARINE TECH', 'Underwater World', 'POSEIDON'];
})(window.WDC);
