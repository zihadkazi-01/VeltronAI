module.exports = {
  trigger: "!ping",

  run: async ({ api, event }) => {
    return api.sendMessage("🏓 Pong! VeltronAI working!", event.sender.id);
  }
};
