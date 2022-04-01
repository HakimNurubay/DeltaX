const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const bar = require("../../plugins/bar.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "bar",
  aliases: [],
  category: "🛠️ moderator",
  description: "",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const success = client.emojis.cache.find((x) => x.id === emoji.check);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        let select1 = bar.type1;
        let select2 = bar.type2;

        const { guild } = message;

        if (args[0] == "1") {
          let embed = new MessageEmbed().setDescription(`**${success} Success set the bar to TYPE1**`).setColor("RANDOM");
          db.set(`barStyle_${guild.id}`, select1);
          return message.channel.send(embed);
        } else if (args[0] == "2") {
          let embed = new MessageEmbed().setDescription(`**${success} Success set the bar to TYPE2**`).setColor("RANDOM");
          db.set(`barStyle_${guild.id}`, select2);
          return message.channel.send(embed);
        } else if (args[0] == "default") {
          let embed = new MessageEmbed().setDescription(`**${success} Success set the bar to DEFAULT**`).setColor("RANDOM");
          db.delete(`barStyle_${guild.id}`);
          return message.channel.send(embed);
        } else {
          let embed = new MessageEmbed().setDescription(`**${wrong} Please choose the type ${prefix}bar 1 - 2**`).setColor("RED");
          return message.channel.send(embed);
        }
      } else {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
