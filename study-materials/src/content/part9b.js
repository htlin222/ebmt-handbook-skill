// Part IX (Ch.82-95) — second half, continues the same Part
const chapters = [
  {
    ch: 82,
    title: "Systemic light-chain (AL) amyloidosis",
    verified: false,
    blocks: [
      {
        type: "table",
        cols: ["Eligibility for auto-HCT", "Criterion"],
        widths: [0.4, 0.6],
        rows: [
          ["Cardiac", "Mayo stage I–II (NT-proBNP < 5000 ng/L, troponin T < 0.06 µg/L), NYHA ≤ II, LVEF > 40–45%, systolic BP ≥ 90"],
          ["Renal", "eGFR ≥ 30–50 mL/min (dialysis patients in selected centres)"],
          ["Performance", "ECOG ≤ 2, age ≤ 70, ≤ 2 organs severely involved"],
          ["Other", "No significant autonomic neuropathy, GI bleeding or pleural effusions"],
        ],
      },
      {
        type: "outline",
        items: [
          "Only ≈ 20–25% of patients qualify; strict selection has cut treatment-related mortality from > 20% to < 5%.",
          "Melphalan 200 mg/m² for fit patients, 140 mg/m² risk-adapted (age, renal function).",
          "Daratumumab-CyBorD (ANDROMEDA) is now standard induction and a strong non-transplant alternative; the incremental value of auto-HCT after Dara-CyBorD is under study.",
          "Aim: haematological CR/VGPR; consolidate with daratumumab or bortezomib-based therapy if < VGPR.",
        ],
      },
    ],
  },
  {
    ch: 83,
    title: "POEMS syndrome",
    verified: false,
    blocks: [
      {
        type: "table",
        cols: ["Letter", "Feature", "Status in diagnosis"],
        widths: [0.12, 0.5, 0.38],
        rows: [
          ["P", "Polyneuropathy (demyelinating, symmetric)", "Mandatory"],
          ["O", "Organomegaly, Castleman disease", "Minor"],
          ["E", "Endocrinopathy (not diabetes or thyroid alone)", "Minor"],
          ["M", "Monoclonal plasma cell disorder, almost always λ", "Mandatory"],
          ["S", "Skin changes; also sclerotic bone lesions, papilloedema, oedema, thrombocytosis; VEGF ↑", "Major (sclerotic lesions, Castleman, VEGF) / minor"],
        ],
      },
      { type: "flow", dir: "h", nodes: ["Diagnosis: ≥ 2 mandatory + 1 major + 1 minor", "Limited bone lesions: radiotherapy", "Disseminated: induction (lenalidomide-dexamethasone) → auto-HCT with Mel-200 (Mel-140 if renal)", "Neuropathy improves slowly over months–years; VEGF as response marker"] },
      { type: "note", text: "Outcomes: haematological and VEGF response > 80%, 5-year OS > 90%. Engraftment syndrome is frequent — pre-emptive steroids around neutrophil recovery." },
    ],
  },
  {
    ch: 84,
    title: "Indolent lymphomas",
    verified: false,
    blocks: [
      {
        type: "table",
        cols: ["Setting (follicular and other iNHL)", "Option", "Comment"],
        widths: [0.34, 0.26, 0.4],
        rows: [
          ["Chemosensitive relapse, esp. POD24", "Auto-HCT", "Prolongs PFS; used less since bispecifics and CAR-T; still relevant for early relapse after chemo-immunotherapy"],
          ["Multiple relapses, relapse after auto, transformation", "Allo-HCT (RIC)", "Strong GVL, plateau in survival; NRM 15–25%"],
          ["≥ 3rd line FL", "CD19 CAR-T (axi-cel ZUMA-5, tisa-cel ELARA, liso-cel)", "CR ≈ 70–80%; durable in most"],
          ["Relapsed FL", "Bispecifics (mosunetuzumab, epcoritamab), R² (lenalidomide-rituximab)", "Off-the-shelf alternatives"],
        ],
      },
      { type: "outline", items: ["Marginal zone and lymphoplasmacytic lymphoma: transplant only for multiply relapsed or transformed disease.", "Rituximab maintenance after auto-HCT improves PFS in FL."] },
    ],
  },
  {
    ch: 85,
    title: "Chronic lymphocytic leukaemia",
    verified: false,
    blocks: [
      { type: "outline", items: ["Targeted agents (BTK inhibitors, venetoclax, ± obinutuzumab) have made allo-HCT a late option; auto-HCT has no role."] },
      {
        type: "flow",
        dir: "tree",
        root: "CLL progressing on both BTK inhibitor and venetoclax",
        branches: [
          { node: "Fit, donor available", then: ["RIC allo-HCT (Flu/Bu, Flu/Cy ± ATG); GVL effect real, plateau ≈ 40% PFS"], invert: true },
          { node: "Prefer cellular therapy without allo", then: ["Liso-cel (TRANSCEND CLL 004) approved 2024 after BTKi and BCL2i; pirtobrutinib bridge"] },
          { node: "Richter transformation", then: ["Chemo-immunotherapy to CR then allo-HCT; checkpoint or CAR-T trials"] },
        ],
      },
      { type: "note", text: "Discuss allo-HCT before double-refractory disease develops; TP53 aberration alone no longer mandates transplant." },
    ],
  },
  {
    ch: 86,
    title: "Diffuse large B-cell lymphoma",
    verified: true,
    blocks: [
      {
        type: "flow",
        dir: "tree",
        root: "Relapsed or refractory DLBCL after R-CHOP(-like)",
        branches: [
          { label: "Primary refractory or relapse ≤ 12 months", node: "CD19 CAR-T second line: axi-cel (ZUMA-7), liso-cel (TRANSFORM)", invert: true, then: ["Tisa-cel did not beat SOC (BELINDA)"] },
          { label: "Late relapse > 12 months, chemosensitive", node: "Salvage (R-DHAP, R-ICE, R-GDP) → BEAM auto-HCT", then: ["Cure ≈ 40–50% if PET-negative before HCT"] },
          { label: "Not eligible for either", node: "Bispecifics (glofitamab, epcoritamab), polatuzumab-BR, tafasitamab-len, loncastuximab", dashed: true },
        ],
      },
      { type: "outline", items: ["CAR-T ≥ 3rd line: axi-cel (ZUMA-1), tisa-cel (JULIET), liso-cel (TRANSCEND) — durable CR ≈ 35–40%.", "Allo-HCT: relapse after auto-HCT or CAR-T in fit patients; RIC; NRM 20–30%, long-term PFS ≈ 30%.", "Auto-HCT in CR1 is not recommended outside trials, even for high IPI or double-hit lymphoma."] },
    ],
  },
  {
    ch: 87,
    title: "Mantle cell lymphoma",
    verified: false,
    blocks: [
      {
        type: "table",
        cols: ["Line", "Younger fit patients", "Comment"],
        widths: [0.16, 0.5, 0.34],
        rows: [
          ["First", "Cytarabine-containing induction (R-CHOP/R-DHAP, Nordic) + rituximab maintenance; auto-HCT consolidation", "TRIANGLE: ibrutinib added to induction and maintenance; auto-HCT adds little when ibrutinib is given — practice shifting"],
          ["Relapse", "BTK inhibitor (ibrutinib, acalabrutinib, zanubrutinib); pirtobrutinib after cBTKi", "Duration limited, especially TP53-mutated"],
          ["After BTKi failure", "Brexucabtagene autoleucel (ZUMA-2): ORR ≈ 90%, CR ≈ 65%", "Allo-HCT (RIC) for fit patients as alternative or after CAR-T"],
        ],
      },
      { type: "outline", items: ["TP53-mutated or blastoid MCL: poor response to chemo-immunotherapy and auto-HCT; consider early BTKi and cellular therapy.", "Allo-HCT retains GVL in MCL; NRM ≈ 20%; reserve for young patients with high-risk relapse."] },
    ],
  },
  {
    ch: 88,
    title: "Other aggressive lymphomas: T-cell, NK/T-cell, HIV-associated",
    verified: false,
    blocks: [
      {
        type: "table",
        cols: ["Entity", "Standard approach", "Transplant role"],
        widths: [0.26, 0.38, 0.36],
        rows: [
          ["ALK+ ALCL", "CHOP-based (brentuximab-CHP)", "Auto only at relapse"],
          ["PTCL-NOS, AITL, ALK− ALCL", "CHOP/CHOEP or BV-CHP", "Auto-HCT consolidation in CR1 (widely used, level II evidence); allo for relapse or CR1 in very high risk"],
          ["Relapsed PTCL", "Salvage (GDP, ICE), brentuximab, pralatrexate, romidepsin", "Allo-HCT (RIC) curative in ≈ 40%; auto if chemosensitive and not previously given"],
          ["Extranodal NK/T-cell (nasal)", "Asparaginase-based (SMILE, P-GemOx, DDGP) + radiotherapy", "Auto-HCT for advanced stage in CR; allo for relapse"],
          ["HIV-associated (DLBCL, Burkitt, HL)", "Standard chemo-immunotherapy with cART", "Auto-HCT with same outcomes as HIV-negative if HIV controlled; watch cART–chemo interactions (ritonavir, cobicistat)"],
        ],
      },
    ],
  },
  {
    ch: 89,
    title: "Hodgkin lymphoma",
    verified: false,
    blocks: [
      { type: "flow", dir: "h", nodes: ["Relapse or primary refractory HL", "Salvage: BV + nivolumab, or ICE/DHAP ± BV", "PET-negative CR → BEAM auto-HCT", "BV maintenance × 16 if high risk (AETHERA)", "Relapse after auto: PD-1 inhibitor, BV, then allo-HCT"] },
      {
        type: "table",
        cols: ["Question", "Answer"],
        widths: [0.34, 0.66],
        rows: [
          ["Best predictor of auto-HCT success", "PET-negative status before transplant (Deauville ≤ 3)"],
          ["Allo-HCT indication", "Relapse after auto-HCT in fit patients, ideally in response to PD-1 or BV; RIC; haplo-PTCy works well"],
          ["Checkpoint inhibitor before allo", "Effective bridge but more early severe aGVHD and hepatic SOS; leave ≥ 6 weeks, use PTCy"],
          ["Checkpoint inhibitor after allo", "Severe GVHD risk — only for relapse without alternatives, low dose, off IS"],
          ["Children", "Same principles; avoid TBI; auto-HCT for high-risk relapse"],
        ],
      },
    ],
  },
  {
    ch: 90,
    title: "Inborn errors of immunity (primary immunodeficiencies)",
    verified: false,
    blocks: [
      {
        type: "table",
        cols: ["Disease", "HCT urgency", "Approach"],
        widths: [0.3, 0.2, 0.5],
        rows: [
          ["SCID", "Emergency — transplant before infection (newborn screening)", "MSD without conditioning; MUD/haplo with RIC (Flu/Treo or Bu); TCRαβ/CD19 depletion for haplo; OS > 90% if < 3.5 months and infection-free"],
          ["Wiskott-Aldrich", "Early in childhood", "MAC/RTC Bu-based; full donor chimerism needed for platelets; gene therapy available"],
          ["Chronic granulomatous disease", "Elective, before organ damage", "RIC Flu/Bu/ATG or alemtuzumab; excellent survival"],
          ["Familial HLH", "After disease control", "HLH-94/2004 (etoposide, dexamethasone, CSA) or emapalumab → RIC HCT (Flu/Treo/alemtuzumab); mixed chimerism ≥ 20–30% protects"],
          ["CTLA4, LRBA, IPEX, others", "Individualised", "RIC; targeted drugs (abatacept, sirolimus) as bridge"],
        ],
      },
      { type: "outline", items: ["Goal is immune reconstitution, not eradication of malignancy → reduced-toxicity conditioning is standard.", "Pre-HCT: treat infections, immunoglobulin replacement, irradiated CMV-safe blood, avoid live vaccines."] },
    ],
  },
  {
    ch: 91,
    title: "HCT for autoimmune diseases",
    verified: false,
    blocks: [
      {
        type: "table",
        cols: ["Disease", "Who", "Evidence", "Regimen"],
        widths: [0.22, 0.3, 0.28, 0.2],
        rows: [
          ["Multiple sclerosis", "Relapsing, highly active despite high-efficacy DMT, EDSS ≤ 6.5, age < 50", "MIST RCT: 5-y progression 10% vs 75% with DMT", "Cy/ATG (auto)"],
          ["Systemic sclerosis", "Early diffuse (< 5 y), lung or heart involvement but no severe pulmonary hypertension", "ASTIS and SCOT RCTs: better long-term survival; TRM 3–10%", "Cy 200 mg/kg + ATG ± TBI (SCOT)"],
          ["Crohn's disease", "Refractory to biologics, unsuitable for surgery", "ASTIC: no remission benefit; selected centres", "Cy/ATG"],
          ["SLE, CIDP, NMOSD, type 1 diabetes", "Refractory cases", "Case series; trials", "Cy/ATG or BEAM"],
        ],
      },
      { type: "outline", items: ["Mechanism: immune reset — thymic re-education, new Treg and naive T-cell repertoire; autologous only, except rare allo for refractory cases (and CD19 CAR-T now being tested in SLE).", "Accredited centres with joint rheumatology or neurology teams; register in EBMT ADWP."] },
    ],
  },
  {
    ch: 92,
    title: "Inborn errors of metabolism",
    verified: false,
    blocks: [
      {
        type: "table",
        cols: ["Disease", "HCT indication", "Key point"],
        widths: [0.3, 0.36, 0.34],
        rows: [
          ["Hurler syndrome (MPS I-H)", "Diagnosis < 2–2.5 y, DQ > 70", "Standard of care; donor macrophages deliver enzyme; enzyme replacement as bridge"],
          ["Cerebral X-linked adrenoleukodystrophy", "Early cerebral disease (Loes 1–9), no major neurological deficit", "MSD/MUD HCT or lentiviral gene therapy (eli-cel); asymptomatic boys need MRI surveillance"],
          ["Krabbe disease, metachromatic leukodystrophy", "Pre-symptomatic (late-infantile) or early juvenile", "Gene therapy (atidarsagene) for MLD"],
          ["Osteopetrosis (malignant infantile)", "Early, before vision loss", "High SOS/VOD and pulmonary hypertension risk"],
          ["MPS II, VI, others", "Selected", "Limited CNS benefit; ERT preferred for many"],
        ],
      },
      { type: "outline", items: ["Full donor chimerism and normal enzyme levels matter: MAC (busulfan-based with TDM) or Flu/Treo; Bu/Flu/ATG standard.", "HCT halts progression; it does not reverse existing neurological damage — speed of referral determines outcome."] },
    ],
  },
  {
    ch: 93,
    title: "Neuroblastoma",
    verified: false,
    blocks: [
      { type: "flow", dir: "h", nodes: ["High-risk neuroblastoma (MYCN amplified, or stage M ≥ 18 months)", "Induction chemotherapy + PBSC collection", "Surgery of primary", "Bu/Mel high-dose therapy + auto-HCT (SIOPEN HR-NBL1 superior to CEM)", "Radiotherapy to primary; anti-GD2 (dinutuximab beta) + isotretinoin maintenance"] },
      {
        type: "outline",
        items: [
          "Tandem auto-HCT (thiotepa/Cy then CEM) improved EFS in COG ANBL0532 and is used in North America; single Bu/Mel is European standard.",
          "Bu/Mel toxicity: SOS/VOD (up to 20%) → busulfan TDM, defibrotide prophylaxis in some protocols; avoid prior 131I-MIBG close to HDT.",
          "Relapse: chemo-immunotherapy (irinotecan/temozolomide + dinutuximab), 131I-MIBG therapy; allo-HCT experimental.",
        ],
      },
    ],
  },
  {
    ch: 94,
    title: "Other solid tumours",
    verified: false,
    blocks: [
      {
        type: "table",
        cols: ["Tumour", "Auto-HCT role", "Regimen / evidence"],
        widths: [0.28, 0.36, 0.36],
        rows: [
          ["Germ cell tumours (relapsed, platinum-refractory)", "Established salvage; cures ≈ 50% of second-line, 20–40% later", "Tandem high-dose carboplatin/etoposide (TI-CE, Indiana); TIGER trial vs conventional"],
          ["Medulloblastoma / CNS embryonal tumours in children < 3–5 y", "Delays or avoids craniospinal irradiation", "Head Start, tandem thiotepa-based HDT"],
          ["Ewing sarcoma (high risk)", "Selected: Bu/Mel consolidation in localised high-risk (Euro-EWING 99 R2Loc)", "No benefit in primary metastatic (R3)"],
          ["Retinoblastoma (metastatic), Wilms (relapsed)", "Case series", "Thiotepa/carboplatin-based"],
          ["Breast, ovarian, small-cell lung cancer", "No role", "Negative randomised trials"],
        ],
      },
    ],
  },
  {
    ch: 95,
    title: "CAR-T in haematological malignancies: indications and results",
    verified: true,
    blocks: [
      {
        type: "table",
        cols: ["Disease", "Products", "Pivotal trials", "Key result"],
        widths: [0.22, 0.26, 0.24, 0.28],
        rows: [
          ["LBCL ≥ 3rd line", "Axi-cel, tisa-cel, liso-cel", "ZUMA-1, JULIET, TRANSCEND", "CR ≈ 40–55%; ≈ 35–40% long-term"],
          ["LBCL 2nd line (refractory or relapse ≤ 12 mo)", "Axi-cel, liso-cel", "ZUMA-7, TRANSFORM", "EFS and OS (axi-cel) superior to auto-HCT"],
          ["FL ≥ 3rd line", "Axi-cel, tisa-cel, liso-cel", "ZUMA-5, ELARA, TRANSCEND FL", "CR ≈ 70–80%"],
          ["MCL after BTKi", "Brexu-cel, liso-cel", "ZUMA-2, TRANSCEND MCL", "CR ≈ 65%"],
          ["B-ALL", "Tisa-cel (≤ 25 y), brexu-cel (adults), obe-cel", "ELIANA, ZUMA-3, FELIX", "CR 70–90%; ≈ 50% long-term"],
          ["Myeloma", "Ide-cel, cilta-cel", "KarMMa(-3), CARTITUDE-1/-4", "PFS gain in 2nd–4th line; cilta-cel CR > 80%"],
          ["CLL", "Liso-cel", "TRANSCEND CLL 004", "Approved 2024 after BTKi + BCL2i"],
        ],
      },
      { type: "outline", items: ["CAR-T vs allo-HCT after CAR-T in B-ALL: consolidative allo improves outcome in adults and in children with early B-cell recovery or MRD; not needed for all.", "Relapse after CAR-T: CD19-negative escape, short persistence; options include allo-HCT, bispecifics, alternative-target CAR-T.", "Registry follow-up (EBMT CTIWP) is mandatory: late cytopenias, infections, second malignancies (T-cell lymphoma reports 2024)."] },
    ],
  },
];

// Attach to the same Part as part9a: export a Part with a flag so build.js merges it.
module.exports = [
  {
    part: "Part IX · Indications and results",
    partTitle: "Indications and Results by Disease",
    continuation: true,
    chapters,
  },
];
