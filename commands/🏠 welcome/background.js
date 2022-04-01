const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "set-welcome-background",
  aliases: [],
  usage: "<link .png/.jpg/.jpeg>",
  category: "🏠 welcome",
  description: "This command will set ur welcome logs background.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) {
        let background = args[0];
        if (!background) return message.channel.send("Plz provide the background link.");
        message.channel.send(`Successfully set the welcome background.`);
        await db.set(`backgroundW_${message.guild.id}`, args[0]);
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
