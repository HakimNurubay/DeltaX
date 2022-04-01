const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "bio-check",
  aliases: ["check-bio"],
  category: "🤗 biodata",
  description: "To check ur Biodata.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let user = message.mentions.users.first() || client.users.cache.get(args[0]);
      if (args[0]) {
        var checking = db.fetch(`biography_${user.id}`);
      } else {
        var checking = db.fetch(`biography_${message.author.id}`);
      }
      const aembed = new Discord.MessageEmbed().setDescription(":white_check_mark: **Successfull** :white_check_mark:").addField("Bio:", checking);
      message.channel.send(aembed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
