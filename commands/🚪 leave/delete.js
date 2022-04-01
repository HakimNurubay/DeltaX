const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "delete-leave",
  aliases: [],
  category: "🚪 leave",
  description: "This command will delete ur leave logs.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) {
        let WC = db.fetch(`leaveChannel_${message.guild.id}`);
        if (WC == null) {
          message.channel.send("You've not set up the leave logs yet.");
          return;
        }
        message.channel.send(`Successfully deleted leave logs on this guild.`);
        await db.delete(`leaveChannel_${message.guild.id}`);
        await db.delete(`backgroundL_${message.guild.id}`);
        await db.delete(`messageL_${message.guild.id}`);
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
