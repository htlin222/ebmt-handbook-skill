---
name: ebmt-handbook
description: >
  EBMT Handbook 第8版（2024）造血細胞移植（HCT）與細胞治療臨床指引技能，內含全書 94 章完整原文
  （所有段落、表格、圖、公式、Key Points、參考文獻）與中文快速摘要。
  當使用者詢問任何移植病人相關問題時，必須立即啟用本技能，包含：
  移植前評估、捐贈者選擇、預處理方案、幹細胞來源、GVHD 預防與治療、
  感染處理（細菌/黴菌/病毒）、器官併發症（肝/腎/肺/神經）、移植後復發管理、
  CAR-T 細胞治療、各疾病移植適應症（AML/ALL/MDS/淋巴瘤/骨髓瘤/自體免疫/實體腫瘤等）、
  移植後長期追蹤、兒童移植、疫苗接種、心理照護、JACIE 認證、登記處與統計方法。
  每次回答必須標明出處：「📖 來自 EBMT Handbook 第8版 第 N 章」。
  使用者問 HCT、移植、骨髓、幹細胞、GVHD、CAR-T、造血、移植病人 等關鍵字時，強制觸發本技能。
---

# EBMT Handbook 第8版 臨床指引技能

**書籍**：The EBMT Handbook: Hematopoietic Cell Transplantation and Cellular Therapies, 8th edition (2024)  
**編輯**：Sureda A, Corbacioglu S, Greco R, Kröger N, Carreras E  
**出版**：Springer, Cham; Open Access CC BY 4.0 — https://doi.org/10.1007/978-3-031-44080-9  
**收錄**：全書 94 章 × 9 Parts 完整原文（逐字、含表格與圖），已逐章與官方 PDF 比對驗證

---

## ⚙️ 核心規則（每次回答必須遵守）

1. **先讀原文再回答**：依下方路由表找到章節，讀 `references/chapters/chNN-*.md` 的相關段落後才作答。
   原文檔很長（每章 2k–9k 字），先用 grep 找到段落編號（如 `## 43.4`、`**Table 43.3`），再讀該段。
2. **來源標示**：每段落標明 `📖 來自 EBMT Handbook 第8版 第 N 章`；引用表格/圖時寫出編號（如 Table 49.2、Fig. 24.1）。
3. **來源分級**：
   - 依 `chapters/` 原文作答 → 直接引用，可附原文英文關鍵句
   - `summaries/` 是中文快速摘要，標 `[模型補充]` 的段落**未經原文驗證**，不可單獨作為依據
   - 原書沒寫的內容 → 明說「EBMT Handbook 未涵蓋」，再以一般醫學知識補充並標註
4. **知識截止警告**：回答藥物核准、新指引等議題時，加上：
   > 📅 本資訊以 EBMT Handbook 第8版（2024）為準，請確認是否有最新更新。
5. **臨床第一**：先給出可操作建議，再補充原理。
6. **計算工具**：劑量/評分/CrCl 請執行 `scripts/hct_tools.py`，每次輸出自帶 safety disclaimer。

---

## 📂 檔案結構

```
references/
├── INDEX.md               # 全書目錄：9 Parts × 94 章 → 檔名、頁碼、表/圖數量
├── chapters/chNN-*.md     # 第 NN 章完整原文（94 檔）
├── figures/chNN-fig*.*    # 原書圖片（嵌入於章節原文中，可直接 view）
└── summaries/partNN-*.md  # 各 Part 中文快速摘要（非權威）
```

**查找方式**
```bash
ls references/chapters/ch43-*                              # 依章號開檔
grep -n "^#" references/chapters/ch49-*.md                 # 看章節段落架構
grep -n "^\*\*Table" references/chapters/ch26-*.md         # 列出該章所有表格
grep -ril "letermovir" references/chapters/                # 全書關鍵字搜尋（找跨章內容）
grep -n -i "defibrotide" references/chapters/*.md | head   # 關鍵字 + 行號
```

---

## 📚 章節路由表（全書 94 章，MECE）

檔案一律為 `references/chapters/chNN-*.md`；摘要在 `references/summaries/`。

### Part I — Introduction（Ch.1–6）→ `summaries/part01-introduction.md`
| 主題 | Ch |
|---|---|
| HCT 歷史沿革 | 1 |
| EBMT 組織：歷史、現況、未來 | 2 |
| 捐贈者登記處（WMDA、registry）| 3 |
| HCT 單位設施與人員要求 | 4 |
| JACIE 認證 | 5 |
| HCT 與細胞治療的統計方法（competing risk、GRFS…）| 6 |

### Part II — Biological Aspects（Ch.7–10）→ `summaries/part02-biological.md`
| 主題 | Ch |
|---|---|
| 造血幹細胞生物學 | 7 |
| 非 HSC 細胞（MSC、Treg、NK…）生物學 | 8 |
| **組織相容性 / HLA 配對** | 9 |
| **免疫重建**（graft composition、免疫監測、CAR-T 監測）| 10 |

### Part III — Methodology and Clinical Aspects（Ch.11–22）→ `summaries/part03-methodology.md`
| 主題 | Ch |
|---|---|
| **移植前評估與諮詢**（HCT-CI、EBMT score）| 11 |
| **捐贈者選擇**（成人/兒童）| 12 |
| **預處理方案**（MAC/RIC/NMA）| 13 |
| 幹細胞來源選擇（BM/PB/CB）| 14 |
| 骨髓採集 | 15 |
| 幹細胞動員與採集（成人）| 16 |
| 幹細胞動員與採集（兒童）| 17 |
| 臍帶血單位取得與管理 | 18 |
| Graft manipulation（T-cell depletion 等）| 19 |
| 處理、冷凍保存、品質管控 | 20 |
| 植入與嵌合度（chimerism）| 21 |
| 移植後短期與長期追蹤 | 22 |

### Part IV — General Management of the Patient（Ch.23–34）→ `summaries/part04-general-management.md`
| 主題 | Ch |
|---|---|
| 血管通路（CVC）| 23 |
| **輸血支持**（照射、CMV-safe、ABO 不合）| 24 |
| 營養支持 | 25 |
| **GVHD 預防**（CSA/MTX、PTCy、ATG…）| 26 |
| 感染控制與隔離 | 27 |
| 兒童感染支持照護（含兒童抗黴菌劑量）| 28 |
| **疫苗接種** | 29 |
| 心理照護 | 30 |
| **藥物交互作用** | 31 |
| HCT 護理角色 | 32 |
| 倫理議題 | 33 |
| 生活品質評估（成人/兒童）| 34 |

### Part V — HCT Complications and Management（Ch.35–47）→ `summaries/part05-complications.md`
| 主題 | Ch |
|---|---|
| **中性球低下發燒** | 35 |
| 細菌感染 | 36 |
| **侵襲性黴菌感染** | 37 |
| **病毒感染**（CMV/EBV/HHV-6 等疱疹病毒、呼吸道病毒、SARS-CoV-2、ADV、BK/JC、norovirus…；肝炎病毒見 Ch.49）| 38 |
| 其他威脅生命感染（弓漿蟲、TB、NTM、Listeria、Nocardia；PJP 見 Ch.37）| 39 |
| 出血與血栓併發症 | 40 |
| Graft failure | 41 |
| 內皮源性早期併發症（FOS、CLS、ES、pre-ES、TA-TMA、PRES）| 42 |
| **急性 GVHD** | 43 |
| **慢性 GVHD** | 44 |
| PTLD | 45 |
| 鐵過載 | 46 |
| 次發性腫瘤 | 47 |

### Part VI — Specific Organ Complications（Ch.48–56）→ `summaries/part06-organ-complications.md`
| 主題 | Ch |
|---|---|
| 眼部與口腔（含口腔黏膜炎）| 48 |
| **肝臟**（SOS/VOD、HBV/HCV、DILI）| 49 |
| 腸胃道（噁心嘔吐、腹瀉、食道炎/胃炎、GI 出血、typhlitis、胰臟）| 50 |
| 出血性膀胱炎與腎功能異常 | 51 |
| 非感染性肺部併發症（IPS、DAH、BOS…）| 52 |
| 神經系統併發症 | 53 |
| 皮膚、毛髮、肌肉骨骼 | 54 |
| 心血管疾病與代謝症候群 | 55 |
| 內分泌、生育、性健康 | 56 |

### Part VII — Prevention and Management of Relapse（Ch.57–62）→ `summaries/part07-relapse.md`
| 主題 | Ch |
|---|---|
| MRD 監測（ALL、AML）| 57 |
| 藥物預防與治療復發（維持治療）| 58 |
| **DLI** | 59 |
| **CAR-T / 基因改造 T 細胞**（療效、CRS、ICANS）| 60 |
| 免疫抵抗機制 | 61 |
| ATMP 與最小操作細胞的法規 | 62 |

### Part VIII — Specific Modalities of HCT and Management（Ch.63–69）→ `summaries/part08-modalities.md`
| 主題 | Ch |
|---|---|
| 居家移植 | 63 |
| 臍帶血移植（UCBT）| 64 |
| **Haploidentical HCT** | 65 |
| 體外光照療法（ECP）| 66 |
| 過重/肥胖病人 | 67 |
| 老年病人 | 68 |
| 資源受限環境 | 69 |

### Part IX — Indications and Results（Ch.70–94）→ `summaries/part09-indications.md`
| 主題 | Ch |
|---|---|
| AML 成人 / 兒童 | 70 / 71 |
| ALL 成人 / 兒童與青少年 | 72 / 73 |
| MDS 成人 / 兒童 MDS（RCC）與 JMML | 74 / 75 |
| MDS/MPN（CMML 等）| 76 |
| MPN（骨髓纖維化、CML）| 77 |
| 後天骨髓衰竭（SAA、PNH）| 78 |
| Fanconi 貧血與遺傳性骨髓衰竭 | 79 |
| 血紅素病變（SCD、地中海貧血）| 80 |
| 多發性骨髓瘤 | 81 |
| AL 類澱粉沉積症 | 82 |
| POEMS 與其他單株免疫球蛋白疾病 | 83 |
| 惰性淋巴瘤 | 84 |
| CLL | 85 |
| 大 B 細胞淋巴瘤 | 86 |
| 套細胞淋巴瘤 | 87 |
| 其他侵襲性 B/T 淋巴瘤、HIV 相關淋巴瘤 | 88 |
| 古典型何杰金氏淋巴瘤 | 89 |
| 先天性免疫缺陷（IEI，含 SCID、HLH）| 90 |
| 先天性代謝異常與骨質石化症 | 91 |
| 自體免疫疾病（MS、SSc、Crohn…）| 92 |
| 自體免疫疾病的 CAR-T、MSC、Treg 細胞治療 | 93 |
| 實體腫瘤（神經母細胞瘤、生殖細胞瘤、腦瘤…）| 94 |

> 原書**沒有**第 95 章。CAR-T 在血液腫瘤的適應症分散於 Ch.60 與各疾病章（72、81、84–87）。

---

## 🧠 臨床決策樹（快速分流）

```
移植病人問題
├── 移植前？
│   ├── 適應症評估 → Ch.11 + Ch.70–94（疾病別）
│   ├── 捐贈者/HLA/來源 → Ch.9, 12, 14, 64, 65
│   ├── 採集/處理 → Ch.15–20
│   └── 預處理選擇 → Ch.13（特殊族群 Ch.67, 68）
│
├── 移植中（D-7 到 D+30）？
│   ├── 感染/發燒 → Ch.35, 36, 37, 38（兒童 Ch.28；感控 Ch.27）
│   ├── 器官毒性 → Ch.42（endothelial）, Ch.49（SOS/VOD）, Ch.48/50（黏膜炎/GI）
│   ├── GVHD 預防 → Ch.26
│   └── 支持照護 → Ch.23–25, 31
│
├── 移植後早期（D+30 到 D+100）？
│   ├── 急性 GVHD → Ch.43（ECP Ch.66）
│   ├── 感染 → Ch.36–39
│   ├── Graft failure / chimerism → Ch.41, 21
│   └── 出血/血栓 → Ch.40
│
└── 移植後晚期（D+100 之後）？
    ├── 慢性 GVHD → Ch.44（ECP Ch.66）
    ├── 追蹤排程 / 疫苗 → Ch.22, 29
    ├── 器官長期併發症 → Ch.48–56
    ├── MRD/復發/DLI/CAR-T → Ch.57–61
    └── 次發腫瘤/PTLD/生活品質/心理 → Ch.47, 45, 34, 30
```

---

## 🐍 Python 工具使用說明

當問題涉及以下計算時，執行 `scripts/hct_tools.py`：

| 需求 | 工具函數 |
|-----|---------|
| BSA（體表面積）計算 | `calc_bsa(weight, height)` |
| CrCl / eGFR 計算 | `calc_crcl(age, weight, creatinine, sex)` |
| Sorror HCT-CI 評分 | `hct_ci_score(comorbidities_dict)` |
| GVHD 分期 | `grade_acute_gvhd(...)` |
| 幹細胞採集目標量 | `stem_cell_target(weight, transplant_type)` |
| 藥物劑量試算 | `drug_dose(drug, weight, bsa)` |
| Checklist 輸出（JSON）| `print_checklist(phase)` |

執行方式：`python3 scripts/hct_tools.py`（相對於本技能資料夾）

---

## 📋 常用 Checklist（快速輸出；細節以原文為準）

### 移植前評估 Checklist（Ch.11）
```json
{
  "phase": "pre-HCT evaluation",
  "chapter": 11,
  "items": [
    {"category": "疾病評估", "tasks": ["疾病分期確認", "MRD 狀態", "細胞遺傳學/分子標記"]},
    {"category": "器官功能", "tasks": ["心臟 ECHO（EF>45%）", "肺功能 FEV1/DLCO", "肝功能", "腎功能 CrCl", "神經功能"]},
    {"category": "感染篩檢", "tasks": ["CMV IgG", "EBV", "HSV", "VZV", "HIV", "HBV", "HCV", "梅毒", "結核 IGRA"]},
    {"category": "HLA 配型", "tasks": ["病患 HLA typing 10/10", "捐贈者搜尋"]},
    {"category": "知情同意", "tasks": ["移植風險說明", "生育保存討論", "心理評估"]}
  ]
}
```

### 中性球低下發燒處理 Checklist（Ch.35）
```json
{
  "phase": "febrile neutropenia",
  "chapter": 35,
  "items": [
    {"step": 1, "action": "體溫 >38°C 且 ANC <0.5×10⁹/L → 啟動 FN protocol"},
    {"step": 2, "action": "抽血培養 x2（不同部位），含 CVC port"},
    {"step": 3, "action": "30分鐘內給予廣效抗生素（pip/tazo 或 cefepime）"},
    {"step": 4, "action": "評估是否為 high risk（HCT患者均為 high risk）"},
    {"step": 5, "action": "48-72小時仍發燒 → 加上抗黴菌治療"},
    {"step": 6, "action": "懷疑 Aspergillus → GM 抗原、胸部 CT"}
  ]
}
```

---

> ⚠️ 本技能提供臨床參考，不取代個別病人的醫療決策。
> 內容引用自 EBMT Handbook 第8版（2024，CC BY 4.0），請依據最新機構指引調整。
