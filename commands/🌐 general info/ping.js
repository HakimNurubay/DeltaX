const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "ping",
  aliases: [],
  category: "🌐 general info",
  description: "Returns latency and API ping.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      message.channel.send(`🏓 Pinging...`).then((msg) => {
        const ping = msg.createdTimestamp - message.createdTimestamp;
        msg.edit(`Pong!\nBot latency: ${ping}, API Latency: ${client.ws.ping}`);
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
