---
name: ebmt-handbook
description: >
  EBMT Handbook 第8版（2024）造血細胞移植（HCT）與細胞治療臨床指引技能。
  當使用者詢問任何移植病人相關問題時，必須立即啟用本技能，包含：
  移植前評估、捐贈者選擇、預處理方案、幹細胞來源、GVHD 預防與治療、
  感染處理（細菌/黴菌/病毒）、器官併發症（肝/腎/肺/神經）、移植後復發管理、
  CAR-T 細胞治療、各疾病移植適應症（AML/ALL/MDS/淋巴瘤/骨髓瘤等）、
  移植後長期追蹤、兒童移植、疫苗接種、心理照護。
  每次回答必須標明出處：「📖 來自 EBMT Handbook 第8版 第 N 章」。
  使用者問 HCT、移植、骨髓、幹細胞、GVHD、CAR-T、造血、移植病人 等關鍵字時，強制觸發本技能。
---

# EBMT Handbook 第8版 臨床指引技能

**書籍**：The EBMT Handbook: Hematopoietic Cell Transplantation and Cellular Therapies, 8th edition (2024)  
**編輯**：Sureda A, Corbacioglu S, Greco R, Kröger N, Carreras E  
**出版**：Springer; Open Access CC BY 4.0  
**來源**：https://www.ncbi.nlm.nih.gov/books/NBK608238/

---

## ⚙️ 核心規則（每次回答必須遵守）

1. **來源標示**：每段落標明 `📖 來自 EBMT Handbook 第8版 第 N 章`
2. **來源區分**：
   - `[書中驗證]`：內容來自已 fetch 的原書章節
   - `[模型補充]`：來自 Claude 訓練知識，請交叉核對原文
3. **知識截止警告**：回答藥物核准、新指引等議題時，加上：
   > 📅 本資訊以 EBMT Handbook 第8版（2024）為準，請確認是否有最新更新。
4. **臨床第一**：先給出可操作建議，再補充原理
5. **計算工具**：劑量/評分/CrCl 請執行 `scripts/hct_tools.py`，每次輸出自帶 safety disclaimer
6. **死連結保護**：若 references/ 中無對應檔案，誠實告知「此章節尚未詳細收錄，請查閱原書」
7. **不確定時**：明確說明不確定，建議查閱原書 URL：https://www.ncbi.nlm.nih.gov/books/NBK608238/

---

## 📚 快速章節路由表

根據問題類型，先查閱對應章節，再深入 references/ 資料夾。

### 🔍 問題 → 章節 對照

| 問題類型 | 章節 | 深入參考 |
|---------|------|---------|
| 移植前評估 / 適應症判斷 | Ch.11 | references/part3-methodology.md |
| 捐贈者選擇（成人/兒童）| Ch.12 | references/part3-methodology.md |
| HLA 配對原則 | Ch.9 | references/part2-biological.md ✅ |
| 預處理方案（MAC/RIC/NMA）| Ch.13 | references/part3-methodology.md |
| 幹細胞來源選擇（BM/PB/CB）| Ch.14 | references/part3-methodology.md |
| 骨髓採集 | Ch.15 | references/part3-methodology.md |
| 幹細胞動員與採集 | Ch.16, 17 | references/part3-methodology.md |
| 臍帶血 | Ch.18, 64 | references/part8-modalities.md |
| Graft 處理/冷凍保存 | Ch.19, 20 | references/part3-methodology.md |
| Chimerism 監測 | Ch.21 | references/part3-methodology.md |
| 移植後追蹤 | Ch.22 | references/part3-methodology.md |
| 血管通路（CVC）| Ch.23 | references/part4-management.md |
| 輸血支持 | Ch.24 | references/part4-management.md |
| 營養支持 | Ch.25 | references/part4-management.md |
| **GVHD 預防** | **Ch.26** | references/part4-management.md |
| 感染控制/隔離 | Ch.27, 28 | references/part4-management.md |
| 疫苗接種 | Ch.29 | references/part4-management.md |
| 心理照護 | Ch.30 | references/part4-management.md |
| 藥物交互作用 | Ch.31 | references/part4-management.md |
| 中性球低燒 | Ch.35 | references/part5-complications.md |
| 細菌感染 | Ch.36 | references/part5-complications.md |
| **黴菌感染** | **Ch.37** | references/part5-complications.md |
| **病毒感染**（CMV/EBV/HHV6…）| **Ch.38** | references/part5-complications.md |
| 其他感染（結核/弓漿蟲）| Ch.39 | references/part5-complications.md |
| 出血/血栓 | Ch.40 | references/part5-complications.md |
| Graft failure | Ch.41 | references/part5-complications.md |
| SOS/VOD（肝竇阻塞症候群）| Ch.49 | references/part6-organ.md |
| **急性 GVHD** | **Ch.43** | references/part5-complications.md |
| **慢性 GVHD** | **Ch.44** | references/part5-complications.md |
| PTLD | Ch.45 | references/part5-complications.md |
| 鐵過載 | Ch.46 | references/part5-complications.md |
| 次發性腫瘤 | Ch.47 | references/part5-complications.md |
| 眼/口腔併發症 | Ch.48 | references/part6-organ.md |
| 腸胃道併發症 | Ch.50 | references/part6-organ.md |
| 出血性膀胱炎/腎功能 | Ch.51 | references/part6-organ.md |
| 肺部非感染性併發症 | Ch.52 | references/part6-organ.md |
| 神經系統併發症 | Ch.53 | references/part6-organ.md |
| 皮膚/肌肉骨骼 | Ch.54 | references/part6-organ.md |
| 心血管/代謝症候群 | Ch.55 | references/part6-organ.md |
| 內分泌/生育/性功能 | Ch.56 | references/part6-organ.md |
| MRD 監測 | Ch.57 | references/part7-relapse.md |
| 復發藥物治療（TKI/HMA…）| Ch.58 | references/part7-relapse.md |
| DLI（供者淋巴球輸注）| Ch.59 | references/part7-relapse.md |
| CAR-T / 基因療法 | Ch.60 | references/part7-relapse.md |
| Haploidentical HCT | Ch.65 | references/part8-modalities.md ✅ |
| 老年移植 | Ch.68 | references/part8-modalities.md ✅ |
| AML（成人）| Ch.70 | references/part9-indications.md |
| AML（兒童）| Ch.71 | references/part9-indications.md |
| ALL（成人）| Ch.72 | references/part9-indications.md |
| ALL（兒童）| Ch.73 | references/part9-indications.md |
| MDS | Ch.74, 75 | references/part9-indications.md |
| 骨髓纖維化/CML | Ch.77 | references/part9-indications.md |
| 再生不良性貧血/PNH | Ch.78 | references/part9-indications.md |
| 血色素病變（SCD/Thal）| Ch.80 | references/part9-indications.md |
| 多發性骨髓瘤 | Ch.81 | references/part9-indications.md |
| 淋巴瘤（DLBCL/MCL/iNHL）| Ch.84-88 | references/part9-indications.md |

---

## 🧠 臨床決策樹（快速分流）

```
移植病人問題
├── 移植前？
│   ├── 適應症評估 → Ch.11 + Ch.70-95（疾病別）
│   ├── 捐贈者/來源 → Ch.12, 14, 64, 65
│   └── 預處理選擇 → Ch.13
│
├── 移植中（D-7 到 D+30）？
│   ├── 感染/發燒 → Ch.35, 36, 37, 38
│   ├── 器官毒性 → Ch.42（endothelial）, Ch.49（SOS/VOD）
│   ├── GVHD 預防 → Ch.26
│   └── 支持照護 → Ch.23-25, 31
│
├── 移植後早期（D+30 到 D+100）？
│   ├── 急性 GVHD → Ch.43
│   ├── 感染 → Ch.36-39
│   ├── Graft failure → Ch.41
│   └── Chimerism → Ch.21
│
└── 移植後晚期（D+100 之後）？
    ├── 慢性 GVHD → Ch.44
    ├── 感染/疫苗 → Ch.29, 38
    ├── 器官長期併發症 → Ch.48-56
    ├── MRD/復發 → Ch.57-61
    └── 次發腫瘤/生活品質 → Ch.47, 34
```

---

## 🐍 Python 工具使用說明

當問題涉及以下計算時，執行 `scripts/hct_tools.py`：

| 需求 | 工具函數 |
|-----|---------|
| BSA（體表面積）計算 | `calc_bsa(weight, height)` |
| CrCl / eGFR 計算 | `calc_crcl(age, weight, creatinine, sex)` |
| Sorror HCT-CI 評分 | `hct_ci_score(comorbidities_dict)` |
| GVHD 分期 | `grade_gvhd(skin_pct, bilirubin, stool_vol)` |
| 藥物劑量試算 | `drug_dose(drug, weight, bsa, renal)` |
| Checklist 輸出（JSON）| `print_checklist(phase)` |

執行方式：`python3 /home/claude/ebmt-handbook/scripts/hct_tools.py`

---

## 📋 常用 Checklist（直接輸出）

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

### 中性球低燒處理 Checklist（Ch.35）
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

## 📖 深入閱讀指引

當需要完整的臨床指引內容，請 `view` 對應 references 檔案：

```
view /home/claude/ebmt-handbook/references/part2-biological.md   # HLA、免疫重建（Ch.7-10）✅新增
view /home/claude/ebmt-handbook/references/part3-methodology.md   # 移植方法論（Ch.11-22）
view /home/claude/ebmt-handbook/references/part4-management.md   # 一般處置、疫苗（Ch.22-34）
view /home/claude/ebmt-handbook/references/part5-complications.md # GVHD、感染、鐵過載（Ch.35-47）✅擴充
view /home/claude/ebmt-handbook/references/part6-organ.md         # 器官併發症（Ch.48-56）✅擴充
view /home/claude/ebmt-handbook/references/part7-relapse.md       # 復發/CAR-T（Ch.57-65）
view /home/claude/ebmt-handbook/references/part8-modalities.md    # 特殊移植模式（Ch.63-69）✅新增
view /home/claude/ebmt-handbook/references/part9-indications.md   # 各疾病+兒童適應症（Ch.70-95）✅擴充
```

---

> ⚠️ 本技能提供臨床參考，不取代個別病人的醫療決策。
> 所有建議均引用自 EBMT Handbook 第8版（2024），請依據最新機構指引調整。
