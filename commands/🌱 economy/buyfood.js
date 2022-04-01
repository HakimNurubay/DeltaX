const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "buyfood",
  aliases: ["restaurant"],
  usage: "<item>/list",
  category: "🌱 economy",
  description: "Wanna buy food budd? :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let author = db.fetch(`money_${message.author.id}`);

      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (args[0] == "banana") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 500,000 ${coin} to purchase some Bananas`);

        if (author < 500000) return message.channel.send(Embed2);

        db.fetch(`bananas_${message.author.id}`);
        db.add(`bananas_${message.author.id}`, 10);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Purchased Bananas For 500,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 500000);
        message.channel.send(Embed3);
      } else if (args[0] == "chocolate") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 800,000 ${coin} to purchase some Chocolate`);

        if (author < 800000) return message.channel.send(Embed2);

        db.fetch(`chocolate_${message.author.id}`);
        db.add(`chocolate_${message.author.id}`, 4);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Purchased Chocolate For 800,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 800000);
        message.channel.send(Embed3);
      } else if (args[0] == "pizza") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1,000,000 ${coin} to purchase some Pizza`);

        if (author < 1000000) return message.channel.send(Embed2);

        db.fetch(`pizza_${message.author.id}`);
        db.add(`pizza_${message.author.id}`, 2);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Purchased Bananas For 1,000,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 1000000);
        message.channel.send(Embed3);
      } else if (args[0] == "list") {
        let list = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("List of all items you have to buy:")
          .addField("Banana:banana:", `Cost: 500,000 ${coin}`)
          .addField("Chocolate:chocolate_bar:", `Cost: 800,000 ${coin}`)
          .addField("Pizza:pizza:", `Cost: 1,000,000 ${coin}`);
        message.channel.send(list);
      } else {
        let embed3 = new Discord.MessageEmbed().setColor("FF5757").setTitle(`Enter an item to buy, type ${prefix}buyfood list to show all things`);
        message.channel.send(embed3);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
