const Discord = require("discord.js");
const math = require("mathjs");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "calc",
  aliases: [],
  category: "🔍 random",
  description: "This command is to calc ur Math question.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let question = args.join(" ");
      if (!question) return message.channel.send("Plz provide a maths equation");

      let result;
      try {
        result = math.evaluate(question);
      } catch (e) {
        return message.channel.send("Plz provide a valid equation");
      }

      return message.channel.send(`${question} = ${result}`);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
