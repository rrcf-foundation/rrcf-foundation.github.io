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

  // Wire up a single toggle button that may have been injected after DOMContentLoaded
  function wireButton(button) {
    if (button._rrcfWired) return;
    button._rrcfWired = true;
    button.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark', true);
    });
    updateControls(document.documentElement.dataset.theme || 'light');
  }

  // Re-scan the document for any toggle buttons not yet wired — called by shell.js
  function reRegister() {
    document.querySelectorAll('[data-theme-toggle]').forEach(wireButton);
    updateControls(document.documentElement.dataset.theme || 'light');
  }

  // Apply saved theme immediately (before paint — no flash)
  applyTheme(readTheme());

  document.addEventListener('DOMContentLoaded', reRegister);

  window.addEventListener('storage', event => {
    if (event.key === storageKey) applyTheme(event.newValue === 'dark' ? 'dark' : 'light');
  });

  window.RRCFTheme = {
    apply: theme => applyTheme(theme, true),
    current: () => document.documentElement.dataset.theme || 'light',
    reRegister,
  };
})();
