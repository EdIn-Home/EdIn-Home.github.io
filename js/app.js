// ─── DATA ───────────────────────────────────────────────────────────────────
const PAPERS = [
  { id:1, title:"Large Language Models in Clinical Decision Support: A Systematic Review of AI Contribution and Reproducibility", authors:"Chen, L.; Okafor, U.; Müller, R.", journal:"Nature Medicine Informatics", year:2024, aiHuman:28, aiAssisted:45, aiGenerated:27, repro:78, integrity:84, oa:true, field:"Health Sciences" },
  { id:2, title:"Reproducibility Crisis in Deep Learning: Evaluating Model Stability Across Genomic Datasets", authors:"Adeyemi, K.; Park, S.; Williams, T.", journal:"PLOS Computational Biology", year:2024, aiHuman:55, aiAssisted:30, aiGenerated:15, repro:91, integrity:92, oa:true, field:"Biology" },
  { id:3, title:"AI-Assisted Meta-Analysis of Climate Change Mitigation Strategies: Transparency and Integrity Assessment", authors:"Vasquez, M.; Ibrahim, F.; Tanaka, H.", journal:"Environmental Research Letters", year:2023, aiHuman:40, aiAssisted:35, aiGenerated:25, repro:72, integrity:76, oa:false, field:"Environmental Science" },
  { id:4, title:"Automated Literature Synthesis Using GPT-4: Methodological Transparency in Social Science Research", authors:"Petrov, A.; Nwosu, C.; Bello, M.", journal:"Journal of Social Computing", year:2024, aiHuman:20, aiAssisted:38, aiGenerated:42, repro:58, integrity:61, oa:true, field:"Social Sciences" },
  { id:5, title:"Section-Level AI Attribution Framework for Academic Publishing: A Proposed Standard", authors:"Okonkwo, D.; Li, X.; Fernandez, J.", journal:"Scientometrics", year:2024, aiHuman:62, aiAssisted:28, aiGenerated:10, repro:88, integrity:94, oa:false, field:"Information Science" },
  { id:6, title:"Machine Learning Explainability in Neuroimaging: Human vs AI Contribution Mapping", authors:"Torres, R.; Adamu, B.; Kovacs, P.", journal:"NeuroImage", year:2023, aiHuman:48, aiAssisted:32, aiGenerated:20, repro:83, integrity:87, oa:true, field:"Neuroscience" },
  { id:7, title:"Ethical Dimensions of AI Co-Authorship in Scientific Publications: A Cross-Disciplinary Analysis", authors:"Osei, K.; Yamamoto, S.; Diallo, M.", journal:"Science and Engineering Ethics", year:2024, aiHuman:71, aiAssisted:22, aiGenerated:7, repro:76, integrity:89, oa:false, field:"Ethics" },
  { id:8, title:"Benchmarking AI-Generated Scientific Writing: Readability, Citation Accuracy and Integrity", authors:"Rashid, T.; Nkrumah, J.; Fischer, A.", journal:"Journal of Informetrics", year:2023, aiHuman:33, aiAssisted:40, aiGenerated:27, repro:64, integrity:68, oa:true, field:"Information Science" },
];

const AUTHORS = [
  { id:1, name:"Dr. Kwame Okonkwo", initials:"KO", affil:"University of Lagos, Nigeria", orcid:"0000-0001-2345-6789", papers:24, citations:1840, hindex:18, avgAI:42, avgRepro:81, avgIntegrity:86 },
  { id:2, name:"Prof. Sarah Chen", initials:"SC", affil:"MIT, Massachusetts, USA", orcid:"0000-0002-3456-7890", papers:67, citations:12400, hindex:42, avgAI:35, avgRepro:88, avgIntegrity:91 },
  { id:3, name:"Dr. Amara Diallo", initials:"AD", affil:"Université Paris-Saclay, France", orcid:"0000-0003-4567-8901", papers:31, citations:3200, hindex:24, avgAI:58, avgRepro:74, avgIntegrity:78 },
  { id:4, name:"Dr. Bayo Adeyemi", initials:"BA", affil:"Obafemi Awolowo University, Nigeria", orcid:"0000-0004-5678-9012", papers:18, citations:920, hindex:14, avgAI:29, avgRepro:85, avgIntegrity:88 },
];

const JOURNALS = [
  { id:1, name:"Nature Medicine Informatics", publisher:"Nature Portfolio", issn:"2731-0928", impact:24.5, avgAI:38, avgRepro:82, avgIntegrity:87, papers:2840, field:"Health Sciences" },
  { id:2, name:"PLOS Computational Biology", publisher:"PLOS", issn:"1553-7358", impact:3.8, avgAI:42, avgRepro:89, avgIntegrity:91, papers:12400, field:"Biology" },
  { id:3, name:"Scientometrics", publisher:"Springer", issn:"0138-9130", impact:4.1, avgAI:29, avgRepro:76, avgIntegrity:81, papers:7200, field:"Information Science" },
  { id:4, name:"NeuroImage", publisher:"Elsevier", issn:"1053-8119", impact:5.7, avgAI:46, avgRepro:80, avgIntegrity:84, papers:9100, field:"Neuroscience" },
];

const FIELDS = [
  { name:"Health Sciences", avg:41 }, { name:"Biology", avg:38 }, { name:"Computer Sci.", avg:64 },
  { name:"Social Sciences", avg:52 }, { name:"Physics", avg:22 }, { name:"Chemistry", avg:31 },
  { name:"Engineering", avg:48 }, { name:"Earth Sciences", avg:36 },
];

// ─── UTILS ──────────────────────────────────────────────────────────────────
function scoreColor(v) {
  if (v >= 80) return 'var(--green)';
  if (v >= 60) return 'var(--yellow)';
  return 'var(--orange)';
}
function scoreBadge(v) {
  if (v >= 80) return 'badge-green';
  if (v >= 60) return 'badge-yellow';
  return 'badge-orange';
}
function fieldHeat(val) {
  const alpha = val / 100;
  return `rgba(${Math.round(255*alpha)}, ${Math.round(212*(1-alpha))}, ${Math.round(255*(1-alpha))}, 0.18)`;
}
function fieldBorder(val) {
  const alpha = val / 100;
  return `rgba(${Math.round(255*alpha)}, ${Math.round(212*(1-alpha))}, ${Math.round(255*(1-alpha))}, 0.4)`;
}
function aiBar(human, assisted, generated, w=120) {
  return `<div class="ai-bar" style="width:${w}px">
    <div class="ai-bar-human" style="width:${human}%" title="Human ${human}%"></div>
    <div class="ai-bar-assisted" style="width:${assisted}%" title="AI-Assisted ${assisted}%"></div>
    <div class="ai-bar-generated" style="width:${generated}%" title="AI-Generated ${generated}%"></div>
  </div>`;
}
function scoreBarHTML(val) {
  return `<div class="score-bar-wrap">
    <div class="score-bar"><div class="score-bar-fill" style="width:${val}%;background:${scoreColor(val)}"></div></div>
    <span class="score-val">${val}</span>
  </div>`;
}
function sparkHTML(values) {
  const max = Math.max(...values);
  return values.map(v => `<div class="spark-bar" style="height:${Math.round(v/max*100)}%"></div>`).join('');
}

// ─── NAVIGATION ─────────────────────────────────────────────────────────────
let currentPage = 'home';
let currentPaper = null;
let currentAuthor = null;
let currentJournal = null;
let searchQuery = '';

function navigate(page, id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) { target.classList.add('active'); currentPage = page; }
  const nav = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (nav) nav.classList.add('active');

  if (page === 'paper' && id !== undefined) { currentPaper = id; renderPaper(id); }
  if (page === 'author' && id !== undefined) { currentAuthor = id; renderAuthor(id); }
  if (page === 'journal' && id !== undefined) { currentJournal = id; renderJournal(id); }
  if (page === 'search') renderSearch(searchQuery);
  window.scrollTo(0,0);
}

document.querySelectorAll('.nav-item').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    navigate(el.dataset.page);
  });
});

// ─── SEARCH ─────────────────────────────────────────────────────────────────
function doSearch(q) {
  searchQuery = q || '';
  navigate('search');
}

document.querySelectorAll('.do-search').forEach(btn => {
  btn.addEventListener('click', () => {
    const inp = document.querySelector('.hero-search');
    if (inp) doSearch(inp.value);
  });
});
document.querySelector('.hero-search')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch(e.target.value);
});
document.querySelector('.topbar-search input')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') { searchQuery = e.target.value; navigate('search'); }
});

// ─── HOME ────────────────────────────────────────────────────────────────────
function renderHome() {
  // KPI
  document.getElementById('kpi-papers').textContent = '4.28M';
  document.getElementById('kpi-journals').textContent = '18,420';
  document.getElementById('kpi-ai-papers').textContent = '1.12M';
  document.getElementById('kpi-authors').textContent = '2.9M';

  // Field chart
  const fc = document.getElementById('field-chart');
  if (fc) {
    const max = Math.max(...FIELDS.map(f => f.avg));
    fc.innerHTML = FIELDS.map(f => `
      <div class="chart-bar-group">
        <div class="chart-bar" style="height:${Math.round(f.avg/max*100)}%" title="${f.avg}% avg AI">
          <div class="tooltip-chip">${f.avg}%</div>
        </div>
        <div class="chart-bar-label">${f.name}</div>
      </div>`).join('');
  }

  // Field heat grid
  const fg = document.getElementById('field-heat');
  if (fg) {
    fg.innerHTML = FIELDS.map(f => `
      <div class="field-cell" style="background:${fieldHeat(f.avg)};border-color:${fieldBorder(f.avg)}"
           onclick="doSearch('${f.name}')">
        <div class="field-cell-name">${f.name}</div>
        <div class="field-cell-val" style="color:${scoreColor(f.avg > 60 ? 100 : f.avg > 40 ? 70 : 50)}">${f.avg}%</div>
      </div>`).join('');
  }

  // Recent papers
  const rp = document.getElementById('recent-papers');
  if (rp) {
    rp.innerHTML = PAPERS.slice(0,5).map(p => `
      <tr onclick="navigate('paper',${p.id})">
        <td><a class="paper-title-link" href="#">${p.title}</a></td>
        <td><span class="authors-list">${p.authors}</span></td>
        <td>${aiBar(p.aiHuman, p.aiAssisted, p.aiGenerated)}</td>
        <td>${scoreBarHTML(p.repro)}</td>
        <td>${scoreBarHTML(p.integrity)}</td>
      </tr>`).join('');
  }
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────
function renderSearch(q) {
  const results = q ? PAPERS.filter(p =>
    p.title.toLowerCase().includes(q.toLowerCase()) ||
    p.authors.toLowerCase().includes(q.toLowerCase()) ||
    p.journal.toLowerCase().includes(q.toLowerCase()) ||
    p.field.toLowerCase().includes(q.toLowerCase())
  ) : PAPERS;

  document.getElementById('search-query-label').textContent = q ? `"${q}"` : 'All Papers';
  document.getElementById('search-count').textContent = `${results.length} results`;

  const tbody = document.getElementById('search-results-body');
  if (tbody) {
    tbody.innerHTML = results.map(p => `
      <tr onclick="navigate('paper',${p.id})">
        <td><a class="paper-title-link" href="#">${p.title}</a></td>
        <td><span class="authors-list">${p.authors}</span></td>
        <td><span class="journal-tag">${p.journal}</span></td>
        <td><span class="year-tag">${p.year}</span></td>
        <td>${aiBar(p.aiHuman, p.aiAssisted, p.aiGenerated)}</td>
        <td>${scoreBarHTML(p.repro)}</td>
        <td>${scoreBarHTML(p.integrity)}</td>
        <td>
          <div style="display:flex;gap:6px">
            <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();navigate('paper',${p.id})">View</button>
            <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();downloadReport(${p.id})">↓ PDF</button>
          </div>
        </td>
      </tr>`).join('') || `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted)">No papers found for "${q}"</td></tr>`;
  }

  // Sidebar stats
  if (results.length > 0) {
    const avgAI = Math.round(results.reduce((a,p) => a + p.aiGenerated, 0) / results.length);
    const avgRepro = Math.round(results.reduce((a,p) => a + p.repro, 0) / results.length);
    const avgInteg = Math.round(results.reduce((a,p) => a + p.integrity, 0) / results.length);
    document.getElementById('srch-avg-ai').textContent = avgAI + '%';
    document.getElementById('srch-avg-repro').textContent = avgRepro;
    document.getElementById('srch-avg-integ').textContent = avgInteg;
  }
}

// ─── PAPER ───────────────────────────────────────────────────────────────────
const SECTION_DATA = {
  1: [{s:'Introduction',h:15,a:55,g:30},{s:'Methods',h:42,a:38,g:20},{s:'Results',h:10,a:40,g:50},{s:'Discussion',h:38,a:42,g:20},{s:'Conclusion',h:25,a:50,g:25}],
  2: [{s:'Introduction',h:60,a:30,g:10},{s:'Methods',h:72,a:20,g:8},{s:'Results',h:50,a:35,g:15},{s:'Discussion',h:55,a:30,g:15},{s:'Conclusion',h:48,a:35,g:17}],
  default: [{s:'Introduction',h:35,a:40,g:25},{s:'Methods',h:50,a:32,g:18},{s:'Results',h:22,a:45,g:33},{s:'Discussion',h:40,a:38,g:22},{s:'Conclusion',h:30,a:45,g:25}],
};

function renderPaper(id) {
  const p = PAPERS.find(x => x.id === id);
  if (!p) return;

  document.getElementById('paper-title').textContent = p.title;
  document.getElementById('paper-authors').textContent = p.authors;
  document.getElementById('paper-journal').textContent = p.journal;
  document.getElementById('paper-year').textContent = p.year;
  document.getElementById('paper-doi').textContent = `10.1038/edin.${2024000 + p.id}`;
  document.getElementById('paper-field').textContent = p.field;

  document.getElementById('paper-ai-bar').innerHTML = aiBar(p.aiHuman, p.aiAssisted, p.aiGenerated, 200);
  document.getElementById('paper-human-pct').textContent = p.aiHuman + '%';
  document.getElementById('paper-assisted-pct').textContent = p.aiAssisted + '%';
  document.getElementById('paper-generated-pct').textContent = p.aiGenerated + '%';

  document.getElementById('paper-repro-score').textContent = p.repro;
  document.getElementById('paper-integ-score').textContent = p.integrity;
  document.getElementById('paper-disclosure').textContent = Math.round((p.aiAssisted + p.aiGenerated) * 0.85) + '%';

  const repFill = document.getElementById('paper-repro-fill');
  const intFill = document.getElementById('paper-integ-fill');
  if (repFill) { repFill.style.width = p.repro + '%'; repFill.style.background = scoreColor(p.repro); }
  if (intFill) { intFill.style.width = p.integrity + '%'; intFill.style.background = scoreColor(p.integrity); }

  // Section bars
  const secs = SECTION_DATA[id] || SECTION_DATA.default;
  const sb = document.getElementById('section-bars');
  if (sb) {
    sb.innerHTML = secs.map(s => `
      <div class="section-metric-row">
        <span class="section-name">${s.s}</span>
        <div class="section-bar-full">
          <div class="section-bar-seg ai-bar-human" style="width:${s.h}%" data-pct="${s.h}%"></div>
          <div class="section-bar-seg ai-bar-assisted" style="width:${s.a}%" data-pct="${s.a}%"></div>
          <div class="section-bar-seg ai-bar-generated" style="width:${s.g}%" data-pct="${s.g}%"></div>
        </div>
      </div>`).join('');
  }

  // Similar papers
  const sim = document.getElementById('similar-papers');
  if (sim) {
    sim.innerHTML = PAPERS.filter(x => x.id !== id && x.field === p.field).slice(0,3).map(s => `
      <div class="similar-paper" onclick="navigate('paper',${s.id})">
        <div class="similar-paper-title">${s.title}</div>
        <div class="similar-paper-meta">
          <span class="badge ${scoreBadge(s.repro)}">R: ${s.repro}</span>
          <span class="badge ${scoreBadge(s.integrity)}">I: ${s.integrity}</span>
          <span class="year-tag">${s.year}</span>
        </div>
      </div>`).join('') || '<p style="color:var(--text-muted);font-size:13px">No similar papers found</p>';
  }

  // Saved state reset
  document.getElementById('save-btn')?.classList.remove('saved');
}

// ─── AUTHOR ──────────────────────────────────────────────────────────────────
function renderAuthor(id) {
  const a = AUTHORS.find(x => x.id === id);
  if (!a) return;

  document.getElementById('author-initials').textContent = a.initials;
  document.getElementById('author-name').textContent = a.name;
  document.getElementById('author-affil').textContent = a.affil;
  document.getElementById('author-orcid').textContent = a.orcid;
  document.getElementById('author-papers-kpi').textContent = a.papers;
  document.getElementById('author-cites-kpi').textContent = a.citations.toLocaleString();
  document.getElementById('author-hindex-kpi').textContent = a.hindex;
  document.getElementById('author-avgai-kpi').textContent = a.avgAI + '%';

  // Timeline sparkline
  const sp = document.getElementById('author-spark');
  if (sp) {
    const vals = [18,22,28,31,35,38,42,a.avgAI];
    sp.innerHTML = sparkHTML(vals);
    const labels = document.getElementById('author-spark-labels');
    if (labels) labels.innerHTML = ['2017','2018','2019','2020','2021','2022','2023','2024'].map(y =>
      `<span style="font-size:9px;color:var(--text-dim);flex:1;text-align:center">${y}</span>`).join('');
  }

  // Papers by author (filter from global)
  const ap = document.getElementById('author-papers-table');
  if (ap) {
    const authorPapers = PAPERS.filter(p => p.authors.includes(a.name.split(' ').pop()) || Math.random() > 0.5).slice(0,4);
    ap.innerHTML = authorPapers.map(p => `
      <tr onclick="navigate('paper',${p.id})">
        <td><a class="paper-title-link" href="#">${p.title}</a></td>
        <td>${aiBar(p.aiHuman, p.aiAssisted, p.aiGenerated)}</td>
        <td>${scoreBarHTML(p.repro)}</td>
        <td>${scoreBarHTML(p.integrity)}</td>
        <td><span class="year-tag">${p.year}</span></td>
      </tr>`).join('');
  }
}

// ─── JOURNAL ─────────────────────────────────────────────────────────────────
function renderJournal(id) {
  const j = JOURNALS.find(x => x.id === id);
  if (!j) return;

  document.getElementById('journal-name').textContent = j.name;
  document.getElementById('journal-publisher').textContent = j.publisher;
  document.getElementById('journal-issn').textContent = j.issn;
  document.getElementById('journal-impact').textContent = j.impact;
  document.getElementById('journal-field').textContent = j.field;
  document.getElementById('journal-total-papers').textContent = j.papers.toLocaleString();
  document.getElementById('journal-avg-ai').textContent = j.avgAI + '%';
  document.getElementById('journal-avg-repro').textContent = j.avgRepro;
  document.getElementById('journal-avg-integ').textContent = j.avgIntegrity;

  const jp = document.getElementById('journal-papers-table');
  if (jp) {
    const jPapers = PAPERS.filter(p => p.journal === j.name).concat(PAPERS).slice(0,5);
    jp.innerHTML = jPapers.map(p => `
      <tr onclick="navigate('paper',${p.id})">
        <td><a class="paper-title-link" href="#">${p.title}</a></td>
        <td><span class="authors-list">${p.authors}</span></td>
        <td>${aiBar(p.aiHuman, p.aiAssisted, p.aiGenerated)}</td>
        <td>${scoreBarHTML(p.repro)}</td>
        <td>${scoreBarHTML(p.integrity)}</td>
        <td><span class="year-tag">${p.year}</span></td>
      </tr>`).join('');
  }
}

// ─── SOURCES PAGE ────────────────────────────────────────────────────────────
function renderSources() {
  const tbl = document.getElementById('sources-table-body');
  if (tbl) {
    tbl.innerHTML = JOURNALS.map(j => `
      <tr onclick="navigate('journal',${j.id})">
        <td><span class="paper-title-link" style="max-width:none">${j.name}</span></td>
        <td><span style="font-size:12px;color:var(--text-muted)">${j.publisher}</span></td>
        <td><span class="tag-pill">${j.field}</span></td>
        <td><span style="font-family:'DM Mono',monospace;font-size:13px">${j.impact}</span></td>
        <td>${aiBar(j.avgAI, 25, 100-j.avgAI-25, 100)}</td>
        <td>${scoreBarHTML(j.avgRepro)}</td>
        <td>${scoreBarHTML(j.avgIntegrity)}</td>
        <td><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();navigate('journal',${j.id})">View</button></td>
      </tr>`).join('');
  }
}

// ─── AUTHORS PAGE ────────────────────────────────────────────────────────────
function renderAuthors() {
  const grid = document.getElementById('authors-grid');
  if (grid) {
    grid.innerHTML = AUTHORS.map(a => `
      <div class="card" style="cursor:pointer" onclick="navigate('author',${a.id})">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
          <div class="author-avatar" style="width:48px;height:48px;font-size:16px">${a.initials}</div>
          <div>
            <div style="font-family:'Syne',sans-serif;font-weight:600;font-size:14px">${a.name}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${a.affil}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div style="background:var(--bg-3);border-radius:8px;padding:10px;text-align:center">
            <div style="font-family:'DM Mono',monospace;font-size:18px;font-weight:400;color:var(--text)">${a.papers}</div>
            <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-top:2px">Papers</div>
          </div>
          <div style="background:var(--bg-3);border-radius:8px;padding:10px;text-align:center">
            <div style="font-family:'DM Mono',monospace;font-size:18px;font-weight:400;color:var(--text)">${a.hindex}</div>
            <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-top:2px">h-index</div>
          </div>
        </div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);display:flex;gap:8px;align-items:center;justify-content:space-between">
          <span class="badge badge-blue">AI avg: ${a.avgAI}%</span>
          <span class="badge ${scoreBadge(a.avgRepro)}">R: ${a.avgRepro}</span>
          <span class="badge ${scoreBadge(a.avgIntegrity)}">I: ${a.avgIntegrity}</span>
        </div>
      </div>`).join('');
  }
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function renderDashboard() {
  const cc = document.getElementById('dash-chart');
  if (cc) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const vals = [28,31,35,38,34,42,45,41,48,52,49,56];
    const max = Math.max(...vals);
    cc.innerHTML = months.map((m,i) => `
      <div class="chart-bar-group">
        <div class="chart-bar" style="height:${Math.round(vals[i]/max*100)}%">
          <div class="tooltip-chip">${vals[i]}%</div>
        </div>
        <div class="chart-bar-label">${m}</div>
      </div>`).join('');
  }
}

// ─── FILTER INTERACTIONS ─────────────────────────────────────────────────────
document.querySelectorAll('.filter-option').forEach(el => {
  el.addEventListener('click', function() {
    const group = this.closest('.filter-group');
    if (group) {
      group.querySelectorAll('.filter-option').forEach(o => o.classList.remove('active'));
    }
    this.classList.add('active');
    const term = this.dataset.filter || '';
    if (term) { searchQuery = term; renderSearch(term); }
  });
});

document.querySelectorAll('.pill-tab').forEach(el => {
  el.addEventListener('click', function() {
    const group = this.closest('.pill-tabs');
    if (group) group.querySelectorAll('.pill-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

document.querySelectorAll('.tab').forEach(el => {
  el.addEventListener('click', function() {
    const group = this.closest('.tabs');
    if (group) group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// ─── DOWNLOAD / SAVE ─────────────────────────────────────────────────────────
function downloadReport(id) {
  const p = PAPERS.find(x => x.id === id);
  showToast(`Downloading AI Transparency Report for: ${p ? p.title.slice(0,40) + '...' : 'Paper'}`);
}

document.getElementById('save-btn')?.addEventListener('click', function() {
  this.classList.toggle('saved');
  const saved = this.classList.contains('saved');
  this.innerHTML = saved ? '★ Saved' : '☆ Save';
  this.style.color = saved ? 'var(--yellow)' : '';
  showToast(saved ? 'Paper saved to your library' : 'Removed from library');
});

// ─── TOAST ───────────────────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `position:fixed;bottom:28px;right:28px;background:var(--bg-card);border:1px solid var(--border-light);color:var(--text);padding:12px 20px;border-radius:8px;font-size:13px;z-index:999;transform:translateY(20px);opacity:0;transition:all 0.2s ease;max-width:320px;line-height:1.4`;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.transform = 'translateY(0)';
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.transform = 'translateY(20px)';
    t.style.opacity = '0';
  }, 3000);
}

// ─── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  renderSearch('');
  renderSources();
  renderAuthors();
  renderDashboard();
  navigate('home');
});
