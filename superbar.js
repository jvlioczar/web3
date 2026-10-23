/*!
 * BiblioVerse Superbar v2
 * Barra única para todas as bibliotecas. A lista de bibliotecas fica SÓ neste arquivo:
 * para criar uma biblioteca nova, basta acrescentar uma linha em BV_LIBS (e um grupo, se precisar).
 * Hospedagem central: https://biblioverse.org/superbar.js
 * Uso em cada biblioteca:
 *   <nav class="bvbar" id="bvbar" data-current="web3" aria-label="BiblioVerse">...fallback...</nav>
 *   <script src="https://biblioverse.org/superbar.js" defer onerror="...carrega ./superbar.js..."></script>
 */
(function () {
  'use strict';
  if (window.__bvbarInit) return;
  window.__bvbarInit = true;

  // ── Grupos (ordem de exibição) ─────────────────────────────────────────────
  var BV_GROUPS = [
    { key: 'tech',      pt: 'Tecnologia',     en: 'Technology' },
    { key: 'creative',  pt: 'Criatividade',   en: 'Creativity' },
    { key: 'culture',   pt: 'Cultura e lazer', en: 'Culture & Leisure' },
    { key: 'knowledge', pt: 'Conhecimento',   en: 'Knowledge' },
    { key: 'life',      pt: 'Vida prática',   en: 'Everyday Life' }
  ];

  // ── Bibliotecas ───────────────────────────────────────────────────────────
  // key: identificador usado em data-current | soon: true mostra "em breve"
  var BV_LIBS = [
    { key: 'ai',          group: 'tech',      icon: '🤖', pt: 'IA',             en: 'AI',           url: 'https://ai.biblioverse.org',          tags: 'inteligencia artificial artificial intelligence chatgpt' },
    { key: 'coding',      group: 'tech',      icon: '💻', pt: 'Programação',    en: 'Coding',       url: 'https://code.biblioverse.org',        tags: 'programming code desenvolvimento software' },
    { key: 'data',        group: 'tech',      icon: '📊', pt: 'Dados',          en: 'Data',         url: 'https://data.biblioverse.org',        tags: 'estatistica statistics analytics' },
    { key: 'web3',        group: 'tech',      icon: '🔗', pt: 'Web3',           en: 'Web3',         url: 'https://web3.biblioverse.org',        tags: 'blockchain cripto crypto bitcoin defi nft' },
    { key: 'design',      group: 'creative',  icon: '🎨', pt: 'Design',         en: 'Design',       url: 'https://design.biblioverse.org',      tags: 'grafico graphic ux ui tipografia' },
    { key: 'photography', group: 'creative',  icon: '📷', pt: 'Fotografia',     en: 'Photography',  url: 'https://photography.biblioverse.org', tags: 'foto photo camera' },
    { key: 'print',       group: 'creative',  icon: '📰', pt: 'Mídia Impressa', en: 'Print Media',  url: 'https://print.biblioverse.org',       tags: 'jornal revista impressao print magazine' },
    { key: 'games',       group: 'culture',   icon: '🎮', pt: 'Games',          en: 'Games',        url: 'https://games.biblioverse.org',       tags: 'jogos videogame esports' },
    { key: 'list',        group: 'culture',   icon: '📋', pt: 'Listas',         en: 'Lists',        url: 'https://list.biblioverse.org',        tags: 'rankings top lists' },
    { key: 'music',       group: 'culture',   icon: '🎵', pt: 'Música',         en: 'Music',        url: 'https://music.biblioverse.org',       tags: 'musica songs bandas' },
    { key: 'philosophy',  group: 'knowledge', icon: '🦉', pt: 'Filosofia',      en: 'Philosophy',   url: 'https://philosophy.biblioverse.org',  tags: 'etica ethics filosofos' },
    { key: 'language',    group: 'knowledge', icon: '🗣️', pt: 'Idiomas',        en: 'Languages',    url: 'https://language.biblioverse.org',    tags: 'linguas ingles english estudo' },
    { key: 'thinking',    group: 'knowledge', icon: '🧠', pt: 'Racionalidade',  en: 'Rationality',  url: 'https://thinking.biblioverse.org',    tags: 'pensamento critico critical thinking evidencias' },
    { key: 'job',         group: 'life',      icon: '💼', pt: 'Emprego',        en: 'Jobs',         url: 'https://job.biblioverse.org',         tags: 'carreira career vagas trabalho work' },
    { key: 'management',  group: 'life',      icon: '🗂️', pt: 'Organização',    en: 'Organization', url: 'https://management.biblioverse.org',  tags: 'produtividade productivity gestao' },
    { key: 'social',      group: 'life',      icon: '🗺', pt: 'Redes Sociais',  en: 'Social',       url: 'https://social.biblioverse.org',      tags: 'social media' },
    { key: 'travel',      group: 'life',      icon: '✈️', pt: 'Viagem',         en: 'Travel',       url: 'https://travel.biblioverse.org',      tags: 'viajar turismo trip' }
  ];

  var T = {
    pt: { libs: 'Bibliotecas', search: 'Buscar biblioteca…', close: 'Fechar', home: 'BiblioVerse', homeTitle: 'Página inicial do BiblioVerse',
          here: 'você está aqui', none: 'Nenhuma biblioteca encontrada.', all: 'Conhecer o BiblioVerse', soon: 'em breve', hint: 'Atalho: B',
          open: 'Abrir lista de bibliotecas' },
    en: { libs: 'Libraries', search: 'Search libraries…', close: 'Close', home: 'BiblioVerse', homeTitle: 'BiblioVerse home page',
          here: 'you are here', none: 'No library found.', all: 'Visit BiblioVerse', soon: 'soon', hint: 'Shortcut: B',
          open: 'Open library list' }
  };
  var HOME = 'https://biblioverse.org';

  // ── Estilos ───────────────────────────────────────────────────────────────
  var CSS = [
    ':root{--superbar-h:40px;}',
    '.bvbar{position:fixed;top:0;left:0;right:0;height:var(--superbar-h);z-index:9000;display:flex;align-items:center;gap:10px;padding:0 14px;',
    ' background:linear-gradient(90deg,var(--accent1,#4f7cff),var(--accent2,#7a5cff));color:#fff;font-family:"TASA Explorer",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;box-sizing:border-box;}',
    '.bvbar *{box-sizing:border-box;}',
    '.bvbar a,.bvbar button{color:#fff;font:inherit;}',
    '.bvbar-home{display:inline-flex;align-items:center;gap:8px;text-decoration:none;font-weight:700;white-space:nowrap;}',
    '.bvbar-home img{width:20px;height:20px;display:block;}',
    '.bvbar-sep{opacity:.6;}',
    '.bvbar-current{display:inline-flex;align-items:center;gap:6px;border:0;background:rgba(255,255,255,.16);padding:4px 10px;border-radius:999px;cursor:pointer;font-weight:700;white-space:nowrap;}',
    '.bvbar-current:hover,.bvbar-btn:hover{background:rgba(255,255,255,.28);}',
    '.bvbar-caret{font-size:10px;opacity:.85;transition:transform .15s;}',
    '.bvbar.is-open .bvbar-caret{transform:rotate(180deg);}',
    '.bvbar-spacer{flex:1;}',
    '.bvbar-btn{display:inline-flex;align-items:center;gap:8px;border:0;background:rgba(255,255,255,.16);padding:4px 10px;border-radius:999px;cursor:pointer;white-space:nowrap;}',
    '.bvbar-count{background:rgba(255,255,255,.9);color:var(--accent2,#7a5cff);border-radius:999px;padding:0 7px;font-size:12px;font-weight:700;line-height:18px;}',
    '.bvbar-kbd{border:1px solid rgba(255,255,255,.55);border-radius:5px;padding:0 5px;font-size:11px;line-height:16px;opacity:.9;}',
    '.bvbar-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:8999;opacity:0;pointer-events:none;transition:opacity .15s;}',
    '.bvbar-backdrop.is-open{opacity:1;pointer-events:auto;}',
    '.bvbar-panel{position:fixed;top:calc(var(--superbar-h) + 8px);right:12px;width:min(760px,calc(100vw - 24px));max-height:calc(100vh - var(--superbar-h) - 24px);overflow:auto;z-index:9001;',
    ' background:var(--bg,#0e1117);color:var(--text,#e6edf3);border:1px solid var(--border,#1a2130);border-radius:16px;box-shadow:0 18px 50px rgba(0,0,0,.35);padding:14px;',
    ' font-family:"TASA Explorer",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:none;}',
    '.bvbar-panel.is-open{display:block;}',
    '.bvbar-panel *{box-sizing:border-box;}',
    '.bvbar-top{display:flex;gap:8px;align-items:center;margin-bottom:10px;}',
    '.bvbar-search{flex:1;height:40px;border-radius:12px;border:1px solid var(--chip-border,#20283a);background:var(--bg-soft,#12161f);color:var(--text,#e6edf3);padding:0 12px;font:inherit;font-size:14px;outline:none;}',
    '.bvbar-search:focus{border-color:var(--accent1,#4f7cff);box-shadow:0 0 0 3px color-mix(in oklab,var(--accent1,#4f7cff) 25%,transparent);}',
    '.bvbar-close{height:40px;width:40px;border-radius:12px;border:1px solid var(--chip-border,#20283a);background:var(--bg-soft,#12161f);color:var(--text,#e6edf3);cursor:pointer;font-size:16px;}',
    '.bvbar-group{margin:12px 0 4px;}',
    '.bvbar-gtitle{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted,#a9b3c1);margin:0 0 6px 2px;font-weight:700;}',
    '.bvbar-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:6px;}',
    '.bvbar-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:12px;text-decoration:none;color:var(--text,#e6edf3);border:1px solid transparent;background:var(--chip,#151a22);font-size:13.5px;line-height:1.2;}',
    '.bvbar-item:hover,.bvbar-item:focus{border-color:var(--accent1,#4f7cff);outline:none;}',
    '.bvbar-item .ico{font-size:17px;width:22px;text-align:center;flex:none;}',
    '.bvbar-item .nm{flex:1;min-width:0;}',
    '.bvbar-item .tag{font-size:10.5px;color:var(--muted,#a9b3c1);white-space:nowrap;}',
    '.bvbar-item.is-current{border-color:var(--accent2,#7a5cff);background:color-mix(in oklab,var(--accent2,#7a5cff) 16%,var(--chip,#151a22));}',
    '.bvbar-item.is-soon{opacity:.55;}',
    '.bvbar-none{padding:18px 4px;color:var(--muted,#a9b3c1);display:none;}',
    '.bvbar-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:14px;padding-top:10px;border-top:1px solid var(--border,#1a2130);font-size:12.5px;color:var(--muted,#a9b3c1);}',
    '.bvbar-foot a{color:var(--accent1,#4f7cff);text-decoration:none;font-weight:700;}',
    '@media (max-width:720px){',
    ' .bvbar{padding:0 10px;gap:8px;}',
    ' .bvbar-home .txt,.bvbar-kbd,.bvbar-btn .lbl,.bvbar-hint{display:none;}',
    ' .bvbar-panel{top:var(--superbar-h);left:0;right:0;width:100vw;max-height:none;bottom:0;border-radius:0;border-left:0;border-right:0;}',
    ' .bvbar-grid{grid-template-columns:repeat(2,minmax(0,1fr));}',
    ' .bvbar-item.is-current .tag{display:none;}',
    '}',
    '@media (prefers-reduced-motion:reduce){.bvbar-caret,.bvbar-backdrop{transition:none;}}'
  ].join('\n');

  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function lang() { return /^en/i.test(document.documentElement.getAttribute('lang') || '') ? 'en' : 'pt'; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function byName(l) { return function (a, b) { return a[l].localeCompare(b[l], l === 'en' ? 'en' : 'pt-BR', { sensitivity: 'base' }); }; }

  function init() {
    var nav = document.getElementById('bvbar');
    if (!nav) return;
    var libs = (window.BIBLIOVERSE_LIBS || BV_LIBS).slice();
    var groups = window.BIBLIOVERSE_GROUPS || BV_GROUPS;
    var currentKey = nav.getAttribute('data-current') || '';
    var logo = nav.getAttribute('data-logo') || 'images/icon.svg';
    var current = libs.filter(function (l) { return l.key === currentKey; })[0];

    var st = document.createElement('style'); st.id = 'bvbar-style'; st.textContent = CSS; document.head.appendChild(st);

    // Barra
    nav.innerHTML = '';
    nav.classList.add('bvbar');
    var home = el('a', 'bvbar-home'); home.href = HOME;
    var img = el('img'); img.src = logo; img.alt = ''; home.appendChild(img);
    var homeTxt = el('span', 'txt', 'BiblioVerse'); home.appendChild(homeTxt);
    nav.appendChild(home);
    var curBtn = null;
    if (current) {
      nav.appendChild(el('span', 'bvbar-sep', '/'));
      curBtn = el('button', 'bvbar-current'); curBtn.type = 'button';
      curBtn.setAttribute('aria-haspopup', 'dialog'); curBtn.setAttribute('aria-expanded', 'false');
      var curIco = el('span', null, current.icon), curName = el('span'), caret = el('span', 'bvbar-caret', '▼');
      curBtn.appendChild(curIco); curBtn.appendChild(curName); curBtn.appendChild(caret);
      nav.appendChild(curBtn);
    }
    nav.appendChild(el('span', 'bvbar-spacer'));
    var btn = el('button', 'bvbar-btn'); btn.type = 'button';
    btn.setAttribute('aria-haspopup', 'dialog'); btn.setAttribute('aria-expanded', 'false');
    btn.appendChild(el('span', 'ico', '⊞'));
    var btnLbl = el('span', 'lbl'); btn.appendChild(btnLbl);
    btn.appendChild(el('span', 'bvbar-count', String(libs.filter(function (l) { return !l.soon; }).length)));
    var kbd = el('span', 'bvbar-kbd', 'B'); btn.appendChild(kbd);
    nav.appendChild(btn);

    // Painel
    var backdrop = el('div', 'bvbar-backdrop');
    var panel = el('div', 'bvbar-panel'); panel.id = 'bvbar-panel';
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true');
    var top = el('div', 'bvbar-top');
    var search = el('input', 'bvbar-search'); search.type = 'search'; search.autocomplete = 'off';
    var close = el('button', 'bvbar-close', '✕'); close.type = 'button';
    top.appendChild(search); top.appendChild(close); panel.appendChild(top);
    var body = el('div', 'bvbar-body'); panel.appendChild(body);
    var none = el('div', 'bvbar-none'); panel.appendChild(none);
    var foot = el('div', 'bvbar-foot');
    var hint = el('span', 'bvbar-hint'); var allLink = el('a'); allLink.href = HOME;
    foot.appendChild(hint); foot.appendChild(allLink); panel.appendChild(foot);
    document.body.appendChild(backdrop); document.body.appendChild(panel);

    var items = [];
    function render() {
      var L = lang(), t = T[L];
      homeTxt.textContent = t.home; home.title = t.homeTitle;
      if (curBtn) { curName.textContent = current[L]; curBtn.title = t.open; curBtn.setAttribute('aria-label', current[L] + ' · ' + t.open); }
      btnLbl.textContent = t.libs; btn.title = t.open + ' (B)'; btn.setAttribute('aria-label', t.open);
      search.placeholder = t.search; search.setAttribute('aria-label', t.search);
      close.title = t.close; close.setAttribute('aria-label', t.close);
      none.textContent = t.none; hint.textContent = t.hint; allLink.textContent = t.all + ' →';
      panel.setAttribute('aria-label', t.libs);
      body.innerHTML = ''; items = [];
      groups.forEach(function (g) {
        var list = libs.filter(function (l) { return l.group === g.key; }).sort(byName(L));
        if (!list.length) return;
        var sec = el('section', 'bvbar-group'); sec.appendChild(el('h3', 'bvbar-gtitle', g[L]));
        var grid = el('div', 'bvbar-grid');
        list.forEach(function (l) {
          var a = el('a', 'bvbar-item'); a.href = l.url;
          a.appendChild(el('span', 'ico', l.icon)); a.appendChild(el('span', 'nm', l[L]));
          if (l.key === currentKey) { a.classList.add('is-current'); a.setAttribute('aria-current', 'page'); a.appendChild(el('span', 'tag', t.here)); }
          else if (l.soon) { a.classList.add('is-soon'); a.appendChild(el('span', 'tag', t.soon)); }
          a._bvText = norm([l.pt, l.en, l.key, l.tags || '', g.pt, g.en].join(' '));
          grid.appendChild(a); items.push(a);
        });
        sec.appendChild(grid); body.appendChild(sec);
      });
      filter();
    }
    function filter() {
      var q = norm(search.value.trim()), any = false;
      body.querySelectorAll('.bvbar-group').forEach(function (sec) {
        var vis = 0;
        sec.querySelectorAll('.bvbar-item').forEach(function (a) {
          var ok = !q || q.split(/\s+/).every(function (w) { return a._bvText.indexOf(w) > -1; });
          a.style.display = ok ? '' : 'none'; if (ok) vis++;
        });
        sec.style.display = vis ? '' : 'none'; if (vis) any = true;
      });
      none.style.display = any ? 'none' : 'block';
    }
    function visibleItems() { return items.filter(function (a) { return a.style.display !== 'none' && a.closest('.bvbar-group').style.display !== 'none'; }); }
    var lastFocus = null;
    function open() {
      if (panel.classList.contains('is-open')) return;
      lastFocus = document.activeElement;
      panel.classList.add('is-open'); backdrop.classList.add('is-open'); nav.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true'); if (curBtn) curBtn.setAttribute('aria-expanded', 'true');
      search.value = ''; filter();
      setTimeout(function () { search.focus(); }, 0);
    }
    function shut() {
      if (!panel.classList.contains('is-open')) return;
      panel.classList.remove('is-open'); backdrop.classList.remove('is-open'); nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false'); if (curBtn) curBtn.setAttribute('aria-expanded', 'false');
      if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
    }
    function toggle() { panel.classList.contains('is-open') ? shut() : open(); }

    btn.addEventListener('click', toggle);
    if (curBtn) curBtn.addEventListener('click', toggle);
    close.addEventListener('click', shut);
    backdrop.addEventListener('click', shut);
    search.addEventListener('input', filter);
    search.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var v = visibleItems(); if (v.length) { e.preventDefault(); location.href = v[0].href; } }
      if (e.key === 'ArrowDown') { var v2 = visibleItems(); if (v2.length) { e.preventDefault(); v2[0].focus(); } }
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); shut(); return; }
      var a = document.activeElement; if (!a || !a.classList || !a.classList.contains('bvbar-item')) return;
      var v = visibleItems(), i = v.indexOf(a);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); (v[i + 1] || v[0]).focus(); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); if (i <= 0) search.focus(); else v[i - 1].focus(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      var inField = e.target && e.target.matches && e.target.matches('input,textarea,select,[contenteditable="true"]');
      if (!inField && (e.key === 'b' || e.key === 'B')) { e.preventDefault(); toggle(); }
    });
    // Acompanha a troca de idioma feita pelo site (atributo lang do <html>)
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
