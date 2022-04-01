const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const DisTube = require("distube");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "autoplay",
  aliases: [],
  usage: "on/off",
  category: "🎵 music",
  description: "This command give you 2 option, which is on or off.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (!message.member.voice.channel) {
        const embed = new Discord.MessageEmbed().setDescription(`${wrong} Plz connect to a voice channel first!`).setColor("#fc0303");
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
      } else {
        const queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send("There is nothing played");
        let mode = client.distube.toggleAutoplay(message);
        const embed = new Discord.MessageEmbed()
          .setAuthor(`AutoPlay`, "https://cdn.discordapp.com/emojis/932118876534214706.gif")
          .setDescription("Set autoplay mode to " + (mode ? "ON" : "OFF") + " ")
          .setColor(`GREEN`);
        message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
