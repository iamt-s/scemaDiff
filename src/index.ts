import { fetchSchema } from "./utils/fetchSchema";
import { saveSchema, loadSchema } from "./utils/schemaIO";
import { diffSchemas } from "./utils/diffSchemas";
import { callLLM } from "./utils/callLLM";
import chalk from "chalk";
import fs from "fs";
import { execSync } from "child_process";
const latestPath = "./scemaDiff/schema/veryNew.graphql.graphql";

fetchSchema('https://countries.trevorblades.com/graphql')  .then(schema => {
       saveSchema(latestPath, schema);
     main(); // <-- Call main only after schema is saved
      })
  .catch(error => {
    console.error("Error fetching schema:", error.message || error);
  });


async function main() {
  //const endpoint = "https://your-api-endpoint/graphql";
  const baselinePath = "./scemaDiff/schema/sample1.graphql";
  console.log("Fetching latest schema...");
  console.log("Loading baseline schema...");
  const baselineSchema = await loadSchema(baselinePath);
  const newSchema = await loadSchema(latestPath);
  console.log("Generating diff...");
  const diff = diffSchemas(baselineSchema, newSchema);
  //console.log("\n=== RAW DIFF ===\n", diff);
  const llmAnalysisPath = "./scemaDiff/llm_analysis.md";
  const testFolder = "./scemaDiff/src/__tests__";   
  if (diff.includes('No differences found')) {
    console.log("\n✅ No changes detected.");
    return;
  }

  console.log("\nSending diff to LLM for analysis...");
  const summary = await callLLM(diff);
  console.log("\n=== LLM Analysis ===\n");

  // Save full output to file for complete viewing
  fs.writeFileSync("./scemaDiff/llm_analysis.md", summary);
  console.log("LLM analysis saved to llm_analysis.md. Open this file in a Markdown viewer for full output.");

  // Automatically run the test stub generator script after LLM analysis
  try {
    execSync("npx ts-node ./scemaDiff/src/generate_llm_test_stubs.ts", { stdio: "inherit" });
  } catch (err) {
    console.error("Error generating test stubs:", err);
  }
}

function generateTestStubsFromLLMAnalysis(llmAnalysisPath: string, testFolder: string) {
  const analysis = fs.readFileSync(llmAnalysisPath, "utf-8");
  const addedObjects: string[] = [];

  // Simple extraction: looks for lines under "NON-BREAKING CHANGES:" that mention "Adding" or "Added"
  const nonBreakingSection = analysis.split("NON-BREAKING CHANGES:")[1];
  if (nonBreakingSection) {
    const lines = nonBreakingSection.split('\n');
    for (const line of lines) {
      const match = line.match(/Adding (the )?`?([\w\d_]+)`? (field|type|query|mutation|object)/i);
      if (match) {
        addedObjects.push(match[2]);
      }
    }
  }

  if (!fs.existsSync(testFolder)) fs.mkdirSync(testFolder, { recursive: true });
  const testFilePath = `${testFolder}/llm_schema_additions.test.ts`;

  let testFileContent = `// Auto-generated test stubs for newly added schema objects\nimport { gql } from "@apollo/client";\ndescribe("GraphQL Schema Additions", () => {\n`;

  addedObjects.forEach(obj => {
    testFileContent += `
  it("should handle the new object: ${obj}", async () => {
    // TODO: Implement test for '${obj}'
    // Example: Query or mutation involving '${obj}'
    expect(true).toBe(true);
  });
`;
  });

  testFileContent += `});\n`;

  fs.writeFileSync(testFilePath, testFileContent);
  console.log(chalk.green(`Test stubs generated at: ${testFilePath}`));
}

