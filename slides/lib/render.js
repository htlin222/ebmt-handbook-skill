/**
 * render.js — build one seminar deck from a JSON spec (see SPEC.md).
 * usage: node lib/render.js specs/s06-acute-gvhd.json decks/
 */
const fs = require("fs");
const path = require("path");
const { createDeck } = require("./seminar_lib.js");

const specPath = process.argv[2];
const outDir = process.argv[3] || path.join(__dirname, "..", "decks");
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const ROOT = path.join(__dirname, "..");

const d = createDeck({ title: spec.title, author: "Hsieh-Ting Lin, MD", figDir: path.join(ROOT, "fig"), lang: "zh" });
const { X, W, C, pres } = d;
const SHORT = spec.cite || "EBMT Handbook, 8th ed. Springer; 2024";

// Body top: titles over ~40 characters wrap to two lines at 36 pt.
const top = (title) => (title.length > 40 ? 2.35 : 1.85);
const BOTTOM = 6.45;
const ln = (o) => Object.assign({ color: C.text1, width: 1.25 }, o || {});

function arrow(s, x1, y1, x2, y2) {
  const o = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1), line: ln({ endArrowType: "triangle" }) };
  if (x2 < x1) o.flipH = true;
  if (y2 < y1) o.flipV = true;
  s.addShape(pres.ShapeType.line, o);
}
function seg(s, x1, y1, x2, y2) {
  s.addShape(pres.ShapeType.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1), line: ln() });
}
const boxText = (t, fs, bold) => [{ text: t, options: { fontSize: fs, bold: !!bold } }];

// ---------- layouts
const L = {
  outline(s, o, y) { d.rows(s, o.rows, y + 0.45); },

  table(s, o, y) {
    const n = o.head.length;
    let colW = o.colW && o.colW.length === n ? o.colW : Array(n).fill(1);
    const sum = colW.reduce((a, b) => a + b, 0);
    colW = colW.map(c => +(c * W / sum).toFixed(2));
    d.table(s, o.head, o.rows, colW, X, y + 0.1, o.fontSize || (o.rows.length > 8 ? 14 : o.rows.length > 5 ? 16 : 18));
    if (o.caption) d.tx(s, o.caption, X, BOTTOM - 0.45, W, 0.45, { fontSize: 16, bold: true });
  },

  // Horizontal chain of 2-5 boxes joined by arrows; `invert` = index of the one emphasised box.
  chain(s, o, y) {
    const n = o.steps.length, gap = 0.55, w = (W - gap * (n - 1)) / n;
    const h = o.boxH || 1.9, by = y + (o.caption ? 0.5 : 0.8);
    o.steps.forEach((t, i) => {
      const x = X + i * (w + gap);
      d.box(s, boxText(t, n > 4 ? 15 : 17, false), x, by, w, h, { invert: o.invert === i, align: "center" });
      if (i < n - 1) arrow(s, x + w + 0.06, by + h / 2, x + w + gap - 0.06, by + h / 2);
    });
    if (o.caption) d.tx(s, o.caption, X, by + h + 0.45, W, 0.9, { fontSize: 17 });
  },

  // Decision tree: one root, 2-4 branches (optional edge label), optional outcome box under each branch.
  tree(s, o, y) {
    const n = o.branches.length, gap = 0.4, w = (W - gap * (n - 1)) / n;
    const rootW = Math.min(7.5, W), rootH = 0.85, rx = X + (W - rootW) / 2;
    d.box(s, boxText(o.root, 17, true), rx, y, rootW, rootH, { align: "center", invert: o.invert === "root" });
    const busY = y + rootH + 0.3, hasLabel = o.branches.some(b => b.label);
    const childY = busY + (hasLabel ? 0.75 : 0.4), hasOut = o.branches.some(b => b.out);
    const childH = o.childH || (hasOut ? 1.05 : 1.6);
    seg(s, X + W / 2, y + rootH, X + W / 2, busY);
    const cx = (i) => X + i * (w + gap) + w / 2;
    seg(s, cx(0), busY, cx(n - 1), busY);
    o.branches.forEach((b, i) => {
      const x = X + i * (w + gap);
      arrow(s, cx(i), busY, cx(i), childY - 0.02);
      if (b.label) d.tx(s, b.label, x, busY + 0.08, w, 0.55, { fontSize: 14, italic: true, align: "center", valign: "middle", fill: { color: "FFFFFF" } });
      d.box(s, boxText(b.box, n > 3 ? 15 : 16, true), x, childY, w, childH, { align: "center", invert: o.invert === i });
      if (b.out) {
        const oy = childY + childH + 0.35;
        arrow(s, cx(i), childY + childH, cx(i), oy - 0.02);
        d.box(s, boxText(b.out, n > 3 ? 14 : 15, false), x, oy, w, Math.min(1.25, BOTTOM - oy), { align: "center" });
      }
    });
  },

  bullets(s, o, y) { d.bullets(s, o.items, X, y + 0.1, W, BOTTOM - y - 0.1, o.fontSize || 20); },

  columns(s, o, y) {
    const n = o.cols.length, gap = 0.5, w = (W - gap * (n - 1)) / n;
    o.cols.forEach((c, i) => {
      const x = X + i * (w + gap);
      d.tx(s, c.head, x, y + 0.1, w, 0.5, { fontSize: 20, bold: true });
      seg(s, x, y + 0.65, x + w, y + 0.65);
      d.bullets(s, c.items, x, y + 0.8, w, BOTTOM - y - 0.8, o.fontSize || (n > 2 ? 16 : 18));
    });
  },

  blocks(s, o, y) {
    const n = o.blocks.length, gap = 0.5, w = (W - gap * (n - 1)) / n;
    o.blocks.forEach((b, i) => d.block(s, b.head, b.body, X + i * (w + gap), y + 0.2, w, BOTTOM - y - 0.2, b.extra, n > 3 ? 16 : 18));
  },

  numbers(s, o, y) {
    const n = o.items.length, gap = 0.5, w = (W - gap * (n - 1)) / n;
    o.items.forEach((it, i) => {
      const x = X + i * (w + gap);
      d.big(s, it.num, x, y + 0.3, w);
      d.tx(s, it.label, x, y + 1.3, w, 1.4, { fontSize: 18 });
    });
    if (o.caption) { d.rule(s, y + 2.9); d.tx(s, o.caption, X, y + 3.1, W, 1.0, { fontSize: 18 }); }
  },

  cards(s, o, y) { d.cards(s, o.cards, y + 0.1, BOTTOM - y - 0.1); },

  figure(s, o, y) {
    d.fig(s, o.fig, X, y, o.caption ? W * 0.62 : W, BOTTOM - y - (o.caption ? 0 : 0.05), o.alt);
    if (o.caption) d.tx(s, o.caption, X + W * 0.66, y + 0.1, W * 0.34, BOTTOM - y - 0.1, { fontSize: 16 });
  },

  bars(s, o, y) {
    d.barChart(s, o.chartTitle, o.labels, o.values, { format: o.format, chart: { y: y + 0.1, h: Math.min(3.2, BOTTOM - y - 1.0) } });
    if (o.caption) d.tx(s, o.caption, X, BOTTOM - 0.8, W, 0.8, { fontSize: 17 });
  },

  // Single-best-answer question: stem, then options A-E.
  mcq(s, o, y) {
    const stemH = Math.ceil(o.stem.length / 92) * 0.36 + 0.15;
    d.tx(s, o.stem, X, y + 0.05, W, stemH, { fontSize: 19 });
    const oy = y + stemH + 0.35;
    d.tx(s, o.options.map((t, i) => ({ text: String.fromCharCode(65 + i) + ".  " + t, options: { breakLine: i < o.options.length - 1, paraSpaceAfter: 8 } })),
      X + 0.3, oy, W - 0.3, BOTTOM - oy, { fontSize: 18 });
  },
  mcqAnswer(s, o, y) {
    const i = o.answer.charCodeAt(0) - 65;
    d.box(s, [{ text: o.answer + ".  " + o.options[i], options: { fontSize: 20, bold: true } }], X, y + 0.1, W, 0.8, { invert: true });
    d.tx(s, o.explanation, X, y + 1.2, W, BOTTOM - y - 1.2, { fontSize: 18 });
  },
};

// ---------- deck
d.section("Opening");
d.cover({ eyebrow: spec.eyebrow || "EBMT Handbook board review", title: spec.title, subtitle: spec.subtitle,
  author: "Hsieh-Ting Lin, MD", affiliation: "Department of Medical Oncology, Koo Foundation Sun Yat-Sen Cancer Center",
  notes: spec.coverNotes });

let backupStarted = false, section = null;
for (const o of spec.slides) {
  if (o.backup && !backupStarted) {
    d.section("References");
    d.references(spec.references);
    d.startBackup();
    backupStarted = true;
  }
  if (!o.backup && o.section && o.section !== section) { d.section(o.section); section = o.section; }
  const cite = o.cite || SHORT;
  if (o.type === "statement") { d.statement({ eyebrow: o.eyebrow, title: o.title, sub: o.sub, cite, notes: o.notes }); continue; }
  if (o.type === "mcq") {
    const s1 = d.slide({ eyebrow: o.eyebrow || "Board-style question", title: o.title || "Question", cite, notes: o.notes });
    L.mcq(s1, o, top(o.title || "Question"));
    const t2 = o.answerTitle || "Answer: " + o.answer;
    const s2 = d.slide({ eyebrow: o.eyebrow || "Board-style question", title: t2, cite, notes: o.answerNotes });
    L.mcqAnswer(s2, o, top(t2));
    continue;
  }
  const s = d.slide({ eyebrow: o.eyebrow, title: o.title, cite, notes: o.notes });
  if (!L[o.type]) throw new Error("unknown slide type " + o.type);
  L[o.type](s, o, top(o.title));
}
if (!backupStarted) { d.section("References"); d.references(spec.references); }

const out = path.join(outDir, path.basename(specPath, ".json") + ".pptx");
d.save(out, { minutes: 30 }).then(() => console.log("wrote " + out)).catch(e => { console.error(e); process.exit(1); });
