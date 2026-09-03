// Part VII (Ch.57-62) Prevention and management of relapse; cellular therapy
module.exports = [
  {
    part: "Part VII · Relapse and cellular therapy",
    partTitle: "Relapse Prevention, Cellular and Gene Therapy",
    partBlurb: "MRD monitoring, pharmacological maintenance, donor lymphocyte infusion, CAR-T cells, immune escape and ATMP regulation.",
    chapters: [
      {
        ch: 57,
        title: "MRD monitoring in ALL and AML",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Method", "Sensitivity", "Use"],
            widths: [0.36, 0.2, 0.44],
            rows: [
              ["Multiparameter flow cytometry", "10⁻⁴", "ALL and AML (LAIP / different-from-normal)"],
              ["qPCR of IG/TR rearrangements", "10⁻⁵", "ALL standard (EuroMRD)"],
              ["qPCR of fusion / mutation", "10⁻⁵–10⁻⁶", "BCR::ABL1, NPM1, RUNX1::RUNX1T1, CBFB::MYH11, WT1 expression"],
              ["NGS", "10⁻⁶", "IG/TR in ALL; mutation panels in AML (exclude DTA clones)"],
            ],
          },
          {
            type: "flow",
            dir: "tree",
            root: "Post-HCT MRD at D+30, +60, +100, then 3-monthly to 2 years",
            branches: [
              { node: "MRD negative", invert: true, then: ["Continue plan; taper IS on schedule"] },
              { node: "MRD positive or rising", dashed: true, then: ["Fast IS taper, DLI, targeted maintenance (TKI, FLT3i, HMA ± venetoclax)"] },
              { node: "Haematological relapse", then: ["Salvage; second HCT or CAR-T in selected patients (Ch. 58–60)"] },
            ],
          },
          { type: "note", text: "Pre-HCT MRD positivity is the strongest predictor of relapse in both AML and ALL and should drive conditioning and maintenance decisions, not exclude transplant." },
        ],
      },
      {
        ch: 58,
        title: "Pharmacological prevention and treatment of relapse",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Class", "Drugs", "Disease / evidence"],
            widths: [0.22, 0.34, 0.44],
            rows: [
              ["BCR::ABL1 TKI", "Imatinib, dasatinib (CNS penetration), ponatinib (T315I)", "Ph+ ALL: restart after engraftment, prophylactic or MRD-triggered; CML blast crisis"],
              ["FLT3 inhibitors", "Sorafenib, midostaurin, gilteritinib", "FLT3-ITD AML: sorafenib maintenance improved RFS (SORMAIN); gilteritinib benefit in MRD+ (MORPHO)"],
              ["Hypomethylating agents", "Azacitidine, decitabine", "AML/MDS: pre-emptive at MRD relapse (RELAZA2); oral azacitidine maintenance under study"],
              ["BCL-2 inhibitor", "Venetoclax", "Relapsed AML with HMA or low-dose cytarabine"],
              ["Checkpoint inhibitors", "Nivolumab, pembrolizumab", "Hodgkin lymphoma; high GVHD risk after allo-HCT — low dose, caution"],
              ["IDH / menin inhibitors, antibodies", "Ivosidenib, enasidenib, revumenib; blinatumomab, inotuzumab", "Targeted salvage bridging to DLI or second HCT"],
            ],
          },
          { type: "outline", items: ["Maintenance drugs act best on low disease burden and may add GVL through immunomodulation (HMA → Tregs, sorafenib → IL-15).", "Start after engraftment and count recovery; watch for cytopenia and interactions with CNI (azoles!)."] },
        ],
      },
      {
        ch: 59,
        title: "Donor lymphocyte infusion",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Intent", "Trigger", "Comment"],
            widths: [0.22, 0.4, 0.38],
            rows: [
              ["Prophylactic", "High-risk disease, MRD-negative, ≥ D+100–120, no GVHD, off IS", "Escalating doses; best evidence in AML / MDS"],
              ["Pre-emptive", "MRD positive or falling donor chimerism", "Stop IS first; combine with HMA or TKI"],
              ["Therapeutic", "Overt relapse", "Cytoreduce first; response best in CML, poor in ALL"],
            ],
          },
          {
            type: "table",
            cols: ["Setting", "Starting CD3+ dose / kg", "Escalation"],
            widths: [0.36, 0.32, 0.32],
            rows: [
              ["Matched sibling", "1 × 10⁶ – 1 × 10⁷", "Half-log to 1-log every 4–8 weeks"],
              ["Unrelated donor", "1 × 10⁶ – 5 × 10⁶", "As above"],
              ["Haploidentical", "1 × 10⁵ – 1 × 10⁶", "Very cautious"],
              ["CML (therapeutic)", "1 × 10⁷", "Up to 10⁸"],
            ],
          },
          { type: "outline", items: ["Contraindications: active GVHD, ongoing high-dose immunosuppression, uncontrolled infection.", "Toxicity: GVHD in 30–50% (the price of GVL), marrow aplasia if recipient haematopoiesis dominant; GVHD after DLI predicts response."] },
        ],
      },
      {
        ch: 60,
        title: "CAR-T cells and gene therapy",
        verified: true,
        blocks: [
          { type: "flow", dir: "h", nodes: ["Leukapheresis of patient T cells", "Manufacture (3–5 weeks): viral CAR transduction, expansion; bridging therapy", "Lymphodepletion: Flu 30 mg/m² + Cy 300–500 mg/m² × 3 days", "Infusion; monitor CRS / ICANS 2–4 weeks", "Response assessment; B-cell aplasia, IVIG"] },
          {
            type: "table",
            cols: ["Product", "Target", "Approved indications (2024)"],
            widths: [0.36, 0.14, 0.5],
            rows: [
              ["Tisagenlecleucel (Kymriah)", "CD19", "B-ALL ≤ 25 y R/R, DLBCL ≥ 3rd line, FL"],
              ["Axicabtagene ciloleucel (Yescarta)", "CD19", "LBCL 2nd line (ZUMA-7) and ≥ 3rd line, FL"],
              ["Lisocabtagene maraleucel (Breyanzi)", "CD19", "LBCL 2nd line (TRANSFORM), FL, MCL, CLL"],
              ["Brexucabtagene autoleucel (Tecartus)", "CD19", "MCL, adult B-ALL"],
              ["Idecabtagene vicleucel (Abecma)", "BCMA", "Myeloma (2nd line and later after KarMMa-3)"],
              ["Ciltacabtagene autoleucel (Carvykti)", "BCMA", "Myeloma (2nd line and later after CARTITUDE-4)"],
            ],
          },
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "CRS (ASTCT grading)", items: ["G1 fever only; G2 hypotension not needing pressors and/or O₂ ≤ 6 L/min; G3 one pressor or high-flow O₂; G4 multiple pressors or ventilation", "Tocilizumab 8 mg/kg (max 800 mg, up to 3–4 doses) ± dexamethasone from grade 2"] },
            right: { type: "outline", heading: "ICANS", items: ["ICE score (orientation, naming, commands, writing, attention) plus consciousness, seizures, motor, oedema", "Dexamethasone 10 mg q6h from grade 2; high-dose methylprednisolone for grade 3–4; anakinra emerging"] },
          },
        ],
      },
      {
        ch: 61,
        title: "Mechanisms of immune resistance",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Escape mechanism", "How it works", "Consequence"],
            widths: [0.26, 0.4, 0.34],
            rows: [
              ["HLA loss (uniparental disomy 6p)", "Leukaemia deletes the mismatched haplotype after haplo-HCT", "DLI from the same donor is useless; different donor needed"],
              ["HLA class II downregulation", "Loss of antigen presentation to CD4 T cells", "Relapse after matched HCT; IFN-γ or HMA may restore"],
              ["Checkpoint upregulation", "PD-L1, CTLA-4 ligands on blasts; exhausted T cells", "Checkpoint blockade (GVHD risk)"],
              ["Antigen loss / lineage switch", "CD19-negative relapse after blinatumomab or CAR-T; myeloid switch in KMT2A ALL", "Switch to CD22 or dual-targeting CAR-T"],
              ["Suppressive microenvironment", "Tregs, MDSC, IDO, TGF-β", "Poor GVL despite full chimerism"],
            ],
          },
          { type: "outline", items: ["Practical: at relapse after haplo-HCT, test the leukaemia for HLA loss before offering DLI.", "Combining immunomodulation (HMA, checkpoint) with cellular therapy is an active research area."] },
        ],
      },
      {
        ch: 62,
        title: "Regulatory aspects: ATMPs",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["ATMP class (EU Regulation 1394/2007)", "Examples"],
            widths: [0.44, 0.56],
            rows: [
              ["Gene therapy medicinal products", "Lentiviral HSC gene therapy, CRISPR-edited HSC (exa-cel)"],
              ["Somatic cell therapy medicinal products", "CAR-T cells, virus-specific T cells, MSC"],
              ["Tissue-engineered products", "Engineered skin, cartilage"],
              ["Combined ATMPs", "Cells on a scaffold or device"],
            ],
          },
          {
            type: "flow",
            dir: "tree",
            root: "Is the cell product an ATMP?",
            branches: [
              { label: "No", node: "Minimal manipulation, same essential function (CD34 selection, RBC depletion, cryopreservation)", then: ["Tissue and cell directives, JACIE standards"] },
              { label: "Yes", node: "Substantial manipulation or different function (gene modification, expansion, CAR)", invert: true, then: ["GMP manufacture, EMA CAT assessment, marketing authorisation or hospital exemption"] },
            ],
          },
          { type: "note", text: "Hospital exemption allows non-routine, in-house ATMPs for individual patients under national authority oversight. Costs and centre qualification requirements are major access barriers." },
        ],
      },
    ],
  },
];
