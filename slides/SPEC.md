# Writing a session spec

Each session is one JSON file in `specs/`, rendered by `lib/render.js` into a 30-minute
.pptx in `decks/`. The audience is residents and fellows preparing for the **Taiwan
haematology board examination (台灣血液病專科醫師甄試)**. Slides in English; the verbatim
speaker script in Traditional Chinese (Taiwan clinical register).

## Ground rules on content

- **Source = the chapter text only** (`../ebmt-handbook/references/chapters/chNN-*.md`).
  Read the core chapters in full; skim the support chapters for what the exam needs.
- Every number, dose, threshold, grade and criterion on a slide must be traceable to a
  sentence or table in a chapter. Do not add facts from memory. If something exam-relevant
  is missing from the book (e.g. a newer approval, a Taiwan reimbursement rule), either leave
  it out or put it in square brackets `[verify: ...]` on the slide **and** in that slide's
  `reminders` as `TO CONFIRM BEFORE PRESENTING: ...`.
- Your own inference or arithmetic is labelled on the slide ("speaker's summary").
- High-yield first: diagnostic criteria, grading/staging systems, risk scores, doses and
  schedules, first-line versus second-line choices, indications (which disease, which phase,
  which donor), named trials and their results. Skip history and organisational detail.
- Footer `cite` on every slide: short form of the chapter(s) the slide draws on, e.g.
  `Holler E, et al. EBMT Handbook 8th ed. 2024; Ch. 43`. Join two with ` · `.
- `references`: the full form of each chapter used (authors, title, in: The EBMT Handbook,
  8th ed., Springer 2024, pages, DOI from the chapter header), then any primary paper you
  name on a slide, copied **verbatim** from that chapter's reference list, numbered.

## Time budget (30 minutes)

- 17–20 spoken slides including the cover (0.5 min), outline (0.5–1), and **3 board-style
  questions** at the end (each question + answer pair ≈ 1.5–2 min total).
- `notes.min` on every spoken slide; the sum over spoken slides must be 27–29 minutes.
  Tables, flowcharts and criteria slides 1.5–2 min; simple slides 1 min.
- 2–4 backup slides (`"backup": true`) after the main line for detail that did not fit.

## Visual rules

Black and white, minimal. Prefer **tables** and **simple flowcharts** (`chain`, `tree`)
over bullets. At least 5 tables and 3 flowcharts per deck. A figure from the book may be
used (`type: figure`, name like `ch49-fig1`; grayscale copies live in `fig/`), only if it
is readable and adds something a table cannot.

Titles are full sentences stating the point ("Ruxolitinib is the standard for
steroid-refractory aGVHD"), ≤ 75 characters, all in the same grammatical form.

## Slide types and capacity

All slides take `eyebrow` (short CAPS-style label, e.g. "aGVHD · Grading"), `title`,
`cite`, `notes`, optional `section` (starts a PowerPoint section), optional `backup`.

| type | fields | capacity |
|---|---|---|
| `outline` | `rows: [[head, desc, "x min"], …]` | ≤ 4 rows; head ≤ 50 chars, desc ≤ 80 |
| `table` | `head: [...]`, `rows: [[...]]`, `colW` (relative widths), `caption`, `fontSize` | ≤ 5 columns, ≤ 8 rows; cells ≤ 60 chars; use `\n` for a deliberate break |
| `chain` | `steps: [...]`, `invert` (index), `caption` | 3–5 steps, each ≤ 45 chars (≤ 30 with 5) |
| `tree` | `root`, `branches: [{label, box, out}]`, `invert` (index or "root") | 2–4 branches; root ≤ 60, box ≤ 40, out ≤ 45, label ≤ 25 chars |
| `bullets` | `items: [...]` | ≤ 6 items, ≤ 90 chars |
| `columns` | `cols: [{head, items}]` | 2–3 columns, ≤ 5 items, ≤ 45 chars (2 cols) / 30 (3 cols) |
| `blocks` | `blocks: [{head, body, extra}]` | 3 blocks; body ≤ 120 chars |
| `numbers` | `items: [{num, label}]`, `caption` | 2–3 items; num ≤ 8 chars, label ≤ 60 |
| `cards` | `cards: [{head, lines, question}]` | 2–3 cards; lines ≤ 26 chars, ≤ 4 lines |
| `figure` | `fig`, `alt`, `caption` | caption ≤ 250 chars |
| `statement` | `title`, `sub` | one sentence; sub ≤ 120 chars |
| `mcq` | `stem`, `options` (5), `answer` ("A"–"E"), `explanation`, `notes`, `answerNotes`, `answerTitle` | stem ≤ 320 chars; options ≤ 70; explanation ≤ 350 |

At most one inverted (black) element per slide: use it for the thing being contrasted.

`mcq` renders two slides (question, then answer). Questions are clinical vignettes in the
style of the Taiwan board: single best answer, plausible distractors, answer derivable from
the chapter. `notes` is the question slide (include `[Pause for answers.]`), `answerNotes`
explains why the answer is right and why the main distractor is wrong.

## Spec skeleton

```json
{
  "title": "Acute GVHD",
  "subtitle": "Week 6 · Ch. 43",
  "cite": "Holler E, et al. EBMT Handbook 8th ed. 2024; Ch. 43",
  "coverNotes": {"min": 0.5, "script": ["…"]},
  "references": ["1. …", "2. …"],
  "slides": [ {"type": "outline", …}, … , {"type": "mcq", …}, {"type": "table", "backup": true, …} ]
}
```

## Speaker script (notes)

`notes: {min, script: [paragraphs], reminders: [not read aloud]}`. Budget ≈ 220–240 Chinese
characters per minute (English terms count as words at ~125/min), so a 1.5-min slide is
about 300–350 characters. Whole deck ≈ 5,000–6,000 characters.

Write it in Chinese from the start, in the mixed register Taiwanese clinicians speak:
Chinese sentence frames, English for drug names, trials, endpoints and standard terms
(GVHD, conditioning, engraftment, CMV, MAC/RIC, ruxolitinib, hazard ratio…).

- Say what the slide shows, then the number, then what it means. State numbers plainly once.
- Short sentences, short paragraphs. Vary how slides open and close.
- Mention what is commonly tested ("這個 cutoff 考試很愛考") but not on every slide.
- Do **not** use: rhetorical-question openers (「那這個好處一致嗎？」), colon reveals
  (「答案是：…」「重點很簡單：…」), 「第一…第二…第三…」 on slide after slide, closing maxims
  (「這是很重要的一課」「持平的結論是…」), stage directions to oneself (「我要說清楚…」
  「請大家記住」), written connectives at paragraph starts (「也就是說」「換句話說」「整體來說」).
- Pauses for the audience in square brackets: `[Pause for answers.]`.
- Backup slides: two or three sentences to say if the slide is called up (no `min`).

## Build and check

```bash
cd slides
NODE_PATH=$PWD/node_modules node lib/render.js specs/sNN-slug.json decks/
python3 lib/deck_figures.py sheet decks/sNN-slug.pptx qa/sNN
python3 /mnt/skills/public/pptx/scripts/office/validate.py decks/sNN-slug.pptx
```

Look at every contact sheet image. Fix: text overflowing a box or the slide, a table
running into the footer (y > 6.45 in), a word or number alone on a line, a title wrapping
to three lines, boxes touching. Re-render until clean. The timing table printed by the
render must show no `NO SCRIPT` and no `script longer than its budget` on spoken slides,
and a total budget of 27–29 minutes.
