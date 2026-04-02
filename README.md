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

- **Route questions** to the correct chapter via a clinical decision tree
- **Cite sources** with `📖 EBMT Handbook 8th ed. Ch. N` attribution
- **Run clinical calculators** (BSA, CrCl, HCT-CI score, GVHD grading, drug dosing)
- **Output checklists** for pre-HCT evaluation, febrile neutropenia, and more
- **Cover 95+ chapters** spanning pre-transplant assessment, donor selection, conditioning, GVHD, infections, organ complications, relapse, CAR-T, and disease-specific indications

## Trigger keywords

`HCT`, `移植`, `骨髓`, `幹細胞`, `GVHD`, `CAR-T`, `造血`, `transplant`, `stem cell`, `bone marrow`

## Skill structure

```
ebmt-handbook/
├── SKILL.md                        # Skill definition (frontmatter + instructions)
├── scripts/
│   └── hct_tools.py                # Clinical calculators
├── references/
│   ├── part2-biological.md         # HLA, immune reconstitution (Ch.7-10)
│   ├── part3-methodology.md        # Transplant methodology (Ch.11-22)
│   ├── part4-management.md         # General management, vaccines (Ch.22-34)
│   ├── part5-complications.md      # GVHD, infections, iron overload (Ch.35-47)
│   ├── part6-organ.md              # Organ complications (Ch.48-56)
│   ├── part7-relapse.md            # Relapse, CAR-T (Ch.57-65)
│   ├── part8-modalities.md         # Special transplant modalities (Ch.63-69)
│   └── part9-indications.md        # Disease indications, pediatric (Ch.70-95)
└── audit_payload.json              # Skill audit metadata
```

## Source

**Book:** The EBMT Handbook: Hematopoietic Cell Transplantation and Cellular Therapies, 8th edition (2024)
**Editors:** Sureda A, Corbacioglu S, Greco R, Kröger N, Carreras E
**Publisher:** Springer — Open Access CC BY 4.0
**URL:** https://www.ncbi.nlm.nih.gov/books/NBK608238/

## Protocol

This skill follows the [vercel-labs/skills](https://github.com/vercel-labs/skills) protocol. Each push to `main` triggers a GitHub Action that packages the skill as a `.skill` file (zip archive) and creates a release tagged with the commit SHA.

## License

Content derived from the EBMT Handbook is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
