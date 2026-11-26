// The Printer Apology — make.fun entry.
// A tiny program that writes the printer's apology line to entry.txt.
// The line was picked head-to-head from 10 candidates by an LLM judge
// (Groq gpt-oss-120b) using the competition's own judging criteria:
// it beat the runner-up 4/5 on the punchline landing at the end.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I'm sorry I jammed again. You keep feeding me damp paper and yelling. One of us needs therapy, and it's not me.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

function gate(line: string): void {
  if (line.length < 1 || line.length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

gate(LINE);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");
const bytes = new TextEncoder().encode(LINE).length;
console.log(`wrote ${LINE.length} characters (${bytes} bytes) to ${OUTPUT_PATH}`);
