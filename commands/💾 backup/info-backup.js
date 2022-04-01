const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const backup = require("discord-backup");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "info-backup",
  aliases: ["infobackup"],
  category: "💾 backup",
  description: "This command will show info of backup Features.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        const backupID = args.join(" ");

        if (!backupID) return message.channel.send(":x: Please specify a valid backup ID!");

        backup
          .fetch(backupID)
          .then((backup) => {
            const date = new Date(backup.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(),
              mm = (date.getMonth() + 1).toString(),
              dd = date.getDate().toString();
            const formattedDate = `${yyyy}/${mm[1] ? mm : "0" + mm[0]}/${dd[1] ? dd : "0" + dd[0]}`;

            const embed = new Discord.MessageEmbed()
              .setAuthor("ℹ️ Backup", backup.data.iconURL)
              .addField("Server name", backup.data.name)
              .addField("Size", backup.size + " kb")
              .addField("Created at", formattedDate)
              .setFooter("Backup ID: " + backup.id);

            return message.channel.send(embed);
          })
          .catch((err) => {
            if (err === "No backup found") return message.channel.send(":x: No backup found for ID " + backupID + "!");
            else return message.channel.send(":x: An error occurred: " + (typeof err === "string") ? err : JSON.stringify(err));
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
