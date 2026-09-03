// Part I (Ch.1-6) and Part II (Ch.7-10)
module.exports = [
  {
    part: "Part I · Introduction",
    partTitle: "Introduction",
    partBlurb: "History of HCT, the EBMT organisation, donor registries, unit requirements, JACIE accreditation and transplant statistics.",
    chapters: [
      {
        ch: 1,
        title: "History of HCT",
        verified: false,
        blocks: [
          { type: "flow", dir: "h", nodes: ["1950s–60s\nMarrow infusion after irradiation; canine models establish HLA matching", "1968\nFirst successful HLA-matched sibling HCT (SCID); E. D. Thomas", "1970s–90s\nCiclosporin; unrelated-donor registries (NMDP); cord blood", "2000s–now\nRIC/NMA, haplo-PTCy, CAR-T"] },
          {
            type: "outline",
            heading: "Why the milestones matter",
            items: [
              "Animal work (Storb, Thomas) showed histocompatibility, not just dose, determines engraftment and GVHD.",
              "Ciclosporin made GVHD controllable; registries and cord blood widened donor access.",
              "RIC/NMA conditioning extended eligibility beyond 70 years.",
              "Haploidentical PTCy made a donor available for almost every patient.",
              "CAR-T now competes with, and sometimes replaces, autologous HCT.",
            ],
          },
        ],
      },
      {
        ch: 2,
        title: "The EBMT: history, present and future",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Aspect", "Key facts"],
            widths: [0.3, 0.7],
            rows: [
              ["Founded", "1974, Paris; started as an informal network of European transplant centres"],
              ["Registry", "Largest HCT registry worldwide; >45,000 transplants reported per year"],
              ["Members", ">600 centres in ~47 countries"],
              ["Working Parties", "ALWP, CLWP, PDWP, LWP, TCWP, IDWP and others produce guidelines and studies"],
              ["Quality", "JACIE accreditation (with ISCT) — see Ch. 5"],
              ["Meeting", "Annual Meeting each spring"],
            ],
          },
          { type: "note", text: "Study point: the registry is the evidence base behind most EBMT recommendations quoted in this deck." },
        ],
      },
      {
        ch: 3,
        title: "Donor registries: connecting donors and recipients",
        verified: false,
        blocks: [
          { type: "flow", dir: "v", boxW: 4.6, nodes: ["Patient high-resolution HLA typing", "Registry search (WMDA / BMDW, NMDP, DKMS)", "Preliminary matches → donor contacted → confirmatory typing", "Best donor chosen: HLA, CMV, age, sex → medical work-up", "Collection scheduled (BM or PBSC) and shipped"] },
          {
            type: "outline",
            heading: "Scale",
            items: ["> 40 million registered adult donors and ~800,000 cord blood units worldwide.", "DKMS is the largest single registry (> 12 million donors).", "Cord blood banks (Eurocord, NetCord) require minimum TNC and CD34+ content."],
          },
        ],
      },
      {
        ch: 4,
        title: "Requirements of an HCT unit",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Domain", "Requirement"],
            widths: [0.32, 0.68],
            rows: [
              ["Inpatient ward", "HEPA-filtered, positive-pressure single rooms with own bathroom; visitor control"],
              ["Blood bank", "24-h supply; irradiated, leucodepleted / CMV-safe components"],
              ["HLA laboratory", "High-resolution typing of all relevant loci"],
              ["Cell processing", "GMP-grade collection and processing facility"],
              ["Support", "24-h radiology, ICU, microbiology, pharmacy"],
              ["CAR-T add-ons", "Apheresis, cold-chain logistics, CRS/ICANS expertise and equipment"],
            ],
          },
        ],
      },
      {
        ch: 5,
        title: "JACIE accreditation",
        verified: false,
        blocks: [
          {
            type: "outline",
            items: [
              "**JACIE** = Joint Accreditation Committee ISCT–EBMT; European quality system, aligned with FACT.",
              "Covers three areas: **clinical programme, collection, processing**.",
              "Accredited centres show lower NRM and better survival in registry analyses.",
              "In several countries accreditation is a prerequisite for reimbursement or authorisation.",
            ],
          },
          { type: "flow", dir: "h", nodes: ["Self-assessment", "Document review", "On-site inspection", "Corrective actions", "Accreditation (valid 4 years, with interim audit)"] },
        ],
      },
      {
        ch: 6,
        title: "Statistical methods in HCT",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Endpoint", "Definition", "Method"],
            widths: [0.22, 0.48, 0.3],
            rows: [
              ["OS", "Death from any cause", "Kaplan–Meier; Cox"],
              ["EFS / PFS / RFS", "Relapse, progression or death", "Kaplan–Meier; Cox"],
              ["NRM", "Death without relapse (competing with relapse)", "Cumulative incidence; Fine–Gray"],
              ["CIR", "Relapse (competing with NRM)", "Cumulative incidence; Gray's test"],
              ["GRFS", "Alive without relapse, grade III–IV aGVHD or severe cGVHD", "Kaplan–Meier"],
            ],
          },
          {
            type: "outline",
            heading: "Competing risks — the core idea",
            items: ["Relapse and NRM compete: a patient who dies of GVHD can no longer relapse.", "1 − Kaplan–Meier **overestimates** relapse because it censors competing deaths.", "Use cumulative incidence functions; landmark analysis for time-dependent covariates (e.g. GVHD)."],
          },
        ],
      },
    ],
  },
  {
    part: "Part II · Biological aspects",
    partTitle: "Biological Aspects",
    partBlurb: "Stem cell and immune cell biology, histocompatibility and immune reconstitution after transplant.",
    chapters: [
      {
        ch: 7,
        title: "Biological properties of haematopoietic stem cells",
        verified: false,
        blocks: [
          {
            type: "outline",
            items: [
              "**Self-renewal** and multilineage differentiation define the HSC.",
              "**Long-term HSC (LT-HSC)**: quiescent, strongest self-renewal, maintained in the bone marrow niche.",
              "After HCT the donor HSC pool replaces host haematopoiesis (measured as chimerism, Ch. 21).",
              "LT-HSCs are the target for ex vivo gene therapy (e.g. exa-cel for SCD and thalassaemia).",
            ],
          },
          { type: "flow", dir: "h", nodes: ["LT-HSC (quiescent)", "ST-HSC / MPP", "Committed progenitors", "Mature blood cells"] },
        ],
      },
      {
        ch: 8,
        title: "Biological properties of non-HSC cells",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Cell", "Role after HCT", "Clinical relevance"],
            widths: [0.22, 0.4, 0.38],
            rows: [
              ["αβ T cells", "Main effectors of GVHD and GVL", "Target of depletion strategies"],
              ["γδ T cells", "Innate-like; retained after TCRαβ/CD19 depletion", "Lower infection risk without GVHD"],
              ["Tregs", "Suppress alloreactivity", "Spared by PTCy → GVHD control"],
              ["NK cells", "Earliest lymphoid recovery (D+30–60); KIR-mediated alloreactivity", "GVL in AML, esp. haplo"],
              ["MSC", "Immunomodulatory, tissue repair", "Used off-label for steroid-refractory aGVHD"],
            ],
          },
        ],
      },
      {
        ch: 9,
        title: "Histocompatibility",
        verified: true,
        blocks: [
          {
            type: "outline",
            items: [
              "**MHC class I** (HLA-A, -B, -C) presents intracellular peptides to CD8+ T cells; **class II** (HLA-DR, -DQ, -DP) presents extracellular peptides to CD4+ T cells.",
              "Matching for HCT: **HLA-A, -B, -C, -DRB1 (8/8) ± DQB1 (10/10)** at high resolution; DPB1 permissiveness increasingly considered.",
            ],
          },
          {
            type: "table",
            cols: ["Donor / match", "GVHD risk", "Impact on NRM / survival"],
            widths: [0.34, 0.3, 0.36],
            rows: [
              ["10/10 matched sibling", "Lowest", "Reference"],
              ["10/10 matched unrelated", "Low", "Slightly higher than MSD"],
              ["9/10 mismatched unrelated", "Intermediate", "Each mismatch ≈ 10% lower survival"],
              ["Haploidentical (5/10)", "High without PTCy / T-cell depletion", "Acceptable with PTCy platform"],
            ],
          },
          {
            type: "outline",
            heading: "Non-HLA factors",
            items: ["**KIR** ligand mismatch: NK alloreactivity, possible GVL benefit in AML.", "**Minor histocompatibility antigens**: why GVHD occurs even between HLA-identical siblings.", "**Female donor → male recipient** (H-Y antigens): more chronic GVHD."],
          },
        ],
      },
      {
        ch: 10,
        title: "Immune reconstitution",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Compartment", "Recovery", "Clinical meaning"],
            widths: [0.3, 0.28, 0.42],
            rows: [
              ["Neutrophils", "D+14–28", "First barrier; engraftment"],
              ["NK cells", "D+30–60", "Early GVL"],
              ["CD8+ T cells", "3–6 months", "CMV / EBV control"],
              ["CD4+ T cells", "6–12 months (slower after TBI)", "Bacterial / fungal defence"],
              ["B cells, immunoglobulins", "12–24 months", "Timing of re-vaccination"],
            ],
          },
          {
            type: "cols",
            split: 0.5,
            left: {
              type: "outline",
              heading: "Slows reconstitution",
              items: ["Ex vivo T-cell depletion", "Chronic GVHD and its treatment", "Older age (thymic involution)", "Cord blood graft"],
            },
            right: {
              type: "outline",
              heading: "Monitoring (practical)",
              items: ["Lymphocyte subsets at D+30, +100, +180", "IgG < 4 g/L with recurrent infection → IVIG replacement", "CD4 < 200/µL → continue PJP prophylaxis"],
            },
          },
        ],
      },
    ],
  },
];
