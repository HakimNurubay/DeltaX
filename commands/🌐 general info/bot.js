const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const cooldown = new Set();
const db = require("quick.db");
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "bot",
  aliases: ["botinfo"],
  category: "🌐 general info",
  description: "You can use this to see about DeltaX.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const status = {
        online: "🟢 Online",
        idle: "🟡 Idle",
        dnd: "🔴 DND",
        offline: "⚫ Offline",
      };

      const lo = client.emojis.cache.find((x) => x.id === emoji.dev);
      const king = client.emojis.cache.find((x) => x.id === emoji.king);

		// Do Not Remove THIS
      const me = client.users.cache.find((x) => x.id === "864164903287652403");

      const { guild } = message;

      const bar = db.get(`barStyle_${guild.id}`) || "https://i.imgur.com/fhVTAyV.gif";

      let uptime = [];

      const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

      var createDate = moment(client.user.createdAt).unix();

      var botEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`DeltaX`, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .addField(`${king} Creator`, `${me.tag}`, false)
        .addFields({ name: "📛 Name", value: `${client.user.username}`, inline: true }, { name: "#️⃣ ID", value: `${client.user.id}`, inline: true })
        .addFields({ name: "⏳ Ping", value: `${Math.round(client.ws.ping)}ms`, inline: false }, { name: "⚙ Prefix", value: `${prefix}`, inline: true }, { name: `${lo} Commands`, value: `${client.commands.size} cmds`, inline: true })
        .addField("Status", `${status[client.presence.status]}`, false)
        .addFields(
          { name: "🌐 Servers", value: `${client.guilds.cache.size}`, inline: true },
          { name: "📺 Channels", value: `${client.channels.cache.size}`, inline: true },
          { name: "👥 Users", value: `${client.users.cache.size}`, inline: true }
        )
        .addField(`📈 Uptime:`, `**${duration}**`, false)
        .addFields({
          name: "Created At",
          value: `<t:${createDate}:f>`,
          inline: true,
        })
        .setImage(bar)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
      message.channel.send(botEmbed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
