# RRCF controller reference — live demo

Runs the RRCF controller-side reference implementation
(`RCSP1_UniversalRobotControl.jsx`) directly in the browser, compiled
client-side with Babel standalone — no build step, consistent with the rest
of this static site.

## Files

- `RCSP1_UniversalRobotControl.jsx` — a copy of
  [`RRCF/reference-implementation/RCSP1_UniversalRobotControl.jsx`](https://github.com/rrcf-foundation/RRCF/blob/main/reference-implementation/RCSP1_UniversalRobotControl.jsx),
  with exactly one line changed: the ES module `import { useState, ... } from
  "react"` becomes `const { useState, ... } = React;`, since this page loads
  React from a CDN `<script>` tag (a global) rather than through a bundler.
  No other logic differs — this is the same component, not a fork.
- `index.html` — loads React/ReactDOM (UMD build) + Babel standalone from
  CDN, fetches and transforms the JSX with the "classic" runtime (Babel
  standalone's default "automatic" runtime needs an import-map-resolvable
  `react/jsx-runtime`, which isn't available in a plain script-tag page),
  then mounts the component.

## Keeping this in sync

When `RCSP1_UniversalRobotControl.jsx` changes in the main RRCF repo,
re-copy it here and re-apply the single import-line change above. There's
no automated sync — this is a small enough diff that a manual copy is the
simplest correct approach for a static site with no build pipeline.
