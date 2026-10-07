# ebmt-handbook

[![Build & Release Skill](https://github.com/htlin222/ebmt-handbook-skill/actions/workflows/release.yml/badge.svg)](https://github.com/htlin222/ebmt-handbook-skill/actions/workflows/release.yml)
[![GitHub Release](https://img.shields.io/github/v/release/htlin222/ebmt-handbook-skill?include_prereleases&label=skill%20version)](https://github.com/htlin222/ebmt-handbook-skill/releases/latest)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Skills Protocol](https://img.shields.io/badge/protocol-vercel--labs%2Fskills-blue)](https://github.com/vercel-labs/skills)
[![Compatible Agents](https://img.shields.io/badge/agents-40%2B-green)](https://github.com/vercel-labs/skills#supported-agents)

> EBMT Handbook 8th Edition (2024) — Hematopoietic Cell Transplantation & Cellular Therapies clinical guideline skill for AI coding agents.

## Install

```bash
# Project-level (recommended)
npx skills add htlin222/ebmt-handbook-skill

# Global
npx skills add -g htlin222/ebmt-handbook-skill

# Specific agent
npx skills add htlin222/ebmt-handbook-skill --agent claude-code
```

## What it does

This skill equips AI agents with structured clinical knowledge from the **EBMT Handbook, 8th Edition (2024)**, the standard reference for hematopoietic cell transplantation and cellular therapies.

When activated, the agent can:

- **Read the whole book**: all 94 chapters of the 8th edition, verbatim — every section, table, figure, equation, Key Points box and reference list
- **Route questions** to the correct chapter via a 94-chapter routing table and clinical decision tree
- **Cite sources** with `📖 EBMT Handbook 8th ed. Ch. N` attribution, down to table/figure numbers
- **Run clinical calculators** (BSA, CrCl, HCT-CI score, GVHD grading, drug dosing)
- **Output checklists** for pre-HCT evaluation, febrile neutropenia, and more

## Trigger keywords

`HCT`, `移植`, `骨髓`, `幹細胞`, `GVHD`, `CAR-T`, `造血`, `transplant`, `stem cell`, `bone marrow`

## Skill structure

```
ebmt-handbook/
├── SKILL.md                        # Skill definition, 94-chapter routing table
├── scripts/
│   └── hct_tools.py                # Clinical calculators
└── references/
    ├── INDEX.md                    # Full TOC: 9 Parts × 94 chapters → file, pages, tables, figures
    ├── chapters/                   # ch01-…md … ch94-…md — complete original text (~392k words)
    ├── figures/                    # 54 original figures, embedded in the chapter files
    └── summaries/                  # Chinese quick-reference notes, one file per Part (not authoritative)
        ├── part01-introduction.md           # Ch.1–6
        ├── part02-biological.md             # Ch.7–10
        ├── part03-methodology.md            # Ch.11–22
        ├── part04-general-management.md     # Ch.23–34
        ├── part05-complications.md          # Ch.35–47
        ├── part06-organ-complications.md    # Ch.48–56
        ├── part07-relapse.md                # Ch.57–62
        ├── part08-modalities.md             # Ch.63–69
        └── part09-indications.md            # Ch.70–94
```

## Rebuilding and verifying the full text

`tools/` (not packaged into the skill) regenerates and checks `references/` from the Springer open-access edition:

```bash
python3 -I tools/build_from_springer.py /tmp/ebmt-raw ebmt-handbook/references   # download + convert 94 chapters
python3 -I tools/make_index.py                                                   # regenerate references/INDEX.md
# verification against the official chapter PDFs (needs pdfplumber + poppler-utils)
mkdir -p /tmp/ebmt-pdf; for n in $(seq 1 94); do curl -sSL -o /tmp/ebmt-pdf/ch$n.pdf \
  https://link.springer.com/content/pdf/10.1007/978-3-031-44080-9_$n.pdf; done
python3 -I tools/verify_against_pdf.py /tmp/ebmt-pdf ebmt-handbook/references/chapters
```

The verifier checks every PDF table and figure caption against the Markdown (all present) and reports
6-gram token coverage per chapter. What it can't match is PDF-only layout: the licence box, affiliations and e-mail
addresses, running heads, rotated tables extracted back-to-front, and table/figure cells scrambled by column cropping.

## Source

**Book:** The EBMT Handbook: Hematopoietic Cell Transplantation and Cellular Therapies, 8th edition (2024)
**Editors:** Sureda A, Corbacioglu S, Greco R, Kröger N, Carreras E
**Publisher:** Springer — Open Access CC BY 4.0
**DOI:** https://doi.org/10.1007/978-3-031-44080-9 (also on [NCBI Bookshelf](https://www.ncbi.nlm.nih.gov/books/NBK608238/))

## Protocol

This skill follows the [vercel-labs/skills](https://github.com/vercel-labs/skills) protocol. Each push to `main` triggers a GitHub Action that packages the skill as a `.skill` file (zip archive) and creates a release tagged with the commit SHA.

## License

Content from the EBMT Handbook (chapter text, tables and figures © the chapter authors, 2024) is reproduced and adapted under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
