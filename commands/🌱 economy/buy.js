const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "buy",
  aliases: ["shop", "grocery"],
  usage: "<item>/list",
  category: "🌱 economy",
  description: "Wanna buy something? :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let user = message.author;
      let userpremiumdata = {
        userid: message.guild.id,
        premiumer: message.author.id,
        premiumcode: "yes",
      };
      let alreadypremium = new Discord.MessageEmbed().setTitle(`You're Already an premium user`);
      let checking = db.get(`premium`);
      let author = db.fetch(`money_${message.author.id}`);

      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let Embed = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 10,000,000 ${coin} to purchase Bronze VIP`);

      if (args[0] == "bronze") {
        if (author < 1000000) return message.channel.send(Embed);

        db.fetch(`bronze_${message.author.id}`);
        db.set(`bronze_${message.author.id}`, true);

        let Embed2 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Purchased Bronze VIP For 1,000,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 1000000);
        message.channel.send(Embed2);
      } else if (args[0] == "nikes") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 4,000,000 ${coin} to purchase some Nikes`);

        if (author < 4000000) return message.channel.send(Embed2);

        db.fetch(`nikes_${message.author.id}`);
        db.add(`nikes_${message.author.id}`, 1);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check}  Purchased Fresh Nikes For 40,000,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 4000000);
        message.channel.send(Embed3);
      } else if (args[0] == "car") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 20,000,000 ${coin} to purchase a new car you poor guy, do beg to earn some coins`);

        if (author < 20000000) return message.channel.send(Embed2);

        db.fetch(`car_${message.author.id}`);
        db.add(`car_${message.author.id}`, 1);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check}  Purchased a New Car For 20,000,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 20000000);
        message.channel.send(Embed3);
      } else if (args[0] == "mansion") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 50,000,000 ${coin} to purchase a Mansion`);

        if (author < 50000000) return message.channel.send(Embed2);

        db.fetch(`house_${message.author.id}`);
        db.add(`house_${message.author.id}`, 1);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Purchased a Mansion For 500,000,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 50000000);
        message.channel.send(Embed3);
      } else if (args[0] == "list") {
        let list = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("List of all items you have to buy:")
          .addField("Bronze:third_place:", `Cost: 1,000,000 ${coin}`)
          .addField("Nikes:athletic_shoe:", `Cost: 4,000,000 ${coin}`)
          .addField("Car:red_car:", `Cost: 20,000,000 ${coin}`)
          .addField("Mansion:house:", `Cost: 50,000,000 ${coin}`);
        message.channel.send(list);
      } else {
        let embed3 = new Discord.MessageEmbed().setColor("FF5757").setTitle(`Enter an item to buy, type ${prefix}buy list to show all things`);
        message.channel.send(embed3);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
