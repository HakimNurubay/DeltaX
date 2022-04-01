const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const DisTube = require("distube");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "queue",
  aliases: ["playlist"],
  category: "🎵 music",
  description: "This Command will show the playlist of the song that you have added.",
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
        if (!queue) message.channel.send("There is nothing in queue rn!");
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `**${i}**.`} ${song.name} -\`${song.formattedDuration}\``).join("\n");
        const embed = new Discord.MessageEmbed().setAuthor(`PlayList Songs`, "https://cdn.discordapp.com/emojis/932118876534214706.gif").setDescription(q).setColor("RANDOM");
        message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
