const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "deposit",
  aliases: [],
  usage: "<amount>/all/max",
  category: "🌱 economy",
  description: "Keep ur coins safe at the bank.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let user = message.author;

      let member = db.fetch(`money_${message.author.id}`);
      let member2 = db.fetch(`bank_${message.author.id}`);

      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (isNaN(args[0])) {
        return message.channel.send({
          embed: {
            color: 16734039,
            description: `You must provide a number to deposit money!`,
          },
        });
      }

      if (args[0] == "all" || args[0] == "max") {
        let money = await db.fetch(`money_${message.author.id}`);
        let bank = await db.fetch(`bank_${message.author.id}`);

        let embedbank = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} You don't have any money to deposit`);

        if (money === 0) return message.channel.send(embedbank);

        db.add(`bank_${message.author.id}`, money);
        db.subtract(`money_${message.author.id}`, money);
        let embed5 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You have deposited all your coins into your bank`);
        message.channel.send(embed5);
      } else {
        let embed2 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} Specify an amount to deposit`);

        if (!args[0]) {
          return message.channel.send(embed2).catch((err) => console.log(err));
        }
        let embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} You can't deposit negative money`);

        if (message.content.includes("-")) {
          return message.channel.send(embed3);
        }
        let embed4 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} You don't have that much money`);

        if (member < args[0]) {
          return message.channel.send(embed4);
        }

        let embed5 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You have deposited ${args[0]} coins into your bank`);

        message.channel.send(embed5);
        db.add(`bank_${message.author.id}`, args[0]);
        db.subtract(`money_${message.author.id}`, args[0]);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
