const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Math = require("mathjs");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "bet",
  aliases: [],
  usage: "<amount>",
  category: "🌱 economy",
  description: "Try this command to bet ur coins.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
      if (!args[0]) return message.reply("Please specify some amount to bet.");

      if (isNaN(args[0])) return message.reply(`You poor you can only bet in numbers | example: \`${prefix} bet 100\`.`);

      if (args[0] <= 90) {
        message.reply("You can't bet amount this much more").then((i) => i.delete({ timeout: 5000 }));
        return;
      }
      if (args[0] >= 21000) {
        message.reply("You can't bet amount this much more").then((i) => i.delete({ timeout: 5000 }));
        return;
      }

      const amountToBet = parseInt(args[0]);

      let bal = db.fetch(`money_${message.author.id}`);

      if (bal === null) {
        bal = 0;
      }

      if (bal < amountToBet) return message.reply("Poor guy spoted! you dont have enough money to bet💩");

      const botrun = Math.floor(Math.random() * 50) + 1;
      const run = Math.floor(Math.random() * 50) + 2;

      const winAmount = amountToBet * 2;
      if (botrun <= run) {
        const embed20 = new MessageEmbed().setDescription(`You won ${winAmount} ${coin} My number was : ${botrun} And your was ${run}`).setColor("RANDOM");
        message.channel.send(embed20);
        db.add(`money_${message.author.id}`, winAmount);
      } else {
        const embed21 = new MessageEmbed().setDescription(`Sad You lost ${amountToBet} ${coin} better luck next time My Number was : ${botrun} and your was ${run}`).setColor("RANDOM");
        message.channel.send(embed21);
        db.subtract(`money_${message.author.id}`, amountToBet);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
