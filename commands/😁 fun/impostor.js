const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Math = require("mathjs");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "impostor",
  aliases: [],
  category: "😁 fun",
  description: "Who is the impostor?",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const sus = client.emojis.cache.find((x) => x.id === emoji.sus);

      const color = ["black", "blue", "brown", "cyan", "darkgreen", "lime", "orange", "pink", "purple", "red", "white", "yellow"];

      const random = color[Math.floor(Math.random() * color.length)];

      const imp = Boolean(Math.round(Math.random()));

      let Title = imp;
      if (Title == true) Title = "Impostor";
      else if (Title == false) Title = "Not Impostor";

      let user = message.mentions.members.first() || message.member;
      try {
        const embed = new Discord.MessageEmbed()
          .setTitle(`**${sus} Umm.. ${Title}**`)
          .setImage(encodeURI(`https://vacefron.nl/api/ejected?name=${user.user.username}&impostor=${imp}&crewmate=${random}`))
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
