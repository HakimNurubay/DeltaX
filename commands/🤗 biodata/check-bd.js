const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "check-birthday",
  aliases: ["check-bd"],
  category: "🤗 biodata",
  description: "This command will check Birthdate.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
      if (args[0]) {
        var checking = db.fetch(`birthdate_${user.id}`);
      } else {
        var checking = db.fetch(`birthdate_${message.author.id}`);
      }
      if (!checking) return message.channel.send(`${user} has not set his birthday yet!`);
      message.channel.send(`${user}'s birthday is on ${checking} !`);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
