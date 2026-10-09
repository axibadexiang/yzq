/* ==========================================================================
   Hedda Roman — content model
   All copy and asset paths extracted from www.heddaroman.com
   ========================================================================== */

const SITE = {
  brand: 'Hedda Roman',
  brandLong: 'HEDDA SCHATTANIK ROMAN SZCZESNY',
  email: 'heddaromanstudio@gmail.com',
  instagram: 'https://www.instagram.com/hedda_roman/?hl=en',

  /* Primary navigation — the label list the original uses on the splash pages.
     Note: the real site renders these with text-transform:lowercase, so the
     browser shows "works drawings cv recent contact". */
  nav: [
    { label: 'WORKS', href: 'works.html' },
    { label: 'DRAWINGS', href: 'drawings.html' },
    { label: 'CV', href: 'cv.html' },
    { label: 'recent', href: 'recent.html' },
    { label: 'CONTACT', href: 'contact.html' }
  ],

  /* The /contact slide swaps "recent" for "PRESS" (a page that does not exist
     on the live site either — it 404s). Reproduced verbatim. */
  navContact: [
    { label: 'WORKS', href: 'works.html' },
    { label: 'DRAWINGS', href: 'drawings.html' },
    { label: 'CV', href: 'cv.html' },
    { label: 'PRESS', href: 'press.html' },
    { label: 'CONTACT', href: 'contact.html' }
  ]
};

/* --------------------------------------------------------------------------
   WORKS — 13 splash pages. Titles in source order; covers mapped to the
   gallery still that the original uses for each slide.
   -------------------------------------------------------------------------- */

const WORKS = [
  {
    title: 'Wet Closet',
    year: '2023',
    poster: 'a' + '.jpg'
  }
];

/* Work titles in the exact order published on /works */
const WORK_TITLES = [
  'WET CLOSET',
  'LIGHT-FIELD MEMORIES: TORSO',
  'AUF DEM WEG ZUM FLUGHAFEN',
  'AMOR FATI',
  'MELANKOHOLIKER',
  'WOLKENBILD',
  'DAVID GEGEN GOLIATH',
  'UNTERHALTUNG AUF KOSTEN EINES TRAURIGEN (WORKING TITLE)',
  'VIKTOR',
  'APARTMENT MONOLOGUE',
  'THE PAINTRESS',
  'LIFE IS GOOD AT THE BEACH'
];

/* --------------------------------------------------------------------------
   CV — verbatim from /cvcvcv
   -------------------------------------------------------------------------- */

const CV = {
  title: 'CV HEDDA SCHATTANIK ROMAN SZCZESNY',
  intro: [
    'Live and work in Düsseldorf',
    'Studies at Kunstakademie Düsseldorf, Class Andreas Gursky, Marcel Odenbach (since 2014), Elizabeth Peyton (2015-2016) and Dominique Gonzalez-Foerster (since 2017).',
    'Hedda Schattanik has been given the title Meisterschüler by Andreas Gursky.',
    'Roman Szczesny has been given the title Meisterschüler by Marcel Odenbach.'
  ],
  awards: [
    ['META-Wave Award, PHOTOFAIRS Shanghai', '2026'],
    ['Winner – XR Competition for Art in Public Space, Kunstkommission Düsseldorf', '2026'],
    ['Winner – Kunst am Bau Competition, Kármán Auditorium, RWTH Aachen', '2024'],
    ['Prize of the city of Düsseldorf for pictorial art', '2019'],
    ['Marl Media Art Award for “Apartment Monologue”', '2018'],
    ['Studio Scholarship LKART granted by Julia Stoschek Collection', '2018'],
    ['Admittance to the IMAI (Inter Media Art Institute) Foundation', '2017'],
    ['Travelgrant Kunstverein für die Rheinlande und Westfalen, Stadtsparkasse Düsseldorf', '2016'],
    ['Baker Tilly Roelfs Artist Grant', '2016'],
    ['Film-Labor Scholarship, Filmwerkstatt Düsseldorf', '2016'],
    ['Cusanuswerk-Scholarship', '2016'],
    ['Kölner Tanz und Theaterpreis - an award for "Der Freund krank" - The sick friend', '2015'],
    ['Travelgrant Kunstverein für die Rheinlande und Westfalen, Stadtsparkasse Düsseldorf', '2014']
  ],
  exhibitions: [
    ['2026', [
      '“50 Years of the Düsseldorf School of Photography”, INSIGHTS Section, 11th PHOTOFAIRS Shanghai, Shanghai Exhibition Centre, Shanghai',
      '“Jamais Vu”, Duo/Group Presentation with Xu Chao, ZiWU / Ziwo Space, Shanghai',
      '“Die Szene”, Group Show, Bilker Bunker, Düsseldorf'
    ]],
    ['2025', [
      '“Dialogues with the Shadow”, group exhibition curated by Cao Yixiao, Jhuo Art Center, Chengdu',
      '“Test-Time”, Solo Show, Kunstverein Bielefeld',
      '“In anderen Händen”, Group Show, Miettinen Collection, Berlin',
      '“Moulds for a Breather”, Video for Dome-Projection, Kunstpalast Düsseldorf',
      '“How did you happen?” LED Work at Kö Bogen II, Düsseldorf',
      '“soft rains” Solo Show, Nexus Projectroom, Düsseldorf'
    ]],
    ['2024', [
      '“Cutting the Puppeteer’s Strings”, Group Show, Philara, Düsseldorf',
      '“Mellow Machine”, Solo Show, wie oft noch, Karlsruhe',
      '"Maenads Series" Solo Presentation, Hallen 5, Berlin',
      '“Rogue Planet” Solo Show, Oakville Galleries, Canada',
      '"Park as a Lover" Group Show featuring Hedda Roman, Lantz\'scher Park, Düsseldorf',
      '"Reise in Abwesenheit des Körpers" Group Show featuring Hedda Roman, Shanghai Duolun Museum of Modern Art',
      '“Forthcoming. Speculations in Urban Space”, K21, Düsseldorf'
    ]],
    ['2023', [
      '“Death to Dialectics” Solo Show, Sies + Höke, Düsseldorf',
      '“Cradling Specters”, with Marina Bochert, Weiden Space, Düsseldorf',
      '“wet closet”, Solo Show at Salzburger Kunstverein, Salzburg'
    ]],
    ['2022', [
      '“Spirits” group show, Lore Deutz Cologne',
      '“After Crossing the River” group show curated by Marcel Odenbach, Kunstverein Wilhelmshöhe',
      '“[...] is a state of mind”, Kunsthalle Düsseldorf'
    ]],
    ['2020/21', [
      '“Light-field Memories: Torso” Premiere at Art Basel, Sies + Höke Booth',
      '“Loom” Solo Show at Sies + Höke',
      '“In order of appearance” group show, K21 Düsseldorf'
    ]],
    ['2019', [
      '“Unterhaltung auf Kosten eines Traurigen” Solo Show, Kunstverein für die Rheinlande und Westfalen, Düsseldorf',
      'Screening of “Amor Fati” at Daily Lazy Projects, Athen',
      'Reading of “Unterhaltung auf Kosten eines Traurigen” at Buchhandlung Böttger, Bonn',
      '“Amor Fati” Solo Show, Philara Collection, Düsseldorf',
      '“Polke und die Folgen” Akademie Galerie, Düsseldorf',
      '“Amor Fati” Screening at Julia Stoschek Collection Studio 54, Düsseldorf',
      '“Apartment Monologue” MOP-Shortlist, Neue Horizonte, Max Ophüls Preis, Saarbrücken'
    ]],
    ['2018', [
      '“Digital Gods” die Digitale, Weltkunstzimmer, Düsseldorf',
      '"Apartment Monologue" Marl Media Art Awards 2018, Skulpturenmuseum Glaskasten Marl',
      '“Amor Fati” single presentation at Feld-Haus, Insel Hombroich',
      '“Follow Up 2018” PWC Kunstpreis “Junge Kunst aus der Akademie”, Düsseldorf',
      '“Apartment Monologue” single presentation at COMA Gallery, Sydney',
      '"Apartment Monologue" German Competition, Kino Lichtburg, Internationale Kurzfilmtage Oberhausen',
      '"Fiktiva" Festival, Cinéma Luminor, Paris',
      '"Translokale" group exhibition, Galerie Loewe, Düsseldorf',
      '"FAR/OFF" Festival, screening of "Viktor Al Manouchi" as part of the PLAY/List, Ebertplatz, Cologne'
    ]],
    ['2017', [
      'Jahresgaben 2017/18, Kunstverein für die Rheinlande und Westfalen, Düsseldorf',
      '“Asymmetrische Architexturen” group exhibition, Kunstverein für die Rheinlande und Westfalen, Düsseldorf',
      '"123" Class Andreas Gursky, Goethe Institute Paris',
      '“Performed Identity“ video screening curated by IMAI Stiftung, Internationale Kurzfilmtage Oberhausen',
      '"Viktor Al Manouchi” video screening, HONDA Gallery, Play Video- & Performance Festival, Cologne',
      '"Apartment Monologue” video screening, die Wohnung, curated by Roy Mordechay, Julia Reich & Nir Altmann Gallery, Düsseldorf',
      '"International Theme Exhibition" Photo Beijing 2017, China Millennium Monument, Beijing',
      '"Zeichnung" Auswahlausstellung - group exhibition selected works, Märkisches Stipendium 2018, Städtische Galerie Lüdenscheid'
    ]],
    ['2016', [
      '"Die Grosse" Class Andreas Gursky, Museum Kunstpalast Düsseldorf',
      '"Mary und der Vulkan“ group exhibition, KIT (Kunst im Tunnel), Düsseldorf',
      'TBA (Time Based Academy) Kunsthalle Düsseldorf',
      'EVA Project (Experimental Video Art Exhibition Thai European Friendship), Thailand'
    ]],
    ['2015', [
      '"#4 kunstakademie@mckinsey&company“ group exhibition, Skyoffice, Düsseldorf',
      '"Let‘s Dance“ group exhibition, Kunsthaus Essen',
      '"Local Colour“ Class Elizabeth Peyton, Kunstakademie Düsseldorf',
      '"knapp aber möglich“ Class Marcel Odenbach, Galerie am Meer, Düsseldorf'
    ]],
    ['2014', [
      '“EN EL CASTILLO“ group exhibition, MIAC (Museo Internacional de Arte Contemporaneo), Lanzarote',
      '"Der Freund krank“ The sick friend - Production of Acting Accomplices, mixed media stage animation, Cologne'
    ]]
  ]
};

/* --------------------------------------------------------------------------
   CONTACT — verbatim from /contact
   -------------------------------------------------------------------------- */

const CONTACT = {
  title: 'HEDDA SCHATTANIK ROMAN SZCZESNY',
  legal: 'IMPRESSUM',
  address: 'Studio Schattanik/Szczesny Königsbergstr 100 40231 Düsseldorf',
  disclaimer: 'Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.',
  email: 'HEDDAROMANSTUDIO@GMAIL.COM'
};
