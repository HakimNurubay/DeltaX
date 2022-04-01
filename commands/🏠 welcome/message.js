const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "set-welcome-message",
  aliases: [],
  usage: "<message>",
  category: "🏠 welcome",
  description: "This command will set ur welcome message logs.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) {
        let messages = args.join(" ");
        if (messages.length > 30) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Max message is 30 characters\nU just input ${messages.length} characters, try to make it shorter**`).setColor("RED");
          message.channel.send(embed);
          return;
        }
        if (!messages) return message.channel.send("Plz provide the messages.");
        const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully to set the welcome message**`).setColor("GREEN");
        message.channel.send(embed);
        await db.set(`messageW_${message.guild.id}`, messages);
      } else {
        message.reply("You don't have premission to use that command.").then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
