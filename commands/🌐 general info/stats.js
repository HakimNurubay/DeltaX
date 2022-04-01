const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "stats",
  aliases: ["stat", "botstat", "botstats"],
  category: "🌐 general info",
  description: "To see the stats of DeltaX rn.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let uptime = [];

      const owner = client.users.cache.find((x) => x.id === "864164903287652403");

      const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

      const { guild } = message;

      const bar = db.get(`barStyle_${guild.id}`) || "https://i.imgur.com/fhVTAyV.gif";

      var createDate = moment(client.user.createdAt).unix();

      const embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle(`${client.user.username} stats`)
        .setThumbnail(client.user.displayAvatarURL())
        .setImage(`https://voidbots.net/api/embed/${client.user.id}`)
        .addFields(
          { name: `📂 Memory Usage:`, value: (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + "MB", inline: false },
          { name: `🌐 Servers`, value: client.guilds.cache.size, inline: true },
          { name: `📺 Channels`, value: client.channels.cache.size, inline: true },
          { name: `👥 Users`, value: client.users.cache.size, inline: true },
          { name: `📅 Created At`, value: `<t:${createDate}:f>`, inline: false },
          { name: `🛠 Developer`, value: owner.tag, inline: false },
          { name: `⚙ Prefix`, value: prefix, inline: true },
          { name: `📈 Uptime`, value: duration, inline: true }
        )
        .setImage(bar)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
