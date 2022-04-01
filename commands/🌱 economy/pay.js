const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "pay",
  aliases: [],
  usage: "<mention> <amount>",
  category: "🌱 economy",
  description: "This is will give a coins to some one you have tagged.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let user = message.mentions.members.first();

      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let member = db.fetch(`money_${message.author.id}`);

      let embed1 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} Mention someone to pay`);

      if (!user) {
        return message.channel.send(embed1);
      }
      let embed2 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} Specify an amount to pay`);

      if (!args[1]) {
        return message.channel.send(embed2);
      }

      if (isNaN(args[1]))
        return message.channel.send({
          embed: {
            color: 16734039,
            description: "You must enter the amount of money to pay!",
          },
        });

      if (args[0] <= 100) {
        message.reply("You cant pay amount this much more");
        return;
      }
      if (args[0] >= 21000) {
        message.reply("You cant pay amount this much more");
        return;
      }

      let embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} You can't pay someone negative money`);

      if (message.content.includes("-")) {
        return message.channel.send(embed3);
      }
      let embed4 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} You don't have that much money`);

      if (member < args[1]) {
        return message.channel.send(embed4);
      }

      let embed5 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You have payed ${user.user.username} ${args[1]} coins`);

      message.channel.send(embed5);
      db.add(`money_${user.id}`, args[1]);
      db.subtract(`money_${message.author.id}`, args[1]);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
