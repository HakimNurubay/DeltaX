const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "set-leave",
  aliases: [],
  usage: "<mention channel>",
  category: "🚪 leave",
  description: "This command will set ur leave logs.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) {
        const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
        let channel = message.mentions.channels.first();
        if (!channel) return message.channel.send("Plz mention that channel wanna be leave logs.");
        let Check = db.fetch(`leaveChannel_${message.guild.id}`);
        if (Check) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You was set the leave logs before, try to delete it first**`).setColor("RED");
          return message.channel.send(embed);
        } else {
          message.channel.send(`Successfully set the leave logs channel to ${channel}.`);
          await db.set(`leaveChannel_${message.guild.id}`, channel.id);
        }
      } else {
        message.reply("You don't have premission to use that command.").then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
