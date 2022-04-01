const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const Math = require("mathjs");
const ms = require("ms");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "work",
  aliases: [],
  category: "🌱 economy",
  description: "Wanna be the richest? just work babe :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let user = message.author;
      let author = await db.fetch(`work_${message.author.id}`);

      let timeout = 600000;

      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const work = client.emojis.cache.find((x) => x.id === emoji.work);

      if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));

        let timeEmbed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong}  You have already worked recently\n\nTry again in ${time}`);
        message.channel.send(timeEmbed);
      } else {
        let replies = ["Programmer", "Builder", "Waiter", "Busboy", "Chief", "Mechanic"];

        let result = Math.floor(Math.random() * replies.length);
        let amount = Math.floor(Math.random() * 80) + 1;
        let embed1 = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${work} You worked as a ${replies[result]} and earned ${amount} ${coin}`);
        message.channel.send(embed1);

        db.add(`money_${message.author.id}`, amount);
        db.set(`work_${message.author.id}`, Date.now());
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
