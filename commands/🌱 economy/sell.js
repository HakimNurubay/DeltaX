const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "sell",
  aliases: [],
  usage: "<item>/list",
  category: "🌱 economy",
  description: "You can sell some of ur inventory.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let author_nikes = db.fetch(`nikes_${message.author.id}`);
      let author_car = db.fetch(`car_${message.author.id}`);
      let author_mansion = db.fetch(`mansion_${message.author.id}`);

      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let nikes = db.fetch(`nikes_${message.author.id}`);
      if (nikes === null) nikes = 0;

      let car = db.fetch(`car_${message.author.id}`);
      if (car === null) car = 0;

      let mansion = db.fetch(`mansion_${message.author.id}`);
      if (mansion === null) mansion = 0;

      let Embed = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You don't have enough a Nikes`);

      if (args[0] == "nikes") {
        if (author_nikes < 1) return message.channel.send(Embed);

        db.fetch(`nikes_${message.author.id}`);

        let Embed2 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just sell 1 Nikes for 20,000,000 coins:athletic_shoe:`);

        db.subtract(`nikes_${message.author.id}`, 1);
        db.add(`money_${message.author.id}`, 20000000);
        message.channel.send(Embed2);
      } else if (args[0] == "car") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You don't have enough a Car`);

        if (author_car < 1) return message.channel.send(Embed2);

        db.fetch(`car_${message.author.id}`);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just sell 1 Car for 150,000,000:red_car:`);

        db.subtract(`car_${message.author.id}`, 1);
        db.add(`money_${message.author.id}`, 150000000);
        message.channel.send(Embed3);
      } else if (args[0] == "mansion") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You don't have enough a Mansion`);

        if (author_mansion < 1) return message.channel.send(Embed2);

        db.fetch(`mansion_${message.author.id}`);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just sell 1 Mansion for 250,000,000:house:`);

        db.subtract(`mansion_${message.author.id}`, 1);
        db.add(`money_${message.author.id}`, 250000000);
        message.channel.send(Embed3);
      } else if (args[0] == "list") {
        let list = new Discord.MessageEmbed().setColor("RANDOM").setTitle("List of all option you can drink:").addField("Nikes:athletic_shoe:", `${nikes}`).addField("Car:red_car:", `${car}`).addField("Mansion:house:", `${mansion}`);
        message.channel.send(list);
      } else {
        let embed3 = new Discord.MessageEmbed().setColor("FF5757").setTitle(`Enter an item to eat, type ${prefix}sell list to show all things`);
        message.channel.send(embed3);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
