const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "slowmo",
  aliases: ["slow-mode", "slowmode"],
  category: "🛠️ moderator",
  description: "This command will set the cooldown on the channel.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (message.member.hasPermission("ADMINISTRATOR")) {
        let time = args[0];
        if (!time) return message.channel.send("Please provide a time in second");
        if (isNaN(time)) return message.channel.send("Please provide a valid number");

        message.channel.setRateLimitPerUser(time, "No Reason");

        message.channel.send(`Successfully set the slowmode on this channel ${time} seconds`).then((i) => i.delete({ timeout: 5000 }));
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
