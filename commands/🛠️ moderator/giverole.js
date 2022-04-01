const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "giverole",
  aliases: [],
  category: "🛠️ moderator",
  description: "This command will give a specified role to someone.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) {
        const target = message.mentions.members.first();
        if (!target) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You didn't mention the user to give the role**`).setColor("#F04A47");
          message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
          return;
        }
        const role = message.mentions.roles.first();
        if (!role) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Plz tag a valid role**`).setColor("#F04A47");
          message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
          return;
        }
        if (message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) < 1) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You're role is too low**`).setColor("#F04A47");
          message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
          return;
        }
        await target.roles.add(role);
        const embed = new Discord.MessageEmbed().setDescription(`**${check} ${target.user.tag} has been given a role**`).setColor("#43B581");
        message.channel.send(embed);
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
