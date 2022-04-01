const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "say",
  aliases: [],
  category: "😁 fun",
  description: "This command will made the bot say what you wanna say.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let params = args.join(" ");
      if (!args[0]) return message.channel.send("Plz Include what you wanna say.");
      message.channel.bulkDelete(1);
      message.channel.send(`${params}`);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
