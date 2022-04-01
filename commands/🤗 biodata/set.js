const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "bio-set",
  aliases: ["set-bio"],
  category: "🤗 biodata",
  description: "This command will set ur Biodata.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      let tosave = args.join(" ");
      if (!args[0]) {
        var errembed = new Discord.MessageEmbed().setDescription(`${wrong} **Failed** ${wrong}`).addField("Error:", `You Didnt Gave me A Bio to Set`);
        return message.channel.send(errembed);
      }
      if (tosave.length > 80) {
        var errembed = new Discord.MessageEmbed().setDescription(`${wrong} **Failed** ${wrong}`).addField("Error:", `Your Bio is Too Long. We dont allow More than 80 Character in Biography`);
        return message.channel.send(errembed);
      }
      db.set(`biography_${message.author.id}`, tosave);

      const aembed = new Discord.MessageEmbed().setDescription(`${check} **Successfull** ${check}`).addField("Bio to Set:", tosave);
      message.channel.send(aembed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
