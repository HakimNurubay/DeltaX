const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "monthly",
  aliases: [],
  category: "🌱 economy",
  description: "This command will give you a monthly opportunities :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let timeout = 2592000000;
      let amount = 2000;

      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let monthly = await db.fetch(`monthly_${message.author.id}`);

      if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
        let time = ms(timeout - (Date.now() - monthly));

        let timeEmbed = new Discord.MessageEmbed().setColor(16734039).setDescription(`${wrong} You have already collected your monthly reward\n\nCollect it again in ${time}`);
        message.channel.send(timeEmbed);
      } else {
        let moneyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} You've collected your monthly reward of ${amount} ${coin}`);
        message.channel.send(moneyEmbed);
        db.add(`money_${message.author.id}`, amount);
        db.set(`monthly_${message.author.id}`, Date.now());
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
