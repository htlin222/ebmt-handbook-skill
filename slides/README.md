# EBMT Handbook board review — 18 × 30-minute sessions

High-yield review of the EBMT Handbook 8th ed. (2024) for the Taiwan haematology board
examination. Weeks 19–20 are left for revision. Slides in English (black and white, tables and
simple flowcharts); the verbatim speaker script is in Traditional Chinese in each slide's notes.
Every deck ends with three board-style questions (question slide, then answer slide) and has
references and backup slides after the main line.

| Week | Deck | Chapters (core + support) |
|---|---|---|
| 1 | [HLA, donor selection and stem cell source](decks/s01-hla-donor-source.pptx) | 9, 12, 14 |
| 2 | [Pre-transplant evaluation and conditioning](decks/s02-evaluation-conditioning.pptx) | 11, 13 + 67, 68 |
| 3 | [Haploidentical and cord blood HCT](decks/s03-haplo-cord-blood.pptx) | 65, 64 + 18 |
| 4 | [Mobilisation, engraftment, chimerism, graft failure, transfusion](decks/s04-collection-engraftment-transfusion.pptx) | 16, 21, 41, 24 + 15, 20 |
| 5 | [GVHD prophylaxis and graft manipulation](decks/s05-gvhd-prophylaxis.pptx) | 26 + 19 |
| 6 | [Acute GVHD](decks/s06-acute-gvhd.pptx) | 43 |
| 7 | [Chronic GVHD and photopheresis](decks/s07-chronic-gvhd-ecp.pptx) | 44, 66 |
| 8 | [Neutropenic fever, bacterial and fungal infections](decks/s08-neutropenic-fever-bacterial-fungal.pptx) | 35, 36, 37 |
| 9 | [Viral and other infections, PTLD](decks/s09-viral-infections-ptld.pptx) | 38, 45 + 39 |
| 10 | [SOS/VOD and endothelial complications](decks/s10-sos-vod-endothelial.pptx) | 49, 42 |
| 11 | [Bleeding/thrombosis, HC and kidney, lung, CNS](decks/s11-organ-complications.pptx) | 40, 51, 52, 53 |
| 12 | [Long-term follow-up, vaccination, late effects](decks/s12-survivorship-late-effects.pptx) | 22, 29, 46, 47 + 55, 56 |
| 13 | [Relapse: MRD, maintenance, DLI](decks/s13-relapse-mrd-dli.pptx) | 57, 58, 59 |
| 14 | [CAR-T and engineered T cells](decks/s14-car-t.pptx) | 60 + 61 |
| 15 | [HCT for AML and ALL](decks/s15-aml-all.pptx) | 70, 72 + 71, 73 |
| 16 | [HCT for MDS, MDS/MPN, MPN](decks/s16-mds-mpn.pptx) | 74, 76, 77 + 75 |
| 17 | [Aplastic anaemia, Fanconi anaemia, haemoglobinopathies](decks/s17-marrow-failure-hemoglobinopathies.pptx) | 78, 79, 80 |
| 18 | [Myeloma and lymphoma](decks/s18-myeloma-lymphoma.pptx) | 81, 84, 86, 87, 89 + 82, 83, 85, 88 |

Not taught as sessions (lower exam yield; still in the skill's full text): Ch. 1–8, 10, 17, 23,
25, 27, 28, 30–34, 48, 50, 54, 62, 63, 69, 90–94.

**Before presenting**, go through [VERIFY.md](VERIFY.md): items not stated in the book (bracketed
`[verify: …]` on the slide) and inconsistencies inside the book.

## Rebuilding

```bash
cd slides && npm install
NODE_PATH=$PWD/node_modules node lib/render.js specs/s06-acute-gvhd.json decks/
```

Content lives in `specs/*.json` (format in [SPEC.md](SPEC.md)); `lib/render.js` turns a spec into
a deck using the monochrome seminar library in `lib/seminar_lib.js`. Timing estimates assume about
240 Chinese characters or 125 English words per minute; rehearse once against a clock.
