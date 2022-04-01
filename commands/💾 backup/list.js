const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const backup = require("discord-backup");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "backup-list",
  aliases: [],
  category: "💾 backup",
  description: "This command will get the backup list.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        const backup = require("discord-backup");
        backup.list().then((backups) => {
          var backup = backups
            .map((r) => r)
            .map((r, i) => `**${i + 1}.** ${r}`)
            .join("\n");
          const embed = new Discord.MessageEmbed().setTitle("List of Backup Server ID").setDescription(backup).setFooter("DeltaX Bot", client.user.displayAvatarURL());
          message.channel.send(embed);
        });
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
