const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const DisTube = require("distube");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "loop",
  aliases: [],
  usage: "queue/song/off",
  category: "🎵 music",
  description: "This command will loop the music with 3 option, loop song, queue, off.",
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
        let mode = null;
        switch (args[0]) {
          case "off":
            mode = 0;
            break;
          case "song":
            mode = 1;
            break;
          case "queue":
            mode = 2;
            break;
        }
        mode = client.distube.setRepeatMode(message, mode);
        mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";
        if (!args[0]) return message.channel.send("Right Syntax is: **n!loop queue/song/off**");
        const embed = new Discord.MessageEmbed().setAuthor(`Loop`, "https://cdn.discordapp.com/emojis/932118876534214706.gif").setDescription(`set loop to ${mode}`).setColor("RANDOM").setFooter(`Requested by ${message.author.username}`);
        message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
