"""Convert EBMT Handbook 8th ed. (Springer OA, CC BY 4.0) chapter HTML to Markdown.

usage: python3 -I tools/build_from_springer.py RAW_CACHE_DIR ebmt-handbook/references [CHAPTER ...]

Writes references/chapters/chNN-*.md, references/figures/*, and tools/chapter_index.json.
RAW_CACHE_DIR caches the downloaded HTML (use a scratch directory).
"""
import json, os, re, subprocess, sys, time, urllib.request
import bs4

RAW, OUT = sys.argv[1], sys.argv[2]
BASE = "https://link.springer.com"
DOI = "10.1007/978-3-031-44080-9"
os.makedirs(f"{OUT}/chapters", exist_ok=True)
os.makedirs(f"{OUT}/figures", exist_ok=True)
os.makedirs(f"{RAW}/tables", exist_ok=True)
os.makedirs(f"{RAW}/figpages", exist_ok=True)


def get(url, path, binary=False):
    def bad(p):
        if not os.path.exists(p) or os.path.getsize(p) == 0:
            return True
        head = open(p, "rb").read(4000)
        return b"_fs-ch-" in head
    for i in range(5):
        if not bad(path):
            break
        subprocess.run(["curl", "-sS", "-L", "--retry", "3", "-o", path, url])
        time.sleep(0.4 if i == 0 else 3 * i)
    if bad(path):
        raise RuntimeError(url)
    return open(path, "rb").read() if binary else open(path, encoding="utf-8").read()


def slug(t):
    t = re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")
    return "-".join(t.split("-")[:8])


def pandoc(html):
    r = subprocess.run(
        ["pandoc", "-f", "html", "-t", "gfm-raw_html+pipe_tables", "--wrap=none"],
        input=html, capture_output=True, text=True, check=True)
    return r.stdout


def pandoc_table(html):
    # keep complex tables (rowspan/colspan) readable: allow raw HTML fallback
    r = subprocess.run(["pandoc", "-f", "html", "-t", "gfm", "--wrap=none"],
                       input=html, capture_output=True, text=True, check=True)
    out = re.sub(r"(?m)^</?div[^>]*>\s*$", "", r.stdout)
    out = re.sub(r"<colgroup>.*?</colgroup>\n?", "", out, flags=re.S)
    out = re.sub(r' class="(odd|even|header)"', "", out)
    return re.sub(r"\n{3,}", "\n\n", out)


def clean(node):
    for sel in ["script", "style", "svg", "button", ".u-hide-print", ".c-article-references__links",
                ".c-article-section__figure-link", "[data-test=table-link]"]:
        for x in node.select(sel):
            x.decompose()
    for a in node.find_all("a"):
        a.unwrap()
    for t in node.find_all(["div", "span", "figure", "picture", "section"]):
        t.unwrap()
    for t in node.find_all(True):
        for k in [k for k in t.attrs if k not in ("colspan", "rowspan")]:
            del t[k]
    return node


def table_md(chap, href, caption):
    n = href.rstrip("/").split("/")[-1]
    s = bs4.BeautifulSoup(get(BASE + href, f"{RAW}/tables/ch{chap}-t{n}.html"), "html.parser")
    cont = s.select_one(".c-article-table-container")
    foot = s.select_one(".c-article-table-footer")
    html = str(clean(cont)) if cont else ""
    md = f"\n**{caption}**\n\n" + pandoc_table(html)
    if foot:
        md += "\n" + pandoc(str(clean(foot))) + "\n"
    return md


def figure_md(chap, fig):
    link = fig.find("a", href=re.compile(r"/figures/\d+"))
    cap = fig.select_one("figcaption")
    capt = cap.get_text(" ", strip=True) if cap else "Figure"
    desc = fig.select_one(".c-article-section__figure-description")
    img = fig.find("img")
    srcs = fig.find("source")
    src = (srcs["srcset"].split()[0] if srcs and srcs.get("srcset") else img["src"]).split("?")[0] if img else ""
    m = re.search(r"Fig\.\s*([\d.]+\d)", capt)
    u = re.search(r"_(Fig\w*?)_HTML", src)
    # numbered figures: chNN-figM; unnumbered ones: named after the publisher's media object (unique)
    n = m.group(1).split(".", 1)[-1] if m else (u.group(1).lower()[3:] if u else link["href"].split("/")[-1])
    rel = None
    if src:
        if src.startswith("//"):
            src = "https:" + src
        src = re.sub(r"\.com/[a-z0-9]+/springer-static", ".com/full/springer-static", src)
        ext = ".png" if ".png" in src else ".jpg"
        rel = f"figures/ch{chap:02d}-fig{n}{ext}"
        get(src, f"{OUT}/{rel}", binary=True)
    md = f"\n**{capt}**\n\n"
    if rel:
        md += f"![{capt}](../{rel})\n\n"
    if desc:
        md += pandoc(str(clean(desc))) + "\n"
    return md


def convert(n):
    raw = get(f"{BASE}/chapter/{DOI}_{n}", f"{RAW}/ch{n}.html")
    soup = bs4.BeautifulSoup(raw, "html.parser")
    meta = lambda k: [m["content"] for m in soup.find_all("meta", attrs={"name": k})]
    title = meta("citation_title")[0]
    authors = meta("citation_author")
    affil = {}
    cur = None
    for m in soup.find_all("meta", attrs={"name": ["citation_author", "citation_author_institution"]}):
        if m["name"] == "citation_author":
            cur = m["content"]; affil.setdefault(cur, [])
        elif cur:
            affil[cur].append(m["content"])
    pages = f"{meta('citation_firstpage')[0]}–{meta('citation_lastpage')[0]}"

    parts = []
    abstract = soup.select_one("section[data-title=Abstract]")
    main = soup.select_one("div.main-content")
    assert main is not None, n
    kw = soup.select_one(".c-article-subject-list")
    tables = figures = 0
    for root in [abstract, main]:
        if root is None:
            continue
        for eq in root.select("span.mathjax-tex"):
            tex = eq.get_text().strip()
            if tex.startswith("$$"):
                md = "\n```math\n" + tex.strip("$").strip() + "\n```\n"
                tgt = eq.find_parent("div", class_="c-article-equation") or eq
            else:
                md = "$" + tex.strip("$").strip() + "$"
                tgt = eq
            ph = soup.new_tag("pre" if tex.startswith("$$") else "code"); ph.string = f"@@MD{len(parts)}@@"; parts.append(md)
            tgt.replace_with(ph)
        # replace linked tables and figures with markdown placeholders
        for div in root.select("div.c-article-table"):
            link = div.select_one("[data-test=table-link]")
            cap = div.select_one("figcaption")
            capt = cap.get_text(" ", strip=True) if cap else "Table"
            if link:
                md = table_md(n, link["href"], capt)
                tables += 1
            else:
                md = f"\n**{capt}**\n\n" + pandoc_table(str(clean(div)))
                tables += 1
            ph = soup.new_tag("pre"); ph.string = f"@@MD{len(parts)}@@"; parts.append(md)
            div.replace_with(ph)
        for div in root.select("div.c-article-table-container"):
            md = "\n" + pandoc_table(str(clean(div))) + "\n"
            tables += 1
            ph = soup.new_tag("pre"); ph.string = f"@@MD{len(parts)}@@"; parts.append(md)
            div.replace_with(ph)
        for fig in root.select("div.c-article-section__figure"):
            if fig.find("a", href=re.compile(r"/figures/\d+")) or fig.find("img"):
                md = figure_md(n, fig)
                figures += 1
                ph = soup.new_tag("pre"); ph.string = f"@@MD{len(parts)}@@"; parts.append(md)
                fig.replace_with(ph)
    # drop chapter-specific noise from main
    for sec in main.select("section[data-title]"):
        if sec["data-title"] in ("Rights and permissions", "Copyright information", "About this chapter",
                                 "Publish with us", "Author information", "Editor information"):
            sec.decompose()
    body = ""
    if abstract:
        body += pandoc(str(clean(abstract))) + "\n"
    if kw:
        body += "**Keywords:** " + "; ".join(x.get_text(strip=True) for x in kw.select("li")) + "\n\n"
    body += pandoc(str(clean(main)))
    # back matter outside main-content: References, Further Reading, etc.
    skip = {"Abstract", "Inline Recommendations", "Author information", "Editor information",
            "Rights and permissions", "Copyright information", "About this chapter", "Publish with us"}
    for sec in soup.select("section[data-title]"):
        if sec["data-title"] in skip or sec.find_parent("div", class_="main-content") or \
                sec.find_parent("section", attrs={"data-title": True}):
            continue
        body += "\n\n" + pandoc(str(clean(sec)))
    # restore placeholders (pandoc renders <pre> as fenced/indented code)
    def restore(m):
        return parts[int(m.group(1))]
    body = re.sub(r"```\s*\n@@MD(\d+)@@\s*\n```", restore, body)
    body = re.sub(r"(?m)^ {4}@@MD(\d+)@@\s*$", restore, body)
    body = re.sub(r"`@@MD(\d+)@@`", restore, body)
    body = re.sub(r"@@MD(\d+)@@", restore, body)
    assert "@@MD" not in body
    # tidy headings: pandoc emits "## <span>num</span> Title" as "## num Title"
    body = re.sub(r"\n{3,}", "\n\n", body)

    header = (
        f"# Chapter {n}. {title}\n\n"
        f"> **Source:** Sureda A, Corbacioglu S, Greco R, Kröger N, Carreras E (eds). *The EBMT Handbook: "
        f"Hematopoietic Cell Transplantation and Cellular Therapies*, 8th ed. Springer, Cham; 2024. "
        f"pp. {pages}. https://doi.org/{DOI}_{n}  \n"
        f"> **Authors:** {'; '.join(authors)}  \n"
        + "".join(f">   - {a}: {'; '.join(affil.get(a, []))}  \n" for a in authors if affil.get(a)) +
        f"> **License:** CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). "
        f"Text reproduced verbatim from the open-access HTML edition; formatting converted to Markdown.\n\n"
    )
    fname = f"ch{n:02d}-{slug(title)}.md"
    open(f"{OUT}/chapters/{fname}", "w").write(header + body.strip() + "\n")
    return dict(n=n, title=title, file=f"chapters/{fname}", authors=authors, pages=pages,
                tables=tables, figures=figures, words=len(body.split()))


if __name__ == "__main__":
    chs = [int(x) for x in sys.argv[3:]] or range(1, 95)
    index = [convert(n) for n in chs]
    for r in index:
        print(r["n"], r["words"], r["tables"], r["figures"], r["file"])
    json.dump(index, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "chapter_index.json"), "w"),
              indent=1, ensure_ascii=False)
