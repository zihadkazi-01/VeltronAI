const isAdmin = require("../security/accessControl");

module.exports = {
  trigger: "!admin",

  run: async ({ api, event }) => {
    if (!isAdmin(event.sender.id)) {
      return api.sendMessage("❌ তুমি Admin না!", event.sender.id);
    }

    return api.sendMessage("👑 Welcome Admin!", event.sender.id);
  }
};
