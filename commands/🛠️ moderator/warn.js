const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "warn",
  aliases: [],
  category: "🛠️ moderator",
  usage: "<user> <reason>",
  description: "Warn a user along with storing the total warns.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const warn = client.emojis.cache.find((x) => x.id === emoji.warn);
      try {
        if (message.member.hasPermission("ADMINISTRATOR")) {
          const target = message.mentions.users.first();
          if (!target) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You didn't mention the user to warn**`).setColor("#F04A47");
            message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
            return;
          }

          if (target.bot) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You cannot warn a bot**`).setColor("#F04A47");
            message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
            return;
          }

          if (target.id === message.author.id) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You cannot warn ur self**`).setColor("#F04A47");
            message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
            return;
          }

          if (message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) < 1) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You're role is too low**`).setColor("#F04A47");
            message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
            return;
          }

          let reason = args.slice(1).join(" ");
          if (!reason) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Plz provide the reason**`).setColor("#F04A47");
            message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
            return;
          }
          db.add(`warns_${target.id}+${message.guild.id}`, 1);
          let x = db.fetch(`warns_${target.id}+${message.guild.id}`);
          const embed = new Discord.MessageEmbed().setDescription(`${check} **${target.username}** has been warned with **${x}** now`).setColor("#43B581");
          await message.channel.send(embed);

          let embed2 = new Discord.MessageEmbed().setDescription(`${warn} You have been warned in **${message.guild.name}** by **${message.author.username}**\nReason: ${reason}`).setColor("#FFFF00");
          target.send(embed2).catch((e) => {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} I can't send message to that user**`).setColor("#F04A47");
            return message.channel.send(embed);
          });
        } else {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
          message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
        message.channel.send("An unknown error occured.").then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
