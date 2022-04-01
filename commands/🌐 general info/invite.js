const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const disbut = require("discord-buttons");
const { MessageActionRow, MessageButton } = require("discord-buttons");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "invite",
  aliases: ["getbot"],
  category: "🌐 general info",
  description: "Thanks so much for using DeltaX :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const button = new MessageButton()
        .setStyle("url")
        .setURL("https://discord.com/oauth2/authorize?client_id=900153413210365972&permissions=271641726&response_type=code&scope=bot%20applications.commands%20identify%20guilds&redirect_uri=https%3A%2F%2Fdeltax.crupuk.com")
        .setLabel("Invite Me!")
        .setEmoji("📎");

      const button2 = new MessageButton().setStyle("url").setURL("https://discord.gg/vdw7dwFZ2f").setLabel("Support Server!").setEmoji("📡");

      const row = new MessageActionRow().addComponents([button, button2]);

      message.channel.send("Let's Invite Me :D", row);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
