const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Math = require("mathjs");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "iq",
  aliases: [],
  category: "😁 fun",
  description: "This command will check ur iq, just for fun:)",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      try {
        const iq = Math.floor(Math.random() * 226);
        const embed = new Discord.MessageEmbed()
          .setTitle(":brain: IQ Test:")
          .setDescription(`:bulb:   ${user}'s  **IQ is:**   \`${iq}\`  `)
          .setThumbnail("https://media.giphy.com/media/l44QzsOLXxcrigdgI/giphy.gif")
          .setTimestamp()
          .setFooter(`Requested by ${message.author.tag}`)
          .setColor("RANDOM");
        message.channel.send(embed);
      } catch (error) {
        console.log(error); //debug
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Something went wrong...**`).setColor("RED");
        return message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
