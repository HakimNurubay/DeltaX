const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
var figlet = require("figlet");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "ascii",
  aliases: [],
  category: "😁 fun",
  description: "Let's convert ur text to ascii.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      var maxLen = 50;

      if (args.join(" ").length > maxLen)
        return message.channel.send({
          embed: {
            color: 16734039,
            description: "The max length is " + `${maxLen}` + " !",
          },
        });

      if (!args[0])
        return message.channel.send({
          embed: {
            color: 16734039,
            description: "Plz enter a text to convert!",
          },
        });

      figlet(`${args.join(" ")}`, function (err, data) {
        if (err) {
          return message.channel.send({
            embed: {
              color: 16734039,
              description: "Something went wrong... :cry:",
            },
          });
        }
        message.channel.send(`${data}`, { code: "AsciiArt" });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
