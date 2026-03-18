const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const routeMessage = require("./gateway/messageRouter");

const app = express();
app.use(bodyParser.json());

const PAGE_TOKEN = process.env.PAGE_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "veltron_secure";

// Verify webhook
app.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === VERIFY_TOKEN) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(403);
  }
});

// Receive message
app.post("/webhook", async (req, res) => {
  const event = req.body.entry?.[0]?.messaging?.[0];

  if (!event?.message) return res.sendStatus(200);

  const api = {
    sendMessage: async (msg, id) => {
      await axios.post(
        `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_TOKEN}`,
        {
          recipient: { id },
          message: { text: msg }
        }
      );
    }
  };

  await routeMessage({ api, event });

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("VeltronAI System Online 🚀");
});
