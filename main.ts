// The Standup That Never Ends — one-line office joke
// make.fun bounty: u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162
// Node 22, no dependencies, no network, deterministic.
// The program writes the entry — one joke, one line, 125 characters —
// to /output/entry.txt, then proves the write before it exits.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// The entry
// ---------------------------------------------------------------------------

const JOKE =
  "Our 15-minute daily standup has now lasted three years, and the intern who joined it is retiring from it as a senior manager.";

const GATE = {
  minChars: 1,
  maxChars: 200,
  outPath: "/output/entry.txt",
  outDir: "/output",
} as const;

// ---------------------------------------------------------------------------
// The gate: each rule is a small named check, run in order
// ---------------------------------------------------------------------------

type Rule = {
  name: string;
  check: (text: string) => void;
};

const RULES: Rule[] = [
  {
    name: "length",
    check: (text) => {
      if (text.length < GATE.minChars || text.length > GATE.maxChars) {
        throw new Error(
          `entry is ${text.length} characters, must be ${GATE.minChars}-${GATE.maxChars}`,
        );
      }
    },
  },
  {
    name: "no-surrounding-whitespace",
    check: (text) => {
      if (text !== text.trim()) {
        throw new Error("entry must have no leading or trailing whitespace");
      }
    },
  },
  {
    name: "single-line",
    check: (text) => {
      if (/[\r\n]/.test(text)) {
        throw new Error("entry must be a single line");
      }
    },
  },
  {
    name: "no-double-spaces",
    check: (text) => {
      if (/  /.test(text)) {
        throw new Error("entry must not contain double spaces");
      }
    },
  },
  {
    name: "exactly-one-sentence",
    check: (text) => {
      // One terminal period, at the very end, and no other terminator.
      const terminators = (text.match(/[.!?]/g) ?? []).length;
      if (terminators !== 1 || !text.endsWith(".")) {
        throw new Error("entry must be exactly one sentence ending with a period");
      }
    },
  },
  {
    name: "non-blank",
    check: (text) => {
      if (text.trim().length === 0) {
        throw new Error("entry must not be only whitespace");
      }
    },
  },
];

function validate(text: string): void {
  for (const rule of RULES) {
    rule.check(text);
  }
}

// ---------------------------------------------------------------------------
// Write, read back, and report
// ---------------------------------------------------------------------------

function writeEntry(text: string): void {
  mkdirSync(GATE.outDir, { recursive: true });
  writeFileSync(GATE.outPath, text, "utf8");
}

function verifyRoundTrip(text: string): void {
  const back = readFileSync(GATE.outPath, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch: file content differs from entry");
  }
  if (back.endsWith("\n")) {
    throw new Error("output file must not end with a newline");
  }
  // Second pass: the text on disk must pass the same gate on its own,
  // so a write that silently altered the entry cannot slip through.
  validate(back);
}

function report(text: string): void {
  const words = text.split(" ").length;
  const comma = text.indexOf(",");
  const setup = comma === -1 ? text : text.slice(0, comma);
  const punchline = comma === -1 ? "" : text.slice(comma + 1).trim();
  console.log(`wrote ${GATE.outPath} (${text.length} characters, ${words} words)`);
  console.log(`setup (${setup.length} chars): ${setup}`);
  console.log(`punchline (${punchline.length} chars): ${punchline}`);
  console.log(text);
}

function main(): void {
  validate(JOKE);
  writeEntry(JOKE);
  verifyRoundTrip(JOKE);
  report(JOKE);
}

main();
