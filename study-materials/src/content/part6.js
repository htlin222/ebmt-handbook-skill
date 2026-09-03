// Part VI (Ch.48-56) Organ-specific complications
module.exports = [
  {
    part: "Part VI · Organ-specific complications",
    partTitle: "Organ-Specific Complications",
    partBlurb: "Eye and mouth, liver and SOS/VOD, gut, bladder and kidney, lung, nervous system, skin and musculoskeletal, cardiovascular and metabolic, endocrine and fertility.",
    chapters: [
      {
        ch: 48,
        title: "Ocular and oral complications",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Eye problem", "Clues", "Management"],
            widths: [0.26, 0.34, 0.4],
            rows: [
              ["Dry eye (ocular cGVHD)", "Burning, photophobia; Schirmer ≤ 5 mm/5 min, OSDI > 23", "Preservative-free tears, punctal plugs, topical ciclosporin, scleral lenses, ECP"],
              ["Cataract", "After TBI or steroids", "Ophthalmology; surgery"],
              ["CMV retinitis", "Floaters, field loss", "Intravenous ganciclovir ± intravitreal"],
              ["Orbital / sinus mould", "Proptosis, pain", "L-AmB + surgery"],
            ],
          },
          {
            type: "table",
            cols: ["Oral problem", "Phase", "Management"],
            widths: [0.26, 0.24, 0.5],
            rows: [
              ["Mucositis", "Peak D+7–14", "Oral care protocol, cryotherapy (melphalan), palifermin (auto-HCT with TBI), opioid PCA"],
              ["HSV reactivation", "Early", "Aciclovir prophylaxis for all seropositive patients"],
              ["Oral cGVHD", "Late", "Topical clobetasol or tacrolimus, dexamethasone rinse; pilocarpine for xerostomia; yearly cancer screen"],
              ["Dental", "Pre-HCT and yearly", "Clear infection foci before conditioning"],
            ],
          },
        ],
      },
      {
        ch: 49,
        title: "Hepatic complications and SOS/VOD",
        verified: true,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "EBMT adult criteria (2016)", items: ["Classical (≤ 21 days): bilirubin ≥ 2 mg/dL **plus two of** painful hepatomegaly, weight gain > 5%, ascites", "Late-onset (> 21 days): classical criteria, or histology, or ≥ 2 criteria with ultrasound/haemodynamic evidence", "2023 refined criteria add imaging and remove the strict day-21 cut-off"] },
            right: { type: "outline", heading: "Risk factors", items: ["Busulfan-based MAC, TBI", "Gemtuzumab or inotuzumab before HCT", "Second HCT, pre-existing liver disease, iron overload", "SCD, thalassaemia, osteopetrosis, HLH in children (incidence 20–40%)", "Sirolimus, norethisterone"] },
          },
          {
            type: "table",
            cols: ["Severity", "Bilirubin kinetics / organ failure", "Action"],
            widths: [0.18, 0.5, 0.32],
            rows: [
              ["Mild", "Bilirubin ≥ 2 and < 3, slow rise, no organ failure", "Supportive"],
              ["Moderate", "3–5 mg/dL or rise over 2–5 days", "Consider defibrotide"],
              ["Severe", "5–8 mg/dL, doubling within 48 h, renal or lung involvement", "Defibrotide now"],
              ["Very severe", "> 8 mg/dL or multi-organ failure", "Defibrotide; ICU; mortality > 80%"],
            ],
          },
          { type: "outline", items: ["**Defibrotide** 6.25 mg/kg q6h (25 mg/kg/day) for ≥ 21 days — only approved drug; fluid restriction, diuretics, avoid nephrotoxins; no benefit shown for prophylaxis in adults (HARMONY).", "Differentials: drug hepatotoxicity, hepatic GVHD, viral hepatitis, cholestasis of sepsis, TPN."] },
        ],
      },
      {
        ch: 50,
        title: "Gastrointestinal complications",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Timing", "Main causes"],
            widths: [0.26, 0.74],
            rows: [
              ["Conditioning", "Mucositis, chemotherapy/TBI-induced nausea and vomiting"],
              ["D0 – D+30", "Infectious enteritis (C. difficile, CMV, norovirus, adenovirus), acute GVHD, drug toxicity (MMF, MTX)"],
              ["> D+30", "Chronic GVHD (oesophageal web, strictures, malabsorption), infections, pancreatic insufficiency"],
            ],
          },
          {
            type: "flow",
            dir: "tree",
            root: "Diarrhoea after engraftment",
            branches: [
              { node: "Stool tests: C. difficile, viral PCR, culture", then: ["Positive → treat (oral vancomycin / fidaxomicin, ganciclovir)"] },
              { node: "Negative → endoscopy with biopsies (rectosigmoid ± upper)", dashed: true, then: ["Apoptotic crypts → gut GVHD: MP 2 mg/kg + CNI (Ch. 43)"] },
              { node: "Consider drugs, MMF colitis, cord colitis", then: ["Adjust medication"] },
            ],
          },
          { type: "outline", items: ["Antiemetics: 5-HT3 antagonist + dexamethasone + NK1 antagonist for highly emetogenic conditioning; olanzapine as add-on.", "GI bleeding: thrombocytopenia, GVHD ulcers, CMV; support with transfusion and treat cause."] },
        ],
      },
      {
        ch: 51,
        title: "Haemorrhagic cystitis and renal dysfunction",
        verified: true,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Haemorrhagic cystitis", items: ["**Early** (D0–7): cyclophosphamide/ifosfamide acrolein → prevent with mesna and hyperhydration", "**Late** (≥ D+14): BK virus (most), adenovirus, CMV; aggravated by GVHD and immune recovery", "Grade 1 microscopic; 2 macroscopic; 3 clots; 4 obstruction / renal failure"] },
            right: { type: "outline", heading: "Management", items: ["Hyperhydration, urine output > 100 mL/h, platelets > 50, analgesia", "Continuous bladder irrigation for clots (grade 3–4)", "Reduce IS; cidofovir (nephrotoxic; intravesical option), BK-specific T cells in trials", "Refractory: hyperbaric oxygen, intravesical agents, embolisation, cystectomy"] },
          },
          {
            type: "table",
            cols: ["Renal problem", "Causes", "Notes"],
            widths: [0.26, 0.44, 0.3],
            rows: [
              ["Early AKI (up to 50%)", "Sepsis, CNI, amphotericin, aminoglycosides, SOS/VOD hepatorenal, TMA", "AKI needing dialysis: mortality > 50%"],
              ["Chronic kidney disease", "CNI, TA-TMA, TBI nephropathy, BK nephropathy", "Control BP, avoid nephrotoxins, monitor eGFR yearly"],
              ["Nephrotic syndrome", "Membranous GN as renal cGVHD", "Steroids + CNI/rituximab"],
            ],
          },
        ],
      },
      {
        ch: 52,
        title: "Non-infectious pulmonary complications",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Early (< D+100)", "Timing", "Features", "Treatment"],
            widths: [0.26, 0.16, 0.34, 0.24],
            rows: [
              ["Idiopathic pneumonia syndrome (IPS)", "D+7 – D+60", "Diffuse infiltrates, hypoxia, no pathogen on BAL", "High-dose steroids ± etanercept"],
              ["Diffuse alveolar haemorrhage", "D+10 – D+30", "Progressively bloodier BAL returns", "High-dose steroids"],
              ["Engraftment syndrome / PERDS", "Neutrophil recovery", "Fever, rash, oedema, infiltrates", "Steroids"],
            ],
          },
          {
            type: "table",
            cols: ["Late (> D+100)", "Features", "Treatment"],
            widths: [0.26, 0.44, 0.3],
            rows: [
              ["Bronchiolitis obliterans syndrome (BOS)", "Only diagnostic lung cGVHD sign: FEV1/FVC < 0.7, FEV1 < 75%, air trapping (RV > 120% or expiratory CT), no infection", "FAM (fluticasone, azithromycin, montelukast), ruxolitinib, belumosudil, ECP; lung transplant"],
              ["Cryptogenic organising pneumonia", "Patchy consolidation, steroid-responsive", "Prednisone taper over months"],
              ["Pleuroparenchymal fibroelastosis", "Upper-lobe fibrosis, pneumothorax", "Supportive"],
            ],
          },
          { type: "note", text: "Screen with spirometry every 3 months in the first 2 years and at any respiratory symptom; a 10% FEV1 drop warrants CT and BAL." },
        ],
      },
      {
        ch: 53,
        title: "Neurological complications",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Category", "Examples", "Clues"],
            widths: [0.22, 0.44, 0.34],
            rows: [
              ["Drug toxicity", "CNI → PRES, tremor; busulfan seizures; MTX / ifosfamide encephalopathy; fludarabine leukoencephalopathy", "Timing, levels, MRI pattern"],
              ["Infection", "HHV-6 limbic encephalitis (most common), Aspergillus, Toxoplasma, Listeria, JC virus (PML), VZV vasculitis", "PCR in CSF, imaging"],
              ["Vascular", "Haemorrhage (thrombocytopenia), TMA-related encephalopathy", "Sudden onset"],
              ["Immune", "CNS GVHD (rare), myasthenia, CIDP", "Exclusion diagnosis"],
              ["Metabolic", "Hyponatraemia, hypomagnesaemia, hepatic encephalopathy", "Labs"],
            ],
          },
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "PRES", items: ["Headache, seizures, visual disturbance, hypertension", "MRI: posterior vasogenic oedema (T2/FLAIR)", "Stop or switch CNI, treat BP; usually reversible"] },
            right: { type: "outline", heading: "HHV-6 encephalitis", items: ["Around engraftment (2–6 weeks), cord blood risk", "Amnesia, confusion, seizures; hippocampal T2 signal", "Foscarnet 90 mg/kg q12h or ganciclovir; sequelae common"] },
          },
        ],
      },
      {
        ch: 54,
        title: "Skin, hair and musculoskeletal complications",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Condition", "Features", "Management"],
            widths: [0.24, 0.4, 0.36],
            rows: [
              ["Skin aGVHD", "Maculopapular rash starting palms, soles, ears, nape; stage 4 = bullae", "Topical steroids for stage 1–2; systemic per Ch. 43"],
              ["Lichenoid cGVHD", "Violaceous flat papules, poikiloderma", "Topical clobetasol/tacrolimus, phototherapy, systemic therapy"],
              ["Sclerotic cGVHD", "Skin thickening, fasciitis, joint contractures", "Early physiotherapy, ECP, ruxolitinib, imatinib, belumosudil"],
              ["Avascular necrosis", "Femoral head; steroids, older age; MRI early (X-ray negative)", "Load reduction, analgesia, joint replacement"],
              ["Osteoporosis", "Steroids, hypogonadism, CNI", "Ca + vitamin D, bisphosphonate, DXA at 1 year"],
              ["Steroid myopathy", "Proximal weakness", "Taper steroids, physiotherapy"],
            ],
          },
          { type: "outline", items: ["Hair: anagen effluvium after conditioning regrows in 3–6 months; permanent alopecia after busulfan or with scalp cGVHD.", "Nails and hair changes are distinctive cGVHD signs; photograph and score joints (P-ROM) at each visit."] },
        ],
      },
      {
        ch: 55,
        title: "Cardiovascular and metabolic complications",
        verified: true,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Cardiac", items: ["Cyclophosphamide cardiotoxicity (high dose, early, haemorrhagic myocarditis)", "Prior anthracycline: cumulative dose drives late heart failure", "Arrhythmias during conditioning and sepsis; QT prolongation (azoles, ondansetron)", "Hypertension from CNI and steroids", "Long-term: 2–4× cardiovascular events vs population"] },
            right: { type: "outline", heading: "Metabolic syndrome", items: ["Central obesity, dysglycaemia, dyslipidaemia, hypertension", "Drivers: steroids, CNI, TBI, hypogonadism, inactivity", "Screen yearly: BP, fasting glucose or HbA1c, lipids, weight", "Treat aggressively; statins are safe with CNI (watch interactions)"] },
          },
          { type: "flow", dir: "h", nodes: ["Pre-HCT: echo (LVEF), ECG, risk factors", "Conditioning: monitor rhythm, fluids, troponin if symptoms", "Year 1: BP, glucose, lipids", "Yearly survivorship: cardiovascular risk score, echo if symptomatic"] },
        ],
      },
      {
        ch: 56,
        title: "Endocrine, fertility and sexual health",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Problem", "Cause", "Management"],
            widths: [0.26, 0.3, 0.44],
            rows: [
              ["Hypothyroidism", "TBI, neck irradiation, busulfan", "Yearly TSH; levothyroxine"],
              ["Adrenal insufficiency", "Steroid withdrawal", "Slow taper; stress dosing during illness"],
              ["Growth hormone deficiency (children)", "TBI, cranial RT", "Endocrine review; GH replacement"],
              ["Hypogonadism", "Alkylators, TBI; almost universal after MAC in women", "Hormone replacement; oestrogen for bone and symptoms; testosterone if low"],
              ["Osteoporosis", "Steroids, hypogonadism, CNI", "Ca/vitamin D, bisphosphonates, DXA"],
              ["Sexual dysfunction", "Hormonal, genital cGVHD, psychological", "Ask actively; topical oestrogen, dilators, counselling"],
            ],
          },
          {
            type: "flow",
            dir: "h",
            nodes: ["Before conditioning: discuss fertility with every patient", "Men: sperm cryopreservation (testicular extraction if azoospermic)", "Women: oocyte or embryo cryopreservation; ovarian tissue if no time or pre-pubertal", "After HCT: pregnancy possible after RIC; counsel about risks"],
          },
        ],
      },
    ],
  },
];
