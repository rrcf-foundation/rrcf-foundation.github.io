# rrcf-foundation.github.io

Source for the RRCF Foundation website, published via GitHub Pages at
[rrcf-foundation.github.io](https://rrcf-foundation.github.io).

RRCF (Robot Remote Control Format) is the open Operator Interface
Declaration Standard for Physical AI. The spec and reference implementation
live in [rrcf-foundation/RRCF](https://github.com/rrcf-foundation/RRCF) —
this repo is the marketing/docs site built on top of it.

## Structure

```
index.html              landing page
spec/index.html         specification reader — renders the canonical Markdown spec from the RRCF repo
assets/css/style.css    site stylesheet
assets/js/              theme + icon scripts
tools/converter.html    browser-based URDF/MJCF/SDF → .rrcf converter (self-contained, no build step)
demo/index.html         controller reference implementation (React, runs in-browser)
registry/index.html     Adapter Registry browser
```

The specification prose is **not** duplicated here. `spec/index.html` fetches
[`spec/RRCF_v04_RFC_Specification.md`](https://github.com/rrcf-foundation/RRCF/blob/main/spec/RRCF_v04_RFC_Specification.md)
from the RRCF repo at runtime (the same way images are sourced) and renders it,
so the spec has a single source of truth.

**No binary assets are stored in this repo.** Images are served directly from
[`rrcf-foundation/RRCF/images/`](https://github.com/rrcf-foundation/RRCF/tree/main/images)
via `raw.githubusercontent.com`, and the spec PDF links to the canonical file in
that repo. When images or the spec are updated there, this site picks them up
automatically — no re-copy needed.

## Local preview

No build step — it's static HTML/CSS. Serve the directory with any static
file server, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
