# nel-course — one Markdown source, three outputs.
#
# Everything is built by pandoc from `sections/*.prose.md`. There is no engine
# and no generator: the file list is a shell glob, so the numeric prefixes on the
# section filenames ARE the document order. Add a section by adding a numbered
# pair; nothing needs to be registered anywhere.
#
# CI runs these same recipes (see .github/workflows/pages.yml), so there is one
# definition of how each output is built and no second copy to drift.

outdir := "output"
site   := "_site"
pandoc := "pandoc"
engine := "xelatex"

# `open` is macOS. On Linux:  just open=xdg-open view-doc
open   := "open"

# Shared across all three outputs.
common := "--metadata-file=metadata.yaml --resource-path=.:figures --citeproc --bibliography=references.bib"

# Print available recipes (default).
default:
    @just --list

# The presentation is NOT generated here. A five-minute talk needs a designed
# deck, not one slide per `##` heading, so it is authored in PowerPoint from
# `presentation/source/POWERPOINT-BRIEF.md`.

# Build the document and the website.
build: doc site

# --- Document ---------------------------------------------------------------

# output/document.pdf — the long-form read.
doc:
    mkdir -p {{outdir}}
    {{pandoc}} sections/*.prose.md {{common}} \
        --pdf-engine={{engine}} \
        --toc --toc-depth=2 --number-sections \
        -V documentclass=article -V fontsize=11pt -V geometry:margin=1in \
        -o {{outdir}}/document.pdf

# --- Presentation -----------------------------------------------------------

# The deck is hand-authored from `presentation/source/POWERPOINT-BRIEF.md`, which holds
# the slide copy, figures, presenter script and timings. There is no generated
# slides.pdf: the former beamer deck put one slide per `##` heading, which gave
# 16 near-identical text slides for a five-minute slot.

# --- Website ----------------------------------------------------------------

# The page links to the document PDF, so this depends on it; without that, a
# local preview has a dead link that only shows up after deploying.

# _site/ — one page, sidebar table of contents, the document PDF linked.
site: doc
    mkdir -p {{site}}
    {{pandoc}} sections/*.prose.md {{common}} \
        --standalone --toc --toc-depth=2 \
        --template=site/template.html \
        --css=style.css \
        -o {{site}}/index.html
    cp site/style.css {{site}}/
    cp {{outdir}}/document.pdf {{site}}/
    mkdir -p {{site}}/figures
    cp -R figures/. {{site}}/figures/
    rm -f {{site}}/figures/README.md

# Serve the site locally at http://localhost:8000.
serve: site
    python3 -m http.server 8000 --directory {{site}}

# --- Viewing ----------------------------------------------------------------

# Open the document PDF.
view-doc: doc
    {{open}} {{outdir}}/document.pdf

# --- Demo -------------------------------------------------------------------

# Archives whatever was in run/, then leaves it holding only the harness
# CLAUDE.md: the session writes the plan, the checks and the page itself.

# Reset the live demo folder.
demo-reset:
    ./demo/tools/setup.sh

# --- Publishing -------------------------------------------------------------

# Builds in CI from whatever is on `main` — so commit and push first.
# Requires `gh auth login`, and Pages set to "GitHub Actions" in the
# repository settings.

# Publish the site and both PDFs to GitHub Pages, on demand.
deploy:
    gh workflow run pages.yml
    @echo "Deploy started. Watch it with:  gh run watch"

# --- Housekeeping -----------------------------------------------------------

# Remove all build outputs.
clean:
    rm -rf {{outdir}} {{site}}
