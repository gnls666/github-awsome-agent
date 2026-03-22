import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const reactTsxInstructions = readFileSync(".github/instructions/react-tsx.instructions.md", "utf8");

test("react instructions require .tsx for files that render JSX", () => {
  assert.match(reactTsxInstructions, /\.tsx/i);
  assert.match(reactTsxInstructions, /JSX/i);
  assert.match(reactTsxInstructions, /SelectChangeEvent/i);
  assert.match(reactTsxInstructions, /unused imports|typecheck-clean/i);
});
