const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "eat",
  aliases: [],
  usage: "<item>/list",
  category: "🌱 economy",
  description: "Wanna eat something? :)",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let author_chocolate = db.fetch(`chocolate_${message.author.id}`);
      let author_banana = db.fetch(`bananas_${message.author.id}`);
      let author_pizza = db.fetch(`pizza_${message.author.id}`);
      let author_drug = db.fetch(`drugs_${message.author.id}`);
      let author_cannabis = db.fetch(`cannabis_${message.author.id}`);

      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let drug = db.fetch(`drugs_${message.author.id}`);
      if (drug === null) drug = 0;

      let cannabis = db.fetch(`cannabis_${message.author.id}`);
      if (cannabis === null) cannabis = 0;

      let banana = db.fetch(`bananas_${message.author.id}`);
      if (banana === null) banana = 0;

      let chocolate = db.fetch(`chocolate_${message.author.id}`);
      if (chocolate === null) chocolate = 0;

      let pizza = await db.fetch(`pizza_${message.author.id}`);
      if (pizza === null) pizza = 0;

      let Embed = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1 Chocolate to eat it`);

      if (args[0] == "chocolate") {
        if (author_chocolate < 1) return message.channel.send(Embed);

        db.fetch(`chocolate_${message.author.id}`);

        let Embed2 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just eat 1 Chocolate:chocolate_bar:`);

        db.subtract(`chocolate_${message.author.id}`, 1);
        message.channel.send(Embed2);
      } else if (args[0] == "banana") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1 Banana to eat it`);

        if (author_banana < 1) return message.channel.send(Embed2);

        db.fetch(`bananas_${message.author.id}`);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just eat 1 Banana:banana:`);

        db.subtract(`bananas_${message.author.id}`, 1);
        message.channel.send(Embed3);
      } else if (args[0] == "pizza") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1 Pizza to eat it`);

        if (author_pizza < 1) return message.channel.send(Embed2);

        db.fetch(`pizza_${message.author.id}`);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just eat 1 Pizza:pizza:`);

        db.subtract(`pizza_${message.author.id}`, 1);
        message.channel.send(Embed3);
      } else if (args[0] == "drug") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1 Drug to eat it`);

        if (author_drug < 1) return message.channel.send(Embed2);

        db.fetch(`drugs_${message.author.id}`);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just eat 1 Drug:pill:`);

        db.subtract(`drugs_${message.author.id}`, 1);
        message.channel.send(Embed3);
      } else if (args[0] == "cannabis") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1 Cannabis to eat it`);

        if (author_cannabis < 1) return message.channel.send(Embed2);

        db.fetch(`cannabis_${message.author.id}`);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just eat 1 Cannabis:shamrock:`);

        db.subtract(`cannabis_${message.author.id}`, 1);
        message.channel.send(Embed3);
      } else if (args[0] == "list") {
        let list = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("List of all option you can eat:")
          .addField("Chocolate:chocolate_bar:", `${chocolate}`)
          .addField("Banana:banana:", `${banana}`)
          .addField("Pizza:pizza:", `${pizza}`)
          .addField("Drug:pill:", `${drug}`)
          .addField("Cannabis:shamrock:", `${cannabis}`);
        message.channel.send(list);
      } else {
        let embed3 = new Discord.MessageEmbed().setColor("FF5757").setTitle(`Enter an item to eat, type ${prefix}eat list to show all things`);
        message.channel.send(embed3);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
