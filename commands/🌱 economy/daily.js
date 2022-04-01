const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "daily",
  aliases: [],
  category: "🌱 economy",
  description: "This command will give you a daily opportunities :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let timeout = 86400000;
      let amount = 200;

      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let daily = await db.fetch(`daily_${message.author.id}`);

      if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        let timeEmbed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${wrong} You've already collected your daily reward\n\nCollect it again in ${time}`);
        message.channel.send(timeEmbed);
      } else {
        let moneyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You've collected your daily reward of ${amount} ${coin}`);
        message.channel.send(moneyEmbed);
        db.add(`money_${message.author.id}`, amount);
        db.set(`daily_${message.author.id}`, Date.now());
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
