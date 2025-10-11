import { glob, readFile } from "node:fs/promises";
import { CNako3 } from "nadesiko3/src/cnako3mod.mjs";

const cnako3 = new CNako3();

const logLevel = "error";
cnako3.getLogger().addListener(logLevel, ({ nodeConsole }) => {
  console.log(nodeConsole);
});

for await (const f of glob("**/*.test.nako3")) {
  const src = await readFile(f, "utf8");
  await cnako3.runAsync(src, f);
}
