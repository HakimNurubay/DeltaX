const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "poll",
  aliases: [],
  usage: "<channel> <question>",
  category: "🛠️ moderator",
  description: "This command will create a poll with react.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const loading_m = client.emojis.cache.find((x) => x.id === emoji.dc_spin);

      if (message.member.hasPermission("MANAGE_MESSAGES", "ADMINISTRATOR")) {
        const channel = message.mentions.channels.first();
        if (!args.length) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Usage: ${prefix}poll <channel> <question>**`).setColor("RED");
          return message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
        }
        if (!channel) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Plz provide a channel to send this poll**`).setColor("RED");
          return message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
        } else {
          let announce = args.slice(1).join(" ");
          if (!announce) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Plz provide what do you want on this poll**`).setColor("RED");
            return message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
          }
          const embed = new MessageEmbed().setColor("RANDOM").setTitle(`${loading_m} New Poll ${loading_m}`).setDescription(`${announce}`).setFooter(`Poll started by: ${message.author.tag}`);
          let msgEmbed = await channel.send(embed);
          await msgEmbed.react("✅");
          await msgEmbed.react("❌");
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
