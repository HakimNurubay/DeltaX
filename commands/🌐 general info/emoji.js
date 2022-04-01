const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "emoji",
  aliases: [],
  usage: "<emoji>",
  category: "🌐 general info",
  description: "This command to get emoji.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let emoji = message.guild.emojis.cache.find((emoji) => emoji.name == args[0] || emoji.id === args[0] || emoji == args[0].replace(/([^\d])+/gim, ""));
      if (!emoji) return message.reply("Plz enter a specify emoji!");
      let a = null;
      let x = "`";
      let galaxy;
      let link;
      let name = emoji.name;
      let id = emoji.id;
      let link1 = `https://cdn.discordapp.com/emojis/${id}`;

      if (emoji.animated === true) {
        galaxy = `<a:${name} :${emoji.id}>`;
        link = link1 + ".gif";
      } else {
        galaxy = `<:${name}:${emoji.id}>`;
        link = link1 + ".png";
      }

      let mention = galaxy;
      let embed = new Discord.MessageEmbed()
        .setTitle("Information of this emoji")
        .setThumbnail(link)
        .addFields(
          { name: "Emoji", value: emoji, inline: false },
          { name: "Mention", value: `\`:${name}:\``, inline: false },
          { name: "Name", value: x + name + x, inline: true },
          { name: "ID", value: x + id + x, inline: true },
          { name: "Animated Emoji?", value: emoji.animated ? "Animated" : "No Animated", inline: false }
        );

      embed.setURL(link);
      embed.setColor("RANDOM");
      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
