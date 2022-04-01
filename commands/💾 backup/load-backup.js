const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const backup = require("discord-backup");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "load-backup",
  aliases: ["loadbackup", "restorebackup", "restore-backup"],
  category: "💾 backup",
  description: "This command will load the backup that u was created before.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const warn = client.emojis.cache.find((x) => x.id === emoji.warn);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        const backupID = args.join(" ");

        backup
          .fetch(backupID)
          .then(() => {
            message.channel.send(`${warn} All the server channels, roles, and settings will be cleared. Do you want to continue? Send \`-confirm\` or \`cancel\`!`);

            const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ["-confirm", "cancel"].includes(m.content), {
              time: 60000,
              max: 1,
            });
            collector.on("collect", (m) => {
              const confirm = m.content === "-confirm";
              collector.stop();
              if (confirm) {
                backup
                  .load(backupID, message.guild)
                  .then(() => {
                    return message.author.send(`${check} Backup loaded successfully!`);
                  })
                  .catch((err) => {
                    if (err === "No backup found") return message.channel.send(`${wrong} No backup found for ID ` + backupID + "!");
                    else return message.author.send(`${wrong} An error occurred: ` + (typeof err === "string") ? err : JSON.stringify(err));
                  });
              } else {
                return message.channel.send(`${wrong} Cancelled.`);
              }
            });

            collector.on("end", (collected, reason) => {
              if (reason === "time") return message.channel.send(`${wrong} Command timed out! Please retry.`);
            });
          })
          .catch(() => {
            return message.channel.send(`${wrong} No backup found for ID ` + backupID + "!");
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
