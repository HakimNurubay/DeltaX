const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Math = require("mathjs");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "emergency-meeting",
  aliases: ["emergencymeeting", "emergency"],
  category: "😁 fun",
  description: "I don't have a caption for this command:)",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const am = client.emojis.cache.find((x) => x.id === emoji.among_us_dance);

      let among = args.join(" ");
      if (!among) return message.reply("Plz include ur text:)");
      try {
        const embed = new Discord.MessageEmbed()
          .setTitle(`**${am} ${message.author.username} Started Emergency Meeting**`)
          .setImage(encodeURI(`https://vacefron.nl/api/emergencymeeting?text=${among}`))
          .setColor("RANDOM")
          .setTimestamp();
        message.channel.send(embed);
      } catch (e) {
        message.channel.send({
          embed: {
            color: 16734039,
            description: "Something went wrong... :cry:",
          },
        });
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
