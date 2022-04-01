const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "grave",
  aliases: [],
  category: "😁 fun",
  description: "R.I.P Let's take a pray together:)",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const sorry_m = client.emojis.cache.find((x) => x.id === emoji.sorry);

      let user = message.mentions.members.first() || message.member;
      try {
        const embed = new Discord.MessageEmbed()
          .setTitle(`**${sorry_m} Let's Pray Together**`)
          .setImage(encodeURI(`https://vacefron.nl/api/grave?user=${user.user.displayAvatarURL({ format: "png", size: 512 })}`))
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
