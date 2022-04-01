const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "verify",
  aliases: [],
  category: "🌐 general info",
  description: "This command will verify the member, ask moderator to set it up.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      const embed = new Discord.MessageEmbed().setDescription(`**${wrong} This guild is not set the verify yet, ask the moderator to set it up**`).setColor("RED");

      let ch = db.fetch(`verifc_${message.guild.id}`);
      if (!ch) {
        return message.channel.send(embed);
      }
      let role = db.fetch(`verifr_${message.guild.id}`);
      if (!role) {
        return message.channel.send(embed);
      }
      var roled = message.guild.roles.cache.get(`${role}`);
      if (message.channel.id == ch) {
        message.member.roles.add(roled);
        const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully to verify on ${message.guild.name}**`).setColor("GREEN");
        return message.channel.send(embed);
      } else {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} U must on verify channel to verify ur self\nThe verify channel on this guild is <#${ch}>**`).setColor("RED");
        return message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
