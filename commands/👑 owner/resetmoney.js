const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "resetmoney",
  aliases: [],
  category: "👑 owner",
  description: "",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.author.id == owner) {
        let user = message.mentions.members.first();

        const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
        const check = client.emojis.cache.find((x) => x.id === emoji.check);
        const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

        if (!user)
          return message.channel.send({
            embed: {
              color: 16734039,
              description: "You must mention someone to reset money!",
            },
          });

        db.set(`money_${user.id}`, 0);
        db.set(`bank_${user.id}`, 0);
        let bal = await db.fetch(`money_${user.id}`);
        let bank = await db.fetch(`bank_${user.id}`);

        let moneyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${check} Successfully resetted coins from <@${user.id}>\n\nNew Balance: ${bal} ${coin}\nNew Bank: ${bank} :bank:`);
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
