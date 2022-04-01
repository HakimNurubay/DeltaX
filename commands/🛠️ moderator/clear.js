const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "clear",
  aliases: [],
  category: "🛠️ moderator",
  description: "This command will clear message with max amount is 100 message.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (message.member.hasPermission("MANAGE_MESSAGES", "ADMINISTRATOR")) {
        if (!args[0]) {
          return message.reply(`Plz enter amount between 1 to 99`);
        }

        if (parseInt(args[0]) > 99) {
          return message.channel.send("Max amount to clear message is 99").then((i) => i.delete({ timeout: 5000 }));
        }
        if (isNaN(args[0])) return message.channel.send("Plz input a number to delete messages");
        message.channel.bulkDelete(parseInt(args[0]) + 1).catch((e) => console.log(e));
        message.reply(`**Successfully** Deleted **${args[0]}** Messages.`).then((i) => i.delete({ timeout: 5000 }));
      } else {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
