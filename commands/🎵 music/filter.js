const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const DisTube = require("distube");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "filter",
  aliases: [],
  category: "🎵 music",
  usage: "3d/bassboost/echo/karaoke/nightcore/vaporwave/flanger/haas/mcompand/phaser/tremolo/earwax/off",
  description: "Available option is 3d, bassboost, echo, karaoke, nightcore, vaporwave, flanger, haas, mcompand, phaser, tremolo, earwax. you can choose one.",
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
        let queue = await client.distube.getQueue(message);
        if (args[0] === "off" && queue.filter) client.distube.setFilter(message, queue.filter);
        else if (Object.keys(client.distube.filters).includes(args[0])) client.distube.setFilter(message, args[0]);
        else if (args[0]) return message.channel.send(new Discord.MessageEmbed().setTitle(`Oops!`).setDescription(`❌ Not a valid filter`).setColor(`RED`));
        message.channel.send(
          new Discord.MessageEmbed()
            .setAuthor(`Filter`, "https://cdn.discordapp.com/emojis/932118876534214706.gif")
            .setDescription(`Current Queue Filter: \`${queue.filter || "Off"}\``)
            .setColor(`GREEN`)
        );
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
