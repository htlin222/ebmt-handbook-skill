# EBMT Handbook study deck (1:1, black & white)

Chapter-by-chapter lecture handout for a study group, built from the
`ebmt-handbook` skill's reference files and audited against the
EBMT Handbook, 8th edition (2024).

| File | What it is |
|---|---|
| `ebmt-handbook-study-deck.pptx` | Square (7.5 × 7.5 in) PowerPoint, one slide per chapter (Ch. 1–95), part dividers, contents, appendix |
| `ebmt-handbook-study-deck.pdf` | Same deck exported to PDF for printing / tablets |
| `src/build.js` | Generator (pptxgenjs); `node src/build.js` regenerates the PPTX |
| `src/lib.js` | Minimal renderer: outline, table, flowchart blocks with auto-fit on a square canvas |
| `src/content/*.js` | Slide content per Part; edit here, then rebuild |

## Design rules

- Strictly black, white and grey. No colour, no decorative bars, Arial throughout.
- Every chapter uses only three forms: **outline**, **table**, **simple flowchart**.
- Header: Part · chapter number · title. Footer: source citation, provenance mark, slide number.
- Provenance mark: `●` content verified against the handbook text (reference file tagged 書中驗證);
  `○` condensed summary (tagged 模型補充) — confirm in the chapter before clinical use.

## Rebuild

```bash
cd study-materials
npm install pptxgenjs jszip        # once
node src/build.js                  # writes ebmt-handbook-study-deck.pptx
soffice --headless --convert-to pdf ebmt-handbook-study-deck.pptx   # PDF export
```

## Audit

Building the deck surfaced factual errors in `ebmt-handbook/references/*.md`
(for example Axi-cel mislabelled as Kymriah, wrong IPSS-R thresholds, meropenem
listed for KPC producers). They are corrected in the reference files in the same
commit and listed on the deck's "Audit notes" slides.
