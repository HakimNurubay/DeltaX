const Discord = require("discord.js");
const ms = require("ms");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "mute",
  aliases: [],
  category: "🛠️ moderator",
  description: "This command will mute someone you have tagged.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (message.member.hasPermission("ADMINISTRATOR")) {
        const target = message.mentions.users.first();
        if (target) {
          let muteRole = message.guild.roles.cache.find((role) => role.name === "muted");
          if (!muteRole) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Plz make @muted role, and set every channels to cannot Sent Message(s)**`).setColor("RED");
            return message.channel.send(embed);
          }

          let memberTarget = message.guild.members.cache.get(target.id);

          if (memberTarget.id === message.author.id) {
            message.reply("You cannot mute ur self.");
          }

          if (message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) < 1) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You're role is too low**`).setColor("#F04A47");
            message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
            return;
          }

          if (!args[1]) {
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted.`);
            return;
          }
          memberTarget.roles.add(muteRole.id);
          message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}.`);

          setTimeout(function () {
            memberTarget.roles.remove(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted.`);
          }, ms(args[1]));
        } else {
          message.channel.send("You didn't mention the user to muted!").then((i) => i.delete({ timeout: 5000 }));
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
