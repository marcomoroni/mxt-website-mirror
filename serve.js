import {Application} from "https://deno.land/x/abc@v1.3.3/mod.ts";

// Serve.
// deno run --allow-net --allow-read --allow-run serve.js
const app = new Application();
console.log("Serving at http://localhost:8080/");
app
    .static("/", ".")
    .file("/", `.\\index.html`)
    .start({port: 8080});
