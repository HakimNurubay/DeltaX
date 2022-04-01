const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "captcha",
  aliases: [],
  category: "😁 fun",
  description: "This is will make ur own captcha.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const loading_m = client.emojis.cache.find((x) => x.id === emoji.loading);

      let user = message.mentions.members.first() || message.member;
      let m = await message.channel.send(`**${loading_m} Please Wait...**`);
      try {
        let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&username=${user.user.username}&url=${user.user.displayAvatarURL({ format: "png", size: 512 })}`));
        let json = await res.json();
        const embed = new Discord.MessageEmbed().setTitle(`**${loading_m} Solve Captcha**`).setImage(json.message).setColor("RANDOM").setTimestamp();
        message.channel.send(embed);
        m.delete({ timeout: 5000 });
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
