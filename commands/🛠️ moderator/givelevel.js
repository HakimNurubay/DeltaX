const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const Canvacord = require("canvacord");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "givelevel",
  aliases: [],
  category: "👑 owner",
  description: "This command will check ur rank.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        let user = message.mentions.members.first();

        if (!user)
          return message.channel.send({
            embed: {
              color: 16734039,
              description: "You must mention someone to level(s)!",
            },
          });

        if (isNaN(args[1]))
          return message.channel.send({
            embed: {
              color: 16734039,
              description: "You must enter the value of level to add!",
            },
          });

        message.channel.send("Success").then((i) => i.delete({ timeout: 5000 }));
        return db.add(`guild_${message.guild.id}_level_${user.id}`, args[1]);
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
