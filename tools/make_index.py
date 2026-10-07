"""Generate ebmt-handbook/references/INDEX.md from tools/chapter_index.json.

usage: python3 -I tools/make_index.py
"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, "ebmt-handbook", "references")
idx = {r["n"]: r for r in json.load(open(os.path.join(ROOT, "tools", "chapter_index.json")))}

PARTS = [
    ("I", "Introduction", "簡介", 1, 6, "part01-introduction"),
    ("II", "Biological Aspects", "生物學面向", 7, 10, "part02-biological"),
    ("III", "Methodology and Clinical Aspects", "方法論與臨床面向", 11, 22, "part03-methodology"),
    ("IV", "General Management of the Patient", "病人一般處置", 23, 34, "part04-general-management"),
    ("V", "HCT Complications and Management", "HCT 併發症與處置", 35, 47, "part05-complications"),
    ("VI", "Specific Organ Complications", "器官特定併發症", 48, 56, "part06-organ-complications"),
    ("VII", "Prevention and Management of Relapse", "復發預防與處置", 57, 62, "part07-relapse"),
    ("VIII", "Specific Modalities of HCT and Management", "特殊移植模式", 63, 69, "part08-modalities"),
    ("IX", "Indications and Results", "適應症與結果", 70, 94, "part09-indications"),
]
assert sorted(idx) == list(range(1, 95))

numbered = 0
for r in idx.values():
    numbered += len(re.findall(r"(?m)^\*\*Table \d+\.\d+", open(os.path.join(REF, r["file"])).read()))
words = sum(r["words"] for r in idx.values())
tables = sum(r["tables"] for r in idx.values())
figures = sum(r["figures"] for r in idx.values())

L = ["# EBMT Handbook 8th ed. (2024) — Full Table of Contents", "",
     "*The EBMT Handbook: Hematopoietic Cell Transplantation and Cellular Therapies*, 8th ed. "
     "Sureda A, Corbacioglu S, Greco R, Kröger N, Carreras E (eds). Springer, Cham; 2024. "
     "https://doi.org/10.1007/978-3-031-44080-9 — Open Access, CC BY 4.0.", "",
     f"**94 chapters · 9 Parts · ~{words // 1000}k words · {tables} tables ({numbered} numbered, the rest "
     f"un-numbered boxes) · {figures} figures.** Each chapter file holds the complete original text: abstract, "
     "keywords, every section, all tables, figures with captions, equations, Key Points and the reference list. "
     "The `summaries/` files are short Chinese notes and are **not** authoritative.", "",
     "| Path | Content |", "|---|---|",
     "| `chapters/chNN-*.md` | Full original text of chapter NN |",
     "| `figures/chNN-fig*.{jpg,png}` | Figures of chapter NN (embedded in the chapter text) |",
     "| `summaries/partNN-*.md` | 中文快速摘要 per Part |", ""]
for roman, en, zh, lo, hi, summ in PARTS:
    L += [f"## Part {roman}: {en}（{zh}）— Ch.{lo}–{hi}", "",
          f"Summary: [`summaries/{summ}.md`](summaries/{summ}.md)", "",
          "| Ch | Title | File | Pages | Tables | Figures |", "|---:|---|---|---|---:|---:|"]
    for n in range(lo, hi + 1):
        r = idx[n]
        L.append(f"| {n} | {r['title']} | [`{r['file']}`]({r['file']}) | {r['pages']} | {r['tables']} | {r['figures']} |")
    L.append("")
open(os.path.join(REF, "INDEX.md"), "w").write("\n".join(L))
print(words, tables, numbered, figures)
