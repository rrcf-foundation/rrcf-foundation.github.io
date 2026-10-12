(() => {
  const storageKey = 'rrcf-theme';

  function readTheme() {
    try {
      return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light';
    } catch (_) {
      return 'light';
    }
  }

  function persistTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (_) {}
  }

  function updateControls(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const dark = theme === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      const icon = button.querySelector('[data-theme-icon]');
      const label = button.querySelector('[data-theme-label]');
      if (icon) icon.textContent = dark ? '☀' : '☾';
      if (label) label.textContent = dark ? 'Light' : 'Dark';
    });
  }

  function applyTheme(theme, persist) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    if (persist) persistTheme(nextTheme);
    updateControls(nextTheme);
    window.dispatchEvent(new CustomEvent('rrcf-themechange', { detail: { theme: nextTheme } }));
  }

  // Wire a single toggle button — idempotent via _rrcfWired guard
  function wireButton(button) {
    if (button._rrcfWired) return;
    button._rrcfWired = true;
    button.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark', true);
    });
    updateControls(document.documentElement.dataset.theme || 'light');
  }

  // Scan DOM for any unwired toggle buttons and wire them
  function reRegister() {
    document.querySelectorAll('[data-theme-toggle]').forEach(wireButton);
    updateControls(document.documentElement.dataset.theme || 'light');
  }

  // Apply saved theme immediately (before paint — no flash)
  applyTheme(readTheme());

  // Wire any buttons already in the DOM on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', reRegister);

  // MutationObserver: wire buttons injected AFTER DOMContentLoaded
  // (e.g. shell.js injects the header dynamically)
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(mutations => {
      let found = false;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.hasAttribute && node.hasAttribute('data-theme-toggle')) {
            wireButton(node); found = true;
          }
          // Also check descendants (e.g. the whole <header> is added at once)
          if (node.querySelectorAll) {
            node.querySelectorAll('[data-theme-toggle]').forEach(btn => {
              wireButton(btn); found = true;
            });
          }
        }
      }
      if (found) updateControls(document.documentElement.dataset.theme || 'light');
    });
    // Observe as soon as body exists; fall back to document if not yet
    const target = document.body || document.documentElement;
    observer.observe(target, { childList: true, subtree: true });
    // Disconnect after the page is interactive — no need to keep watching
    document.addEventListener('DOMContentLoaded', () => {
      // Give shell.js a tick to inject, then disconnect
      setTimeout(() => observer.disconnect(), 500);
    });
  }

  window.addEventListener('storage', event => {
    if (event.key === storageKey) applyTheme(event.newValue === 'dark' ? 'dark' : 'light');
  });

  window.RRCFTheme = {
    apply: theme => applyTheme(theme, true),
    current: () => document.documentElement.dataset.theme || 'light',
    reRegister,
  };
})();
