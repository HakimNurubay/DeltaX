const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "autonick",
  aliases: [],
  usage: "<nick>/disable",
  category: "🚀 automod",
  description: "This command will set or turn off the autonick feature",
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
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Plz enter a nickname like : LGT -username- OP (Username means the joiner username)**`).setColor("RED");
          return message.channel.send(embed);
        }

        if (args[0] == "disable" || args[0] == "off") {
          let autonick = db.fetch(`nickm_${message.guild.id}`);
          if (autonick == null) {
            const onembed = new Discord.MessageEmbed().setDescription(`${wrong} **You are not set the autonick yet, try to ${prefix}autonick <nick>**`).setColor("RED");
            message.channel.send(onembed);
            return;
          }
          db.delete(`nickm_${message.guild.id}`);
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully to disable the autonick on this server**`).setColor("GREEN");
          return message.channel.send(embed);
        } else {
          let message1 = args.join(" ");
          if (message1.length > 10) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Max nick is 10 character, u just input ${message1.length} character, try to make it shorter**`).setColor("RED");
            return message.channel.send(embed);
          }
          if (!message1) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Plz enter a nickname like : LGT -username- OP (Username means the joiner username)**`).setColor("RED");
            return message.channel.send(embed);
          }
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully to set autnick on this server\n${message1}**`).setColor("GREEN");
          message.channel.send(embed);
          db.set(`nickm_${message.guild.id}`, message1);
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
