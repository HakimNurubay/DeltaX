const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "pp",
  aliases: ["profile-picture"],
  category: "🖼️ image",
  description: "This command will show ur Profile Pic or someone Profile Pic that you have tagged.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (args[0] == "random") {
        let random = client.users.cache.random();
        let avatar = random.displayAvatarURL();
        const userPP = new Discord.MessageEmbed()
          .setTitle(`${random.username}'s Avatar`)
          .setURL(`${random.displayAvatarURL({ size: 4096, dynamic: true })}`)
          .setImage(`${random.displayAvatarURL({ size: 4096, dynamic: true })}`)
          .setColor("RANDOM")
          .setFooter(`Requested by ${message.author.username}`)
          .setTimestamp();
        message.channel.send(userPP);
      } else {
        let mentionedMember = message.mentions.members.first() || message.member;

        const userPP = new Discord.MessageEmbed()
          .setTitle(`${mentionedMember.user.username}'s Avatar`)
          .setURL(`${mentionedMember.user.displayAvatarURL({ size: 4096, dynamic: true })}`)
          .setImage(`${mentionedMember.user.displayAvatarURL({ size: 4096, dynamic: true })}`)
          .setColor("RANDOM")
          .setFooter(`Requested by ${message.author.username}`)
          .setTimestamp();
        message.channel.send(userPP);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
