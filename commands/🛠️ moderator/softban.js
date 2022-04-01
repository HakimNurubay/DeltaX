const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "softban",
  aliases: [],
  usage: "<mention>",
  category: "🛠️ moderator",
  description: "This command will ban someone you have tagged.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const jonathan = client.emojis.cache.find((x) => x.id === emoji.jonathan);

      if (message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) {
        if (!message.guild) return;
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You didn't mention the user to ban**`).setColor("#F04A47");
          message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
          return;
        }
        if (user.id === message.author.id) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You cannot ban ur self**`).setColor("#F04A47");
          message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
          return;
        }
        if (message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) < 1) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You're role is too low**`).setColor("#F04A47");
          message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
          return;
        }
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason provided";

        if (user) {
          const member = message.guild.member(user);
          if (member) {
            member
              .ban({
                days: 7,
                reason: `${reason}`,
              })
              .then(() => {
                const embed = new Discord.MessageEmbed().setDescription(`${check} Successfully banned **${user}**\nReason: **${reason}**`).setColor("#43B581");
                message.channel.send(embed);
              })
              .then(() => {
                let embed = new Discord.MessageEmbed().setDescription(`${jonathan} You have been banned in **${message.guild.name}** by **${message.author.username}**\nReason: ${reason}`).setColor("#F04A47");
                user.send(embed).catch((e) => {
                  const embed = new Discord.MessageEmbed().setDescription(`**${wrong} I can't send message to that user**`).setColor("#F04A47");
                  return message.channel.send(embed);
                });
              })
              .catch((err) => {
                const embed = new Discord.MessageEmbed().setDescription(`${wrong} I was unable to ban this member`).setColor("#F04A47");
                message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
                console.error(err);
              });
          } else {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} This user isn't in this server**`).setColor("#F04A47");
            message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
          }
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
