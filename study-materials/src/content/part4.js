// Part IV (Ch.22-34) General management of the patient
module.exports = [
  {
    part: "Part IV · General management",
    partTitle: "General Management of the Patient",
    partBlurb: "Follow-up, vascular access, transfusion, nutrition, GVHD prophylaxis, infection control, vaccination, psychology, drug interactions, nursing, ethics and quality of life.",
    chapters: [
      {
        ch: 22,
        title: "Short- and long-term follow-up after HCT",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Time point", "Main checks"],
            widths: [0.2, 0.8],
            rows: [
              ["D+30", "Engraftment, chimerism, CMV/EBV PCR, CBC, CNI level"],
              ["D+60", "Chimerism, MRD (acute leukaemia), liver and renal function"],
              ["D+100", "Disease restaging, GVHD assessment, immune recovery, vaccine plan"],
              ["D+180", "Stop antiviral prophylaxis if eligible, CNI taper, start inactivated vaccines"],
              ["1 year, then yearly", "Organ late effects, secondary cancer screening, bone density, endocrine, QoL"],
            ],
          },
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Long-term organ surveillance", items: ["Thyroid: TSH yearly after TBI", "Gonads: FSH/LH/oestradiol, testosterone, semen analysis (Ch. 56)", "Bone: DXA at 1 year, repeat if abnormal", "Eyes: cataract after TBI, sicca with cGVHD"] },
            right: { type: "outline", heading: "Long-term general care", items: ["Cardiovascular risk factors yearly (Ch. 55)", "Skin and oral cancer screening (Ch. 47)", "Revaccination schedule (Ch. 29)", "Psychosocial and return-to-work support (Ch. 30, 34)"] },
          },
        ],
      },
      {
        ch: 23,
        title: "Vascular access",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Device", "Features", "Use in HCT"],
            widths: [0.26, 0.4, 0.34],
            rows: [
              ["PICC (2–3 lumens)", "Peripheral insertion, low insertion risk", "Short term; thrombosis risk higher"],
              ["Tunnelled CVC (Hickman/Broviac)", "Cuffed, multi-lumen, long term", "Standard for the transplant admission"],
              ["Port-a-Cath", "Fully implanted", "Outpatient follow-up, intermittent use"],
              ["Apheresis catheter", "Large bore, high flow", "Stem cell collection, ECP"],
            ],
          },
          {
            type: "outline",
            heading: "Complications and prevention",
            items: [
              "**CLABSI**: coagulase-negative staphylococci most common → vancomycin; remove catheter for S. aureus, Candida, persistent bacteraemia or tunnel infection.",
              "**Thrombosis**: LMWH once platelets allow; catheter may stay if functioning.",
              "**Mechanical**: pneumothorax, malposition, occlusion (alteplase lock).",
              "Bundle: ultrasound-guided insertion, chlorhexidine skin prep and dressings, daily review of need.",
            ],
          },
        ],
      },
      {
        ch: 24,
        title: "Transfusion support",
        verified: false,
        blocks: [
          {
            type: "cols",
            split: 0.5,
            left: { type: "outline", heading: "Thresholds", items: ["Red cells: Hb < 7–8 g/dL (restrictive)", "Platelets prophylactic: < 10 × 10⁹/L; < 20 if fever or bleeding risk", "Platelets with active bleeding or procedure: < 50 × 10⁹/L"] },
            right: { type: "outline", heading: "Product requirements", items: ["**Irradiated** (≥ 25 Gy) cellular components for all HCT recipients: prevents TA-GVHD", "Leucodepleted or CMV-seronegative components for CMV-negative pairs", "Group-compatible plasma and platelets per ABO plan below"] },
          },
          {
            type: "table",
            cols: ["ABO mismatch", "Meaning", "Red cells", "Platelets / plasma"],
            widths: [0.18, 0.4, 0.2, 0.22],
            rows: [
              ["Major", "Recipient has antibody vs donor RBC (e.g. O → A)", "Recipient type (O)", "Donor type (A) or AB"],
              ["Minor", "Donor has antibody vs recipient RBC (e.g. A → O)", "Donor type (O)", "Recipient type (A) or AB"],
              ["Bidirectional", "Both (e.g. A → B)", "Group O", "Group AB"],
            ],
          },
          { type: "note", text: "Major mismatch: risk of pure red cell aplasia and delayed red cell engraftment; consider red cell depletion of a marrow graft. Minor mismatch: passenger lymphocyte haemolysis around D+7–14." },
        ],
      },
      {
        ch: 25,
        title: "Nutritional support",
        verified: false,
        blocks: [
          { type: "flow", dir: "h", nodes: ["Screen at admission (NRS-2002, MUST, weight loss > 10%)", "Dietitian plan; oral first", "Mucositis / GI GVHD limits intake", "Enteral nutrition preferred if gut works", "Parenteral only if gut fails > 7 days"] },
          {
            type: "outline",
            items: [
              "Energy 25–30 kcal/kg/day; protein 1.5–2.0 g/kg/day in the acute phase.",
              "Enteral feeding is associated with less infection and better outcomes than routine TPN.",
              "Low-microbial ('neutropenic') diets lack strong evidence; focus on safe food handling and avoiding high-risk raw items.",
              "Monitor glucose, triglycerides and electrolytes on TPN; refeeding risk in malnourished patients.",
            ],
          },
        ],
      },
      {
        ch: 26,
        title: "GVHD prophylaxis",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Setting", "Standard backbone", "Common additions"],
            widths: [0.28, 0.38, 0.34],
            rows: [
              ["MAC, MSD or MUD", "Calcineurin inhibitor (CSA or tacrolimus) + short-course MTX", "ATG for unrelated donors (cGVHD ↓)"],
              ["RIC, MUD", "CNI + MMF", "ATG"],
              ["Haploidentical", "PTCy 50 mg/kg D+3 and D+4, then tacrolimus + MMF from D+5", "—"],
              ["Emerging / trial-based", "PTCy also in matched donors (BMT CTN 1703)", "Abatacept, vedolizumab (GI protection), sirolimus"],
            ],
          },
          {
            type: "outline",
            heading: "ATG principles",
            items: ["Rabbit ATG (Thymoglobulin) ≈ 4.5–6 mg/kg total; ATG-Fresenius (Grafalon) 30–60 mg/kg — products are not interchangeable.", "Reduces acute and chronic GVHD without clear survival gain; delays immune recovery, more viral reactivation.", "Target the dose to lymphocyte count and weight in children."],
          },
          { type: "note", text: "MTX: 15 mg/m² D+1 then 10 mg/m² D+3, +6 (±11). Leucovorin rescue and dose reduction for mucositis or renal impairment." },
        ],
      },
      {
        ch: 27,
        title: "Infection control and isolation",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Measure", "Detail"],
            widths: [0.3, 0.7],
            rows: [
              ["Hand hygiene", "Alcohol rub before and after every contact — the single most effective measure"],
              ["Environment", "HEPA filtration, positive pressure, ≥ 12 air changes/h; no plants or flowers; avoid construction dust (Aspergillus)"],
              ["Precautions", "Contact isolation for MDRO carriers; droplet for respiratory viruses; airborne (N95) for TB, measles, varicella"],
              ["Screening", "Admission rectal swab (ESBL, CPE, VRE) and nasal MRSA per local policy"],
              ["Visitors", "Limited, screened for symptoms; no ill visitors"],
              ["Food", "Safe handling; avoid raw meat, fish, unpasteurised dairy, unwashed produce"],
            ],
          },
        ],
      },
      {
        ch: 28,
        title: "Supportive care of infection in children",
        verified: false,
        blocks: [
          {
            type: "outline",
            items: [
              "Same principles as adults; **dose by weight or BSA** and expect different pharmacokinetics.",
              "Febrile neutropenia first line: piperacillin-tazobactam (≈ 300 mg/kg/day of piperacillin, divided q6–8h) or cefepime.",
              "Antifungal prophylaxis: fluconazole in young children; mould-active azoles (voriconazole, posaconazole) in high-risk adolescents — voriconazole PK is highly variable in children → frequent TDM.",
              "Liposomal amphotericin B is well tolerated in children and useful when azoles fail or interact.",
              "Viruses: CMV, EBV and especially **adenovirus** cause more severe disease after haplo or T-cell-depleted paediatric HCT; monitor by PCR, treat with cidofovir (brincidofovir where available).",
            ],
          },
          { type: "flow", dir: "h", nodes: ["Fever > 38 °C, ANC < 0.5", "Cultures, then antibiotic within 60 min", "Reassess at 48–72 h", "Persistent fever: mould work-up, empiric antifungal"] },
        ],
      },
      {
        ch: 29,
        title: "Vaccination after HCT",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Vaccine", "Start", "Notes"],
            widths: [0.32, 0.18, 0.5],
            rows: [
              ["Pneumococcal conjugate (PCV)", "3–6 months", "3 doses, then PPSV23 or 4th PCV at 12 months (PCV if cGVHD)"],
              ["Inactivated influenza", "6 months (4 in outbreak)", "Yearly, lifelong; household contacts too"],
              ["COVID-19 (mRNA)", "3 months", "Full primary series again"],
              ["DTaP, Hib, IPV, HBV", "6–12 months", "3 doses each"],
              ["HPV", "6–12 months", "3 doses, all sexes"],
              ["MMR (live)", "24 months", "Only if no active cGVHD, off IS, no IVIG in 8–11 months"],
              ["Varicella (live)", "24 months", "Same conditions; recombinant zoster vaccine can be used earlier"],
            ],
          },
          { type: "note", text: "Live vaccines are contraindicated until immune reconstitution (usually ≥ 24 months, no GVHD, no immunosuppression). Household members: yearly influenza and age-appropriate live vaccines are safe." },
        ],
      },
      {
        ch: 30,
        title: "Psychological aspects",
        verified: true,
        blocks: [
          {
            type: "table",
            cols: ["Phase", "Typical problems", "Approach"],
            widths: [0.22, 0.4, 0.38],
            rows: [
              ["Pre-transplant", "Anxiety, uncertainty, fear of procedures", "Screen (HADS, distress thermometer), psycho-education, CBT"],
              ["Inpatient", "Isolation, body-image change, loss of control, delirium", "Daily structure, family contact within infection rules, early mobilisation"],
              ["Post-transplant", "Fatigue (most persistent), depression, PTSD, sexual problems", "Rehabilitation, graded activity, psychotherapy, couple counselling"],
              ["cGVHD", "Highest symptom and psychological burden", "Integrated multidisciplinary clinic"],
              ["Adolescents / young adults", "Interrupted education, peers, identity, fertility", "AYA-specific programmes, fertility counselling before conditioning"],
            ],
          },
        ],
      },
      {
        ch: 31,
        title: "Clinically relevant drug interactions",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Raise CNI / sirolimus level (CYP3A4 inhibitors)", "Lower CNI level (CYP3A4 inducers)"],
            widths: [0.5, 0.5],
            rows: [
              ["Voriconazole, posaconazole, itraconazole, isavuconazole (weaker)", "Rifampicin, rifabutin"],
              ["Fluconazole (moderate, dose-dependent)", "Carbamazepine, phenytoin, phenobarbital"],
              ["Clarithromycin, erythromycin", "St John's wort"],
              ["Letermovir (raises tacrolimus and CSA; CSA raises letermovir)", "Nafcillin, dexamethasone (mild)"],
              ["Grapefruit, diltiazem, verapamil", "—"],
            ],
          },
          {
            type: "outline",
            heading: "Practical rules",
            items: ["Starting voriconazole or posaconazole: cut tacrolimus to ≈ 1/3 (CSA to ≈ 1/2) and measure levels within 3–5 days; reverse on stopping.", "Rifampicin can make tacrolimus levels undetectable — avoid or use rifabutin with close TDM.", "QT prolongation: azoles + ondansetron, fluoroquinolones, methadone → ECG and electrolytes.", "Busulfan with metronidazole or itraconazole raises Bu exposure; separate them.", "MMF levels fall with CSA (enterohepatic cycle) but not with tacrolimus."],
          },
        ],
      },
      {
        ch: 32,
        title: "The role of nursing in HCT",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Role", "Core responsibilities"],
            widths: [0.3, 0.7],
            rows: [
              ["Transplant coordinator", "Donor search liaison, work-up scheduling, timeline, single point of contact for patient and family"],
              ["Apheresis nurse", "Runs collection, manages citrate toxicity and access problems, product labelling"],
              ["Ward nurse", "Mucositis and skin care, CVC dressing under aseptic technique, transfusion monitoring, first to spot GVHD rash or diarrhoea"],
              ["Advanced practice nurse", "Leads follow-up clinics, symptom management, survivorship, protocol adherence"],
              ["Education role", "Teaches self-care: temperature, hygiene, medication, when to call"],
            ],
          },
          { type: "note", text: "JACIE standards require documented nurse training and competency for HCT and cellular therapy programmes." },
        ],
      },
      {
        ch: 33,
        title: "Ethical issues in HCT",
        verified: false,
        blocks: [
          {
            type: "outline",
            items: [
              "**Informed consent** for a high-risk therapy: NRM, GVHD, infection, infertility, secondary cancer must be discussed; urgency must not shortcut understanding.",
              "**Donor protection**: voluntary, informed, free to withdraw; donor advocate independent of the recipient's team; minor sibling donors need ethics review and assent.",
              "**Cord blood**: public banking (altruistic) vs private banking (limited evidence of benefit).",
              "**Resource allocation**: cost of HCT and ATMPs vs equity; access to clinical trials.",
              "**End of life**: when to stop escalating (second transplant, ICU); advance care planning belongs in the pre-transplant consultation.",
            ],
          },
        ],
      },
      {
        ch: 34,
        title: "Quality of life assessment",
        verified: false,
        blocks: [
          {
            type: "table",
            cols: ["Instrument", "Population", "Focus"],
            widths: [0.3, 0.3, 0.4],
            rows: [
              ["FACT-BMT", "Adult HCT", "HCT-specific module of FACT-G"],
              ["EORTC QLQ-C30 (+ HDC29)", "Adult oncology", "Generic cancer QoL, HCT add-on module"],
              ["PedsQL", "Children", "Child- and parent-reported"],
              ["Lee cGVHD Symptom Scale", "cGVHD", "30 symptoms across 7 domains"],
              ["PROMIS / PRO-CTCAE", "Any", "Patient-reported symptoms in trials and clinics"],
            ],
          },
          { type: "flow", dir: "h", labels: ["worst", "improving", "plateau"], nodes: ["D0 – D+30: mucositis, nausea, fatigue", "D+30 – 1 y: cGVHD symptoms, infections, fatigue", "> 1 y: fatigue, cognition, sexuality, employment"] },
        ],
      },
    ],
  },
];
