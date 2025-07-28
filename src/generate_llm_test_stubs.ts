import fs from "fs";

// Reads the LLM analysis markdown and generates test stubs for newly added objects
const llmAnalysisPath = "./scemaDiff/llm_analysis.md";

function extractCodeBlock(markdown: string): string | null {
  // Extract the first TypeScript code block from the markdown
  const codeBlockMatch = markdown.match(/```typescript([\s\S]*?)```/i);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  return null;
}

function getTimestampedFilename(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `./scemaDiff/src/__tests__/${yyyy}_${mm}_${dd}_${hh}_${min}_${ss}_testAddition.ts`;
}

function main() {
  const markdown = fs.readFileSync(llmAnalysisPath, "utf-8");
  const codeBlock = extractCodeBlock(markdown);
  const outputTestPath = getTimestampedFilename();
  if (codeBlock) {
    fs.writeFileSync(outputTestPath, codeBlock + "\n");
    console.log(`Extracted code block and wrote to ${outputTestPath}`);
  } else {
    fs.writeFileSync(outputTestPath, "// No TypeScript code block found in LLM analysis.\n");
    console.log("No TypeScript code block found in LLM analysis.");
  }
}

main();


