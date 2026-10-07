# Part I: Introduction（簡介） — Ch.1–6


---

> 中文快速摘要（quick reference）。**權威內容為原書全文**：`references/chapters/chNN-*.md`。
> `[書中驗證]` = 已對照原書；`[模型補充]` = 模型通用知識，引用前請以全文核對。


---

## Chapter 1 — HCT 歷史沿革 [模型補充]

**早期（1950–60年代）**（Ch.1.2）：
- 首次嘗試在輻射後患者進行骨髓輸注，多數失敗
- 動物實驗（狗）奠定了 HLA 配對的重要性（Storb/Thomas 團隊）

**1968–1980 年代復興**（Ch.1.4）：
- 1968 年：首例成功的 HLA 相合兄弟 HCT（SCID 患者，E. Donnall Thomas）
- 1970 年代：CSA 引入 → GVHD 控制改善
- 1990 年代：非親屬捐贈者登記建立（NMDP）、臍帶血移植開始

**近代進展**（Ch.1.5）：
- RIC/NMA 方案：延伸移植年齡至 >70 歲
- Haploidentical PTCy 方案普及
- CAR-T 細胞療法興起（部分替代 Auto-HCT）

📖 來自 EBMT Handbook 第8版 第 1 章

---

## Chapter 2 — EBMT 組織：歷史、現況與未來 [模型補充]

**歷史**（Ch.2.2）：
- 1974 年成立於巴黎，最初為歐洲移植中心非正式交流網絡
- 現為全球最大 HCT 登記資料庫，每年收集 >45,000 筆移植資料

**現況**（Ch.2.3）：
- 超過 600 個成員中心，47 個國家
- EBMT 登記資料庫：多項重要臨床研究與指引的基礎

**功能**：
- 制定臨床指引（Working Parties：ALWP、CLWP、PDWP 等）
- JACIE 認證（見 Ch.5）
- 年度大會（每年 3–4 月）

📖 來自 EBMT Handbook 第8版 第 2 章

---

## Chapter 3 — 捐贈者登記：連接捐贈者與受者 [模型補充]

**非親屬捐贈者搜尋流程**（Ch.3.2）：
1. 病患 HLA typing → 登記資料庫搜尋（BMDW、NMDP、DKMS 等）
2. 初步匹配 → 捐贈者確認意願 → 高解析度 HLA typing
3. 選擇最佳捐贈者（HLA、CMV、年齡）→ 醫療評估
4. 採集協調（BM 或 PBSC）

**全球登記庫規模**（Ch.3.1）：
- 全球超過 4,000 萬名登記捐贈者 + 800,000 份臍帶血單位
- DKMS 最大（>1,200 萬，德國起源）

**臍帶血登記**（Ch.3）：
- 臍帶血庫：Eurocord、NETCORD；需滿足最低 TNC 與 CD34+ 量

📖 來自 EBMT Handbook 第8版 第 3 章

---

## Chapter 4 — HCT 單位設施要求 [模型補充]

**住院單位**（Ch.4.2）：
- 正壓隔離房間（HEPA 過濾）
- 每間病房獨立衛浴
- 嚴格探訪控制

**必備支援服務**（Ch.4.3-11）：
- 血庫（24h 備血、照射血品、CMV 安全血）
- HLA 實驗室（10-locus typing 能力）
- 幹細胞採集與處理設施（GMP 等級）
- 24h 放射科、加護病房支援

**CAR-T 單位額外需求**（Ch.4.13）：
- Apheresis 採集能力
- CRS/ICANS 處理經驗與設備
- 冷鏈物流安排（送至製造廠再回院）

📖 來自 EBMT Handbook 第8版 第 4 章

---

## Chapter 5 — JACIE 認證 [模型補充]

**JACIE（Joint Accreditation Committee ISCT-EBMT）**（Ch.5.2）：
- 歐洲 HCT 中心品質認證系統（與 FACT 合作）
- 評估臨床、採集、處理三大面向

**認證影響**（Ch.5.3）：
- 獲認證中心：NRM 較低（研究顯示 ~20% 差異）
- 部分國家：認證為移植中心資格取得的前提

**認證流程**：
- 自我評估 → 文件審查 → 現場視察 → 矯正行動 → 頒證（3年效期）

📖 來自 EBMT Handbook 第8版 第 5 章

---

## Chapter 6 — HCT 統計方法 [模型補充]

**主要終點定義**（Ch.6.2）：
- **Overall Survival（OS）**：全因死亡
- **Event-Free Survival（EFS）**：無任何事件（復發 + 死亡）
- **Non-Relapse Mortality（NRM）**：非復發相關死亡（competing risk）
- **Cumulative Incidence of Relapse（CIR）**：cumulative incidence function

**Competing Risk 概念**（Ch.6.3）：
- 在 HCT 中，復發和 NRM 互為競爭風險
- 用 Kaplan-Meier 估計復發率會**高估**（因為忽略了 NRM 的競爭）
- 正確方法：Gray's test + cumulative incidence function（Fine & Gray model）

**常用多變量方法**（Ch.6.4）：
- Cox proportional hazards（OS/EFS）
- Fine & Gray（NRM、CIR）
- Landmark analysis（處理時依共變量）

📖 來自 EBMT Handbook 第8版 第 6 章
