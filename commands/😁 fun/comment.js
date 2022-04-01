const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const canvacord = require("canvacord");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "comment",
  aliases: [],
  category: "😁 fun",
  description: "Let's comment like on YouTube :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let yee = false;
      message.channel.startTyping(true);
      let avatar = message.author.displayAvatarURL({ dynamic: false, format: "png" });
      let image = await canvacord.Canvas.youtube({
        username: message.author.username,
        content: args.join(" "),
        avatar: avatar,
      }).catch((err) => {
        yee = true;
        message.channel.stopTyping(true);
        return message.channel.send(err.toString());
      });

      if (!yee) {
        let attachment = new Discord.MessageAttachment(image, "comment.png");
        message.channel.send({ embed: { description: "commenting" } }).then((message) => {
          setTimeout(function () {
            message.delete().then((message) => {
              message.channel.send(attachment);
            });
          }, 5000);
        });
        message.channel.stopTyping(true);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
