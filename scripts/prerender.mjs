import { readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

// Render the same React tree that the client hydrates. The main website stays
// visible before JavaScript is ready; interactive controls activate on hydration.
const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const template = await readFile("dist/index.html", "utf8");
  const marker = "<!--app-html-->";
  if (!template.includes(marker)) throw new Error("Prerender marker is missing from the built HTML.");
  const markup = renderToString(createElement(App));
  if (!markup.includes("A slower pace.")) throw new Error("The apartment page did not render.");
  await writeFile("dist/index.html", template.replace(marker, markup));
  console.log("Prerendered apartment page with complete HTML content.");
} finally {
  await server.close();
}
