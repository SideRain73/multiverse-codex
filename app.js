/* =====================================================================
   THE MULTIVERSE CODEX — app.js
   Structure: Section → Subcategory (optional) → Pages
   Data stored in Supabase (config.js) or IndexedDB fallback.
   ===================================================================== */

// ── Crypto helpers ────────────────────────────────────────────────────
async function hashPassword(pw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Supabase detection ────────────────────────────────────────────────
const USE_SUPABASE = typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL.startsWith('https://');
let _supabase = null;
if (USE_SUPABASE) _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// ── Unified DB (Supabase or IndexedDB) ───────────────────────────────
const DB = USE_SUPABASE ? {
  open() { return Promise.resolve(); },

  async get(store, key) {
    if (store === 'kv') {
      const { data } = await _supabase.from('kv').select('value').eq('key', key).maybeSingle();
      return data?.value ?? undefined;
    }
    const { data } = await _supabase.from(store).select('*').eq('id', key).maybeSingle();
    return data ?? undefined;
  },

  async put(store, value, key) {
    if (store === 'kv') {
      await _supabase.from('kv').upsert({ key, value }, { onConflict: 'key' });
      return;
    }
    await _supabase.from(store).upsert(value, { onConflict: 'id' });
  },

  async delete(store, key) {
    if (store === 'kv') { await _supabase.from('kv').delete().eq('key', key); return; }
    await _supabase.from(store).delete().eq('id', key);
  },

  async getAll(store) {
    const { data } = await _supabase.from(store).select('*');
    return data || [];
  }
} : {
  _db: null,
  open() {
    return new Promise((res, rej) => {
      const req = indexedDB.open('MultiverseCodex', 3);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('kv'))             db.createObjectStore('kv');
        if (!db.objectStoreNames.contains('sections'))       db.createObjectStore('sections',       { keyPath: 'id' });
        if (!db.objectStoreNames.contains('subcategories'))  db.createObjectStore('subcategories',  { keyPath: 'id' });
        if (!db.objectStoreNames.contains('pages'))          db.createObjectStore('pages',          { keyPath: 'id' });
      };
      req.onsuccess = e => { DB._db = e.target.result; res(); };
      req.onerror   = e => rej(e.target.error);
    });
  },
  tx(store, mode = 'readonly') { return DB._db.transaction(store, mode); },
  get(store, key) {
    return new Promise((res, rej) => {
      const r = DB.tx(store).objectStore(store).get(key);
      r.onsuccess = () => res(r.result); r.onerror = e => rej(e.target.error);
    });
  },
  put(store, value, key) {
    return new Promise((res, rej) => {
      const r = DB.tx(store, 'readwrite').objectStore(store).put(value, key);
      r.onsuccess = () => res(); r.onerror = e => rej(e.target.error);
    });
  },
  delete(store, key) {
    return new Promise((res, rej) => {
      const r = DB.tx(store, 'readwrite').objectStore(store).delete(key);
      r.onsuccess = () => res(); r.onerror = e => rej(e.target.error);
    });
  },
  getAll(store) {
    return new Promise((res, rej) => {
      const r = DB.tx(store).objectStore(store).getAll();
      r.onsuccess = () => res(r.result); r.onerror = e => rej(e.target.error);
    });
  }
};

// ── Default sections ──────────────────────────────────────────────────
const DEFAULT_SECTIONS = [
  { id: 's1',  name: 'Worlds & Planes',   icon: '🌍', order: 1,  desc: 'Planes of existence, world lore, cosmology' },
  { id: 's2',  name: 'Lore',              icon: '📖', order: 2,  desc: 'History, myths, legends and ancient texts' },
  { id: 's3',  name: 'Classi Aggiuntive', icon: '⚔️', order: 3,  desc: 'Custom and additional character classes' },
  { id: 's4',  name: 'Classi Divine',     icon: '✨', order: 4,  desc: 'Divine subclasses and holy orders' },
  { id: 's5',  name: 'Abilità',           icon: '🎯', order: 5,  desc: 'Special abilities, feats and skill trees' },
  { id: 's6',  name: 'Razze Giocabili',   icon: '🧝', order: 6,  desc: 'Playable races and their traits' },
  { id: 's7',  name: 'Regole di Gioco',   icon: '📜', order: 7,  desc: 'House rules, custom mechanics, rulings' },
  { id: 's8',  name: 'Combattimento',     icon: '🗡️', order: 8,  desc: 'Combat rules, maneuvers and tactics' },
  { id: 's9',  name: 'Oggetti Magici',    icon: '💎', order: 9,  desc: 'Magic items, artifacts and enchantments' },
  { id: 's10', name: 'Personaggi & NPCs', icon: '👤', order: 10, desc: 'Player characters, notable NPCs and factions' },
  { id: 's11', name: 'Regni & Politica',  icon: '🏰', order: 11, desc: 'Kingdoms, politics and power structures' },
  { id: 's12', name: 'Campagna & Storia', icon: '🗺️', order: 12, desc: 'Campaign arcs, session notes and story threads' },
  { id: 's13', name: 'Calendario',        icon: '📅', order: 13, desc: 'Campaign calendar, dates and events' },
  { id: 's14', name: 'Settori',           icon: '🗾', order: 14, desc: 'Regions, dungeon maps and locations' },
];

// ── State ─────────────────────────────────────────────────────────────
const State = {
  isEditor: false,
  isViewer: false,
  currentSectionId: null,
  currentSubcategoryId: null,
  currentPageId: null,
  isEditing: false,
  openSections: new Set(),
  openSubcategories: new Set(),
  modalCallback: null,
};

// ── App ───────────────────────────────────────────────────────────────
const App = {

  // ── Boot ─────────────────────────────────────────────────────────
  async init() {
    await DB.open();
    const sess = sessionStorage.getItem('codex_role');
    if (sess === 'editor') { State.isEditor = true; State.isViewer = true; await App.enterApp(); }
    else if (sess === 'viewer') { State.isViewer = true; await App.enterApp(); }
  },

  // ── Auth ──────────────────────────────────────────────────────────
  async login() {
    const user = document.getElementById('loginUser').value.trim();
    const pw   = document.getElementById('loginPass').value;
    if (!user || !pw) { App.showLoginError('Please enter username and password.'); return; }

    if (USE_SUPABASE) {
      try {
        const { error } = await _supabase.from('kv').select('key').limit(1);
        if (error) { App.showLoginError('Database error: ' + error.message); return; }
      } catch (e) { App.showLoginError('Cannot connect to database.'); return; }
    }

    const storedHash = await DB.get('kv', 'editorHash');
    const storedUser = await DB.get('kv', 'editorUser');

    if (!storedHash) {
      const hash = await hashPassword(pw);
      await DB.put('kv', user, 'editorUser');
      await DB.put('kv', hash, 'editorHash');
      const verify = await DB.get('kv', 'editorHash');
      if (!verify) { App.showLoginError('Failed to save credentials. Check database permissions.'); return; }
      State.isEditor = true; State.isViewer = true;
      sessionStorage.setItem('codex_role', 'editor');
      await App.enterApp();
      return;
    }

    if (user !== storedUser) { App.showLoginError('Invalid username or password.'); return; }
    const hash = await hashPassword(pw);
    if (hash !== storedHash) { App.showLoginError('Invalid username or password.'); return; }
    State.isEditor = true; State.isViewer = true;
    sessionStorage.setItem('codex_role', 'editor');
    await App.enterApp();
  },

  async viewOnly() {
    State.isViewer = true;
    sessionStorage.setItem('codex_role', 'viewer');
    await App.enterApp();
  },

  async enterApp() {
    const all = await DB.getAll('sections');
    if (all.length === 0) {
      for (const s of DEFAULT_SECTIONS) await DB.put('sections', s);
    }
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appShell').classList.remove('hidden');
    if (State.isEditor) document.querySelectorAll('.editor-only').forEach(el => el.classList.remove('hidden'));
    else                document.querySelectorAll('.reader-only').forEach(el => el.classList.remove('hidden'));
    await App.renderNav();
    App.showDashboard();
  },

  logout() {
    sessionStorage.removeItem('codex_role');
    State.isEditor = false; State.isViewer = false;
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('appShell').classList.add('hidden');
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
    document.querySelectorAll('.editor-only').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.reader-only').forEach(el => el.classList.add('hidden'));
  },

  showLoginError(msg) {
    const el = document.getElementById('loginError');
    el.textContent = msg;
    el.classList.remove('hidden');
  },

  // ── Mobile sidebar ────────────────────────────────────────────────
  toggleSidebar() {
    const s = document.getElementById('sidebar');
    const o = document.getElementById('sidebarOverlay');
    const open = s.classList.contains('open');
    s.classList.toggle('open', !open);
    o.classList.toggle('active', !open);
  },

  closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
  },

  // ── Navigation rendering ──────────────────────────────────────────
  async renderNav() {
    const sections      = (await DB.getAll('sections')).sort((a, b) => a.order - b.order);
    const subcategories = (await DB.getAll('subcategories')).sort((a, b) => a.order - b.order);
    const pages         = (await DB.getAll('pages')).sort((a, b) => a.order - b.order);

    const nav = document.getElementById('sectionNav');
    nav.innerHTML = '';

    for (const s of sections) {
      const sOpen = State.openSections.has(s.id);
      const sSubs = subcategories.filter(sc => sc.sectionId === s.id);
      const sLoosePages = pages.filter(p => p.sectionId === s.id && !p.subcategoryId);

      const wrap = document.createElement('div');
      wrap.className = 'nav-section';

      const header = document.createElement('div');
      header.className = 'nav-section-header' + (State.currentSectionId === s.id && !State.currentPageId && !State.currentSubcategoryId ? ' active' : '');
      header.innerHTML = `<span class="nav-section-icon">${s.icon}</span><span>${s.name}</span><span class="nav-section-arrow ${sOpen ? 'open' : ''}">▶</span>`;
      header.onclick = () => App.clickSection(s.id);

      const pagesWrap = document.createElement('div');
      pagesWrap.className = 'nav-section-pages' + (sOpen ? ' open' : '');

      // Subcategories
      for (const sc of sSubs) {
        const scOpen = State.openSubcategories.has(sc.id);
        const scPages = pages.filter(p => p.subcategoryId === sc.id);

        const scWrap = document.createElement('div');
        scWrap.className = 'nav-subcategory';

        const scHeader = document.createElement('div');
        scHeader.className = 'nav-subcategory-header' + (State.currentSubcategoryId === sc.id && !State.currentPageId ? ' active' : '');
        scHeader.innerHTML = `<span class="nav-subcategory-icon">${sc.icon || '📁'}</span><span>${sc.name}</span><span class="nav-subcategory-arrow ${scOpen ? 'open' : ''}">▶</span>`;
        scHeader.onclick = (e) => { e.stopPropagation(); App.clickSubcategory(sc.id); };

        const scPages_wrap = document.createElement('div');
        scPages_wrap.className = 'nav-sub-pages' + (scOpen ? ' open' : '');

        for (const p of scPages) {
          const pg = document.createElement('div');
          pg.className = 'nav-page sub' + (State.currentPageId === p.id ? ' active' : '');
          pg.textContent = p.title;
          pg.onclick = (e) => { e.stopPropagation(); App.openPage(p.id); App.closeSidebar(); };
          scPages_wrap.appendChild(pg);
        }

        scWrap.appendChild(scHeader);
        scWrap.appendChild(scPages_wrap);
        pagesWrap.appendChild(scWrap);
      }

      // Loose pages (no subcategory)
      for (const p of sLoosePages) {
        const pg = document.createElement('div');
        pg.className = 'nav-page' + (State.currentPageId === p.id ? ' active' : '');
        pg.textContent = p.title;
        pg.onclick = (e) => { e.stopPropagation(); App.openPage(p.id); App.closeSidebar(); };
        pagesWrap.appendChild(pg);
      }

      wrap.appendChild(header);
      wrap.appendChild(pagesWrap);
      nav.appendChild(wrap);
    }
  },

  async clickSection(id) {
    State.openSections.has(id) ? State.openSections.delete(id) : State.openSections.add(id);
    State.currentSectionId = id;
    State.currentSubcategoryId = null;
    State.currentPageId = null;
    await App.renderNav();
    await App.showSection(id);
    App.closeSidebar();
  },

  async clickSubcategory(id) {
    State.openSubcategories.has(id) ? State.openSubcategories.delete(id) : State.openSubcategories.add(id);
    State.currentSubcategoryId = id;
    State.currentPageId = null;
    const sc = await DB.get('subcategories', id);
    if (sc) State.currentSectionId = sc.sectionId;
    await App.renderNav();
    await App.showSubcategory(id);
    App.closeSidebar();
  },

  // ── Views ─────────────────────────────────────────────────────────
  showView(name) {
    ['dashboard', 'sectionView', 'subcategoryView', 'pageView'].forEach(v => {
      document.getElementById(v).classList.toggle('hidden', v !== name);
    });
  },

  async showDashboard() {
    State.currentSectionId = null;
    State.currentSubcategoryId = null;
    State.currentPageId = null;
    await App.renderNav();
    App.showView('dashboard');

    const sections = (await DB.getAll('sections')).sort((a, b) => a.order - b.order);
    const allPages = await DB.getAll('pages');
    const grid = document.getElementById('dashboardCards');
    grid.innerHTML = '';

    for (const s of sections) {
      const count = allPages.filter(p => p.sectionId === s.id).length;
      const card = document.createElement('div');
      card.className = 'dashboard-card';
      card.innerHTML = `<div class="dashboard-card-icon">${s.icon}</div><div class="dashboard-card-name">${s.name}</div><div class="dashboard-card-count">${count} page${count !== 1 ? 's' : ''}</div><div class="dashboard-card-desc">${s.desc || ''}</div>`;
      card.onclick = () => App.clickSection(s.id);
      grid.appendChild(card);
    }
  },

  async showSection(id) {
    const section = await DB.get('sections', id);
    if (!section) return;
    App.showView('sectionView');

    document.getElementById('sectionTitle').textContent = section.icon + '  ' + section.name;
    if (State.isEditor) document.getElementById('sectionActions').classList.remove('hidden');

    const subcategories = (await DB.getAll('subcategories')).filter(sc => sc.sectionId === id).sort((a, b) => a.order - b.order);
    const pages         = (await DB.getAll('pages')).filter(p => p.sectionId === id && !p.subcategoryId).sort((a, b) => a.order - b.order);
    const allPages      = await DB.getAll('pages');

    const grid = document.getElementById('sectionCards');
    grid.innerHTML = '';

    if (subcategories.length === 0 && pages.length === 0) {
      grid.innerHTML = `<p style="color:var(--text3);font-style:italic;grid-column:1/-1">Nessun contenuto. ${State.isEditor ? 'Clicca "+ New" per aggiungere.' : ''}</p>`;
      return;
    }

    // Subcategory cards
    if (subcategories.length > 0) {
      const label = document.createElement('div');
      label.className = 'grid-label';
      label.textContent = 'Sottocategorie';
      grid.appendChild(label);

      for (const sc of subcategories) {
        const count = allPages.filter(p => p.subcategoryId === sc.id).length;
        const card = document.createElement('div');
        card.className = 'subcategory-card';
        card.innerHTML = `<div class="subcategory-card-icon">${sc.icon || '📁'}</div><div class="subcategory-card-info"><div class="subcategory-card-name">${sc.name}</div><div class="subcategory-card-count">${count} page${count !== 1 ? 's' : ''}</div></div>`;
        card.onclick = () => App.clickSubcategory(sc.id);
        grid.appendChild(card);
      }
    }

    // Loose pages
    if (pages.length > 0) {
      if (subcategories.length > 0) {
        const label = document.createElement('div');
        label.className = 'grid-label';
        label.textContent = 'Pagine';
        grid.appendChild(label);
      }
      for (const p of pages) {
        const preview = p.body ? p.body.replace(/<[^>]+>/g, '').substring(0, 80) : 'Nessun contenuto...';
        const card = document.createElement('div');
        card.className = 'page-card';
        card.innerHTML = `<div class="page-card-title">${p.title}</div><div class="page-card-preview">${preview}</div>`;
        card.onclick = () => App.openPage(p.id);
        grid.appendChild(card);
      }
    }
  },

  async showSubcategory(id) {
    const sc = await DB.get('subcategories', id);
    if (!sc) return;
    const section = await DB.get('sections', sc.sectionId);
    App.showView('subcategoryView');

    document.getElementById('subcategoryBreadcrumb').innerHTML =
      `<span onclick="App.showDashboard()">Home</span><span class="sep">›</span><span onclick="App.clickSection('${section.id}')">${section.icon} ${section.name}</span>`;
    document.getElementById('subcategoryTitle').textContent = (sc.icon || '📁') + '  ' + sc.name;
    if (State.isEditor) document.getElementById('subcategoryActions').classList.remove('hidden');

    const pages = (await DB.getAll('pages')).filter(p => p.subcategoryId === id).sort((a, b) => a.order - b.order);
    const grid = document.getElementById('subcategoryCards');
    grid.innerHTML = '';

    if (pages.length === 0) {
      grid.innerHTML = `<p style="color:var(--text3);font-style:italic;grid-column:1/-1">Nessuna pagina. ${State.isEditor ? 'Clicca "+ New Page" per aggiungere.' : ''}</p>`;
      return;
    }
    for (const p of pages) {
      const preview = p.body ? p.body.replace(/<[^>]+>/g, '').substring(0, 80) : 'Nessun contenuto...';
      const card = document.createElement('div');
      card.className = 'page-card';
      card.innerHTML = `<div class="page-card-title">${p.title}</div><div class="page-card-preview">${preview}</div>`;
      card.onclick = () => App.openPage(p.id);
      grid.appendChild(card);
    }
  },

  async openPage(id) {
    const page = await DB.get('pages', id);
    if (!page) return;
    const section = await DB.get('sections', page.sectionId);
    const sc = page.subcategoryId ? await DB.get('subcategories', page.subcategoryId) : null;

    State.currentPageId = id;
    State.currentSectionId = page.sectionId;
    State.currentSubcategoryId = page.subcategoryId || null;
    State.openSections.add(page.sectionId);
    if (sc) State.openSubcategories.add(sc.id);
    await App.renderNav();
    App.showView('pageView');

    // Breadcrumb
    let bc = `<span onclick="App.showDashboard()">Home</span><span class="sep">›</span><span onclick="App.clickSection('${section.id}')">${section.icon} ${section.name}</span>`;
    if (sc) bc += `<span class="sep">›</span><span onclick="App.clickSubcategory('${sc.id}')">${sc.icon || '📁'} ${sc.name}</span>`;
    bc += `<span class="sep">›</span>${page.title}`;
    document.getElementById('breadcrumb').innerHTML = bc;

    const titleEl = document.getElementById('pageTitle');
    titleEl.contentEditable = 'false';
    titleEl.textContent = page.title;

    const bodyEl = document.getElementById('pageBody');
    bodyEl.contentEditable = 'false';
    bodyEl.innerHTML = page.body || '<p style="color:var(--text3);font-style:italic">Nessun contenuto. Clicca Edit per iniziare a scrivere.</p>';

    document.getElementById('editorToolbar').classList.add('hidden');
    document.getElementById('editBtn').classList.remove('hidden');
    document.getElementById('saveBtn').classList.add('hidden');
    document.getElementById('cancelBtn').classList.add('hidden');
    document.getElementById('deletePageBtn').classList.remove('hidden');

    if (State.isEditor) document.getElementById('pageActions').classList.remove('hidden');
  },

  startEdit() {
    State.isEditing = true;
    State._editOriginal = { title: document.getElementById('pageTitle').textContent, body: document.getElementById('pageBody').innerHTML };
    document.getElementById('pageTitle').contentEditable = 'true';
    document.getElementById('pageTitle').focus();
    document.getElementById('pageBody').contentEditable = 'true';
    document.getElementById('editorToolbar').classList.remove('hidden');
    document.getElementById('editBtn').classList.add('hidden');
    document.getElementById('saveBtn').classList.remove('hidden');
    document.getElementById('cancelBtn').classList.remove('hidden');
    document.getElementById('deletePageBtn').classList.add('hidden');
  },

  cancelEdit() {
    State.isEditing = false;
    document.getElementById('pageTitle').contentEditable = 'false';
    document.getElementById('pageBody').contentEditable = 'false';
    document.getElementById('pageTitle').textContent = State._editOriginal.title;
    document.getElementById('pageBody').innerHTML = State._editOriginal.body;
    document.getElementById('editorToolbar').classList.add('hidden');
    document.getElementById('editBtn').classList.remove('hidden');
    document.getElementById('saveBtn').classList.add('hidden');
    document.getElementById('cancelBtn').classList.add('hidden');
    document.getElementById('deletePageBtn').classList.remove('hidden');
  },

  async savePage() {
    const page = await DB.get('pages', State.currentPageId);
    page.title   = document.getElementById('pageTitle').textContent.trim() || page.title;
    page.body    = document.getElementById('pageBody').innerHTML;
    page.updated = Date.now();
    await DB.put('pages', page);
    State.isEditing = false;
    document.getElementById('pageTitle').contentEditable = 'false';
    document.getElementById('pageBody').contentEditable = 'false';
    document.getElementById('editorToolbar').classList.add('hidden');
    document.getElementById('editBtn').classList.remove('hidden');
    document.getElementById('saveBtn').classList.add('hidden');
    document.getElementById('cancelBtn').classList.add('hidden');
    document.getElementById('deletePageBtn').classList.remove('hidden');
    await App.renderNav();
  },

  // ── Create: choice modal ──────────────────────────────────────────
  newItem() {
    App.openModal('Cosa vuoi creare?', `
      <div class="choice-grid">
        <div class="choice-card" onclick="App.closeModal(); setTimeout(()=>App.newSubcategory(),50)">
          <div class="choice-card-icon">📁</div>
          <div class="choice-card-name">Sottocategoria</div>
          <div class="choice-card-desc">Raggruppa più pagine insieme</div>
        </div>
        <div class="choice-card" onclick="App.closeModal(); setTimeout(()=>App.newPage(),50)">
          <div class="choice-card-icon">📄</div>
          <div class="choice-card-name">Pagina</div>
          <div class="choice-card-desc">Aggiungi contenuto diretto</div>
        </div>
      </div>
    `, null);
    document.getElementById('modalActions').classList.add('hidden');
  },

  // ── CRUD: Pages ───────────────────────────────────────────────────
  async newPage() {
    App.openModal('Nuova Pagina', `
      <label>Titolo della pagina</label>
      <input type="text" id="m_title" placeholder="es. Incantesimo Palla di Fuoco, Regno di Arath..." autofocus />
    `, async () => {
      const title = document.getElementById('m_title').value.trim();
      if (!title) return false;
      const allPages = await DB.getAll('pages');
      const maxOrder = allPages.filter(p =>
        State.currentSubcategoryId ? p.subcategoryId === State.currentSubcategoryId : (p.sectionId === State.currentSectionId && !p.subcategoryId)
      ).reduce((m, p) => Math.max(m, p.order || 0), 0);

      const page = {
        id: 'p' + Date.now(),
        sectionId: State.currentSectionId,
        subcategoryId: State.currentSubcategoryId || null,
        title,
        body: '',
        order: maxOrder + 1,
        created: Date.now(),
        updated: Date.now(),
      };
      await DB.put('pages', page);
      State.currentPageId = page.id;
      await App.renderNav();
      await App.openPage(page.id);
      App.startEdit();
    });
  },

  async deletePage() {
    const page = await DB.get('pages', State.currentPageId);
    App.openModal('Elimina Pagina', `<p style="color:var(--text2)">Eliminare "<strong style="color:var(--gold)">${page.title}</strong>"? Questa azione è irreversibile.</p>`, async () => {
      const subcatId = page.subcategoryId;
      const sectionId = page.sectionId;
      await DB.delete('pages', State.currentPageId);
      State.currentPageId = null;
      await App.renderNav();
      if (subcatId) await App.showSubcategory(subcatId);
      else await App.showSection(sectionId);
    });
    document.getElementById('modalConfirm').textContent = 'Elimina';
    document.getElementById('modalConfirm').className = 'btn-danger';
  },

  // ── CRUD: Subcategories ───────────────────────────────────────────
  async newSubcategory() {
    const all = (await DB.getAll('subcategories')).filter(sc => sc.sectionId === State.currentSectionId);
    const maxOrder = all.reduce((m, sc) => Math.max(m, sc.order || 0), 0);
    App.openModal('Nuova Sottocategoria', `
      <label>Nome</label>
      <input type="text" id="m_scname" placeholder="es. Barbaro Divino, Mago Divino..." autofocus />
      <label>Icona (emoji)</label>
      <input type="text" id="m_scicon" placeholder="📁" maxlength="4" />
    `, async () => {
      const name = document.getElementById('m_scname').value.trim();
      if (!name) return false;
      const sc = {
        id: 'sc' + Date.now(),
        sectionId: State.currentSectionId,
        name,
        icon: document.getElementById('m_scicon').value.trim() || '📁',
        order: maxOrder + 1,
      };
      await DB.put('subcategories', sc);
      State.currentSubcategoryId = sc.id;
      State.openSubcategories.add(sc.id);
      await App.renderNav();
      await App.showSubcategory(sc.id);
    });
  },

  async renameSubcategory() {
    const sc = await DB.get('subcategories', State.currentSubcategoryId);
    App.openModal('Rinomina Sottocategoria', `
      <label>Nome</label>
      <input type="text" id="m_scname" value="${sc.name}" />
      <label>Icona (emoji)</label>
      <input type="text" id="m_scicon" value="${sc.icon || '📁'}" maxlength="4" />
    `, async () => {
      sc.name = document.getElementById('m_scname').value.trim() || sc.name;
      sc.icon = document.getElementById('m_scicon').value.trim() || sc.icon;
      await DB.put('subcategories', sc);
      await App.renderNav();
      await App.showSubcategory(State.currentSubcategoryId);
    });
  },

  async deleteSubcategory() {
    const sc = await DB.get('subcategories', State.currentSubcategoryId);
    const pages = (await DB.getAll('pages')).filter(p => p.subcategoryId === sc.id);
    App.openModal('Elimina Sottocategoria', `<p style="color:var(--text2)">Eliminare "<strong style="color:var(--gold)">${sc.name}</strong>" e le sue <strong>${pages.length}</strong> pagine? Questa azione è irreversibile.</p>`, async () => {
      for (const p of pages) await DB.delete('pages', p.id);
      await DB.delete('subcategories', sc.id);
      State.currentSubcategoryId = null;
      await App.renderNav();
      await App.showSection(State.currentSectionId);
    });
    document.getElementById('modalConfirm').textContent = 'Elimina';
    document.getElementById('modalConfirm').className = 'btn-danger';
  },

  // ── CRUD: Sections ────────────────────────────────────────────────
  async newSection() {
    const sections = await DB.getAll('sections');
    const maxOrder = sections.reduce((m, s) => Math.max(m, s.order || 0), 0);
    App.openModal('Nuova Sezione', `
      <label>Nome sezione</label>
      <input type="text" id="m_sname" placeholder="es. Incantesimi, Artefatti..." autofocus />
      <label>Icona (emoji)</label>
      <input type="text" id="m_sicon" placeholder="📚" maxlength="4" />
      <label>Descrizione (opzionale)</label>
      <input type="text" id="m_sdesc" placeholder="Breve descrizione della sezione" />
    `, async () => {
      const name = document.getElementById('m_sname').value.trim();
      if (!name) return false;
      const section = {
        id: 's' + Date.now(),
        name,
        icon: document.getElementById('m_sicon').value.trim() || '📄',
        desc: document.getElementById('m_sdesc').value.trim(),
        order: maxOrder + 1,
      };
      await DB.put('sections', section);
      State.currentSectionId = section.id;
      State.openSections.add(section.id);
      await App.renderNav();
      await App.showSection(section.id);
    });
  },

  async renameSection() {
    const section = await DB.get('sections', State.currentSectionId);
    App.openModal('Rinomina Sezione', `
      <label>Nome</label>
      <input type="text" id="m_sname" value="${section.name}" />
      <label>Icona (emoji)</label>
      <input type="text" id="m_sicon" value="${section.icon}" maxlength="4" />
      <label>Descrizione</label>
      <input type="text" id="m_sdesc" value="${section.desc || ''}" />
    `, async () => {
      section.name = document.getElementById('m_sname').value.trim() || section.name;
      section.icon = document.getElementById('m_sicon').value.trim() || section.icon;
      section.desc = document.getElementById('m_sdesc').value.trim();
      await DB.put('sections', section);
      await App.renderNav();
      await App.showSection(State.currentSectionId);
    });
  },

  async deleteSection() {
    const section = await DB.get('sections', State.currentSectionId);
    const pages = (await DB.getAll('pages')).filter(p => p.sectionId === section.id);
    const subs  = (await DB.getAll('subcategories')).filter(sc => sc.sectionId === section.id);
    App.openModal('Elimina Sezione', `<p style="color:var(--text2)">Eliminare "<strong style="color:var(--gold)">${section.name}</strong>" con <strong>${subs.length}</strong> sottocategorie e <strong>${pages.length}</strong> pagine? Questa azione è irreversibile.</p>`, async () => {
      for (const p  of pages) await DB.delete('pages',         p.id);
      for (const sc of subs)  await DB.delete('subcategories', sc.id);
      await DB.delete('sections', section.id);
      State.currentSectionId = null;
      await App.renderNav();
      await App.showDashboard();
    });
    document.getElementById('modalConfirm').textContent = 'Elimina';
    document.getElementById('modalConfirm').className = 'btn-danger';
  },

  // ── Settings ──────────────────────────────────────────────────────
  showSettings() {
    App.openModal('Impostazioni', `
      <h3 style="font-family:Cinzel,serif;font-size:14px;color:var(--gold2);margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid var(--border)">Cambia Password</h3>
      <label>Password attuale</label>
      <input type="password" id="s_old" placeholder="Password attuale" />
      <label>Nuova password</label>
      <input type="password" id="s_new" placeholder="Nuova password" />
      <label>Conferma nuova password</label>
      <input type="password" id="s_new2" placeholder="Conferma nuova password" />
      <div id="s_err" style="color:#ff8080;font-size:13px;margin-top:4px;display:none"></div>
    `, async () => {
      const old  = document.getElementById('s_old').value;
      const nw   = document.getElementById('s_new').value;
      const nw2  = document.getElementById('s_new2').value;
      const err  = document.getElementById('s_err');
      if (!old || !nw || !nw2) { err.style.display='block'; err.textContent='Tutti i campi sono obbligatori.'; return false; }
      if (nw !== nw2) { err.style.display='block'; err.textContent='Le nuove password non coincidono.'; return false; }
      const stored = await DB.get('kv', 'editorHash');
      const oldHash = await hashPassword(old);
      if (oldHash !== stored) { err.style.display='block'; err.textContent='Password attuale non corretta.'; return false; }
      await DB.put('kv', await hashPassword(nw), 'editorHash');
      App.closeModal();
      alert('Password cambiata con successo!');
      return true;
    });
    document.getElementById('modalConfirm').textContent = 'Cambia Password';
  },

  // ── Export / Import ───────────────────────────────────────────────
  async exportData() {
    const sections      = await DB.getAll('sections');
    const subcategories = await DB.getAll('subcategories');
    const pages         = await DB.getAll('pages');
    const blob = new Blob([JSON.stringify({ sections, subcategories, pages }, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'multiverse_codex_backup.json';
    a.click(); URL.revokeObjectURL(url);
  },

  importData() { document.getElementById('importFile').click(); },

  async handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    let data;
    try { data = JSON.parse(await file.text()); } catch { alert('File JSON non valido.'); return; }
    if (!data.sections || !data.pages) { alert('Formato backup non valido.'); return; }

    App.openModal('Importa Backup', `<p style="color:var(--text2)">Questo <strong style="color:var(--gold)">sostituirà tutti i dati attuali</strong> con il backup. Sei sicuro?</p>`, async () => {
      const oldSections = await DB.getAll('sections');
      const oldSubs     = await DB.getAll('subcategories');
      const oldPages    = await DB.getAll('pages');
      for (const s  of oldSections) await DB.delete('sections',       s.id);
      for (const sc of oldSubs)     await DB.delete('subcategories',  sc.id);
      for (const p  of oldPages)    await DB.delete('pages',          p.id);
      for (const s  of data.sections)                  await DB.put('sections',      s);
      for (const sc of (data.subcategories || []))     await DB.put('subcategories', sc);
      for (const p  of data.pages)                     await DB.put('pages',         p);
      await App.renderNav();
      await App.showDashboard();
    });
    document.getElementById('modalConfirm').textContent = 'Sostituisci & Importa';
    document.getElementById('modalConfirm').className = 'btn-danger';
    e.target.value = '';
  },

  // ── Modal helpers ─────────────────────────────────────────────────
  openModal(title, bodyHTML, onConfirm) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHTML;
    document.getElementById('modalConfirm').textContent = 'Conferma';
    document.getElementById('modalConfirm').className = 'btn-primary';
    document.getElementById('modalActions').classList.remove('hidden');
    State.modalCallback = onConfirm;
    document.getElementById('modalOverlay').classList.remove('hidden');
    setTimeout(() => { const inp = document.querySelector('#modalBody input, #modalBody textarea'); if (inp) inp.focus(); }, 50);
  },

  async modalConfirm() {
    if (!State.modalCallback) { App.closeModal(); return; }
    const result = await State.modalCallback();
    if (result !== false) App.closeModal();
  },

  closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
    State.modalCallback = null;
  },
};

// ── Editor helpers ────────────────────────────────────────────────────
function fmt(cmd) { document.getElementById('pageBody').focus(); document.execCommand(cmd, false, null); }
function fmtBlock(tag) { document.getElementById('pageBody').focus(); document.execCommand('formatBlock', false, tag); }
function fmtColor(color) { if (!color) return; document.getElementById('pageBody').focus(); document.execCommand('foreColor', false, color); }
function insertTable() {
  document.getElementById('pageBody').focus();
  document.execCommand('insertHTML', false, `<table><thead><tr><th>Colonna 1</th><th>Colonna 2</th><th>Colonna 3</th></tr></thead><tbody><tr><td>Cella</td><td>Cella</td><td>Cella</td></tr><tr><td>Cella</td><td>Cella</td><td>Cella</td></tr></tbody></table><p><br></p>`);
}
function insertDivider() { document.getElementById('pageBody').focus(); document.execCommand('insertHTML', false, '<hr/><p><br></p>'); }

// ── Keyboard shortcuts ────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') App.closeModal();
  if (e.key === 'Enter' && !e.shiftKey && !document.getElementById('modalOverlay').classList.contains('hidden')) {
    if (document.activeElement && document.activeElement.tagName === 'INPUT') App.modalConfirm();
  }
  if (e.key === 's' && e.ctrlKey && State.isEditing) { e.preventDefault(); App.savePage(); }
});

// ── Boot ──────────────────────────────────────────────────────────────
App.init();
