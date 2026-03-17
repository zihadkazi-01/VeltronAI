const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

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

  if (!event?.message?.text) return res.sendStatus(200);

  const sender = event.sender.id;
  const text = event.message.text;

  let reply = "হুম 🤔 বুঝতে পারছি না...";

  if (text.toLowerCase().includes("hi"))
    reply = "Hey 😊 আমি VeltronAI!";
  else if (text.toLowerCase().includes("name"))
    reply = "আমার নাম VeltronAI 🤖";
  else if (text.toLowerCase().includes("author"))
    reply = "আমার Author ZihadKazi 👑";

  await axios.post(
    `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_TOKEN}`,
    {
      recipient: { id: sender },
      message: { text: reply }
    }
  );

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("VeltronAI Running 🚀");
});
