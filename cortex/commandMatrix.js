const loadExtensions = require("./extensionLoader");

async function runCommand({ text, api, event }) {
  const extensions = loadExtensions();

  for (const ext of extensions) {
    if (!ext.trigger) continue;

    if (text.startsWith(ext.trigger)) {
      return ext.run({ api, event, args: text.split(" ").slice(1) });
    }
  }

  return false;
}

module.exports = runCommand;
