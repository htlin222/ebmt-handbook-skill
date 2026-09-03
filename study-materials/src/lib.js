// Minimal black-and-white 1:1 slide renderer built on pptxgenjs.
// Three content forms only: outline, table, flowchart (plus a two-column wrapper and a note).

const FONT = "Arial";
const BLACK = "000000";
const GREY = "6E6E6E";
const RULE = "BFBFBF";
const WHITE = "FFFFFF";

const SIZE = 7.5; // inches, square
const M = 0.5; // margin
const W = SIZE - 2 * M; // content width
const TOP = 1.55; // content top after header
const BOTTOM = SIZE - 0.62; // content bottom before footer
const GAP = 0.22; // gap between blocks

// ---------- text measurement (Arial ≈ 0.5 em average glyph width) ----------
function charsPerLine(widthIn, pt, factor = 0.52) {
  return Math.max(6, Math.floor((widthIn * 72) / (pt * factor)));
}
function wrapLines(text, widthIn, pt, factor = 0.52) {
  const cpl = charsPerLine(widthIn, pt, factor);
  const words = String(text).replace(/\*\*/g, "").split(/\s+/);
  let lines = 1;
  let cur = 0;
  for (const w of words) {
    const len = w.length + (cur ? 1 : 0);
    if (cur + len > cpl && cur > 0) {
      lines++;
      cur = w.length;
    } else cur += len;
  }
  return lines;
}
function lineH(pt) {
  return (pt * 1.22) / 72;
}

// "**bold**" inline markup → pptxgenjs runs
// Paragraph-level props (bullet, indentLevel, paraSpaceAfter, align) go on the first run only;
// pptxgenjs opens a new paragraph for every run that carries them.
const PARA_KEYS = ["bullet", "indentLevel", "paraSpaceAfter", "paraSpaceBefore", "align", "lineSpacing"];
function runs(text, base) {
  const out = [];
  const parts = String(text).split(/(\*\*.+?\*\*)/g).filter(Boolean);
  parts.forEach((p, i) => {
    const bold = p.startsWith("**");
    const o = Object.assign({}, base, bold ? { bold: true } : {});
    if (i > 0) PARA_KEYS.forEach((k) => delete o[k]);
    out.push({ text: bold ? p.slice(2, -2) : p, options: o });
  });
  return out;
}

// ---------- block: outline ----------
// { type:'outline', heading?, items:[ "text" | {t:"text", sub:["..."]} ], pt? }
function outlineHeight(b, w, pt) {
  let h = 0;
  const psa = 3 / 72;
  if (b.heading) h += lineH(pt + 1) + 4 / 72;
  for (const it of b.items) {
    const t = typeof it === "string" ? it : it.t;
    h += wrapLines(t, w - 0.22, pt) * lineH(pt) + psa;
    if (typeof it !== "string" && it.sub) for (const s of it.sub) h += wrapLines(s, w - 0.5, pt - 0.5) * lineH(pt - 0.5) + psa;
  }
  return h + 0.04;
}
function drawOutline(slide, b, x, y, w, pt) {
  const arr = [];
  const psa = 3;
  if (b.heading) arr.push({ text: b.heading, options: { bold: true, fontSize: pt + 1, breakLine: true, paraSpaceAfter: 4, color: BLACK } });
  b.items.forEach((it) => {
    const t = typeof it === "string" ? it : it.t;
    const r = runs(t, { fontSize: pt, color: BLACK, bullet: { code: "25AA", indent: 12 }, paraSpaceAfter: psa });
    r[r.length - 1].options.breakLine = true;
    arr.push(...r);
    if (typeof it !== "string" && it.sub)
      it.sub.forEach((s) => {
        const rr = runs(s, { fontSize: pt - 0.5, color: BLACK, bullet: { code: "2013", indent: 12 }, indentLevel: 1, paraSpaceAfter: psa });
        rr[rr.length - 1].options.breakLine = true;
        arr.push(...rr);
      });
  });
  // last run should not break
  arr[arr.length - 1].options.breakLine = false;
  slide.addText(arr, { x, y, w, h: outlineHeight(b, w, pt), fontFace: FONT, margin: 0, valign: "top", isTextBox: true });
}

// ---------- block: table ----------
// { type:'table', cols:[...], rows:[[...]], widths?:[fractions], pt? }
function tableRowHeights(b, w, pt) {
  const widths = colWidths(b, w);
  const rh = [];
  const all = [b.cols, ...b.rows];
  all.forEach((row, i) => {
    let lines = 1;
    row.forEach((c, j) => {
      lines = Math.max(lines, wrapLines(c, widths[j] - 0.12, pt, i === 0 ? 0.6 : 0.56));
    });
    rh.push(lines * lineH(pt) * 1.08 + 0.16);
  });
  return rh;
}
function colWidths(b, w) {
  const n = b.cols.length;
  const fr = b.widths || Array(n).fill(1 / n);
  const sum = fr.reduce((a, c) => a + c, 0);
  return fr.map((f) => (f / sum) * w);
}
function tableHeight(b, w, pt) {
  return tableRowHeights(b, w, pt).reduce((a, c) => a + c, 0) + 0.02;
}
function drawTable(slide, b, x, y, w, pt) {
  const widths = colWidths(b, w);
  const rh = tableRowHeights(b, w, pt);
  const none = { type: "none" };
  const hdr = b.cols.map((c) => ({
    text: c,
    options: { bold: true, color: BLACK, border: [none, none, { pt: 1, color: BLACK }, none], fontSize: pt },
  }));
  const body = b.rows.map((row, i) =>
    row.map((c, j) => ({
      text: runs(c, { fontSize: pt, color: BLACK }),
      options: {
        color: BLACK,
        bold: !!(b.boldFirst && j === 0),
        border: [none, none, { pt: 0.5, color: RULE }, none],
      },
    }))
  );
  slide.addTable([hdr, ...body], {
    x,
    y,
    w,
    colW: widths,
    rowH: rh,
    fontFace: FONT,
    fontSize: pt,
    color: BLACK,
    valign: "middle",
    margin: [0.03, 0.06, 0.03, 0.06],
    autoPage: false,
  });
}

// ---------- block: flow ----------
// { type:'flow', dir:'h'|'v', nodes:["a","b",...], labels?:[edge labels], pt? }
// { type:'flow', dir:'tree', root:"...", branches:[{label?, node, then?:["..."]}], pt? }
function boxLines(text, w, pt) {
  return wrapLines(text, w - 0.16, pt);
}
function flowHeight(b, w, pt) {
  if (b.dir === "h" && b.nodes.length >= 5) pt -= 1;
  if (b.dir === "h") {
    const n = b.nodes.length;
    const bw = (w - 0.3 * (n - 1)) / n;
    let lines = 1;
    b.nodes.forEach((t) => (lines = Math.max(lines, boxLines(t, bw, pt))));
    let h = Math.max(0.5, lines * lineH(pt) + 0.16);
    if (b.labels) h += lineH(pt - 1) + 0.04;
    return h + 0.02;
  }
  if (b.dir === "v") {
    const bw = b.boxW || Math.min(w, 4.2);
    let h = 0;
    b.nodes.forEach((t, i) => {
      h += Math.max(0.36, boxLines(t, bw, pt) * lineH(pt) + 0.14);
      if (i < b.nodes.length - 1) h += 0.28;
    });
    return h + 0.02;
  }
  if (b.dir === "tree") {
    const n = b.branches.length;
    const bw = (w - 0.2 * (n - 1)) / n;
    const rootW = Math.min(w, Math.max(2.6, bw));
    const rootH = Math.max(0.36, boxLines(b.root, rootW, pt) * lineH(pt) + 0.14);
    let childLines = 1;
    let thenLines = 0;
    b.branches.forEach((br) => {
      childLines = Math.max(childLines, boxLines(br.node, bw, pt));
      if (br.then) thenLines = Math.max(thenLines, br.then.reduce((a, t) => a + boxLines(t, bw, pt - 0.5), 0) + br.then.length * 0.5);
    });
    const labelH = treeLabelH(b, bw, pt);
    const childH = Math.max(0.36, childLines * lineH(pt) + 0.14);
    let h = rootH + 0.5 + labelH + childH;
    if (thenLines) h += 0.12 + thenLines * lineH(pt - 0.5) + 0.02;
    return h + 0.04;
  }
  return 0;
}
function treeLabelH(b, bw, pt) {
  let lines = 0;
  b.branches.forEach((br) => {
    if (br.label) lines = Math.max(lines, wrapLines(br.label, bw - 0.2, pt - 1.5));
  });
  return lines ? lines * lineH(pt - 1.5) + 0.12 : 0;
}
function box(slide, text, x, y, w, h, pt, opts = {}) {
  slide.addText(runs(text, { fontSize: pt, color: opts.invert ? WHITE : BLACK }), {
    x,
    y,
    w,
    h,
    shape: "rect",
    fill: { color: opts.invert ? BLACK : WHITE },
    line: { color: BLACK, width: opts.dashed ? 0.75 : 0.75, dashType: opts.dashed ? "dash" : "solid" },
    fontFace: FONT,
    align: "center",
    valign: "middle",
    margin: 0.05,
    isTextBox: true,
  });
}
function arrow(slide, x1, y1, x2, y2) {
  const x = Math.min(x1, x2),
    y = Math.min(y1, y2);
  const w = Math.abs(x2 - x1),
    h = Math.abs(y2 - y1);
  slide.addShape("line", {
    x,
    y,
    w,
    h,
    flipH: x2 < x1,
    flipV: y2 < y1,
    line: { color: BLACK, width: 0.75, endArrowType: "triangle" },
  });
}
function plainLine(slide, x1, y1, x2, y2) {
  slide.addShape("line", {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    w: Math.abs(x2 - x1),
    h: Math.abs(y2 - y1),
    line: { color: BLACK, width: 0.75 },
  });
}
function smallLabel(slide, text, x, y, w, pt, align = "center") {
  slide.addText(text, { x, y, w, h: lineH(pt) + 0.02, fontFace: FONT, fontSize: pt, color: GREY, align, margin: 0, valign: "middle", isTextBox: true });
}
function drawFlow(slide, b, x, y, w, pt) {
  if (b.dir === "h" && b.nodes.length >= 5) pt -= 1;
  if (b.dir === "h") {
    const n = b.nodes.length;
    const bw = (w - 0.3 * (n - 1)) / n;
    let lines = 1;
    b.nodes.forEach((t) => (lines = Math.max(lines, boxLines(t, bw, pt))));
    const bh = Math.max(0.5, lines * lineH(pt) + 0.16);
    let yy = y;
    if (b.labels) yy += lineH(pt - 1) + 0.04;
    b.nodes.forEach((t, i) => {
      const bx = x + i * (bw + 0.3);
      box(slide, t, bx, yy, bw, bh, pt, { invert: b.invert && b.invert.includes(i), dashed: b.dashed && b.dashed.includes(i) });
      if (i < n - 1) {
        arrow(slide, bx + bw + 0.03, yy + bh / 2, bx + bw + 0.27, yy + bh / 2);
        if (b.labels && b.labels[i]) smallLabel(slide, b.labels[i], bx + bw - 0.4, y, 1.1, pt - 1);
      }
    });
    return;
  }
  if (b.dir === "v") {
    const bw = b.boxW || Math.min(w, 4.2);
    const bx = x + (w - bw) / 2;
    let yy = y;
    b.nodes.forEach((t, i) => {
      const bh = Math.max(0.36, boxLines(t, bw, pt) * lineH(pt) + 0.14);
      box(slide, t, bx, yy, bw, bh, pt, { invert: b.invert && b.invert.includes(i), dashed: b.dashed && b.dashed.includes(i) });
      yy += bh;
      if (i < b.nodes.length - 1) {
        arrow(slide, bx + bw / 2, yy + 0.02, bx + bw / 2, yy + 0.26);
        if (b.labels && b.labels[i]) smallLabel(slide, b.labels[i], bx + bw / 2 + 0.1, yy + 0.04, 2.2, pt - 1, "left");
        yy += 0.28;
      }
    });
    return;
  }
  if (b.dir === "tree") {
    const n = b.branches.length;
    const bw = (w - 0.2 * (n - 1)) / n;
    const rootW = Math.min(w, Math.max(2.6, bw));
    const rootH = Math.max(0.36, boxLines(b.root, rootW, pt) * lineH(pt) + 0.14);
    const rootX = x + (w - rootW) / 2;
    box(slide, b.root, rootX, y, rootW, rootH, pt, { invert: b.invertRoot });
    const labelH = treeLabelH(b, bw, pt);
    const barY = y + rootH + 0.2;
    const childY = barY + 0.3 + labelH;
    let childLines = 1;
    b.branches.forEach((br) => (childLines = Math.max(childLines, boxLines(br.node, bw, pt))));
    const childH = Math.max(0.36, childLines * lineH(pt) + 0.14);
    const cx = (i) => x + i * (bw + 0.2) + bw / 2;
    plainLine(slide, x + w / 2, y + rootH, x + w / 2, barY);
    if (n > 1) plainLine(slide, cx(0), barY, cx(n - 1), barY);
    b.branches.forEach((br, i) => {
      arrow(slide, cx(i), barY, cx(i), childY - 0.02);
      if (br.label)
        slide.addText(br.label, { x: cx(i) - bw / 2 + 0.1, y: barY + 0.12, w: bw - 0.2, h: labelH - 0.06, fontFace: FONT, fontSize: pt - 1.5, color: GREY, fill: { color: WHITE }, align: "center", valign: "middle", margin: 0, isTextBox: true });
      box(slide, br.node, x + i * (bw + 0.2), childY, bw, childH, pt, { invert: br.invert, dashed: br.dashed });
      if (br.then) {
        let ty = childY + childH + 0.12;
        br.then.forEach((t) => {
          const th = boxLines(t, bw, pt - 0.5) * lineH(pt - 0.5) + 0.06;
          slide.addText(runs(t, { fontSize: pt - 0.5, color: BLACK }), { x: x + i * (bw + 0.2), y: ty, w: bw, h: th, fontFace: FONT, align: "center", valign: "top", margin: 0, isTextBox: true });
          ty += th + 0.06;
        });
      }
    });
  }
}

// ---------- block: note (small grey text) ----------
function noteHeight(b, w, pt) {
  return wrapLines(b.text, w, pt - 1) * lineH(pt - 1) + 0.04;
}
function drawNote(slide, b, x, y, w, pt) {
  slide.addText(runs(b.text, { fontSize: pt - 1, color: GREY, italic: true }), { x, y, w, h: noteHeight(b, w, pt), fontFace: FONT, margin: 0, valign: "top", isTextBox: true });
}

// ---------- block: heading (small caps section label) ----------
function headingHeight(b, w, pt) {
  return lineH(pt) + 0.06;
}
function drawHeading(slide, b, x, y, w, pt) {
  slide.addText(b.text.toUpperCase(), { x, y, w, h: lineH(pt) + 0.02, fontFace: FONT, fontSize: pt - 1.5, color: GREY, charSpacing: 1.5, bold: true, margin: 0, valign: "bottom", isTextBox: true });
}

// ---------- block: cols (two columns) ----------
function blockHeight(b, w, pt) {
  const p = b.pt ? pt + b.pt : pt;
  switch (b.type) {
    case "outline":
      return outlineHeight(b, w, p);
    case "table":
      return tableHeight(b, w, p - 1);
    case "flow":
      return flowHeight(b, w, p - 1);
    case "note":
      return noteHeight(b, w, p);
    case "heading":
      return headingHeight(b, w, p);
    case "cols": {
      const split = b.split || 0.5;
      const lw = w * split - 0.15,
        rw = w * (1 - split) - 0.15;
      return Math.max(stackHeight(b.left, lw, pt), stackHeight(b.right, rw, pt));
    }
    case "spacer":
      return b.h || 0.1;
  }
  return 0;
}
function drawBlock(slide, b, x, y, w, pt) {
  const p = b.pt ? pt + b.pt : pt;
  switch (b.type) {
    case "outline":
      return drawOutline(slide, b, x, y, w, p);
    case "table":
      return drawTable(slide, b, x, y, w, p - 1);
    case "flow":
      return drawFlow(slide, b, x, y, w, p - 1);
    case "note":
      return drawNote(slide, b, x, y, w, p);
    case "heading":
      return drawHeading(slide, b, x, y, w, p);
    case "cols": {
      const split = b.split || 0.5;
      const lw = w * split - 0.15,
        rw = w * (1 - split) - 0.15;
      drawStack(slide, b.left, x, y, lw, pt);
      drawStack(slide, b.right, x + w * split + 0.15, y, rw, pt);
      return;
    }
    case "spacer":
      return;
  }
}
function stackHeight(blocks, w, pt) {
  const arr = Array.isArray(blocks) ? blocks : [blocks];
  return arr.reduce((a, b, i) => a + blockHeight(b, w, pt) + (i ? GAP : 0), 0);
}
function drawStack(slide, blocks, x, y, w, pt) {
  const arr = Array.isArray(blocks) ? blocks : [blocks];
  let yy = y;
  arr.forEach((b) => {
    drawBlock(slide, b, x, yy, w, pt);
    yy += blockHeight(b, w, pt) + GAP;
  });
}

// ---------- chrome ----------
function frame(pres, slide, { part, ch, title, verified, n, total }) {
  slide.background = { color: WHITE };
  slide.addText(part.toUpperCase(), { x: M, y: 0.42, w: 4.6, h: 0.22, fontFace: FONT, fontSize: 8, color: GREY, charSpacing: 2, margin: 0, valign: "middle", isTextBox: true });
  slide.addText(ch ? `CH ${ch}` : "", { x: SIZE - M - 1.5, y: 0.42, w: 1.5, h: 0.22, fontFace: FONT, fontSize: 8, color: GREY, charSpacing: 2, align: "right", margin: 0, valign: "middle", isTextBox: true });
  slide.addText(title, { x: M, y: 0.68, w: W, h: 0.78, fontFace: FONT, fontSize: 21, bold: true, color: BLACK, margin: 0, valign: "top", isTextBox: true, fit: "shrink" });
  // footer
  const src = ch ? `EBMT Handbook, 8th ed. (2024) · Chapter ${ch}` : "EBMT Handbook, 8th ed. (2024)";
  slide.addText(src, { x: M, y: SIZE - 0.5, w: 3.6, h: 0.2, fontFace: FONT, fontSize: 7.5, color: GREY, margin: 0, valign: "middle", isTextBox: true });
  if (ch) {
    const tag = verified ? "● verified against handbook text" : "○ summary · verify with handbook";
    slide.addText(tag, { x: M + 3.6, y: SIZE - 0.5, w: 2.3, h: 0.2, fontFace: FONT, fontSize: 7.5, color: GREY, margin: 0, valign: "middle", align: "center", isTextBox: true });
  }
  slide.addText(String(n), { x: SIZE - M - 0.6, y: SIZE - 0.5, w: 0.6, h: 0.2, fontFace: FONT, fontSize: 7.5, color: GREY, align: "right", margin: 0, valign: "middle", isTextBox: true });
}

// Auto-fit: shrink base font until the block stack fits between TOP and BOTTOM.
function chapterSlide(pres, chap, meta) {
  const slide = pres.addSlide();
  frame(pres, slide, { part: meta.part, ch: chap.ch, title: chap.title, verified: chap.verified, n: meta.n, total: meta.total });
  const avail = BOTTOM - TOP;
  let pt = chap.basePt || 10.5;
  let h = stackHeight(chap.blocks, W, pt);
  while (h > avail && pt > 8) {
    pt -= 0.25;
    h = stackHeight(chap.blocks, W, pt);
  }
  if (h > avail) console.warn(`OVERFLOW ch${chap.ch} "${chap.title}": ${h.toFixed(2)} > ${avail.toFixed(2)} at ${pt}pt`);
  drawStack(slide, chap.blocks, M, TOP, W, pt);
  if (chap.notes) slide.addNotes(chap.notes);
  return slide;
}

module.exports = { FONT, BLACK, GREY, RULE, WHITE, SIZE, M, W, TOP, BOTTOM, GAP, frame, chapterSlide, drawStack, stackHeight, runs, lineH, box, arrow, plainLine };
