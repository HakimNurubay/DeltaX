const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "blackmarket",
  aliases: ["bm"],
  usage: "<item>/list",
  category: "🌱 economy",
  description: "Ayooo caught on 4K :camera_with_flash:",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let user = message.author;
      let author = db.fetch(`money_${message.author.id}`);

      if (args[0] == "drug") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 3,000,000 ${coin} to purchase some Drugs`);

        if (author < 3000000) return message.channel.send(Embed2);

        db.fetch(`drugs_${message.author.id}`);
        db.add(`drugs_${message.author.id}`, 80);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check}  Purchased Drugs for 3,000,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 3000000);
        message.channel.send(Embed3);
      } else if (args[0] == "cannabis") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 5,000,000 ${coin} to purchase some Cannabis`);

        if (author < 5000000) return message.channel.send(Embed2);

        db.fetch(`cannabis_${message.author.id}`);
        db.add(`cannabis_${message.author.id}`, 50);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check}  Purchased Cannabis For 5,000,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 5000000);
        message.channel.send(Embed3);
      } else if (args[0] == "gun") {
        let Embed2 = new Discord.MessageEmbed().setColor("FF5757").setDescription(`${wrong} You need 4,500,000 ${coin} to purchase some Guns`);

        if (author < 4500000) return message.channel.send(Embed2);

        db.fetch(`guns_${message.author.id}`);
        db.add(`guns_${message.author.id}`, 50);

        let Embed3 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Purchased Guns For 400,000 ${coin}`);

        db.subtract(`money_${message.author.id}`, 4500000);
        message.channel.send(Embed3);
      } else if (args[0] == "list") {
        let list = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("List of all items you have to buy:")
          .addField("Drugs:pill:", `Cost: 3,000,000 ${coin}`)
          .addField("Cannabis:shamrock:", `Cost: 5,000,000 ${coin}`)
          .addField("Gun:gun:", `Cost: 4,500,000 ${coin}`);
        message.channel.send(list);
      } else {
        let embed3 = new Discord.MessageEmbed().setColor("FF5757").setTitle(`Enter an item to buy, type ${prefix}blackmarket list to show all things`);
        message.channel.send(embed3);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
