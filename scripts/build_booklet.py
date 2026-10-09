#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["markdown>=3.5", "playwright>=1.45", "pypdf>=4"]
# ///
"""把 booklet/pages/*.md 排成橫式 A4 手冊，量每一張有沒有溢出，再印成有書籤的 PDF。

每個 md 檔＝一張橫式 A4（297×210mm）。.sheet 固定尺寸、overflow hidden，所以溢出不會多出一頁、
而是被裁掉——這裡量 .inner 的自然高度跟 .content 的可用高度，超過就列出頁碼與 px，exit 1 讓 CI 擋下來。

用法：
    uv run --script scripts/build_booklet.py           # 檢查並輸出 HTML + PDF 到 dist-booklet/
    uv run --script scripts/build_booklet.py --check   # 只檢查，不出 PDF
平行寫稿時用 BOOKLET_OUT=<目錄> 各建各的，避免互相覆蓋。
"""

from __future__ import annotations

import html
import io
import os
import pathlib
import re
import sys

import markdown
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ROOT / "booklet" / "pages"
CSS = ROOT / "booklet" / "print.css"
OUT_DIR = ROOT / os.environ.get("BOOKLET_OUT", "dist-booklet")
OUT_HTML = OUT_DIR / "index.html"
OUT_PDF = OUT_DIR / "ebmt-handbook-oral-exam-booklet.pdf"  # ASCII 檔名，GitHub Release 會改掉 CJK

BRAND = "EBMT Handbook 8th ed. 口試精華"
SOURCE = "EBMT Handbook 8th ed. (2024), CC BY 4.0"

FRONT = re.compile(r"^---\s*\n(.*?)\n---\s*\n?", re.S)
PAIR = re.compile(r"<!--\s*pair\s*-->\s*$")


def parse_front(raw: str) -> tuple[dict[str, str], str]:
    m = FRONT.match(raw)
    if not m:
        return {}, raw
    data = {}
    for line in m.group(1).splitlines():
        k, sep, v = line.partition(":")
        if sep:
            data[k.strip()] = re.sub(r"\s+#.*$", "", v.strip()).strip("\"'")
    return data, raw[m.end():]


def render(md: str) -> str:
    return markdown.markdown(md, extensions=["tables"])


def layout_sheet(body: str) -> str:
    """依 `## ` 切段，各自包成 <section>。

    並排規則（寬度換高度）：
    - 段落結尾寫一行 `<!-- pair -->`，這段與下一段並排成兩欄。
    - 「破題關鍵句」＋「容易被電」兩個固定結尾段預設並排。
    標題之前的內容（第一性原理框）照原樣輸出。
    """
    parts = re.split(r"^(?=## )", body, flags=re.M)
    lead = "" if parts[0].startswith("## ") else parts.pop(0)
    secs = []
    for p in parts:
        title = re.search(r"^## (.+)$", p, re.M)
        secs.append({"md": PAIR.sub("", p), "title": title.group(1) if title else "", "pair": bool(PAIR.search(p))})
    out = [render(PAIR.sub("", lead))] if lead.strip() else []
    i = 0
    while i < len(secs):
        s, n = secs[i], secs[i + 1] if i + 1 < len(secs) else None
        auto_tail = n and "破題關鍵句" in s["title"] and "容易被電" in n["title"]
        if n and (s["pair"] or auto_tail):
            out.append(f'<div class="pair"><section>{render(s["md"])}</section><section>{render(n["md"])}</section></div>')
            i += 2
        else:
            out.append(f"<section>{render(s['md'])}</section>")
            i += 1
    return "\n".join(out)


def build_html() -> tuple[str, int]:
    files = sorted(PAGES.glob("*.md"))
    total = len(files)
    sheets = []
    for i, f in enumerate(files, 1):
        data, body = parse_front(f.read_text(encoding="utf-8"))
        title = html.escape(data.get("title", f.stem))
        kicker = html.escape(data.get("kicker", f"{i:02d}"))
        chapters = html.escape(data.get("chapters", ""))
        sheets.append(f"""
<div class="sheet" id="{f.stem}" data-page="{i}">
  <header><h1>{title}</h1><div class="kicker">{kicker} · {BRAND}</div></header>
  <div class="content"><div class="inner">
{layout_sheet(body.strip())}
  </div></div>
  <footer><span>{SOURCE}{' · ' + chapters if chapters else ''}</span><span>{i} / {total} · 衍生整理，非官方；臨床以最新指引與仿單為準</span></footer>
</div>""")
    doc = f"""<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>EBMT 口試手冊</title><style>{CSS.read_text(encoding="utf-8")}</style></head>
<body><div class="toolbar">{total} 張橫式 A4：第一性原理 × MECE 分岔 × 速記表 × 破題句 × 容易被電</div>
{''.join(sheets)}
</body></html>"""
    return doc, total


MEASURE = """
() => [...document.querySelectorAll('.sheet')].map(s => {
  const c = s.querySelector('.content');
  const need = c.querySelector('.inner').offsetHeight;
  return { page: s.dataset.page, id: s.id, title: s.querySelector('h1').textContent,
           over: Math.max(0, need - c.clientHeight), room: Math.max(0, c.clientHeight - need),
           wide: [...s.querySelectorAll('table')].filter(t => t.scrollWidth > t.parentElement.clientWidth + 1).length };
})
"""
OUTLINE = """
() => [...document.querySelectorAll('.sheet')].map((s, i) => ({
  title: s.querySelector('h1').textContent.trim(), page: i,
  subs: [...s.querySelectorAll('.inner h2')].map(h => h.textContent.trim()),
}))
"""


def launch(p):
    """CHROMIUM_PATH > 雲端容器預裝的 /opt/pw-browsers/chromium > playwright 自帶 > 本機 Chrome。"""
    exe = os.environ.get("CHROMIUM_PATH") or ("/opt/pw-browsers/chromium" if pathlib.Path("/opt/pw-browsers/chromium").exists() else None)
    for kw in ([{"executable_path": exe}] if exe else []) + [{}, {"channel": "chrome"}]:
        try:
            return p.chromium.launch(**kw)
        except Exception:  # noqa: BLE001 - 換下一個
            continue
    raise SystemExit("找不到可用的 Chromium；先跑 `uv run --with playwright playwright install chromium`")


def with_outline(pdf: bytes, chapters: list[dict]) -> bytes:
    """兩層書籤：章 → 章內小節（h2），開檔時顯示書籤欄。"""
    from pypdf import PdfReader, PdfWriter

    writer = PdfWriter(clone_from=PdfReader(io.BytesIO(pdf)))
    for ch in chapters:
        item = writer.add_outline_item(ch["title"], ch["page"])
        for sub in ch["subs"]:
            writer.add_outline_item(sub, ch["page"], parent=item)
    writer.page_mode = "/UseOutlines"
    buf = io.BytesIO()
    writer.write(buf)
    return buf.getvalue()


def main() -> int:
    check_only = "--check" in sys.argv
    doc, total = build_html()
    OUT_DIR.mkdir(exist_ok=True)
    OUT_HTML.write_text(doc, encoding="utf-8")

    with sync_playwright() as p:
        browser = launch(p)
        page = browser.new_page()
        page.emulate_media(media="print")
        page.goto(OUT_HTML.as_uri(), wait_until="load")
        page.wait_for_timeout(300)  # 等字型載完再量
        rows = page.evaluate(MEASURE)
        for r in rows:
            flag = "溢出" if r["over"] else "ok"
            extra = f"超出 {r['over']}px" if r["over"] else f"剩 {r['room']}px"
            wide = f"  ⚠ {r['wide']} 個表格超寬" if r["wide"] else ""
            print(f"[{flag:>2}] p{r['page']:>2} {r['title']}  ({extra}){wide}")
        if not check_only:
            pdf = page.pdf(prefer_css_page_size=True, print_background=True,
                           margin={"top": "0", "right": "0", "bottom": "0", "left": "0"})
            OUT_PDF.write_bytes(with_outline(pdf, page.evaluate(OUTLINE)))
            print(f"\n→ {OUT_PDF.relative_to(ROOT)}  ({total} 頁)")
        browser.close()

    bad = [r for r in rows if r["over"] or r["wide"]]
    if bad:
        print(f"\n{len(bad)} 頁溢出或超寬，請刪減：{', '.join('p' + r['page'] for r in bad)}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
