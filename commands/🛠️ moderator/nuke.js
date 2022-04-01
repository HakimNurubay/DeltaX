const Discord = require("discord.js");
const disbut = require("discord-buttons");
const client = new Discord.Client();
const { MessageActionRow, MessageButton } = require("discord-buttons");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "nuke",
  aliases: [],
  category: "🛠️ moderator",
  description: "This is will delete all messages on channel",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const warning = client.emojis.cache.find((x) => x.id === emoji.warn);

      if (message.member.hasPermission("MANAGE_GUILD", "ADMINISTRATOR")) {
        let nuke = new MessageButton().setStyle("green").setLabel("yes").setID("nuke");

        let cancel = new MessageButton().setStyle("red").setLabel("no").setID("ncancel");

        let row = new MessageActionRow().addComponents(nuke, cancel);

        message.channel.send(`**${warning} Are you sure you want to nuke this channel?**`, row).then((i) => i.delete({ timeout: 300000 }));
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
