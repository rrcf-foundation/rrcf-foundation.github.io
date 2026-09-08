# rrcf-foundation.github.io

Source for the RRCF Foundation website, published via GitHub Pages at
[rrcf-foundation.github.io](https://rrcf-foundation.github.io).

RRCF (Robot Remote Control Format) is the open Operator Interface
Declaration Standard for Physical AI. The spec and reference implementation
live in [rrcf-foundation/RRCF](https://github.com/rrcf-foundation/RRCF) —
this repo is just the marketing/docs site built on top of it.

## Structure

```
index.html            landing page
assets/css/style.css   site stylesheet
assets/images/         images sourced from the RRCF repo
spec/                  copy of the spec PDF/DOCX for direct linking
tools/converter.html   browser-based URDF/MJCF/SDF → .rrcf converter (self-contained, no build step)
```

## Local preview

No build step — it's static HTML/CSS. Serve the directory with any static
file server, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Updating content

The spec PDF/DOCX and images are copied from the
[RRCF repo](https://github.com/rrcf-foundation/RRCF). When the spec or
diagrams change there, re-copy the updated files into `spec/` and
`assets/images/` here.
