const Discord = require("discord.js");
const cooldown = new Set();
const fetch = require("node-fetch");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "screenshot",
  aliases: ["ss"],
  usage: "<link>",
  category: "🔍 random",
  description: "This command will take a screenshot to the link u provided.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const link = message.content.includes("http://") || message.content.includes("https://");
      if (!link) return message.channel.send("Plz provide a valid link").then((i) => i.delete({ timeout: 5000 }));
      const url = args.join(link);
      //const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
      try {
        const embed = new Discord.MessageEmbed()
          .setDescription(`**The Sceenshot of [${url}](https://api-fg.ddns.net/api/v3/news/screenshot?url=${url})**`)
          .setColor("RANDOM")
          .setImage(encodeURI(`https://api-fg.ddns.net/api/v3/news/screenshot?url=${url}`))
          .setFooter(`Requested by ${message.author.tag}`)
          .setTimestamp();
        return message.channel.send(embed);
      } catch (err) {
        null;
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
