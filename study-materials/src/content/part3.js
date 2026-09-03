// Part III (Ch.11-21) Methodology and clinical aspects
module.exports = [
  {
    part: "Part III · Transplant methodology",
    partTitle: "Methodology and Clinical Aspects",
    partBlurb: "Candidate evaluation, donor selection, conditioning, graft source, collection, cord blood, graft manipulation, processing, engraftment and chimerism.",
    chapters: [
      {
        ch: 11,
        title: "Evaluation and counselling of the candidate",
        verified: false,
        blocks: [
          { type: "flow", dir: "h", nodes: ["Confirm disease indication (Part IX)", "Estimate NRM risk: HCT-CI, age, KPS", "Choose platform: donor, source, intensity", "Informed consent, fertility, psychosocial"] },
          {
            type: "cols",
            split: 0.5,
            left: {
              type: "table",
              cols: ["HCT-CI (Sorror)", "2-y NRM"],
              widths: [0.5, 0.5],
              rows: [["0", "≈ 14%"], ["1–2", "≈ 21%"], ["≥ 3", "≈ 41%"]],
            },
            right: {
              type: "table",
              cols: ["Organ", "Typical minimum"],
              widths: [0.35, 0.65],
              rows: [["Heart", "LVEF ≥ 45%"], ["Lung", "FEV1 and DLCO ≥ 50%"], ["Kidney", "CrCl ≥ 40–50 mL/min"], ["Liver", "Bilirubin ≤ 2× ULN"]],
            },
          },
          { type: "outline", items: ["Other tools: **EBMT risk score** (age, stage, interval, donor, sex match), **KPS/ECOG**, geriatric assessment (Ch. 68).", "Infection screen: CMV, EBV, HSV, VZV, HBV, HCV, HIV, syphilis, TB (IGRA)."] },
        ],
        notes: "Discussion: how does HCT-CI change the conditioning intensity you would offer a 62-year-old with intermediate-risk AML?",
      },
      {
        ch: 12,
        title: "Donor selection",
        verified: false,
        blocks: [
          {
            type: "flow",
            dir: "tree",
            root: "Patient needs allogeneic HCT",
            branches: [
              { label: "1st choice", node: "HLA-matched sibling (MSD)", invert: true },
              { label: "if none", node: "10/10 or 8/8 matched unrelated (MUD)" },
              { label: "if none / urgent", node: "Haploidentical relative (PTCy)", then: ["or cord blood (Ch. 64)", "or 9/10 MMUD"] },
            ],
          },
          {
            type: "table",
            cols: ["Secondary factor", "Preference"],
            widths: [0.35, 0.65],
            rows: [
              ["Donor age", "Younger (< 35–40 y) beats closer HLA match among unrelated donors"],
              ["CMV serostatus", "Match to recipient; R+/D− is the highest-risk constellation"],
              ["Sex", "Avoid female donor for male recipient (cGVHD)"],
              ["ABO", "Not decisive; guides transfusion plan (Ch. 24)"],
              ["Donor-specific anti-HLA antibodies", "Avoid in mismatched settings (graft failure)"],
            ],
          },
        ],
      },
      {
        ch: 13,
        title: "Conditioning regimens",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Intensity", "Principle", "Typical patient", "Examples"],
            widths: [0.15, 0.32, 0.23, 0.3],
            rows: [
              ["MAC", "Ablates host marrow; irreversible cytopenia", "< 55–60 y, HCT-CI low", "Bu/Cy, Cy/TBI 12 Gy, Flu/Bu4"],
              ["RIC", "Partial ablation; relies on GVL", "55–70 y, comorbidity", "Flu/Bu2, Flu/Mel 140, Flu/Treo"],
              ["NMA", "Minimal cytopenia; mixed chimerism", "> 70 y or unfit", "Flu/TBI 2 Gy, Flu/Cy"],
            ],
          },
          {
            type: "outline",
            heading: "Reference doses (teaching values)",
            items: [
              "**Bu/Cy**: busulfan 3.2 mg/kg/day IV × 4 + cyclophosphamide 60 mg/kg × 2.",
              "**Cy/TBI**: TBI 12 Gy fractionated (6 × 2 Gy) + cyclophosphamide 60 mg/kg × 2.",
              "**Flu/Bu RIC**: fludarabine 150 mg/m² + busulfan 6.4 mg/kg IV (8 mg/kg oral).",
              "**Flu/Mel**: fludarabine + melphalan 140 mg/m²; Seattle NMA = fludarabine 90 mg/m² + TBI 2 Gy.",
            ],
          },
          { type: "note", text: "TBI late effects: pneumonitis, cataract, infertility, growth failure, secondary malignancy. Fractionation lowers toxicity." },
        ],
      },
      {
        ch: 14,
        title: "Selecting the stem cell source",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["", "Bone marrow", "Peripheral blood", "Cord blood"],
            widths: [0.22, 0.26, 0.26, 0.26],
            boldFirst: true,
            rows: [
              ["CD34+ dose", "Intermediate", "High", "Low (but immature)"],
              ["Neutrophil engraftment", "Slower (~ +5 days)", "Fastest", "Slowest (D+25–28)"],
              ["Chronic GVHD", "Lower", "Higher", "Lowest"],
              ["GVL", "Standard", "Stronger", "Intermediate"],
              ["Donor burden", "GA, 100–200 punctures", "G-CSF + apheresis", "None"],
              ["Preferred for", "Non-malignant disease, children, aplastic anaemia", "Adult malignancy", "No suitable adult donor"],
            ],
          },
          { type: "outline", items: ["Adult malignancies: PBSC is now used in most transplants worldwide.", "Non-malignant or paediatric: BM preferred because GVL is not needed and cGVHD is pure harm."] },
        ],
      },
      {
        ch: 15,
        title: "Bone marrow harvesting",
        verified: false,
        blocks: [
          { type: "flow", dir: "h", nodes: ["Donor work-up and consent", "General anaesthesia, prone position", "Multiple aspirations, posterior iliac crests", "Target 10–15 mL/kg recipient weight", "Filter, count, infuse or process"] },
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Targets", items: ["TNC ≥ 2–3 × 10⁸/kg recipient", "CD34+ ≥ 2 × 10⁶/kg recipient", "Volume usually 500–1000 mL", "Do not exceed ~ 20 mL/kg donor weight"] },
            right: { type: "outline", heading: "Donor safety", items: ["Local pain in almost all donors, resolves in days", "Autologous back-up transfusion in ~ 10%", "Serious (mostly anaesthetic) events < 0.5%", "Indicated when BM is the preferred source (Ch. 14)"] },
          },
        ],
      },
      {
        ch: 16,
        title: "Mobilisation and collection of PBSC",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Regimen", "Schedule", "Comment"],
            widths: [0.26, 0.4, 0.34],
            rows: [
              ["G-CSF alone", "10 µg/kg/day × 4–5 days; apheresis from day 5", "Standard for healthy donors and many autos"],
              ["G-CSF + plerixafor", "Plerixafor 0.24 mg/kg s.c. evening of day 4 (pre-emptive or rescue)", "For poor mobilisers; MM, lymphoma"],
              ["Chemotherapy + G-CSF", "e.g. cyclophosphamide 2–4 g/m² then G-CSF", "Highest yield, more toxicity"],
            ],
          },
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Target CD34+ dose", items: ["Auto: ≥ 2 × 10⁶/kg minimum, ≥ 5 × 10⁶/kg optimal (more for tandem)", "Allo: ≥ 4 × 10⁶/kg recipient"] },
            right: { type: "outline", heading: "Poor mobiliser (GITMO)", items: ["Peak blood CD34+ < 20/µL up to day 6, or", "< 2 × 10⁶/kg in ≤ 3 aphereses", "Predictors: prior lenalidomide, fludarabine, extensive RT, marrow involvement"] },
          },
        ],
      },
      {
        ch: 17,
        title: "Mobilisation and collection in children",
        verified: false,
        blocks: [
          {
            type: "outline",
            items: [
              "Small blood volume: extracorporeal circuit is a large fraction of total volume → **prime the circuit with red cells** when < 20 kg (some centres < 25 kg).",
              "Vascular access usually needs a central apheresis catheter; watch for hypocalcaemia (citrate) and hypothermia.",
              "G-CSF 10 µg/kg/day for 4–5 days; start apheresis when blood CD34+ ≥ 10–20/µL.",
              "Targets: ≥ 5 × 10⁶ CD34+/kg for autologous (higher for tandem), ≥ 4 × 10⁶/kg for allogeneic.",
              "Below ~ 10 kg bone marrow harvest is often technically easier than apheresis.",
            ],
          },
          { type: "flow", dir: "h", nodes: ["Weight, Hb, access checked", "Circuit primed if < 20 kg", "Apheresis 2–3 blood volumes", "Count CD34+; repeat next day if short"] },
        ],
      },
      {
        ch: 18,
        title: "Cord blood collection and banking",
        verified: false,
        blocks: [
          { type: "flow", dir: "h", nodes: ["Collection at delivery (in utero or ex utero)", "Volume reduction, red cell depletion", "Cryopreservation in liquid nitrogen", "Listing in registry (HLA, TNC, CD34+)", "Thaw and infuse within ~ 4 h"] },
          {
            type: "table",
            cols: ["Unit selection", "Threshold"],
            widths: [0.4, 0.6],
            rows: [
              ["HLA match", "≥ 4/6 (A, B antigen; DRB1 allele); 8-allele high-resolution now preferred"],
              ["TNC dose", "≥ 3 × 10⁷/kg recipient (single unit); cell dose outranks one extra mismatch"],
              ["CD34+ dose", "≥ 1.5 × 10⁵/kg"],
              ["Bank standards", "Eurocord / NetCord–FACT; minimum ~ 80 mL collection, TNC ≥ 5 × 10⁸ per unit for banking"],
            ],
          },
        ],
      },
      {
        ch: 19,
        title: "Graft manipulation: T-cell depletion",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Platform", "Principle", "Residual T cells", "Trade-off"],
            widths: [0.24, 0.32, 0.18, 0.26],
            rows: [
              ["CD34+ positive selection", "Magnetic bead enrichment of stem cells", "Very low (< 10⁴/kg)", "Slow immune recovery, infection, graft failure"],
              ["TCRαβ / CD19 depletion", "Removes αβ T and B cells; keeps γδ T, NK", "Low", "Preferred paediatric haplo platform"],
              ["CD3 / CD19 depletion", "Removes all T and B cells", "Intermediate", "Older approach"],
              ["In vivo (ATG, alemtuzumab)", "Serotherapy given to patient", "Variable", "Not graft manipulation but same goal"],
            ],
          },
          { type: "outline", items: ["Effect: GVHD ↓↓ but GVL ↓, infections ↑↑, graft failure ↑; often paired with add-back strategies.", "Regulatory: substantially manipulated grafts are ATMPs and need GMP facilities (Ch. 62)."] },
        ],
      },
      {
        ch: 20,
        title: "Processing, cryopreservation and quality control",
        verified: false,
        blocks: [
          { type: "flow", dir: "h", nodes: ["Receive product; identity and sterility checks", "CD34+ count by flow (ISHAGE)", "Add 10% DMSO", "Controlled-rate freezing ≈ −1 °C/min", "Store in liquid nitrogen ≤ −150 °C", "Rapid thaw at 37 °C, infuse at once"] },
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Release criteria", items: ["Viability (7-AAD) after thaw ≥ 70%", "CFU-GM as functional assay", "Sterility, endotoxin, labelling", "Chain of identity documented"] },
            right: { type: "outline", heading: "Infusion reactions", items: ["DMSO: nausea, flushing, bradycardia, hypertension", "Dose-limit DMSO ≈ 1 g/kg/day", "Haemolysis from red cell debris (ABO)", "Pre-medicate; monitor vitals"] },
          },
        ],
      },
      {
        ch: 21,
        title: "Engraftment and chimerism monitoring",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Term", "Definition"],
            widths: [0.3, 0.7],
            rows: [
              ["Neutrophil engraftment", "First of 3 consecutive days with ANC ≥ 0.5 × 10⁹/L"],
              ["Platelet engraftment", "Platelets ≥ 20 × 10⁹/L, 7 days transfusion-free"],
              ["Complete chimerism", "≥ 95% (or 100%) donor cells"],
              ["Mixed chimerism", "Donor < 95% with detectable recipient cells"],
              ["Split chimerism", "Different donor fractions in different lineages (e.g. T cells vs myeloid)"],
            ],
          },
          {
            type: "flow",
            dir: "tree",
            root: "Chimerism at D+30, +60, +100, then 3-monthly",
            branches: [
              { node: "Stable complete donor", then: ["Continue plan"] },
              { node: "Mixed, stable or rising donor", then: ["Repeat; lineage-specific (CD3)"] },
              { node: "Falling donor fraction", dashed: true, then: ["Taper IS, DLI, watch for graft failure or relapse"] },
            ],
          },
        ],
      },
    ],
  },
];
