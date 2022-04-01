const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "set-bot",
  aliases: ["ai"],
  usage: "<mention channel>",
  category: "🤖 chatbot",
  description: "This command will set channel to be chat bot.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (message.member.hasPermission("MANAGE_GUILD")) {
        let chatbot = db.fetch(`chatbotc_${message.guild.id}`);

        if (!chatbot) {
          if (!args[0]) {
            return message.channel.send("You didnt gave me a channel!!");
          }
          var wchannel = message.mentions.channels.first().id || args[0];
          var channel2 = message.mentions.channels.first();
          if (!channel2) {
            var channel2 = args[0];
            var channel2 = client.channels.cache.get(channel2);
          }
          db.set(`chatbotc_${message.guild.id}`, wchannel);
          let vc1 = "4";
          channel2.setRateLimitPerUser(vc1, `Responsible - ${message.member}`);

          return message.reply(`Done i Now i will talk in ${wchannel} and there will be slowmode Because of RateLimits`).then((i) => i.delete({ timeout: 5000 }));
        } else {
          return message.reply("You already have a chatbot channel first delete that from my command").then((i) => i.delete({ timeout: 5000 }));
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
