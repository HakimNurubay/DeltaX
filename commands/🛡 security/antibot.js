const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "antibot",
  aliases: [],
  usage: "enable/disable",
  category: "🛡 security",
  description: "This command will turn on/off anti-bot.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        var wchannel = args[0];
        if (!wchannel) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You didn't give me an option enable/disable**`).setColor("RED");
          return message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
        }
        if (wchannel == "enable") {
          let antialt1 = db.fetch(`antibot_${message.guild.id}`);
          if (antialt1 == "enable") {
            const onembed = new Discord.MessageEmbed().setDescription(`**${wrong} You have already turned on the Anti-bot**`).setColor("RED");
            message.channel.send(onembed);
            return;
          }
          db.set(`antibot_${message.guild.id}`, wchannel);
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Anti-bot has been enabled**`).setColor("GREEN");
          message.channel.send(embed);
          return;
        } else if (wchannel == "disable") {
          let antialt1 = db.fetch(`antibot_${message.guild.id}`);
          if (antialt1 == null) {
            const offembed = new Discord.MessageEmbed().setDescription(`**${wrong} You have already turned off the Anti-bot**`).setColor("RED");
            message.channel.send(offembed);
            return;
          }
          db.delete(`antibot_${message.guild.id}`);
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Anti-bot has been disabled**`).setColor("GREEN");
          message.channel.send(embed);
          return;
        } else {
          return message.reply("You didnt enter enable or disable").then((i) => i.delete({ timeout: 5000 }));
        }
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
