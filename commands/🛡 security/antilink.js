const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "antilink",
  aliases: ["anti-link"],
  usage: "on/off",
  category: "🛡 security",
  description: "This to activated/deactivated antilink system",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      let embed = db.fetch(`embed_${message.guild.id}`);

      if (message.member.hasPermission("ADMINISTRATOR")) {
        let content = args[0];

        if (!content) {
          message.channel.send(`You didnt gave me an on or off option e.g - ${prefix}antilink on/off`).then((i) => i.delete({ timeout: 5000 }));
          return;
        }
        if (content.toLowerCase() === "on") {
          let antilink1 = db.fetch(`antilink_${message.guild.id}`);
          if (antilink1 == "on") {
            const onembed = new Discord.MessageEmbed().setDescription(`**${wrong} You have already turned on the antilink**`).setColor("RED");
            message.channel.send(onembed);
            return;
          }
          let on1 = "on";
          db.set(`antilink_${message.guild.id}`, on1);
          const seton = new Discord.MessageEmbed().setDescription(`**${check} Ok now i will Delete the message when someone sends the link in chat**`).setColor("GREEN");
          message.channel.send(seton);
        } else if (content.toLowerCase() === "off") {
          let antilink1 = db.fetch(`antilink_${message.guild.id}`);
          if (antilink1 == "off") {
            const offembed = new Discord.MessageEmbed().setDescription(`**${wrong} You have already turned off the antilink**`).setColor("RED");
            message.channel.send(offembed);
            return;
          }
          let off1 = "off";
          db.set(`antilink_${message.guild.id}`, off1);
          const setoff = new Discord.MessageEmbed().setDescription(`**${check} Ok now i will not Delete the message when someone sends the link in chat**`).setColor("GREEN");
          message.channel.send(setoff);
        } else {
          return message.reply("You didnt gave me on or off.").then((i) => i.delete({ timeout: 5000 }));
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
