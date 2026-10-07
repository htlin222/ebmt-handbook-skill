#!/usr/bin/env python3
"""Split speaker notes into paragraphs.

pptxgenjs writes each slide's notes as a single run, so line breaks are lost.
seminar_lib.js joins note paragraphs with the pilcrow character; this script
rewrites every notes slide so each piece becomes its own paragraph, with the
time marker and the reminders heading in bold.

Usage: python3 fix_notes.py deck.pptx
"""
import re, shutil, sys, zipfile

PILCROW = "\u00b6"
PAT = re.compile(r'<a:p><a:r><a:rPr lang="en-US" dirty="0"/><a:t>([^<]*)</a:t></a:r><a:endParaRPr lang="en-US" dirty="0"/></a:p>')
HEADINGS = ("Speaker reminders", "\u8b1b\u8005\u63d0\u9192")


def split(m):
    text = m.group(1)
    if PILCROW not in text:
        return m.group(0)
    out = []
    for part in text.split(PILCROW):
        bold = (part.startswith("[") and part.endswith("]")) or part.startswith(HEADINGS)
        rpr = '<a:rPr lang="en-US" b="1" dirty="0"/>' if bold else '<a:rPr lang="en-US" dirty="0"/>'
        out.append('<a:p><a:pPr><a:spcAft><a:spcPts val="600"/></a:spcAft></a:pPr><a:r>%s<a:t>%s</a:t></a:r></a:p>' % (rpr, part))
    return "".join(out)


def main(path):
    tmp, changed = path + ".tmp", 0
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename.startswith("ppt/notesSlides/notesSlide") and item.filename.endswith(".xml"):
                text = data.decode("utf-8")
                new = PAT.sub(split, text)
                changed += new != text
                data = new.encode("utf-8")
            zout.writestr(item, data)
    shutil.move(tmp, path)
    print("notes split into paragraphs on %d slides" % changed)


if __name__ == "__main__":
    main(sys.argv[1])
