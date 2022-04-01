const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "buydrink",
  aliases: ["cafe"],
  usage: "<item>/list",
  category: "🌱 economy",
  description: "You must drink if you won't die :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let author = db.fetch(`money_${message.author.id}`);

      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (args[0] == "tea") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 500,000 ${coin} to purchase some Tea`);

        if (author < 500000) return message.channel.send(Embed2);

        db.fetch(`tea_${message.author.id}`);
        db.add(`tea_${message.author.id}`, 4);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Purchased Tea For 500,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 500000);
        message.channel.send(Embed3);
      } else if (args[0] == "milk") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 800,000 ${coin} to purchase some Milk`);

        if (author < 800000) return message.channel.send(Embed2);

        db.fetch(`milk_${message.author.id}`);
        db.add(`milk_${message.author.id}`, 3);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Purchased Milk For 800,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 800000);
        message.channel.send(Embed3);
      } else if (args[0] == "coffee") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1,000,000 ${coin} to purchase some Coffee`);

        if (author < 1000000) return message.channel.send(Embed2);

        db.fetch(`coffee_${message.author.id}`);
        db.add(`coffee_${message.author.id}`, 2);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Purchased Coffee For 1,000,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 1000000);
        message.channel.send(Embed3);
      } else if (args[0] == "wine") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1,200,000 ${coin} to purchase some Wine`);

        if (author < 1200000) return message.channel.send(Embed2);

        db.fetch(`wine_${message.author.id}`);
        db.add(`wine_${message.author.id}`, 2);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Purchased Wine For 1,200,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 1200000);
        message.channel.send(Embed3);
      } else if (args[0] == "list") {
        let list = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("List of all items you have to buy:")
          .addField("Tea:tea:", `Cost: 500,000 ${coin}`)
          .addField("Milk:milk:", `Cost: 800,000 ${coin}`)
          .addField("Coffee:coffee:", `Cost: 1,000,000 ${coin}`)
          .addField("Wine:wine_glass:", `Cost: 1,200,000 ${coin}`);
        message.channel.send(list);
      } else {
        let embed3 = new Discord.MessageEmbed().setColor("FF5757").setTitle(`Enter an item to buy, type ${prefix}buydrink list to show all things`);
        message.channel.send(embed3);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
