const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "maintenance",
  aliases: [],
  usage: "on/off",
  category: "🛡 security",
  description: "This command will turn on maintenance or turn off maintenance on ur discord server. This command will reset all permissions on all channel ur discord server. ",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!args[0]) {
          const embed = new Discord.MessageEmbed().setDescription(`${wrong} You didn't give me ${prefix}maintenance on/off`).setColor("RED");
          message.channel.send(embed);
        }
        if (args[0] == "on") {
          let ont = db.fetch(`maintain_${message.guild.id}`);
          if (ont == "on") {
            const embed = new Discord.MessageEmbed().setDescription(`${wrong} This server has already turned on maintenance mode`).setColor("RED");
            message.channel.send(embed);
            return;
          }
          let on2 = "on";
          db.set(`maintain_${message.guild.id}`, on2);
          message.guild.channels.cache.forEach((ch) => {
            ch.overwritePermissions(
              [
                {
                  id: message.guild.roles.everyone.id,
                  deny: ["VIEW_CHANNEL"],
                },
              ],
              `${message.member.id} Told to lock the server`
            );
          });
          message.guild.channels.create("maintenance-chat", {
            //Create a channel
            type: "text", //Make sure the channel is a text channel
            permissionOverwrites: [
              {
                //Set permission overwrites
                id: message.guild.roles.everyone.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
              },
            ],
          });
          message.guild.channels.create("maintenance-vc", {
            //Create a channel
            type: "voice", //Make sure the channel is a text channel
            permissionOverwrites: [
              {
                //Set permission overwrites
                id: message.guild.roles.everyone.id,
                allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
              },
            ],
          });
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully turned on the maintenance mode on this server\nNow all channel has been hidden**`).setColor("GREEN");
          message.channel.send("**P.S. Plz to do not rename the maintenance channel that was i created.**", embed);
        }
        if (args[0] == "off") {
          let offt = db.fetch(`maintain_${message.guild.id}`);
          if (offt == "off") {
            const embed = new Discord.MessageEmbed().setDescription(`${wrong} This server has already turned off maintenance mode`).setColor("RED");
            message.channel.send(embed);
            return;
          }
          let off2 = "off";
          db.set(`maintain_${message.guild.id}`, off2);
          message.guild.channels.cache.forEach((ch) => {
            ch.overwritePermissions(
              [
                {
                  id: message.guild.roles.everyone.id,
                  allow: ["VIEW_CHANNEL"],
                },
              ],
              `${message.member.id} Told to lock the server`
            );
          });
          message.guild.channels.cache.find((channel) => channel.name === "maintenance-chat").delete("maintenance mode off");
          message.guild.channels.cache.find((channel) => channel.name === "maintenance-vc").delete("maintenance mode off");

          const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully turned off the maintenance mode on this server\nNow all channel has been unhidden**`).setColor("GREEN");
          message.channel.send(embed);
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
