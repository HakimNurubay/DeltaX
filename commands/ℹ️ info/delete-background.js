const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "remove-rank-background",
  aliases: [],
  category: "ℹ️ info",
  description: "This command will set ur Rank Card background",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) {
        let RC = db.fetch(`backgroundR_${message.author.id}+${message.guild.id}`);
        if (RC == null) {
          message.channel.send("You've not set up the Rank Card background yet.");
          return;
        }
        message.channel.send(`Successfully set the Rank Card background.`);
        await db.delete(`backgroundR_${message.author.id}+${message.guild.id}`);
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
