const processBrain = require("../nucleus/brainCore");
const applyEmotion = require("../nucleus/emotionLayer");
const runCommand = require("../cortex/commandMatrix");

const { saveMemory, getMemory } = require("../memory/recallEngine");
const isAdmin = require("../security/accessControl");
const checkSpam = require("../security/antiSpam");

async function routeMessage({ api, event }) {
  const user = event.sender.id;
  const text = event.message?.text || "";

  // Anti spam
  if (checkSpam(user)) {
    return api.sendMessage("⚠️ Slow down! Too many messages.", user);
  }

  // Save memory
  saveMemory(user, text);
  const memory = getMemory(user);

  // Command system
  const isCmd = await runCommand({ text, api, event });
  if (isCmd !== false) return;

  // AI brain
  const thought = processBrain(text, memory);
  const reply = applyEmotion(thought);

  return api.sendMessage(reply, user);
}

module.exports = routeMessage;
