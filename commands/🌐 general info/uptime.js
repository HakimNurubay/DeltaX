const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "uptime",
  aliases: [],
  category: "🌐 general info",
  description: "Let's see how long DeltaX was online.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      let embed = new Discord.MessageEmbed().setTitle("Uptime").setDescription(`${duration}`).setColor("RANDOM").setFooter(`Requested by ${message.author.username}`).setTimestamp();
      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
