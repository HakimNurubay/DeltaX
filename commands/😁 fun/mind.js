const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Math = require("mathjs");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "change-my-mind",
  aliases: ["changemymind", "cmm"],
  category: "😁 fun",
  description: "Do u wanna change ur mind?",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const pepe = client.emojis.cache.find((x) => x.id === emoji.pepe);

      let mind = args.join(" ");
      if (!mind) return message.reply("Plz include ur new mind:)");
      try {
        const embed = new Discord.MessageEmbed()
          .setTitle(`**${pepe} ${message.author.username} Changed its Mind**`)
          .setImage(encodeURI(`https://vacefron.nl/api/changemymind?text=${mind}`))
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
