---
name: building-booklet-pdfs
description: Builds, edits, validates and publishes this repo's EBMT Handbook oral-exam booklet — one landscape A4 sheet per topic (24 sheets covering all 95 chapters of the EBMT Handbook 8th ed.), written in Traditional Chinese with English terms in the first-principle + MECE format, rendered from booklet/pages/ to a PDF with a bookmark outline and released to booklet-latest. Covers writing or fixing pages, layout/overflow checks, page-by-page medical validation with one subagent per page, and publishing. Use when the user asks to change, add or verify booklet / 手冊 / A4 / 口試 / 精華 / PDF content.
---

# EBMT 口試手冊 PDF：撰寫、驗證、建置、發布

一份內容、一種版面：橫式 A4，**一主題一張**，固定外框、寫到剛好塞滿。內容只改 `booklet/pages/`。

| 產物 | 檔案 | 發布位置 |
| --- | --- | --- |
| A4 手冊（24 張，兩層書籤：章 → h2 小節） | `dist-booklet/ebmt-handbook-oral-exam-booklet.pdf` | release `booklet-latest` |

push 到 main 且動到 `booklet/**`、`scripts/build_booklet.py` 或 workflow 時，`.github/workflows/booklet.yml` 自動重建並覆蓋 release 資產。
技能本體 `ebmt-handbook/` 由另一個 workflow（`release.yml`）打包，**手冊不放進技能 zip**。

## 檔案地圖

| 要改什麼 | 檔案 |
| --- | --- |
| 正文（每檔一張 A4） | `booklet/pages/NN-*.md` — 寫法見 `booklet/README.md` |
| 樣式（灰階、斑馬紋、並排） | `booklet/print.css` |
| md → HTML、量溢出、印 PDF、加書籤 | `scripts/build_booklet.py`（uv inline script：markdown、playwright、pypdf） |
| 表格改回緊湊格式 | `.claude/skills/building-booklet-pdfs/scripts/compact_tables.py` |
| 內容來源（技能摘要，有錯，僅作起點） | `ebmt-handbook/references/part*.md` |

## 指令

```bash
uv run --script scripts/build_booklet.py --check     # 只量版面
uv run --script scripts/build_booklet.py             # 量版面＋輸出 HTML 與 PDF 到 dist-booklet/
BOOKLET_OUT=dist-me uv run --script scripts/build_booklet.py --check   # 平行寫稿各建各的目錄
python3 .claude/skills/building-booklet-pdfs/scripts/compact_tables.py booklet/pages/*.md
```

判讀：每張要 `ok` 且**剩 20–150px**、不能有「表格超寬」。CI 用 Noto Sans CJK，雲端容器沒有它時退到 WenQuanYi Zen Hei，字寬不同，所以要留 ≥20px 餘裕。
Chromium 優先順序：`CHROMIUM_PATH` → `/opt/pw-browsers/chromium`（Claude Code 雲端容器預裝）→ playwright 自帶 → 本機 Chrome。

## 工作流程

### 改既有內容（最常見）

```
- [ ] git pull（可能有別的 session 也在改）
- [ ] 改 booklet/pages/ 的 md；只改有問題的格子，不重寫整頁
- [ ] compact_tables.py 跑過改動的檔
- [ ] uv run --script scripts/build_booklet.py --check：全部 ok、剩 20–150px
- [ ] git add 只加自己改的路徑（不要 git add -A），commit，push
```

溢出時：刪次要字句，**不刪切點數字**；或把短段落用 `<!-- pair -->` 並排（見 `booklet/README.md`）。

### 新增一章

在 `booklet/pages/` 新增 `NN-slug.md`（檔名排序＝頁序，`10a-` 可插在 10 與 11 之間），結構：第一性原理框 → MECE 分岔表 → 速記表 → 破題關鍵句 → 容易被電。`01-map.md` 裡的「本手冊頁」欄要跟著改，其他頁的「見 NN 頁」交叉引用也要檢查。

### 逐頁醫學驗證（使用者要求「validate」「查證」時）

一頁一個 subagent，平行派出。每個 subagent：挑這頁最容易錯的切點／分期／試驗名／劑量查證（有 OpenEvidence 或 PubMed 工具就用，附來源），檢查分岔表是否 MECE，只改自己那一頁，用自己的 `BOOKLET_OUT` 量版面，回報每條修改與依據。任務說明範本與主控收尾見 [references/validation.md](references/validation.md)。

## 一定要記得的坑

- **references/ 不是原書**：標 [模型補充] 的段落是模型寫的，也有已知錯誤（aGVHD 分級、BOS 標準、CAR-T 試驗對應、MM 維持證據等）。手冊以原書與現行指引為準。
- **表格內不能有 `|`**：會被當成欄位分隔；用「／」。
- **原始 HTML 區塊內不會解析 Markdown**：`<div class="fp">` 裡要粗體就寫 `<b>`，不要寫 `**`。
- **字級只有兩種**（8pt 內文、7.1pt 表格）：不要在 md 裡加 inline style 或新字級，Chrome 每種字級各嵌一份字型，PDF 會暴增。
- **表格被自動補對齊空白**：寫完跑 `compact_tables.py`；版面量測要在最終格式下做。

## 發布確認

```bash
gh release download booklet-latest -p "*.pdf" -D /tmp/bk --clobber
uv run --with pypdf python -c "
from pypdf import PdfReader; import glob
for f in sorted(glob.glob('/tmp/bk/*.pdf')):
    r=PdfReader(f); p=r.pages[0]
    print(f, len(r.pages), 'pages', round(float(p.mediabox.width)/72*25.4), 'x', round(float(p.mediabox.height)/72*25.4), 'mm', len(r.outline), 'top bookmarks')"
```

應為 297 × 210 mm、頁數＝`booklet/pages/*.md` 檔數、頂層書籤數＝頁數。
