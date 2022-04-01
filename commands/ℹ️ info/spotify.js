const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const Canvacord = require("canvacord");
const cooldown = new Set();
const convert = require("parse-ms");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "spotify",
  aliases: [],
  category: "ℹ️ info",
  description: "This command will check spotify playing.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let user = message.mentions.users.first() || message.author;

      let status;
      if (user.presence.activities.length === 1) status = user.presence.activities[0];
      else if (user.presence.activities.length > 1) status = user.presence.activities[1];
      if (user.presence.activities.length === 0 || (status.name !== "Spotify" && status.type !== "LISTENING")) {
        return message.channel.send("This user isn't listening to Spotify.");
      }

      if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
        let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
          url = `https://open.spotify.com/track/${status.syncID}`,
          name = status.details,
          artist = status.state,
          album = status.assets.largeText,
          timeStart = status.timestamps.start,
          timeEnd = status.timestamps.end,
          timeConvert = convert(timeEnd - timeStart);
        let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
        let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
        let time = `${minutes}:${seconds}`;
        const embed = new Discord.MessageEmbed()
          .setAuthor("Spotify Track", `https://img.icons8.com/fluency/48/000000/spotify.png`)
          .setColor(0x1ed768)
          .setThumbnail(image)
          .addFields(
            { name: "Name", value: name, inline: true },
            { name: "Album", value: album, inline: true },
            { name: "Artist", value: artist, inline: true },
            { name: "Duration", value: time, inline: false },
            { name: "Listen now on Spotify", value: `[\`${artist} - ${name}\`](${url})`, inline: false }
          );
        return message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
