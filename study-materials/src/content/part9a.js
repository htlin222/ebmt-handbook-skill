// Part IX (Ch.70-81) Indications and results — first half
module.exports = [
  {
    part: "Part IX · Indications and results",
    partTitle: "Indications and Results by Disease",
    partBlurb: "Acute leukaemias, MDS and MPN, marrow failure, haemoglobinopathies, plasma cell disorders, lymphomas, immune deficiencies, autoimmune and metabolic diseases, solid tumours and CAR-T indications.",
    chapters: [
      {
        ch: 70,
        title: "AML in adults",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["ELN 2022 risk", "Allo-HCT in CR1", "Rationale"],
            widths: [0.32, 0.26, 0.42],
            rows: [
              ["Favourable (CBF, NPM1 without adverse, bZIP CEBPA)", "Not routinely", "Chemotherapy cures > 50%; transplant at MRD persistence or relapse"],
              ["Intermediate", "Yes, if donor available", "Relapse ≈ 50% with chemo alone; MRD status refines"],
              ["Adverse (TP53, complex or monosomal karyotype, ASXL1, RUNX1, FLT3-ITD high)", "Strongly", "Chemotherapy rarely curative; proceed at first CR"],
              ["MRD positive after induction / consolidation (any risk)", "Yes", "MRD trumps cytogenetic category"],
            ],
          },
          {
            type: "outline",
            items: [
              "Beyond CR1: allo-HCT still cures a third in CR2; active disease transplants have high NRM and relapse but sequential (FLAMSA-like) approaches exist.",
              "Conditioning: MAC for fit patients < 55–60 y (less relapse, BMT CTN 0901); RIC for older or comorbid; MRD+ may favour MAC or maintenance.",
              "Maintenance: FLT3 inhibitors for FLT3-ITD, HMA-based in trials (Ch. 58).",
              "**APL**: ATRA + arsenic cures without HCT; auto-HCT in second molecular remission, allo if MRD persists.",
            ],
          },
        ],
      },
      {
        ch: 71,
        title: "AML in children",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Risk group", "Features", "HCT in CR1"],
            widths: [0.18, 0.5, 0.32],
            rows: [
              ["Standard / low", "t(8;21), inv(16), NPM1, bZIP CEBPA, good MRD response", "No; HCT at relapse (CR2)"],
              ["Intermediate", "None of the others; MRD-guided", "Chemotherapy ± HCT if MSD"],
              ["High", "FLT3-ITD with high allelic ratio, KMT2A fusions other than t(9;11), monosomy 7, del(5q), TP53, 12p abnormalities, MRD > 0.1% after induction 2", "Yes, best donor available"],
            ],
          },
          {
            type: "outline",
            items: [
              "Conditioning: **busulfan-based** (Bu/Cy ± melphalan, Bu/Flu) preferred; avoid TBI for growth and endocrine late effects; treosulfan gaining ground.",
              "Infants and children < 2 y: busulfan dosed by weight bands with TDM; AUC targeting reduces SOS/VOD.",
              "FLT3-ITD: sorafenib maintenance after HCT (AAML1031 experience); MRD+ post-HCT → DLI with caution.",
              "Outcomes: 5-year OS after HCT in CR1 ≈ 60–70%; relapse remains the main failure.",
            ],
          },
        ],
      },
      {
        ch: 72,
        title: "ALL in adults",
        verified: true,
        blocks: [
          {
            type: "flow",
            dir: "tree",
            root: "Adult ALL in CR1",
            branches: [
              { label: "Ph-negative, MRD-negative, no high-risk features", node: "Continue paediatric-inspired chemotherapy", then: ["Monitor MRD"] },
              { label: "Ph-negative but high risk", node: "Allo-HCT in CR1", invert: true, then: ["Ph-like, KMT2A-r, ETP-ALL, hypodiploidy, MRD ≥ 10⁻⁴ after induction/consolidation, high WBC"] },
              { label: "Ph-positive", node: "TKI + chemotherapy → allo-HCT in CMR (or MRD-negative)", then: ["TKI maintenance after HCT (dasatinib, ponatinib); chemo-free blinatumomab + TKI reduces need in older patients"] },
            ],
          },
          {
            type: "outline",
            items: [
              "Conditioning: TBI-based MAC (Cy/TBI 12 Gy or Flu/TBI) gives less relapse than chemo-only in ALL; RIC for > 55 y.",
              "Relapsed / refractory: blinatumomab or inotuzumab to MRD-negative CR, then HCT; CD19 CAR-T (brexu-cel, obe-cel) as alternative or bridge.",
              "Post-HCT: MRD monitoring with IG/TR PCR; MRD+ → IS taper, DLI, blinatumomab or TKI.",
            ],
          },
        ],
      },
      {
        ch: 73,
        title: "ALL in children and adolescents",
        verified: true,
        blocks: [
          {
            type: "outline",
            heading: "HCT indications (CR1)",
            items: ["Induction failure; poor early MRD response (≥ 10⁻³ after consolidation on ALL-IC/AIEOP-BFM lines)", "Ph+ with poor MRD response; KMT2A::AFF1 infant ALL with high risk; hypodiploidy < 44 chromosomes", "Persistent MRD before HCT is the strongest adverse factor — clear it (blinatumomab, CAR-T)"],
          },
          {
            type: "table",
            cols: ["Element", "Recommendation (FORUM trial)"],
            widths: [0.3, 0.7],
            rows: [
              ["Donor", "MSD ≈ MUD (10/10 or 9/10); haplo (TCRαβ depletion or PTCy) if none; cord blood acceptable"],
              ["Source", "Bone marrow preferred (less cGVHD); PBSC for haplo depletion platforms"],
              ["Conditioning ≥ 4 years", "TBI 12 Gy + etoposide is superior to chemo-conditioning (FORUM): fewer relapses, better OS"],
              ["Conditioning < 4 years", "Chemotherapy: Flu/Thio/Bu or Flu/Thio/Treo"],
              ["Post-HCT", "MRD and chimerism at D+30, +60, +100, +180, then 3-monthly; pre-emptive IS taper or DLI"],
            ],
          },
        ],
      },
      {
        ch: 74,
        title: "MDS in adults",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["IPSS-R (score)", "IPSS-M", "Recommendation"],
            widths: [0.3, 0.26, 0.44],
            rows: [
              ["Very low (≤ 1.5) / Low (> 1.5–3)", "Very low / Low / Moderate-low", "Observe or supportive care; HCT delayed until progression (survival gain from waiting)"],
              ["Intermediate (> 3–4.5)", "Moderate-high", "Individualise: age, comorbidity, transfusion need, mutations (TP53, ASXL1, RUNX1)"],
              ["High (> 4.5–6) / Very high (> 6)", "High / Very high", "Allo-HCT as soon as feasible — only curative option (BMT CTN 1102 survival benefit)"],
            ],
          },
          {
            type: "outline",
            items: [
              "Pre-HCT therapy: HMA or intensive chemotherapy to reduce blasts ≥ 10%; complete remission is not required and delay carries risk.",
              "Conditioning: MAC or RIC give similar OS overall; MAC lowers relapse in fit younger patients; treosulfan-based (Flu/Treo) is a well-tolerated middle ground.",
              "TP53-mutated MDS: poor outcome regardless; HCT still offers the only long-term survival in a minority.",
              "Post-HCT relapse prevention: azacitidine-based maintenance or pre-emptive therapy on MRD/chimerism (Ch. 58).",
            ],
          },
        ],
      },
      {
        ch: 75,
        title: "MDS and JMML in children",
        verified: true,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Refractory cytopenia of childhood / advanced MDS", items: ["Allo-HCT is the only curative therapy; screen for germline predisposition (GATA2, SAMD9/9L, RUNX1)", "RCC with hypocellular marrow and normal karyotype: IST or watchful waiting possible; monosomy 7 → HCT", "Conditioning: Flu/Thio/Treo or Bu-based; avoid TBI; MSD or MUD preferred, haplo feasible"] },
            right: { type: "outline", heading: "JMML", items: ["RAS-pathway driven (PTPN11, NRAS, KRAS, CBL, NF1)", "Allo-HCT is the only cure for most; relapse 25–35% → early IS taper, second HCT works", "Bu/Cy/Mel or Bu/Flu conditioning; azacitidine bridging improves disease control", "CBL-germline and some NRAS cases may regress spontaneously — observe"] },
          },
          { type: "flow", dir: "h", nodes: ["Suspected paediatric MDS / JMML", "Morphology, cytogenetics, germline testing", "Risk assignment (blasts, karyotype, gene)", "Donor search at diagnosis", "HCT without delay in advanced disease"] },
        ],
      },
      {
        ch: 76,
        title: "MDS/MPN overlap syndromes",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Entity", "Key features", "HCT role"],
            widths: [0.26, 0.4, 0.34],
            rows: [
              ["CMML", "Monocytosis ≥ 0.5 × 10⁹/L and ≥ 10% of WBC; ASXL1, TET2, SRSF2; CPSS-Mol risk", "Allo-HCT for intermediate-2 / high CPSS-Mol in fit patients; HMA bridging optional"],
              ["Atypical CML (BCR::ABL1-negative)", "Dysplastic neutrophilia, SETBP1, ETNK1", "Poor prognosis → HCT if fit"],
              ["MDS/MPN with ring sideroblasts and thrombocytosis", "SF3B1 + JAK2", "Indolent; HCT rarely"],
              ["MDS/MPN unclassifiable", "Mixed features", "Individualised"],
            ],
          },
          { type: "outline", items: ["Mostly older patients → RIC (Flu/Bu, Flu/Mel, Flu/Treo).", "Relapse is the main problem; spleen size and high blast count predict worse outcome; consider ruxolitinib or HMA pre-HCT for proliferative disease."] },
        ],
      },
      {
        ch: 77,
        title: "Myeloproliferative neoplasms",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Myelofibrosis risk (DIPSS-plus, MIPSS70)", "HCT recommendation"],
            widths: [0.5, 0.5],
            rows: [
              ["Intermediate-2 or high", "Allo-HCT recommended in eligible patients (< 70 y)"],
              ["Intermediate-1", "Consider if transfusion-dependent, high-risk mutations (ASXL1, EZH2, SRSF2, IDH, U2AF1), triple-negative or > 2% blasts"],
              ["Low", "Not recommended"],
            ],
          },
          {
            type: "outline",
            items: [
              "Ruxolitinib bridging shrinks spleen and improves performance; continue until conditioning and taper to avoid rebound.",
              "Conditioning: Flu/Bu (RIC or MAC dose), Flu/Mel or Flu/Treo; splenectomy rarely, only for massive spleen with poor graft function history.",
              "Poor graft function and slow engraftment are common; monitor chimerism and driver-mutation MRD; DLI for molecular relapse works well.",
              "**CML**: HCT only for blast crisis (after TKI-induced second chronic phase), failure or intolerance of ≥ 2 TKIs including ponatinib/asciminib, or T315I with no options; results best in chronic phase.",
            ],
          },
        ],
      },
      {
        ch: 78,
        title: "Severe aplastic anaemia",
        verified: true,
        blocks: [
          {
            type: "flow",
            dir: "tree",
            root: "Confirmed acquired SAA (exclude inherited BMF, PNH, hypoplastic MDS)",
            branches: [
              { label: "< 40 y with MSD", node: "Upfront allo-HCT (MSD)", invert: true, then: ["Flu/Cy ± ATG; BM graft; CSA + MTX"] },
              { label: "≥ 40 y or no MSD", node: "IST: hATG + CSA + eltrombopag (RACE)", then: ["Response ≈ 70–80%; assess at 3–6 months"] },
              { label: "IST failure", node: "Allo-HCT from MUD or haplo", dashed: true, then: ["Flu/Cy/ATG ± TBI 2 Gy; PTCy-based haplo increasingly used"] },
            ],
          },
          {
            type: "outline",
            items: ["Upfront MUD HCT is a reasonable option in children and young adults when a 10/10 donor is quickly available.", "Avoid transfusion-related sensitisation: leucodepleted, irradiated products; minimise family-member donations.", "Graft rejection is the key risk: BM graft, ATG in conditioning, adequate CSA levels for ≥ 12 months.", "Late clonal evolution (PNH, MDS) after IST — monitor CBC and marrow."],
          },
        ],
      },
      {
        ch: 79,
        title: "Fanconi anaemia and inherited BMF syndromes",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Syndrome", "Defect", "HCT indication", "Special conditioning / issues"],
            widths: [0.2, 0.2, 0.28, 0.32],
            rows: [
              ["Fanconi anaemia", "DNA repair; chemo/radio hypersensitivity", "Transfusion-dependent BMF, clonal evolution, MDS/AML", "Low-dose Flu/Cy (± ATG, ± TBI ≤ 2 Gy); never standard MAC; lifelong head-and-neck SCC screening"],
              ["Dyskeratosis congenita / telomeropathies", "Telomere maintenance", "BMF; not the lung or liver disease", "RIC (Flu/Cy/alemtuzumab); pulmonary and hepatic fibrosis progress despite HCT"],
              ["Diamond-Blackfan anaemia", "Ribosomal", "Steroid-refractory transfusion dependence; MDS", "Flu/Bu or Flu/Treo RIC; OS > 85% with MSD/MUD"],
              ["Shwachman-Diamond", "Ribosomal (SBDS)", "Severe cytopenia, MDS/AML", "RIC; higher cardiotoxicity with high-dose Cy"],
              ["Severe congenital neutropenia", "ELANE, HAX1", "G-CSF-refractory, MDS/AML", "Standard conditioning"],
            ],
          },
          { type: "note", text: "Chromosomal breakage (DEB/MMC) testing and telomere length should precede HCT in any young patient with BMF; siblings must be tested before donating." },
        ],
      },
      {
        ch: 80,
        title: "Haemoglobinopathies",
        verified: true,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Sickle cell disease", items: ["Indications: stroke or silent infarcts, recurrent acute chest syndrome or vaso-occlusive crises despite hydroxyurea, alloimmunisation with transfusion need", "MSD HCT in children: EFS > 90%; Bu/Cy/ATG or Flu/Bu/ATG; conditioning-related seizures, PRES → keep platelets > 50, Hb 9–11, magnesium", "No MSD: haplo-PTCy with low-dose TBI or gene therapy (exa-cel, lovo-cel)"] },
            right: { type: "outline", heading: "Thalassaemia major", items: ["Pesaro class I–II: disease-free survival > 90% with MSD; class III (hepatomegaly, fibrosis, poor chelation) 75–85% with pre-HCT cytoreduction", "Age < 14 y and good chelation predict best outcome", "Bu/Cy/Thio or Flu/Bu/Thio; mixed chimerism > 25–30% donor is enough for transfusion independence", "Gene therapy (beti-cel, exa-cel) for those without MSD"] },
          },
          { type: "flow", dir: "h", nodes: ["Refer early (before organ damage)", "HLA type siblings; consider pre-implantation diagnosis", "Optimise iron, transfuse to suppress marrow", "HCT; watch graft rejection, SOS/VOD, seizures", "Long-term: fertility, iron unloading"] },
        ],
      },
      {
        ch: 81,
        title: "Multiple myeloma",
        verified: true,
        blocks: [
          { type: "flow", dir: "h", nodes: ["Induction 4–6 cycles: Dara-VRd (quadruplet) or VRd", "Mobilise: G-CSF ± plerixafor (after lenalidomide)", "Melphalan 200 mg/m² (140 if frail or renal) → auto-HCT", "Consolidation ± second (tandem) auto in high risk", "Lenalidomide maintenance until progression (± daratumumab)"] },
          {
            type: "table",
            cols: ["Question", "Current answer"],
            widths: [0.32, 0.68],
            rows: [
              ["Who is transplant-eligible?", "Fitness rather than age; usually ≤ 70–75 y with adequate organ function"],
              ["Upfront vs delayed auto?", "Upfront still improves PFS (IFM 2009, DETERMINATION); delayed acceptable in standard risk with MRD-negativity — debated"],
              ["Tandem auto?", "Consider for high-risk cytogenetics (del17p, t(4;14), t(14;16)) — EMN02/HO95"],
              ["Allo-HCT?", "Not standard; trials or young high-risk patients with early relapse; NRM 10–20%"],
              ["CAR-T / bispecifics?", "Ide-cel and cilta-cel from second line (KarMMa-3, CARTITUDE-4); teclistamab, elranatamab, talquetamab in relapsed disease; may reshape auto-HCT's role"],
            ],
          },
        ],
      },
    ],
  },
];
