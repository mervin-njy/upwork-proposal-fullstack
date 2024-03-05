const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

// Function to handle requests
const handleRequest = (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Log the request method and URL with timestamp for debugging
  console.log(
    `[${new Date().toUTCString()}] ${req.method} ${parsedUrl.pathname}`
  );

  // Implement routing
  if (parsedUrl.pathname === "/") {
    // Root route
    const indexPath = path.join(__dirname, "index.html");
    serveHtmlFile(res, indexPath);
  } else if (parsedUrl.pathname === "/about") {
    // About route
    const aboutPath = path.join(__dirname, "about.html");
    serveHtmlFile(res, aboutPath);
  } else if (parsedUrl.pathname === "/2048") {
    // game route
    const gamePath = path.join(__dirname, "2048.html");
    serveHtmlFile(res, gamePath);
  } else if (parsedUrl.pathname === "/styles.css") {
    // CSS file route
    const stylesPath = path.join(__dirname, "styles.css");
    res.writeHead(200, { "Content-Type": "text/css" });
    fs.createReadStream(stylesPath).pipe(res);
  } else if (parsedUrl.pathname === "/2048.js") {
    // JS file route
    const gamePath = path.join(__dirname, "2048.js");
    res.writeHead(200, { "Content-Type": "application/javascript" });
    fs.createReadStream(gamePath).pipe(res);
  } else {
    // Non-existing route, handle with a 404 status code
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("ERROR 404: Page Not Found.");
  }
};

// Function to serve HTML files
const serveHtmlFile = (res, filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
};

// Create the HTTP server
const server = http.createServer(handleRequest);

// Set the port to listen on
const port = 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
