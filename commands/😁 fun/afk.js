const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "afk",
  aliases: [],
  category: "😁 fun",
  description: "This command will set you to afk.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const content = args.join(" ");
      await db.set(`afk-${message.author.id}+${message.guild.id}`, content);
      message.channel.send(`You are now set to afk.\nReason: ${content}`);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
