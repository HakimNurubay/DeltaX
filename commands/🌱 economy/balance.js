const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "balance",
  aliases: [],
  category: "🌱 economy",
  description: "This command will check ur balance.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let bal = db.fetch(`money_${message.author.id}`);

      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);

      if (bal === null) bal = 0;

      let bank = await db.fetch(`bank_${message.author.id}`);
      if (bank === null) bank = 0;

      let moneyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setThumbnail(message.author.displayAvatarURL()).setDescription(`**<@${message.author.id}>'s Balance**\n\n${coin} Pocket: ${bal}\n:bank: Bank: ${bank}`);
      message.channel.send(moneyEmbed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
