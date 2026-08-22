document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('toc-search');
  const tocNav = document.getElementById('TOC');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarNav = document.getElementById('sidebar-nav') || document.querySelector('.sidebar-nav');
  const mainViewport = document.querySelector('.content-viewport');
  const mainContentBody = document.getElementById('main-content-body');

  // Sidebar Scroll Position Restoration & Live Tracking
  if (sidebarNav) {
    const savedSidebarScroll = localStorage.getItem('bgc-sidebar-scroll');
    if (savedSidebarScroll) {
      const y = parseInt(savedSidebarScroll, 10);
      if (!isNaN(y) && y > 0) {
        sidebarNav.scrollTop = y;
      }
    }

    sidebarNav.addEventListener('scroll', () => {
      const sy = sidebarNav.scrollTop || 0;
      localStorage.setItem('bgc-sidebar-scroll', Math.round(sy).toString());
    }, { passive: true });
  }

  // Homepage Navigation (Clicking top-left title)
  const brandTitle = document.getElementById('sidebar-brand-title');
  const mobileTitle = document.getElementById('mobile-title');
  const goToHomepage = (e) => {
    if (e) e.preventDefault();
    loadChapterContent('foreword.html#foreword', true);
    if (sidebarNav) sidebarNav.scrollTop = 0;
  };
  if (brandTitle) brandTitle.addEventListener('click', goToHomepage);
  if (mobileTitle) mobileTitle.addEventListener('click', goToHomepage);

  const pageCache = {};
  let currentLoadedPage = '';
  let isExplicitUserClick = false;

  // Mobile sidebar & overlay backdrop management
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  function openMobileSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar && sidebar.classList.contains('open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }

  // Close mobile sidebar on outside click
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMobileSidebar();
      }
    }
  });

  // Automatically close mobile sidebar when a TOC link is clicked
  if (tocNav) {
    tocNav.addEventListener('click', (e) => {
      if (e.target.closest('a') && window.innerWidth <= 768) {
        closeMobileSidebar();
      }
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

  // Page location persistence & active link highlighting
  function savePageLocation(targetLocation) {
    if (!targetLocation || targetLocation === 'index.html' || targetLocation === 'about:blank') return;
    try {
      localStorage.setItem('bgc-last-page', targetLocation);
      if (history.replaceState) {
        history.replaceState(null, '', '#' + targetLocation);
      } else {
        window.location.hash = targetLocation;
      }
      setActiveLink(targetLocation);
    } catch (e) {}
  }

  let isRestoringScroll = false;

  // Native SPA HTML Injection Engine
  async function loadChapterContent(targetUrl, isExplicitClick = false) {
    if (!mainContentBody || !targetUrl) return;

    const parts = targetUrl.split('#');
    const pageFile = parts[0];
    const targetHash = parts[1] ? '#' + parts[1] : '';

    if (!pageFile || pageFile === 'index.html') return;

    isRestoringScroll = true;

  function resolveFetchUrl(path) {
    if (!path) return path;
    if (path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://')) return path;
    const cleanPath = path.replace(/^html\//, '');
    if (window.location.protocol === 'file:' || window.location.pathname.includes('/html/')) {
      return cleanPath;
    }
    if (path.startsWith('html/')) return '/' + path;
    return '/html/' + cleanPath;
  }

  function showErrorState(pageFile) {
    if (!mainContentBody) return;
    const isFileProto = window.location.protocol === 'file:';
    mainContentBody.innerHTML = `
      <div style="max-width: 680px; margin: 40px auto; padding: 28px; border: 1px solid var(--border-color, #383a45); border-radius: 12px; background: var(--bg-card, #262830); color: var(--text-color, #e0e0e0); line-height: 1.6; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
        <h2 style="margin-top: 0; color: #ff6b6b; font-size: 1.3rem; display: flex; align-items: center; gap: 8px;">
          ⚠️ Sayfa İçeriği Yüklenemedi
        </h2>
        ${isFileProto ? `
          <p style="margin-top: 12px;">Dosyayı tarayıcıda doğrudan (<code>file://</code> adresi ile) açtınız. Modern web tarayıcıları (Chrome, Edge, Safari vb.), güvenlik (CORS) kuralları nedeniyle yerel dosyaların JavaScript ile dinamik çekilmesine izin vermez.</p>
        ` : `
          <p style="margin-top: 12px;"><code>${pageFile}</code> dosyası sunucudan çekilemedi veya bir ağ hatası oluştu.</p>
        `}
        <p style="font-size: 0.95rem; opacity: 0.85; background: rgba(255,255,255,0.05); padding: 10px 14px; border-left: 3px solid #ff6b6b; border-radius: 4px;">
          💡 <strong>Diğer bilgisayarınızda görünmesinin sebebi:</strong> O bilgisayarda önceden bir web sunucusu çalıştırılmış olması ya da tarayıcı önbelleğinde (<code>localStorage</code>) içeriklerin kayıtlı kalmış olmasıdır.
        </p>
        <h3 style="color: var(--link-color, #4dabf7); margin-top: 24px; font-size: 1.05rem;">Çözüm Seçenekleri (Nasıl Çalıştırılır?):</h3>
        <ol style="padding-left: 20px; margin-bottom: 0;">
          <li style="margin-bottom: 12px;"><strong>VS Code Live Server (En Kolayı):</strong> VS Code kullanıyorsanız, <code>html/index.html</code> dosyasına sağ tıklayıp <em>"Open with Live Server"</em> seçeneğini tıklayın.</li>
          <li style="margin-bottom: 12px;"><strong>Terminal ile Python Sunucusu Başlatma:</strong>
            <br>Terminal veya Komut Satırında bu proje klasöründeyken şu komutu çalıştırın:
            <pre style="background: rgba(0,0,0,0.4); padding: 8px 12px; border-radius: 6px; overflow-x: auto; margin: 6px 0; color: #4dabf7; font-family: monospace;">python3 -m http.server 8000</pre>
            Ardından tarayıcınızda <a href="http://localhost:8000/html/index.html" target="_blank" style="color: #4dabf7; text-decoration: underline;">http://localhost:8000/html/index.html</a> adresine gidin.
          </li>
          <li><strong>Docker ile Çalıştırma:</strong>
            <pre style="background: rgba(0,0,0,0.4); padding: 8px 12px; border-radius: 6px; overflow-x: auto; margin: 6px 0; color: #4dabf7; font-family: monospace;">docker-compose up</pre>
            Ardından <a href="http://localhost" target="_blank" style="color: #4dabf7; text-decoration: underline;">http://localhost</a> adresini açın.
          </li>
        </ol>
      </div>
    `;
    mainContentBody.classList.remove('loading-init');
  }

  const doInject = async () => {
    try {
      let htmlText = pageCache[pageFile];
      if (!htmlText) {
        let resp = null;
        const cleanFile = pageFile.replace(/^html\//, '');
        const candidateUrls = Array.from(new Set([
          resolveFetchUrl(pageFile),
          cleanFile,
          'html/' + cleanFile,
          '/' + cleanFile,
          '/html/' + cleanFile
        ]));

        for (const url of candidateUrls) {
          try {
            const r = await fetch(url);
            if (r && r.ok) {
              resp = r;
              break;
            }
          } catch (e) {}
        }

        if (!resp || !resp.ok) {
          showErrorState(cleanFile);
          isRestoringScroll = false;
          return;
        }
        htmlText = await resp.text();
        pageCache[pageFile] = htmlText;
      }

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const container = doc.querySelector('.container') || doc.body;

        if (container) {
          mainContentBody.innerHTML = container.innerHTML;
          try {
            localStorage.setItem('bgc-active-html', container.innerHTML);
          } catch (e) {}
          attachThemeBtnToTopNav();
          currentLoadedPage = pageFile;
          savePageLocation(targetUrl);
          handleInternalLinks(mainContentBody);
          applyGlossaryTooltips(mainContentBody);
          applyFootnoteTooltips(mainContentBody);

          const savedScrollY = localStorage.getItem('bgc-scroll-' + pageFile);

          const applyTargetPosition = () => {
            window.scrollTo(0, 0);
            if (isExplicitClick && targetHash) {
              const targetEl = mainContentBody.querySelector(targetHash);
              if (targetEl && mainViewport) {
                targetEl.scrollIntoView({ block: 'start', behavior: 'instant' });
                const newY = mainViewport.scrollTop || 0;
                localStorage.setItem('bgc-scroll-' + pageFile, Math.round(newY).toString());
              } else if (mainViewport) {
                mainViewport.scrollTop = 0;
                localStorage.setItem('bgc-scroll-' + pageFile, '0');
              }
            } else if (savedScrollY !== null) {
              const yPos = parseInt(savedScrollY, 10);
              if (!isNaN(yPos) && mainViewport) {
                mainViewport.scrollTop = yPos;
              }
            } else if (mainViewport) {
              mainViewport.scrollTop = 0;
            }
          };

          applyTargetPosition();

          requestAnimationFrame(() => {
            applyTargetPosition();
            setTimeout(() => {
              applyTargetPosition();
              mainContentBody.classList.remove('loading-init');
              setTimeout(() => {
                isRestoringScroll = false;
              }, 120);
            }, 25);
          });
        }
      } catch (err) {
        console.error('Error loading chapter content:', err);
        showErrorState(pageFile);
        isRestoringScroll = false;
      }
    };

    if (document.startViewTransition && currentLoadedPage && currentLoadedPage !== pageFile) {
      document.startViewTransition(doInject);
    } else {
      await doInject();
    }
  }

  // Active Link Highlighting in TOC
  function setActiveLink(matchingHref) {
    if (!tocNav || !matchingHref) return;

    // Clean up temporary Frame 1 initial style tag if present to prevent stuck link highlights
    const initStyle = document.getElementById('bgc-initial-active-style');
    if (initStyle) {
      initStyle.remove();
    }

    const links = tocNav.querySelectorAll('a');
    links.forEach(a => a.classList.remove('active'));

    let matched = null;

    // 1. Try exact match first
    for (let a of links) {
      const href = a.getAttribute('href');
      if (href === matchingHref) {
        matched = a;
        break;
      }
    }

    // 2. Fallback: match first link belonging to same page file
    if (!matched) {
      const targetPage = matchingHref.split('#')[0];
      for (let a of links) {
        const href = a.getAttribute('href');
        if (href && href.split('#')[0] === targetPage) {
          matched = a;
          break;
        }
      }
    }

    if (matched) {
      matched.classList.add('active');
    }
  }

  // Live Scroll Listener on Main Viewport Container
  if (mainViewport) {
    mainViewport.addEventListener('scroll', () => {
      if (!currentLoadedPage || isRestoringScroll) return;
      const sy = mainViewport.scrollTop || 0;
      localStorage.setItem('bgc-scroll-' + currentLoadedPage, Math.round(sy).toString());

      // Live Active Heading Detection for TOC highlighting
      try {
        const headings = mainContentBody.querySelectorAll('h1[id], h2[id], h3[id]');
        let activeId = '';
        for (let i = 0; i < headings.length; i++) {
          const rect = headings[i].getBoundingClientRect();
          if (rect.top <= 140) {
            activeId = headings[i].id;
          } else {
            break;
          }
        }
        const targetHref = activeId ? (currentLoadedPage + '#' + activeId) : currentLoadedPage;
        savePageLocation(targetHref);
      } catch (hErr) {}
    }, { passive: true });
  }

  if (tocNav) {
    const links = tocNav.querySelectorAll('a');
    links.forEach(a => {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          isExplicitUserClick = true;
          loadChapterContent(href, true);
        }
        if (sidebar && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
      });
    });
  }

  // Handle ALL Internal Links in Main Content Container (Prev/Next Chapter, Footnotes, Hash Links)
  function handleInternalLinks(container) {
    if (!container) return;
    try {
      const allLinks = container.querySelectorAll('a[href]');
      allLinks.forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
        } else {
          a.removeAttribute('target');
          a.onclick = function(e) {
            e.preventDefault();
            loadChapterContent(href, true);
          };
        }
      });
    } catch (e) {}
  }

  // C Terms Glossary Data (Extremely Rich C Dictionary)
  const C_GLOSSARY = {
    // Compilers & Build Tools
    'gcc': 'GNU Compiler Collection: C/C++ ve diğer diller için dünyaca ünlü özgür derleyici koleksiyonu.',
    'clang': 'Clang C Derleyicisi: LLVM altyapısını kullanan hızlı, modüler ve gelişmiş C/C++ derleyicisi.',
    'make': 'Derleme Yöneticisi: Çoklu kaynak dosyalı C projelerini otomatik derleyen yapılandırma aracı.',
    'gdb': 'GNU Debugger: C programlarını adım adım çalıştırma ve bellek hatalarını izleme aracı.',
    'valgrind': 'Bellek Hata İzleyici: C programlarındaki bellek sızıntılarını ve hatalı erişimleri tespit eden analiz aracı.',

    // Fundamental Data Types
    'int': 'Tamsayı Türü (Integer): İşaretli tamsayı değerlerini saklar (genellikle 32-bit / 4 bayt).',
    'char': 'Karakter Türü (Character): Tek bir ASCII/UTF-8 karakterini veya 1 baytlık küçük tamsayıyı saklar.',
    'float': 'Kayan Noktalı Sayı: Tek duyarlıklı (single precision) ondalıklı sayı türü (4 bayt).',
    'double': 'Çift Duyarlıklı Sayı: Yüksek hassasiyetli kayan noktalı ondalıklı sayı türü (8 bayt).',
    'long': 'Uzun Tamsayı: Normal int türünden daha geniş aralıkta tamsayı saklayan tür.',
    'short': 'Kısa Tamsayı: Genellikle 16-bit (2 bayt) yer kaplayan küçük tamsayı türü.',
    'unsigned': 'İşaretsiz Niteleyici: Değişkenin yalnızca pozitif değerler almasını sağlayarak üst sınırı iki katına çıkarır.',
    'signed': 'İşaretli Niteleyici: Değişkenin hem negatif hem de pozitif değerler alabildiğini belirtir.',
    'bool': 'Mantıksal Tür: true (1) veya false (0) değerlerini temsil eden mantıksal veri türü.',
    '_bool': 'Mantıksal Tür (C99): Yerleşik yerel boolean türü.',

    // Memory Allocation & Pointer Management
    'malloc': 'Bellek Tahsisi (Memory Allocation): Heap alanından dinamik olarak belirtilen bayt kadar yer ayırır.',
    'calloc': 'Temizlenmiş Bellek Tahsisi: Heap alanından yer ayırır ve ayrılan tüm baytları otomatik 0 yapar.',
    'realloc': 'Bellek Yeniden Boyutlandırma: Daha önce ayrılmış bir bellek bloğunun boyutunu büyütür veya küçültür.',
    'free': 'Bellek Serbest Bırakma: malloc/calloc ile ayrılan heap belleğini sisteme geri iade eder.',
    'sizeof': 'Tür Boyutu Operatörü: Bir değişkenin veya veri türünün bellekte kapladığı bayt sayısını verir.',
    'size_t': 'İşaretsiz Tamsayı Türü: stddef.h içinde tanımlı, bellek boyutlarını temsil eden işaretsiz tamsayı türü.',
    'pointer': 'İşaretçi (Pointer): Bir değişkenin değerini değil, bellekteki adresini saklayan değişken.',
    'null': 'Boş İşaretçi Sabiti: Hiçbir geçerli bellek adresini göstermeyen 0 değerli adres sabiti.',
    'memcpy': 'Bellek Kopyalama: Bir bellek bloğundaki baytları başka bir bellek alanına kopyalar.',
    'memset': 'Bellek Doldurma: Belirtilen bellek bloğunu sabit bir bayt değeri ile doldurur.',
    'memmove': 'Çakışmasız Bellek Kopyalama: Bellek alanları birbiriyle çakışsa bile güvenli kopyalama yapar.',

    // Structures & Keywords
    'struct': 'Yapı (Structure): Farklı türlerdeki değişkenleri tek bir çatı altında toplayan özel veri türü.',
    'typedef': 'Tür Takma Adı: Var olan bir veri türüne yeni ve okunabilir bir isim verir.',
    'union': 'Birlik (Union): Tüm üyeleri aynı bellek adresini paylaşan karmaşık veri türü.',
    'enum': 'Numaralandırma Türü: İsimlendirilmiş tamsayı sabitlerinden oluşan özel veri türü.',
    'const': 'Sabit Niteleyicisi: Değişkenin değerinin ilk atamadan sonra değiştirilmesini engeller.',
    'volatile': 'Değişken Niteleyicisi: Derleyiciye bu değişkenin donanım tarafından her an değiştirilebileceğini bildirir.',
    'void': 'Boş Tür: Fonksiyonun değer döndürmediğini veya parametre almadığını gösterir.',
    'static': 'Statik Niteleyici: Değişkenin veya fonksiyonun ömrünü program sonuna kadar uzatır / görünürlüğünü sınırlar.',
    'extern': 'Harici Niteleyici: Başka bir dosyada tanımlanmış değişkene erişim sağlar.',
    'register': 'Yazmaç İpucu: Derleyiciye değişkenin hızlı erişim için CPU register\'ında tutulmasını önerir.',
    'inline': 'Satır İçi Fonksiyon İpucu: Derleyiciye fonksiyon çağrısını doğrudan kodun içine gömmesini önerir.',
    'restrict': 'Kısıtlı Gösterici İpucu: Göstericinin o bellek alanına tek erişim noktası olduğunu derleyiciye bildirir.',
    'alignas': 'Hizalama Belirteci: Değişkenin bellekte kaç baytlık sınıra hizalanacağını belirler.',
    'alignof': 'Hizalama Operatörü: Bir türün bellekteki hizalama sınırını verir.',

    // Control Flow Keywords
    'if': 'Koşul Bloğu: Belirtilen şart doğru (true) ise kod bloğunu çalıştırır.',
    'else': 'Değilse Bloğu: if koşulu sağlanmadığında çalışacak alternatif blok.',
    'switch': 'Çoklu Seçim Bloğu: Bir değişkenin değerine göre ilgili case bloğuna dallanır.',
    'case': 'Durum Etiketi: switch bloğu içindeki sabit değer durumu.',
    'default': 'Varsayılan Durum: switch içinde hiçbir case uymadığında çalışan blok.',
    'while': 'Koşullu Döngü: Şart doğru olduğu sürece bloğu tekrarlar.',
    'do': 'En Az Bir Kere Çalışan Döngü: Şartı döngü sonunda kontrol eden yapı.',
    'for': 'Sayaçlı Döngü: Başlangıç, bitiş ve artış miktarı belirlenmiş standart döngü.',
    'break': 'Döngü/Switch Kırma: İçinde bulunulan döngüyü veya switch bloğunu anında sonlandırır.',
    'continue': 'Sonraki Yineleme: Döngünün mevcut adımını atlayarak sonraki adıma geçer.',
    'goto': 'Koşulsuz Atlama: Program akışını doğrudan belirtilen etikete (label) yönlendirir.',
    'return': 'Fonksiyon Dönüşü: Fonksiyondan çıkış yapar ve çağıran yere değer döndürür.',

    // Standard I/O & Header Files
    'printf': 'Biçimli Çıktı: Ekrana (stdout) biçimlendirilmiş metin ve değişken yazdırır.',
    'scanf': 'Biçimli Girdi: Kullanıcıdan (stdin) değişkenlere değer okur.',
    'fopen': 'Dosya Açma: Belirtilen modda (r, w, a, rb, wb) diskten dosya akışı açar.',
    'fclose': 'Dosya Kapatma: Açık dosya akışını kapatır ve arabellekteki verileri diske yazar.',
    'fread': 'Dosyadan Blok Okuma: İkili veya metin dosyasından belirtilen boyutta bayt okur.',
    'fwrite': 'Dosyaya Blok Yazma: İkili veya metin dosyasına ham bayt bloğu yazar.',
    'strlen': 'String Uzunluğu: Null karakterine (\\0) kadar olan karakter sayısını verir.',
    'strcpy': 'String Kopyalama: Bir katı metni hedef bellek alanına kopyalar.',
    'strcmp': 'String Karşılaştırma: İki metni sözlük sırasına göre alfabetik karşılaştırır.',
    'stdio.h': 'Standart Girdi/Çıktı Başlığı: printf, scanf, fopen gibi temel I/O fonksiyonlarını içerir.',
    'stdlib.h': 'Standart Kütüphane Başlığı: malloc, free, exit, rand gibi temel fonksiyonları içerir.',
    'string.h': 'String & Bellek Başlığı: strlen, strcpy, memcpy, memset gibi fonksiyonları içerir.',
    'stdbool.h': 'Mantıksal Tür Başlığı: bool, true, false tanımlarını içerir.',
    'stdint.h': 'Sabit Genişlikli Tamsayılar: int32_t, uint64_t gibi sabit boyutlu türleri içerir.',
    'stddef.h': 'Standart Tanımlar: size_t, NULL, offsetof gibi temel tür ve makroları içerir.',
    'math.h': 'Matematik Kütüphanesi: sin, cos, sqrt, pow gibi matematiksel fonksiyonları içerir.'
  };

  // 0ms Instant Custom Theme-Aware Tooltip Engine
  let tooltipEl = null;

  function initCustomTooltipEngine() {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'custom-tooltip';
    tooltipEl.className = 'custom-tooltip-popup';
    document.body.appendChild(tooltipEl);

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-tooltip-title]');
      if (!target) return;

      const title = target.getAttribute('data-tooltip-title');
      const body = target.getAttribute('data-tooltip-body') || '';

      tooltipEl.innerHTML = `<strong>${title}</strong>${body}`;
      tooltipEl.classList.add('show');
      positionTooltip(e, target);
    });

    document.addEventListener('mousemove', (e) => {
      if (!tooltipEl || !tooltipEl.classList.contains('show')) return;
      const target = e.target.closest('[data-tooltip-title]');
      if (target) {
        positionTooltip(e, target);
      } else {
        tooltipEl.classList.remove('show');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-tooltip-title]');
      if (target && (!e.relatedTarget || !e.relatedTarget.closest('[data-tooltip-title]'))) {
        if (tooltipEl) tooltipEl.classList.remove('show');
      }
    });
  }

  function positionTooltip(e, target) {
    if (!tooltipEl) return;
    const tooltipWidth = tooltipEl.offsetWidth || 280;
    const tooltipHeight = tooltipEl.offsetHeight || 60;

    let left = e.clientX + 10;
    let top = e.clientY - tooltipHeight - 10;

    if (top < 10) {
      top = e.clientY + 15;
    }
    if (left + tooltipWidth > window.innerWidth - 10) {
      left = window.innerWidth - tooltipWidth - 10;
    }

    tooltipEl.style.left = left + 'px';
    tooltipEl.style.top = top + 'px';
  }

  initCustomTooltipEngine();

  // C Glossary Tooltips
  function applyGlossaryTooltips(container) {
    if (!container) return;
    try {
      const codeNodes = container.querySelectorAll('code, code span.kw, code span.dt, code span.im, code span.bu, code span.pp');
      codeNodes.forEach(node => {
        const rawText = node.textContent.trim();
        const word = rawText.toLowerCase().replace(/^[#<>&;]+|[#<>&;]+$/g, '');
        if (C_GLOSSARY[word] && !node.classList.contains('has-tooltip')) {
          node.classList.add('has-tooltip');
          node.removeAttribute('title');
          node.setAttribute('data-tooltip-title', '💡 C Terimi: ' + rawText);
          node.setAttribute('data-tooltip-body', C_GLOSSARY[word]);
        }
      });
    } catch (e) {}
  }

  let globalFootnoteMap = {};

  // Pre-load all 235 footnotes globally so tooltips work across every chapter
  async function loadGlobalFootnotes() {
    try {
      let resp = await fetch(resolveFetchUrl('function-specifiers-alignment-specifiersoperators.html'));
      if (!resp.ok) resp = await fetch('function-specifiers-alignment-specifiersoperators.html');
      if (!resp.ok) return;
      const htmlText = await resp.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const items = doc.querySelectorAll('#footnotes li[id]');
      items.forEach(item => {
        const id = item.getAttribute('id');
        let text = item.textContent.replace(/↩︎/g, '').replace(/\s+/g, ' ').trim();
        if (id) {
          globalFootnoteMap[id] = text;
        }
      });

      if (mainContentBody) {
        applyFootnoteTooltips(mainContentBody);
      }
    } catch (e) {}
  }

  loadGlobalFootnotes();

  // Interactive Footnote Tooltips across Application
  function applyFootnoteTooltips(container) {
    if (!container) return;
    try {
      const fnRefs = container.querySelectorAll('.footnote-ref, sup a, a[href*="#fn"]');
      fnRefs.forEach(ref => {
        const href = ref.getAttribute('href') || '';
        const fnIdMatch = href.match(/#?(fn\d+)/);
        if (fnIdMatch) {
          const fnId = fnIdMatch[1];
          let text = globalFootnoteMap[fnId];
          if (!text) {
            const targetFn = container.querySelector('#' + fnId);
            if (targetFn) {
              text = targetFn.textContent.replace(/↩︎/g, '').replace(/\s+/g, ' ').trim();
            }
          }
          if (text) {
            const fnNum = fnId.replace('fn', '');
            ref.removeAttribute('title');
            ref.setAttribute('data-tooltip-title', '📝 Dipnot [' + fnNum + ']');
            ref.setAttribute('data-tooltip-body', text);
          }
        }
      });
    } catch (e) {}
  }



  function attachThemeBtnToTopNav() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn || !mainContentBody) return;

    const topNavHeader = mainContentBody.querySelector('.nav-header:first-of-type');
    if (topNavHeader && !topNavHeader.contains(themeBtn)) {
      topNavHeader.appendChild(themeBtn);
    }
  }

  // Initial Chapter Load
  const initialPage = window.__INITIAL_FULL_PAGE__ || window.__INITIAL_PAGE__ || 'foreword.html';
  loadChapterContent(initialPage, false);
  setTimeout(attachThemeBtnToTopNav, 60);

  // ==========================================================================
  // Multi-Theme Switching System
  // ==========================================================================

  const themes = [
    { id: 'dark-obsidian', name: 'Dark Obsidian' },
    { id: 'tokyo-night', name: 'Tokyo Night' },
    { id: 'catppuccin-mocha', name: 'Catppuccin' },
    { id: 'dracula-pro', name: 'Dracula Pro' },
    { id: 'neutral-900', name: 'Neutral 900' },
    { id: 'solarized-dark', name: 'Solarized' },
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

  }

  applyTheme(themes[currentThemeIndex].id);

  // Global Click Delegation for Theme Toggle and Command Palette Triggers
  document.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('#theme-toggle-btn, .theme-toggle-btn');
    if (themeBtn) {
      e.preventDefault();
      e.stopPropagation();
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      applyTheme(themes[currentThemeIndex].id);
      return;
    }

    const cmdBtn = e.target.closest('#cmd-palette-trigger, .cmd-trigger-btn');
    if (cmdBtn) {
      e.preventDefault();
      e.stopPropagation();
      openCmdPalette();
      return;
    }
  });

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

    const qClean = query.toLowerCase().trim();
    const results = [];

    window.SEARCH_INDEX.forEach(rawItem => {
      let score = calculateSemanticScore(query, rawItem);
      let fileWithHash = rawItem.file;
      let matchedSectionTitle = '';

      // Check if query matches specific heading ID or title inside this file
      if (rawItem.headings && rawItem.headings.length) {
        for (let h of rawItem.headings) {
          const hTitleClean = h.title.toLowerCase();
          if (hTitleClean.includes(qClean) || (h.id && qClean.includes(h.id))) {
            score = Math.max(score, 88);
            fileWithHash = rawItem.file + '#' + h.id;
            matchedSectionTitle = h.title;
            break;
          }
        }
      }

      if (score >= 12) {
        results.push({
          item: {
            ...rawItem,
            file: fileWithHash,
            matchedSectionTitle: matchedSectionTitle
          },
          score: score
        });
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
        <div class="cmd-palette-suggestions">
          <div class="cmd-suggestion-label">Hızlı Arama Önerileri</div>
          <div class="cmd-suggestion-tags">
            <button class="cmd-tag-btn" data-query="pointers">pointers</button>
            <button class="cmd-tag-btn" data-query="malloc">malloc / bellek</button>
            <button class="cmd-tag-btn" data-query="structs">structs</button>
            <button class="cmd-tag-btn" data-query="threads">threads / izlekler</button>
            <button class="cmd-tag-btn" data-query="preprocessor">ön işlemci</button>
            <button class="cmd-tag-btn" data-query="arrays">diziler</button>
          </div>
        </div>`;

      const tagBtns = cmdResults.querySelectorAll('.cmd-tag-btn');
      tagBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const q = btn.getAttribute('data-query');
          if (cmdInput) {
            cmdInput.value = q;
            cmdInput.focus();
            performSemanticSearch(q);
          }
        });
      });
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
      
      let sectionSnippet = res.item.matchedSectionTitle || '';
      if (!sectionSnippet && res.item.headings && res.item.headings.length) {
        sectionSnippet = res.item.headings.slice(0, 2).map(h => h.title).join('  ·  ');
      }

      html += `
        <div class="cmd-result-item ${isSelected}" data-index="${idx}">
          <div class="cmd-item-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          </div>
          <div class="cmd-item-main">
            <div class="cmd-item-title">${escapeHtml(res.item.title)}</div>
            ${sectionSnippet ? `<div class="cmd-item-sub">${escapeHtml(sectionSnippet)}</div>` : ''}
          </div>
          <div class="cmd-item-meta">
            <span class="cmd-score-badge" title="Anlamsal Eşleşme Skoru">%${res.score}</span>
            <span class="cmd-enter-icon">↵</span>
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
    isExplicitUserClick = true;
    const targetFile = item.file;
    loadChapterContent(targetFile, true);
    closeCmdPalette();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
});
