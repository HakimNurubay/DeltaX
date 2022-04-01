const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const canvacord = require("canvacord");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "sharpen",
  aliases: [],
  category: "🖼️ image",
  description: "Let's make ur profile pic glow up :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let mentionedMember = message.mentions.members.first() || message.member;

      let avatar = mentionedMember.user.displayAvatarURL({ size: 4096, dynamic: false, format: "png" });
      let image = await canvacord.Canvas.sharpen(avatar);
      let attachment = new Discord.MessageAttachment(image, "sharpen.png");
      return message.channel.send(attachment);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
