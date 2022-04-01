const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "delete-welcome-message",
  aliases: [],
  category: "🏠 welcome",
  description: "This command will delete ur welcome message logs.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) {
        let WC = db.fetch(`messageW_${message.guild.id}`);
        if (WC == null) {
          message.channel.send("You've not set up the welcome message logs yet.");
          return;
        }
        message.channel.send(`Successfully deleted welcome message logs on this guild.`);
        await db.delete(`messageW_${message.guild.id}`);
      } else {
        message.reply("You don't have premission to use that command.").then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
