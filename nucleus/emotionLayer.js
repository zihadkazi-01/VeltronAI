function applyEmotion(data) {
  if (data.mood === "happy") return data.text + " 😄";
  if (data.mood === "support") return data.text + " 🤗";
  if (data.mood === "romantic") return data.text + " 💖";
  return data.text;
}

module.exports = applyEmotion;
