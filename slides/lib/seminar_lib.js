/**
 * seminar_lib.js — monochrome academic deck builder on top of pptxgenjs.
 *
 * Usage (see assets/example_build.js):
 *   const { createDeck } = require("<skill>/scripts/seminar_lib.js");
 *   const d = createDeck({ title, author, figDir: __dirname + "/fig", lang: "en" });
 *   d.section("Opening");
 *   d.cover({ eyebrow, title, subtitle, author, affiliation, notes: { min: 0.5, script: ["..."] } });
 *   const s = d.slide({ eyebrow, title, cite, notes: { min: 1.5, script: [...], reminders: [...] } });
 *   d.table(s, head, rows, colW, d.X, 2.4, 16);
 *   d.references([...]);  d.startBackup();  ...  await d.save("Talk.pptx", { minutes: 30 });
 *
 * Canvas is 13.33 x 7.5 in. Content margins: X = 0.75, W = 11.83.
 * Vertical zones on a CONTENT slide:
 *   eyebrow 0.55 | title 0.90-2.15 (36 pt; about 40 characters per line, two lines at most)
 *   body: start 1.8 under a one-line title, 2.3 under a two-line title; end by 6.45
 *   footer citation 6.65-7.15 (10 pt, two lines at most) | slide number bottom right
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const pptxgen = require("pptxgenjs");

const K = "000000";
const X = 0.75, W = 11.83;

function createDeck(opts) {
  opts = opts || {};
  const font = opts.font || "Arial";
  const lang = opts.lang || "en";
  const THEME = { name: "Monochrome", headFontFace: font, bodyFontFace: font,
    colors: { dk1: K, lt1: "FFFFFF", dk2: K, lt2: "FFFFFF", accent1: K, accent2: K, accent3: K, accent4: K, accent5: K, accent6: K, hlink: K, folHlink: K } };
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: font, bodyFontFace: font };
  if (opts.title) pres.title = opts.title;
  if (opts.author) pres.author = opts.author;
  const C = pres.SchemeColor;
  const HEAD = "+mj-lt";

  const ph = (name, type, o) => ({ placeholder: { options: Object.assign({ name, type, color: C.text1, margin: 0, valign: "top", align: "left" }, o), text: "" } });
  pres.defineSlideMaster({ title: "COVER", background: { color: "FFFFFF" }, objects: [
    ph("eyebrow", "body", { x: X, y: 0.75, w: W, h: 0.35, fontSize: 12, charSpacing: 3 }),
    ph("title", "title", { x: X, y: 1.75, w: 11.3, h: 2.55, fontSize: 44, bold: true }),
    ph("subtitle", "body", { x: X, y: 4.4, w: 11.3, h: 0.6, fontSize: 20 }),
    ph("author", "body", { x: X, y: 5.75, w: 11.3, h: 0.45, fontSize: 20, bold: true }),
    ph("affil", "body", { x: X, y: 6.25, w: 11.3, h: 0.4, fontSize: 14 }) ] });
  const frame = (titleOpts, extra) => [
    ph("eyebrow", "body", { x: X, y: 0.55, w: W, h: 0.3, fontSize: 11, charSpacing: 3 }),
    ph("title", "title", titleOpts), ...(extra || []),
    ph("cite", "body", { x: X, y: 6.65, w: 10.9, h: 0.5, fontSize: 10 }) ];
  const SN = () => ({ x: 12.0, y: 6.65, w: 0.58, h: 0.3, fontSize: 10, color: C.text1, align: "right" });
  pres.defineSlideMaster({ title: "CONTENT", background: { color: "FFFFFF" }, slideNumber: SN(),
    objects: frame({ x: X, y: 0.9, w: W, h: 1.25, fontSize: 36, bold: true }) });
  pres.defineSlideMaster({ title: "STATEMENT", background: { color: "FFFFFF" }, slideNumber: SN(),
    objects: frame({ x: X, y: 1.9, w: W, h: 2.5, fontSize: 40, bold: true }, [ph("sub", "body", { x: X, y: 4.7, w: W, h: 0.9, fontSize: 20 })]) });

  // ---------- state
  let sectionTitle = "", backup = false, clock = 0, id = 0;
  const log = [];   // per-slide timing log
  const L = lang === "zh"
    ? { per: "本頁", to: "至", rem: "講者提醒（不念出來）：", backup: "Backup · ", refs: "各頁頁尾短式引用的完整文獻，不講。" }
    : { per: "for this slide", to: "to", rem: "Speaker reminders (not read aloud):", backup: "Backup · ", refs: "Full citations for the short forms in the slide footers. Not presented." };
  const mmss = (m) => Math.floor(m) + ":" + String(Math.round((m - Math.floor(m)) * 60)).padStart(2, "0");
  const spoken = (paras) => {
    const t = paras.join(" ").replace(/[\[〔][^\]〕]*[\]〕]/g, " ");
    const cjk = (t.match(/[\u3400-\u9fff]/g) || []).length;
    const words = (t.replace(/[\u3400-\u9fff]/g, " ").match(/[A-Za-z0-9%.+\-]+/g) || []).length;
    return { cjk, words, est: words / 125 + cjk / 240 };
  };
  function noteText(title, notes) {
    notes = notes || {};
    const script = notes.script || [], rem = notes.reminders || [], min = notes.min || 0;
    const parts = [];
    if (min > 0 && !backup) { parts.push("[" + mmss(min) + " " + L.per + " · " + mmss(clock) + " " + L.to + " " + mmss(clock + min) + "]"); clock += min; }
    script.forEach(p => parts.push(p));
    if (rem.length) { parts.push(L.rem); rem.forEach(p => parts.push("- " + p)); }
    const sp = spoken(script);
    log.push({ title, backup, min, words: sp.words, cjk: sp.cjk, est: sp.est, empty: script.length === 0 });
    return parts.join("\u00b6");
  }
  const warnTitle = (t) => { if (t.length > 80) console.warn("WARN title longer than 80 characters (will exceed two lines): " + t); };

  // ---------- slides
  function section(t) { sectionTitle = t; pres.addSection({ title: t }); }
  function startBackup(title) { backup = true; section(title || "Backup"); }
  function cover(o) {
    const s = pres.addSlide({ masterName: "COVER", sectionTitle });
    if (o.eyebrow) s.addText(o.eyebrow.toUpperCase(), { placeholder: "eyebrow" });
    s.addText(o.title, { placeholder: "title" });
    if (o.subtitle) s.addText(o.subtitle, { placeholder: "subtitle" });
    if (o.author) s.addText(o.author, { placeholder: "author" });
    if (o.affiliation) s.addText(o.affiliation, { placeholder: "affil" });
    s.addNotes(noteText(o.title, o.notes));
    return s;
  }
  function slide(o) {
    const s = pres.addSlide({ masterName: o.layout || "CONTENT", sectionTitle });
    warnTitle(o.title);
    const eb = (backup ? L.backup : "") + (o.eyebrow || "");
    if (eb) s.addText(eb.toUpperCase(), { placeholder: "eyebrow" });
    s.addText(o.title, { placeholder: "title" });
    if (o.cite) s.addText(o.cite, { placeholder: "cite" });
    if (o.sub) s.addText(o.sub, { placeholder: "sub" });
    s.addNotes(noteText(o.title, o.notes));
    return s;
  }
  const statement = (o) => slide(Object.assign({ layout: "STATEMENT" }, o));

  // ---------- content helpers (all black on white; hierarchy by size, weight, italic)
  const tx = (s, text, x, y, w, h, o) => s.addText(text, Object.assign({ x, y, w, h, isTextBox: true, margin: 0, valign: "top", color: C.text1, fontSize: 18, objectName: "Text " + (++id) }, o || {}));
  const big = (s, num, x, y, w) => tx(s, num, x, y, w, 0.95, { fontSize: 60, bold: true, fontFace: HEAD });
  const label = (s, text, x, y, w) => tx(s, text.toUpperCase(), x, y, w, 0.3, { fontSize: 11, charSpacing: 3 });
  function block(s, head, body, x, y, w, h, extra, fsz) {
    fsz = fsz || 18;
    const runs = [{ text: head, options: { bold: true, fontSize: fsz + 2, breakLine: true, paraSpaceAfter: 4 } }, { text: body, options: { fontSize: fsz, breakLine: !!extra, paraSpaceAfter: 6 } }];
    if (extra) runs.push({ text: extra, options: { fontSize: fsz, italic: true } });
    tx(s, runs, x, y, w, h);
  }
  const bullets = (s, items, x, y, w, h, fsz) => tx(s, items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, paraSpaceAfter: 8 } })), x, y, w, h, { fontSize: fsz || 18 });
  /** Booktabs-style table: thick top and bottom rules, thin row rules, no vertical rules, no fills. */
  function table(s, head, rows, colW, x, y, fsz) {
    const N = { type: "none" }, thick = { type: "solid", pt: 1.5, color: K }, thin = { type: "solid", pt: 0.5, color: K };
    const data = [head.map(t => ({ text: t, options: { bold: true, border: [thick, N, thin, N] } }))];
    rows.forEach((r, i) => data.push(r.map(t => ({ text: t, options: { border: [N, N, i === rows.length - 1 ? thick : thin, N] } }))));
    s.addTable(data, { x, y, w: colW.reduce((a, b) => a + b, 0), colW, fontSize: fsz || 16, color: C.text1, valign: "middle", margin: [5, 8, 5, 2], autoPage: false, objectName: "Table " + (++id) });
  }
  const rule = (s, y) => s.addShape(pres.ShapeType.line, { x: X, y, w: W, h: 0, line: { color: C.text1, width: 0.5 }, objectName: "Rule " + (++id) });
  /** Numbered rows: items = [[heading, description, rightLabel?], ...], up to 4. */
  function rows(s, items, y0) {
    items.forEach((it, i) => {
      const y = (y0 || 2.4) + i * 1.0;
      if (i) rule(s, y - 0.16);
      tx(s, String(i + 1), X, y - 0.05, 0.7, 0.75, { fontSize: 32, bold: true, fontFace: HEAD });
      tx(s, it[0], 1.6, y, 9.2, 0.4, { fontSize: 20, bold: true });
      tx(s, it[1], 1.6, y + 0.43, 9.2, 0.35, { fontSize: 16 });
      if (it[2]) tx(s, it[2], 11.0, y + 0.05, 1.58, 0.35, { fontSize: 12, align: "right" });
    });
  }
  /** Outlined box with text. Pass { invert: true } for the single emphasised block on a slide. */
  function box(s, runs, x, y, w, h, o) {
    o = Object.assign({}, o || {});
    const invert = o.invert; delete o.invert;
    if (invert && Array.isArray(runs)) runs = runs.map(r => Object.assign({}, r, { options: Object.assign({}, r.options, { color: C.background1 }) }));
    return s.addText(runs, Object.assign({ x, y, w, h, isTextBox: true, shape: pres.ShapeType.rect, fill: { color: invert ? C.text1 : C.background1 }, line: { color: C.text1, width: 1 }, color: invert ? C.background1 : C.text1, margin: [10, 14, 10, 14], valign: "middle", objectName: "Box " + (++id) }, o));
  }
  /** Case or option cards in equal columns: list = [{ head, lines: [..], question }]. Keep each line under about 24 characters for three cards. */
  function cards(s, list, y, h) {
    const gap = 0.48, w = (W - gap * (list.length - 1)) / list.length;
    list.forEach((c, i) => {
      const lines = c.lines || [];
      const runs = [{ text: c.head, options: { fontSize: 22, bold: true, fontFace: HEAD, breakLine: true, paraSpaceAfter: 10 } }];
      lines.forEach((t, j) => runs.push({ text: t, options: { fontSize: 18, breakLine: j < lines.length - 1 || !!c.question, paraSpaceAfter: 10 } }));
      if (c.question) runs.push({ text: c.question, options: { fontSize: 18, italic: true } });
      box(s, runs, X + i * (w + gap), y || 2.1, w, h || 4.2, { valign: "top", margin: [18, 18, 18, 18] });
    });
  }
  /** Place <figDir>/<name>.png scaled to fit inside maxW x maxH, left-aligned. Always pass alt text. */
  function fig(s, name, x, y, maxW, maxH, alt) {
    const p = path.join(opts.figDir || path.join(process.cwd(), "fig"), name + ".png");
    const b = fs.readFileSync(p), pw = b.readUInt32BE(16), phh = b.readUInt32BE(20);
    let w = maxW, h = w * phh / pw; if (h > maxH) { h = maxH; w = h * pw / phh; }
    s.addImage({ path: p, x, y, w, h, altText: alt || name, objectName: "Figure " + name });
    return { w, h };
  }
  /** Native horizontal bar chart, all bars black, value labels at bar ends. */
  function barChart(s, title, labels, values, o) {
    o = o || {};
    s.addChart(pres.charts.BAR, [{ name: title, labels, values }], Object.assign({ x: X, y: 2.25, w: W, h: 2.95, barDir: "bar", chartColors: [K], showLegend: false, showTitle: true, title, titleFontSize: 12, titleFontFace: "+mn-lt", titleColor: K,
      showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: o.format || '0.0"%"', dataLabelFontSize: 18, dataLabelFontBold: true, dataLabelFontFace: "+mn-lt", dataLabelColor: K,
      catAxisLabelFontSize: 14, catAxisLabelFontFace: "+mn-lt", catAxisLabelColor: K, catAxisOrientation: "maxMin", valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: o.max || Math.ceil(Math.max.apply(null, values) * 1.2),
      valGridLine: { style: "none" }, catGridLine: { style: "none" }, barGapWidthPct: 55, objectName: "Chart " + (++id) }, o.chart || {}));
  }
  const cites = (...a) => a.filter(Boolean).join(" · ");
  /** Reference slides: numbered strings, two columns, paginated (default 11 per slide). */
  function references(list, perSlide) {
    perSlide = perSlide || 11;
    const pages = Math.ceil(list.length / perSlide);
    for (let p = 0; p < pages; p++) {
      const s = slide({ eyebrow: "References", title: "References" + (pages > 1 ? ", part " + (p + 1) + " of " + pages : ""), notes: { script: [L.refs] } });
      const chunk = list.slice(p * perSlide, (p + 1) * perSlide), half = Math.ceil(chunk.length / 2);
      const col = (xs, x) => { if (xs.length) tx(s, xs.map((t, i) => ({ text: t, options: { breakLine: i < xs.length - 1, paraSpaceAfter: 7 } })), x, 2.3, 5.6, 4.25, { fontSize: 11 }); };
      col(chunk.slice(0, half), X); col(chunk.slice(half), 7.0);
    }
  }

  /** Write the file, apply the theme, split notes into paragraphs, print the timing report. */
  async function save(file, o) {
    o = o || {};
    await pres.writeFile({ fileName: file });
    const themePath = opts.applyThemePath || "/mnt/skills/public/pptx/scripts/apply_theme.js";
    if (fs.existsSync(themePath)) { const { applyTheme } = require(themePath); await applyTheme(file, THEME); }
    else console.warn("WARN apply_theme.js not found at " + themePath + "; theme part not rewritten.");
    execFileSync("python3", [path.join(__dirname, "fix_notes.py"), file], { stdio: "inherit" });
    const main = log.filter(r => !r.backup && r.min > 0);
    const budget = main.reduce((a, r) => a + r.min, 0), est = main.reduce((a, r) => a + r.est, 0);
    console.log("\nslide  budget  script-est  title");
    log.forEach((r, i) => console.log(String(i + 1).padStart(3) + (r.backup ? " B" : "  ") + r.min.toFixed(1).padStart(7) + r.est.toFixed(1).padStart(11) + "   " + r.title.slice(0, 60) + (r.empty ? "   <-- NO SCRIPT" : "") + (!r.backup && r.min > 0 && r.est > r.min ? "   <-- script longer than its budget" : "")));
    console.log("spoken slides: " + main.length + " | time budget " + budget.toFixed(1) + " min | script estimate " + est.toFixed(1) + " min (125 wpm, 240 CJK characters per minute; pauses and pointing come on top)");
    if (o.minutes && budget > o.minutes) console.warn("WARN the budget of " + budget.toFixed(1) + " min exceeds the " + o.minutes + "-minute slot");
    if (o.minutes && main.length > Math.round(o.minutes / 1.4) + 1) console.warn("WARN " + main.length + " spoken slides is too many for " + o.minutes + " minutes; move some to backup");
    return { slides: log.length, spoken: main.length, budget, est };
  }

  return { pres, C, X, W, HEAD, K, section, startBackup, cover, slide, statement, tx, big, label, block, bullets, table, rule, rows, box, cards, fig, barChart, cites, references, save };
}
module.exports = { createDeck };
