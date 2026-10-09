/* ==========================================================================
   Hedda Roman — shared behaviour
   Cover pages use a full-bleed media layer. WORK / RECENT / DRAWINGS use a
   scroll-driven gallery. Everything is progressive and dependency-free.
   ========================================================================== */

/* --------------------------------------------------------------------------
   GDPR cookie banner — the original mounts this at runtime for EU visitors.
   Markup and geometry captured from the live DOM (see _tools/cookie-banner.json).
   -------------------------------------------------------------------------- */

function mountCookieBanner() {
  if (document.querySelector('.cookie-banner-mount-point')) return;
  if ((document.cookie.match(/ss_cookieAllowed=true|_ss_cookieConsent=true/) || [])[0]) return;

  const mount = document.createElement('div');
  mount.className = 'cookie-banner-mount-point';
  const c = (window.I18N && I18N.t('cookie')) || { text: '', accept: 'Accept', decline: 'Decline' };
  mount.innerHTML = `
    <section data-section-theme="legacy-dark" aria-label="Cookie banner"
             class="gdpr-cookie-banner BOTTOM legacy-dark bar full-styling">
      <p class="disclaimer-text sqs-cookie-banner-v2-text" data-i18n="cookie.text">${c.text}</p>
      <div class="button-group sqs-cookie-banner-v2-cta-container">
        <button class="decline sqs-button-element--secondary sqs-cookie-banner-v2-deny sqs-cookie-banner-v2-cta"><span data-i18n="cookie.decline">${c.decline}</span></button>
        <button class="accept sqs-button-element--primary sqs-cookie-banner-v2-accept sqs-cookie-banner-v2-cta"><span data-i18n="cookie.accept">${c.accept}</span></button>
      </div>
    </section>`;
  document.body.appendChild(mount);

  const close = () => {
    mount.remove();
    document.cookie = 'ss_cookieAllowed=true; path=/; max-age=31536000; SameSite=Lax';
  };
  mount.querySelector('.accept').addEventListener('click', close);
  mount.querySelector('.decline').addEventListener('click', close);
}

/* --------------------------------------------------------------------------
   Shared chrome builders
   -------------------------------------------------------------------------- */

/* Icon paths are 64x64 viewBox, cut verbatim from the original's
   /universal/svg/social-accounts.svg sprite (see _ref/dom3.out.txt). The
   wrapper is 24px with a 2x-scaled inner div, so the glyph rasterises the
   same way Squarespace renders it. */
const ICONS = {
  instagram:
    '<svg class="social" viewBox="0 0 64 64" aria-hidden="true"><path d="M46.91,25.816c-0.073-1.597-0.326-2.687-0.697-3.641c-0.383-0.986-0.896-1.823-1.73-2.657c-0.834-0.834-1.67-1.347-2.657-1.73c-0.954-0.371-2.045-0.624-3.641-0.697C36.585,17.017,36.074,17,32,17s-4.585,0.017-6.184,0.09c-1.597,0.073-2.687,0.326-3.641,0.697c-0.986,0.383-1.823,0.896-2.657,1.73c-0.834,0.834-1.347,1.67-1.73,2.657c-0.371,0.954-0.624,2.045-0.697,3.641C17.017,27.415,17,27.926,17,32c0,4.074,0.017,4.585,0.09,6.184c0.073,1.597,0.326,2.687,0.697,3.641c0.383,0.986,0.896,1.823,1.73,2.657c0.834,0.834,1.67,1.347,2.657,1.73c0.954,0.371,2.045,0.624,3.641,0.697C27.415,46.983,27.926,47,32,47s4.585-0.017,6.184-0.09c1.597-0.073,2.687-0.326,3.641-0.697c0.986-0.383,1.823-0.896,2.657-1.73c0.834-0.834,1.347-1.67,1.73-2.657c0.371-0.954,0.624-2.045,0.697-3.641C46.983,36.585,47,36.074,47,32S46.983,27.415,46.91,25.816z M44.21,38.061c-0.067,1.462-0.311,2.257-0.516,2.785c-0.272,0.7-0.597,1.2-1.122,1.725c-0.525,0.525-1.025,0.85-1.725,1.122c-0.529,0.205-1.323,0.45-2.785,0.516c-1.581,0.072-2.056,0.087-6.061,0.087s-4.48-0.015-6.061-0.087c-1.462-0.067-2.257-0.311-2.785-0.516c-0.7-0.272-1.2-0.597-1.725-1.122c-0.525-0.525-0.85-1.025-1.122-1.725c-0.205-0.529-0.45-1.323-0.516-2.785c-0.072-1.582-0.087-2.056-0.087-6.061s0.015-4.48,0.087-6.061c0.067-1.462,0.311-2.257,0.516-2.785c0.272-0.7,0.597-1.2,1.122-1.725c0.525-0.525,1.025-0.85,1.725-1.122c0.529-0.205,1.323-0.45,2.785-0.516c1.582-0.072,2.056-0.087,6.061-0.087s4.48,0.015,6.061,0.087c1.462,0.067,2.257,0.311,2.785,0.516c0.7,0.272,1.2,0.597,1.725,1.122c0.525,0.525,0.85,1.025,1.122,1.725c0.205,0.529,0.45,1.323,0.516,2.785c0.072,1.582,0.087,2.056,0.087,6.061S44.282,36.48,44.21,38.061z M32,24.297c-4.254,0-7.703,3.449-7.703,7.703c0,4.254,3.449,7.703,7.703,7.703c4.254,0,7.703-3.449,7.703-7.703C39.703,27.746,36.254,24.297,32,24.297z M32,37c-2.761,0-5-2.239-5-5c0-2.761,2.239-5,5-5s5,2.239,5,5C37,34.761,34.761,37,32,37z M40.007,22.193c-0.994,0-1.8,0.806-1.8,1.8c0,0.994,0.806,1.8,1.8,1.8c0.994,0,1.8-0.806,1.8-1.8C41.807,22.999,41.001,22.193,40.007,22.193z"/></svg>',
  mail:
    '<svg class="social" viewBox="0 0 64 64" aria-hidden="true"><path d="M46.98,18.021H17.02c-1.117,0-2.02,0.903-2.02,2.021v23.917c0,1.117,0.903,2.02,2.02,2.02h29.96c1.117,0,2.02-0.903,2.02-2.02V20.042C49,18.924,48.097,18.021,46.98,18.021z M46.574,21.021L32,32.277L17.426,21.021H46.574z M45,40.979H19V22.99l12.18,9.406c0.239,0.184,0.525,0.276,0.82,0.276s0.581-0.092,0.82-0.276L45,22.99V40.979z"/></svg>'
};

/**
 * Navigation list — labels are written in the case they appear in the source
 * ("WORKS", "recent"); the stylesheet lowercases them, exactly like the
 * original's .navigation-font rule.
 */
function navMarkup(active, base, items) {
  const list = items || SITE.nav;
  /* Resolve the "current" item by href so translated labels still match. */
  const activeItem = active
    ? list.find(it => it.label.toUpperCase() === String(active).toUpperCase())
    : null;
  /* Joined with no whitespace: inline-block <li> would otherwise pick up the
     newline as an extra ~12px text gap, which the original does not have. */
  return list
    .map(item => {
      const isActive = activeItem && item.href === activeItem.href;
      const label = (window.I18N && I18N.navLabel(item.href, item.label)) || item.label;
      return `<li><a href="${base}${item.href}"${isActive ? ' class="is-active"' : ''}>${label}</a></li>`;
    })
    .join('');
}

/* .icon-wrapper > div > svg — the exact three-level nesting the theme uses */
function iconMarkup(path, cls) {
  return `<div><span class="icon-glyph">${path}</span></div>`;
}

function socialMarkup() {
  return (
    `<a href="${SITE.instagram}" target="_blank" rel="noopener" class="icon-wrapper instagram-unauth" aria-label="Instagram">` +
    iconMarkup(ICONS.instagram) +
    `</a>` +
    `<a href="mailto:${SITE.email}" class="icon-wrapper email" aria-label="${SITE.email}">` +
    iconMarkup(ICONS.mail) +
    `</a>`
  );
}
/**
 * Builds the fixed top bar (brand + nav) for index-style pages.
 */
function mountBar(active, base, barSel) {
  const bar = document.querySelector(barSel);
  if (!bar) return;
  bar.innerHTML = `
    <a class="brand" href="${base}index.html">${SITE.brand}</a>
    <nav class="nav" aria-label="Primary"><ul>${navMarkup(active, base)}</ul></nav>`;
}

/* --------------------------------------------------------------------------
   Cover page controller — used by index / contact / work detail
   -------------------------------------------------------------------------- */

/**
 * @param {object} opts
 * @param {string} opts.media      image src for the background
 * @param {string} [opts.mediaType] 'image' | 'gallery'
 * @param {string} [opts.brandHtml] brand text
 * @param {string} [opts.copyHtml]  bottom-left copy
 * @param {string} [opts.activeNav] which nav item is current
 * @param {string} [opts.extraBottom] extra markup in the bottom row
 * @param {number} [opts.rotateMs] if set, cross-fade a set of images
 * @param {string[]} [opts.rotateSet]
 */
function mountCover(opts) {
  /* The theme splits the slide into two sibling layers (layer-back / layer-front).
     Chrome elements therefore live outside [data-cover], so resolve them from
     the document and only touch the ones this page actually rendered. */
  const root = document.querySelector('[data-cover]');
  if (!root) return;

  const media = root.querySelector('.cover__media');
  const brandEl = document.querySelector('[data-brand]');
  const copyEl = document.querySelector('[data-copy]');
  const navEl = document.querySelector('[data-nav]');
  const socialEl = document.querySelector('[data-social]');
  const extraEl = document.querySelector('[data-extra]');

  const base = root.dataset.base || '';

  if (brandEl && !brandEl.dataset.filled) {
    brandEl.innerHTML = `<a href="${base}index.html">${opts.brandHtml || SITE.brand}</a>`;
    brandEl.dataset.filled = '1';
  }
  if (copyEl && !copyEl.dataset.filled) {
    copyEl.innerHTML = opts.copyHtml || '';
    copyEl.dataset.filled = '1';
  }
  if (navEl && !navEl.dataset.filled) {
    /* The theme nests the list: [data-slice-type="navigation"] > ul > li > a.
       The <ul> is load-bearing — the font rules hang off it. */
    navEl.innerHTML = `<ul>${navMarkup(opts.activeNav, base, opts.navItems)}</ul>`;
    navEl.dataset.filled = '1';
  }
  if (socialEl && !socialEl.dataset.filled) {
    socialEl.innerHTML = socialMarkup();
    socialEl.dataset.filled = '1';
  }
  if (extraEl && opts.extraBottom) extraEl.innerHTML = opts.extraBottom;

  /* Tell i18n the chrome is in the DOM so it can translate the freshly
     rendered labels (it also re-runs on load, so this is belt-and-braces). */
  document.dispatchEvent(new CustomEvent('hedda:chrome-ready'));

  if (opts.scrim) root.classList.add('has-scrim');

  /* --- background media, with optional slow cross-fade rotation --- */
  if (!media) return;

  if (opts.videoId) {
    mountVideoBackground(media, opts.videoId, base, opts.media);
    return;
  }

  const set = opts.rotateSet && opts.rotateSet.length ? opts.rotateSet : [opts.media].filter(Boolean);
  if (!set.length) return;

  media.innerHTML = set
    .map((src, i) => `<img src="${base}${src}" alt="" ${i ? 'style="opacity:0"' : ''} data-slide="${i}">`)
    .join('');

  const imgs = Array.from(media.querySelectorAll('img'));

  // portrait stills get contained rather than cropped
  const probe = imgs[0];
  const orient = () => {
    const portrait = probe.naturalHeight > probe.naturalWidth;
    media.classList.toggle('is-framed', portrait);
  };
  if (probe.complete) orient();
  probe.addEventListener('load', orient);

  if (set.length > 1 && opts.rotateMs) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % imgs.length;
      imgs.forEach((im, i) => {
        im.style.transition = 'opacity 1400ms ease';
        im.style.opacity = i === idx ? '1' : '0';
      });
    }, opts.rotateMs);
  }
}

/* --------------------------------------------------------------------------
   Video background — reproduces the original homepage slide, which is a
   full-bleed muted+looping Vimeo embed (vimeo.com/1143107907) with
   Kinoraum_16.jpg as the .custom-fallback-image behind it.

   The theme mounts the iframe lazily and sizes it to cover the viewport
   (16:9 letterbox maths), which is what we replicate here.
   -------------------------------------------------------------------------- */

function mountVideoBackground(media, videoId, base, poster) {
  /* Touch devices: the original theme adds .gallery-video-background.mobile,
     which hides the iframe and shows the still instead — mobile browsers
     block background-video autoplay, so this is also the safe H5 path. */
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (isTouch) {
    media.classList.add('is-mobile');
    if (poster) {
      media.innerHTML = `<img class="custom-fallback-image loaded" src="${base}${poster}" alt="">`;
    }
    return;
  }

  media.innerHTML =
    (poster ? `<img class="custom-fallback-image" src="${base}${poster}" alt="">` : '') +
    `<iframe id="player" class="background-video" src="about:blank" frameborder="0" ` +
    `allow="autoplay; fullscreen; picture-in-picture" allowfullscreen ` +
    `title="background video"></iframe>`;

  const img = media.querySelector('.custom-fallback-image');
  const frame = media.querySelector('iframe');

  /* Vimeo background params, mirroring what the Squarespace player builds.
     background=1 makes the player itself crop to fill, so the iframe can sit
     at inset:0 / 100% and every corner stays covered. */
  const params = new URLSearchParams({
    background: '1',
    autoplay: '1',
    loop: '1',
    muted: '1',
    autopause: '0',
    controls: '0',
    title: '0',
    byline: '0',
    portrait: '0',
    badge: '0',
    transparent: '0',
    dnt: '1'
  });
  const src = `https://player.vimeo.com/video/${videoId}?${params.toString()}`;

  /* Only fade the poster out once the player has really signalled ready —
     otherwise a blocked player would leave an empty background. */
  let faded = false;
  frame.addEventListener('load', () => {
    media.classList.add('is-video-ready');
    if (!faded && img) { faded = true; img.style.opacity = '0'; }
  });

  frame.src = src;
  if (img) img.addEventListener('error', () => { /* keep fallback visible */ });
}

/* --------------------------------------------------------------------------
   Gallery page controller — recent / drawings
   -------------------------------------------------------------------------- */

function mountGallery(opts) {
  const grid = document.querySelector('[data-gallery]');
  if (!grid) return;

  const base = opts.base || '';
  const list = opts.images || [];

  grid.innerHTML = list
    .map(
      (src, i) =>
        `<figure data-i="${i}"><img loading="lazy" src="${base}${src}" alt="Work ${i + 1}"></figure>`
    )
    .join('');

  /* Reveal on scroll */
  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );
  grid.querySelectorAll('figure').forEach((f, i) => {
    f.classList.add('reveal');
    f.style.transitionDelay = `${Math.min(i % 2, 1) * 70}ms`;
    obs.observe(f);
  });

  /* Lightbox */
  const box = document.querySelector('[data-lightbox]');
  if (!box) return;

  const imgEl = box.querySelector('img');
  let cur = 0;

  const show = i => {
    cur = (i + list.length) % list.length;
    imgEl.src = base + list[cur];
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const hide = () => {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  grid.addEventListener('click', e => {
    const fig = e.target.closest('figure');
    if (fig) show(Number(fig.dataset.i));
  });

  box.querySelector('.lightbox__close').addEventListener('click', hide);
  box.querySelector('.prev').addEventListener('click', e => {
    e.stopPropagation();
    show(cur - 1);
  });
  box.querySelector('.next').addEventListener('click', e => {
    e.stopPropagation();
    show(cur + 1);
  });
  box.addEventListener('click', e => {
    if (e.target === box) hide();
  });
  document.addEventListener('keydown', e => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
}

/* Boot: fill chrome, then show the cookie banner like the original does. */
function bootPage() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountCookieBanner, { once: true });
  } else {
    mountCookieBanner();
  }
}

bootPage();

/* --------------------------------------------------------------------------
   Image sets (asset filenames as downloaded)
   -------------------------------------------------------------------------- */

const IMAGES = {
  heroVideoPoster: 'Kinoraum_16-6ea060.jpg',
  contactPoster: 'vlcsnap-2017-12-10-16h41m39s180-b47201.png',
  apartmentMonologue: 'Apartment_Monologue_Stills_013-01276b.png',

  /* /recent — the "recent" gallery, in published order */
  recent: [
    'image-asset-3b63b9.jpeg',
    'image-asset-0a7cab.jpeg',
    'image-asset-dffcc4.jpeg',
    'image-asset-555d46.jpeg',
    'image-asset-5eda8b.jpeg',
    'image-asset-ea06a8.png',
    'image-asset-eb8f2e.jpeg',
    'image-asset-6c1bfe.jpeg',
    'image-asset-73ca38.jpeg',
    'image-asset-ffdf88.jpeg',
    'image-asset-bc7c0e.jpeg',
    'image-asset-a27dd8.png',
    'image-asset-7b0012.png',
    'image-asset-578faa.png',
    'image-asset-4bf55b.jpeg',
    'philara_190704_SchatSzcz_c_002b-de28a5.jpg',
    'philara_190704_SchatSzcz_d_014b2-0565c6.jpg',
    'philara_190704_SchatSzcz_c_036b-1194b2.jpg',
    'philara_190704_SchatSzcz_b_014b-eb8a62.jpg',
    'IMG-20190205-WA0006-990c3a.jpg',
    'media_art_award-8c992d.jpg',
    'Katalog_Marl_Text_web-cab0e4.jpg',
    '2018-01-15_03.21.19_2-bca95f.jpg',
    '35540581_341499843047975_8783034539216732160_n-45ebc5.jpg',
    'SPIEGEL_2016_22_144989363-1-0565bf.jpg',
    'KVD_Jahresgaben_2017_2018-1-2c1106.jpg',
    'KVD_Jahresgaben_2017_2018-12-519ca1.jpg',
    'Hello-084a8f.jpg',
    'maga_final-1-8ace14.jpg',
    'maga_final-4-8e92e4.jpg',
    'maga_final-5-7ed984.jpg',
    'Mary_und_der_vulkan-1-2eebe0.jpg',
    'received_1017236025050665-66517f.jpeg',
    'Mary_und_der_vulkan-2-2d199c.jpg',
    'Mary_und_der_vulkan-3-5c2ec9.jpg',
    'Mary_und_der_vulkan-4-095fbf.jpg',
    'Mary_und_der_vulkan-5-74dbe1.jpg',
    'Unbenannt-1-0fb008.gif',
    'Unbenannt-2-fdf9c5.gif',
    'Unbenannt-3-17b6af.gif',
    'Unbenannt-4-7d9777.gif',
    'Unbenannt-5-f9326e.gif',
    'Unbenannt-6-eeddcf.gif',
    'Unbenannt-9-cef916.gif',
    'Unbenannt-11-b1ba2f.gif',
    'Unbenannt-41-905b0d.gif',
    'Bilder_Katalog_McKinsey3-9ce756.jpg',
    'Bilder_Katalog_McKinsey4-6b84ba.jpg',
    '_0003079-e789c6.jpg',
    '_0003080-66f8bd.jpg',
    '_00030o67-243030.jpg'
  ]
};

/* /drawings — 66 scanned pages, Seite 1..66 */
IMAGES.drawings = Array.from({ length: 66 }, (_, i) => {
  const map = {
    1: 'Seite_1-1c589d.png', 2: 'Seite_2-ce9432.png', 3: 'Seite_3-9cf06a.png',
    4: 'Seite_4-c386ce.png', 5: 'Seite_5-073415.png', 6: 'Seite_6-415791.png',
    7: 'Seite_7-d753f8.png', 8: 'Seite_8-6d6477.png', 9: 'Seite_9-b748d3.png',
    10: 'Seite_10-9fe471.png', 11: 'Seite_11-e303cd.png', 12: 'Seite_12-ab8d45.png',
    13: 'Seite_13-fb5c43.png', 14: 'Seite_14-015670.png', 15: 'Seite_15-f6c0fd.png',
    16: 'Seite_16-a3869d.png', 17: 'Seite_17-9ab481.png', 18: 'Seite_18-2c09bd.png',
    19: 'Seite_19-85798c.png', 20: 'Seite_20-ca869e.png', 21: 'Seite_21-50bc45.png',
    22: 'Seite_22-1e6471.png', 23: 'Seite_23-120edb.png', 24: 'Seite_24-44b149.png',
    25: 'Seite_25-a0054d.png', 26: 'Seite_26-32c259.png', 27: 'Seite_27-693a1b.png',
    28: 'Seite_28-58c0da.png', 29: 'Seite_29-4762fd.png', 30: 'Seite_30-c539d8.png',
    31: 'Seite_31-d50a47.png', 32: 'Seite_32-8759a1.png', 33: 'Seite_33-5933d8.png',
    34: 'Seite_34-a4965e.png', 35: 'Seite_35-5bcca4.png', 36: 'Seite_36-27ab91.png',
    37: 'Seite_37-031570.png', 38: 'Seite_38-dd7b6e.png', 39: 'Seite_39-346eb0.png',
    40: 'Seite_40-f38ff8.png', 41: 'Seite_41-1ed7de.png', 42: 'Seite_42-53f20f.png',
    43: 'Seite_43-ea1a3e.png', 44: 'Seite_44-649559.png', 45: 'Seite_45-1d97af.png',
    46: 'Seite_46-9bd5a1.png', 47: 'Seite_47-ffb098.png', 48: 'Seite_48-40d02a.png',
    49: 'Seite_49-553491.png', 50: 'Seite_50-f04b41.png', 51: 'Seite_51-fd5ca7.png',
    52: 'Seite_52-d47332.png', 53: 'Seite_53-c21f11.png', 54: 'Seite_54-10c302.png',
    55: 'Seite_55-34c7ed.png', 56: 'Seite_56-f9aef1.png', 57: 'Seite_57-0e2257.png',
    58: 'Seite_58-b12f50.png', 59: 'Seite_59-88b486.png', 60: 'Seite_60-e6349b.png',
    61: 'Seite_61-2fa77d.png', 62: 'Seite_62-388f3c.png', 63: 'Seite_63-cd0b2a.png',
    64: 'Seite_64-b1f778.png', 65: 'Seite_65-ca653b.png', 66: 'Seite_66-44b2a8.png'
  };
  return map[i + 1];
});
