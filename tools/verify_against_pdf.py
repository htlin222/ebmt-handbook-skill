"""Verify the Markdown chapters against the official Springer chapter PDFs.

Each PDF page is cropped into its two text columns, tokenised, and every PDF token
is marked "covered" when it sits inside a 6-word run that also appears in the
Markdown. Prints per-chapter token coverage and writes uncovered runs (>=10 tokens)
to uncovered_runs.txt for manual review. Expected residue: licence box,
affiliations/e-mails, running heads, rotated tables (extracted backwards) and
table/figure cells that column cropping scrambles. Table and figure captions are
also cross-checked one by one.

usage: python3 -I tools/verify_against_pdf.py PDF_DIR CHAPTER_DIR
  PDF_DIR holds ch1.pdf … ch94.pdf from
  https://link.springer.com/content/pdf/10.1007/978-3-031-44080-9_<n>.pdf
"""
import glob, re, subprocess, sys, unicodedata
import pdfplumber

PDF, MD = sys.argv[1], sys.argv[2]
K = 6
FURN = re.compile(r"creative commons|open access this chapter|e-?mail|©|a\. sureda et al", re.I)


def norm_tokens(t):
    t = unicodedata.normalize("NFKC", t).replace("ﬁ", "fi").replace("ﬂ", "fl")
    t = re.sub(r"-\n(?=[a-z])", "", t).lower()
    return re.sub(r"[^\w%]+", " ", t).split()


def md_text(p):
    s = open(p).read()
    s = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", s)
    s = re.sub(r"</?[a-zA-Z][^<>]*>", " ", s)
    s = re.sub(r"[|*_`#>\\]", " ", s)
    return s.replace("&gt;", ">").replace("&lt;", "<").replace("&amp;", "&")


def pdf_cols(p):
    out = []
    with pdfplumber.open(p) as pdf:
        for page in pdf.pages:
            w, h = page.width, page.height
            for box in [(0, 0, w / 2, h), (w / 2, 0, w, h)]:
                out.append(page.crop(box).extract_text() or "")
    return "\n".join(out)


tot = cov = 0
missing_captions = []
with open("uncovered_runs.txt", "w") as report:
    for n in range(1, 95):
        mdp = glob.glob(f"{MD}/ch{n:02d}-*.md")[0]
        md_raw = open(mdp).read()
        md = norm_tokens(md_text(mdp))
        mset = {tuple(md[i:i + K]) for i in range(len(md) - K + 1)}
        lines = [l for l in pdf_cols(f"{PDF}/ch{n}.pdf").splitlines() if not FURN.search(l)]
        pt = norm_tokens("\n".join(lines))
        c = [False] * len(pt)
        for i in range(len(pt) - K + 1):
            if tuple(pt[i:i + K]) in mset:
                c[i:i + K] = [True] * K
        i = 0
        while i < len(pt):
            if c[i]:
                i += 1
                continue
            j = i
            while j < len(pt) and not c[j]:
                j += 1
            if j - i >= 10:
                report.write(f"ch{n} [{j - i}] {' '.join(pt[i:j])[:300]}\n")
            i = j
        tot += len(pt); cov += sum(c)
        print(f"ch{n:02d} token-coverage={sum(c) / len(pt):.4f}")

        plain = subprocess.run(["pdftotext", f"{PDF}/ch{n}.pdf", "-"], capture_output=True, text=True).stdout
        for x in set(re.findall(rf"^Table {n}\.(\d+)\b", plain, re.M)):
            if not re.search(rf"\*\*Table {n}\.{x}\b", md_raw):
                missing_captions.append(f"Table {n}.{x}")
        for x in set(re.findall(rf"^Fig\. {n}\.(\d+)\b", plain, re.M)):
            if not re.search(rf"\*\*Fig\. {n}\.{x}\b", md_raw):
                missing_captions.append(f"Fig. {n}.{x}")

print(f"OVERALL token coverage {cov / tot:.4f}")
print("missing table/figure captions:", missing_captions or "none")
