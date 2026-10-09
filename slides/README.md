# EBMT Handbook board review — 29 × 30-minute sessions

High-yield review of the EBMT Handbook 8th ed. (2024) for the Taiwan haematology board
examination. Slides in English (black and white, tables and simple flowcharts); the verbatim
speaker script is in Traditional Chinese in each slide's notes. Every deck ends with three
board-style questions (question slide, then answer slide), followed by references and backup slides.

| # | Session | Chapters (core + support) |
|---|---|---|
| 01 | [HLA, donor selection and stem cell source](decks/s01-hla-donor-source.pptx) | 9, 12, 14 |
| 02 | [Pre-transplant evaluation and conditioning](decks/s02-evaluation-conditioning.pptx) | 11, 13 + 67, 68 |
| 03 | [Alternative donors: haploidentical and cord blood HCT](decks/s03-haplo-cord-blood.pptx) | 65, 64 + 18 |
| 04 | [Mobilisation, collection and processing of stem cells](decks/s04-mobilisation-collection.pptx) | 16, 15, 20 |
| 05 | [Engraftment, chimerism and graft failure](decks/s05-engraftment-graft-failure.pptx) | 21, 41 |
| 06 | [Transfusion support and ABO-incompatible HCT](decks/s06-transfusion-abo.pptx) | 24 |
| 07 | [GVHD prophylaxis and graft manipulation](decks/s07-gvhd-prophylaxis.pptx) | 26 + 19 |
| 08 | [Acute GVHD](decks/s08-acute-gvhd.pptx) | 43 |
| 09 | [Chronic GVHD and extracorporeal photopheresis](decks/s09-chronic-gvhd-ecp.pptx) | 44, 66 |
| 10 | [Neutropenic fever, bacterial and other life-threatening infections](decks/s10-neutropenic-fever-bacterial.pptx) | 35, 36, 39 |
| 11 | [Invasive fungal diseases](decks/s11-invasive-fungal.pptx) | 37 |
| 12 | [Viral infections and EBV-PTLD](decks/s12-viral-ptld.pptx) | 38, 45 |
| 13 | [SOS/VOD and early endothelial complications](decks/s13-sos-vod-endothelial.pptx) | 49, 42 |
| 14 | [Bleeding, thrombosis, haemorrhagic cystitis and kidney](decks/s14-bleeding-thrombosis-kidney.pptx) | 40, 51 |
| 15 | [Noninfectious pulmonary complications](decks/s15-pulmonary.pptx) | 52 |
| 16 | [Neurological complications](decks/s16-neurological.pptx) | 53 |
| 17 | [Vaccination after HCT](decks/s17-vaccination.pptx) | 29 |
| 18 | [Long-term follow-up and late effects](decks/s18-late-effects.pptx) | 22, 46, 47, 55, 56 |
| 19 | [Relapse: MRD, maintenance and donor lymphocyte infusion](decks/s19-relapse-mrd-dli.pptx) | 57, 58, 59 |
| 20 | [CAR-T and engineered T cells](decks/s20-car-t.pptx) | 60 + 61 |
| 21 | [HCT for AML](decks/s21-aml.pptx) | 70 + 71 |
| 22 | [HCT for ALL](decks/s22-all.pptx) | 72 + 73 |
| 23 | [HCT for MDS and MDS/MPN](decks/s23-mds-mds-mpn.pptx) | 74, 76 + 75 |
| 24 | [HCT for myelofibrosis and CML](decks/s24-mpn.pptx) | 77 |
| 25 | [HCT for aplastic anaemia, PNH and inherited marrow failure](decks/s25-aplastic-anaemia-ibmfs.pptx) | 78, 79 |
| 26 | [HCT for thalassaemia and sickle cell disease](decks/s26-hemoglobinopathies.pptx) | 80 |
| 27 | [HCT for myeloma and other plasma cell disorders](decks/s27-myeloma-plasma-cell.pptx) | 81, 82, 83 |
| 28 | [HCT for aggressive lymphomas](decks/s28-aggressive-lymphoma.pptx) | 86, 87, 88 |
| 29 | [HCT for Hodgkin lymphoma, indolent lymphoma and CLL](decks/s29-hodgkin-indolent-cll.pptx) | 89, 84, 85 |

Over 20 weeks this is about 1.5 sessions a week. Not taught as sessions (lower exam yield; still in
the skill's full text): Ch. 1–8, 10, 17, 23, 25, 27, 28, 30–34, 48, 50, 54, 62, 63, 69, 90–94.

**Before presenting**, go through [VERIFY.md](VERIFY.md): items the book does not state or may have
misprinted, each bracketed `[verify: …]` on the slide and/or flagged in the speaker reminders.

## Rebuilding

```bash
cd slides && npm install
NODE_PATH=$PWD/node_modules node lib/render.js specs/s08-acute-gvhd.json decks/
python3 lib/verify_ledger.py        # regenerate VERIFY.md from the specs
```

Content lives in `specs/*.json` (format in [SPEC.md](SPEC.md)); `lib/render.js` turns a spec into a
deck using the monochrome seminar library in `lib/seminar_lib.js`. Timing estimates assume about
240 Chinese characters or 125 English words per minute; rehearse once against a clock.
