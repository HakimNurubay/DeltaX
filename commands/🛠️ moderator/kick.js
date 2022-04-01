const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "kick",
  aliases: [],
  category: "🛠️ moderator",
  description: "This command will kick someone you have tagged.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const loading_m = client.emojis.cache.find((x) => x.id === emoji.dc_spin);

      if (message.member.hasPermission("ADMINISTRATOR")) {
        let target = message.mentions.members.first();
        if (!target) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You didn't mention the user to kick**`).setColor("#F04A47");
          message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
          return;
        }
        if (target === message.author.id) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You cannot kick ur self**`).setColor("#F04A47");
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
        if (target) {
          const member = message.guild.member(target);
          if (member) {
            member;
            target
              .kick()
              .then(() => {
                const embed = new Discord.MessageEmbed().setDescription(`${check} Successfully kicked **${target}**\nReason: **${reason}**`).setColor("#43B581");
                message.channel.send(embed);
              })
              .then(() => {
                let embed = new Discord.MessageEmbed().setDescription(`${loading_m} You have been kicked in **${message.guild.name}** by **${message.author.username}**\nReason: ${reason}`).setColor("#F04A47");
                target.send(embed).catch((e) => {
                  const embed = new Discord.MessageEmbed().setDescription(`**${wrong} I can't send message to that user**`).setColor("#F04A47");
                  return message.channel.send(embed);
                });
              })
              .catch((err) => {
                console.log(err); //Debug
                const embed = new Discord.MessageEmbed().setDescription(`${wrong} I was unable to kick this member`).setColor("#F04A47");
                message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
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
