import { fetchSchema } from "./utils/fetchSchema";
import { saveSchema, loadSchema } from "./utils/schemaIO";
import { diffSchemas } from "./utils/diffSchemas";
import { callLLM } from "./utils/callLLM";

async function main() {
  //const endpoint = "https://your-api-endpoint/graphql";
  const baselinePath = "./schema/sample1.graphql";
  const latestPath = "./schema/new.graphql";

  console.log("Fetching latest schema...");
 // const latestSchema =await loadSchema(baselinePath);
  //await saveSchema(latestPath, latestSchema);

  console.log("Loading baseline schema...");
  const baselineSchema = await loadSchema(baselinePath);

  console.log("Generating diff...");
  const diff = diffSchemas(baselineSchema, latestPath);
  console.log("\n=== RAW DIFF ===\n", diff);

  if (diff.includes('No differences found')) {
    console.log("\n✅ No changes detected.");
    return;
  }

  console.log("\nSending diff to LLM for analysis...");
  const summary = await callLLM(diff);
  console.log("\n=== LLM Analysis ===\n", summary);
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
