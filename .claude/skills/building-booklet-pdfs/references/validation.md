# 逐頁驗證：任務說明範本與收尾

## 派工方式

- 一頁一個 `general-purpose` subagent，同一則訊息平行派出（24 頁可分兩批）。
- 用量上限中斷一批 subagent 時，重派說明加「接手說明」：先 `git diff -- <檔>` 看半完成的修改，對的保留、錯的改回。
- subagent 回報檔案被改名或多出新頁，代表有別的 session 在改 repo：先協調誰 commit 哪些檔。

## 任務說明範本（存成 scratchpad 檔，每個 subagent 的 prompt 指向它）

```markdown
# 手冊單頁驗證任務（共用說明）

Repo：<repo 路徑>。手冊在 `booklet/pages/NN-*.md`（每檔＝一張橫式 A4）。寫作規範見 `booklet/README.md`，先讀它。
內容對應 EBMT Handbook 第 8 版（2024）的章節，見頁面 frontmatter 的 `chapters:`。

## 你要做的三件事

1. 醫學正確性
   - 挑這頁最容易錯、最常被追問的主張：切點、分期分級、試驗名稱與結果、劑量、核准適應症、指引版本。
   - 有 OpenEvidence／PubMed 工具就查，一次打包 3–6 個主張、用英文問；最多 4–5 次查詢。
   - 明確被反駁 → 改；有條件或已過時 → 改成現行說法或加限定；查不到 → 保留，不要憑空改。
2. MECE 檢查
   - 每張分岔表：每層只問一個問題？分支互斥且窮盡？由頁首第一性原理推得出來？
   - 常見毛病：不同層級平列、同一項出現在兩支、漏一整類、「其他」垃圾桶分支。修法是重切成乾淨的二分或三分。
   - 速記表、破題句、容易被電有沒有跟分岔表或其他頁互相矛盾。
3. 修改：只改有問題的地方，不重寫整頁、不改風格、不擴寫。

## 版面驗證（必做）

BOOKLET_OUT=dist-v-<頁碼> uv run -q --script scripts/build_booklet.py --check 2>&1 | grep -E "p ?<頁碼> "
- 你那頁要 ok 且剩 20–150px；溢出就刪次要字句，不刪切點數字。做完刪掉 dist-v-<頁碼>。
- 表格維持緊湊 `| a | b |`。只准改你負責的檔案，不要 commit。

## 最後回報（繁體中文，精簡）
- 修改清單：每條一行「原本 → 改成｜依據（來源網址或文獻）」；MECE 結構修改另列。
- 查證了但沒改的重點主張（一行帶過）。
- 最終剩餘 px。
```

## 每個 subagent 的 prompt

> 先讀 <說明檔路徑> 並照做。你負責第 08 頁：`booklet/pages/08-agvhd.md`。重點查證：MAGIC 分期切點、SR-aGVHD 定義、ruxolitinib 的 REACH2 結果與核准年份、類固醇起始劑量。

## 主控收尾

```
- [ ] 讀每份回報：跨頁不一致（同一個切點兩頁寫法不同）由主控統一修
- [ ] 清掉殘留的 dist-v-* 目錄
- [ ] compact_tables.py 跑過所有改動的 md
- [ ] uv run --script scripts/build_booklet.py，全部 ok
- [ ] git add 明確路徑 → commit（訊息寫重要修正與依據）→ push → 等 booklet workflow 綠 → 下載 release PDF 確認
```
