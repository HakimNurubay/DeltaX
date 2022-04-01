const Discord = require("discord.js");
const cooldown = new Set();
const math = require("mathjs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "feedback",
  aliases: [],
  category: "🔍 random",
  description: "Let's give ur feedback.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const theFeedback = args.join(" ");
      const img = [
        "https://cdn.discordapp.com/emojis/925191676291592233.gif?size=160",
        "https://cdn.discordapp.com/emojis/925197207483854898.gif?size=160",
        "https://cdn.discordapp.com/emojis/925199406276431934.gif?size=160",
        "https://cdn.discordapp.com/emojis/925199406721007636.gif?size=160",
      ];
      if (!theFeedback) return message.channel.send("You must include ur feedback").then((i) => i.delete({ timeout: 5000 }));
      const embed = new Discord.MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription("__**New Feedback**__")
        .addFields({ name: "Author", value: `> ${message.author.username} | ${message.author.id}`, inline: false }, { name: "Feedback", value: `> ${theFeedback}`, inline: false })
        .setColor("RANDOM")
        .setFooter(`Feedback from: ${message.author.tag}`, img[math.floor(Math.random() * img.length)])
        .setTimestamp();
      return message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
