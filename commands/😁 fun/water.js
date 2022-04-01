const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Math = require("mathjs");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "water",
  aliases: [],
  category: "😁 fun",
  description: "I don't have a caption for this command:)",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const yoda = client.emojis.cache.find((x) => x.id === emoji.yoda);

      let water = args.join(" ");
      if (!water) return message.reply("Plz include ur text:)");
      try {
        const embed = new Discord.MessageEmbed()
          .setTitle(`**${yoda} ${message.author.username} Want this**`)
          .setImage(encodeURI(`https://vacefron.nl/api/water?text=${water}`))
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
