const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const db = require("quick.db");
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "lockdown",
  aliases: ["lock-all", "lockall"],
  usage: "on/off",
  category: "🛡 security",
  description: "This command will turn on or off ghost ping detector feature.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("MANAGE_GUILD")) {
        if (args[0] == "on") {
          let ont = db.fetch(`lockdown_${message.guild.id}`);
          if (ont == "on") {
            const embed = new Discord.MessageEmbed().setDescription(`${wrong} This server has already turned on lockdown mode`).setColor("RED");
            message.channel.send(embed);
            return;
          }
          let on2 = "on";
          db.set(`lockdown_${message.guild.id}`, on2);
          message.guild.channels.cache.forEach((ch) => {
            ch.overwritePermissions(
              [
                {
                  id: message.guild.roles.id,
                  deny: ["VIEW_CHANNEL"],
                },
              ],
              `${message.member.id} Told to lock the server`
            );
          });
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully turned on the lockdown mode on this server\nNow all channel has been hidden**`).setColor("GREEN");
          message.channel.send("**P.S. Plz to do not rename the lockdown channel that was i created.**", embed);
        }
        if (args[0] == "off") {
          let offt = db.fetch(`lockdown_${message.guild.id}`);
          if (offt == "off") {
            const embed = new Discord.MessageEmbed().setDescription(`${wrong} This server has already turned off lockdown mode`).setColor("RED");
            message.channel.send(embed);
            return;
          }
          let off2 = "off";
          db.set(`lockdown_${message.guild.id}`, off2);
          message.guild.channels.cache.forEach((ch) => {
            ch.overwritePermissions(
              [
                {
                  id: message.guild.roles.id,
                  allow: ["VIEW_CHANNEL"],
                },
              ],
              `${message.member.id} Told to lock the server`
            );
          });
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully turned off the lockdown mode on this server\nNow all channel has been unhidden**`).setColor("GREEN");
          message.channel.send(embed);
        }

        message.channel.send("Successfully locked all the channels");
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
