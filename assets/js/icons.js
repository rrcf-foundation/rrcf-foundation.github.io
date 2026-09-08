/**
 * icons.js — small inline SVG icon registry for the RRCF site.
 *
 * Usage: <span class="icon" data-icon="shield"></span>
 * On DOMContentLoaded, every [data-icon] element gets its matching SVG
 * injected inline (not as an <img>, so `currentColor` picks up the
 * surrounding text color via CSS — see .icon rules in style.css).
 *
 * All icons are hand-authored 24x24 stroke-style glyphs (viewBox 0 0 24 24,
 * stroke="currentColor", fill="none") — no external icon library/CDN
 * dependency, consistent with the rest of this site being fully static
 * with no build step.
 */
(function () {
  const ICONS = {
    // ── nav / brand ──────────────────────────────────────────────
    robot: '<path d="M12 2v4M8 6h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><path d="M9 17h6M4 10h2M18 10h2"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2-.2 4-1 4-4.5 0-1.1-.4-2-1-2.7.1-.3.4-1.4-.1-2.8 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6.3 0C5.1 3.5 4 3.8 4 3.8c-.5 1.4-.2 2.5-.1 2.8-.6.7-1 1.7-1 2.7 0 3.5 2 4.3 4 4.5-.5.4-.5 1-.5 1.9V19"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"/><path d="M4 19a2.5 2.5 0 0 1 2.5-2.5H20"/>',
    wrench: '<path d="m14.7 6.3 3 3-8.4 8.4a2 2 0 1 1-3-3Z" transform="translate(1,-1)"/><path d="M20 8a4 4 0 1 0-4-4l1.5 1.5L16 7l1.5 1.5Z"/>',
    layers: '<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/>',
    shield: '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    sync: '<path d="M4 4v5h5"/><path d="M20 20v-5h-5"/><path d="M4.6 9a8 8 0 0 1 14-3.5L20 9"/><path d="M19.4 15a8 8 0 0 1-14 3.5L4 15"/>',
    network: '<circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M6.8 7.5 10.5 16M17.2 7.5 13.5 16M7.2 6h9.6"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    controller: '<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="15.5" cy="10.5" r=".8" fill="currentColor" stroke="none"/><circle cx="17.5" cy="13" r=".8" fill="currentColor" stroke="none"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    download: '<path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M4 19.5h16"/>',
    code: '<path d="m9 8-4 4 4 4M15 8l4 4-4 4"/>',
    play: '<path d="M6 4.5v15l13-7.5-13-7.5Z"/>',
    record: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"/><circle cx="12" cy="12" r="3.2"/>',
    edit: '<path d="M4 20h4L19.5 8.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16v4Z"/><path d="M13.5 6.5 17.5 10.5"/>',
    lock: '<rect x="5" y="10.5" width="14" height="9" rx="1.8"/><path d="M8 10.5V7a4 4 0 1 1 8 0v3.5"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
    voice: '<path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Z"/><path d="M19 11a7 7 0 0 1-14 0M12 18v3"/>',
    vla: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><circle cx="8.5" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="9" r="1" fill="currentColor" stroke="none"/><path d="M8 12.5c1.2 1 2.8 1 4 0"/>',
    doc: '<path d="M7 2h7l4 4v14a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V3.5A1.5 1.5 0 0 1 7 2Z"/><path d="M14 2v4h4M9 12h6M9 15.5h6M9 8.5h3"/>',
    flag: '<path d="M6 21V4M6 4h12l-3 4 3 4H6"/>',

    // ── morphology categories ────────────────────────────────────
    wheeled: '<circle cx="7" cy="17" r="2.5"/><circle cx="17" cy="17" r="2.5"/><path d="M7 17h10M9.5 17V9a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1"/>',
    legged: '<circle cx="12" cy="6" r="2.5"/><path d="M9 8.5 6 14l-1.5 6M15 8.5l3 5.5 1.5 6M9 8.5h6"/>',
    loco_manip: '<circle cx="10" cy="6" r="2.2"/><path d="M8 8 5.5 13l-1 6M12 8l2 5 .5 6"/><path d="M12 8h4l3-3M16 8v3l3 2"/>',
    wheeled_humanoid: '<circle cx="12" cy="4.5" r="2"/><path d="M12 6.5v6M9 9h6M9 12.5 6.5 15M15 12.5 17.5 15"/><circle cx="9" cy="18" r="2"/><circle cx="15" cy="18" r="2"/><path d="M9 18h6"/>',
    full_humanoid: '<circle cx="12" cy="4.5" r="2"/><path d="M12 6.5v6M8.5 9h7M9 12.5 6.5 20M15 12.5 17.5 20"/>',
    manipulator: '<circle cx="6" cy="19" r="1.6"/><path d="M6 19V13l6-3 5 2"/><circle cx="17" cy="12" r="1.4"/>',
    aerial: '<path d="M12 3v18M3 12h18"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>',
    marine_surface: '<path d="M3 17c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0"/><path d="M6 17V9l6-4 6 4v8"/>',
    marine_sub: '<ellipse cx="11" cy="12" rx="8" ry="4"/><path d="M17 10l3-2M11 8V5h3M8 16v2"/>',
    industrial_vehicle: '<rect x="3" y="10" width="11" height="6" rx="1"/><path d="M14 12h4l3 2.5V16h-3"/><circle cx="7" cy="18" r="1.8"/><circle cx="16" cy="18" r="1.8"/><path d="M6 10V6h5l2 4"/>',
    agri_vehicle: '<circle cx="6" cy="17" r="3"/><circle cx="17" cy="14" r="2"/><path d="M9 17h5l2-8h3M14 9V6h-4l-1 3"/>',
    custom: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/><circle cx="12" cy="12" r="3.5"/>',
  };

  function svgFor(name) {
    const body = ICONS[name];
    if (!body) return '';
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      body +
      '</svg>'
    );
  }

  function render(root) {
    (root || document).querySelectorAll('[data-icon]').forEach((el) => {
      const name = el.getAttribute('data-icon');
      const markup = svgFor(name);
      if (markup) el.innerHTML = markup;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => render());
  } else {
    render();
  }

  // Exposed for pages that inject markup dynamically after load.
  window.RRCFIcons = { render };
})();
