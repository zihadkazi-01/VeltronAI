const fs = require("fs");
const path = require("path");

function loadExtensions() {
  const dir = path.join(__dirname, "../extensions");
  let loaded = [];

  if (!fs.existsSync(dir)) return loaded;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (file.endsWith(".js")) {
      const ext = require(path.join(dir, file));
      loaded.push(ext);
    }
  }

  return loaded;
}

module.exports = loadExtensions;
