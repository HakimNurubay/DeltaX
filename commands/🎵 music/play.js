const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const DisTube = require("distube");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "play",
  aliases: ["p"],
  usage: "<song name>",
  category: "🎵 music",
  description: "This command will playing a song / add to queue that you have request.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      //const vc = message.member.voice;
      //const same = message.guild.id;
      //if (same && vc !== message.guild.me.voice.channel) return message.channel.send(`You must be in the same Voice Channel as me`);
      if (!message.member.voice.channel) {
        const embed = new Discord.MessageEmbed().setDescription(`${wrong} Plz connect to a voice channel first!`).setColor("#fc0303");
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
      } else {
        const music = args.join(" ");
        if (!music) return message.channel.send("Plz Provide a song to play");
        client.distube.play(message, music);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
