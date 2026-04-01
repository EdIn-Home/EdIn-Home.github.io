// ─────────────────────────────────────────
// GLOBAL STATE
// ─────────────────────────────────────────
let currentPage = 'home';
let currentPaper = null;
let currentAuthor = null;
let currentJournal = null;
let searchQuery = '';

// ─────────────────────────────────────────
// DATA (UNCHANGED)
// ─────────────────────────────────────────
const PAPERS = [/* SAME AS YOUR DATA */];
const AUTHORS = [/* SAME */];
const JOURNALS = [/* SAME */];
const FIELDS = [/* SAME */];

// ─────────────────────────────────────────
// UTILS (OPTIMIZED)
// ─────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function scoreColor(v) {
  return v >= 80 ? 'var(--green)' : v >= 60 ? 'var(--yellow)' : 'var(--orange)';
}

function scoreBadge(v) {
  return v >= 80 ? 'badge-green' : v >= 60 ? 'badge-yellow' : 'badge-orange';
}

function aiBar(h, a, g, w=120) {
  return `
  <div class="ai-bar" style="width:${w}px">
    <div class="ai-bar-human" style="width:${h}%"></div>
    <div class="ai-bar-assisted" style="width:${a}%"></div>
    <div class="ai-bar-generated" style="width:${g}%"></div>
  </div>`;
}

function scoreBarHTML(val) {
  return `
  <div class="score-bar-wrap">
    <div class="score-bar">
      <div class="score-bar-fill" style="width:${val}%;background:${scoreColor(val)}"></div>
    </div>
    <span class="score-val">${val}</span>
  </div>`;
}

// ─────────────────────────────────────────
// NAVIGATION (FIXED)
// ─────────────────────────────────────────
function navigate(page, id=null) {
  $$('.page').forEach(p => p.classList.remove('active'));
  $$('.nav-item').forEach(n => n.classList.remove('active'));

  const target = $('#page-' + page);
  if (target) target.classList.add('active');

  const nav = document.querySelector(`[data-page="${page}"]`);
  if (nav) nav.classList.add('active');

  currentPage = page;

  if (page === 'paper') renderPaper(id);
  if (page === 'author') renderAuthor(id);
  if (page === 'journal') renderJournal(id);
  if (page === 'search') renderSearch(searchQuery);

  window.scrollTo({top:0, behavior:'smooth'});
}

// ─────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────
function doSearch(q='') {
  searchQuery = q.trim();
  navigate('search');
}

function renderSearch(q='') {
  const results = q
    ? PAPERS.filter(p =>
        (p.title+p.authors+p.journal+p.field).toLowerCase().includes(q.toLowerCase())
      )
    : PAPERS;

  $('#search-query-label').textContent = q || 'All Papers';
  $('#search-count').textContent = results.length + ' results';

  const tbody = $('#search-results-body');
  if (!tbody) return;

  tbody.innerHTML = results.map(p => `
    <tr onclick="navigate('paper',${p.id})">
      <td>${p.title}</td>
      <td>${p.authors}</td>
      <td>${p.journal}</td>
      <td>${p.year}</td>
      <td>${aiBar(p.aiHuman,p.aiAssisted,p.aiGenerated)}</td>
      <td>${scoreBarHTML(p.repro)}</td>
      <td>${scoreBarHTML(p.integrity)}</td>
    </tr>
  `).join('');
}

// ─────────────────────────────────────────
// HOME
// ─────────────────────────────────────────
function renderHome() {
  $('#kpi-papers').textContent = '4.28M';
  $('#kpi-journals').textContent = '18,420';
  $('#kpi-ai-papers').textContent = '1.12M';
  $('#kpi-authors').textContent = '2.9M';

  const chart = $('#field-chart');
  if (!chart) return;

  const max = Math.max(...FIELDS.map(f=>f.avg));

  chart.innerHTML = FIELDS.map(f=>`
    <div class="chart-bar-group">
      <div class="chart-bar" style="height:${(f.avg/max)*100}%"></div>
      <div class="chart-bar-label">${f.name}</div>
    </div>
  `).join('');
}

// ─────────────────────────────────────────
// PAPER
// ─────────────────────────────────────────
function renderPaper(id) {
  const p = PAPERS.find(x=>x.id===id);
  if (!p) return;

  $('#paper-title').textContent = p.title;
  $('#paper-authors').textContent = p.authors;
  $('#paper-journal').textContent = p.journal;

  $('#paper-ai-bar').innerHTML = aiBar(p.aiHuman,p.aiAssisted,p.aiGenerated,200);
}

// ─────────────────────────────────────────
// AUTHOR
// ─────────────────────────────────────────
function renderAuthor(id) {
  const a = AUTHORS.find(x=>x.id===id);
  if (!a) return;

  $('#author-name').textContent = a.name;
  $('#author-affil').textContent = a.affil;
}

// ─────────────────────────────────────────
// JOURNAL
// ─────────────────────────────────────────
function renderJournal(id) {
  const j = JOURNALS.find(x=>x.id===id);
  if (!j) return;

  $('#journal-name').textContent = j.name;
  $('#journal-publisher').textContent = j.publisher;
}

// ─────────────────────────────────────────
// DARK MODE (NEW 🔥)
// ─────────────────────────────────────────
function toggleTheme() {
  document.documentElement.toggleAttribute('data-theme','dark');
}

// ─────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────
function showToast(msg) {
  let t = $('#toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';

  setTimeout(()=> t.style.opacity='0', 3000);
}

// ─────────────────────────────────────────
// INIT (CLEAN)
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // nav
  $$('.nav-item').forEach(el=>{
    el.onclick = (e)=>{
      e.preventDefault();
      navigate(el.dataset.page);
    };
  });

  // search
  $('.topbar-search input')?.addEventListener('keydown', e=>{
    if(e.key==='Enter') doSearch(e.target.value);
  });

  // init pages
  renderHome();
  renderSearch();
  navigate('home');

});
