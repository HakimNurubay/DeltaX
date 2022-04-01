const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "privacy",
  aliases: ["policy"],
  category: "🌐 general info",
  description: "Ur worried about ur privacy? just type this command :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(
          "**DeltaX bot Privacy Policy**\nWe do not store any data apart from the Commands Database and if the User Contact us from anywhere his data will be cleared, we do not store any type of personal data. We Follow all Discord's Terms of Service and Community Guidelines."
        )
        .setColor("RANDOM")
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
