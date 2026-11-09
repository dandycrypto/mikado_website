/**
 * Local preview server for the built site.
 * Usage: bun scripts/serve.ts   →   http://localhost:4173
 */
import { join } from "node:path";

const root = join(import.meta.dir, "..", "dist");
const port = Number(process.env.PORT || 4173);

const server = Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);
    let path = decodeURIComponent(url.pathname);

    if (path.endsWith("/")) path += "index.html";

    const direct = Bun.file(join(root, path));
    if (await direct.exists()) {
      return new Response(direct);
    }

    const asDir = Bun.file(join(root, path, "index.html"));
    if (await asDir.exists()) {
      return new Response(asDir);
    }

    return new Response(Bun.file(join(root, "404.html")), {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
});

console.log(`Mikado Group site → http://localhost:${server.port}`);
