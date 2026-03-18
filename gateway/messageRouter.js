const processBrain = require("../nucleus/brainCore");
const applyEmotion = require("../nucleus/emotionLayer");
const runCommand = require("../cortex/commandMatrix");

async function routeMessage({ api, event }) {
  const text = event.message?.text || "";

  // command check
  const isCommand = await runCommand({ text, api, event });
  if (isCommand !== false) return;

  // AI reply
  const thought = processBrain(text);
  const reply = applyEmotion(thought);

  return api.sendMessage(reply, event.sender.id);
}

module.exports = routeMessage;
