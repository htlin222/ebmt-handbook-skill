#!/usr/bin/env python3
"""Read a source deck (for example a company medical slide deck) and lift figures from it.

Figures in such decks are usually native PowerPoint shapes and charts, not
embedded pictures, so they cannot be extracted as files. This script renders
the deck through LibreOffice and crops regions out of the rendered pages.

Commands
  sheet  SRC.pptx OUTDIR            render every slide and write contact sheets (12 per sheet)
  page   SRC.pptx N OUT.png         render slide N at inspection size (default 110 dpi)
  crop   SRC.pptx N OUT.png --box L,T,R,B [--mask L,T,R,B ...] [--dpi 300]

Boxes are fractions of the slide (0-1): left, top, right, bottom. A mask paints a
white rectangle before cropping; use it only for non-data furniture (the source
slide's title, logo, navigation icon or its shadow), never over data.

The PDF render is cached next to the source as SRC.pdf.
"""
import argparse, glob, os, subprocess, sys, tempfile
from PIL import Image, ImageDraw

SOFFICE_WRAPPER = "/mnt/skills/public/pptx/scripts/office/soffice.py"


def to_pdf(src):
    pdf = os.path.splitext(src)[0] + ".pdf"
    if os.path.exists(pdf) and os.path.getmtime(pdf) >= os.path.getmtime(src):
        return pdf
    outdir = os.path.dirname(os.path.abspath(src))
    if os.path.exists(SOFFICE_WRAPPER):
        cmd = [sys.executable, SOFFICE_WRAPPER, "--headless", "--convert-to", "pdf", "--outdir", outdir, src]
    else:
        cmd = ["soffice", "--headless", "--convert-to", "pdf", "--outdir", outdir, src]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if not os.path.exists(pdf):
        sys.exit("PDF conversion failed for " + src)
    return pdf


def render(pdf, page, dpi):
    with tempfile.TemporaryDirectory() as tmp:
        prefix = os.path.join(tmp, "p")
        args = ["pdftoppm", "-png", "-r", str(dpi)]
        if page:
            args += ["-f", str(page), "-l", str(page)]
        subprocess.run(args + [pdf, prefix], check=True)
        files = sorted(glob.glob(prefix + "*.png"))
        return [Image.open(f).convert("RGB").copy() for f in files]


def frac_box(text, size):
    l, t, r, b = [float(v) for v in text.split(",")]
    w, h = size
    return [int(l * w), int(t * h), int(r * w), int(b * h)]


def cmd_sheet(a):
    pages = render(to_pdf(a.src), None, 40)
    os.makedirs(a.outdir, exist_ok=True)
    w, h = pages[0].size
    per, cols = 12, 3
    for part in range(0, len(pages), per):
        chunk = pages[part:part + per]
        rows = (len(chunk) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * w + (cols + 1) * 6, rows * h + (rows + 1) * 6), (200, 60, 60))
        for i, im in enumerate(chunk):
            sheet.paste(im, (6 + (i % cols) * (w + 6), 6 + (i // cols) * (h + 6)))
        out = os.path.join(a.outdir, "sheet_%02d-%02d.jpg" % (part + 1, part + len(chunk)))
        sheet.save(out, quality=82)
        print(out)
    print("%d slides" % len(pages))


def cmd_page(a):
    im = render(to_pdf(a.src), a.n, a.dpi)[0]
    im.save(a.out)
    print(a.out, im.size)


def cmd_crop(a):
    im = render(to_pdf(a.src), a.n, a.dpi)[0]
    draw = ImageDraw.Draw(im)
    for m in a.mask or []:
        draw.rectangle(frac_box(m, im.size), fill=(255, 255, 255))
    out = im.crop(frac_box(a.box, im.size))
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    out.save(a.out, optimize=True)
    print(a.out, out.size, "aspect %.2f" % (out.size[0] / out.size[1]))


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("sheet"); s.add_argument("src"); s.add_argument("outdir"); s.set_defaults(fn=cmd_sheet)
    s = sub.add_parser("page"); s.add_argument("src"); s.add_argument("n", type=int); s.add_argument("out"); s.add_argument("--dpi", type=int, default=110); s.set_defaults(fn=cmd_page)
    s = sub.add_parser("crop"); s.add_argument("src"); s.add_argument("n", type=int); s.add_argument("out")
    s.add_argument("--box", required=True); s.add_argument("--mask", action="append"); s.add_argument("--dpi", type=int, default=300); s.set_defaults(fn=cmd_crop)
    a = p.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
