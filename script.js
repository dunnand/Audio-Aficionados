// ============================================================
// AUDIO AFICIONADOS — Main Application Script
// ============================================================

// --- Slide definitions --------------------------------------
// Short mode: 8 slides shown by default
const SLIDES_SHORT = [
  'intro',            // Album Intro / Start Listening
  'tracklist',        // Tracklist + Release Facts
  'listen-for',       // Listen For + Key Songs (combined)
  'artist-snapshot',  // Artist Snapshot (photo + bullets)
  'influences',       // Influences + Legacy
  'discography',      // Discography
  'reaction',         // Class Reaction + Score
  'ratings',          // All-time Class Ratings board
  'coming-next'       // Coming Next Week + Homework
];

// Expanded mode: adds historical context, why-matters, archive
const SLIDES_EXPANDED = [
  'intro', 'tracklist', 'listen-for',
  'artist-snapshot', 'influences', 'historical-context',
  'why-matters', 'discography', 'reaction', 'ratings', 'archive', 'coming-next'
];

const SLIDE_LABELS_SHORT = [
  'Album Intro', 'Tracklist', 'Listen For + Key Songs',
  'Artist Snapshot', 'Influences & Legacy', 'Discography', 'Class Reaction', 'Class Ratings', 'Coming Next Week'
];

const SLIDE_LABELS_EXPANDED = [
  'Album Intro', 'Tracklist', 'Listen For + Key Songs',
  'Artist Snapshot', 'Influences & Legacy', 'Historical Context',
  'Why It Matters', 'Discography', 'Class Reaction', 'Class Ratings', 'Archive', 'Coming Next Week'
];

const SLIDE_LABEL_MAP = {
  'intro': 'Album Intro', 'tracklist': 'Tracklist', 'listen-for': 'What to Listen For',
  'sound-snapshot': 'Sound Snapshot', 'artist-snapshot': 'Artist Snapshot',
  'influences': 'Influences & Legacy', 'historical-context': 'Historical Context',
  'why-matters': 'Why It Matters', 'discography': 'Discography',
  'reaction': 'Class Reaction', 'archive': 'Archive', 'coming-next': 'Coming Next Week'
};

const STORAGE_PREFIX = 'aa_edit_';
const STORAGE_SETTINGS = 'aa_settings';
const STORAGE_DASHBOARD = 'aa_dashboard_open';

// --- Site passcode gate -------------------------------------
// The site is publicly hosted; this keeps edits and teacher tools
// behind the class passcode. Asked once per browser.
const SITE_PASSCODE = '2027';
const STORAGE_ACCESS = 'aa_access';

function isUnlocked() {
  try { return localStorage.getItem(STORAGE_ACCESS) === SITE_PASSCODE; }
  catch(e) { return false; }
}

function buildGate() {
  const app = document.getElementById('app');
  if (!app) return;
  app.className = '';
  app.innerHTML = `<div class="gate-screen">
    <div class="gate-box">
      <div class="gate-logo"><span>Audio</span> Aficionados</div>
      <div class="gate-sub">Enter the class passcode to continue</div>
      <input type="password" id="gate-input" class="gate-input" placeholder="Passcode" autocomplete="off">
      <div class="gate-error" id="gate-error"></div>
      <button class="btn btn-primary gate-btn" id="gate-btn">Enter</button>
    </div>
  </div>`;
  const tryUnlock = () => {
    const v = document.getElementById('gate-input').value.trim();
    if (v === SITE_PASSCODE) {
      try { localStorage.setItem(STORAGE_ACCESS, v); } catch(e) {}
      startApp();
    } else {
      document.getElementById('gate-error').textContent = 'Incorrect passcode.';
      document.getElementById('gate-input').value = '';
    }
  };
  document.getElementById('gate-btn').addEventListener('click', tryUnlock);
  document.getElementById('gate-input').addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });
  document.getElementById('gate-input').focus();
}

// --- Firebase cloud sync ------------------------------------
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyADo4bTrSIgnLwQkYXsIIbivyZSPcNHATM",
  authDomain: "audioaficionados-21ba0.firebaseapp.com",
  projectId: "audioaficionados-21ba0",
  storageBucket: "audioaficionados-21ba0.firebasestorage.app",
  messagingSenderId: "94178984100",
  appId: "1:94178984100:web:0b60930161c8c882e02631"
};

let _db = null;
function getDB() {
  if (_db) return _db;
  if (typeof firebase === 'undefined') return null;
  if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
  _db = firebase.firestore();
  return _db;
}

async function syncFromCloud() {
  const db = getDB();
  if (!db) return;
  try {
    const [editsSnap, artworkSnap] = await Promise.all([
      db.collection('edits').get(),
      db.collection('aa').doc('artwork').get()
    ]);
    editsSnap.forEach(doc => {
      localStorage.setItem(STORAGE_PREFIX + doc.id, JSON.stringify(doc.data()));
    });
    if (artworkSnap.exists) {
      const data = artworkSnap.data() || {};
      Object.entries(data).forEach(([k, v]) => {
        if (k.startsWith('aw_override_') && v) localStorage.setItem(k, v);
      });
    }
  } catch(e) { /* offline — use localStorage */ }
}

function cloudSaveEdit(id, data) {
  const db = getDB(); if (!db) return;
  db.collection('edits').doc(id).set(data).catch(() => {});
}

function cloudDeleteEdit(id) {
  const db = getDB(); if (!db) return;
  db.collection('edits').doc(id).delete().catch(() => {});
}

function cloudSaveArtwork(key, url) {
  const db = getDB(); if (!db) return;
  const update = {};
  update[key] = url ? url : firebase.firestore.FieldValue.delete();
  db.collection('aa').doc('artwork').set(update, { merge: true }).catch(() => {});
}

// --- Application State --------------------------------------
const APP = {
  view: 'home',
  albumId: null,
  slideIndex: 0,
  projectorMode: false,
  safeMode: true,
  artworkCache: {},
  dashboardOpen: true,
};

// --- Settings persistence -----------------------------------
function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_SETTINGS) || '{}');
    if (typeof s.safeMode === 'boolean') APP.safeMode = s.safeMode;
    const dashPref = localStorage.getItem(STORAGE_DASHBOARD);
    if (dashPref !== null) APP.dashboardOpen = dashPref === 'true';
  } catch(e) {}
}
function saveSettings() {
  localStorage.setItem(STORAGE_SETTINGS, JSON.stringify({ safeMode: APP.safeMode }));
  localStorage.setItem(STORAGE_DASHBOARD, String(APP.dashboardOpen));
}

// --- Data layer ---------------------------------------------
function getStoredEdits(id) {
  try { return JSON.parse(localStorage.getItem(STORAGE_PREFIX + id) || 'null'); }
  catch(e) { return null; }
}
function saveStoredEdits(id, data) {
  localStorage.setItem(STORAGE_PREFIX + id, JSON.stringify(data));
  cloudSaveEdit(id, data);
}
function clearStoredEdits(id) {
  localStorage.removeItem(STORAGE_PREFIX + id);
  cloudDeleteEdit(id);
}
function getAlbum(id) {
  const base = albumLibrary.find(a => a.id === id);
  if (!base) return null;
  const edits = getStoredEdits(id);
  if (!edits) return deepClone(base);
  return deepMerge(deepClone(base), edits);
}
function getAllAlbums() {
  return albumLibrary.map(a => getAlbum(a.id));
}
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] === null || source[key] === undefined) continue;
    if (Array.isArray(source[key])) {
      target[key] = source[key];
    } else if (typeof source[key] === 'object' && !Array.isArray(target[key])) {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Returns the active slide list for an album
function getSlides(album) {
  const mode = album?.presentationLength || 'short';
  return mode === 'expanded' ? SLIDES_EXPANDED : SLIDES_SHORT;
}
function getSlideLabels(album) {
  const mode = album?.presentationLength || 'short';
  return mode === 'expanded' ? SLIDE_LABELS_EXPANDED : SLIDE_LABELS_SHORT;
}

// --- Artwork System ------------------------------------------
// Priority:
//   1. Teacher-chosen override (saved in localStorage per key)
//   2. Verified local file (verifiedByTeacher: true in manifest)
//   3. Claude-suggested URL (Cover Art Archive, verified per-album)
//   4. Text-only fallback card

function generateArtworkKey(artist, title) {
  const slugify = s => s.toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
    .replace(/\s+/g, '-');
  return `${slugify(artist)}-${slugify(title)}`;
}

function getStudentArtwork(artworkKey) {
  // 1. Teacher override (URL chosen via Replace button)
  const override = localStorage.getItem('aw_override_' + artworkKey);
  if (override) return { type: 'image', src: override, override: true };

  const entry = (typeof artworkManifest !== 'undefined') ? artworkManifest[artworkKey] : null;

  // 2. Verified local file
  if (entry?.verifiedByTeacher && entry.localFile) {
    return { type: 'image', src: entry.localFile, local: true };
  }
  // 3. Manifest-provided suggested URL (main albums, pre-looked-up)
  if (entry?.suggestedUrl) {
    return { type: 'image', src: entry.suggestedUrl, suggested: true };
  }
  // 4. Auto-searched URL cached in localStorage (discography + ungrouped albums)
  const cached = localStorage.getItem('aw_auto_' + artworkKey);
  if (cached === 'none') return { type: 'none' };   // already searched, nothing found
  if (cached) return { type: 'image', src: cached, auto: true };

  // 5. Needs an auto-search (no manifest entry, no cache yet)
  return { type: 'pending' };
}

function setArtworkOverride(artworkKey, url) {
  if (url) localStorage.setItem('aw_override_' + artworkKey, url);
  else localStorage.removeItem('aw_override_' + artworkKey);
  cloudSaveArtwork('aw_override_' + artworkKey, url || null);
}

// Search MusicBrainz → Cover Art Archive for a single album, cache the result.
// Queued with a 1.1 s delay between requests (MusicBrainz rate limit: 1 req/s).
const _autoSearchInFlight = new Set();
let _autoSearchQueue = Promise.resolve();
function _mbDelay() { return new Promise(r => setTimeout(r, 1100)); }

async function autoSearchArtwork(artworkKey, artist, title) {
  if (_autoSearchInFlight.has(artworkKey)) return;
  if (localStorage.getItem('aw_auto_' + artworkKey) !== null) return;
  _autoSearchInFlight.add(artworkKey);

  // Chain onto the shared queue so only one request runs at a time
  _autoSearchQueue = _autoSearchQueue.then(() => _doAutoSearch(artworkKey, artist, title)).then(_mbDelay);
}

async function _doAutoSearch(artworkKey, artist, title) {

  let url = null;
  try {
    const a = encodeURIComponent(artist), t = encodeURIComponent(title);
    const resp = await fetch(
      `https://musicbrainz.org/ws/2/release-group/?query=releasegroup:%22${t}%22%20AND%20artistname:%22${a}%22&limit=3&fmt=json`,
      { headers: { 'Accept': 'application/json' } }
    );
    if (resp.ok) {
      const data = await resp.json();
      const rg = (data['release-groups'] || [])[0];
      if (rg?.id) url = `https://coverartarchive.org/release-group/${rg.id}/front`;
    }
  } catch(e) {}

  localStorage.setItem('aw_auto_' + artworkKey, url || 'none');
  _autoSearchInFlight.delete(artworkKey);

  // Update any matching frame already in the DOM
  if (url) {
    document.querySelectorAll(`[data-aw-auto="${artworkKey}"]`).forEach(frame => {
      const fb = frame.querySelector('.artwork-fallback');
      const img = new Image();
      img.alt = `${title} by ${artist}`;
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      img.onerror = () => {};
      img.onload = () => {
        if (fb) fb.style.display = 'none';
        frame.insertBefore(img, frame.firstChild);
      };
      img.src = url;
    });
  }
}

// --- Teacher Research Tools (never called during presentations) ---
// These functions are kept for use in the Artwork Setup page only.
// They are NOT called during Projector Mode or student-facing slides.

function _normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
}
function _findBestMatch(results, artist, title) {
  const na = _normalize(artist), nt = _normalize(title);
  const ntDense = nt.replace(/\s+/g, '');
  const rn = r => _normalize(r.collectionName || '');
  const ra = r => _normalize(r.artistName || '');
  for (const r of results) if (ra(r)===na && (rn(r)===nt || rn(r).replace(/\s+/g,'')===ntDense)) return r;
  for (const r of results) if (ra(r)===na && rn(r).includes(nt)) return r;
  for (const r of results) if (ra(r).includes(na) && (rn(r)===nt || rn(r).replace(/\s+/g,'')===ntDense)) return r;
  for (const r of results) if (rn(r)===nt || rn(r).replace(/\s+/g,'')===ntDense) return r;
  return null;
}
async function _teacherItunesSearch(artist, title) {
  const q = encodeURIComponent(`${title} ${artist}`);
  try {
    const resp = await fetch(`https://itunes.apple.com/search?term=${q}&media=music&entity=album&country=US&limit=10`);
    if (!resp.ok) return [];
    const data = await resp.json();
    return data.results || [];
  } catch(e) { return []; }
}

// --- Artist Image System ------------------------------------
async function fetchArtistImage(album, artistNameOverride) {
  const name = artistNameOverride || album?.artist || '';
  if (!name) return null;

  const ai = (artistNameOverride ? null : album?.artistImages) || {};

  if (ai.manualArtistImageUrl) return ai.manualArtistImageUrl;
  if (ai.localArtistImageFile) return ai.localArtistImageFile;

  // Cache holds the in-flight promise first, then the final result, so
  // parallel or repeated renders never trigger duplicate lookups AND a
  // slow first lookup can't get stuck cached as a failure.
  const cacheKey = `artist-img::${name.toLowerCase()}`;
  if (APP.artworkCache[cacheKey] !== undefined) return APP.artworkCache[cacheKey];

  const lookup = (async () => {
    // 1. TheAudioDB (free, no key needed — but blocked on some school networks)
    try {
      const q = encodeURIComponent(name);
      const res = await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${q}`);
      if (res.ok) {
        const data = await res.json();
        const thumb = data?.artists?.[0]?.strArtistThumb;
        if (thumb) return thumb;
      }
    } catch(e) {}

    // 2. Last.fm (optional, requires key in artistImages)
    if (ai.lastFmApiKey) {
      try {
        const n = encodeURIComponent(ai.lastFmArtistName || name);
        const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${n}&api_key=${ai.lastFmApiKey}&format=json`);
        const data = await res.json();
        const images = data?.artist?.image;
        if (images) {
          const large = images.find(i => i.size==='extralarge') || images[images.length-1];
          if (large?.['#text'] && large['#text'] !== '') return large['#text'];
        }
      } catch(e) {}
    }

    // 3. Wikipedia page image (no key, reliable on school networks)
    return await fetchWikipediaImage(name);
  })();

  APP.artworkCache[cacheKey] = lookup;
  const url = await lookup;
  APP.artworkCache[cacheKey] = url;
  return url;
}

async function fetchWikipediaImage(name) {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name.replace(/ /g, '_'))}`);
    if (res.ok) {
      const data = await res.json();
      const src = data?.thumbnail?.source;
      if (src && data.type !== 'disambiguation') return src.replace(/\/(\d+)px-/, '/500px-');
    }
  } catch(e) {}
  return null;
}

function _placeArtistImage(elId, name, url, fallbackName) {
  const img = new Image();
  img.alt = name;
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:top center;display:block;';
  img.onload = () => { const t = document.getElementById(elId); if (t) { t.innerHTML=''; t.appendChild(img); t.classList.add('has-image'); } };
  if (fallbackName) {
    // If this image host is blocked, retry once with Wikipedia's image
    img.onerror = async () => {
      const wiki = await fetchWikipediaImage(fallbackName);
      if (wiki && wiki !== url) {
        APP.artworkCache[`artist-img::${fallbackName.toLowerCase()}`] = wiki;
        _placeArtistImage(elId, name, wiki, null);
      }
    };
  }
  img.src = url;
}

async function loadArtistImageElement(elId, album, artistNameOverride) {
  const url = await fetchArtistImage(album, artistNameOverride);
  const el = document.getElementById(elId);
  if (!el || !url) return;
  const name = artistNameOverride || album?.artist || '';
  _placeArtistImage(elId, name, url, name);
}

// Scan the DOM and trigger all async image loads.
function loadArtworkInView() {
  // Discography / ungrouped frames waiting for auto-search
  document.querySelectorAll('[data-aw-auto]').forEach(el => {
    const key = el.dataset.awAuto;
    const artist = el.dataset.awArtist || '';
    const title  = el.dataset.awTitle  || '';
    if (key && artist && title) autoSearchArtwork(key, artist, title);
  });
  // Artist portrait images (TheAudioDB)
  document.querySelectorAll('[data-artist-img]').forEach(el => {
    const albumId = el.dataset.albumId;
    const album = albumId ? getAlbum(albumId) : null;
    loadArtistImageElement(el.id, album, el.dataset.artistOverride||null);
  });
  // Influence map artist thumbnails (TheAudioDB)
  document.querySelectorAll('[data-inf-img]').forEach(el => {
    loadArtistImageElement(el.id, null, el.dataset.infArtist || '');
  });
  // Band member portrait images
  document.querySelectorAll('[data-member-img]').forEach(el => {
    const manualUrl = el.dataset.manualUrl;
    if (manualUrl) {
      const img = new Image();
      img.alt = el.dataset.memberName || '';
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:top center;display:block;';
      img.onload = () => { const t = document.getElementById(el.id); if (t) { t.innerHTML = ''; t.appendChild(img); t.classList.add('has-image'); } };
      img.src = manualUrl;
    } else {
      loadArtistImageElement(el.id, null, el.dataset.memberName || '');
    }
  });
}

// Render an album artwork frame. In Teacher Mode a Replace button is overlaid.
// Clicking Replace opens the artwork picker modal with alternative options.
function artworkFrame(id, artist, title, extraClass='', artworkKey='') {
  const key = artworkKey || generateArtworkKey(artist, title);
  const art = getStudentArtwork(key);
  const isTeacher = !APP.projectorMode;

  const fbHtml = `<div class="artwork-fallback">
    <div class="fb-icon">&#9835;</div>
    <div class="fb-title">${esc(title || 'Album')}</div>
    ${artist ? `<div class="fb-artist">${esc(artist)}</div>` : ''}
  </div>`;

  const replaceBtn = isTeacher
    ? `<button class="aw-replace-btn teacher-only"
         data-aw-key="${esc(key)}" data-aw-artist="${esc(artist)}" data-aw-title="${esc(title)}"
         title="Replace cover art">&#9998; Replace</button>`
    : '';

  if (art.type === 'image') {
    return `<div class="artwork-frame ${extraClass}" id="${id}">
      <img src="${esc(art.src)}" alt="${esc(title)} by ${esc(artist)}"
           style="width:100%;height:100%;object-fit:cover;display:block;"
           onerror="this.style.display='none';var f=this.nextElementSibling;if(f)f.style.display='flex'">
      ${fbHtml}
      ${replaceBtn}
    </div>`;
  }
  // Pending: no URL yet — render placeholder, auto-search will fill it in
  const autoAttr = art.type === 'pending'
    ? ` data-aw-auto="${esc(key)}" data-aw-artist="${esc(artist)}" data-aw-title="${esc(title)}"`
    : '';
  const fbVisible = fbHtml.replace('class="artwork-fallback"', 'class="artwork-fallback" style="display:flex"');
  return `<div class="artwork-frame ${extraClass}" id="${id}"${autoAttr}>${fbVisible}${replaceBtn}</div>`;
}

// ============================================================
// ARTWORK PICKER MODAL (Teacher Mode)
// ============================================================
function openArtworkPicker(key, artist, title) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!overlay || !content) return;

  const current = getStudentArtwork(key);
  const currentSrc = current.type === 'image' ? current.src : '';
  const currentLabel = current.override ? 'Your choice' : current.local ? 'Local file' : current.suggested ? 'Claude suggestion' : 'No cover';

  content.innerHTML = `
    <div class="aw-picker">
      <div class="aw-picker-header">
        <div class="aw-picker-title">Replace Cover — <em>${esc(title)}</em></div>
        <button class="modal-close-btn" data-action="close-modal">&#10005;</button>
      </div>

      <div class="aw-picker-body">
        <div class="aw-picker-current">
          <div class="aw-picker-current-label">Current cover <span class="aw-source-tag">${esc(currentLabel)}</span></div>
          ${currentSrc
            ? `<img class="aw-picker-preview" src="${esc(currentSrc)}" alt="Current cover">`
            : `<div class="aw-picker-preview aw-preview-empty"><span>&#9835;</span><span>${esc(title)}</span></div>`}
          ${current.override
            ? `<button class="btn btn-sm btn-ghost aw-reset-btn" data-aw-key="${esc(key)}">&#8635; Reset to suggested</button>`
            : ''}
        </div>

        <div class="aw-picker-options">
          <div class="aw-picker-section-title">Upload from your computer</div>
          <label class="aw-upload-label">
            <input type="file" accept="image/*" class="aw-file-input" data-aw-key="${esc(key)}" data-aw-artist="${esc(artist)}" data-aw-title="${esc(title)}">
            <span class="btn btn-primary">&#8679; Choose image file</span>
          </label>

          <div class="aw-picker-section-title" style="margin-top:20px;">Search for alternatives</div>
          <div class="aw-search-row">
            <input class="aw-search-input" type="text" placeholder="${esc(artist)} — ${esc(title)}" value="${esc(artist)} ${esc(title)}" id="aw-search-query">
            <button class="btn btn-secondary aw-search-btn" data-aw-key="${esc(key)}" data-aw-artist="${esc(artist)}" data-aw-title="${esc(title)}">Search</button>
          </div>
          <div class="aw-results-grid" id="aw-results-grid">
            <div class="aw-results-hint">Click Search to find alternative covers from iTunes &amp; Cover Art Archive.</div>
          </div>
        </div>
      </div>
    </div>`;

  overlay.classList.remove('hidden');
}

async function runArtworkSearch(key, artist, title) {
  const grid = document.getElementById('aw-results-grid');
  const query = document.getElementById('aw-search-query')?.value || `${artist} ${title}`;
  if (!grid) return;
  grid.innerHTML = '<div class="aw-results-hint">Searching…</div>';

  const results = [];

  // iTunes search
  try {
    const q = encodeURIComponent(query);
    const resp = await fetch(`https://itunes.apple.com/search?term=${q}&media=music&entity=album&country=US&limit=8`);
    if (resp.ok) {
      const data = await resp.json();
      (data.results || []).forEach(r => {
        if (r.artworkUrl100) results.push({
          src: r.artworkUrl100.replace('100x100bb', '600x600bb'),
          label: r.collectionName || '',
          sub: r.artistName || ''
        });
      });
    }
  } catch(e) {}

  // MusicBrainz release-group search → Cover Art Archive
  try {
    const [a, t] = [encodeURIComponent(artist), encodeURIComponent(title)];
    const resp = await fetch(
      `https://musicbrainz.org/ws/2/release-group/?query=releasegroup:%22${t}%22%20AND%20artistname:%22${a}%22&limit=5&fmt=json`,
      { headers: { 'Accept': 'application/json' } }
    );
    if (resp.ok) {
      const data = await resp.json();
      (data['release-groups'] || []).slice(0, 5).forEach(rg => {
        if (rg.id) results.push({
          src: `https://coverartarchive.org/release-group/${rg.id}/front`,
          label: rg.title || '',
          sub: 'Cover Art Archive'
        });
      });
    }
  } catch(e) {}

  if (!results.length) {
    grid.innerHTML = '<div class="aw-results-hint">No results found. Try adjusting the search.</div>';
    return;
  }

  grid.innerHTML = results.map((r, i) =>
    `<div class="aw-result-card" data-aw-key="${esc(key)}" data-aw-url="${esc(r.src)}">
      <img src="${esc(r.src)}" alt="${esc(r.label)}"
           onerror="this.closest('.aw-result-card').style.display='none'">
      <div class="aw-result-label">${esc(r.label)}</div>
      <div class="aw-result-sub">${esc(r.sub)}</div>
    </div>`
  ).join('');
}

// --- Utility ------------------------------------------------
function esc(str) {
  if (!str && str !== 0) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function showToast(msg, type='success') {
  const old = document.querySelector('.save-notice');
  if (old) old.remove();
  const el = document.createElement('div');
  el.className = 'save-notice';
  el.style.background = type === 'error' ? 'var(--error)' : 'var(--success)';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

// --- Router / Navigation ------------------------------------
let EDIT_DIRTY = false;   // set when the edit form changes; cleared on save

function navigate(view, albumId, slideIndex) {
  if (APP.view === 'edit' && view !== 'edit' && EDIT_DIRTY) {
    if (!confirm('You have unsaved edits. Leave without saving?')) return;
  }
  if (APP.view === 'edit' || view === 'edit') EDIT_DIRTY = false;
  APP.view = view;
  if (albumId !== undefined) APP.albumId = albumId;
  if (slideIndex !== undefined) APP.slideIndex = slideIndex;
  else if (view === 'presentation') APP.slideIndex = 0;
  if (view === 'presentation' && APP.albumId) history.replaceState({}, '', '#' + APP.albumId);
  else if (view === 'archive') history.replaceState({}, '', '#archive');
  else history.replaceState({}, '', location.pathname + location.search);
  renderApp();
}

function checkUrlHash() {
  const hash = location.hash.replace('#', '');
  if (!hash) return;
  if (hash === 'archive') { navigate('archive'); return; }
  const album = albumLibrary.find(a => a.id === hash);
  if (album) navigate('presentation', hash, 0);
}

// --- Main render dispatcher ---------------------------------
function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;
  app.className = 'fade-in';
  if (APP.projectorMode) app.classList.add('projector-mode');
  switch (APP.view) {
    case 'home':         app.classList.add('view-home');         app.innerHTML = buildHome();         break;
    case 'presentation': app.classList.add('view-presentation'); app.innerHTML = buildPresentation(); break;
    case 'edit':         app.classList.add('view-edit');         app.innerHTML = buildEdit();         break;
    case 'archive':      app.classList.add('view-archive');      app.innerHTML = buildArchive();      break;
    default:             app.classList.add('view-home');         app.innerHTML = buildHome();
  }
  setTimeout(loadArtworkInView, 50);
}

// ============================================================
// HOME VIEW
// ============================================================
function buildHome() {
  const albums = getAllAlbums();
  return `
    ${buildSiteHeader()}
    <div class="home-content">
      ${buildThisWeekHero(albums)}
      ${buildDashboard(albums)}
      <div class="section-heading" style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
        <span>Album Library</span>
        <input id="album-search" class="album-search" type="search" placeholder="Search albums or artists&hellip;" autocomplete="off">
      </div>
      <div class="album-grid">
        ${albums.map(a => buildAlbumCard(a)).join('')}
      </div>
    </div>`;
}

// The album marked status:'current', or the earliest week not yet completed.
function getCurrentAlbum(albums) {
  const cur = albums.find(a => a.status === 'current');
  if (cur) return cur;
  return albums
    .filter(a => a.status !== 'completed')
    .sort((x, y) => (x.week || 999) - (y.week || 999))[0] || null;
}

function buildThisWeekHero(albums) {
  const cur = getCurrentAlbum(albums);
  if (!cur) return '';
  const next = cur.nextWeekAlbumId
    ? albums.find(a => a.id === cur.nextWeekAlbumId)
    : albums.find(a => a.week === (cur.week || 0) + 1);
  const awId = `hero-aw-${cur.id}`;
  const showArt = cur.artwork?.showArtwork !== false && !cur.artwork?.useTextOnlyFallback;

  return `<div class="home-hero">
    <div class="home-hero-art">
      ${showArt ? artworkFrame(awId, cur.artist, cur.title, '', cur.artworkKey || '') : ''}
    </div>
    <div class="home-hero-body">
      <div class="home-hero-label">This Week ${cur.week ? `&mdash; Week ${cur.week}` : ''}</div>
      <div class="home-hero-title">${esc(cur.title)}</div>
      <div class="home-hero-artist">${esc(cur.artist)}${cur.year ? ` &middot; ${cur.year}` : ''}</div>
      <div class="home-hero-actions">
        <button class="btn btn-primary" data-action="start-presentation" data-album-id="${cur.id}">&#9654; Start Listening Session</button>
        <button class="btn btn-ghost btn-sm" data-action="edit-album" data-album-id="${cur.id}">Review / Edit</button>
      </div>
    </div>
    ${next ? `<div class="home-hero-next">
      <div class="home-hero-next-label">Next Week</div>
      <div class="home-hero-next-title">${esc(next.title)}</div>
      <div class="home-hero-next-artist">${esc(next.artist)}</div>
    </div>` : ''}
  </div>`;
}

function buildSiteHeader() {
  return `<header class="site-header">
    <div class="site-logo"><span>Audio</span> Aficionados</div>
    <div class="site-tagline">A weekly album listening club</div>
    <nav class="site-nav">
      <button class="btn btn-ghost btn-sm" data-action="view-archive">Archive</button>
      <button class="btn btn-ghost btn-sm" data-action="toggle-safe-mode" title="Classroom Safe Mode: ${APP.safeMode ? 'ON' : 'OFF'}">
        ${APP.safeMode ? '&#128737; Safe Mode: ON' : '&#9888; Safe Mode: OFF'}
      </button>
    </nav>
  </header>`;
}

function buildPrePresentationChecks(album) {
  const checks = [];
  const art = album.artwork || {};

  // Artwork reliability
  if (!art.manualArtworkUrl && !art.localArtworkFile && !art.musicBrainzReleaseGroupId && !art.musicBrainzReleaseId && !art.itunesCollectionId) {
    checks.push({ level: 'info', msg: 'Artwork uses search only — add a MusicBrainz Release Group ID or iTunes Collection ID to the album for reliable results.', action: `data-action="edit-album" data-album-id="${album.id}"`, fix: 'Edit Album' });
  }

  // No singles marked
  const hasSingles = (album.tracklist || []).some(t => t.single);
  if (album.tracklist?.length && !hasSingles) {
    checks.push({ level: 'warn', msg: 'No singles marked on the tracklist. Use Quick Edit on the Tracklist slide to mark known singles.', action: `data-action="quick-edit" data-slide-type="tracklist" data-album-id="${album.id}"`, fix: 'Mark Singles' });
  }

  // Missing release date
  if (!album.originalReleaseDate) {
    checks.push({ level: 'warn', msg: 'Original release date is missing.', action: `data-action="edit-album" data-album-id="${album.id}"`, fix: 'Edit Album' });
  }

  // Missing original label
  if (!album.originalLabel) {
    checks.push({ level: 'warn', msg: 'Original record label is missing.', action: `data-action="edit-album" data-album-id="${album.id}"`, fix: 'Edit Album' });
  }

  // Bridge listen check
  const hw = album.nextWeekPreview?.homeworkAlbum;
  const nwAlbum = album.nextWeekAlbumId ? getAlbum(album.nextWeekAlbumId) : null;
  if (!hw?.title || hw.title === 'To Be Announced') {
    checks.push({ level: 'warn', msg: 'No bridge listen set for next week. Add one via the Coming Next Week slide.', action: `data-action="quick-edit" data-slide-type="coming-next" data-album-id="${album.id}"`, fix: 'Set Bridge Listen' });
  } else if (nwAlbum && hw.title === album.title) {
    checks.push({ level: 'warn', msg: `Bridge listen is set to this week's album ("${album.title}") — it should prepare students for next week's album.`, action: `data-action="quick-edit" data-slide-type="coming-next" data-album-id="${album.id}"`, fix: 'Fix Bridge Listen' });
  }

  // Not teacher approved
  if (!album.teacherApproved) {
    checks.push({ level: 'info', msg: 'Album has not been marked as teacher approved. Review content before presenting.', action: `data-action="edit-album" data-album-id="${album.id}"`, fix: 'Review & Approve' });
  }

  if (!checks.length) {
    return `<div class="precheck-section precheck-ok"><span class="precheck-ok-icon">&#10003;</span> ${esc(album.title)} — all pre-presentation checks passed.</div>`;
  }

  const items = checks.map(c => {
    const isWarn = c.level === 'warn';
    return `<div class="precheck-item ${isWarn ? 'precheck-warn' : 'precheck-info'}">
      <span class="precheck-icon">${isWarn ? '&#9888;' : '&#9432;'}</span>
      <span class="precheck-text">${esc(c.msg)}</span>
      <button class="btn btn-ghost btn-sm precheck-fix-btn" ${c.action}>${esc(c.fix)} &#8594;</button>
    </div>`;
  }).join('');

  return `<div class="precheck-section">
    <div class="precheck-header">Pre-Presentation Checks &mdash; ${esc(album.title)}</div>
    <div class="precheck-list">${items}</div>
  </div>`;
}

function buildDashboard(albums) {
  const needsReview = albums.filter(a => a.needsTeacherReview || a.status === 'needs-review');
  const missingScore = albums.filter(a => a.status === 'completed' && !a.classScore);
  const completed = albums.filter(a => a.status === 'completed' && a.classScore);
  const explicitFlags = albums.filter(a => a.tracklist?.some(t => t.explicit));
  const openClass = APP.dashboardOpen ? '' : 'collapsed';
  const toggleClass = APP.dashboardOpen ? 'open' : '';

  return `<div class="dashboard">
    <div class="dashboard-header" data-action="toggle-dashboard">
      <div class="dashboard-title">&#9881; Teacher Dashboard</div>
      <div class="dashboard-toggle ${toggleClass}">&#9660;</div>
    </div>
    <div class="dashboard-body ${openClass}">
      <div class="dashboard-grid">
        <div class="dash-card dash-card-highlight">
          <div class="dash-card-label">Library</div>
          <div class="dash-card-value">${albums.length} albums</div>
          <div class="dash-card-sub">${completed.length} completed</div>
        </div>
        <div class="dash-card ${needsReview.length > 0 ? 'dash-alert' : ''}">
          <div class="dash-card-label">Needs Review</div>
          <div class="dash-card-value">${needsReview.length} album${needsReview.length !== 1 ? 's' : ''}</div>
          <div class="dash-card-sub">${needsReview.map(a => esc(a.title)).slice(0,3).join(', ')}</div>
        </div>
        <div class="dash-card ${explicitFlags.length > 0 ? 'dash-alert' : ''}">
          <div class="dash-card-label">Explicit Flags</div>
          <div class="dash-card-value">${explicitFlags.length} album${explicitFlags.length !== 1 ? 's' : ''}</div>
          <div class="dash-card-sub">Review tracklist in edit mode</div>
        </div>
        <div class="dash-card ${missingScore.length > 0 ? 'dash-alert' : ''}">
          <div class="dash-card-label">Missing Scores</div>
          <div class="dash-card-value">${missingScore.length} album${missingScore.length !== 1 ? 's' : ''}</div>
          <div class="dash-card-sub">${missingScore.map(a => esc(a.title)).join(', ')}</div>
        </div>
      </div>
      <div class="dash-actions">
        <button class="btn btn-secondary" data-action="view-archive">Listening Archive</button>
        <button class="btn btn-secondary" data-action="export-full">&#11015; Export Full Year Data</button>
        <button class="btn btn-secondary" data-action="import-full">&#11014; Import Full Year Data</button>
        <button class="btn btn-ghost btn-sm" data-action="clear-auto-artwork" title="Re-fetch all auto-searched discography covers on next load">&#8635; Refresh Auto Artwork</button>
      </div>
      <div class="dash-reminder">&#128275; Export your full year data regularly. Browser data can be lost if the browser cache is cleared.</div>
    </div>
  </div>`;
}

function buildAlbumCard(album) {
  const awId = `card-aw-${album.id}`;
  const badges = [];
  if (album.status === 'completed')    badges.push(`<span class="badge badge-completed">Completed</span>`);
  if (album.status === 'current')      badges.push(`<span class="badge badge-current">This Week</span>`);
  if (album.status === 'needs-review') badges.push(`<span class="badge badge-review">Needs Review</span>`);
  if (album.needsTeacherReview)        badges.push(`<span class="badge badge-review">Review Required</span>`);
  if (getStoredEdits(album.id))        badges.push(`<span class="badge badge-edited" title="This album has local edits that override albumLibrary.js — Reset Edits in the edit screen removes them">&#9998; Edited</span>`);
  const showArtwork = album.artwork?.showArtwork !== false;
  const useTextOnly = album.artwork?.useTextOnlyFallback === true;

  return `<div class="album-card" data-search="${esc((album.title + ' ' + album.artist).toLowerCase())}">
    <div class="album-card-artwork-wrap">
      ${showArtwork && !useTextOnly
        ? artworkFrame(awId, album.artist, album.title, '', album.artworkKey || '')
        : `<div class="artwork-frame"><div class="artwork-fallback" style="display:flex">
             <div class="fb-icon">&#9835;</div>
             <div class="fb-title">${esc(album.title)}</div>
             <div class="fb-artist">${esc(album.artist)}</div>
             <div class="fb-year">${album.year}</div>
           </div></div>`}
    </div>
    <div class="album-card-body">
      ${album.week ? `<div class="album-card-week">Week ${album.week}</div>` : ''}
      <div class="album-card-title">${esc(album.title)}</div>
      <div class="album-card-artist">${esc(album.artist)}</div>
      <div class="album-card-year">${album.year}</div>
      <div class="album-card-badges">${badges.join('')}</div>
      ${album.classScore ? `<div class="album-card-score">Class Score: ${esc(album.classScore)}/10${album.oneWordReaction ? ` &mdash; "${esc(album.oneWordReaction)}"` : ''}</div>` : ''}
      <div class="album-card-actions">
        <button class="btn btn-primary" data-action="start-presentation" data-album-id="${album.id}">Start Listening Session</button>
        <button class="btn btn-ghost btn-sm" data-action="edit-album" data-album-id="${album.id}">Review / Edit Before Class</button>
      </div>
    </div>
  </div>`;
}

// ============================================================
// PRESENTATION VIEW
// ============================================================
function buildPresentation() {
  const album = getAlbum(APP.albumId);
  if (!album) return `<div style="padding:40px;color:var(--error)">Album not found.</div>`;

  const slides = getSlides(album);
  const labels = getSlideLabels(album);
  const total = slides.length;
  const idx = APP.slideIndex;
  const pct = Math.round(((idx + 1) / total) * 100);
  const slideHTML = buildSlide(album, idx);
  const isProjector = APP.projectorMode;

  return `
    <div class="slide-area">
      ${slideHTML}
    </div>
    <div class="controls-bar">
      <div class="controls-left">
        <button class="btn btn-ghost btn-sm teacher-only" data-action="go-home" title="Album Library (Esc)">&#8962; Home</button>
        <button class="btn btn-ghost btn-sm teacher-only" data-action="edit-album" data-album-id="${album.id}" title="Edit this album">&#9998; Edit</button>
        <button class="btn btn-ghost btn-sm teacher-only" data-action="restart-presentation" title="Restart (R)">&#8635;</button>
        <button class="btn btn-ghost btn-sm" data-action="toggle-projector" title="Toggle Projector Mode">
          ${isProjector ? '&#128187; Exit Projector' : '&#128247; Projector Mode'}
        </button>
        <button class="btn btn-ghost btn-sm projector-exit" data-action="toggle-projector">Exit Projector</button>
      </div>
      <div class="controls-center">
        <div class="controls-nav">
          <button class="nav-btn" data-action="prev-slide" ${idx === 0 ? 'disabled' : ''} title="Previous (&#8592;)">&#8592;</button>
          <div class="slide-counter">${idx + 1} / ${total}</div>
          <button class="nav-btn" data-action="next-slide" ${idx === total - 1 ? 'disabled' : ''} title="Next (&#8594;)">&#8594;</button>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="text-xs text-muted">${labels[idx] || ''}</div>
      </div>
      <div class="controls-right teacher-only" style="display:flex;gap:6px;align-items:center;">
        <div class="safe-mode-toggle" data-action="toggle-safe-mode" title="Classroom Safe Mode">
          <div class="toggle-switch ${APP.safeMode ? 'on' : ''}"></div>
          <span style="font-size:0.75rem;color:var(--text3)">Safe Mode</span>
        </div>
      </div>
    </div>`;
}

function buildSlide(album, idx) {
  const slides = getSlides(album);
  const type = slides[idx];
  const qeBtn = `<button class="btn-quick-edit teacher-only" data-action="quick-edit" data-slide-type="${type}" data-album-id="${album.id}">&#9998; Quick Edit</button>`;

  switch (type) {
    case 'intro':             return buildIntroSlide(album, qeBtn);
    case 'tracklist':         return buildTracklistSlide(album, qeBtn);
    case 'listen-for':        return buildListenForSlide(album, qeBtn);
    case 'artist-snapshot':   return buildArtistSnapshotSlide(album, qeBtn);
    case 'influences':        return buildInfluencesSlide(album, qeBtn);
    case 'historical-context':return buildHistoricalContextSlide(album, qeBtn);
    case 'why-matters':       return buildWhyMattersSlide(album, qeBtn);
    case 'discography':       return buildDiscographySlide(album, qeBtn);
    case 'reaction':          return buildReactionSlide(album, qeBtn);
    case 'ratings':           return buildRatingsSlide(album, qeBtn);
    case 'archive':           return buildArchiveSlideInline(album, qeBtn);
    case 'coming-next':       return buildComingNextSlide(album, qeBtn);
    default: return `<div class="slide"><p>Unknown slide type.</p></div>`;
  }
}

// ============================================================
// SLIDE 1 — Album Intro / Start Listening
// ============================================================
function buildIntroSlide(album, qeBtn) {
  const awId = `intro-aw-${album.id}`;
  const showArt = album.artwork?.showArtwork !== false && !album.artwork?.useTextOnlyFallback;
  const genres = (album.genres || []).map(g => `<span class="genre-tag">${esc(g)}</span>`).join('');
  const awKey = album.artworkKey || generateArtworkKey(album.artist, album.title);
  const awArt = getStudentArtwork(awKey);
  const bgStyle = awArt.type === 'image' ? ` style="background-image:url('${esc(awArt.src)}')"` : '';

  return `<div class="slide slide-intro">
    <div class="slide-intro-bg"${bgStyle}></div>
    <div class="intro-artwork-col">
      ${showArt ? artworkFrame(awId, album.artist, album.title, 'intro-artwork', awKey) : ''}
    </div>
    <div class="intro-gradient"></div>
    ${qeBtn}
    <div class="slide-intro-inner">
      <div class="intro-presents">Audio Aficionados Presents</div>
      <h1 class="intro-album-name">${esc(album.title)}</h1>
      <div class="intro-artist-name">${esc(album.artist)}</div>
      <div class="intro-year-label">${album.year}</div>
      <div class="intro-genres">${genres}</div>
      ${album.theme ? `<div class="intro-theme">${esc(album.theme)}</div>` : ''}
      <div class="intro-cta">&#9654; Start Listening</div>
    </div>
  </div>`;
}

// ============================================================
// SLIDE 2 — Tracklist + Release Facts
// ============================================================
function buildTracklistSlide(album, qeBtn) {
  const awId = `tl-aw-${album.id}`;
  const showArt = album.artwork?.showArtwork !== false;
  const tracklist = album.tracklist || [];
  const safeMode = APP.safeMode || album.classroomSafeMode;
  const teacherMode = !APP.projectorMode;

  let totalSecs = 0;
  const tracks = tracklist.map((t, i) => {
    if (t.hiddenFromStudentView && !teacherMode) return '';
    const displayName = safeMode && t.displayTitle ? t.displayTitle : t.title;
    const dimmed = t.hiddenFromStudentView && teacherMode;
    if (t.duration) {
      const parts = t.duration.split(':').map(Number);
      if (parts.length === 2) totalSecs += parts[0] * 60 + parts[1];
    }
    return `<div class="track-row ${dimmed ? 'hidden-track' : ''} ${t.single ? 'single-row' : ''}">
      <span class="track-num">${i + 1}</span>
      <span class="track-name ${t.single ? 'is-single' : ''}">${esc(displayName)}${dimmed ? ' <em class="track-hidden-tag">(hidden)</em>' : ''}</span>
      <span class="track-dur">${t.duration ? esc(t.duration) : ''}</span>
      <span class="track-badges">
        ${t.single ? '<span class="badge badge-single">&#9679; Single</span>' : ''}
        ${t.explicit && teacherMode ? '<span class="badge badge-explicit">E</span>' : ''}
      </span>
    </div>`;
  }).join('');
  const totalRuntime = totalSecs > 0
    ? `<div class="tracklist-total">${Math.floor(totalSecs/60)}:${String(totalSecs%60).padStart(2,'0')} total</div>`
    : '';

  return `<div class="slide slide-tracklist">
    ${qeBtn}
    <div class="slide-label">Tracklist</div>
    <div class="tracklist-layout">
      <div class="tracklist-sidebar">
        ${showArt ? `<div class="tracklist-artwork">${artworkFrame(awId, album.artist, album.title, '', album.artworkKey || '')}</div>` : ''}
        <div class="tracklist-meta">
          <div class="tracklist-meta-row">
            <span class="tracklist-meta-label">Released</span>
            <span class="tracklist-meta-value">${esc(album.originalReleaseDate || album.year)}</span>
          </div>
          <div class="tracklist-meta-row">
            <span class="tracklist-meta-label">Label</span>
            <span class="tracklist-meta-value">${esc(album.originalLabel || '—')}</span>
          </div>
          ${album.regionalReleaseInfo ? `<div class="tracklist-meta-row">
            <span class="tracklist-meta-label">Regional</span>
            <span class="tracklist-meta-value">${esc(album.regionalReleaseInfo)}</span>
          </div>` : ''}
        </div>
        ${teacherMode ? `<div class="source-notes teacher-only" style="font-size:0.7rem;"><strong>Teacher:</strong> Verify facts before presenting.</div>` : ''}
      </div>
      <div class="tracklist-main">
        <div class="tracklist-header">
          <div class="tracklist-album-title">${esc(album.title)}</div>
          <div class="tracklist-album-artist">${esc(album.artist)}</div>
        </div>
        <div class="track-list">${tracks}</div>
        ${totalRuntime}
      </div>
    </div>
  </div>`;
}

// ============================================================
// SLIDE 3 — Listen For + Key Songs (combined)
// ============================================================
function buildListenForSlide(album, qeBtn) {
  const ice  = album.icebreaker   || {};
  const items = (album.beforeYouListen || []).slice(0, 4);
  const songs = album.keySongs    || [];
  const ss    = album.soundAndStyle || {};
  const icons = ['&#127911;', '&#128065;', '&#129300;', '&#128266;'];

  const listenItems = items.map((item, i) =>
    `<div class="lf-item">
      <span class="lf-item-icon">${icons[i % icons.length]}</span>
      <span class="lf-item-text">${esc(item)}</span>
    </div>`
  ).join('');

  const songRows = songs.map(s =>
    `<div class="lf-song-row">
      <div class="lf-song-title">&#9835;&nbsp;${esc(s.title)}</div>
      <div class="lf-song-note">${esc(s.note)}</div>
    </div>`
  ).join('');

  const keyIdea = ss.keyIdea
    ? `<div class="lf-key-idea">${esc(ss.keyIdea)}</div>` : '';

  return `<div class="slide slide-listen-for">
    ${qeBtn}
    <div class="slide-label">Listen For + Key Songs</div>
    ${keyIdea}
    <div class="lf-layout">
      <div class="lf-left">
        <div class="lf-col-header">What to Listen For</div>
        <div class="lf-items">${listenItems}</div>
        ${ice.question ? `<div class="listen-partner-q">
          <span class="listen-partner-label">Partner Discussion</span>
          ${esc(ice.question)}
          ${ice.activity ? `<div class="listen-activity">${esc(ice.activity)}</div>` : ''}
        </div>` : ''}
      </div>
      <div class="lf-right">
        <div class="lf-col-header">Songs to Notice</div>
        <div class="lf-songs">${songRows}</div>
      </div>
    </div>
  </div>`;
}

// ============================================================
// SLIDE 5 — Artist Snapshot
// ============================================================
function buildArtistSnapshotSlide(album, qeBtn) {
  const imgId = `artist-img-${album.id}`;
  const showImg = album.artistImages?.showArtistImage !== false;
  const importance = (album.importance || []).slice(0, 3);
  const members = album.members || [];
  const hasMembers = members.length > 0;
  const bulletList = hasMembers ? importance.slice(0, 2) : importance;

  const bullets = bulletList.map(item =>
    `<div class="artist-bullet">
      <div class="artist-bullet-dot"></div>
      <div class="artist-bullet-text">${esc(item)}</div>
    </div>`
  ).join('');

  const memberCards = members.map((m, i) => {
    const initials = m.name.split(' ').map(w => w[0]).join('').slice(0, 2);
    const mId = `member-img-${album.id}-${i}`;
    return `<div class="member-card">
      <div class="member-avatar" id="${mId}" data-member-img data-member-name="${esc(m.name)}"${m.manualImageUrl ? ` data-manual-url="${esc(m.manualImageUrl)}"` : ''}>
        <div class="member-avatar-fb">${esc(initials)}</div>
      </div>
      <div class="member-name">${esc(m.name)}</div>
      <div class="member-role">${esc(m.role)}</div>
      ${m.years ? `<div class="member-years">${esc(m.years)}</div>` : ''}
    </div>`;
  }).join('');

  return `<div class="slide slide-artist-snapshot${hasMembers ? ' has-members' : ''}">
    ${qeBtn}
    <div class="slide-label">Artist Snapshot</div>
    <div class="artist-snapshot-layout">
      ${showImg ? `<div class="artist-image-frame" id="${imgId}" data-artist-img data-album-id="${album.id}">
        <div class="artist-img-fallback">
          <div class="artist-img-initials">${esc(album.artist.split(' ').map(w=>w[0]).join('').slice(0,3))}</div>
          <div class="artist-img-name">${esc(album.artist)}</div>
        </div>
      </div>` : ''}
      <div class="artist-facts-col">
        <div class="artist-name-big">${esc(album.artist)}</div>
        <div class="artist-meta-list">
          ${album.artistCountry ? `<div class="artist-meta-item"><span class="artist-meta-label">Origin</span><span>${esc(album.artistCountry)}</span></div>` : ''}
          ${album.artistYearsActive ? `<div class="artist-meta-item"><span class="artist-meta-label">Active</span><span>${esc(album.artistYearsActive)}</span></div>` : ''}
          ${album.artistScene ? `<div class="artist-meta-item"><span class="artist-meta-label">Scene</span><span>${esc(album.artistScene)}</span></div>` : ''}
        </div>
        <div class="artist-bullets">${bullets}</div>
        ${hasMembers ? `<div class="members-section">
          <div class="members-label">Members</div>
          <div class="members-row">${memberCards}</div>
        </div>` : ''}
      </div>
    </div>
  </div>`;
}

// ============================================================
// SLIDE 6 — Influences + Legacy
// ============================================================
function buildInfluencesSlide(album, qeBtn) {
  const im = album.influenceMap || {};
  const influencedBy = im.influencedBy || [];
  const influenced = im.influenced || [];
  const similar = im.similarArtists || [];

  function influenceCard(entry, i, prefix) {
    const imgId = `inf-img-${prefix}-${i}`;
    return `<div class="influence-card">
      <div class="influence-thumb" id="${imgId}" data-inf-img data-inf-artist="${esc(entry.artist)}">
        <div class="influence-thumb-fb">${esc(entry.artist.split(' ').map(w=>w[0]).join('').slice(0,2))}</div>
      </div>
      <div class="influence-card-body">
        <div class="influence-artist-name">${esc(entry.artist)}</div>
        <div class="influence-note">${esc(entry.note)}</div>
      </div>
    </div>`;
  }

  const similarChips = similar.map(s =>
    `<div class="similar-chip" title="${esc(s.note||'')}"><strong>${esc(s.artist)}</strong></div>`
  ).join('');

  return `<div class="slide slide-influences">
    ${qeBtn}
    <div class="slide-label">Influences &amp; Legacy</div>
    <div class="influences-layout">
      <div class="influences-col">
        <div class="influences-col-label influenced-by-label">&#8592; Influenced By</div>
        ${influencedBy.map((e,i) => influenceCard(e, i, 'by')).join('')}
      </div>
      <div class="influences-col">
        <div class="influences-col-label influenced-label">Influenced &#8594;</div>
        ${influenced.map((e,i) => influenceCard(e, i, 'fwd')).join('')}
      </div>
    </div>
    ${similar.length ? `<div class="similar-artists-section">
      <div class="similar-label">Similar Artists</div>
      <div class="similar-chips-row">${similarChips}</div>
    </div>` : ''}
    ${im.sourceNotes ? `<div class="influence-source-note teacher-only">&#9432; ${esc(im.sourceNotes)}</div>` : ''}
  </div>`;
}

// ============================================================
// SLIDE 7 (expanded only) — Historical Context
// ============================================================
function buildHistoricalContextSlide(album, qeBtn) {
  return `<div class="slide">
    ${qeBtn}
    <div class="slide-label">Historical Context</div>
    <div class="history-layout">
      <div class="history-year">${album.year}</div>
      <p class="history-text">${esc(album.historicalContext || '')}</p>
    </div>
  </div>`;
}

// ============================================================
// SLIDE 8 (expanded only) — Why It Matters
// ============================================================
function buildWhyMattersSlide(album, qeBtn) {
  const items = album.importance || [];
  const rows = items.map((item, i) =>
    `<div class="importance-item">
      <div class="importance-bullet">${i + 1}</div>
      <div class="importance-text">${esc(item)}</div>
    </div>`
  ).join('');
  return `<div class="slide">
    ${qeBtn}
    <div class="slide-label">Why It Matters</div>
    <h2 style="font-size:clamp(1.4rem,2.5vw,2.1rem);font-weight:800;margin-bottom:16px;">Why ${esc(album.artist)} matters in music history</h2>
    <div class="importance-list">${rows}</div>
  </div>`;
}

// ============================================================
// SLIDE 7 (short) / 9 (expanded) — Discography
// ============================================================
function buildDiscographySlide(album, qeBtn) {
  const disco = album.bandDiscography || [];
  const cards = disco.map((d, i) => {
    const awId = `disco-aw-${album.id}-${i}`;
    const isCurrent = d.title === album.title;
    const isEp = d.type === 'ep';
    const discoArtist = d.artist || album.artist;
    const discoKey = d.artworkKey || generateArtworkKey(discoArtist, d.title);
    return `<div class="disco-card ${isCurrent ? 'active-album' : ''} ${isEp ? 'disco-card-ep' : ''}">
      ${artworkFrame(awId, discoArtist, d.title, 'disco-artwork', discoKey)}
      <div class="disco-title">${esc(d.title)}</div>
      <div class="disco-year">${d.year}${isEp ? ' · EP' : ''}</div>
      ${isCurrent ? '<div class="disco-now">&#9679; This album</div>' : ''}
    </div>`;
  }).join('');
  return `<div class="slide">
    ${qeBtn}
    <div class="slide-label">Discography</div>
    <h2 style="font-size:clamp(1.3rem,2.5vw,1.9rem);font-weight:800;margin-bottom:20px;">${esc(album.artist)}</h2>
    <div class="disco-grid">${cards}</div>
  </div>`;
}

// ============================================================
// SLIDE 7 (short) / 10 (expanded) — Class Reaction + Score
// ============================================================
function buildReactionSlide(album, qeBtn) {
  const awId = `reaction-aw-${album.id}`;
  const showArt = album.artwork?.showArtwork !== false;
  const score = album.classScore;
  const reaction = album.oneWordReaction;
  const teacherMode = !APP.projectorMode;
  const questions = (album.discussionQuestions || []).slice(0, 3);

  const ratings = Array.isArray(album.ratings) ? album.ratings.map(Number).filter(n => !isNaN(n)) : [];
  const hasRatings = ratings.length > 0;
  const fmtHalf = v => v % 1 === 0 ? String(v) : v.toFixed(1);

  const voteVals = [];
  for (let v = 1; v <= 10; v += 0.5) voteVals.push(v);
  const ratingButtons = voteVals.map(v =>
    `<button class="vote-btn ${v % 1 !== 0 ? 'vote-btn-half' : ''}" data-action="add-rating" data-album-id="${album.id}" data-score="${v}">${fmtHalf(v)}</button>`
  ).join('');

  const ratingChips = ratings.map((r, i) =>
    `<span class="rating-chip">${fmtHalf(r)}${teacherMode ? `<button class="rating-chip-x" data-action="remove-rating" data-album-id="${album.id}" data-idx="${i}" title="Remove this rating">&times;</button>` : ''}</span>`
  ).join('');

  return `<div class="slide slide-reaction">
    ${qeBtn}
    <div class="slide-label">Class Reaction</div>
    <div class="reaction-layout">
      <div class="reaction-score-col">
        <div class="reaction-album-info">
          ${showArt ? `<div class="reaction-artwork">${artworkFrame(awId, album.artist, album.title, '', album.artworkKey || '')}</div>` : ''}
          <div class="reaction-album-name">${esc(album.title)}</div>
          <div class="reaction-album-artist">${esc(album.artist)}</div>
        </div>
        ${score
          ? `<div class="reaction-score-big">${esc(score)}<span class="reaction-score-max">/10</span></div>
             ${hasRatings ? `<div class="reaction-vote-count">average of ${ratings.length} rating${ratings.length !== 1 ? 's' : ''}</div>` : ''}
             ${reaction ? `<div class="reaction-word-display">"${esc(reaction)}"</div>` : ''}`
          : ''}
        ${hasRatings ? `<div class="rating-chips">${ratingChips}</div>` : ''}
        ${(!score || hasRatings)
          ? `<div class="vote-rating-label">${hasRatings ? 'Keep tallying — tap each rating' : 'Tally the class — tap each rating'}${teacherMode ? ' (keys 1–9, 0 = 10)' : ''}</div>
             <div class="vote-buttons vote-buttons-tally">${ratingButtons}</div>`
          : ''}
        ${teacherMode ? `
          <div class="vote-reaction-wrap">
            <div class="vote-rating-label">One-word reaction</div>
            <input class="vote-reaction-input" id="reaction-input-${album.id}" type="text" maxlength="30" placeholder="One word..."
              value="${esc(reaction || '')}" data-album-id="${album.id}" data-field="oneWordReaction">
          </div>
          ${score ? `<button class="btn btn-ghost btn-sm teacher-only" data-action="rate-album" data-album-id="${album.id}" data-score="">Clear score${hasRatings ? ' &amp; tally' : ''}</button>` : ''}
        ` : ''}
      </div>
      <div class="reaction-right">
        ${questions.length ? `<div class="reaction-discussion-label">Talk About It</div>
          <div class="reaction-questions">
            ${questions.map((q, i) => `<div class="reaction-q">
              <span class="reaction-q-num">${i + 1}</span>
              <span>${esc(q)}</span>
            </div>`).join('')}
          </div>` : ''}
      </div>
    </div>
  </div>`;
}

// ============================================================
// SLIDE 11 (expanded) — Archive inline
// ============================================================
function buildArchiveSlideInline(album, qeBtn) {
  const completed = getAllAlbums().filter(a => a.classScore || a.status === 'completed');
  return `<div class="slide">
    ${qeBtn}
    <div class="slide-label">Listening Archive</div>
    <h2 style="font-size:clamp(1.3rem,2.5vw,1.9rem);font-weight:800;margin-bottom:16px;">Audio Aficionados — Listening Archive</h2>
    ${buildArchiveTable(completed)}
  </div>`;
}

// ============================================================
// RATINGS SLIDE — All-time class scores for every rated album
// ============================================================
function buildRatingsSlide(album, qeBtn) {
  const all = getAllAlbums();
  const rated = all.filter(a => a.classScore !== '' && a.classScore !== undefined && a.classScore !== null);
  const scores = rated.map(a => parseFloat(a.classScore)).filter(n => !isNaN(n));
  const avg = scores.length ? (scores.reduce((s,n)=>s+n,0)/scores.length).toFixed(1) : null;

  if (!rated.length) {
    return `<div class="slide slide-ratings">
      ${qeBtn}
      <div class="slide-label">Class Ratings</div>
      <div class="ratings-empty">
        <div class="ratings-empty-icon">&#9835;</div>
        <div>No albums rated yet.</div>
        <div style="font-size:0.85rem;color:var(--text3);margin-top:6px;">Scores will appear here after each listening session.</div>
      </div>
    </div>`;
  }

  const RATINGS_CAP = 12;
  const sorted = [...rated].sort((x, y) => (parseFloat(y.classScore) || 0) - (parseFloat(x.classScore) || 0));
  const shown = sorted.slice(0, RATINGS_CAP);
  const overflow = sorted.length - shown.length;

  const cards = shown.map((a, rank) => {
    const awId = `rating-aw-${a.id}`;
    const score = parseFloat(a.classScore);
    const scoreClass = score >= 8 ? 'score-high' : score >= 6 ? 'score-mid' : 'score-low';
    return `<div class="rating-card">
      ${rank === 0 ? '<div class="rating-crown" title="Highest rated">&#128081;</div>' : ''}
      ${artworkFrame(awId, a.artist, a.title, 'rating-artwork')}
      <div class="rating-card-title">${esc(a.title)}</div>
      <div class="rating-card-artist">${esc(a.artist)}</div>
      <div class="rating-card-score ${scoreClass}">${esc(a.classScore)}<span class="rating-score-denom">/10</span></div>
      ${a.oneWordReaction ? `<div class="rating-card-word">&ldquo;${esc(a.oneWordReaction)}&rdquo;</div>` : ''}
    </div>`;
  }).join('') + (overflow > 0 ? `<div class="rating-card rating-card-more"><div class="rating-more-num">+${overflow}</div><div class="rating-more-label">more in the Archive</div></div>` : '');

  return `<div class="slide slide-ratings">
    ${qeBtn}
    <div class="slide-label">Class Ratings</div>
    <div class="ratings-header">
      <div class="ratings-header-left">
        <h2 class="ratings-title">How We Rated Them</h2>
        ${avg ? `<div class="ratings-avg">Class Average &mdash; <span class="ratings-avg-num">${avg}</span><span class="ratings-avg-denom">/10</span></div>` : ''}
      </div>
      <button class="btn btn-ghost btn-sm teacher-only" data-action="clear-ratings">&#10005; Clear All Ratings</button>
    </div>
    <div class="ratings-grid">${cards}</div>
  </div>`;
}

// ============================================================
// SLIDE 9 (short) / 13 (expanded) — Coming Next Week + Homework
// ============================================================
function buildComingNextSlide(album, qeBtn) {
  const nw = album.nextWeekPreview?.nextAlbum || {};
  const hw = album.nextWeekPreview?.homeworkAlbum || {};
  const nwId = album.nextWeekAlbumId ? getAlbum(album.nextWeekAlbumId) : null;

  const nextTitle  = nwId?.title  || nw.title  || 'To Be Announced';
  const nextArtist = nwId?.artist || nw.artist || '';
  const nextYear   = nwId?.year   || nw.year   || '';
  const nextTeaser = nwId ? (nwId.theme || '') : (nw.teaser || '');
  const nextListenQ = nwId ? (nwId.icebreaker?.question || '') : (nw.listenForQuestion || '');
  const nwAwId = `nw-aw-${album.id}`;
  const hwAwId = `hw-aw-${album.id}`;
  const tba = nextTitle === 'To Be Announced';

  // Build picker options — all albums except current
  const pickerOpts = albumLibrary
    .filter(a => a.id !== album.id)
    .map(a => `<option value="${esc(a.id)}" ${album.nextWeekAlbumId===a.id?'selected':''}>${esc(a.title)} &mdash; ${esc(a.artist)} (${a.year})</option>`)
    .join('');

  const picker = `<div class="next-week-picker teacher-only">
    <label class="next-week-picker-label">Set next week&#8217;s album:</label>
    <select class="field-select" data-action="set-next-week" data-album-id="${esc(album.id)}">
      <option value="">&#8212; Not set yet &#8212;</option>
      ${pickerOpts}
    </select>
  </div>`;

  return `<div class="slide slide-coming-next">
    ${qeBtn}
    ${picker}
    <div class="slide-label">Coming Next Week</div>
    <div class="next-week-layout">
      <div class="next-main-card">
        <div class="next-card-label">Next Week</div>
        <div class="next-artwork">
          ${!tba ? artworkFrame(nwAwId, nextArtist, nextTitle) : `<div class="artwork-frame" style="width:160px;height:160px;"><div class="artwork-fallback"><div class="fb-icon">&#9835;</div></div></div>`}
        </div>
        ${tba
          ? `<div class="next-tba">To Be Announced</div>`
          : `<div class="next-album-title">${esc(nextTitle)}</div>
             <div class="next-album-artist">${esc(nextArtist)}${nextYear ? ` &middot; ${nextYear}` : ''}</div>
             ${nextTeaser ? `<div class="next-teaser">${esc(nextTeaser)}</div>` : ''}
             ${nextListenQ ? `<div class="next-listen-for"><strong>Listen for:</strong> ${esc(nextListenQ)}</div>` : ''}`
        }
      </div>
      <div class="next-hw-card">
        <div class="next-card-label" style="color:var(--accent2)">Bridge Listen for Next Week</div>
        ${hw.title && hw.title !== 'To Be Announced'
          ? `<div class="next-hw-artwork">
               ${artworkFrame(hwAwId, hw.artist || '', hw.title)}
             </div>
             <div class="next-hw-album-title">${esc(hw.title)}</div>
             <div class="next-album-artist" style="font-size:0.82rem">${esc(hw.artist||'')}${hw.year ? ` &middot; ${hw.year}` : ''}</div>
             ${hw.reason ? `<div class="next-teaser" style="font-size:0.82rem">${esc(hw.reason)}</div>` : ''}
             ${hw.studentTask ? `<div class="next-listen-for" style="font-size:0.82rem"><strong>Your task:</strong> ${esc(hw.studentTask)}</div>` : ''}`
          : `<div class="next-tba" style="font-size:1rem">To Be Assigned</div>`
        }
      </div>
    </div>
  </div>`;
}

// ============================================================
// ARCHIVE VIEW (standalone)
// ============================================================
function buildArchive() {
  const completed = getAllAlbums()
    .filter(a => a.classScore || a.status === 'completed')
    .sort((x, y) => (x.week || 999) - (y.week || 999));
  const scores = completed.map(a => parseFloat(a.classScore)).filter(n => !isNaN(n));
  const avg = scores.length ? (scores.reduce((s, n) => s + n, 0) / scores.length).toFixed(1) : null;
  return `
    ${buildSiteHeader()}
    <div class="archive-view">
      <div style="margin-bottom:16px;"><button class="btn btn-ghost btn-sm" data-action="go-home">&#8592; Back to Library</button></div>
      <div class="archive-header">
        <div class="archive-title">Audio Aficionados Listening Archive</div>
        <div class="archive-sub">All completed albums and class scores${avg ? ` &mdash; class average ${avg}/10 across ${scores.length} rated album${scores.length !== 1 ? 's' : ''}` : ''}</div>
      </div>
      ${buildArchiveTable(completed)}
    </div>`;
}

function buildArchiveTable(albums) {
  if (!albums.length) {
    return `<div class="archive-table-wrap"><div class="archive-empty">No completed albums yet. Scores will appear here after each session.</div></div>`;
  }
  const rows = albums.map(a =>
    `<tr>
      <td>Week ${a.week}</td>
      <td class="td-title">${esc(a.title)}</td>
      <td>${esc(a.artist)}</td>
      <td>${a.year}</td>
      <td class="td-score">${a.classScore ? `${a.classScore}/10` : '—'}</td>
      <td class="td-reaction">${a.oneWordReaction ? `"${esc(a.oneWordReaction)}"` : '—'}</td>
      <td class="text-muted text-sm">${esc(a.completedDate || '')}</td>
    </tr>`
  ).join('');
  return `<div class="archive-table-wrap">
    <table class="archive-table">
      <thead><tr><th>Week</th><th>Album</th><th>Artist</th><th>Year</th><th>Score</th><th>Reaction</th><th>Date</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

// ============================================================
// EDIT VIEW
// ============================================================
function buildEdit() {
  const album = getAlbum(APP.albumId);
  if (!album) return `<div style="padding:40px">Album not found.</div>`;

  return `
    <div class="edit-header">
      <div class="edit-header-left">
        <button class="btn btn-ghost btn-sm" data-action="go-home">&#8592; Library</button>
        <div>
          <div class="edit-header-title">Review / Edit: ${esc(album.title)}</div>
          <div class="edit-header-sub">Week ${album.week} &mdash; ${esc(album.artist)}</div>
        </div>
      </div>
      <div class="edit-header-actions">
        <button class="btn btn-primary" data-action="save-edits" data-album-id="${album.id}">&#10003; Save Edits</button>
        <button class="btn btn-secondary" data-action="start-presentation" data-album-id="${album.id}">Start Session</button>
        <button class="btn btn-ghost btn-sm" data-action="export-album" data-album-id="${album.id}">&#11015; Export</button>
        <button class="btn btn-ghost btn-sm" data-action="copy-json" data-album-id="${album.id}">&#128203; Copy JSON</button>
        <button class="btn btn-danger btn-sm" data-action="reset-edits" data-album-id="${album.id}">Reset Edits</button>
      </div>
    </div>
    <div class="edit-content">
      <form id="edit-form" data-album-id="${album.id}">
        ${editSection('Album Basics', buildBasicsFields(album), true)}
        ${editSection('Content & Safety', buildSafetyFields(album), true)}
        ${editSection('Tracklist', buildTracklistEditor(album), true)}
        ${editSection('What to Listen For', buildListenForEditor(album), false)}
        ${editSection('Sound Snapshot & Key Songs', buildSoundKeySongsEditor(album), false)}
        ${editSection('Artist & Historical', buildArtistHistEditor(album), false)}
        ${editSection('Influences & Legacy', buildInfluenceEditor(album), false)}
        ${editSection('Discussion Questions', buildDiscussionEditor(album), false)}
        ${editSection('Class Results', buildResultsFields(album), true)}
        ${editSection('Coming Next Week & Homework', buildNextWeekEditor(album), false)}
        ${editSection('Teacher Notes & Sources', buildTeacherNotesFields(album), false)}
      </form>
    </div>`;
}

function editSection(title, body, open=true) {
  return `<div class="edit-section">
    <div class="edit-section-header" data-action="toggle-edit-section">
      <span>${esc(title)}</span><span>${open ? '&#9650;' : '&#9660;'}</span>
    </div>
    <div class="edit-section-body${open ? '' : ' collapsed'}">${body}</div>
  </div>`;
}
function field(label, name, value='', type='text', hint='', attrs='') {
  return `<div class="field-group">
    <label class="field-label" for="ef-${name}">${esc(label)}</label>
    <input class="field-input" type="${type}" id="ef-${name}" name="${name}" value="${esc(value||'')}"${attrs ? ' ' + attrs : ''}>
    ${hint ? `<div class="field-hint">${esc(hint)}</div>` : ''}
  </div>`;
}
function fieldTA(label, name, value='', hint='') {
  return `<div class="field-group">
    <label class="field-label" for="ef-${name}">${esc(label)}</label>
    <textarea class="field-textarea" id="ef-${name}" name="${name}">${esc(value||'')}</textarea>
    ${hint ? `<div class="field-hint">${esc(hint)}</div>` : ''}
  </div>`;
}
function fieldCheck(label, name, checked) {
  return `<label class="field-check">
    <input type="checkbox" name="${name}" ${checked ? 'checked' : ''}> ${esc(label)}
  </label>`;
}

function buildBasicsFields(a) {
  return `
    <div class="field-row">${field('Album Title','title',a.title)}${field('Artist / Band','artist',a.artist)}</div>
    <div class="field-row-3">
      ${field('Year','year',a.year,'number')}
      ${field('Week Number','week',a.week,'number')}
      <div class="field-group">
        <label class="field-label" for="ef-status">Status</label>
        <select class="field-select" id="ef-status" name="status">
          ${['upcoming','current','completed','needs-review'].map(s =>
            `<option value="${s}" ${a.status===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`
          ).join('')}
        </select>
      </div>
    </div>
    <div class="field-row">
      ${field('Original Release Date','originalReleaseDate',a.originalReleaseDate,'text','Example: November 4, 1991')}
      ${field('Original Label','originalLabel',a.originalLabel)}
    </div>
    ${field('Regional Release Info','regionalReleaseInfo',a.regionalReleaseInfo,'text','Example: U.S. release — Sire Records')}
    ${field('Genre Tags (comma-separated)','genres',(a.genres||[]).join(', '))}
    ${fieldTA('Theme / Central Idea','theme',a.theme)}
    <div class="field-row">
      ${field('Artist Country / Region','artistCountry',a.artistCountry)}
      ${field('Years Active','artistYearsActive',a.artistYearsActive)}
    </div>
    ${field('Scene / Style Tags','artistScene',a.artistScene,'text','Example: Shoegaze · Dream Pop')}`;
}

function buildSafetyFields(a) {
  const cn = a.contentNotes || {};
  return `
    <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
      ${fieldCheck('Teacher Approved','teacherApproved',a.teacherApproved)}
      ${fieldCheck('Needs Teacher Review','needsTeacherReview',a.needsTeacherReview)}
      ${fieldCheck('Classroom Safe Mode (this album)','albumSafeMode',a.classroomSafeMode)}
      ${fieldCheck('Show Artwork','showArtwork',a.artwork?.showArtwork !== false)}
      ${fieldCheck('Use Text-Only Fallback (no artwork)','useTextOnlyFallback',a.artwork?.useTextOnlyFallback)}
    </div>
    ${field('Manual Artwork URL (overrides all else)','manualArtworkUrl',a.artwork?.manualArtworkUrl,'url','Paste a direct image URL here to always use this image')}
    <div class="field-row">
      ${field('MusicBrainz Release Group ID','musicBrainzReleaseGroupId',a.artwork?.musicBrainzReleaseGroupId,'text','e.g. e0098f59-57c5-3e6d-91fa-6ba84aeb05b3 — most reliable for Cover Art Archive')}
      ${field('iTunes Collection ID','itunesCollectionId',a.artwork?.itunesCollectionId,'text','e.g. 1440631749 — find via iTunes link or search')}
    </div>
    <div class="field-row">
      ${field('Language Concerns','contentLang',cn.language)}
      ${field('Theme Concerns','contentThemes',cn.themes)}
    </div>
    ${fieldTA('Teacher Decision / Notes','contentDecision',cn.teacherDecision)}`;
}

function buildTracklistEditor(a) {
  const rows = (a.tracklist || []).map((t, i) =>
    `<div class="track-edit-row" data-track-index="${i}">
      <span class="track-edit-num">${i+1}</span>
      <input class="track-edit-input" style="flex:1" placeholder="Track title" name="track-title-${i}" value="${esc(t.title)}">
      <input class="track-edit-input" style="flex:1" placeholder="Display title" name="track-display-${i}" value="${esc(t.displayTitle||t.title)}">
      <input class="track-edit-input" style="width:52px;flex:none" placeholder="0:00" name="track-dur-${i}" value="${esc(t.duration||'')}">
      <div class="track-edit-checks">
        <label class="track-edit-check"><input type="checkbox" name="track-single-${i}" ${t.single?'checked':''}> Single</label>
        <label class="track-edit-check"><input type="checkbox" name="track-explicit-${i}" ${t.explicit?'checked':''}> Explicit</label>
        <label class="track-edit-check"><input type="checkbox" name="track-hidden-${i}" ${t.hiddenFromStudentView?'checked':''}> Hide</label>
      </div>
      <button type="button" class="track-del-btn" data-action="del-track">&times;</button>
    </div>`
  ).join('');
  return `<div class="track-editor" id="track-editor">${rows}</div>
    <button type="button" class="btn btn-ghost btn-sm btn-add-track" data-action="add-track">+ Add Track</button>`;
}

function buildListenForEditor(a) {
  const ice = a.icebreaker || {};
  const bfl = a.beforeYouListen || [];
  const beforeRows = bfl.map((item, i) =>
    `<div class="before-row">
      <input class="field-input" name="bfl-${i}" value="${esc(item)}" placeholder="Listening instruction...">
      <button type="button" class="question-del" data-action="del-bfl" data-idx="${i}">&times;</button>
    </div>`
  ).join('');
  return `
    ${fieldTA('Partner Discussion Question','icebreakerQ',ice.question)}
    ${fieldTA('Activity Instructions','icebreakerActivity',ice.activity)}
    <div class="field-group">
      <label class="field-label">Listen-For Instructions (shown as cards)</label>
      <div class="before-editor" id="bfl-editor">${beforeRows}</div>
      <button type="button" class="btn btn-ghost btn-sm mt-2" data-action="add-bfl">+ Add Instruction</button>
    </div>`;
}

function buildSoundKeySongsEditor(a) {
  const ss = a.soundAndStyle || {};
  const songs = a.keySongs || [];
  const songRows = songs.map((s, i) =>
    `<div class="key-song-edit-row" data-ks-index="${i}">
      <input class="track-edit-input ke-title" name="ks-title-${i}" placeholder="Song title" value="${esc(s.title)}">
      <input class="track-edit-input ke-note" name="ks-note-${i}" placeholder="Why this song matters..." value="${esc(s.note)}">
      <button type="button" class="track-del-btn" data-action="del-ks">&times;</button>
    </div>`
  ).join('');
  return `
    <div class="field-row">${field('Genre','ss-genre',ss.genre)}${field('Mood','ss-mood',ss.mood)}</div>
    <div class="field-row">${field('Main Sounds','ss-sounds',ss.mainSounds)}${field('Production Style','ss-production',ss.productionStyle)}</div>
    ${field('Energy','ss-energy',ss.energy)}
    ${fieldTA('Key Idea (summary sentence)','ss-keyidea',ss.keyIdea)}
    <div class="field-group" style="margin-top:16px">
      <label class="field-label">Key Songs to Notice</label>
      <div class="key-song-editor" id="ks-editor">${songRows}</div>
      <button type="button" class="btn btn-ghost btn-sm mt-2" data-action="add-ks">+ Add Song</button>
    </div>`;
}

function buildArtistHistEditor(a) {
  return `
    ${fieldTA('Artist / Band Overview (teacher reference)','artistOverview',a.artistOverview)}
    ${fieldTA('Historical Context (expanded mode only)','historicalContext',a.historicalContext)}
    <div class="field-group">
      <label class="field-label">Why They Matter — Artist Snapshot Bullets (one per line, first 3 shown)</label>
      <textarea class="field-textarea" name="importance" style="min-height:120px">${(a.importance||[]).map(esc).join('\n')}</textarea>
    </div>`;
}

function buildInfluenceEditor(a) {
  const im = a.influenceMap || {};
  return `
    <p style="font-size:0.8rem;color:var(--text3);margin-bottom:12px;">Edit influence data in albumLibrary.js for full control. Quick changes only here.</p>
    ${fieldTA('Source / Verification Notes','influenceSourceNotes',im.sourceNotes)}`;
}

function buildDiscussionEditor(a) {
  const qs = a.discussionQuestions || [];
  const rows = qs.map((q, i) =>
    `<div class="question-row">
      <input class="field-input" name="dq-${i}" value="${esc(q)}" placeholder="Discussion question...">
      <button type="button" class="question-del" data-action="del-dq" data-dq-index="${i}">&times;</button>
    </div>`
  ).join('');
  return `<div class="questions-editor" id="dq-editor">${rows}</div>
    <button type="button" class="btn btn-ghost btn-sm mt-2" data-action="add-dq">+ Add Question</button>`;
}

function buildResultsFields(a) {
  return `
    <div class="field-row">
      ${field('Class Score (1–10)','classScore',a.classScore,'number','','min="1" max="10" step="0.5"')}
      ${field('One-Word Reaction','oneWordReaction',a.oneWordReaction)}
    </div>
    ${Array.isArray(a.ratings) && a.ratings.length
      ? `<div class="field-hint" style="margin-top:-6px;margin-bottom:12px;">This score is the average of ${a.ratings.length} tallied ratings (${a.ratings.join(', ')}) from the Class Reaction slide. Adding another rating there recalculates it; &ldquo;Clear score &amp; tally&rdquo; on that slide starts over.</div>`
      : ''}
    ${field('Completed Date','completedDate',a.completedDate,'text','Example: October 15, 2025')}`;
}

function buildNextWeekEditor(a) {
  const nw = a.nextWeekPreview?.nextAlbum || {};
  const hw = a.nextWeekPreview?.homeworkAlbum || {};
  return `
    <div class="next-week-editor">
      <div class="next-week-col">
        <div class="next-col-label">Next Week's Album</div>
        ${field('Album ID (from library)','nextWeekAlbumId',a.nextWeekAlbumId,'text','Leave blank to enter title manually')}
        ${field('Album Title','nw-title',nw.title)}
        ${field('Artist','nw-artist',nw.artist)}
        ${field('Year','nw-year',nw.year,'number')}
        ${fieldTA('Teaser','nw-teaser',nw.teaser)}
        ${fieldTA('Listen-for Question','nw-listenfq',nw.listenForQuestion)}
      </div>
      <div class="next-week-col">
        <div class="next-col-label" style="color:var(--accent2)">Bridge Listen for Next Week</div>
        ${field('Album Title','hw-title',hw.title)}
        ${field('Artist','hw-artist',hw.artist)}
        ${field('Year','hw-year',hw.year,'number')}
        ${fieldTA('Why It Connects','hw-reason',hw.reason)}
        ${fieldTA('Student Listening Task','hw-task',hw.studentTask)}
      </div>
    </div>`;
}

function buildTeacherNotesFields(a) {
  return `
    ${fieldTA('General Teacher Notes','teacherNotesGeneral',a.teacherNotes?.general)}
    <div class="field-group">
      <label class="field-label">Sources (one per line)</label>
      <textarea class="field-textarea" name="sources">${esc((a.sources||[]).join('\n'))}</textarea>
      <div class="field-hint">Track where information came from. Teacher verification recommended.</div>
    </div>`;
}

// --- Save edits from form -----------------------------------
function saveEdits(albumId) {
  const form = document.getElementById('edit-form');
  if (!form) return;
  const id = albumId || form.dataset.albumId;
  const base = getAlbum(id);
  const fd = new FormData(form);
  const get = name => fd.get(name) || '';
  const cb = name => form.querySelector(`[name="${name}"]`)?.checked || false;

  const trackRows = form.querySelectorAll('.track-edit-row');
  const tracklist = [];
  trackRows.forEach(row => {
    const i = parseInt(row.dataset.trackIndex);
    const existing = base.tracklist?.[i] || {};
    tracklist.push({
      title: get(`track-title-${i}`) || existing.title,
      displayTitle: get(`track-display-${i}`) || get(`track-title-${i}`) || existing.title,
      duration: get(`track-dur-${i}`) || existing.duration || '',
      single: form.querySelector(`[name="track-single-${i}"]`)?.checked || false,
      explicit: form.querySelector(`[name="track-explicit-${i}"]`)?.checked || false,
      hiddenFromStudentView: form.querySelector(`[name="track-hidden-${i}"]`)?.checked || false,
      teacherNote: existing.teacherNote || ''
    });
  });

  const ksRows = form.querySelectorAll('.key-song-edit-row');
  const keySongs = [];
  ksRows.forEach(row => {
    const i = parseInt(row.dataset.ksIndex);
    const t = get(`ks-title-${i}`);
    if (t) keySongs.push({ title: t, note: get(`ks-note-${i}`) });
  });

  const dqInputs = form.querySelectorAll('.question-row [name^="dq-"]');
  const dqs = [];
  dqInputs.forEach(inp => { if (inp.value.trim()) dqs.push(inp.value.trim()); });

  const bflInputs = form.querySelectorAll('[name^="bfl-"]');
  const bfl = [];
  bflInputs.forEach(inp => { if (inp.value.trim()) bfl.push(inp.value.trim()); });

  const importanceRaw = get('importance');
  const importance = importanceRaw.split('\n').map(l => l.trim()).filter(Boolean);

  const edits = {
    title: get('title'), artist: get('artist'),
    year: parseInt(get('year')) || base.year,
    week: parseInt(get('week')) || base.week,
    status: get('status'),
    originalReleaseDate: get('originalReleaseDate'),
    originalLabel: get('originalLabel'),
    regionalReleaseInfo: get('regionalReleaseInfo'),
    artistCountry: get('artistCountry'),
    artistYearsActive: get('artistYearsActive'),
    artistScene: get('artistScene'),
    genres: get('genres').split(',').map(s=>s.trim()).filter(Boolean),
    theme: get('theme'),
    teacherApproved: cb('teacherApproved'),
    needsTeacherReview: cb('needsTeacherReview'),
    classroomSafeMode: cb('albumSafeMode'),
    artwork: { ...base.artwork, showArtwork: cb('showArtwork'), useTextOnlyFallback: cb('useTextOnlyFallback'), manualArtworkUrl: get('manualArtworkUrl'), musicBrainzReleaseGroupId: get('musicBrainzReleaseGroupId'), itunesCollectionId: get('itunesCollectionId') },
    contentNotes: { ...base.contentNotes, language: get('contentLang'), themes: get('contentThemes'), teacherDecision: get('contentDecision') },
    tracklist, keySongs,
    soundAndStyle: { genre: get('ss-genre'), mood: get('ss-mood'), mainSounds: get('ss-sounds'), productionStyle: get('ss-production'), energy: get('ss-energy'), keyIdea: get('ss-keyidea') },
    artistOverview: get('artistOverview'),
    historicalContext: get('historicalContext'),
    importance,
    discussionQuestions: dqs,
    beforeYouListen: bfl,
    icebreaker: { question: get('icebreakerQ'), activity: get('icebreakerActivity') },
    influenceMap: { ...base.influenceMap, sourceNotes: get('influenceSourceNotes') },
    classScore: get('classScore'),
    ...(Array.isArray(base.ratings) && base.ratings.length ? { ratings: base.ratings } : {}),
    oneWordReaction: get('oneWordReaction'),
    completedDate: get('completedDate'),
    nextWeekAlbumId: get('nextWeekAlbumId'),
    nextWeekPreview: {
      nextAlbum: { title: get('nw-title'), artist: get('nw-artist'), year: get('nw-year'), teaser: get('nw-teaser'), listenForQuestion: get('nw-listenfq') },
      homeworkAlbum: { title: get('hw-title'), artist: get('hw-artist'), year: get('hw-year'), reason: get('hw-reason'), studentTask: get('hw-task') }
    },
    teacherNotes: { general: get('teacherNotesGeneral'), slideNotes: {} },
    sources: get('sources').split('\n').map(s=>s.trim()).filter(Boolean),
  };

  saveStoredEdits(id, edits);
  EDIT_DIRTY = false;
  showToast('Edits saved!');
}

// ============================================================
// QUICK EDIT MODAL
// ============================================================
function openQuickEdit(slideType, albumId) {
  const album = getAlbum(albumId || APP.albumId);
  if (!album) return;
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  const label = SLIDE_LABEL_MAP[slideType] || slideType;
  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">Quick Edit: ${esc(label)}</div>
      <button class="modal-close" data-action="close-modal">&times;</button>
    </div>
    <div class="modal-body">
      <form id="quick-edit-form" data-album-id="${album.id}" data-slide-type="${slideType}">
        ${buildQuickEditFields(album, slideType)}
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" data-action="close-modal">Cancel</button>
      <button class="btn btn-primary" data-action="save-quick-edit">Save</button>
    </div>`;
  modal.classList.remove('hidden');
}

function buildQuickEditFields(album, slideType) {
  switch(slideType) {
    case 'intro':
      return `${field('Album Title','title',album.title)}${field('Artist','artist',album.artist)}
              ${field('Year','year',album.year,'number')}
              ${field('Genre Tags (comma-separated)','genres',(album.genres||[]).join(', '))}
              ${fieldTA('Theme / Central Idea','theme',album.theme)}
              ${fieldCheck('Show Artwork','showArtwork',album.artwork?.showArtwork!==false)}
              ${field('Manual Artwork URL','manualArtworkUrl',album.artwork?.manualArtworkUrl,'url','Overrides all — paste a direct image URL')}
              ${field('MusicBrainz Release Group ID','musicBrainzReleaseGroupId',album.artwork?.musicBrainzReleaseGroupId,'text','For reliable Cover Art Archive lookup')}
              ${field('iTunes Collection ID','itunesCollectionId',album.artwork?.itunesCollectionId,'text','For reliable iTunes artwork lookup')}`;
    case 'tracklist':
      return buildTracklistEditor(album) +
        `<hr style="border-color:var(--border);margin:16px 0">
         ${field('Original Release Date','originalReleaseDate',album.originalReleaseDate)}
         ${field('Original Label','originalLabel',album.originalLabel)}
         ${field('Regional Release Info','regionalReleaseInfo',album.regionalReleaseInfo)}`;
    case 'listen-for': {
      const bfl = album.beforeYouListen || [];
      const bflRows = bfl.map((b,i)=>`<div class="before-row"><input class="field-input" name="bfl-${i}" value="${esc(b)}"><button type="button" class="question-del" data-action="del-bfl" data-idx="${i}">&times;</button></div>`).join('');
      return `${fieldTA('Key Idea (one-liner)','ss-keyidea',album.soundAndStyle?.keyIdea)}
              <div class="field-group"><label class="field-label">Listen-For Points (max 4)</label><div class="before-editor" id="bfl-editor">${bflRows}</div><button type="button" class="btn btn-ghost btn-sm mt-2" data-action="add-bfl">+ Add</button></div>
              ${buildKeySongsEditorShort(album)}
              ${fieldTA('Partner Discussion Question','icebreakerQ',album.icebreaker?.question)}
              ${field('Activity Note','icebreakerActivity',album.icebreaker?.activity)}`;
    }
    case 'artist-snapshot':
      return `${field('Artist Country / Region','artistCountry',album.artistCountry)}
              ${field('Years Active','artistYearsActive',album.artistYearsActive)}
              ${field('Scene / Style Tags','artistScene',album.artistScene)}
              <div class="field-group"><label class="field-label">Artist Snapshot Bullets (one per line)</label><textarea class="field-textarea" name="importance" style="min-height:120px">${(album.importance||[]).map(esc).join('\n')}</textarea></div>`;
    case 'influences':
      return `<p style="color:var(--text3);font-size:0.82rem;margin-bottom:12px;">Edit influence data directly in albumLibrary.js for full control.</p>
              ${fieldTA('Source / Verification Notes','influenceSourceNotes',album.influenceMap?.sourceNotes)}`;
    case 'historical-context': return fieldTA('Historical Context','historicalContext',album.historicalContext);
    case 'why-matters':
      return `<div class="field-group"><label class="field-label">Why They Matter (one per line)</label><textarea class="field-textarea" name="importance" style="min-height:160px">${(album.importance||[]).map(esc).join('\n')}</textarea></div>`;
    case 'discography': return buildDiscoEditor(album);
    case 'reaction':
      return `${field('Class Score (1–10)','classScore',album.classScore,'number','','min="1" max="10" step="0.5"')}
              ${field('One-Word Reaction','oneWordReaction',album.oneWordReaction)}
              ${field('Completed Date','completedDate',album.completedDate)}
              ${buildDiscussionEditor(album)}`;
    case 'coming-next': return buildNextWeekEditor(album);
    default: return `<p style="color:var(--text3)">No quick edit fields for this slide.</p>`;
  }
}

function buildKeySongsEditorShort(a) {
  const songs = a.keySongs || [];
  const rows = songs.map((s, i) =>
    `<div class="key-song-edit-row" data-ks-index="${i}">
      <input class="track-edit-input ke-title" name="ks-title-${i}" placeholder="Song title" value="${esc(s.title)}">
      <input class="track-edit-input ke-note" name="ks-note-${i}" placeholder="Why this song matters..." value="${esc(s.note)}">
      <button type="button" class="track-del-btn" data-action="del-ks">&times;</button>
    </div>`
  ).join('');
  return `<div class="field-group" style="margin-top:12px"><label class="field-label">Key Songs</label>
    <div class="key-song-editor" id="ks-editor">${rows}</div>
    <button type="button" class="btn btn-ghost btn-sm mt-2" data-action="add-ks">+ Add Song</button>
  </div>`;
}

function buildDiscoEditor(a) {
  const disco = a.bandDiscography || [];
  const rows = disco.map((d, i) =>
    `<div class="disco-edit-row" data-disco-index="${i}">
      <input class="track-edit-input" name="disco-title-${i}" placeholder="Album title" value="${esc(d.title)}">
      <input class="track-edit-input" name="disco-artist-${i}" placeholder="Artist" value="${esc(d.artist||a.artist)}">
      <input class="track-edit-input" name="disco-year-${i}" placeholder="Year" value="${esc(d.year)}" type="number">
      <button type="button" class="track-del-btn" data-action="del-disco">&times;</button>
    </div>`
  ).join('');
  return `<div class="disco-editor" id="disco-editor">${rows}</div>
    <button type="button" class="btn btn-ghost btn-sm mt-2" data-action="add-disco">+ Add Album</button>`;
}

function saveQuickEdit() {
  const form = document.getElementById('quick-edit-form');
  if (!form) return;
  const albumId = form.dataset.albumId;
  const slideType = form.dataset.slideType;
  const album = getAlbum(albumId);
  const existing = getStoredEdits(albumId) || {};
  const fd = new FormData(form);
  const get = name => fd.get(name) || '';
  const cb = name => form.querySelector(`[name="${name}"]`)?.checked || false;
  let patch = {};

  switch(slideType) {
    case 'intro':
      patch = { title: get('title'), artist: get('artist'), year: parseInt(get('year'))||album.year,
        genres: get('genres').split(',').map(s=>s.trim()).filter(Boolean), theme: get('theme'),
        artwork: { ...album.artwork, showArtwork: cb('showArtwork'), manualArtworkUrl: get('manualArtworkUrl'), musicBrainzReleaseGroupId: get('musicBrainzReleaseGroupId'), itunesCollectionId: get('itunesCollectionId') } }; break;
    case 'tracklist': {
      const trs = form.querySelectorAll('.track-edit-row'), tl = [];
      trs.forEach(row => {
        const i = parseInt(row.dataset.trackIndex); const base2 = album.tracklist?.[i]||{};
        tl.push({ title: get(`track-title-${i}`)||base2.title, displayTitle: get(`track-display-${i}`)||get(`track-title-${i}`)||base2.title,
          single: form.querySelector(`[name="track-single-${i}"]`)?.checked||false,
          explicit: form.querySelector(`[name="track-explicit-${i}"]`)?.checked||false,
          hiddenFromStudentView: form.querySelector(`[name="track-hidden-${i}"]`)?.checked||false,
          teacherNote: base2.teacherNote||'' });
      });
      patch = { tracklist: tl, originalReleaseDate: get('originalReleaseDate'), originalLabel: get('originalLabel'), regionalReleaseInfo: get('regionalReleaseInfo') }; break;
    }
    case 'listen-for': {
      const bflInputs = form.querySelectorAll('[name^="bfl-"]');
      const ksRows2 = form.querySelectorAll('.key-song-edit-row'), ks2 = [];
      ksRows2.forEach(row => { const i=parseInt(row.dataset.ksIndex); const t=get(`ks-title-${i}`); if(t) ks2.push({title:t,note:get(`ks-note-${i}`)}); });
      patch = {
        beforeYouListen: Array.from(bflInputs).map(i=>i.value.trim()).filter(Boolean),
        icebreaker: { question: get('icebreakerQ'), activity: get('icebreakerActivity') },
        soundAndStyle: { ...((getAlbum(albumId)?.soundAndStyle)||{}), keyIdea: get('ss-keyidea') },
        keySongs: ks2
      }; break;
    }
    case 'artist-snapshot':
      patch = { artistCountry: get('artistCountry'), artistYearsActive: get('artistYearsActive'), artistScene: get('artistScene'),
        importance: get('importance').split('\n').map(s=>s.trim()).filter(Boolean) }; break;
    case 'influences':
      patch = { influenceMap: { ...album.influenceMap, sourceNotes: get('influenceSourceNotes') } }; break;
    case 'historical-context': patch = { historicalContext: get('historicalContext') }; break;
    case 'why-matters': patch = { importance: get('importance').split('\n').map(s=>s.trim()).filter(Boolean) }; break;
    case 'discography': {
      const drs = form.querySelectorAll('.disco-edit-row'), disco2 = [];
      drs.forEach(row => { const i=parseInt(row.dataset.discoIndex); const t=get(`disco-title-${i}`); if(t) disco2.push({title:t,artist:get(`disco-artist-${i}`),year:get(`disco-year-${i}`),artworkSource:'itunes'}); });
      patch = { bandDiscography: disco2 }; break;
    }
    case 'reaction': {
      const dqIs = form.querySelectorAll('[name^="dq-"]');
      patch = { classScore: get('classScore'), oneWordReaction: get('oneWordReaction'), completedDate: get('completedDate'),
        discussionQuestions: Array.from(dqIs).map(i=>i.value.trim()).filter(Boolean) }; break;
    }
    case 'coming-next':
      patch = { nextWeekAlbumId: get('nextWeekAlbumId'),
        nextWeekPreview: { nextAlbum: { title:get('nw-title'),artist:get('nw-artist'),year:get('nw-year'),teaser:get('nw-teaser'),listenForQuestion:get('nw-listenfq') },
          homeworkAlbum: { title:get('hw-title'),artist:get('hw-artist'),year:get('hw-year'),reason:get('hw-reason'),studentTask:get('hw-task') } } }; break;
  }

  saveStoredEdits(albumId, deepMerge(existing, patch));
  closeModal();
  showToast('Quick edit saved!');
  const app = document.getElementById('app');
  if (app && APP.view === 'presentation') {
    const updatedAlbum = getAlbum(albumId);
    const slideArea = app.querySelector('.slide-area');
    if (slideArea) { slideArea.innerHTML = buildSlide(updatedAlbum, APP.slideIndex); setTimeout(loadArtworkInView, 50); }
  }
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.add('hidden');
  document.getElementById('modal-content').innerHTML = '';
}

// ============================================================
// IMPORT / EXPORT
// ============================================================
function exportFullYear() {
  const artworkOverrides = {};
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith('aw_override_')) artworkOverrides[k] = localStorage.getItem(k);
  });
  downloadJSON({ exportDate: new Date().toISOString(), albums: getAllAlbums(), artworkOverrides }, 'audio-aficionados-full-year.json');
}
function exportAlbum(albumId) {
  const album = getAlbum(albumId);
  if (!album) return;
  downloadJSON(album, `audio-aficionados-${albumId}.json`);
}
function copyAlbumJSON(albumId) {
  const album = getAlbum(albumId);
  if (!album) return;
  navigator.clipboard?.writeText(JSON.stringify(album, null, 2))
    .then(() => showToast('JSON copied to clipboard!'))
    .catch(() => showToast('Copy failed — try Export instead', 'error'));
}
function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
  showToast('Exported: ' + filename);
}
function showImportDialog() {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">Import Full Year Data</div>
      <button class="modal-close" data-action="close-modal">&times;</button>
    </div>
    <div class="modal-body">
      <p style="font-size:0.85rem;color:var(--text2);margin-bottom:12px;">Upload or paste your exported JSON file to restore all teacher edits and class scores. <strong style="color:var(--warning)">This will overwrite your current edits.</strong></p>
      <label class="import-area" for="import-file-input">&#128194; Click to upload a JSON file (or paste JSON below)<input type="file" id="import-file-input" accept=".json" style="display:none"></label>
      <textarea class="import-textarea" id="import-json-text" placeholder="Or paste exported JSON here..."></textarea>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" data-action="close-modal">Cancel</button>
      <button class="btn btn-primary" data-action="confirm-import">Import &amp; Restore</button>
    </div>`;
  modal.classList.remove('hidden');
  document.getElementById('import-file-input')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { document.getElementById('import-json-text').value = ev.target.result; };
    reader.readAsText(file);
  });
}
function confirmImport() {
  const text = document.getElementById('import-json-text')?.value?.trim();
  if (!text) { showToast('Nothing to import.', 'error'); return; }
  try {
    const data = JSON.parse(text);
    const albums = data.albums || (Array.isArray(data) ? data : [data]);
    let count = 0;
    albums.forEach(a => {
      if (!a.id) return;
      if (albumLibrary.find(lib => lib.id === a.id)) { saveStoredEdits(a.id, a); count++; }
    });
    let artworkCount = 0;
    if (data.artworkOverrides && typeof data.artworkOverrides === 'object') {
      Object.entries(data.artworkOverrides).forEach(([k, v]) => {
        if (k.startsWith('aw_override_') && typeof v === 'string') {
          localStorage.setItem(k, v);
          artworkCount++;
        }
      });
    }
    closeModal();
    const artMsg = artworkCount ? ` + ${artworkCount} artwork override${artworkCount !== 1 ? 's' : ''}` : '';
    showToast(`Imported ${count} album${count !== 1 ? 's' : ''}${artMsg}.`);
    renderApp();
  } catch(e) { showToast('Invalid JSON. Check the file and try again.', 'error'); }
}

// ============================================================
// DYNAMIC FORM ACTIONS
// ============================================================
function addTrack() {
  const editor = document.getElementById('track-editor');
  if (!editor) return;
  const i = editor.querySelectorAll('.track-edit-row').length;
  const row = document.createElement('div');
  row.className = 'track-edit-row'; row.dataset.trackIndex = i;
  row.innerHTML = `<span class="track-edit-num">${i+1}</span>
    <input class="track-edit-input" style="flex:1" name="track-title-${i}" placeholder="Track title">
    <input class="track-edit-input" style="flex:1" name="track-display-${i}" placeholder="Display title">
    <div class="track-edit-checks">
      <label class="track-edit-check"><input type="checkbox" name="track-single-${i}"> Single</label>
      <label class="track-edit-check"><input type="checkbox" name="track-explicit-${i}"> Explicit</label>
      <label class="track-edit-check"><input type="checkbox" name="track-hidden-${i}"> Hide</label>
    </div>
    <button type="button" class="track-del-btn" data-action="del-track">&times;</button>`;
  editor.appendChild(row);
}

function addKS() {
  const editor = document.getElementById('ks-editor');
  if (!editor) return;
  const i = editor.querySelectorAll('.key-song-edit-row').length;
  const row = document.createElement('div');
  row.className = 'key-song-edit-row'; row.dataset.ksIndex = i;
  row.innerHTML = `<input class="track-edit-input ke-title" name="ks-title-${i}" placeholder="Song title">
    <input class="track-edit-input ke-note" name="ks-note-${i}" placeholder="Why this song matters...">
    <button type="button" class="track-del-btn" data-action="del-ks">&times;</button>`;
  editor.appendChild(row);
}
function addBFL() {
  const editor = document.getElementById('bfl-editor');
  if (!editor) return;
  const i = editor.querySelectorAll('[name^="bfl-"]').length;
  const row = document.createElement('div'); row.className = 'before-row';
  row.innerHTML = `<input class="field-input" name="bfl-${i}" placeholder="Listening instruction...">
    <button type="button" class="question-del" data-action="del-bfl" data-idx="${i}">&times;</button>`;
  editor.appendChild(row);
}
function addDQ() {
  const editor = document.getElementById('dq-editor');
  if (!editor) return;
  const i = editor.querySelectorAll('[name^="dq-"]').length;
  const row = document.createElement('div'); row.className = 'question-row';
  row.innerHTML = `<input class="field-input" name="dq-${i}" placeholder="Discussion question...">
    <button type="button" class="question-del" data-action="del-dq" data-dq-index="${i}">&times;</button>`;
  editor.appendChild(row);
}
function addDisco() {
  const editor = document.getElementById('disco-editor');
  if (!editor) return;
  const i = editor.querySelectorAll('.disco-edit-row').length;
  const row = document.createElement('div'); row.className = 'disco-edit-row'; row.dataset.discoIndex = i;
  row.innerHTML = `<input class="track-edit-input" name="disco-title-${i}" placeholder="Album title">
    <input class="track-edit-input" name="disco-artist-${i}" placeholder="Artist">
    <input class="track-edit-input" name="disco-year-${i}" placeholder="Year" type="number">
    <button type="button" class="track-del-btn" data-action="del-disco">&times;</button>`;
  editor.appendChild(row);
}

// ============================================================
// PRESENTATION CONTROLS
// ============================================================
function nextSlide() {
  const album = getAlbum(APP.albumId);
  const total = getSlides(album).length;
  if (APP.slideIndex < total - 1) { APP.slideIndex++; renderApp(); window.scrollTo(0,0); }
}
function prevSlide() {
  if (APP.slideIndex > 0) { APP.slideIndex--; renderApp(); window.scrollTo(0,0); }
}
function toggleProjectorMode() { APP.projectorMode = !APP.projectorMode; renderApp(); }
function toggleSafeMode() { APP.safeMode = !APP.safeMode; saveSettings(); renderApp(); }
function toggleDashboard() {
  APP.dashboardOpen = !APP.dashboardOpen; saveSettings();
  document.querySelector('.dashboard-body')?.classList.toggle('collapsed');
  document.querySelector('.dashboard-toggle')?.classList.toggle('open');
}
function refreshSlideArea(albumId) {
  const album = getAlbum(albumId);
  const slideArea = document.querySelector('.slide-area');
  if (album && slideArea && APP.view === 'presentation') {
    slideArea.innerHTML = buildSlide(album, APP.slideIndex);
    setTimeout(loadArtworkInView, 50);
  }
}

function setClassScore(albumId, score) {
  const existing = getStoredEdits(albumId) || {};
  existing.classScore = score || '';
  if (!score) delete existing.ratings;   // clearing the score clears the tally too
  saveStoredEdits(albumId, existing);
  refreshSlideArea(albumId);
}

// --- Ratings tally: each vote is stored; classScore = the average ---
function ratingsAverage(ratings) {
  const avg = ratings.reduce((s, n) => s + n, 0) / ratings.length;
  return String(Math.round(avg * 10) / 10);
}

function addRating(albumId, val) {
  if (!(val >= 1 && val <= 10)) return;
  const existing = getStoredEdits(albumId) || {};
  const ratings = Array.isArray(existing.ratings) ? [...existing.ratings] : [];
  ratings.push(val);
  existing.ratings = ratings;
  existing.classScore = ratingsAverage(ratings);
  saveStoredEdits(albumId, existing);
  refreshSlideArea(albumId);
}

function removeRating(albumId, idx) {
  const existing = getStoredEdits(albumId) || {};
  const ratings = Array.isArray(existing.ratings) ? [...existing.ratings] : [];
  if (idx < 0 || idx >= ratings.length) return;
  ratings.splice(idx, 1);
  if (ratings.length) {
    existing.ratings = ratings;
    existing.classScore = ratingsAverage(ratings);
  } else {
    delete existing.ratings;
    existing.classScore = '';
  }
  saveStoredEdits(albumId, existing);
  refreshSlideArea(albumId);
}

// ============================================================
// EVENT HANDLING
// ============================================================
document.addEventListener('click', function(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  const albumId = btn.dataset.albumId;

  switch(action) {
    case 'start-presentation': navigate('presentation', albumId, 0); break;
    case 'edit-album':         navigate('edit', albumId); break;
    case 'go-home':            navigate('home'); break;
    case 'view-archive':       navigate('archive'); break;
    case 'restart-presentation': navigate('presentation', APP.albumId, 0); break;
    case 'next-slide':         nextSlide(); break;
    case 'prev-slide':         prevSlide(); break;
    case 'toggle-projector':   toggleProjectorMode(); break;
    case 'toggle-safe-mode':   toggleSafeMode(); break;
    case 'toggle-dashboard':   toggleDashboard(); break;
    case 'toggle-edit-section': {
      const section = btn.closest('.edit-section');
      const body = section?.querySelector('.edit-section-body');
      const arrow = btn.querySelector('span:last-child');
      if (body) body.classList.toggle('collapsed');
      if (arrow) arrow.textContent = body?.classList.contains('collapsed') ? '▼' : '▲';
      break;
    }
    case 'save-edits':    saveEdits(albumId); break;
    case 'reset-edits':
      if (confirm(`Reset all local edits for "${albumId}"?`)) {
        clearStoredEdits(albumId); showToast('Edits reset.'); navigate('edit', albumId);
      } break;
    case 'export-full':   exportFullYear(); break;
    case 'import-full':   showImportDialog(); break;
    case 'export-album':  exportAlbum(albumId); break;
    case 'copy-json':     copyAlbumJSON(albumId); break;
    case 'confirm-import':confirmImport(); break;
    case 'close-modal':   closeModal(); break;
    case 'quick-edit':    openQuickEdit(btn.dataset.slideType, btn.dataset.albumId); break;
    case 'artwork-search': runArtworkSearch(btn.dataset.awKey, btn.dataset.awArtist, btn.dataset.awTitle); break;
    case 'save-quick-edit': saveQuickEdit(); break;
    case 'rate-album':    setClassScore(albumId, btn.dataset.score); break;
    case 'add-rating':    addRating(albumId, parseFloat(btn.dataset.score)); break;
    case 'remove-rating': removeRating(albumId, parseInt(btn.dataset.idx)); break;
    case 'add-track':     addTrack(); break;
    case 'del-track':     { const r = btn.closest('.track-edit-row'); if (r) r.remove(); break; }
    case 'add-ks':        addKS(); break;
    case 'del-ks':        { const r = btn.closest('.key-song-edit-row'); if (r) r.remove(); break; }
    case 'add-bfl':       addBFL(); break;
    case 'del-bfl':       { const r = btn.closest('.before-row'); if (r) r.remove(); break; }
    case 'add-dq':        addDQ(); break;
    case 'del-dq':        { const r = btn.closest('.question-row'); if (r) r.remove(); break; }
    case 'add-disco':     addDisco(); break;
    case 'del-disco':     { const r = btn.closest('.disco-edit-row'); if (r) r.remove(); break; }
    case 'clear-auto-artwork':
      if (confirm('Re-fetch all auto-searched discography covers? They will reload on next page visit.')) {
        Object.keys(localStorage).filter(k => k.startsWith('aw_auto_')).forEach(k => localStorage.removeItem(k));
        showToast('Auto artwork cache cleared. Covers will reload on next visit.');
      }
      break;
    case 'clear-ratings':
      if (confirm('Clear all class scores and reactions? This cannot be undone.')) {
        albumLibrary.forEach(a => {
          const stored = getStoredEdits(a.id);
          if (!stored) return;
          delete stored.classScore; delete stored.oneWordReaction; delete stored.completedDate; delete stored.ratings;
          Object.keys(stored).length ? saveStoredEdits(a.id, stored) : clearStoredEdits(a.id);
        });
        showToast('All ratings cleared.');
        renderApp();
      }
      break;
  }
});

document.addEventListener('click', function(e) {
  if (e.target.id === 'modal-overlay') closeModal();
});

// Replace button on artwork frames
document.addEventListener('click', function(e) {
  const replaceBtn = e.target.closest('.aw-replace-btn');
  if (replaceBtn && !APP.projectorMode) {
    e.stopPropagation();
    openArtworkPicker(replaceBtn.dataset.awKey, replaceBtn.dataset.awArtist, replaceBtn.dataset.awTitle);
    return;
  }

  // Search button inside picker modal
  const searchBtn = e.target.closest('.aw-search-btn');
  if (searchBtn) {
    runArtworkSearch(searchBtn.dataset.awKey, searchBtn.dataset.awArtist, searchBtn.dataset.awTitle);
    return;
  }

  // Click a result card to select it
  const resultCard = e.target.closest('.aw-result-card');
  if (resultCard) {
    const key = resultCard.dataset.awKey;
    const url = resultCard.dataset.awUrl;
    if (key && url) {
      setArtworkOverride(key, url);
      closeModal();
      renderApp();
    }
    return;
  }

  // Reset button (remove override, revert to suggested)
  const resetBtn = e.target.closest('.aw-reset-btn');
  if (resetBtn) {
    const key = resetBtn.dataset.awKey;
    if (key) {
      setArtworkOverride(key, null);
      closeModal();
      renderApp();
    }
    return;
  }
});

// File upload inside picker modal
document.addEventListener('change', function(e) {
  const fileInput = e.target.closest('.aw-file-input');
  if (!fileInput) return;
  const file = fileInput.files?.[0];
  const key = fileInput.dataset.awKey;
  if (!file || !key) return;

  const reader = new FileReader();
  reader.onload = ev => {
    const dataUrl = ev.target.result;
    setArtworkOverride(key, dataUrl);
    closeModal();
    renderApp();
  };
  reader.readAsDataURL(file);
});

// ============================================================
// INPUT EVENTS
// ============================================================
function bindInputEvents() {
  // Library search box — filters album cards in place
  document.addEventListener('input', function(e) {
    if (e.target.id === 'album-search') {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('.album-card').forEach(card => {
        card.style.display = !q || (card.dataset.search || '').includes(q) ? '' : 'none';
      });
      return;
    }
    // Any change inside the edit form marks it dirty
    if (e.target.closest('#edit-form')) EDIT_DIRTY = true;
  });

  document.addEventListener('change', function(e) {
    if (e.target.closest('#edit-form')) EDIT_DIRTY = true;
    // Next-week album picker (inline dropdown on coming-next slide)
    const picker = e.target.closest('[data-action="set-next-week"]');
    if (picker) {
      const id = picker.dataset.albumId;
      if (id) {
        const stored = getStoredEdits(id) || {};
        stored.nextWeekAlbumId = picker.value;
        saveStoredEdits(id, stored);
        const slideArea = document.querySelector('.slide-area');
        const updatedAlbum = getAlbum(id);
        if (slideArea && updatedAlbum) {
          slideArea.innerHTML = buildSlide(updatedAlbum, APP.slideIndex);
          setTimeout(loadArtworkInView, 50);
        }
      }
      return;
    }
    // One-word reaction
    const input = e.target.closest('.vote-reaction-input');
    if (!input) return;
    const id = input.dataset.albumId;
    if (!id) return;
    const existing = getStoredEdits(id) || {};
    existing.oneWordReaction = input.value.trim();
    saveStoredEdits(id, existing);
  });
}

// ============================================================
// KEYBOARD CONTROLS
// ============================================================
document.addEventListener('keydown', function(e) {
  if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
  if (!document.getElementById('modal-overlay')?.classList.contains('hidden')) {
    if (e.key === 'Escape') closeModal();
    return;
  }

  if (APP.view === 'presentation') {
    // On the Class Reaction slide, number keys tally a rating (0 = 10)
    if (/^[0-9]$/.test(e.key)) {
      const album = getAlbum(APP.albumId);
      if (album && getSlides(album)[APP.slideIndex] === 'reaction') {
        addRating(APP.albumId, e.key === '0' ? 10 : parseInt(e.key));
        return;
      }
    }
    switch(e.key) {
      case 'ArrowRight': case 'ArrowDown': e.preventDefault(); nextSlide(); break;
      case 'ArrowLeft':  case 'ArrowUp':  e.preventDefault(); prevSlide(); break;
      case 'Home': case 'Escape': navigate('home'); break;
      case 'r': case 'R': navigate('presentation', APP.albumId, 0); break;
      case 'p': case 'P': toggleProjectorMode(); break;
    }
  } else if (APP.view !== 'home') {
    if (e.key === 'Escape') navigate('home');
  }
});

// ============================================================
// INITIALIZATION
// ============================================================
async function startApp() {
  await syncFromCloud();
  checkUrlHash();
  if (APP.view === 'home') navigate('home');
  else renderApp();
}

async function init() {
  loadSettings();
  bindInputEvents();   // document-level delegation — registered exactly once
  if (!isUnlocked()) { buildGate(); return; }
  await startApp();
}

document.addEventListener('DOMContentLoaded', init);
