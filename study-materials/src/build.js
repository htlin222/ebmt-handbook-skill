// Build the EBMT Handbook study deck (1:1, black & white).
// Usage: node src/build.js [out.pptx]
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const L = require("./lib");

const out = process.argv[2] || path.join(__dirname, "..", "ebmt-handbook-study-deck.pptx");

// Load content modules in order (skip any that do not exist yet).
const files = ["part1_2", "part3", "part4", "part5", "part6", "part7", "part8", "part9a", "part9b"];
const parts = [];
for (const f of files) {
  const p = path.join(__dirname, "content", f + ".js");
  if (!fs.existsSync(p)) continue;
  for (const part of require(p)) {
    // a "continuation" module appends chapters to the previous Part (Part IX is split in two files)
    if (part.continuation && parts.length) parts[parts.length - 1].chapters.push(...part.chapters);
    else parts.push(part);
  }
}
const appendix = fs.existsSync(path.join(__dirname, "content", "appendix.js")) ? require("./content/appendix") : null;

const pres = new pptxgen();
pres.defineLayout({ name: "SQUARE", width: L.SIZE, height: L.SIZE });
pres.layout = "SQUARE";
pres.author = "EBMT Handbook study group";
pres.title = "EBMT Handbook 8th ed. — Study Deck";

const { FONT, BLACK, GREY, WHITE, SIZE, M, W } = L;
const totalChapters = parts.reduce((a, p) => a + p.chapters.length, 0);
let n = 0;

// ---------- cover ----------
{
  n++;
  const s = pres.addSlide();
  s.background = { color: BLACK };
  s.addText("EBMT HANDBOOK · 8TH EDITION · 2024", { x: M, y: 0.6, w: W, h: 0.3, fontFace: FONT, fontSize: 9, color: "BFBFBF", charSpacing: 3, margin: 0, isTextBox: true });
  s.addText("Haematopoietic Cell Transplantation and Cellular Therapies", { x: M, y: 2.3, w: W, h: 1.6, fontFace: FONT, fontSize: 30, bold: true, color: WHITE, margin: 0, valign: "top", isTextBox: true });
  s.addText("Study-group handout · chapter by chapter\nOutlines · tables · flowcharts", { x: M, y: 4.2, w: W, h: 0.8, fontFace: FONT, fontSize: 13, color: "DDDDDD", margin: 0, valign: "top", isTextBox: true });
  s.addText(`${totalChapters} chapters · Parts I–IX`, { x: M, y: 6.3, w: 4, h: 0.3, fontFace: FONT, fontSize: 9, color: "BFBFBF", margin: 0, isTextBox: true });
  s.addText("Source: Sureda A, Corbacioglu S, Greco R, Kröger N, Carreras E (eds). The EBMT Handbook, 8th ed. Springer 2024. Open access, CC BY 4.0.", { x: M, y: 6.6, w: W, h: 0.4, fontFace: FONT, fontSize: 7.5, color: "9A9A9A", margin: 0, valign: "top", isTextBox: true });
}

// ---------- how to read ----------
{
  n++;
  const s = pres.addSlide();
  L.frame(pres, s, { part: "How to use this deck", ch: null, title: "How to read these slides", n, total: 0 });
  L.drawStack(
    s,
    [
      {
        type: "outline",
        items: [
          "One slide per handbook chapter, in book order. Header shows Part and chapter number.",
          "Three forms only: **outline** (what to know), **table** (compare / thresholds), **flowchart** (sequence or decision).",
          "Footer marks provenance: **●** content checked against the handbook text; **○** condensed summary — confirm details in the chapter before clinical use.",
          "Doses and cut-offs are teaching values from the 2024 edition; local protocols and newer approvals take precedence.",
          "Speaker notes on some slides hold discussion prompts for the study group.",
        ],
      },
      { type: "heading", text: "Legend for flowcharts" },
      { type: "flow", dir: "h", nodes: ["Step or state", "Decision / branch", "Preferred option"], invert: [2], dashed: [1] },
      { type: "note", text: "Solid box = step; dashed box = decision point; black box = preferred or default option. Arrows read left→right or top→bottom." },
    ],
    M,
    L.TOP,
    W,
    10.5
  );
}

// ---------- contents ----------
{
  n++;
  const s = pres.addSlide();
  L.frame(pres, s, { part: "Contents", ch: null, title: "Parts and chapters", n, total: 0 });
  const rows = parts.map((p) => {
    const chs = p.chapters.map((c) => c.ch);
    return [p.part.split(" · ")[0], p.partTitle, `${chs[0]}–${chs[chs.length - 1]}`, String(chs.length)];
  });
  L.drawStack(s, [{ type: "table", cols: ["Part", "Title", "Chapters", "Slides"], widths: [0.16, 0.56, 0.16, 0.12], rows, boldFirst: true }, { type: "note", text: "Each Part opens with a divider slide; the appendix holds audit notes and abbreviations." }], M, L.TOP, W, 10);
}

// ---------- parts ----------
parts.forEach((p) => {
  // divider
  n++;
  const s = pres.addSlide();
  s.background = { color: WHITE };
  const chs = p.chapters.map((c) => c.ch);
  s.addText(p.part.toUpperCase(), { x: M, y: 2.6, w: W, h: 0.3, fontFace: FONT, fontSize: 9, color: GREY, charSpacing: 3, margin: 0, isTextBox: true });
  s.addText(p.partTitle, { x: M, y: 2.95, w: W, h: 1.2, fontFace: FONT, fontSize: 32, bold: true, color: BLACK, margin: 0, valign: "top", isTextBox: true });
  s.addText(p.partBlurb, { x: M, y: 4.2, w: W - 0.5, h: 1.0, fontFace: FONT, fontSize: 11, color: BLACK, margin: 0, valign: "top", isTextBox: true });
  s.addText(`Chapters ${chs[0]}–${chs[chs.length - 1]}`, { x: M, y: 5.4, w: W, h: 0.3, fontFace: FONT, fontSize: 9, color: GREY, margin: 0, isTextBox: true });
  s.addText(String(n), { x: SIZE - M - 0.6, y: SIZE - 0.5, w: 0.6, h: 0.2, fontFace: FONT, fontSize: 7.5, color: GREY, align: "right", margin: 0, valign: "middle", isTextBox: true });
  // chapter slides
  p.chapters.forEach((c) => {
    n++;
    L.chapterSlide(pres, c, { part: p.part, n, total: 0 });
  });
});

// ---------- appendix ----------
if (appendix) {
  appendix.forEach((a) => {
    n++;
    const s = pres.addSlide();
    L.frame(pres, s, { part: "Appendix", ch: null, title: a.title, n, total: 0 });
    let pt = a.basePt || 10;
    const avail = L.BOTTOM - L.TOP;
    while (L.stackHeight(a.blocks, W, pt) > avail && pt > 7.5) pt -= 0.25;
    if (L.stackHeight(a.blocks, W, pt) > avail) console.warn(`OVERFLOW appendix "${a.title}"`);
    L.drawStack(s, a.blocks, M, L.TOP, W, pt);
  });
}

// pptxgenjs writes one <a:pPr> per run; when a bullet paragraph has several runs (inline bold)
// the last run's pPr wins and the bullet disappears. Keep only the first pPr of each paragraph.
async function fixParagraphProps(file) {
  const JSZip = require("jszip");
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const names = Object.keys(zip.files).filter((k) => /^ppt\/slides\/slide\d+\.xml$/.test(k));
  for (const name of names) {
    let xml = await zip.file(name).async("string");
    xml = xml.replace(/<a:p>([\s\S]*?)<\/a:p>/g, (m, inner) => {
      let seen = false;
      const fixed = inner.replace(/<a:pPr\b[^>]*\/>|<a:pPr\b[^>]*>[\s\S]*?<\/a:pPr>/g, (pp) => {
        if (seen) return "";
        seen = true;
        return pp;
      });
      return `<a:p>${fixed}</a:p>`;
    });
    zip.file(name, xml);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

pres
  .writeFile({ fileName: out })
  .then((f) => fixParagraphProps(f).then(() => console.log(`wrote ${f} (${n} slides, ${totalChapters} chapters)`)));
