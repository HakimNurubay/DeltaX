const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "flatearth",
  aliases: [],
  category: "😁 fun",
  description: "Tell them if flat isn't flat :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("If the earth isn't flat, explain this:")
        .setImage("https://img.buzzfeed.com/buzzfeed-static/static/2017-09/12/11/asset/buzzfeed-prod-fastlane-01/sub-buzz-13197-1505231830-3.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto");
      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
