const fs = require("fs");
const path = "./memory/userMemory.json";

function saveMemory(user, msg) {
  let data = {};

  if (fs.existsSync(path)) {
    data = JSON.parse(fs.readFileSync(path));
  }

  if (!data[user]) data[user] = [];

  data[user].push(msg);

  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function getMemory(user) {
  if (!fs.existsSync(path)) return [];

  const data = JSON.parse(fs.readFileSync(path));
  return data[user] || [];
}

module.exports = { saveMemory, getMemory };
