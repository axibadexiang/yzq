/* ==========================================================================
   Hedda Roman — i18n (EN / DE / ZH)

   UI chrome is trilingual. Artwork titles and CV entries stay in the language
   they were published in (proper titles / factual records).

   Design notes
   ------------
   * The switcher relies on a single delegated click listener on `document`,
     so it keeps working no matter when (or how often) the buttons are
     rendered. Earlier versions bound the listener to the host node, which
     broke on pages where the chrome is re-rendered by another script.
   * `refresh()` is idempotent and is re-run on DOMContentLoaded, window.load,
     page restore from bfcache (pageshow) and on the `hedda:chrome-ready`
     event that app.js dispatches after filling the nav.
   ========================================================================== */

(function (global) {
  'use strict';

  var DICT = {
    en: {
      htmlLang: 'en',
      nav: [
        { label: 'works',    href: 'works.html' },
        { label: 'drawings', href: 'drawings.html' },
        { label: 'cv',       href: 'cv.html' },
        { label: 'recent',   href: 'recent.html' },
        { label: 'contact',  href: 'contact.html' },
        { label: 'press',    href: 'press.html' }
      ],
      titles: {
        home: 'Hedda Roman', works: 'works — Hedda Roman',
        drawings: 'drawings — Hedda Roman', cv: 'cv — Hedda Roman',
        recent: 'recent — Hedda Roman', contact: 'contact — Hedda Roman',
        press: 'press — Hedda Roman'
      },
      cookie: {
        text: 'By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively.',
        accept: 'Accept', decline: 'Decline'
      },
      cvHeadings: { awards: 'Awards', shows: 'Exhibitions / Screenings / Readings' },
      press: {
        title: 'PRESS',
        subtitle: 'Selected press coverage.',
        section: 'Press'
      },
      contact: {
        legal: 'Legal notice',
        disclaimer: 'Liability notice: although we carefully monitor the contents of external links, we assume no liability for them. The operators of the linked pages are solely responsible for their content.'
      },
      langLabel: 'language'
    },

    de: {
      htmlLang: 'de',
      nav: [
        { label: 'werke',       href: 'works.html' },
        { label: 'zeichnungen', href: 'drawings.html' },
        { label: 'lebenslauf',  href: 'cv.html' },
        { label: 'aktuelles',   href: 'recent.html' },
        { label: 'kontakt',     href: 'contact.html' },
        { label: 'presse',      href: 'press.html' }
      ],
      titles: {
        home: 'Hedda Roman', works: 'werke — Hedda Roman',
        drawings: 'zeichnungen — Hedda Roman', cv: 'lebenslauf — Hedda Roman',
        recent: 'aktuelles — Hedda Roman', contact: 'kontakt — Hedda Roman',
        press: 'presse — Hedda Roman'
      },
      cookie: {
        text: 'Mit der Nutzung dieser Website stimmen Sie der Verwendung von Cookies zu. Wir verwenden Cookies, um Ihnen ein gutes Erlebnis zu bieten und damit unsere Website reibungslos läuft.',
        accept: 'Akzeptieren', decline: 'Ablehnen'
      },
      cvHeadings: { awards: 'Auszeichnungen', shows: 'Ausstellungen / Screenings / Lesungen' },
      press: {
        title: 'PRESSE',
        subtitle: 'Ausgewählte Pressestimmen.',
        section: 'Presse'
      },
      contact: {
        legal: 'Impressum',
        disclaimer: 'Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.'
      },
      langLabel: 'sprache'
    },

    zh: {
      htmlLang: 'zh',
      nav: [
        { label: '作品',     href: 'works.html' },
        { label: '素描',     href: 'drawings.html' },
        { label: '简历',     href: 'cv.html' },
        { label: '近况',     href: 'recent.html' },
        { label: '联系',     href: 'contact.html' },
        { label: '媒体报道', href: 'press.html' }
      ],
      titles: {
        home: 'Hedda Roman', works: '作品 — Hedda Roman',
        drawings: '素描 — Hedda Roman', cv: '简历 — Hedda Roman',
        recent: '近况 — Hedda Roman', contact: '联系 — Hedda Roman',
        press: '媒体报道 — Hedda Roman'
      },
      cookie: {
        text: '使用本网站即表示您同意我们使用 Cookie。我们使用 Cookie 为您提供良好的浏览体验，并帮助网站正常运行。',
        accept: '接受', decline: '拒绝'
      },
      cvHeadings: { awards: '奖项', shows: '展览 / 放映 / 朗读' },
      press: {
        title: '媒体报道',
        subtitle: '精选媒体报道。',
        section: '媒体报道'
      },
      contact: {
        legal: '法律声明',
        disclaimer: '免责声明：我们对本站所链接的外部内容已尽审慎核查义务，但对其内容不承担任何责任；外部页面的内容由其运营者自行负责。'
      },
      langLabel: '语言'
    }
  };

  var ORDER = ['en', 'de', 'zh'];
  var NAMES = { en: 'en', de: 'de', zh: '中文' };
  var KEY = 'hedda-lang';

  /* --- language resolution ------------------------------------------------- */

  function norm(code) {
    if (!code) return null;
    code = String(code).toLowerCase();
    if (code.indexOf('zh') === 0) return 'zh';
    if (code.indexOf('de') === 0) return 'de';
    if (code.indexOf('en') === 0) return 'en';
    return null;
  }

  function lang() {
    try {
      var saved = norm(localStorage.getItem(KEY));
      if (saved) return saved;
    } catch (_) { /* storage blocked (file://, private mode) */ }
    /* navigator.languages gives the ordered preference list — better than
       navigator.language on browsers that report a regional default first. */
    var list = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language];
    for (var i = 0; i < list.length; i++) {
      var n = norm(list[i]);
      if (n) return n;
    }
    return 'en';
  }

  /* dotted lookup; returns null when the key is missing (callers skip) */
  function t(path) {
    var d = DICT[lang()];
    var parts = String(path).split('.');
    for (var i = 0; i < parts.length; i++) {
      if (d == null) return null;
      d = d[parts[i]];
    }
    return d == null ? null : d;
  }

  /* translated label for a nav href (falls back to the data.js label) */
  function navLabel(href, fallback) {
    if (!href) return fallback;
    var list = DICT[lang()].nav || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].href === href) return list[i].label;
    }
    return fallback;
  }

  /* --- rendering ---------------------------------------------------------- */

  function switcherMarkup() {
    var html = '';
    for (var i = 0; i < ORDER.length; i++) {
      var code = ORDER[i];
      html += '<button type="button" data-set-lang="' + code + '" aria-label="' +
              DICT[code].langLabel + '">' + NAMES[code] + '</button>';
    }
    return html;
  }

  function mountLang() {
    var hosts = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < hosts.length; i++) {
      var host = hosts[i];
      if (host.getAttribute('data-filled') === '1') continue;
      host.innerHTML = switcherMarkup();
      host.setAttribute('data-filled', '1');
    }
  }

  function markActive() {
    var cur = lang();
    var btns = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-set-lang') === cur;
      btns[i].classList.toggle('is-active', on);
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  /* Rewrite every rendered nav from the dictionary, matching by href so the
     active state (and any page-specific item list) survives. */
  function applyNav() {
    var nodes = document.querySelectorAll('[data-nav]');
    for (var i = 0; i < nodes.length; i++) {
      var links = nodes[i].querySelectorAll('a[href]');
      for (var j = 0; j < links.length; j++) {
        var a = links[j];
        var label = navLabel(a.getAttribute('href'), null);
        if (label) a.textContent = label;
      }
    }
  }

  function applyText() {
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var v = t(el.getAttribute('data-i18n'));
      if (typeof v === 'string') el.textContent = v;
    }

    var key = document.body && document.body.getAttribute('data-title-key');
    var pageTitle = key ? t('titles.' + key) : null;
    if (typeof pageTitle === 'string') document.title = pageTitle;

    var html = document.documentElement;
    if (html) html.setAttribute('lang', DICT[lang()].htmlLang);
  }

  function apply(code) {
    if (code) { try { localStorage.setItem(KEY, norm(code) || 'en'); } catch (_) {} }
    applyText();
    applyNav();
    markActive();
    try {
      document.dispatchEvent(new CustomEvent('hedda:lang', { detail: { lang: lang() } }));
    } catch (_) { /* very old browsers */ }
  }

  function set(code) { apply(norm(code) || 'en'); }

  function refresh() { mountLang(); apply(); }

  /* --- wiring ------------------------------------------------------------- */

  /* One delegated listener for the whole document: survives re-renders. */
  document.addEventListener('click', function (e) {
    var el = e.target;
    var btn = el && el.closest ? el.closest('[data-set-lang]') : null;
    if (!btn) return;
    e.preventDefault();
    set(btn.getAttribute('data-set-lang'));
  }, false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh, { once: true });
  } else {
    refresh();
  }
  window.addEventListener('load', refresh);
  window.addEventListener('pageshow', function (e) { if (e.persisted) refresh(); });
  document.addEventListener('hedda:chrome-ready', refresh);

  global.I18N = {
    lang: lang, set: set, t: t, apply: apply, refresh: refresh,
    navLabel: navLabel, DICT: DICT, ORDER: ORDER, NAMES: NAMES
  };
})(window);
