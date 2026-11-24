// The Standup That Never Ends
// make.fun bounty: u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162
// Program (Node 22, no dependencies, no network, deterministic):
// writes one line — a joke about office standups — to /output/entry.txt
// and validates it against the gate: UTF-8 text, 1-200 characters,
// exactly one sentence, a single line, no leading/trailing whitespace,
// and the file on disk must read back byte-identical (no trailing newline).

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const ENTRY =
  "Our 15-minute daily standup has now lasted three years, and the intern who joined it is retiring from it as a senior manager.";

const MAX_CHARS = 200;
const OUT_PATH = "/output/entry.txt";

function checkEntry(text: string): string {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} characters, must be 1-${MAX_CHARS}`);
  }
  if (text !== text.trim()) {
    throw new Error("entry must have no leading or trailing whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (/  /.test(text)) {
    throw new Error("entry must not contain double spaces");
  }
  // Exactly one sentence: a single terminal period, at the very end.
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence ending with a period");
  }
  return text;
}

function main(): void {
  const text = checkEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, text, "utf8");
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch: file content differs from entry");
  }
  if (back.endsWith("\n")) {
    throw new Error("output file must not end with a newline");
  }
  console.log(`wrote ${OUT_PATH} (${text.length} characters)`);
  console.log(text);
}

main();
