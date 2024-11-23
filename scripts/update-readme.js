const fs = require("fs");
const path = require("path");

// Read the generated API documentation
const apiDocsPath = path.join(__dirname, "../docs/README.md");
const apiDocs = fs.readFileSync(apiDocsPath, "utf8");

// Read the current README
const readmePath = path.join(__dirname, "../README.md");
const readme = fs.readFileSync(readmePath, "utf8");

// Define markers in your README where the API docs should be inserted
const startMarker = "<!-- API_DOCS_START -->";
const endMarker = "<!-- API_DOCS_END -->";

// Create the new README content
const newReadme = readme.replace(
  new RegExp(`${startMarker}[\\s\\S]*${endMarker}`),
  `${startMarker}\n${apiDocs}\n${endMarker}`
);

// Write the new README
fs.writeFileSync(readmePath, newReadme);

console.log("✅ README.md updated");
