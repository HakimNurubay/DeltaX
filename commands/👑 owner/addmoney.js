const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "addmoney",
  aliases: [],
  category: "👑 owner",
  description: "",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.author.id == owner) {
        let user = message.mentions.members.first();

        if (!user)
          return message.channel.send({
            embed: {
              color: 16734039,
              description: "You must mention someone to add money!",
            },
          });
        if (isNaN(args[1]))
          return message.channel.send({
            embed: {
              color: 16734039,
              description: "You must enter the amount of money to add!",
            },
          });
        if (args[0] >= 20000) {
          message.reply("You cant add amount this much more");
          return;
        }

        db.add(`money_${user.id}`, args[1]);
        let bal = await db.fetch(`money_${user.id}`);

        const check = client.emojis.cache.find((x) => x.id === emoji.check);

        let moneyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Added ${args[1]} coins\nNew Balance: ${bal}`);
        message.channel.send(moneyEmbed);
      } else {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
