const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.join(__dirname, "dist");
const portArgIndex = process.argv.indexOf("--port");
const port = Number(portArgIndex >= 0 ? process.argv[portArgIndex + 1] : process.env.PORT || 5173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon"
};

function sendFile(response, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(500);
      response.end("Internal server error");
      return;
    }
    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    response.end(data);
  });
}

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, `http://localhost:${port}`).pathname);
  const requestedPath = path.normalize(path.join(root, urlPath));
  const safePath = requestedPath.startsWith(root) ? requestedPath : path.join(root, "index.html");

  fs.stat(safePath, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(response, safePath);
      return;
    }
    sendFile(response, path.join(root, "index.html"));
  });
});

server.listen(port, () => {
  console.log(`PathMentor frontend available on http://localhost:${port}`);
});
