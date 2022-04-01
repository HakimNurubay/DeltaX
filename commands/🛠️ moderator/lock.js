const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "lock",
  aliases: [],
  category: "🛠️ moderator",
  description: "This command will lock the channel",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
        return;
      }
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
      if (!channel) channel = message.channel;
      message.channel.overwritePermissions([
        {
          id: message.guild.id,
          allow: ["VIEW_CHANNEL"],
          deny: ["SEND_MESSAGES"],
        },
      ]);
      if (channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === false) {
        return message.channel.send(`${channel} is already locked! 🔒`);
      }
      message.channel.send(`${channel} is now locked! 🔒`);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
