const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "drink",
  aliases: [],
  usage: "<item>/list",
  category: "🌱 economy",
  description: "I think ur feel thirsty :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let author_tea = db.fetch(`tea_${message.author.id}`);
      let author_milk = db.fetch(`milk_${message.author.id}`);
      let author_coffee = db.fetch(`coffee_${message.author.id}`);
      let author_wine = db.fetch(`wine_${message.author.id}`);

      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let tea = db.fetch(`tea_${message.author.id}`);
      if (tea === null) tea = 0;

      let milk = db.fetch(`milk_${message.author.id}`);
      if (milk === null) milk = 0;

      let coffee = db.fetch(`coffee_${message.author.id}`);
      if (coffee === null) coffee = 0;

      let wine = db.fetch(`wine_${message.author.id}`);
      if (wine === null) wine = 0;

      let Embed = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1 Tea to drink it`);

      if (args[0] == "tea") {
        if (author_tea < 1) return message.channel.send(Embed);

        db.fetch(`tea_${message.author.id}`);

        let Embed2 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just drink 1 glass of Tea:tea:`);

        db.subtract(`tea_${message.author.id}`, 1);
        message.channel.send(Embed2);
      } else if (args[0] == "milk") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1 Milk to drink it`);

        if (author_milk < 1) return message.channel.send(Embed2);

        db.fetch(`milk_${message.author.id}`);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just drink 1 glass of Milk:milk:`);

        db.subtract(`milk_${message.author.id}`, 1);
        message.channel.send(Embed3);
      } else if (args[0] == "coffee") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1 Coffee to drink it`);

        if (author_coffee < 1) return message.channel.send(Embed2);

        db.fetch(`coffee_${message.author.id}`);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just drink 1 glass of Coffee:coffee:`);

        db.subtract(`coffee_${message.author.id}`, 1);
        message.channel.send(Embed3);
      } else if (args[0] == "wine") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 1 Wine to drink it`);

        if (author_wine < 1) return message.channel.send(Embed2);

        db.fetch(`wine_${message.author.id}`);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You just drink 1 glass of Wine:wine_glass:`);

        db.subtract(`wine_${message.author.id}`, 1);
        message.channel.send(Embed3);
      } else if (args[0] == "list") {
        let list = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("List of all option you can drink:")
          .addField("Tea:tea:", `${tea}`)
          .addField("Milk:milk:", `${milk}`)
          .addField("Coffee:coffee:", `${coffee}`)
          .addField("Wine:wine:", `${wine}`);
        message.channel.send(list);
      } else {
        let embed3 = new Discord.MessageEmbed().setColor("FF5757").setTitle(`Enter an item to eat, type ${prefix}drink list to show all things`);
        message.channel.send(embed3);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
