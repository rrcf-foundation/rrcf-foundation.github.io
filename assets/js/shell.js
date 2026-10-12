/**
 * shell.js — shared site header + footer for the RRCF site.
 *
 * Usage (from any depth):
 *   <script src="../assets/js/shell.js"></script>   (depth-1 page)
 *   <script src="assets/js/shell.js"></script>       (root page)
 *
 * The script automatically computes the root-relative prefix ("" or "../")
 * by inspecting its own <script src> attribute, then injects:
 *   1. <header class="site-nav"> into document.body (prepended)
 *   2. <footer> into document.body (appended)
 *   3. icons.js (from same assets/js/ directory)
 *   4. dropdown toggle logic
 *
 * Each page may optionally set window.RRCF_NAV_LINKS before loading this
 * script to customise the left-side nav links:
 *
 *   window.RRCF_NAV_LINKS = [
 *     { href: '#section', icon: 'bolt', label: 'Why RRCF' },
 *   ];
 *
 * If omitted, the default cross-site nav is rendered.
 */
(function () {
  'use strict';

  /* ── 1. Compute the root prefix from this script's own src ── */
  var scriptEl = document.currentScript ||
    (function () {
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    }());
  var scriptSrc = scriptEl ? (scriptEl.getAttribute('src') || '') : '';
  // e.g. "../assets/js/shell.js"  → prefix = "../"
  // e.g. "assets/js/shell.js"     → prefix = ""
  var prefix = scriptSrc.replace(/assets\/js\/shell\.js.*$/, '');

  /* ── 2. Helper: resolve a root-relative path ── */
  function r(path) { return prefix + path; }

  /* ── 3. Determine the current page key for active-state highlighting ── */
  var pathname = window.location.pathname;
  function isActive(key) {
    if (key === 'home')     return /\/(index\.html)?$/.test(pathname) && pathname.indexOf('/') === pathname.lastIndexOf('/');
    if (key === 'spec')     return pathname.indexOf('/spec') !== -1;
    if (key === 'registry') return pathname.indexOf('/registry') !== -1;
    if (key === 'demo')     return pathname.indexOf('/demo') !== -1;
    if (key === 'tools')    return pathname.indexOf('/tools') !== -1;
    return false;
  }
  function activeClass(key) { return isActive(key) ? ' aria-current="page"' : ''; }

  /* ── 4. Default page-specific nav links (can be overridden) ── */
  var customLinks = window.RRCF_NAV_LINKS || null;

  function defaultNavLinks() {
    return [
      { href: r('index.html') + '#what',          icon: 'bolt',     label: 'Why RRCF',    key: 'home' },
      { href: r('index.html') + '#rrca',           icon: 'cpu',      label: 'Architecture', key: 'home' },
      { href: r('registry/index.html'),            icon: 'database', label: 'Registry',     key: 'registry' },
      { href: r('index.html') + '#tools',          icon: 'wrench',   label: 'Resources',    key: 'home' },
    ];
  }

  function renderNavLinks(links) {
    return links.map(function (lk) {
      return '<a href="' + lk.href + '"' + (lk.key ? activeClass(lk.key) : '') + '>'
        + '<span class="icon" data-icon="' + lk.icon + '"></span>' + lk.label + '</a>';
    }).join('\n        ');
  }

  /* ── 5. Dropdown panel (identical on every page, paths via r()) ── */
  function dropdownPanel() {
    return [
      '<div class="nav-dropdown-panel" role="menu" aria-label="Site navigation">',
      '  <!-- col 1: Tools -->',
      '  <div class="dd-col">',
      '    <div class="dd-col-title">⚙ Tools</div>',
      '    <a class="dd-link" href="' + r('demo/index.html') + '" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="15.5" cy="10.5" r=".9" fill="currentColor" stroke="none"/><circle cx="17.5" cy="13" r=".9" fill="currentColor" stroke="none"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">Live Controller Demo</span><span class="dd-link-desc">Try RRCF robot control in your browser</span></span>',
      '    </a>',
      '    <a class="dd-link" href="' + r('tools/converter.html') + '" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v5h5"/><path d="M20 20v-5h-5"/><path d="M4.6 9a8 8 0 0 1 14-3.5L20 9"/><path d="M19.4 15a8 8 0 0 1-14 3.5L4 15"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">URDF / MJCF / SDF Converter</span><span class="dd-link-desc">Convert robot model formats to .rrcf</span></span>',
      '    </a>',
      '    <a class="dd-link" href="' + r('registry/index.html') + '" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">Adapter Registry</span><span class="dd-link-desc">Browse published adapters &amp; catalog</span></span>',
      '    </a>',
      '    <a class="dd-link" href="https://github.com/rrcf-foundation/RRCF/tree/main/conformance" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">Conformance CLI</span><span class="dd-link-desc">Lint &amp; validate .rrcf declarations</span></span>',
      '    </a>',
      '  </div>',
      '  <!-- col 2: Docs -->',
      '  <div class="dd-col">',
      '    <div class="dd-col-title">📄 Docs</div>',
      '    <a class="dd-link" href="' + r('spec/') + '" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2h7l4 4v14a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V3.5A1.5 1.5 0 0 1 7 2Z"/><path d="M14 2v4h4M9 12h6M9 15.5h6M9 8.5h3"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">Specification v0.6</span><span class="dd-link-desc">Full RFC-style RRCF standard document</span></span>',
      '    </a>',
      '    <a class="dd-link" href="https://github.com/rrcf-foundation/RRCF/blob/main/architecture/rrca.md" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">RRCA Architecture</span><span class="dd-link-desc">Runtime agent design &amp; internals</span></span>',
      '    </a>',
      '    <a class="dd-link" href="https://github.com/rrcf-foundation/RRCF/blob/main/architecture/adapter-package.md" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">Adapter Package Format</span><span class="dd-link-desc">.rrcf.adptr packaging &amp; manifest spec</span></span>',
      '    </a>',
      '    <a class="dd-link" href="https://github.com/rrcf-foundation/RRCF/blob/main/rrcf-adoption-guide.md" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"/><path d="M4 19a2.5 2.5 0 0 1 2.5-2.5H20"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">Adoption Guide</span><span class="dd-link-desc">Step-by-step implementation guide</span></span>',
      '    </a>',
      '  </div>',
      '  <!-- col 3: Resources -->',
      '  <div class="dd-col">',
      '    <div class="dd-col-title">🔗 Resources</div>',
      '    <a class="dd-link" href="https://github.com/rrcf-foundation/RRCF" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2-.2 4-1 4-4.5 0-1.1-.4-2-1-2.7.1-.3.4-1.4-.1-2.8 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6.3 0C5.1 3.5 4 3.8 4 3.8c-.5 1.4-.2 2.5-.1 2.8-.6.7-1 1.7-1 2.7 0 3.5 2 4.3 4 4.5-.5.4-.5 1-.5 1.9V19"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">GitHub Repository</span><span class="dd-link-desc">Full source, issues &amp; contributions</span></span>',
      '    </a>',
      '    <a class="dd-link" href="https://github.com/rrcf-foundation/RRCF/tree/main/reference-implementation/rrcf_ros2_bridge" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M6.8 7.5 10.5 16M17.2 7.5 13.5 16M7.2 6h9.6"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">ROS 2 Bridge</span><span class="dd-link-desc">Reference implementation for ROS2</span></span>',
      '    </a>',
      '    <a class="dd-link" href="https://github.com/rrcf-foundation/RRCF/blob/main/registry/schema/adapter-manifest.schema.json" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10.5" width="14" height="9" rx="1.8"/><path d="M8 10.5V7a4 4 0 1 1 8 0v3.5"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">Manifest Schema</span><span class="dd-link-desc">JSON schema for adapter manifests</span></span>',
      '    </a>',
      '    <a class="dd-link" href="https://github.com/rrcf-foundation/RRCF/issues/new" role="menuitem">',
      '      <span class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21V4M6 4h12l-3 4 3 4H6"/></svg></span>',
      '      <span class="dd-link-text"><span class="dd-link-name">Propose an Adapter</span><span class="dd-link-desc">Open a GitHub issue to submit</span></span>',
      '    </a>',
      '  </div>',
      '</div>',
    ].join('\n');
  }

  /* ── 6. Build header HTML ── */
  function buildHeader() {
    var navLinks = customLinks ? renderNavLinks(customLinks) : renderNavLinks(defaultNavLinks());
    var navLabel = customLinks ? 'Page navigation' : 'Primary navigation';
    return [
      '<header class="site-nav">',
      '  <div class="container">',
      '    <a class="brand" href="' + r('index.html') + '" aria-label="RRCF home">',
      '      <img src="' + r('assets/images/rrcf_logo.png') + '" alt="" style="height:26px;width:auto;display:block;">',
      '      <span>RRCF</span>',
      '    </a>',
      '    <div class="nav-actions">',
      '      <nav class="links" aria-label="' + navLabel + '">',
      '        ' + navLinks,
      '      </nav>',
      '      <!-- ── All Tools & Docs dropdown ── -->',
      '      <div class="nav-dropdown" id="siteDropdown">',
      '        <div class="dd-backdrop" id="ddBackdrop"></div>',
      '        <button class="nav-dropdown-btn" id="dropdownToggle" type="button" aria-haspopup="true" aria-expanded="false">',
      '          <span class="icon" data-icon="layers"></span>',
      '          All&nbsp;Tools &amp; Docs',
      '          <span class="chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span>',
      '        </button>',
      '        ' + dropdownPanel(),
      '      </div>',
      '      <button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false">',
      '        <span data-theme-icon aria-hidden="true">☾</span><span data-theme-label>Dark</span>',
      '      </button>',
      '    </div>',
      '  </div>',
      '</header>',
    ].join('\n');
  }

  /* ── 7. Build footer HTML ── */
  function buildFooter() {
    return [
      '<footer>',
      '  <div class="container">',
      '    <div class="footer-top">',
      '      <img src="https://raw.githubusercontent.com/rrcf-foundation/RRCF/main/images/rrcf_FULL_TRANSPARENT.png" alt="RRCF" class="footer-logo">',
      '    </div>',
      '    <div class="footer-grid">',
      '      <div class="footer-col">',
      '        <div class="footer-heading">Specification</div>',
      '        <a href="' + r('spec/') + '"><span class="icon" data-icon="doc"></span>Read the Spec (v0.6)</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/blob/main/spec/RRCF_v06_RFC_Specification.md"><span class="icon" data-icon="doc"></span>Spec v0.6 (Markdown)</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/blob/main/spec/RRCF_v04_RFC_Specification.md"><span class="icon" data-icon="doc"></span>Spec v0.4 (archive)</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/blob/main/architecture/rrca.md"><span class="icon" data-icon="cpu"></span>RRCA Architecture</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/blob/main/architecture/adapter-package.md"><span class="icon" data-icon="layers"></span>Adapter Package Format</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/blob/main/rrcf-adoption-guide.md"><span class="icon" data-icon="book"></span>Adoption Guide</a>',
      '      </div>',
      '      <div class="footer-col">',
      '        <div class="footer-heading">Tools</div>',
      '        <a href="' + r('tools/converter.html') + '"><span class="icon" data-icon="sync"></span>URDF/MJCF/SDF Converter</a>',
      '        <a href="' + r('demo/index.html') + '"><span class="icon" data-icon="play"></span>Live Controller Demo</a>',
      '        <a href="' + r('registry/index.html') + '"><span class="icon" data-icon="database"></span>Adapter Registry</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/tree/main/conformance"><span class="icon" data-icon="shield"></span>Conformance CLI</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/tree/main/reference-implementation"><span class="icon" data-icon="controller"></span>Reference Implementation</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/tree/main/reference-implementation/rrcf_ros2_bridge"><span class="icon" data-icon="network"></span>ROS 2 Bridge</a>',
      '      </div>',
      '      <div class="footer-col">',
      '        <div class="footer-heading">Community</div>',
      '        <a href="https://github.com/rrcf-foundation/RRCF"><span class="icon" data-icon="github"></span>GitHub Repository</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/issues/new"><span class="icon" data-icon="flag"></span>Open an Issue</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/blob/main/conformance/profiles/category-profiles.json"><span class="icon" data-icon="chart"></span>Category Profiles</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/blob/main/conformance/schema/rrcf-declaration.schema.json"><span class="icon" data-icon="lock"></span>Declaration Schema</a>',
      '        <a href="https://github.com/rrcf-foundation/RRCF/blob/main/registry/README.md"><span class="icon" data-icon="database"></span>Registry Guidance</a>',
      '      </div>',
      '    </div>',
      '    <div class="footer-bottom">© 2026 RRCF Foundation. Published under Apache License 2.0.</div>',
      '  </div>',
      '</footer>',
    ].join('\n');
  }

  /* ── 8. Inject header + footer, then wire up icons + dropdown ── */
  function inject() {
    // Header: prepend to body
    var headerEl = document.createElement('div');
    headerEl.innerHTML = buildHeader();
    var header = headerEl.firstChild;
    document.body.insertBefore(header, document.body.firstChild);

    // Footer: append to body (only if page doesn't already have a <footer> element)
    if (!document.querySelector('footer')) {
      var footerEl = document.createElement('div');
      footerEl.innerHTML = buildFooter();
      document.body.appendChild(footerEl.firstChild);
    }

    // Load icons.js dynamically (same assets/js/ folder)
    var iconsScript = document.createElement('script');
    iconsScript.src = prefix + 'assets/js/icons.js';
    document.body.appendChild(iconsScript);

    // Dropdown toggle
    var btn      = document.getElementById('dropdownToggle');
    var menu     = document.getElementById('siteDropdown');
    var backdrop = document.getElementById('ddBackdrop');
    if (btn && menu) {
      function openMenu()  { menu.classList.add('open');    btn.setAttribute('aria-expanded', 'true');  }
      function closeMenu() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.contains('open') ? closeMenu() : openMenu();
      });
      if (backdrop) backdrop.addEventListener('click', closeMenu);
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
      menu.querySelectorAll('.dd-link').forEach(function (a) { a.addEventListener('click', closeMenu); });
    }

    // Re-fire theme.js icon state update in case it ran before header was inserted
    if (window.__themeApply) window.__themeApply();
  }

  // Run after the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
}());
