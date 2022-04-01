const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Math = require("mathjs");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "predict",
  aliases: [],
  category: "😁 fun",
  description: "There is a big chance I insult you!",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      let question = args.join(" ");
      if (!question) {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You didn't give me the question**`).setColor("RED");
        return message.channel.send(embed);
      }

      let responses = [
        "Maybe.",
        "Certainly not.",
        "I hope so.",
        "Not in your wildest dreams.",
        "There is a good chance.",
        "Quite likely.",
        "I think so.",
        "I hope not.",
        "I hope so.",
        "Never!",
        "Fuhgeddaboudit.",
        "Ahaha! Really?!?",
        "Pfft.",
        "Sorry, bucko.",
        "Hell, yes.",
        "Hell to the no.",
        "The future is bleak.",
        "The future is uncertain.",
        "I would rather not say.",
        "Who cares?",
        "Possibly.",
        "Never, ever, ever.",
        "There is a small chance.",
        "Yes!",
      ];
      let response = responses[Math.floor(Math.random() * responses.length - 1)];

      let embed = new MessageEmbed().setTitle(`Prediction Result`).addFields({ name: "Question", value: question, inline: false }, { name: "Answer", value: response, inline: false }).setColor(`RANDOM`);
      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
