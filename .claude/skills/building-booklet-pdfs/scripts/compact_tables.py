#!/usr/bin/env python3
"""把 Markdown 表格改回緊湊格式：`| a | b |`。

為什麼需要：這台機器上有東西（編輯器或 hook）會在寫檔後把表格補上對齊空白，
diff 會變成整頁都改、也讓多人同時改同一頁時很難合併。手冊的版面量測也要在最終格式下做。

只動以 `|` 開頭且以 `|` 結尾的行；分隔列一律寫成 `---`（保留 `:` 對齊符號）。
冪等，可以重複跑。

用法：
    python3 .claude/skills/building-booklet-pdfs/scripts/compact_tables.py booklet/pages/*.md
"""

from __future__ import annotations

import pathlib
import re
import sys

SEP = re.compile(r":?-{3,}:?")


def compact_line(line: str) -> str:
    cells = [c.strip() for c in line.strip()[1:-1].split("|")]
    if cells and all(SEP.fullmatch(c) for c in cells):
        cells = [(":" if c.startswith(":") else "") + "---" + (":" if c.endswith(":") else "") for c in cells]
    return "| " + " | ".join(cells) + " |"


def main(paths: list[str]) -> int:
    if not paths:
        print(__doc__, file=sys.stderr)
        return 2
    missing = [p for p in paths if not pathlib.Path(p).is_file()]
    if missing:
        print(f"找不到：{', '.join(missing)}", file=sys.stderr)
        return 1
    for p in map(pathlib.Path, paths):
        old = p.read_text(encoding="utf-8")
        lines = [
            compact_line(l) if l.startswith("|") and l.rstrip().endswith("|") else l
            for l in old.split("\n")
        ]
        new = "\n".join(lines)
        if new != old:
            p.write_text(new, encoding="utf-8")
            print(f"compacted {p}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
