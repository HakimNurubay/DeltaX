const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const DisTube = require("distube");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "stop",
  aliases: [],
  category: "🎵 music",
  description: "",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (!message.member.voice.channel) {
        const embed = new Discord.MessageEmbed().setDescription(`${wrong} Plz connect to a voice channel first!`).setColor("#fc0303");
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
      } else {
        const embed = new Discord.MessageEmbed().setDescription(`${wrong} This command was moved to reaction button ⏹`);
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
