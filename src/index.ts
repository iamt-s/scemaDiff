import { fetchSchema } from "./utils/fetchSchema";
import { saveSchema, loadSchema } from "./utils/schemaIO";
import { diffSchemas } from "./utils/diffSchemas";
import { callLLM } from "./utils/callLLM";
import chalk from "chalk";
import fs from "fs";
import { generateTestStubsFromLLMAnalysisFile } from "./generate_llm_test_stubs";
const latestPath = "./scemaDiff/schema/veryNew.graphql";
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
  generateTestStubsFromLLMAnalysisFile();

}
