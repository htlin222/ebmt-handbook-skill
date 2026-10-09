---
title: 生物學：HSC 負責換種、HLA 決定誰是外人、免疫照順序回來
kicker: 02 · 生物學
chapters: Ch.7–10
---

<div class="fp"><b>第一性原理</b>　移植能成立靠兩個事實：<b>（1）HSC 會 self-renew 又會 homing</b>——少量 CD34⁺ 細胞從靜脈打入，靠 CXCR4–CXCL12（SDF-1）回到 niche，就能重建一輩子造血；<b>（2）T cell 直接辨認外來 HLA</b>——1–10% 的 T cell 對 allo-HLA 有反應（遠高於任何單一病原），所以 HLA 差越多，GVHD（GvH 方向）與 rejection（HvG 方向）越強；HLA 全合時剩下的差異是 mHA。免疫重建則是「先 innate、後 adaptive；T cell 先靠周邊擴增、後靠胸腺」，所以感染照時間序出現。</div>

## MECE 分岔：donor 與宿主之間的「外人訊號」有哪幾種

| 層 | 問什麼 | 分支（互斥、窮盡） | 決定了什麼 |
| --- | --- | --- | --- |
| 1 誰認誰 | 辨認的細胞 | T cell（TCR 認 HLA＋peptide）／NK cell（KIR 認「missing self」，不需 HLA 呈現）／B cell（抗體：DSA） | T → GVHD／GVL／rejection；NK → GVL（AML）；DSA → graft failure |
| 2 T cell 認什麼 | HLA 是否相同 | HLA mismatch（direct allorecognition，強）／HLA match 但 peptide 不同＝mHA（HY、HA-1；HLA-identical sibling 仍有 GVHD 的原因） | mismatch 數目 → GVHD／NRM；mHA 只表現在造血系（HA-1）→ 選擇性 GVL |
| 3 方向 | mismatch 在誰身上 | GvH 方向（受者有、donor 沒有的 allele）／HvG 方向（donor 有、受者沒有）／雙向 | GvH → GVHD；HvG → rejection（homozygous 時只有單向） |
| 4 層級 | 差在哪個解析度 | Antigen（low resolution，血清學）／allele（high resolution，同 antigen 不同 peptide groove） | 兩者在 unrelated donor 都算 mismatch；HLA-C antigen mismatch 較 allele 差 |
| 5 位點 | 哪一類 HLA | Class I（A、B、C：所有有核細胞，呈現給 CD8）／class II（DRB1、DQB1、DPB1：APC，呈現給 CD4） | 8/8＝A、B、C、DRB1；10/10 加 DQB1；DPB1 看 permissive（TCE 演算法） |

## 速記：HLA 與非 HLA 因素

| 項目 | 數字／重點 |
| --- | --- |
| 遺傳 | HLA 在第 6 對染色體成 haplotype 遺傳：每個手足 25% 全合，子女／父母必為 haploidentical |
| MUD 每多 1 個 allele mismatch（A、B、C、DRB1） | 1 年 OS 約降 8–10%（NMDP，8/8 vs 7/8）；DQB1 單獨 mismatch 影響小 |
| DPB1 | 約 80% 的 10/10 MUD 為 DPB1 mismatch；non-permissive（TCE）→ aGVHD 與 NRM ↑，relapse 稍 ↓ |
| DSA | 受者對 donor HLA 的抗體（經產婦、輸血、前次移植）；MFI >1,000 有意義、>5,000 高危（依實驗室），C1q⁺ 最危險（見 06 頁） |
| KIR | KIR-ligand mismatch（GvH 方向）在 T-depleted haplo 的 AML 降 relapse（Perugia）；donor KIR B haplotype 對 AML 有利；PTCy 下效果不一致 |
| HLA loss relapse | Haplo 後腫瘤刪除 mismatched haplotype 逃脫 → 二次移植要換 donor（見 17 頁） |

<!-- pair -->

## 速記：細胞與免疫重建時程

| 細胞 | 恢復 | 臨床對應 |
| --- | --- | --- |
| Neutrophil | PBSC ~D+14、BM ~D+21、cord ~D+25–30 | 早期細菌／Candida |
| NK、monocyte | 數週（第一個回來的淋巴球） | 早期 GVL；KIR 效應 |
| CD8 T | 2–4 個月（周邊擴增、memory 為主、CD4/CD8 倒置） | CMV／EBV 控制 |
| CD4 T | 6–12 個月以上；naive 要靠胸腺（TREC），老人更慢 | PCP、黴菌、VZV |
| B cell → IgG／IgA | B 6–12 月；IgG 1–2 年，IgA 最晚 | 包膜菌、疫苗時機（見 14 頁） |
| 延遲因子 | 年齡、ex vivo TCD／ATG、cord、cGVHD＋類固醇、rituximab、CMV | — |

## 速記：HSC 與非造血細胞

| 細胞 | 標記／特性 | 為什麼重要 |
| --- | --- | --- |
| LT-HSC | CD34⁺CD38⁻CD90⁺CD45RA⁻；靜止、self-renew；高 ALDH | 不怕 PTCy（ALDH 代謝 Cy）；CD34 計數只是替代指標 |
| Niche | Endosteal／perivascular（CAR cell、endothelium）；CXCL12、SCF | G-CSF 切斷 CXCL12／VCAM-1、plerixafor 擋 CXCR4 → 動員（見 04 頁） |
| Naive T（CD45RA⁺CCR7⁺） | Alloreactivity 主力 | CD45RA depletion 的理由 |
| Memory T | 帶病原免疫，GVHD 較少 | 病毒特異 T cell 來源 |
| Treg（CD4⁺CD25⁺FOXP3⁺） | 抑制 GVHD；高 ALDH | PTCy 後被保留 |
| γδ T、iNKT | 不受 HLA 限制，少 GVHD | αβ-TCD 保留它們 |
| MSC | CD73⁺CD90⁺CD105⁺、CD45⁻CD34⁻HLA-DR⁻；三向分化（ISCT 2006） | 移植後<b>基質仍是宿主來源</b>；remestemcel-L 用於兒童 SR-aGVHD |

## 破題關鍵句

| 題 | 一開口就講 |
| --- | --- |
| 為何 HLA 要配 | 「T cell 直接認 allo-HLA，前驅頻率比任何病原高百倍；mismatch 數＝alloreactivity 強度。」 |
| MSD 為何還有 GVHD | 「HLA 一樣但 peptide 不一樣——minor histocompatibility antigen，例如女給男的 HY。」 |
| 免疫重建 | 「先 innate 後 adaptive；T cell 先周邊擴增、窄 repertoire，胸腺產新 naive T 要半年以上。」 |
| KIR | 「NK 認的是 missing self，不靠 HLA 呈現，所以在 HLA mismatch 時反而能殺 AML。」 |

## 容易被電

- 把 class II 只講 DR：移植配對要 DRB1、DQB1，DPB1 用 permissive／non-permissive 判斷。
- 說 antigen 一樣就算 match：unrelated donor 要 high-resolution allele match。
- 以為移植後 MSC／基質也換成 donor：stroma 仍是宿主，chimerism 驗的是造血細胞。
- 把 homozygous 位點當雙向：只有一個方向有 mismatch（GvH-only 或 HvG-only）。
- CD4 恢復跟 ANC 一起：ANC 兩三週，CD4 >200 常要 6–12 個月，PCP 預防要撐到那時。
