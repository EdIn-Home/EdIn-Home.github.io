/* ═══════════════════════════════════════════════════════════
   EdIn — AI for Transparent Research
   app.js — Full Application Logic
═══════════════════════════════════════════════════════════ */

'use strict';

/* ── DATA ─────────────────────────────────────────────────── */

const PAPERS = [
  {
    id: 1,
    title: "Transformer-based LLM Attribution in Biomedical Texts: A Multi-Corpus Study",
    authors: ["Dr. K. Okonkwo", "Dr. A. Mensah", "Dr. S. Patel"],
    journal: "Nature Med. Informatics",
    journalId: 1,
    field: "Health Sciences",
    year: 2024,
    doi: "10.1038/s41591-024-00812-1",
    human: 38, assisted: 32, generated: 30,
    repro: 84, integrity: 87,
    oa: true,
    abstract: "We present a large-scale empirical study evaluating transformer-based methods for attributing AI-generated content in biomedical literature. Using a multi-corpus dataset spanning 12 journals and 4,800 papers from 2019–2024, we demonstrate that section-level analysis outperforms document-level detection by 18.4 percentage points in F1 score. Our findings reveal systematic differences in AI usage patterns across Introduction, Methods, Results, and Discussion sections, with Discussion exhibiting the highest AI-generation rates (avg 41%). We release our detection pipeline and annotated corpus under CC-BY-4.0.",
    sections: [
      { name: "Abstract", human: 55, assisted: 30, generated: 15 },
      { name: "Introduction", human: 42, assisted: 35, generated: 23 },
      { name: "Methods", human: 60, assisted: 28, generated: 12 },
      { name: "Results", human: 30, assisted: 38, generated: 32 },
      { name: "Discussion", human: 28, assisted: 31, generated: 41 },
      { name: "References", human: 85, assisted: 10, generated: 5 },
    ]
  },
  {
    id: 2,
    title: "Reproducibility Crisis in Deep Learning: A Systematic Review of 2,100 Papers",
    authors: ["Dr. F. Nakamura", "Dr. L. Schmidt"],
    journal: "PLOS Computational Biology",
    journalId: 2,
    field: "Computer Science",
    year: 2024,
    doi: "10.1371/journal.pcbi.1011234",
    human: 62, assisted: 28, generated: 10,
    repro: 91, integrity: 93,
    oa: true,
    abstract: "We systematically reviewed 2,100 deep learning papers published between 2018 and 2023 to quantify reproducibility failures. Only 23% of papers provided sufficient code and data for independent reproduction. We find that papers using LLM-assisted writing show no significant difference in reproducibility compared to human-only writing, but AI-generated methods sections correlate with a 31% reduction in methodological completeness. We propose the REPRO-DL checklist, a 14-item instrument now adopted by three major ML conferences.",
    sections: [
      { name: "Abstract", human: 70, assisted: 22, generated: 8 },
      { name: "Introduction", human: 65, assisted: 25, generated: 10 },
      { name: "Methods", human: 68, assisted: 24, generated: 8 },
      { name: "Results", human: 58, assisted: 32, generated: 10 },
      { name: "Discussion", human: 55, assisted: 33, generated: 12 },
      { name: "References", human: 90, assisted: 8, generated: 2 },
    ]
  },
  {
    id: 3,
    title: "Ethical Dimensions of AI Disclosure in Peer Review: A Global Survey",
    authors: ["Dr. A. Nwosu", "Dr. P. Rivera", "Dr. Y. Chen"],
    journal: "Research Ethics",
    journalId: 5,
    field: "Ethics",
    year: 2023,
    doi: "10.1177/17470161231182348",
    human: 71, assisted: 22, generated: 7,
    repro: 78, integrity: 89,
    oa: false,
    abstract: "Drawing on a 47-country survey of 3,840 researchers, editors, and reviewers, we examine attitudes toward mandatory AI contribution disclosure in academic publishing. We find strong consensus (82%) that disclosure is ethically required but significant disagreement on methodology: 54% favour section-level disclosure while 31% prefer document-level summary. Respondents from Africa and South Asia show higher acceptance of AI tools but lower confidence in detection accuracy. We argue for harmonised international standards and provide a draft framework aligned with COPE guidelines.",
    sections: [
      { name: "Abstract", human: 78, assisted: 18, generated: 4 },
      { name: "Introduction", human: 74, assisted: 20, generated: 6 },
      { name: "Methods", human: 80, assisted: 15, generated: 5 },
      { name: "Results", human: 65, assisted: 27, generated: 8 },
      { name: "Discussion", human: 62, assisted: 28, generated: 10 },
      { name: "References", human: 92, assisted: 6, generated: 2 },
    ]
  },
  {
    id: 4,
    title: "Climate Attribution Modelling Using GPT-4 Assisted Synthesis: Accuracy and Bias",
    authors: ["Dr. M. Osei", "Dr. R. Johansson"],
    journal: "Nature Climate Change",
    journalId: 6,
    field: "Earth Sciences",
    year: 2024,
    doi: "10.1038/s41558-024-02028-x",
    human: 48, assisted: 35, generated: 17,
    repro: 80, integrity: 82,
    oa: true,
    abstract: "This study employs GPT-4-assisted synthesis to accelerate climate attribution modelling across 180 extreme weather events from 2010–2023. We develop a hybrid pipeline combining LLM-assisted literature synthesis with traditional statistical attribution methods, reducing analysis time by 74% while maintaining 96% concordance with fully human-authored baselines. We identify systematic biases in AI-generated summaries of low-income country events and provide bias-correction weights. All data, code, and prompting strategies are openly available.",
    sections: [
      { name: "Abstract", human: 52, assisted: 33, generated: 15 },
      { name: "Introduction", human: 50, assisted: 36, generated: 14 },
      { name: "Methods", human: 58, assisted: 30, generated: 12 },
      { name: "Results", human: 42, assisted: 38, generated: 20 },
      { name: "Discussion", human: 38, assisted: 40, generated: 22 },
      { name: "References", human: 82, assisted: 12, generated: 6 },
    ]
  },
  {
    id: 5,
    title: "Large Language Models in Social Science Research: Opportunities and Methodological Risks",
    authors: ["Dr. I. Adeola", "Dr. H. Park"],
    journal: "Social Science Research",
    journalId: 7,
    field: "Social Sciences",
    year: 2023,
    doi: "10.1016/j.ssresearch.2023.102873",
    human: 55, assisted: 30, generated: 15,
    repro: 74, integrity: 80,
    oa: false,
    abstract: "We provide a systematic assessment of LLM applications in social science research, reviewing 620 papers published between 2022 and 2023. We identify four categories of use: literature synthesis, qualitative coding, survey generation, and statistical interpretation. Each carries distinct validity threats. LLM-assisted qualitative coding shows inter-rater reliability comparable to trained human coders (κ=0.81) but exhibits cultural bias correlated with training data composition. We propose a SOCIAL-AI reporting checklist for transparent disclosure of LLM use in social science.",
    sections: [
      { name: "Abstract", human: 62, assisted: 28, generated: 10 },
      { name: "Introduction", human: 58, assisted: 30, generated: 12 },
      { name: "Methods", human: 60, assisted: 28, generated: 12 },
      { name: "Results", human: 50, assisted: 33, generated: 17 },
      { name: "Discussion", human: 48, assisted: 32, generated: 20 },
      { name: "References", human: 88, assisted: 9, generated: 3 },
    ]
  },
  {
    id: 6,
    title: "Protein Folding Prediction Enhancement via LLM-Guided Feature Engineering",
    authors: ["Dr. B. Adeyemi", "Dr. C. Zhang", "Dr. E. Müller"],
    journal: "PLOS Computational Biology",
    journalId: 2,
    field: "Biology",
    year: 2024,
    doi: "10.1371/journal.pcbi.1011901",
    human: 44, assisted: 38, generated: 18,
    repro: 88, integrity: 85,
    oa: true,
    abstract: "We introduce FOLD-GPT, a pipeline that uses large language models to guide feature engineering for protein folding prediction. By prompting GPT-4 with structural biology domain knowledge, we generate novel feature hypotheses that improve AlphaFold2 predictions on orphan proteins by 12.4% on the CASP15 benchmark. Our ablation studies demonstrate that LLM-guided feature selection outperforms random search and Bayesian optimisation in low-data regimes. Code, model weights, and benchmark datasets are fully released.",
    sections: [
      { name: "Abstract", human: 50, assisted: 35, generated: 15 },
      { name: "Introduction", human: 46, assisted: 38, generated: 16 },
      { name: "Methods", human: 52, assisted: 34, generated: 14 },
      { name: "Results", human: 38, assisted: 42, generated: 20 },
      { name: "Discussion", human: 36, assisted: 40, generated: 24 },
      { name: "References", human: 80, assisted: 14, generated: 6 },
    ]
  },
  {
    id: 7,
    title: "AI-Generated vs. Human-Authored Systematic Reviews: Quality Comparison",
    authors: ["Dr. T. Mensah", "Dr. A. Williams"],
    journal: "Nature Med. Informatics",
    journalId: 1,
    field: "Health Sciences",
    year: 2023,
    doi: "10.1038/s41591-023-02310-4",
    human: 35, assisted: 28, generated: 37,
    repro: 76, integrity: 79,
    oa: true,
    abstract: "We conducted a blinded quality assessment comparing 40 AI-generated systematic reviews against 40 human-authored equivalents across oncology, cardiology, and infectious disease. Using the AMSTAR-2 instrument, AI-generated reviews scored comparably on comprehensiveness (mean 78% vs 81%) but significantly lower on risk-of-bias assessment (62% vs 88%, p<0.001). Transparency disclosure was absent in 72% of AI-generated reviews submitted before 2023 journal policy updates. Post-policy, disclosure rates increased to 91%.",
    sections: [
      { name: "Abstract", human: 40, assisted: 30, generated: 30 },
      { name: "Introduction", human: 38, assisted: 28, generated: 34 },
      { name: "Methods", human: 42, assisted: 26, generated: 32 },
      { name: "Results", human: 30, assisted: 28, generated: 42 },
      { name: "Discussion", human: 28, assisted: 30, generated: 42 },
      { name: "References", human: 72, assisted: 18, generated: 10 },
    ]
  },
  {
    id: 8,
    title: "Neuroscientific Correlates of Human-AI Collaborative Writing: An fMRI Study",
    authors: ["Dr. O. Diallo", "Dr. S. Kim", "Dr. J. Lindqvist"],
    journal: "NeuroImage",
    journalId: 4,
    field: "Neuroscience",
    year: 2024,
    doi: "10.1016/j.neuroimage.2024.120341",
    human: 66, assisted: 26, generated: 8,
    repro: 82, integrity: 90,
    oa: false,
    abstract: "Using functional MRI, we examined neural correlates of human-AI collaborative writing in 28 participants performing writing tasks with and without LLM assistance. AI-assisted writing showed reduced activation in the left inferior frontal gyrus (Broca's area) and increased activation in the right dorsolateral prefrontal cortex, suggesting a shift from language generation to evaluation and selection. Subjective cognitive load ratings were 34% lower in AI-assisted conditions, while writing quality scores (blind expert evaluation) showed no significant difference.",
    sections: [
      { name: "Abstract", human: 72, assisted: 22, generated: 6 },
      { name: "Introduction", human: 68, assisted: 25, generated: 7 },
      { name: "Methods", human: 75, assisted: 20, generated: 5 },
      { name: "Results", human: 62, assisted: 30, generated: 8 },
      { name: "Discussion", human: 58, assisted: 32, generated: 10 },
      { name: "References", human: 92, assisted: 6, generated: 2 },
    ]
  }
];

const JOURNALS = [
  { id: 1, name: "Nature Medicine Informatics", publisher: "Nature Portfolio", field: "Health Sciences", issn: "2731-0108", impact: 24.5, avgAI: 38, avgRepro: 82, avgInteg: 87, totalPapers: 4820 },
  { id: 2, name: "PLOS Computational Biology", publisher: "PLOS", field: "Biology", issn: "1553-7358", impact: 3.8, avgAI: 42, avgRepro: 89, avgInteg: 91, totalPapers: 12400 },
  { id: 3, name: "Scientometrics", publisher: "Springer", field: "Information Science", issn: "0138-9130", impact: 3.2, avgAI: 29, avgRepro: 75, avgInteg: 81, totalPapers: 7800 },
  { id: 4, name: "NeuroImage", publisher: "Elsevier", field: "Neuroscience", issn: "1053-8119", impact: 5.7, avgAI: 46, avgRepro: 80, avgInteg: 84, totalPapers: 18200 },
  { id: 5, name: "Research Ethics", publisher: "SAGE Publications", field: "Ethics", issn: "1747-0161", impact: 2.1, avgAI: 18, avgRepro: 71, avgInteg: 88, totalPapers: 2100 },
  { id: 6, name: "Nature Climate Change", publisher: "Nature Portfolio", field: "Earth Sciences", issn: "1758-678X", impact: 29.6, avgAI: 32, avgRepro: 83, avgInteg: 85, totalPapers: 5600 },
  { id: 7, name: "Social Science Research", publisher: "Elsevier", field: "Social Sciences", issn: "0049-089X", impact: 3.1, avgAI: 24, avgRepro: 68, avgInteg: 78, totalPapers: 9300 },
  { id: 8, name: "The Lancet Digital Health", publisher: "Elsevier", field: "Health Sciences", issn: "2589-7500", impact: 23.8, avgAI: 44, avgRepro: 79, avgInteg: 83, totalPapers: 3400 },
];

const AUTHORS = [
  { id: 1, name: "Dr. Kwame Okonkwo", affil: "University of Lagos", initials: "KO", orcid: "0000-0002-4812-3301", field: "Information Science", papers: 24, citations: 1840, hindex: 18, avgAI: 42, region: "Africa", years: [2018,2019,2020,2021,2022,2023,2024], aiByYear: [18,22,28,34,38,44,52] },
  { id: 2, name: "Dr. Amara Mensah", affil: "University of Ghana", initials: "AM", orcid: "0000-0001-7234-8801", field: "Biomedical Informatics", papers: 31, citations: 2910, hindex: 21, avgAI: 38, region: "Africa", years: [2018,2019,2020,2021,2022,2023,2024], aiByYear: [14,18,24,30,36,40,48] },
  { id: 3, name: "Dr. Sarah Park", affil: "Seoul National University", initials: "SP", orcid: "0000-0003-1122-6783", field: "Computer Science", papers: 18, citations: 980, hindex: 12, avgAI: 58, region: "Asia", years: [2018,2019,2020,2021,2022,2023,2024], aiByYear: [20,26,32,42,52,60,72] },
  { id: 4, name: "Dr. Bayo Adeyemi", affil: "Obafemi Awolowo Univ.", initials: "BA", orcid: "0000-0002-9981-4501", field: "Biology", papers: 18, citations: 762, hindex: 11, avgAI: 29, region: "Africa", years: [2018,2019,2020,2021,2022,2023,2024], aiByYear: [10,12,16,20,26,32,38] },
  { id: 5, name: "Dr. Fatima Nakamura", affil: "Kyoto University", initials: "FN", orcid: "0000-0001-4523-9921", field: "Deep Learning", papers: 29, citations: 4120, hindex: 26, avgAI: 51, region: "Asia", years: [2018,2019,2020,2021,2022,2023,2024], aiByYear: [22,28,34,44,52,60,68] },
  { id: 6, name: "Dr. Pedro Rivera", affil: "Universidad de Chile", initials: "PR", orcid: "0000-0003-8812-0011", field: "Research Ethics", papers: 14, citations: 540, hindex: 9, avgAI: 16, region: "Americas", years: [2018,2019,2020,2021,2022,2023,2024], aiByYear: [6,8,10,12,16,18,24] },
  { id: 7, name: "Dr. Elena Müller", affil: "Max Planck Institute", initials: "EM", orcid: "0000-0002-2341-8872", field: "Computational Biology", papers: 22, citations: 1670, hindex: 16, avgAI: 44, region: "Europe", years: [2018,2019,2020,2021,2022,2023,2024], aiByYear: [16,20,26,34,42,50,58] },
  { id: 8, name: "Dr. Ifeoma Adeola", affil: "University of Ibadan", initials: "IA", orcid: "0000-0001-6123-4490", field: "Social Sciences", papers: 11, citations: 380, hindex: 8, avgAI: 22, region: "Africa", years: [2018,2019,2020,2021,2022,2023,2024], aiByYear: [8,10,12,14,18,24,30] },
];

const FIELD_DATA = [
  { field: "Health Sciences", ai: 42, count: "1.2M", color: "var(--orange)" },
  { field: "Computer Science", ai: 68, count: "620K", color: "var(--red)" },
  { field: "Biology", ai: 38, count: "840K", color: "var(--green)" },
  { field: "Social Sciences", ai: 29, count: "480K", color: "var(--yellow)" },
  { field: "Earth Sciences", ai: 33, count: "210K", color: "var(--accent)" },
  { field: "Neuroscience", ai: 46, count: "190K", color: "var(--purple)" },
  { field: "Ethics", ai: 18, count: "94K", color: "var(--blue)" },
  { field: "Engineering", ai: 55, count: "380K", color: "var(--orange-light)" },
];

const DASH_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DASH_VALUES = [29, 31, 34, 36, 38, 41, 44, 46, 49, 52, 55, 58];

/* ── STATE ────────────────────────────────────────────────── */

let currentPage = 'home';
let currentPaper = null;
let currentJournal = null;
let currentAuthor = null;
let searchQuery = '';
let activeFilters = { field: '', year: '', repro: 0, integrity: 0, access: '' };
let savedPapers = new Set();

/* ── NAVIGATION ───────────────────────────────────────────── */

function navigate(page, id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Update nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navMatch = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navMatch) navMatch.classList.add('active');

  currentPage = page;

  if (page === 'paper' && id != null) {
    currentPaper = PAPERS.find(p => p.id === id) || PAPERS[0];
    renderPaper(currentPaper);
    showPage('page-paper');
  } else if (page === 'journal' && id != null) {
    currentJournal = JOURNALS.find(j => j.id === id) || JOURNALS[0];
    renderJournal(currentJournal);
    showPage('page-journal');
  } else if (page === 'author' && id != null) {
    currentAuthor = AUTHORS.find(a => a.id === id) || AUTHORS[0];
    renderAuthor(currentAuthor);
    showPage('page-author');
  } else if (page === 'search') {
    showPage('page-search');
    renderSearchResults(PAPERS);
  } else if (page === 'sources') {
    showPage('page-sources');
    renderSources();
  } else if (page === 'authors') {
    showPage('page-authors');
    renderAuthors();
  } else if (page === 'dashboard') {
    showPage('page-dashboard');
    renderDashboard();
  } else if (page === 'about') {
    showPage('page-about');
  } else {
    showPage('page-home');
    document.querySelector('.nav-item[data-page="home"]').classList.add('active');
  }

  // Scroll to top
  document.getElementById('main-wrap').scrollTop = 0;

  // Close sidebar on mobile
  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function showPage(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

/* ── SEARCH ───────────────────────────────────────────────── */

function doSearch(q) {
  searchQuery = q;
  navigate('search');
}

function filterPapers(papers) {
  return papers.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchQ = !q ||
      p.title.toLowerCase().includes(q) ||
      p.authors.some(a => a.toLowerCase().includes(q)) ||
      p.journal.toLowerCase().includes(q) ||
      p.field.toLowerCase().includes(q);
    const matchField = !activeFilters.field || p.field.includes(activeFilters.field);
    const matchYear = !activeFilters.year || p.year === parseInt(activeFilters.year);
    const matchRepro = p.repro >= activeFilters.repro;
    const matchInteg = p.integrity >= activeFilters.integrity;
    const matchAccess = !activeFilters.access || (activeFilters.access === 'oa' && p.oa);
    return matchQ && matchField && matchYear && matchRepro && matchInteg && matchAccess;
  });
}

function clearFilters() {
  activeFilters = { field: '', year: '', repro: 0, integrity: 0, access: '' };
  document.querySelectorAll('.filter-option').forEach(o => {
    o.classList.remove('active');
    if (o.dataset.filter === '') o.classList.add('active');
  });
  document.getElementById('repro-slider').value = 0;
  document.getElementById('integ-slider').value = 0;
  document.getElementById('repro-slider-val').textContent = '0';
  document.getElementById('integ-slider-val').textContent = '0';
  renderSearchResults(filterPapers(PAPERS));
}

/* ── RENDER: PAPER ────────────────────────────────────────── */

function renderPaper(p) {
  setText('paper-title', p.title);
  setText('paper-field', p.field);
  setText('paper-year', p.year);
  setText('paper-authors', p.authors.join(' · '));
  setText('paper-journal', p.journal);
  setText('paper-doi', p.doi);
  setText('paper-abstract', p.abstract);
  setText('paper-human-pct', p.human + '%');
  setText('paper-assisted-pct', p.assisted + '%');
  setText('paper-generated-pct', p.generated + '%');
  setText('paper-repro-score', p.repro);
  setText('paper-integ-score', p.integrity);
  setText('paper-disclosure', '94%');

  setWidth('paper-repro-fill', p.repro + '%');
  setWidth('paper-integ-fill', p.integrity + '%');

  // Overall AI bar
  const bar = document.getElementById('paper-ai-bar');
  if (bar) {
    bar.innerHTML = `
      <div class="stacked-bar" role="img" aria-label="AI contribution: ${p.human}% human, ${p.assisted}% assisted, ${p.generated}% generated">
        <div class="stacked-seg" style="width:${p.human}%;background:var(--green)" title="Human-written: ${p.human}%"></div>
        <div class="stacked-seg" style="width:${p.assisted}%;background:var(--yellow)" title="AI-Assisted: ${p.assisted}%"></div>
        <div class="stacked-seg" style="width:${p.generated}%;background:var(--orange)" title="AI-Generated: ${p.generated}%"></div>
      </div>`;
  }

  // Section bars
  const secEl = document.getElementById('section-bars');
  if (secEl) {
    secEl.innerHTML = p.sections.map(s => `
      <div class="section-metric-row" role="listitem">
        <span class="section-name">${s.name}</span>
        <div class="section-bar-full" aria-label="${s.name}: ${s.human}% human, ${s.assisted}% assisted, ${s.generated}% generated">
          <div class="section-bar-seg ai-bar-human" style="width:${s.human}%"></div>
          <div class="section-bar-seg ai-bar-assisted" style="width:${s.assisted}%"></div>
          <div class="section-bar-seg ai-bar-generated" style="width:${s.generated}%"></div>
        </div>
        <span class="score-val" style="min-width:32px;font-size:10px">${s.generated}% AI</span>
      </div>`).join('');
  }

  // Similar papers
  const sim = PAPERS.filter(x => x.id !== p.id && (x.field === p.field || x.journalId === p.journalId)).slice(0, 3);
  const simEl = document.getElementById('similar-papers');
  if (simEl) {
    simEl.innerHTML = sim.map(s => `
      <div class="similar-paper-card" onclick="navigate('paper',${s.id})" role="button" tabindex="0"
           onkeydown="if(event.key==='Enter')navigate('paper',${s.id})" aria-label="View paper: ${s.title}">
        <div class="similar-paper-title">${s.title}</div>
        <div class="similar-paper-meta">${s.authors[0]} · ${s.year}</div>
        <div style="display:flex;gap:6px;margin-top:6px">
          ${scoreChip(s.repro,'green','Repro')}${scoreChip(s.integrity,'blue','Integ')}
          <span class="badge badge-orange" style="font-size:10px">AI:${s.generated}%</span>
        </div>
      </div>`).join('');
  }

  // Save button state
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.textContent = savedPapers.has(p.id) ? '✓ Saved' : '⊹ Save to Library';
    saveBtn.onclick = () => toggleSave(p.id);
  }

  // Breadcrumb
  const bc = document.querySelector('#page-paper .breadcrumb');
  if (bc) {
    const last = bc.querySelector('li:last-child');
    if (last) last.textContent = p.title.length > 50 ? p.title.slice(0, 50) + '…' : p.title;
  }
}

function toggleSave(id) {
  if (savedPapers.has(id)) {
    savedPapers.delete(id);
    showToast('Paper removed from library');
  } else {
    savedPapers.add(id);
    showToast('Paper saved to library');
  }
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) saveBtn.textContent = savedPapers.has(id) ? '✓ Saved' : '⊹ Save to Library';
}

function downloadReport(p) {
  if (!p) return;
  showToast(`Generating AI Transparency PDF for: "${p.title.slice(0, 40)}…"`);
}

/* ── RENDER: SEARCH RESULTS ───────────────────────────────── */

function renderSearchResults(papers) {
  const label = document.getElementById('search-query-label');
  const count = document.getElementById('search-count');
  if (label) label.textContent = searchQuery || 'All Papers';
  if (count) count.textContent = `${papers.length.toLocaleString()} results found`;

  const tbody = document.getElementById('search-results-body');
  if (!tbody) return;

  tbody.innerHTML = papers.map(p => `
    <tr onclick="navigate('paper',${p.id})" style="cursor:pointer" aria-label="View paper: ${p.title}">
      <td onclick="event.stopPropagation()"><input type="checkbox" aria-label="Select paper"></td>
      <td>
        <div style="font-size:13px;font-weight:500;line-height:1.4;max-width:260px">${p.title}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${p.field} ${p.oa ? '· <span style="color:var(--green)">OA</span>' : ''}</div>
      </td>
      <td style="font-size:12px;color:var(--text-muted);max-width:120px">${p.authors.slice(0,2).join(', ')}${p.authors.length > 2 ? ' +' + (p.authors.length-2) : ''}</td>
      <td style="font-size:12px;max-width:140px">
        <div style="font-size:12px;line-height:1.4">${p.journal}</div>
      </td>
      <td><span class="year-tag">${p.year}</span></td>
      <td>
        <div class="stacked-bar mini" aria-label="AI contribution">
          <div class="stacked-seg" style="width:${p.human}%;background:var(--green)"></div>
          <div class="stacked-seg" style="width:${p.assisted}%;background:var(--yellow)"></div>
          <div class="stacked-seg" style="width:${p.generated}%;background:var(--orange)"></div>
        </div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:3px">${p.generated}% gen.</div>
      </td>
      <td>${scoreChip(p.repro,'green')}</td>
      <td>${scoreChip(p.integrity,'blue')}</td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();navigate('paper',${p.id})" aria-label="View paper">View</button>
      </td>
    </tr>`).join('');

  // Quick stats
  if (papers.length) {
    const avgAI = Math.round(papers.reduce((s,p) => s + p.generated, 0) / papers.length);
    const avgRepro = Math.round(papers.reduce((s,p) => s + p.repro, 0) / papers.length);
    const avgInteg = Math.round(papers.reduce((s,p) => s + p.integrity, 0) / papers.length);
    const oaPct = Math.round(papers.filter(p => p.oa).length / papers.length * 100);
    setText('srch-avg-ai', avgAI + '%');
    setText('srch-avg-repro', avgRepro);
    setText('srch-avg-integ', avgInteg);
    setText('srch-oa-pct', oaPct + '%');
  }
}

/* ── RENDER: SOURCES ──────────────────────────────────────── */

function renderSources() {
  const tbody = document.getElementById('sources-table-body');
  if (!tbody) return;

  tbody.innerHTML = JOURNALS.map(j => `
    <tr onclick="navigate('journal',${j.id})" style="cursor:pointer" aria-label="View journal: ${j.name}">
      <td>
        <div style="font-weight:500;font-size:13px">${j.name}</div>
        <div style="font-size:11px;color:var(--text-muted);font-family:'DM Mono',monospace">ISSN ${j.issn}</div>
      </td>
      <td style="font-size:12px;color:var(--text-muted)">${j.publisher}</td>
      <td><span class="tag-pill">${j.field}</span></td>
      <td style="font-family:'DM Mono',monospace;font-size:13px">${j.impact}</td>
      <td>${aiChip(j.avgAI)}</td>
      <td>${scoreChip(j.avgRepro,'green')}</td>
      <td>${scoreChip(j.avgInteg,'blue')}</td>
      <td><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();navigate('journal',${j.id})" aria-label="View journal">View →</button></td>
    </tr>`).join('');
}

/* ── RENDER: JOURNAL ──────────────────────────────────────── */

function renderJournal(j) {
  setText('journal-name', j.name);
  setText('journal-publisher', j.publisher);
  setText('journal-issn', j.issn);
  setText('journal-field', j.field);
  setText('journal-impact', j.impact);
  setText('journal-total-papers', j.totalPapers.toLocaleString());
  setText('journal-avg-ai', j.avgAI + '%');
  setText('journal-avg-repro', j.avgRepro);
  setText('journal-avg-integ', j.avgInteg);
  setText('journal-breadcrumb', j.name);

  const papers = PAPERS.filter(p => p.journalId === j.id);
  const tbody = document.getElementById('journal-papers-table');
  if (tbody) {
    tbody.innerHTML = papers.map(p => `
      <tr onclick="navigate('paper',${p.id})" style="cursor:pointer">
        <td style="font-size:12px;max-width:260px;line-height:1.4">${p.title}</td>
        <td style="font-size:11px;color:var(--text-muted)">${p.authors[0]}${p.authors.length > 1 ? ' et al.' : ''}</td>
        <td>${aiChip(p.generated)}</td>
        <td>${scoreChip(p.repro,'green')}</td>
        <td>${scoreChip(p.integrity,'blue')}</td>
        <td><span class="year-tag">${p.year}</span></td>
      </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">No papers indexed for this journal yet.</td></tr>';
  }
}

/* ── RENDER: AUTHORS ──────────────────────────────────────── */

function renderAuthors() {
  const grid = document.getElementById('authors-grid');
  if (!grid) return;

  grid.innerHTML = AUTHORS.map(a => `
    <div class="author-card" onclick="navigate('author',${a.id})" role="listitem button" tabindex="0"
         onkeydown="if(event.key==='Enter')navigate('author',${a.id})" aria-label="View ${a.name}'s profile">
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:14px">
        <div class="author-avatar" aria-hidden="true">${a.initials}</div>
        <div>
          <div style="font-weight:600;font-size:14px">${a.name}</div>
          <div style="font-size:11px;color:var(--text-muted)">${a.affil}</div>
          <div style="margin-top:4px"><span class="tag-pill">${a.field}</span></div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">
        <div style="text-align:center;padding:8px;background:var(--bg-3);border-radius:7px">
          <div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">${a.papers}</div>
          <div style="font-size:9px;color:var(--text-dim);text-transform:uppercase">Papers</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--bg-3);border-radius:7px">
          <div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">${a.citations > 999 ? (a.citations/1000).toFixed(1)+'K' : a.citations}</div>
          <div style="font-size:9px;color:var(--text-dim);text-transform:uppercase">Citations</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--bg-3);border-radius:7px">
          <div style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">${a.hindex}</div>
          <div style="font-size:9px;color:var(--text-dim);text-transform:uppercase">h-index</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:11px;color:var(--text-muted)">Avg AI Usage</span>
        ${aiChip(a.avgAI)}
      </div>
    </div>`).join('');
}

/* ── RENDER: AUTHOR ───────────────────────────────────────── */

function renderAuthor(a) {
  setText('author-name', a.name);
  setText('author-affil', a.affil);
  setText('author-initials', a.initials);
  setText('author-orcid', a.orcid);
  setText('author-breadcrumb', a.name);
  setText('author-papers-kpi', a.papers);
  setText('author-cites-kpi', a.citations > 999 ? (a.citations/1000).toFixed(1)+'K' : a.citations);
  setText('author-hindex-kpi', a.hindex);
  setText('author-avgai-kpi', a.avgAI + '%');

  // Sparkline
  const spark = document.getElementById('author-spark');
  if (spark) {
    const max = Math.max(...a.aiByYear);
    spark.innerHTML = a.aiByYear.map((v,i) => `
      <div class="spark-bar" style="height:${Math.round(v/max*100)}%" 
           title="${a.years[i]}: ${v}% AI usage" aria-label="${a.years[i]}: ${v}%"></div>`).join('');
  }
  const sparkLabels = document.getElementById('author-spark-labels');
  if (sparkLabels) {
    sparkLabels.innerHTML = `
      <span style="font-size:9px;color:var(--text-dim)">${a.years[0]}</span>
      <span style="flex:1"></span>
      <span style="font-size:9px;color:var(--text-dim)">${a.years[a.years.length-1]}</span>`;
  }

  // Papers table
  const papers = PAPERS.filter(p => p.authors.some(au => au.includes(a.name.split(' ').pop())));
  const allPapers = papers.length ? papers : PAPERS.slice(0, 3);
  const tbody = document.getElementById('author-papers-table');
  if (tbody) {
    tbody.innerHTML = allPapers.map(p => `
      <tr onclick="navigate('paper',${p.id})" style="cursor:pointer">
        <td style="font-size:12px;max-width:240px;line-height:1.4">${p.title}</td>
        <td>
          <div class="stacked-bar mini">
            <div class="stacked-seg" style="width:${p.human}%;background:var(--green)"></div>
            <div class="stacked-seg" style="width:${p.assisted}%;background:var(--yellow)"></div>
            <div class="stacked-seg" style="width:${p.generated}%;background:var(--orange)"></div>
          </div>
        </td>
        <td>${scoreChip(p.repro,'green')}</td>
        <td>${scoreChip(p.integrity,'blue')}</td>
        <td><span class="year-tag">${p.year}</span></td>
      </tr>`).join('');
  }
}

/* ── RENDER: DASHBOARD ────────────────────────────────────── */

function renderDashboard() {
  const chart = document.getElementById('dash-chart');
  if (chart) {
    const max = Math.max(...DASH_VALUES);
    chart.innerHTML = DASH_MONTHS.map((m, i) => `
      <div class="bar-wrap" title="${m}: ${DASH_VALUES[i]}% avg AI usage">
        <div class="bar" style="height:${Math.round(DASH_VALUES[i]/max*100)}%" aria-label="${m}: ${DASH_VALUES[i]}%"></div>
        <div class="bar-label">${m.slice(0,1)}</div>
      </div>`).join('');
  }
}

/* ── RENDER: HOME ─────────────────────────────────────────── */

function renderHome() {
  // KPIs with count-up animation
  animateCount('kpi-papers', 4280000, v => v >= 1000000 ? (v/1000000).toFixed(2)+'M' : v.toLocaleString());
  animateCount('kpi-journals', 18420, v => v.toLocaleString());
  animateCount('kpi-ai-papers', 1920000, v => v >= 1000000 ? (v/1000000).toFixed(2)+'M' : v.toLocaleString());
  animateCount('kpi-authors', 2900000, v => v >= 1000000 ? (v/1000000).toFixed(1)+'M' : v.toLocaleString());

  // Field chart
  const chart = document.getElementById('field-chart');
  if (chart) {
    const max = Math.max(...FIELD_DATA.map(f => f.ai));
    chart.innerHTML = FIELD_DATA.map(f => `
      <div class="bar-wrap" onclick="doSearch('${f.field}')" style="cursor:pointer" title="${f.field}: ${f.ai}% avg AI usage">
        <div class="bar" style="height:${Math.round(f.ai/max*100)}%;background:${f.color}" aria-label="${f.field}: ${f.ai}%"></div>
        <div class="bar-label" style="font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:44px" title="${f.field}">${f.field.split(' ')[0]}</div>
      </div>`).join('');
  }

  // Field heat grid
  const heat = document.getElementById('field-heat');
  if (heat) {
    heat.innerHTML = FIELD_DATA.map(f => `
      <div class="field-card" onclick="doSearch('${f.field}')" role="listitem button" tabindex="0"
           onkeydown="if(event.key==='Enter')doSearch('${f.field}')" aria-label="${f.field}: ${f.ai}% AI, ${f.count} papers">
        <div style="font-size:12px;font-weight:500;margin-bottom:4px">${f.field}</div>
        <div style="font-size:10px;color:var(--text-muted)">${f.count} papers</div>
        <div style="margin-top:8px">${aiChip(f.ai)}</div>
      </div>`).join('');
  }

  // Recent papers
  const tbody = document.getElementById('recent-papers');
  if (tbody) {
    tbody.innerHTML = PAPERS.slice(0, 6).map(p => `
      <tr onclick="navigate('paper',${p.id})" style="cursor:pointer" aria-label="View paper: ${p.title}">
        <td>
          <div style="font-size:13px;font-weight:500;max-width:320px;line-height:1.4">${p.title}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${p.journal} · ${p.year} ${p.oa ? '· <span style="color:var(--green)">OA</span>' : ''}</div>
        </td>
        <td style="font-size:12px;color:var(--text-muted)">${p.authors[0]}${p.authors.length > 1 ? ' et al.' : ''}</td>
        <td>
          <div class="stacked-bar" aria-label="${p.human}% human, ${p.assisted}% assisted, ${p.generated}% generated">
            <div class="stacked-seg" style="width:${p.human}%;background:var(--green)"></div>
            <div class="stacked-seg" style="width:${p.assisted}%;background:var(--yellow)"></div>
            <div class="stacked-seg" style="width:${p.generated}%;background:var(--orange)"></div>
          </div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:3px">${p.generated}% gen.</div>
        </td>
        <td>${scoreChip(p.repro,'green')}</td>
        <td>${scoreChip(p.integrity,'blue')}</td>
      </tr>`).join('');
  }
}

/* ── HELPERS ──────────────────────────────────────────────── */

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setWidth(id, val) {
  const el = document.getElementById(id);
  if (el) el.style.width = val;
}

function scoreChip(score, color, label) {
  const cls = color === 'green' ? 'badge-green' : color === 'blue' ? 'badge-blue' : 'badge-orange';
  return `<span class="badge ${cls}" style="font-size:11px">${label ? label+': ' : ''}${score}</span>`;
}

function aiChip(pct) {
  const cls = pct >= 60 ? 'badge-red' : pct >= 40 ? 'badge-orange' : pct >= 25 ? 'badge-yellow' : 'badge-blue';
  return `<span class="badge ${cls}" style="font-size:11px">${pct}%</span>`;
}

function animateCount(id, target, format) {
  const el = document.getElementById(id);
  if (!el) return;
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = format(Math.round(ease * target));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── TOAST ────────────────────────────────────────────────── */

function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast-show'));
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ── SIDEBAR TOGGLE ───────────────────────────────────────── */

function initSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', sidebar.classList.contains('open'));
  });

  // Close on overlay click (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 && sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

/* ── SEARCH INPUTS ────────────────────────────────────────── */

function initSearch() {
  const heroInput = document.getElementById('hero-search-input');
  const topInput = document.getElementById('topbar-search-input');

  function handleSearch(input) {
    searchQuery = input.value.trim();
    navigate('search');
    renderSearchResults(filterPapers(PAPERS));
  }

  if (heroInput) {
    heroInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSearch(heroInput); });
    document.querySelectorAll('.do-search').forEach(btn => {
      btn.addEventListener('click', () => handleSearch(heroInput));
    });
  }

  if (topInput) {
    topInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSearch(topInput); });
  }

  // Keyboard shortcut ⌘K / Ctrl+K
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (topInput) { topInput.focus(); topInput.select(); }
    }
  });
}

/* ── FILTER PANEL ─────────────────────────────────────────── */

function initFilters() {
  // Radio-style filter options
  document.querySelectorAll('.filter-option').forEach(opt => {
    function activate() {
      const group = opt.closest('[role="radiogroup"]');
      if (group) group.querySelectorAll('.filter-option').forEach(o => {
        o.classList.remove('active');
        o.setAttribute('aria-checked', 'false');
      });
      opt.classList.add('active');
      opt.setAttribute('aria-checked', 'true');

      const group2 = opt.closest('.filter-group');
      const label = group2 ? group2.querySelector('.filter-label') : null;
      const labelText = label ? label.textContent.trim() : '';

      if (labelText.includes('Discipline')) activeFilters.field = opt.dataset.filter || '';
      else if (labelText.includes('Year')) activeFilters.year = opt.dataset.filter || '';
      else if (labelText.includes('Access')) activeFilters.access = opt.dataset.filter || '';

      renderSearchResults(filterPapers(PAPERS));
    }
    opt.addEventListener('click', activate);
    opt.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
  });

  // Sliders
  const reproSlider = document.getElementById('repro-slider');
  const integSlider = document.getElementById('integ-slider');

  if (reproSlider) {
    reproSlider.addEventListener('input', () => {
      document.getElementById('repro-slider-val').textContent = reproSlider.value;
      reproSlider.setAttribute('aria-valuenow', reproSlider.value);
      activeFilters.repro = parseInt(reproSlider.value);
      renderSearchResults(filterPapers(PAPERS));
    });
  }

  if (integSlider) {
    integSlider.addEventListener('input', () => {
      document.getElementById('integ-slider-val').textContent = integSlider.value;
      integSlider.setAttribute('aria-valuenow', integSlider.value);
      activeFilters.integrity = parseInt(integSlider.value);
      renderSearchResults(filterPapers(PAPERS));
    });
  }
}

/* ── TABS (paper detail) ──────────────────────────────────── */

function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabList => {
    const tabs = tabList.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');

        // Hide all panels, show target
        const allPanels = ['tabpanel-figures','tabpanel-references','tabpanel-citations'];
        allPanels.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.hidden = true;
        });
        const panelId = tab.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) panel.hidden = false;
      });

      // Keyboard nav
      tab.addEventListener('keydown', e => {
        const tabArr = Array.from(tabs);
        let idx = tabArr.indexOf(tab);
        if (e.key === 'ArrowRight') { e.preventDefault(); tabArr[(idx+1)%tabArr.length].click(); tabArr[(idx+1)%tabArr.length].focus(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); tabArr[(idx-1+tabArr.length)%tabArr.length].click(); tabArr[(idx-1+tabArr.length)%tabArr.length].focus(); }
      });
    });
  });
}

/* ── NAV ITEMS ────────────────────────────────────────────── */

function initNav() {
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      navigate(item.dataset.page);
    });
  });
}

/* ── PILL TABS ────────────────────────────────────────────── */

function initPillTabs() {
  document.querySelectorAll('.pill-tabs').forEach(group => {
    group.querySelectorAll('.pill-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        group.querySelectorAll('.pill-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      });
    });
  });
}

/* ── SELECT ALL CHECKBOX ──────────────────────────────────── */

function initSelectAll() {
  const selectAll = document.getElementById('select-all');
  if (!selectAll) return;
  selectAll.addEventListener('change', () => {
    document.querySelectorAll('#search-results-body input[type="checkbox"]').forEach(cb => {
      cb.checked = selectAll.checked;
    });
  });
}

/* ── LIVE INDEX TICKER ────────────────────────────────────── */

function startLiveTicker() {
  setInterval(() => {
    const el = document.querySelector('.hero-eyebrow');
    if (!el) return;
    const base = 4280000;
    const extra = Math.floor(Math.random() * 5);
    const total = (base + extra).toLocaleString();
    el.innerHTML = `<span class="live-dot" aria-hidden="true"></span> Live Index &mdash; ${(base/1000000).toFixed(2)}M Papers Indexed`;
  }, 8000);
}

/* ── INIT ─────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSidebar();
  initSearch();
  initFilters();
  initTabs();
  initPillTabs();
  initSelectAll();
  renderHome();
  startLiveTicker();

  // Source journal search
  const sourceSearch = document.querySelector('#page-sources input[type="search"]');
  if (sourceSearch) {
    sourceSearch.addEventListener('input', () => {
      const q = sourceSearch.value.toLowerCase();
      const tbody = document.getElementById('sources-table-body');
      if (!tbody) return;
      const filtered = JOURNALS.filter(j =>
        j.name.toLowerCase().includes(q) ||
        j.issn.includes(q) ||
        j.publisher.toLowerCase().includes(q)
      );
      tbody.innerHTML = '';
      // Re-render with filtered list
      const tmpJournals = filtered;
      tbody.innerHTML = tmpJournals.map(j => `
        <tr onclick="navigate('journal',${j.id})" style="cursor:pointer">
          <td>
            <div style="font-weight:500;font-size:13px">${j.name}</div>
            <div style="font-size:11px;color:var(--text-muted);font-family:'DM Mono',monospace">ISSN ${j.issn}</div>
          </td>
          <td style="font-size:12px;color:var(--text-muted)">${j.publisher}</td>
          <td><span class="tag-pill">${j.field}</span></td>
          <td style="font-family:'DM Mono',monospace;font-size:13px">${j.impact}</td>
          <td>${aiChip(j.avgAI)}</td>
          <td>${scoreChip(j.avgRepro,'green')}</td>
          <td>${scoreChip(j.avgInteg,'blue')}</td>
          <td><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();navigate('journal',${j.id})">View →</button></td>
        </tr>`).join('');
    });
  }
});
