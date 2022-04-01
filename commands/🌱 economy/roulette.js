const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const Math = require("mathjs");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "roulette",
  aliases: [],
  usage: "<color> <amount>",
  category: "🌱 economy",
  description: "Wanna play a card babe? :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
      function isOdd(num) {
        if (num % 2 == 0) return false;
        else if (num % 2 == 1) return true;
      }

      if (args[0] <= 90) {
        message.reply("You can't bet amount this much more").then((i) => i.delete({ timeout: 5000 }));
        return;
      }
      if (args[0] >= 51000) {
        message.reply("You can't bet amount this much more").then((i) => i.delete({ timeout: 5000 }));
        return;
      }

      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let colour = args[0];
      let money = parseInt(args[1]);
      let moneydb = await db.fetch(`money_${message.author.id}`);

      let random = Math.floor(Math.random() * 37);

      let moneyhelp = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} Specify an amount to gamble | ${prefix}roulette <color> <amount>`);

      let moneymore = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You are betting more than you have`);

      let colorbad = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} Specify a color | Red [1.5x] Black [2x] Green [15x]`);

      if (!colour) return message.channel.send(colorbad);
      colour = colour.toLowerCase();
      if (!money) return message.channel.send(moneyhelp);
      if (money > moneydb) return message.channel.send(moneymore);

      if (colour == "b" || colour.includes("black")) colour = 0;
      else if (colour == "r" || colour.includes("red")) colour = 1;
      else if (colour == "g" || colour.includes("green")) colour = 2;
      else return message.channel.send(colorbad);

      if (random == 0 && colour == 2) {
        // Green
        money *= 15;
        db.add(`money_${message.author.id}`, money);
        let moneyEmbed1 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`:tada: You won ${money} ${coin} :tada:`).setFooter(`Multiplier: 15x | Color: Green`);
        message.channel.send(moneyEmbed1);
      } else if (isOdd(random) && colour == 1) {
        // Red
        money = parseInt(money * 1.5);
        db.add(`money_${message.author.id}`, money);
        let moneyEmbed2 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`:tada: You won ${money} ${coin} :tada:`).setFooter(`Multiplier: 1.5x | Color: Red`);
        message.channel.send(moneyEmbed2);
      } else if (!isOdd(random) && colour == 0) {
        // Black
        money = parseInt(money * 2);
        db.add(`money_${message.author.id}`, money);
        let moneyEmbed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`:tada: You won ${money} ${coin} :tada:`).setFooter(`Multiplier: 2x | Color: Black`);
        message.channel.send(moneyEmbed3);
      } else {
        // Wrong
        db.subtract(`money_${message.author.id}`, money);
        let moneyEmbed4 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You lost ${money} ${coin}`).setFooter(`Multiplier: 0x | :/`);
        message.channel.send(moneyEmbed4);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
