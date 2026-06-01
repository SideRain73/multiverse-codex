/* =====================================================================
   THE MULTIVERSE CODEX — app.js
   Data stored in Supabase (if configured in config.js) or IndexedDB.
   ===================================================================== */

// ── Simple crypto helpers ──────────────────────────────────────────────
async function hashPassword(pw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Detect Supabase config ────────────────────────────────────────────
const USE_SUPABASE = typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL.startsWith('https://');
let _supabase = null;
if (USE_SUPABASE) {
  _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
}

// ── Unified DB interface (Supabase or IndexedDB) ──────────────────────
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
    if (store === 'kv') {
      await _supabase.from('kv').delete().eq('key', key);
      return;
    }
    await _supabase.from(store).delete().eq('id', key);
  },

  async getAll(store) {
    const { data } = await _supabase.from(store).select('*');
    return data || [];
  }
} : {
  // ── IndexedDB fallback (local only) ───────────────────────────────
  _db: null,
  open() {
    return new Promise((res, rej) => {
      const req = indexedDB.open('MultiverseCodex', 2);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('kv'))       db.createObjectStore('kv');
        if (!db.objectStoreNames.contains('sections')) db.createObjectStore('sections', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('pages'))    db.createObjectStore('pages',    { keyPath: 'id' });
      };
      req.onsuccess = e => { DB._db = e.target.result; res(); };
      req.onerror   = e => rej(e.target.error);
    });
  },
  tx(stores, mode = 'readonly') { return DB._db.transaction(stores, mode); },
  get(store, key) {
    return new Promise((res, rej) => {
      const r = DB.tx(store).objectStore(store).get(key);
      r.onsuccess = () => res(r.result);
      r.onerror   = e => rej(e.target.error);
    });
  },
  put(store, value, key) {
    return new Promise((res, rej) => {
      const r = DB.tx(store, 'readwrite').objectStore(store).put(value, key);
      r.onsuccess = () => res();
      r.onerror   = e => rej(e.target.error);
    });
  },
  delete(store, key) {
    return new Promise((res, rej) => {
      const r = DB.tx(store, 'readwrite').objectStore(store).delete(key);
      r.onsuccess = () => res();
      r.onerror   = e => rej(e.target.error);
    });
  },
  getAll(store) {
    return new Promise((res, rej) => {
      const r = DB.tx(store).objectStore(store).getAll();
      r.onsuccess = () => res(r.result);
      r.onerror   = e => rej(e.target.error);
    });
  }
};

// ── Default sections ──────────────────────────────────────────────────
const DEFAULT_SECTIONS = [
  { id: 's1',  name: 'Worlds & Planes',        icon: '🌍', order: 1,  desc: 'Planes of existence, world lore, cosmology' },
  { id: 's2',  name: 'Lore',                   icon: '📖', order: 2,  desc: 'History, myths, legends and ancient texts' },
  { id: 's3',  name: 'Classi Aggiuntive',       icon: '⚔️', order: 3,  desc: 'Custom and additional character classes' },
  { id: 's4',  name: 'Classi Divine',           icon: '✨', order: 4,  desc: 'Divine subclasses and holy orders' },
  { id: 's5',  name: 'Abilità',                 icon: '🎯', order: 5,  desc: 'Special abilities, feats and skill trees' },
  { id: 's6',  name: 'Razze Giocabili',         icon: '🧝', order: 6,  desc: 'Playable races and their traits' },
  { id: 's7',  name: 'Regole di Gioco',         icon: '📜', order: 7,  desc: 'House rules, custom mechanics, rulings' },
  { id: 's8',  name: 'Combattimento',           icon: '🗡️', order: 8,  desc: 'Combat rules, maneuvers and tactics' },
  { id: 's9',  name: 'Oggetti Magici',          icon: '💎', order: 9,  desc: 'Magic items, artifacts and enchantments' },
  { id: 's10', name: 'Personaggi & NPCs',       icon: '👤', order: 10, desc: 'Player characters, notable NPCs and factions' },
  { id: 's11', name: 'Regni & Politica',        icon: '🏰', order: 11, desc: 'Kingdoms, politics and power structures' },
  { id: 's12', name: 'Campagna & Storia',       icon: '🗺️', order: 12, desc: 'Campaign arcs, session notes and story threads' },
  { id: 's13', name: 'Calendario',              icon: '📅', order: 13, desc: 'Campaign calendar, dates and events' },
  { id: 's14', name: 'Settori',                 icon: '🗺️', order: 14, desc: 'Regions, dungeon maps and locations' },
];

// ── State ────────────────────────────────────────────────────────────
const State = {
  isEditor: false,
  isViewer: false,
  currentSectionId: null,
  currentPageId: null,
  isEditing: false,
  openSections: new Set(),
  modalCallback: null,
};

// ── App entry point ───────────────────────────────────────────────────
const App = {
  async init() {
    await DB.open();
    // Check if already logged in this session
    const sess = sessionStorage.getItem('codex_role');
    if (sess === 'editor') { State.isEditor = true; State.isViewer = true; await App.enterApp(); }
    else if (sess === 'viewer') { State.isViewer = true; await App.enterApp(); }
    // else stay on login screen
  },

  async login() {
    const user = document.getElementById('loginUser').value.trim();
    const pw   = document.getElementById('loginPass').value;

    if (!user || !pw) { App.showLoginError('Please enter username and password.'); return; }

    // Test Supabase connection first
    if (USE_SUPABASE) {
      try {
        const { error } = await _supabase.from('kv').select('key').limit(1);
        if (error) { App.showLoginError('Database error: ' + error.message); return; }
      } catch (e) {
        App.showLoginError('Cannot connect to database. Check your internet connection.'); return;
      }
    }

    // Load credentials from DB
    const storedHash = await DB.get('kv', 'editorHash');
    const storedUser = await DB.get('kv', 'editorUser');

    // First-time setup: no credentials yet → create them and verify the write worked
    if (!storedHash) {
      const hash = await hashPassword(pw);
      await DB.put('kv', user, 'editorUser');
      await DB.put('kv', hash, 'editorHash');

      // Verify write actually succeeded
      const verify = await DB.get('kv', 'editorHash');
      if (!verify) { App.showLoginError('Failed to save credentials. Check database permissions.'); return; }

      State.isEditor = true; State.isViewer = true;
      sessionStorage.setItem('codex_role', 'editor');
      await App.enterApp();
      return;
    }

    // Validate credentials
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
    // Seed default sections if first launch
    const all = await DB.getAll('sections');
    if (all.length === 0) {
      for (const s of DEFAULT_SECTIONS) await DB.put('sections', s);
    }

    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appShell').classList.remove('hidden');

    if (State.isEditor) {
      document.querySelectorAll('.editor-only').forEach(el => el.classList.remove('hidden'));
    } else {
      document.querySelectorAll('.reader-only').forEach(el => el.classList.remove('hidden'));
    }

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

  // ── Navigation ──────────────────────────────────────────────────────
  async renderNav() {
    const sections = (await DB.getAll('sections')).sort((a, b) => a.order - b.order);
    const nav = document.getElementById('sectionNav');
    nav.innerHTML = '';

    for (const s of sections) {
      const pages = (await DB.getAll('pages')).filter(p => p.sectionId === s.id).sort((a, b) => a.order - b.order);
      const isOpen = State.openSections.has(s.id);

      const wrap = document.createElement('div');
      wrap.className = 'nav-section';
      wrap.dataset.sid = s.id;

      const header = document.createElement('div');
      header.className = 'nav-section-header' + (State.currentSectionId === s.id && !State.currentPageId ? ' active' : '');
      header.innerHTML = `<span class="nav-section-icon">${s.icon}</span><span>${s.name}</span><span class="nav-section-arrow ${isOpen ? 'open' : ''}">▶</span>`;
      header.onclick = () => App.clickSection(s.id);

      const pagesDiv = document.createElement('div');
      pagesDiv.className = 'nav-pages' + (isOpen ? ' open' : '');

      for (const p of pages) {
        const pg = document.createElement('div');
        pg.className = 'nav-page' + (State.currentPageId === p.id ? ' active' : '');
        pg.textContent = p.title;
        pg.onclick = (e) => { e.stopPropagation(); App.openPage(p.id); App.closeSidebar(); };
        pagesDiv.appendChild(pg);
      }

      wrap.appendChild(header);
      wrap.appendChild(pagesDiv);
      nav.appendChild(wrap);
    }

    // Home click
    document.querySelector('.sidebar-header').onclick = App.showDashboard;
  },

  async clickSection(id) {
    if (State.openSections.has(id)) {
      State.openSections.delete(id);
    } else {
      State.openSections.add(id);
    }
    State.currentSectionId = id;
    State.currentPageId = null;
    await App.renderNav();
    await App.showSection(id);
    App.closeSidebar();
  },

  // ── Mobile sidebar ──────────────────────────────────────────────────
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const isOpen  = sidebar.classList.contains('open');
    sidebar.classList.toggle('open', !isOpen);
    overlay.classList.toggle('active', !isOpen);
  },

  closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
  },

  // ── Views ───────────────────────────────────────────────────────────
  showView(name) {
    ['dashboard', 'pageView', 'sectionView'].forEach(v => {
      document.getElementById(v).classList.toggle('hidden', v !== name);
    });
  },

  async showDashboard() {
    State.currentSectionId = null;
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
      card.innerHTML = `
        <div class="dashboard-card-icon">${s.icon}</div>
        <div class="dashboard-card-name">${s.name}</div>
        <div class="dashboard-card-count">${count} page${count !== 1 ? 's' : ''}</div>
        <div class="dashboard-card-desc">${s.desc || ''}</div>
      `;
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

    const pages = (await DB.getAll('pages')).filter(p => p.sectionId === id).sort((a, b) => a.order - b.order);
    const grid = document.getElementById('sectionCards');
    grid.innerHTML = '';

    if (pages.length === 0) {
      grid.innerHTML = `<p style="color:var(--text3);font-style:italic;grid-column:1/-1">No pages yet. ${State.isEditor ? 'Click "+ New Page" to add one.' : ''}</p>`;
    }

    for (const p of pages) {
      const preview = p.body ? p.body.replace(/<[^>]+>/g, '').substring(0, 80) : 'No content yet...';
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

    State.currentPageId = id;
    State.currentSectionId = page.sectionId;
    State.openSections.add(page.sectionId);
    await App.renderNav();
    App.showView('pageView');

    // Breadcrumb
    document.getElementById('breadcrumb').innerHTML =
      `<span onclick="App.showDashboard()">Home</span><span class="sep">›</span><span onclick="App.clickSection('${section.id}')">${section.icon} ${section.name}</span><span class="sep">›</span>${page.title}`;

    // Title & body
    const titleEl = document.getElementById('pageTitle');
    titleEl.contentEditable = 'false';
    titleEl.textContent = page.title;

    const bodyEl = document.getElementById('pageBody');
    bodyEl.contentEditable = 'false';
    bodyEl.innerHTML = page.body || '<p style="color:var(--text3);font-style:italic">No content yet. Click Edit to start writing.</p>';

    document.getElementById('editorToolbar').classList.add('hidden');
    document.getElementById('editBtn').classList.remove('hidden');
    document.getElementById('saveBtn').classList.add('hidden');
    document.getElementById('cancelBtn').classList.add('hidden');

    if (State.isEditor) document.getElementById('pageActions').classList.remove('hidden');
  },

  startEdit() {
    State.isEditing = true;
    const page = State._editOriginal = { title: document.getElementById('pageTitle').textContent, body: document.getElementById('pageBody').innerHTML };
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
    const id = State.currentPageId;
    const page = await DB.get('pages', id);
    page.title = document.getElementById('pageTitle').textContent.trim() || page.title;
    page.body  = document.getElementById('pageBody').innerHTML;
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

    // Update breadcrumb title
    document.getElementById('breadcrumb').querySelectorAll('span').forEach((s, i, arr) => {
      if (i === arr.length - 1) s.textContent = page.title;
    });
    await App.renderNav();
  },

  // ── CRUD ─────────────────────────────────────────────────────────────
  async newPage() {
    App.openModal('New Page', `
      <label>Page Title</label>
      <input type="text" id="m_title" placeholder="e.g. Fireball Spell, Kingdom of Arath..." autofocus />
    `, async () => {
      const title = document.getElementById('m_title').value.trim();
      if (!title) return false;
      const allPages = await DB.getAll('pages');
      const maxOrder = allPages.filter(p => p.sectionId === State.currentSectionId).reduce((m, p) => Math.max(m, p.order), 0);
      const page = {
        id: 'p' + Date.now(),
        sectionId: State.currentSectionId,
        title,
        body: '',
        order: maxOrder + 1,
        created: Date.now(),
        updated: Date.now(),
      };
      await DB.put('pages', page);
      await App.renderNav();
      await App.openPage(page.id);
      App.startEdit();
    });
  },

  async deletePage() {
    const page = await DB.get('pages', State.currentPageId);
    App.openModal('Delete Page', `<p style="color:var(--text2)">Are you sure you want to delete "<strong style="color:var(--gold)">${page.title}</strong>"? This cannot be undone.</p>`, async () => {
      await DB.delete('pages', State.currentPageId);
      State.currentPageId = null;
      await App.renderNav();
      await App.showSection(State.currentSectionId);
    });
    document.getElementById('modalConfirm').textContent = 'Delete';
    document.getElementById('modalConfirm').className = 'btn-danger';
  },

  async renameSection() {
    const section = await DB.get('sections', State.currentSectionId);
    App.openModal('Rename Section', `
      <label>Section Name</label>
      <input type="text" id="m_sname" value="${section.name}" />
      <label>Icon (emoji)</label>
      <input type="text" id="m_sicon" value="${section.icon}" maxlength="4" />
      <label>Description</label>
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
    App.openModal('Delete Section', `<p style="color:var(--text2)">Delete "<strong style="color:var(--gold)">${section.name}</strong>" and all its <strong>${pages.length}</strong> page(s)? This cannot be undone.</p>`, async () => {
      for (const p of pages) await DB.delete('pages', p.id);
      await DB.delete('sections', section.id);
      State.currentSectionId = null;
      await App.renderNav();
      await App.showDashboard();
    });
    document.getElementById('modalConfirm').textContent = 'Delete';
    document.getElementById('modalConfirm').className = 'btn-danger';
  },

  async newSection() {
    const sections = await DB.getAll('sections');
    const maxOrder = sections.reduce((m, s) => Math.max(m, s.order), 0);
    App.openModal('New Section', `
      <label>Section Name</label>
      <input type="text" id="m_sname" placeholder="e.g. Deities, Spells, Artifacts..." autofocus />
      <label>Icon (emoji)</label>
      <input type="text" id="m_sicon" placeholder="📚" maxlength="4" />
      <label>Description (optional)</label>
      <input type="text" id="m_sdesc" placeholder="Brief description of this section" />
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

  // ── Settings ─────────────────────────────────────────────────────────
  showSettings() {
    App.openModal('Settings', `
      <div class="settings-section">
        <h3>Change Password</h3>
        <label>Current Password</label>
        <input type="password" id="s_old" placeholder="Current password" />
        <label>New Password</label>
        <input type="password" id="s_new" placeholder="New password" />
        <label>Confirm New Password</label>
        <input type="password" id="s_new2" placeholder="Confirm new password" />
        <div id="s_err" style="color:#ff8080;font-size:13px;margin-top:4px;display:none"></div>
      </div>
    `, async () => {
      const old  = document.getElementById('s_old').value;
      const nw   = document.getElementById('s_new').value;
      const nw2  = document.getElementById('s_new2').value;
      const err  = document.getElementById('s_err');

      if (!old || !nw || !nw2) { err.style.display='block'; err.textContent='All fields required.'; return false; }
      if (nw !== nw2) { err.style.display='block'; err.textContent='New passwords do not match.'; return false; }

      const stored = await DB.get('kv', 'editorHash');
      const oldHash = await hashPassword(old);
      if (oldHash !== stored) { err.style.display='block'; err.textContent='Current password is incorrect.'; return false; }

      const newHash = await hashPassword(nw);
      await DB.put('kv', newHash, 'editorHash');
      App.closeModal();
      alert('Password changed successfully!');
      return true;
    });
    document.getElementById('modalConfirm').textContent = 'Change Password';
  },

  // ── Export / Import ───────────────────────────────────────────────────
  async exportData() {
    const sections = await DB.getAll('sections');
    const pages    = await DB.getAll('pages');
    const blob = new Blob([JSON.stringify({ sections, pages }, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'multiverse_codex_backup.json';
    a.click(); URL.revokeObjectURL(url);
  },

  importData() {
    document.getElementById('importFile').click();
  },

  async handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    let data;
    try { data = JSON.parse(text); } catch { alert('Invalid JSON file.'); return; }
    if (!data.sections || !data.pages) { alert('Invalid backup file format.'); return; }

    App.openModal('Import Backup', `<p style="color:var(--text2)">This will <strong style="color:var(--gold)">replace all current data</strong> with the backup. Are you sure?</p>`, async () => {
      // Clear existing
      const oldSections = await DB.getAll('sections');
      const oldPages    = await DB.getAll('pages');
      for (const s of oldSections) await DB.delete('sections', s.id);
      for (const p of oldPages)    await DB.delete('pages',    p.id);
      // Insert new
      for (const s of data.sections) await DB.put('sections', s);
      for (const p of data.pages)    await DB.put('pages',    p);
      await App.renderNav();
      await App.showDashboard();
    });
    document.getElementById('modalConfirm').textContent = 'Replace & Import';
    document.getElementById('modalConfirm').className = 'btn-danger';
    e.target.value = '';
  },

  // ── Modal helpers ─────────────────────────────────────────────────────
  openModal(title, bodyHTML, onConfirm) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHTML;
    document.getElementById('modalConfirm').textContent = 'Confirm';
    document.getElementById('modalConfirm').className = 'btn-primary';
    State.modalCallback = onConfirm;
    document.getElementById('modalOverlay').classList.remove('hidden');
    // Auto-focus first input
    setTimeout(() => {
      const inp = document.querySelector('#modalBody input, #modalBody textarea');
      if (inp) inp.focus();
    }, 50);
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

// ── Editor formatting helpers ─────────────────────────────────────────
function fmt(cmd, val = null) {
  document.getElementById('pageBody').focus();
  document.execCommand(cmd, false, val);
}
function fmtBlock(tag) {
  document.getElementById('pageBody').focus();
  document.execCommand('formatBlock', false, tag);
}
function fmtColor(color) {
  if (!color) return;
  document.getElementById('pageBody').focus();
  document.execCommand('foreColor', false, color);
}
function insertTable() {
  const html = `<table>
    <thead><tr><th>Column 1</th><th>Column 2</th><th>Column 3</th></tr></thead>
    <tbody>
      <tr><td>Cell</td><td>Cell</td><td>Cell</td></tr>
      <tr><td>Cell</td><td>Cell</td><td>Cell</td></tr>
    </tbody>
  </table><p><br></p>`;
  document.getElementById('pageBody').focus();
  document.execCommand('insertHTML', false, html);
}
function insertDivider() {
  document.getElementById('pageBody').focus();
  document.execCommand('insertHTML', false, '<hr/><p><br></p>');
}

// ── Enter key in modal inputs ─────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') App.closeModal();
  if (e.key === 'Enter' && !e.shiftKey && document.getElementById('modalOverlay') && !document.getElementById('modalOverlay').classList.contains('hidden')) {
    const active = document.activeElement;
    if (active && active.tagName === 'INPUT') App.modalConfirm();
  }
  // Ctrl+S to save
  if (e.key === 's' && e.ctrlKey && State.isEditing) { e.preventDefault(); App.savePage(); }
});

// ── Boot ──────────────────────────────────────────────────────────────
App.init();
