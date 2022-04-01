const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const DisTube = require("distube");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "volume",
  aliases: [],
  usage: "<amount>",
  category: "🎵 music",
  description: "This command set the volume between 0 - 100.",
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
        if (!queue) return message.channel.send(`There is nothing in queue rn!`);
        let volume;
        if (parseInt(args[0]) > 100) {
          volume = 100;
        } else {
          if (isNaN(args[0])) return message.channel.send("Plz enter a valid number!");
          volume = parseInt(args[0]);
        }
        client.distube.setVolume(message, volume);

        const embed = new Discord.MessageEmbed()
          .setAuthor(`Volume`, "https://cdn.discordapp.com/emojis/932118876534214706.gif")
          .setDescription(`Volume set to ${volume}`)
          .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
          .setColor("RANDOM");
        message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
