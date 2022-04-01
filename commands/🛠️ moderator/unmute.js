const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "unmute",
  aliases: [],
  category: "🛠️ moderator",
  description: "This command will unmuted someone has been muted",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (message.member.hasPermission("ADMINISTRATOR")) {
        const target = message.mentions.users.first();
        if (target) {
          let muteRole = message.guild.roles.cache.find((role) => role.name === "muted");

          let memberTarget = message.guild.members.cache.get(target.id);

          memberTarget.roles.remove(muteRole.id);
          message.channel.send(`<@${memberTarget.user.id}> has been unmuted.`);
        } else {
          message.channel.send("You didn't mention the user to unmuted!").then((i) => i.delete({ timeout: 5000 }));
        }
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
