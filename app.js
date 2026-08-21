document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('content-frame');
  const searchInput = document.getElementById('toc-search');
  const tocNav = document.getElementById('TOC');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  // Mobile sidebar toggle
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Real-time search filter for TOC sidebar
  if (searchInput && tocNav) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const listItems = tocNav.querySelectorAll('li');

      if (!term) {
        listItems.forEach(li => li.style.display = '');
        return;
      }

      listItems.forEach(li => {
        const text = li.textContent.toLowerCase();
        if (text.includes(term)) {
          li.style.display = '';
          let p = li.parentElement;
          while (p && p !== tocNav) {
            if (p.tagName === 'LI' || p.tagName === 'UL') {
              p.style.display = '';
            }
            p = p.parentElement;
          }
        } else {
          li.style.display = 'none';
        }
      });
    });
  }

  // Active Link Highlighting in TOC
  function setActiveLink(matchingHref) {
    if (!tocNav) return;
    const links = tocNav.querySelectorAll('a');
    links.forEach(a => a.classList.remove('active'));
    if (!matchingHref) return;

    let matched = null;
    for (let a of links) {
      const href = a.getAttribute('href');
      if (href === matchingHref || (href && href.split('#')[0] === matchingHref.split('#')[0])) {
        matched = a;
        if (href === matchingHref) break;
      }
    }

    if (matched) {
      matched.classList.add('active');
      matched.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  if (tocNav) {
    const links = tocNav.querySelectorAll('a');
    links.forEach(a => {
      a.addEventListener('click', function() {
        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        if (sidebar && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
      });
    });
  }

  // Ensure external links open in new tab
  function handleExternalLinks(doc) {
    if (!doc) return;
    try {
      const extLinks = doc.querySelectorAll('a[href^="http://"], a[href^="https://"]');
      extLinks.forEach(a => {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      });
    } catch (e) {
      // Ignored
    }
  }

  handleExternalLinks(document);

  if (iframe) {
    iframe.addEventListener('load', () => {
      try {
        const path = iframe.contentWindow.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        const hash = iframe.contentWindow.location.hash;
        if (page) {
          setActiveLink(page + hash);
        }
        handleExternalLinks(iframe.contentWindow.document);
        applyTheme(themes[currentThemeIndex].id);
      } catch (e) {
        // Fallback
      }
    });
  }

  // ==========================================================================
  // Multi-Theme Switching System
  // ==========================================================================

  const themes = [
    { id: 'dark-obsidian', name: 'Dark Obsidian' },
    { id: 'cyber-neon', name: 'Cyber Neon' },
    { id: 'nordic-slate', name: 'Nordic Slate' },
    { id: 'light-tech', name: 'Light Tech' }
  ];

  let currentThemeIndex = 0;
  const savedTheme = localStorage.getItem('bgc-theme');
  if (savedTheme) {
    const foundIdx = themes.findIndex(t => t.id === savedTheme);
    if (foundIdx !== -1) currentThemeIndex = foundIdx;
  }

  function applyTheme(themeId) {
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('bgc-theme', themeId);
    
    const themeObj = themes.find(t => t.id === themeId) || themes[0];
    const nextThemeObj = themes[(currentThemeIndex + 1) % themes.length];
    
    const nameBadge = document.querySelector('.theme-name-badge');
    const btn = document.getElementById('theme-toggle-btn');
    if (nameBadge) nameBadge.textContent = themeObj.name;
    if (btn) btn.setAttribute('title', `Tema Değiştir (Sıradaki: ${nextThemeObj.name})`);

    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage({ type: 'SET_THEME', themeId: themeId }, '*');
      } catch (e) {}

      try {
        if (iframe.contentWindow.document && iframe.contentWindow.document.documentElement) {
          iframe.contentWindow.document.documentElement.setAttribute('data-theme', themeId);
        }
      } catch (e) {}
    }
  }

  applyTheme(themes[currentThemeIndex].id);

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      applyTheme(themes[currentThemeIndex].id);
    });
  }

  // ==========================================================================
  // Command Palette & Semantic Search Modal (Cmd/Ctrl + Shift + F)
  // ==========================================================================

  const cmdPalette = document.getElementById('cmd-palette');
  const cmdBackdrop = document.getElementById('cmd-palette-backdrop');
  const cmdInput = document.getElementById('cmd-palette-input');
  const cmdResults = document.getElementById('cmd-palette-results');
  const cmdTrigger = document.getElementById('cmd-palette-trigger');

  let selectedResultIndex = 0;
  let currentResults = [];

  function openCmdPalette() {
    if (!cmdPalette) return;
    cmdPalette.classList.add('active');
    cmdPalette.setAttribute('aria-hidden', 'false');
    if (cmdInput) {
      cmdInput.value = '';
      setTimeout(() => cmdInput.focus(), 50);
    }
    renderCmdResults([]);
  }

  function closeCmdPalette() {
    if (!cmdPalette) return;
    cmdPalette.classList.remove('active');
    cmdPalette.setAttribute('aria-hidden', 'true');
    selectedResultIndex = 0;
  }

  if (cmdTrigger) {
    cmdTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openCmdPalette();
    });
  }

  if (cmdBackdrop) {
    cmdBackdrop.addEventListener('click', closeCmdPalette);
  }

  // Global Keyboard Shortcuts (Cmd/Ctrl + Shift + F or Cmd/Ctrl + K)
  window.addEventListener('keydown', (e) => {
    const isCmdOrCtrl = e.metaKey || e.ctrlKey;
    const isKeyF = e.code === 'KeyF' || e.key === 'F' || e.key === 'f';
    const isKeyK = e.code === 'KeyK' || e.key === 'K' || e.key === 'k';

    if (isCmdOrCtrl && (e.shiftKey && isKeyF || isKeyK)) {
      e.preventDefault();
      e.stopPropagation();
      if (cmdPalette && cmdPalette.classList.contains('active')) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
      return;
    }

    if (e.key === 'Escape' && cmdPalette && cmdPalette.classList.contains('active')) {
      closeCmdPalette();
      return;
    }

    if (cmdPalette && cmdPalette.classList.contains('active')) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentResults.length > 0) {
          selectedResultIndex = (selectedResultIndex + 1) % currentResults.length;
          updateSelectedResultUI();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentResults.length > 0) {
          selectedResultIndex = (selectedResultIndex - 1 + currentResults.length) % currentResults.length;
          updateSelectedResultUI();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentResults.length > 0 && currentResults[selectedResultIndex]) {
          navigateToResult(currentResults[selectedResultIndex].item);
        }
      }
    }
  }, true);

  // Semantic Search Scoring Engine
  function calculateSemanticScore(query, item) {
    if (!query || !query.trim()) return 0;
    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/).filter(w => w.length > 0);
    
    const title = item.title.toLowerCase();
    const text = (item.text || '').toLowerCase();
    
    let score = 0;
    
    if (title === q) {
      return 100;
    }
    if (title.startsWith(q)) {
      score += 85;
    } else if (title.includes(q)) {
      score += 70;
    }
    
    let titleWordsMatch = 0;
    words.forEach(w => {
      if (title.includes(w)) {
        titleWordsMatch++;
        score += 30;
      }
    });
    
    let headingMatchTitle = '';
    if (item.headings && item.headings.length) {
      item.headings.forEach(h => {
        const hTitle = h.title.toLowerCase();
        if (hTitle.includes(q)) {
          score += 35;
          if (!headingMatchTitle) headingMatchTitle = h.title;
        } else {
          words.forEach(w => {
            if (hTitle.includes(w)) {
              score += 15;
              if (!headingMatchTitle) headingMatchTitle = h.title;
            }
          });
        }
      });
    }
    
    words.forEach(w => {
      if (text.includes(w)) {
        score += 15;
      }
    });
    
    words.forEach(w => {
      if (w.length >= 4) {
        const titleWords = title.split(/\s+/);
        titleWords.forEach(tw => {
          if (tw.length >= 4 && (tw.includes(w) || w.includes(tw))) {
            score += 12;
          }
        });
      }
    });
    
    const normalized = Math.min(Math.round(score), 99);
    return normalized;
  }

  function performSemanticSearch(query) {
    if (!window.SEARCH_INDEX || !query.trim()) {
      renderCmdResults([]);
      return;
    }

    const results = [];
    window.SEARCH_INDEX.forEach(item => {
      const score = calculateSemanticScore(query, item);
      if (score >= 12) {
        results.push({ item, score });
      }
    });

    results.sort((a, b) => b.score - a.score);
    currentResults = results;
    selectedResultIndex = 0;
    renderCmdResults(results, query);
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      performSemanticSearch(e.target.value);
    });
  }

  function renderCmdResults(results, query = '') {
    if (!cmdResults) return;

    if (!query.trim()) {
      cmdResults.innerHTML = `
        <div class="cmd-palette-empty">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <p>Konu veya kavram yazın... (Örn: <code>pointers</code>, <code>threads</code>, <code>malloc</code>, <code>structs</code>, <code>bitwise</code>)</p>
        </div>`;
      return;
    }

    if (results.length === 0) {
      cmdResults.innerHTML = `
        <div class="cmd-palette-empty">
          <p><strong>"${escapeHtml(query)}"</strong> için eşleşen bölüm bulunamadı.</p>
        </div>`;
      return;
    }

    let html = '<div class="cmd-results-list">';
    results.forEach((res, idx) => {
      const isSelected = idx === selectedResultIndex ? 'selected' : '';
      const scoreClass = res.score >= 80 ? 'score-high' : res.score >= 50 ? 'score-med' : 'score-low';
      
      let sectionSnippet = '';
      if (res.item.headings && res.item.headings.length) {
        const top3 = res.item.headings.slice(0, 3).map(h => h.title).join(' • ');
        sectionSnippet = `<div class="cmd-item-sections">${escapeHtml(top3)}</div>`;
      }

      html += `
        <div class="cmd-result-item ${isSelected}" data-index="${idx}">
          <div class="cmd-item-main">
            <div class="cmd-item-title">${escapeHtml(res.item.title)}</div>
            ${sectionSnippet}
          </div>
          <div class="cmd-item-score ${scoreClass}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            ${res.score}% Uyum
          </div>
        </div>`;
    });
    html += '</div>';

    cmdResults.innerHTML = html;

    const items = cmdResults.querySelectorAll('.cmd-result-item');
    items.forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        if (currentResults[idx]) {
          navigateToResult(currentResults[idx].item);
        }
      });
    });
  }

  function updateSelectedResultUI() {
    if (!cmdResults) return;
    const items = cmdResults.querySelectorAll('.cmd-result-item');
    items.forEach((el, idx) => {
      if (idx === selectedResultIndex) {
        el.classList.add('selected');
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        el.classList.remove('selected');
      }
    });
  }

  function navigateToResult(item) {
    if (!item) return;
    if (iframe) {
      iframe.src = item.file;
    } else {
      window.location.href = item.file;
    }
    setActiveLink(item.file);
    closeCmdPalette();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
});
