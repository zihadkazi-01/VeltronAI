function processBrain(input, memory) {
  const msg = input.toLowerCase();

  if (msg.includes("hi")) return { mood: "happy", text: "Hey 😊 আবার আসছো?" };
  if (msg.includes("name")) return { mood: "neutral", text: "আমি VeltronAI 🤖" };

  if (memory.length > 5) {
    return {
      mood: "smart",
      text: "তুমি আগেও অনেক কিছু বলেছো 😎 আমি মনে রাখছি..."
    };
  }

  return { mood: "neutral", text: "হুম 🤔 বলো শুনছি..." };
}

module.exports = processBrain;
