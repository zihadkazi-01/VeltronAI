function processBrain(input) {
  const msg = input.toLowerCase();

  if (msg.includes("hi")) return { mood: "happy", text: "Hey 😊 আমি VeltronAI!" };
  if (msg.includes("sad")) return { mood: "support", text: "মন খারাপ করো না 💙" };
  if (msg.includes("love")) return { mood: "romantic", text: "ভালোবাসা সুন্দর ❤️" };

  return { mood: "neutral", text: "হুম 🤔 বুঝতে পারছি না..." };
}

module.exports = processBrain;
