const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "wolverine",
  aliases: [],
  category: "😁 fun",
  description: "Wolverine was miss u fr:D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const rick = client.emojis.cache.find((x) => x.id === emoji.rick_roll);

      let user = message.mentions.members.first() || message.member;
      try {
        const embed = new Discord.MessageEmbed()
          .setTitle(`**${rick} You've got rick rolled:D**`)
          .setImage(encodeURI(`https://vacefron.nl/api/wolverine?user=${user.user.displayAvatarURL({ format: "png", size: 512 })}`))
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
