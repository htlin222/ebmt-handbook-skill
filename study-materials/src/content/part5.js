// Part V (Ch.35-47) HCT complications
module.exports = [
  {
    part: "Part V · Complications",
    partTitle: "HCT Complications",
    partBlurb: "Febrile neutropenia, bacterial, fungal, viral and other infections, bleeding and thrombosis, graft failure, endothelial syndromes, acute and chronic GVHD, PTLD, iron overload and secondary malignancies.",
    chapters: [
      {
        ch: 35,
        title: "Febrile neutropenia",
        verified: true,
        blocks: [
          { type: "outline", items: ["Definition: temperature ≥ 38.3 °C once or ≥ 38.0 °C for 1 h with ANC < 0.5 × 10⁹/L. **Every HCT recipient counts as high risk.**"] },
          {
            type: "flow",
            dir: "v",
            boxW: 5.4,
            nodes: [
              "Blood cultures × 2 (peripheral + each CVC lumen), urine, CXR; do not delay antibiotics",
              "Within 60 min: piperacillin-tazobactam 4.5 g q6–8h or cefepime 2 g q8h (meropenem if MDR-GN colonisation or septic shock)",
              "Add vancomycin only for catheter or skin infection, MRSA colonisation, haemodynamic instability",
              "Reassess at 48–72 h: culture results, de-escalate or switch",
              "Persistent fever ≥ 4 days: chest CT, galactomannan, add mould-active antifungal (empiric or diagnostic-driven)",
            ],
            invert: [1],
          },
          { type: "note", text: "Stop empirical antibiotics after 72 h if afebrile ≥ 48 h, cultures negative and patient stable, even before neutrophil recovery (ECIL-4). Check the calculator: scripts/hct_tools.py print_checklist('fn')." },
        ],
      },
      {
        ch: 36,
        title: "Bacterial infections",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Organism", "Typical setting", "Treatment"],
            widths: [0.28, 0.32, 0.4],
            rows: [
              ["Coagulase-negative staphylococci", "CVC, most frequent bacteraemia", "Vancomycin; often keep catheter"],
              ["S. aureus / MRSA", "CVC, skin", "Vancomycin (daptomycin, ceftaroline alt.); remove CVC"],
              ["VRE", "Prolonged hospitalisation, prior vancomycin", "Linezolid or daptomycin"],
              ["Pseudomonas", "Mucositis, neutropenia", "Pip-tazo, cefepime or meropenem; ceftolozane-tazobactam if resistant"],
              ["ESBL Enterobacterales", "Colonisation", "Carbapenem"],
              ["KPC carbapenemase", "Colonisation, outbreaks", "Ceftazidime-avibactam or meropenem-vaborbactam"],
              ["Metallo-β-lactamase (NDM, VIM)", "Colonisation", "Ceftazidime-avibactam + aztreonam, or cefiderocol"],
              ["C. difficile", "Antibiotics, PPI", "Oral vancomycin or fidaxomicin"],
            ],
          },
          { type: "outline", items: ["Bacteraemia: treat 7–14 days from first negative culture; longer for S. aureus.", "Fluoroquinolone prophylaxis during neutropenia is used in many centres but drives resistance — decide locally."] },
        ],
      },
      {
        ch: 37,
        title: "Invasive fungal infections",
        verified: true,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Risk", items: ["High: allo-HCT, neutropenia > 10 days, high-dose steroids, GVHD, cord blood, CMV", "Intermediate: auto-HCT for lymphoma or myeloma", "Agents: Aspergillus fumigatus (most), Candida, Mucorales, Fusarium"] },
            right: { type: "outline", heading: "Diagnosis", items: ["Chest CT: halo sign early, air-crescent late", "Galactomannan: BAL more sensitive than serum; falsely low on mould-active prophylaxis", "β-D-glucan: broad, negative in mucormycosis", "Aspergillus PCR, culture and histology when possible"] },
          },
          {
            type: "table",
            cols: ["Situation", "Drug", "Dose"],
            widths: [0.36, 0.34, 0.3],
            rows: [
              ["Prophylaxis, low mould risk", "Fluconazole", "400 mg/day (no mould cover)"],
              ["Prophylaxis, GVHD on steroids", "Posaconazole", "300 mg/day (after loading)"],
              ["Invasive aspergillosis 1st line", "Voriconazole", "6 mg/kg q12h × 2, then 4 mg/kg q12h; TDM 1–5.5 mg/L"],
              ["Alternatives", "Isavuconazole or liposomal amphotericin B", "L-AmB 3 mg/kg/day"],
              ["Mucormycosis", "L-AmB + surgical debridement", "5–10 mg/kg/day; isavuconazole or posaconazole step-down"],
            ],
          },
        ],
      },
      {
        ch: 38,
        title: "Viral infections",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Virus", "Monitoring", "Prevention / treatment"],
            widths: [0.16, 0.34, 0.5],
            rows: [
              ["CMV", "Weekly PCR to D+100 (D+180–200 if high risk)", "Letermovir prophylaxis in R+ to D+100 (D+200 high risk). Pre-emptive: ganciclovir 5 mg/kg q12h or foscarnet. Refractory/resistant: maribavir"],
              ["EBV", "Weekly PCR if ATG, T-cell depletion, haplo, cord", "Rising DNA → rituximab 375 mg/m² pre-emptive; PTLD see Ch. 45"],
              ["HHV-6", "PCR when encephalitis suspected", "Foscarnet or ganciclovir; limbic encephalitis around engraftment"],
              ["Adenovirus", "PCR in children, TCD, haplo", "Reduce IS; cidofovir; virus-specific T cells"],
              ["BK virus", "Urine/plasma PCR if haematuria", "Haemorrhagic cystitis (Ch. 51)"],
              ["RSV, influenza, SARS-CoV-2", "Respiratory PCR", "Treat upper-tract disease early: ribavirin ± IVIG (RSV), oseltamivir, nirmatrelvir/remdesivir"],
              ["HSV / VZV", "—", "Aciclovir prophylaxis for all seropositives ≥ 1 year (longer with cGVHD)"],
            ],
          },
          { type: "note", text: "Highest CMV risk: seropositive recipient with seronegative donor (R+/D−), haplo-PTCy, cord blood, ATG, steroids." },
        ],
      },
      {
        ch: 39,
        title: "Other severe infections: toxoplasma, TB, NTM",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Infection", "Who is at risk", "Screen / prevent", "Treat"],
            widths: [0.18, 0.28, 0.27, 0.27],
            rows: [
              ["Toxoplasmosis", "Seropositive recipient, cord, TCD, steroids", "Serology pre-HCT; TMP-SMX (also covers PJP); PCR monitoring if high risk", "Pyrimethamine + sulfadiazine + folinic acid; TMP-SMX alternative"],
              ["Tuberculosis", "Endemic exposure, prior TB", "IGRA (preferred over TST); latent TB → isoniazid 6–9 months", "Standard 4-drug therapy; rifampicin crashes CNI levels (Ch. 31)"],
              ["Non-tuberculous mycobacteria", "CVC, cGVHD, lung disease", "None routine", "Species-directed (e.g. macrolide + ethambutol + rifabutin for MAC); remove catheter"],
              ["Pneumocystis", "All allo, auto with steroids", "TMP-SMX from engraftment ≥ 6 months (longer on IS)", "High-dose TMP-SMX ± steroids"],
              ["Strongyloides", "Tropical exposure", "Serology; ivermectin before conditioning", "Ivermectin"],
            ],
          },
        ],
      },
      {
        ch: 40,
        title: "Bleeding and thrombotic complications",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Problem", "Risk factors", "Management"],
            widths: [0.28, 0.34, 0.38],
            rows: [
              ["Catheter-related DVT / PE", "CVC, immobility, cancer, prior VTE", "LMWH; hold if platelets < 50 (< 30 with caution); keep working catheter"],
              ["TA-TMA", "CNI, sirolimus, CMV, GVHD, complement variants", "Stop CNI, treat trigger, eculizumab (Ch. 42)"],
              ["SOS/VOD hepatic outflow", "See Ch. 49", "Defibrotide"],
              ["Bleeding", "Thrombocytopenia, mucositis, GVHD, coagulopathy", "Platelets to > 50 if bleeding, fibrinogen > 1.5 g/L, treat cause"],
              ["Diffuse alveolar haemorrhage", "Engraftment, conditioning", "High-dose steroids (Ch. 52)"],
              ["Haemorrhagic cystitis", "Cyclophosphamide, BK virus", "Hydration, irrigation (Ch. 51)"],
            ],
          },
          { type: "outline", items: ["Thrombocytopenia is the dominant cause of bleeding; prophylactic platelets at < 10 × 10⁹/L (Ch. 24).", "Pharmacological VTE prophylaxis is generally withheld while platelets are < 50 × 10⁹/L; mechanical prophylaxis instead."] },
        ],
      },
      {
        ch: 41,
        title: "Graft failure",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Term", "Definition"],
            widths: [0.28, 0.72],
            rows: [
              ["Primary graft failure", "No neutrophil engraftment (ANC < 0.5 × 10⁹/L) by D+28 (BM/PBSC) or D+42 (cord blood)"],
              ["Secondary graft failure", "Loss of donor haematopoiesis after initial engraftment"],
              ["Poor graft function", "Cytopenias with full donor chimerism (no rejection)"],
              ["Graft rejection", "Loss of donor cells with recovery of recipient haematopoiesis (immune-mediated)"],
            ],
          },
          {
            type: "flow",
            dir: "tree",
            root: "Cytopenia after HCT",
            branches: [
              { node: "Full donor chimerism", then: ["Poor graft function: G-CSF, TPO agonist, treat CMV/drugs, CD34+ boost"] },
              { node: "Falling donor chimerism", dashed: true, then: ["Rejection: reduce IS? second HCT with different donor and lymphodepleting conditioning"] },
              { node: "Marrow relapse", then: ["Disease-directed therapy"] },
            ],
          },
          { type: "note", text: "Risk factors: HLA mismatch, donor-specific antibodies, low cell dose, T-cell depletion, RIC in non-malignant disease, viral infection (CMV, HHV-6), myelotoxic drugs." },
        ],
      },
      {
        ch: 42,
        title: "Early complications of endothelial origin",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Syndrome", "Timing", "Key features", "Treatment"],
            widths: [0.2, 0.15, 0.37, 0.28],
            rows: [
              ["SOS / VOD", "< 21 d (late forms exist)", "Bilirubin ↑, painful hepatomegaly, weight gain, ascites", "Defibrotide (Ch. 49)"],
              ["Engraftment syndrome / capillary leak", "Around ANC recovery", "Fever, rash, pulmonary infiltrates, weight gain", "Steroids, diuretics"],
              ["TA-TMA", "Weeks to months", "Schistocytes, LDH ↑, thrombocytopenia, proteinuria, hypertension, renal injury", "Stop CNI/sirolimus, treat trigger, eculizumab"],
              ["Diffuse alveolar haemorrhage", "D+10 – D+30", "Hypoxia, bloody BAL without infection", "High-dose steroids"],
              ["PRES", "Any, CNI-related", "Headache, seizures, visual loss, posterior oedema on MRI", "Switch/stop CNI, control BP"],
            ],
          },
          { type: "outline", items: ["Common mechanism: endothelial activation by conditioning, cytokines, CNI, infection and alloreactivity.", "Endothelial Activation and Stress Index (EASIX = LDH × creatinine / platelets) predicts these syndromes."] },
        ],
      },
      {
        ch: 43,
        title: "Acute GVHD",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Organ", "Stage 1", "Stage 2", "Stage 3", "Stage 4"],
            widths: [0.14, 0.215, 0.215, 0.215, 0.215],
            boldFirst: true,
            rows: [
              ["Skin (rash)", "< 25% BSA", "25–50% BSA", "> 50% BSA", "Generalised erythroderma with bullae / desquamation"],
              ["Liver (bilirubin)", "2–3 mg/dL", "3.1–6 mg/dL", "6.1–15 mg/dL", "> 15 mg/dL"],
              ["Gut (stool volume)", "500–999 mL/day or persistent nausea", "1000–1500 mL/day", "> 1500 mL/day", "Severe pain, ileus, or grossly bloody stool"],
            ],
          },
          {
            type: "cols",
            split: 0.42,
            left: { type: "table", cols: ["Grade", "Criteria (MAGIC)"], widths: [0.25, 0.75], rows: [["I", "Skin 1–2 only"], ["II", "Skin 3, or liver 1, or gut 1"], ["III", "Liver 2–3 or gut 2–3"], ["IV", "Stage 4 of any organ"]] },
            right: {
              type: "flow",
              dir: "v",
              boxW: 3.3,
              nodes: ["Grade II–IV: methylprednisolone 2 mg/kg/day, continue CNI", "Response at day 5–7?", "CR/PR: taper over weeks · No response: ruxolitinib 5–10 mg bid"],
              dashed: [1],
              invert: [0],
            },
          },
          { type: "note", text: "Classic aGVHD ≤ D+100; late-onset aGVHD > D+100 (after RIC or DLI). Steroid-refractory: ruxolitinib (REACH2) is first choice; alternatives ECP, MMF, etanercept, ATG, MSC, faecal transplant in trials. Calculator: hct_tools.grade_acute_gvhd()." },
        ],
      },
      {
        ch: 44,
        title: "Chronic GVHD",
        verified: true,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Epidemiology and risk", items: ["30–70% of allo-HCT; leading cause of late NRM", "Prior aGVHD, PBSC graft, unrelated or mismatched donor, older age, female → male, no ATG/PTCy"] },
            right: { type: "outline", heading: "NIH 2014 diagnosis", items: ["≥ 1 diagnostic sign (poikiloderma, lichen planus-like, sclerosis, oesophageal web, BOS) or", "≥ 1 distinctive sign plus biopsy or test confirmation", "Organs: skin, mouth, eyes, GI, liver, lung, joints/fascia, genital"] },
          },
          {
            type: "table",
            cols: ["NIH global severity", "Rule"],
            widths: [0.3, 0.7],
            rows: [["Mild", "1–2 organs, each score 1 (lung 0)"], ["Moderate", "≥ 3 organs score 1, or any organ score 2, or lung score 1"], ["Severe", "Any organ score 3, or lung score ≥ 2"]],
          },
          {
            type: "table",
            cols: ["Line", "Options"],
            widths: [0.2, 0.8],
            rows: [
              ["First", "Prednisone 1 mg/kg/day ± CNI; taper over 6–12 months; topical therapy for limited disease"],
              ["Second", "Ruxolitinib 10 mg bid (REACH3), belumosudil 200 mg/day, ibrutinib 420 mg/day, ECP (skin, mouth, liver), MMF, sirolimus, imatinib for sclerosis"],
              ["Supportive", "Infection prophylaxis, IVIG if hypogammaglobulinaemia, physiotherapy, eye and dental care, bone protection"],
            ],
          },
        ],
      },
      {
        ch: 45,
        title: "Post-transplant lymphoproliferative disorders",
        verified: false,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Classification (WHO)", items: ["Non-destructive lesions (plasmacytic hyperplasia, IM-like)", "Polymorphic PTLD", "Monomorphic PTLD — DLBCL most common", "Classic Hodgkin-type PTLD"] },
            right: { type: "outline", heading: "Risk factors", items: ["T-cell depletion, ATG, alemtuzumab", "HLA mismatch, haplo, cord blood", "EBV-seronegative recipient with seropositive donor", "Severe GVHD and intense immunosuppression"] },
          },
          {
            type: "flow",
            dir: "v",
            boxW: 5.2,
            nodes: ["Weekly EBV DNA PCR in high-risk patients (first 3–4 months)", "EBV DNA above local threshold → pre-emptive rituximab 375 mg/m² ± reduce IS", "Clinical PTLD: PET-CT, biopsy, LDH; rituximab weekly × 4", "Refractory: chemotherapy (R-CHOP) or EBV-specific cytotoxic T cells (tabelecleucel)"],
            invert: [1],
          },
        ],
      },
      {
        ch: 46,
        title: "Iron overload",
        verified: true,
        blocks: [
          {
            type: "outline",
            items: [
              "Source: transfusion (≈ 200–250 mg iron per red cell unit) plus ineffective erythropoiesis; no physiological excretion.",
              "Pre-HCT iron overload associates with more infection (Aspergillus, mucormycosis), SOS/VOD and NRM — ferritin > 1000 ng/mL is a crude marker (inflammation confounds).",
              "Quantify with **MRI (T2* or R2) liver iron concentration**; transferrin saturation; cardiac MRI if very high burden.",
            ],
          },
          {
            type: "flow",
            dir: "tree",
            root: "Iron overload after HCT with stable engraftment",
            branches: [
              { label: "Hb > 11–12 g/dL", node: "Phlebotomy (first choice)", invert: true, then: ["e.g. 6 mL/kg every 2–4 weeks until ferritin < 500"] },
              { label: "Anaemic or not feasible", node: "Oral chelation: deferasirox (monitor creatinine, liver)", then: ["Deferiprone alternative"] },
              { label: "Severe / cardiac", node: "Deferoxamine s.c. or i.v. infusion", then: ["Combination therapy"] },
            ],
          },
        ],
      },
      {
        ch: 47,
        title: "Secondary malignancies",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Type", "Main risk factors", "Timing", "Screening"],
            widths: [0.24, 0.3, 0.16, 0.3],
            rows: [
              ["PTLD (EBV)", "T-cell depletion, mismatch", "First year", "EBV PCR (Ch. 45)"],
              ["Therapy-related MDS/AML", "Alkylators, etoposide, TBI; mostly after auto-HCT", "2–10 years", "CBC; marrow if cytopenias"],
              ["Solid tumours: skin (SCC, BCC), oral, thyroid, breast, oesophagus, liver", "TBI, cGVHD, prolonged IS, HPV, young age at TBI", "> 5–10 years, rising with time", "Yearly skin and oral exam, TSH, mammography from age 25 or 8 y after chest RT, HPV vaccination, avoid sun and tobacco"],
              ["Donor cell leukaemia", "Rare", "Any", "Chimerism plus morphology"],
            ],
          },
          { type: "outline", items: ["Cumulative incidence of solid cancers ≈ 2–3× the general population, still rising at 20 years.", "Survivorship visits should include cancer screening at least as intensive as age-matched population guidelines."] },
        ],
      },
    ],
  },
];
