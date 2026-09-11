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
    } catch (_) {
      // Theme selection still works for this page when storage is unavailable.
    }
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

  function applyTheme(theme, persist = false) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    if (persist) persistTheme(nextTheme);
    updateControls(nextTheme);
    window.dispatchEvent(new CustomEvent('rrcf-themechange', { detail: { theme: nextTheme } }));
  }

  applyTheme(readTheme());

  document.addEventListener('DOMContentLoaded', () => {
    updateControls(document.documentElement.dataset.theme || 'light');
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        const current = document.documentElement.dataset.theme || 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark', true);
      });
    });
  });

  window.addEventListener('storage', event => {
    if (event.key === storageKey) applyTheme(event.newValue === 'dark' ? 'dark' : 'light');
  });

  window.RRCFTheme = { apply: theme => applyTheme(theme, true), current: () => document.documentElement.dataset.theme || 'light' };
})();
