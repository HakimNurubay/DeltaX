const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "bio-reset",
  aliases: ["del-bio", "reset-bio"],
  category: "🤗 biodata",
  description: "This command will reset ur Biodata.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      db.delete(`biography_${message.author.id}`);
      const aembed = new Discord.MessageEmbed().setDescription(`${check} **Successfull** ${check}\n\n **Successfully Deleted Your Bio**`);

      message.channel.send(aembed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
