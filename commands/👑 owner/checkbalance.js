const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "checkbalance",
  aliases: [],
  category: "👑 owner",
  description: "",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.author.id == owner) {
        let user = message.mentions.members.first() || message.author;

        const coin = client.emojis.cache.find((x) => x.id === emoji.coin);

        let bal = db.fetch(`money_${user.id}`);

        if (bal === null) bal = 0;

        let bank = await db.fetch(`bank_${user.id}`);
        if (bank === null) bank = 0;

        let moneyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setThumbnail(user.user.displayAvatarURL()).setDescription(`**${user}'s Balance**\n\n${coin} Pocket: ${bal}\n:bank: Bank: ${bank}`);
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
