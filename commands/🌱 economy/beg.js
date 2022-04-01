const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "beg",
  aliases: [],
  category: "🌱 economy",
  description: "You don't have a coins? try this :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let user = message.author;

      let timeout = 180000;
      let amount = 5;

      let beg = await db.fetch(`beg_${message.author.id}`);
      const check = client.emojis.cache.find((x) => x.id === emoji.check);

      if (beg !== null && timeout - (Date.now() - beg) > 0) {
        let time = ms(timeout - (Date.now() - beg));

        let timeEmbed = new Discord.MessageEmbed().setColor(16734039).setDescription(`You've already begged recently\n\nBeg again in ${time}`);
        message.channel.send(timeEmbed);
      } else {
        let moneyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You've begged and received ${amount} coins | poor guy ewww`);
        message.channel.send(moneyEmbed);
        db.add(`money_${message.author.id}`, amount);
        db.set(`beg_${message.author.id}`, Date.now());
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
