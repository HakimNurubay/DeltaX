const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "embed",
  aliases: [],
  category: "🔍 random",
  description: "This command will embeded ur text.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const theField = args.join(" ");
      if (!theField) return message.channel.send("You must include ur text").then((i) => i.delete({ timeout: 5000 }));
      const embed = new Discord.MessageEmbed()
        .setTitle("Embed Message")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(theField)
        .setColor("RANDOM")
        .setFooter(`Message by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
      return message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
