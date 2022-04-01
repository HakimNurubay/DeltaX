const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "autorole",
  aliases: [],
  usage: "<mention>/disable",
  category: "🚀 automod",
  description: "This command will set or turn off autorole feature",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (message.content.includes("@everyone")) {
          return message.reply("Everyone is already automatically given by discord");
        }

        if (!args[0]) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You didn't gave me the role to be autorole**`).setColor("RED");
          return message.channel.send(embed);
        }

        if (args[0] == "disable" || args[0] == "off") {
          let autorole = db.fetch(`autorole_${message.guild.id}`);
          if (autorole == null) {
            const onembed = new Discord.MessageEmbed().setDescription(`${wrong} **You are not set the autorole yet, try to ${prefix}autorole <mention>**`).setColor("RED");
            message.channel.send(onembed);
            return;
          }
          db.delete(`autorole_${message.guild.id}`);
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully to disable the autorole on this server**`).setColor("GREEN");
          return message.channel.send(embed);
        } else {
          var role1 = message.mentions.roles.first().id;
          if (!role1) {
            var role1 = args[0];
          }
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully to set autorole on this server\n<@&${role1}>**`).setColor("GREEN");
          message.channel.send(embed);
          db.set(`autorole_${message.guild.id}`, role1);
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
