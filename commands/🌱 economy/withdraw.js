const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "withdraw",
  aliases: [],
  usage: "<amount>/all",
  category: "🌱 economy",
  description: "This command will withdraw a coins from the bank.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let member2 = db.fetch(`bank_${message.author.id}`);

      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (args[0] == "all") {
        let money = await db.fetch(`bank_${message.author.id}`);

        db.subtract(`bank_${message.author.id}`, money);
        db.add(`money_${message.author.id}`, money);
        let embed5 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`:seedling: You have withdrawn all your coins from your bank`);
        message.channel.send(embed5);
      } else {
        let embed2 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} Specify an amount to withdraw`);

        if (!args[0]) {
          return message.channel.send(embed2);
        }
        let embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} You can't withdraw negative money`);

        if (message.content.includes("-")) {
          return message.channel.send(embed3);
        }
        let embed4 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} You don't have that much money in the bank`);

        if (member2 < args[0]) {
          return message.channel.send(embed4);
        }

        let embed5 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You have withdrawn ${args[0]} coins from your bank`);

        message.channel.send(embed5);
        db.subtract(`bank_${message.author.id}`, args[0]);
        db.add(`money_${message.author.id}`, args[0]);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
