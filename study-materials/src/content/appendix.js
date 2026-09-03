// Appendix slides: audit log and abbreviations
module.exports = [
  {
    title: "Audit notes: corrections (1 of 2)",
    basePt: 9.5,
    blocks: [
      { type: "note", text: "Every chapter summary in ebmt-handbook/references/*.md was read against the handbook and current guidance while building this deck. These statements were wrong or misleading and are corrected in the slides and in the reference files." },
      {
        type: "table",
        cols: ["Ch.", "Reference file said", "Corrected to"],
        widths: [0.07, 0.43, 0.5],
        rows: [
          ["11", "HCT-CI 0 / 1–2 / ≥3 → NRM ≈15% / 26% / 41%", "Sorror 2005: 2-year NRM ≈ 14% / 21% / 41%"],
          ["16", "Poor mobiliser = CD34+ < 10/µL", "GITMO: peak CD34+ < 20/µL or < 2 × 10⁶/kg in ≤ 3 aphereses"],
          ["36", "KPC / ESBL → meropenem", "ESBL → carbapenem; KPC producers → ceftazidime-avibactam or meropenem-vaborbactam; MBL → aztreonam + ceftazidime-avibactam or cefiderocol"],
          ["38", "Maribavir approved 2022", "FDA November 2021 (EMA 2022) for refractory/resistant CMV"],
          ["43", "Ruxolitinib for aGVHD 'FDA 2021'", "FDA approval for steroid-refractory aGVHD was 2019 (REACH1); 2021 was cGVHD (REACH3)"],
          ["49", "SOS/VOD: 'any ≥ 2 of' bilirubin, hepatomegaly, ascites, ultrasound", "EBMT 2016: bilirubin ≥ 2 mg/dL plus ≥ 2 of painful hepatomegaly, weight gain > 5%, ascites (classical ≤ 21 d); late-onset criteria differ"],
          ["52", "BOS criteria require 'no hyperinflation'", "NIH criteria require evidence of air trapping (RV > 120% or expiratory CT) with FEV1/FVC < 0.7 and FEV1 < 75%"]
        ],
      },
    ],
  },
  {
    title: "Audit notes: corrections (2 of 2)",
    basePt: 9.5,
    blocks: [
      {
        type: "table",
        cols: ["Ch.", "Reference file said", "Corrected to"],
        widths: [0.07, 0.43, 0.5],
        rows: [
          ["60", "CRS grade 2 = 'O₂ < 40%'", "ASTCT: grade 2 = hypotension not needing vasopressors and/or O₂ by low-flow cannula ≤ 6 L/min"],
          ["74", "IPSS-R low < 3.5, intermediate 3.5–4.5", "IPSS-R: very low ≤ 1.5, low > 1.5–3, intermediate > 3–4.5, high > 4.5–6, very high > 6"],
          ["81", "Lenalidomide maintenance 'FORTE/MAIA'", "Evidence: CALGB 100104, IFM 2005-02, Myeloma XI meta-analysis; MAIA is a transplant-ineligible trial"],
          ["82", "Mel-140 for normal organ function, Mel-100 if impaired", "Mel-200 for fit patients; Mel-140 risk-adapted"],
          ["86", "Axicabtagene ciloleucel labelled 'KymRiah'", "Axi-cel is Yescarta; Kymriah is tisagenlecleucel"],
          ["91", "MIST: 'no progression 79% vs 9%'", "MIST: progression at 5 years 9.7% (HSCT) vs 75.3% (DMT)"]
        ],
      },
    ],
  },
  {
    title: "Audit notes: scope and provenance",
    basePt: 10,
    blocks: [
      {
        type: "outline",
        items: [
          "The reference files tag each chapter either **verified from the book** or **model-supplemented** (Chinese tags in the source). The footer symbol on each slide carries that tag forward: ● verified, ○ supplemented.",
          "Supplemented chapters (1–8, 11–25, 27–29, 31–34, 41–42, 45, 61–62, 69, 76, 82–85, 87–94) were rewritten from general knowledge of the 8th edition and current ELN, ECIL, EBMT and ASTCT guidance; treat numbers as teaching values.",
          "Items added beyond the reference files where the handbook covers them: engraftment definitions (Ch. 21), ABO bidirectional mismatch (Ch. 24), MAGIC aGVHD grading (Ch. 43), NIH cGVHD severity rules (Ch. 44), EASIX (Ch. 42), FORUM trial (Ch. 73), IPSS-M (Ch. 74), TRIANGLE (Ch. 87), FELIX/obe-cel (Ch. 95).",
          "Newer than the 2024 print edition and flagged as such: 2023 refined SOS/VOD criteria, liso-cel for CLL (2024), KarMMa-3 / CARTITUDE-4 second-line myeloma CAR-T, teclistamab-class bispecifics.",
          "Not covered by this deck: individual drug monographs, paediatric dosing tables, and the handbook's country-specific regulatory annexes.",
        ],
      },
      { type: "note", text: "Rebuild: node study-materials/src/build.js — content lives in study-materials/src/content/*.js; edit and re-run to regenerate PPTX and PDF." },
    ],
  },
  {
    title: "Abbreviations",
    basePt: 9,
    blocks: [
      {
        type: "cols",
        split: 0.5,
        left: {
          type: "table",
          cols: ["Abbr.", "Meaning"],
          widths: [0.26, 0.74],
          rows: [
            ["aGVHD / cGVHD", "Acute / chronic graft-versus-host disease"],
            ["ATG", "Anti-thymocyte globulin"],
            ["ATMP", "Advanced therapy medicinal product"],
            ["BOS", "Bronchiolitis obliterans syndrome"],
            ["Bu / Cy / Flu / Mel / Treo / Thio", "Busulfan / cyclophosphamide / fludarabine / melphalan / treosulfan / thiotepa"],
            ["CNI", "Calcineurin inhibitor (ciclosporin, tacrolimus)"],
            ["CRS / ICANS", "Cytokine release syndrome / immune effector cell-associated neurotoxicity syndrome"],
            ["DLI", "Donor lymphocyte infusion"],
            ["ECP", "Extracorporeal photopheresis"],
            ["GVL", "Graft-versus-leukaemia effect"],
            ["HCT-CI", "HCT comorbidity index (Sorror)"],
            ["HMA", "Hypomethylating agent"],
            ["IS", "Immunosuppression"],
          ],
        },
        right: {
          type: "table",
          cols: ["Abbr.", "Meaning"],
          widths: [0.26, 0.74],
          rows: [
            ["KPS", "Karnofsky performance status"],
            ["MAC / RIC / NMA", "Myeloablative / reduced-intensity / non-myeloablative conditioning"],
            ["MMF / MTX", "Mycophenolate mofetil / methotrexate"],
            ["MRD", "Measurable residual disease"],
            ["MSD / MUD / MMUD", "Matched sibling / matched unrelated / mismatched unrelated donor"],
            ["NRM", "Non-relapse mortality"],
            ["PBSC / BM / CB", "Peripheral blood stem cells / bone marrow / cord blood"],
            ["PRES", "Posterior reversible encephalopathy syndrome"],
            ["PTCy", "Post-transplant cyclophosphamide"],
            ["PTLD", "Post-transplant lymphoproliferative disorder"],
            ["SOS / VOD", "Sinusoidal obstruction syndrome / veno-occlusive disease"],
            ["TA-TMA", "Transplant-associated thrombotic microangiopathy"],
            ["TBI / TDM / TNC", "Total body irradiation / therapeutic drug monitoring / total nucleated cells"],
          ],
        },
      },
    ],
  },
];
