const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "tweet",
  aliases: [],
  category: "😁 fun",
  description: "Wanna tweet something? :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const user = message.author.username;
      const text = args.join(" ");

      if (!text) {
        return message.channel.send("images/tweet:MISSING_TEXT");
      }

      const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`));
      const json = await res.json();
      const attachment = new Discord.MessageAttachment(json.message, "tweet.png");
      message.channel.send(attachment);
      message.delete();
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
