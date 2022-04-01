const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const emoji = require("discord-emoji-convert");
const cooldown = new Set();
const emojis = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "emojify",
  aliases: [],
  usage: "<text>",
  category: "😁 fun",
  description: "This command will convert ur text into emoji.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emojis.wrong);
      const fullMessage = args.join(" ");

      if (!fullMessage) {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You need to texted something to convert it into emoji**`).setColor("RED");
        return;
      }

      const result = emoji.convert(fullMessage);
      message.channel.send(result);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
