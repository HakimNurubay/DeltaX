const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const backup = require("discord-backup");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "make-backup",
  aliases: ["create-backup", "createbackup", "makebackup"],
  category: "💾 backup",
  description: "This command will create backup on ur Discord Server.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        backup
          .create(message.guild)
          .then((backupData) => {
            message.channel.send("Backup created! Here is your ID: `" + backupData.id + "`! Use `" + prefix + "load-backup " + backupData.id + "` to load the backup on another server!");
            message.author.send("Backup created! Here is your ID: `" + backupData.id + "`! Use `" + prefix + "load-backup " + backupData.id + "` to load the backup on another server!").catch((e) => {
              const embed = new Discord.MessageEmbed().setDescription(`**${wrong} I can't send message to that user**`).setColor("#F04A47");
              return message.channel.send(embed);
            });
            return;
          })
          .catch(() => {
            console.log();
            return message.channel.send(`${wrong} An error occurred, please check if the bot is administrator!`);
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
