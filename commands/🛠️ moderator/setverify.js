const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "set-verify",
  aliases: ["setverify"],
  usage: "<channel> <role>",
  category: "🛠️ moderator",
  description: "This command will set the verify feature.",
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
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Usage: ${prefix}setverify \`<channel>\` \`<role>\`**`).setColor("RED");
          return message.channel.send(embed);
        }

        if (args[0] == "disable" || args[0] == "off") {
          let verif = db.fetch(`verifc_${message.guild.id}`) + db.fetch(`verifr_${message.guild.id}`);
          if (verif == null) {
            const onembed = new Discord.MessageEmbed().setDescription(`${wrong} **You are not set the verify yet, try to ${prefix}setverify \`<channel>\` \`<role>\`**`).setColor("RED");
            message.channel.send(onembed);
            return;
          }
          db.delete(`verifc_${message.guild.id}`);
          db.delete(`verifr_${message.guild.id}`);
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully to disable the verify on this server**`).setColor("GREEN");
          return message.channel.send(embed);
        } else {
          var ch = message.mentions.channels.first().id;
          if (!ch) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Usage: ${prefix}setverify \`<channel>\` \`<role>\`**`).setColor("RED");
            return message.channel.send(embed);
          }

          var role1 = message.mentions.roles.first().id;
          if (!role1) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Usage: ${prefix}setverify \`<channel>\` \`<role>\`**`).setColor("RED");
            return message.channel.send(embed);
          }
          const icon = message.guild.iconURL() || "https://cdn.discordapp.com/embed/avatars/1.png";
          const embed = new Discord.MessageEmbed().setThumbnail(icon).setDescription(`**${check} Successfully to set verify on this server\n<#${ch}> is the verify channel\n<@&${role1}> is the role for verify**`).setColor("GREEN");
          message.channel.send(embed);
          db.set(`verifc_${message.guild.id}`, ch);
          db.set(`verifr_${message.guild.id}`, role1);
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
