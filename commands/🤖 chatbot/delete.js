const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "delete-channel-bot",
  aliases: ["delete-ai"],
  category: "🤖 chatbot",
  description: "This command will delete channel that be the chat bot.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("MANAGE_GUILD")) {
        let chatbot = db.fetch(`chatbotc_${message.guild.id}`);
        if (chatbot) {
          let vc1 = "0";
          let checkc = client.channels.cache.get(chatbot);
          checkc.setRateLimitPerUser(vc1, `Responsible - ${message.member}`);

          db.delete(`chatbotc_${message.guild.id}`);
          message.reply("Done i have deleted the channel of chatbot from my database").then((i) => i.delete({ timeout: 5000 }));
          return;
        } else {
          return message.reply("You dont have a channel Please add it first").then((i) => i.delete({ timeout: 5000 }));
        }
      } else {
        message.reply("You don't have permission");
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
