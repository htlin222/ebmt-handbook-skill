// Part VIII (Ch.63-69) Specific modalities of HCT
module.exports = [
  {
    part: "Part VIII · Specific modalities",
    partTitle: "Specific Modalities of HCT",
    partBlurb: "At-home transplantation, cord blood, haploidentical HCT, extracorporeal photopheresis, obese and elderly patients, and HCT in resource-limited settings.",
    chapters: [
      {
        ch: 63,
        title: "At-home autologous HCT",
        verified: true,
        blocks: [
          {
            type: "outline",
            items: ["Concept: after conditioning and infusion the patient spends the aplastic phase at home (or hotel) with daily nurse visits or telemonitoring instead of on the ward.", "Benefits: fewer nosocomial infections and less C. difficile, better quality of life, lower cost, freed beds; similar safety in selected patients."],
          },
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Eligibility", items: ["KPS ≥ 80%, no severe organ dysfunction", "24-h caregiver at home", "Home within ~ 1 h of the centre", "Trained team, 24-h phone line, rapid readmission path"] },
            right: { type: "outline", heading: "Readmission causes (by frequency)", items: ["Fever / infection (≈ 50%)", "Mucositis with inability to eat or drink", "Pain control", "Need for intravenous hydration or transfusion"] },
          },
          { type: "flow", dir: "h", nodes: ["Home temperature ≥ 38 °C", "Call unit, come in immediately", "Cultures and antibiotics per febrile neutropenia protocol (Ch. 35)", "Continue at home if stable, or admit"] },
        ],
      },
      {
        ch: 64,
        title: "Umbilical cord blood transplantation",
        verified: true,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Advantages", items: ["Rapid availability (weeks), no donor risk", "Tolerates 1–2 HLA mismatches (4–6/6)", "Less chronic GVHD despite mismatch", "Strong GVL; low relapse in MRD+ leukaemia (Milano 2016)"] },
            right: { type: "outline", heading: "Disadvantages", items: ["Slow engraftment (neutrophils median D+25–28, platelets D+40–60)", "Higher graft failure and early infection", "Slow immune reconstitution; HHV-6, adenovirus", "Limited cell dose for adults; cost"] },
          },
          {
            type: "table",
            cols: ["Selection rule", "Threshold"],
            widths: [0.44, 0.56],
            rows: [
              ["Cell dose (single unit)", "TNC ≥ 3 × 10⁷/kg, CD34+ ≥ 1.5 × 10⁵/kg recipient"],
              ["HLA", "≥ 4/6 antigen-level; prefer ≥ 5/8 allele-level; avoid donor-specific antibodies"],
              ["Double cord", "Adults when no single unit reaches dose; one unit finally dominates"],
              ["Expansion products", "Omidubicel (UM171, nicotinamide-expanded) shortens neutrophil recovery"],
            ],
          },
          { type: "note", text: "Use of cord blood has fallen as haplo-PTCy grew; it remains valuable for rare HLA types, urgent transplants and children with non-malignant diseases." },
        ],
      },
      {
        ch: 65,
        title: "Haploidentical HCT",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Platform", "Principle", "Where used"],
            widths: [0.28, 0.42, 0.3],
            rows: [
              ["PTCy (Baltimore)", "Cyclophosphamide 50 mg/kg D+3, +4 kills alloreactive T cells; then tacrolimus + MMF", "Adults worldwide; BM or PBSC"],
              ["GIAC / Beijing", "G-CSF-primed BM + PBSC, ATG, intensive IS", "China"],
              ["TCRαβ/CD19 depletion", "Ex vivo removal of αβ T and B cells", "Children (Italy, Germany)"],
              ["CD34 selection ('megadose')", "Highly purified stem cells", "Historical (Perugia)"],
            ],
          },
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Outcomes with PTCy", items: ["aGVHD grade III–IV ≈ 10–15%, cGVHD moderate–severe ≈ 15–20%", "Survival comparable to matched unrelated donors in registry studies", "Slower CD4 recovery → more CMV: letermovir to D+100 or beyond"] },
            right: { type: "outline", heading: "Donor choice", items: ["Younger donor; avoid donor-specific anti-HLA antibodies (test MFI)", "Avoid mother and female-to-male if alternatives", "CMV-seropositive donor if recipient is positive", "KIR B haplotype / NK alloreactive donor in AML if available"] },
          },
        ],
      },
      {
        ch: 66,
        title: "Extracorporeal photopheresis",
        verified: true,
        blocks: [
          { type: "flow", dir: "h", nodes: ["Leukapheresis collects mononuclear cells", "8-MOP (psoralen) added", "UVA irradiation", "Reinfusion of apoptotic lymphocytes", "Tolerogenic DCs, Tregs ↑; no global IS"] },
          {
            type: "table",
            cols: ["Indication", "Response", "Typical schedule"],
            widths: [0.36, 0.36, 0.28],
            rows: [
              ["Steroid-refractory aGVHD (skin, liver, gut)", "Skin CR ≈ 60%; liver and gut lower", "2 consecutive days weekly, then taper"],
              ["cGVHD skin (sclerotic), mouth, liver", "Best responses; steroid-sparing", "2 days every 2 weeks for 3 months, then monthly"],
              ["Lung cGVHD (BOS)", "Stabilisation rather than improvement", "As above"],
            ],
          },
          { type: "outline", items: ["Advantages: very low toxicity, no increase in infection or relapse, combinable with drugs.", "Limits: venous access, time, cost; slow onset (allow 8–12 weeks before judging)."] },
        ],
      },
      {
        ch: 67,
        title: "HCT in overweight and obese patients",
        verified: true,
        blocks: [
          { type: "outline", items: ["Obesity changes drug distribution, protein binding and clearance; body-weight-based dosing can over- or under-dose.", "Obesity itself (BMI > 35 scores 1 in HCT-CI) modestly increases NRM; do not deny HCT on BMI alone."] },
          {
            type: "table",
            cols: ["Drug", "Dosing weight", "Note"],
            widths: [0.28, 0.32, 0.4],
            rows: [
              ["Busulfan", "Adjusted body weight (AIBW); TDM", "Target AUC; highly variable"],
              ["Cyclophosphamide", "Adjusted body weight", "ABW = IBW + 0.4 × (actual − IBW)"],
              ["Fludarabine", "Actual weight via BSA; cap BSA ≈ 2.0 m² or adjust for renal function", "Neurotoxicity if overdosed"],
              ["Melphalan", "BSA (some cap at 2.0 m²)", "Mucositis"],
              ["ATG, G-CSF", "Actual weight (G-CSF); ATG per protocol", "—"],
              ["Treosulfan, thiotepa", "BSA", "—"],
            ],
          },
          { type: "note", text: "IBW (Devine): men 50 kg, women 45.5 kg, plus 2.3 kg per inch over 152 cm. ABW = IBW + 0.4 × (actual − IBW). Calculator: hct_tools.py." },
        ],
      },
      {
        ch: 68,
        title: "HCT in elderly patients",
        verified: true,
        blocks: [
          {
            type: "outline",
            items: ["Age ≥ 60–65 years; now > 30% of allo-HCT in Europe thanks to RIC/NMA. Chronological age alone is not a contraindication.", "Main hazards: infection with slower immune recovery, poor tolerance of cGVHD, frailty and polypharmacy."],
          },
          {
            type: "table",
            cols: ["Tool", "What it captures", "Cut-off"],
            widths: [0.3, 0.42, 0.28],
            rows: [
              ["HCT-CI (± age)", "Comorbidity burden", "≥ 3 = high risk"],
              ["KPS", "Functional status", "≥ 70% expected"],
              ["Geriatric assessment", "IADL, cognition, gait speed, falls, nutrition, mood, polypharmacy", "Any impairment → prehabilitation, RIC/NMA"],
              ["EBMT / disease risk index", "Disease-related risk", "Balance against NRM"],
            ],
          },
          {
            type: "flow",
            dir: "tree",
            root: "Fit older patient with an HCT indication",
            branches: [
              { label: "HCT-CI 0–2, GA normal", node: "RIC (Flu/Bu2, Flu/Mel) with MSD or MUD", invert: true },
              { label: "HCT-CI ≥ 3 or frail", node: "NMA or non-transplant therapy; optimise then reassess", dashed: true },
            ],
          },
        ],
      },
      {
        ch: 69,
        title: "HCT in resource-limited settings",
        verified: false,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Constraints", items: ["Blood bank capacity (platelets), irradiators", "HLA typing and CMV/EBV PCR cost", "Cryopreservation, GMP processing", "Trained staff, ICU access, drug availability (letermovir, posaconazole, defibrotide)"] },
            right: { type: "outline", heading: "Strategies", items: ["Start with autologous HCT for myeloma and lymphoma", "Allo-HCT first with matched siblings; then haplo-PTCy (no registry costs)", "Fresh (non-cryopreserved) grafts, oral busulfan, cheaper prophylaxis (fluconazole, aciclovir)", "Twinning with established centres; WBMT and EBMT training; registry participation"] },
          },
          { type: "flow", dir: "h", nodes: ["Assess local blood, lab and ICU support", "Choose indications with best risk–benefit (SAA, thalassaemia, CML-BC, MM)", "Standard operating procedures, JACIE-inspired quality", "Report outcomes; expand stepwise"] },
        ],
      },
    ],
  },
];
