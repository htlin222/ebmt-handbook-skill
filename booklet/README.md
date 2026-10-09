# EBMT 口試手冊（A4 booklet）寫作規範

`booklet/pages/*.md` 每一個檔案＝一張**橫式** A4（297×210 mm），依檔名順序排成手冊；
`scripts/build_booklet.py` 把它轉成 HTML、量每一張有沒有溢出，再印成有兩層書籤（章 → h2 小節）的 PDF。
內容來源是 EBMT Handbook 第 8 版（2024，CC BY 4.0）；`ebmt-handbook/references/` 是技能的摘要，
**裡面有標 [模型補充] 的段落與少數錯誤**，寫手冊時以原書與現行指引為準，不要照抄。

## 每頁的固定結構

```markdown
---
title: 急性 GVHD：donor T cell 打三個上皮
kicker: 08 · GVHD
chapters: Ch.43, 66
---

<div class="fp"><b>第一性原理</b>　一句話，講出這一章所有分岔都從哪個生理事實推出來。</div>

## MECE 分岔

| 層 | 問什麼 | 分支（互斥、窮盡） | 決定了什麼 |
| … |

## 速記表

（一到三張表：切點、分期、劑量、試驗名）

## 破題關鍵句

| 題 | 一開口就講 |

## 容易被電

- 三到五條，一行一條
```

- `title`：中文主題＋冒號＋一句點出第一性原理的副標。`kicker`：`NN · 分組`。`chapters`：對應原書章號（頁尾會顯示）。
- 語言：**繁體中文敘述＋英文專有名詞**（藥名、試驗名、分期系統、病名首次出現用英文，例：「肝竇阻塞症候群（SOS/VOD）」）。

## 版面：橫式、斑馬紋、並排

- 「破題關鍵句」＋「容易被電」兩段自動並排成兩欄。
- 其他短段落要並排：在該段結尾（下一個 `## ` 之前）寫一行 `<!-- pair -->`，這段就跟下一段並排。
- 樣式在 `booklet/print.css`（全灰階、表格奇偶列斑馬紋）。不要在 md 裡寫 inline style。
- 表格內不能用 `|` 字元；需要「或」就寫「／」。

## 密度與長度

- 字體 8pt、表格 7.1pt。一張要剛好塞滿：`build_booklet.py --check` 顯示 `ok` 且**剩 20–150px**（CI 用 Noto Sans CJK，字寬與本機不同，要留餘裕；剩太多代表還能補一個切點或陷阱）。
- 只用表格與條列，不寫段落。一格最多兩句。
- 手冊留的是**能自己生出答案的東西**：第一性原理、分岔、切點數字、破題句、陷阱。說理與文獻細節不進來。

## 第一性原理 + MECE 的意思

- **第一性原理**：不是口訣，是一個站得住的生物或邏輯事實（例：GVHD 與 GVL 是同一群 alloreactive T cell；人體沒有排鐵機制；Fanconi anemia 不會修 DNA cross-link）。整章的分岔要能從它推出來。
- **MECE**：每一層分岔的分支要**互斥**（一個病人只會落在一支）且**窮盡**（沒有病人落在分支外）。原書清單不 MECE 時，重切成乾淨的二分或三分，再把原項目掛到分支底下。不要用「其他」當垃圾桶。
- 每一層只問**一個**問題；答案直接決定下一步要 order 什麼或選哪條治療路徑。

## 指令

```bash
uv run --script scripts/build_booklet.py --check     # 只量版面
uv run --script scripts/build_booklet.py             # 量版面＋輸出 dist-booklet/*.pdf
python3 .claude/skills/building-booklet-pdfs/scripts/compact_tables.py booklet/pages/*.md
BOOKLET_OUT=dist-me uv run --script scripts/build_booklet.py --check   # 平行寫稿各建各的
```
