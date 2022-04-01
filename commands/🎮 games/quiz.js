const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Math = require("mathjs");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "quiz",
  aliases: ["qz"],
  category: "🎮 games",
  description: " Wanna feel like in casino? Try this one :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const quiz = require("../../json db/quiz.json");
      const item = quiz[Math.floor(Math.random() * quiz.length)];
      const filter = (response) => {
        return item.answers.some((answer) => answer.toLowerCase() === response.content.toLowerCase());
      };

      const mainEmbed = new MessageEmbed().setColor("RANDOM").setDescription(item.question);

      message.channel.send(mainEmbed).then(() => {
        message.channel
          .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
          .then((collected) => {
            message.channel.send(`${collected.first().author} got the correct answer!`);
          })
          .catch(() => {
            message.channel.send(`**${wrong} Time Out..**`);
          });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
