import { readFileSync, writeFileSync } from "node:fs";

const filePath = "lib/exam-data.ts";
let nextId = 0;
const source = readFileSync(filePath, "utf8");

const output = source.replace(
  /\{\r?\n\s+"id": \d+,\r?\n\s+"slug": "question-\d+",/g,
  () => {
    nextId += 1;
    return `{\n    "id": ${nextId},\n    "slug": "question-${nextId}",`;
  },
);

writeFileSync(filePath, output);
console.log(`Renumbered ${nextId} questions.`);
