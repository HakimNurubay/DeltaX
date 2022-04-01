const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const math = require("mathjs");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "slap",
  aliases: [],
  category: "😁 fun",
  description: "This command will slap someone that you have tagged.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!Member) return message.channel.send("Don't be a sad person, that you don't mention her/him!");

      images = [
        "https://cdn.weeb.sh/images/rJYqQyKv-.gif",
        "https://cdn.weeb.sh/images/ry2tWxcyf.gif",
        "https://cdn.weeb.sh/images/BJ8o71tD-.gif",
        "https://cdn.weeb.sh/images/r1PXzRYtZ.gif",
        "https://cdn.weeb.sh/images/B1oCmkFw-.gif",
        "https://cdn.weeb.sh/images/H16aQJFvb.gif",
        "https://cdn.weeb.sh/images/ByTR7kFwW.gif",
        "https://cdn.weeb.sh/images/SkZTQkKPZ.gif",
        "https://cdn.weeb.sh/images/HJfXM0KYZ.gif",
        "https://cdn.weeb.sh/images/SkKn-xc1f.gif",
        "https://cdn.weeb.sh/images/Sk9mfCtY-.gif",
        "https://cdn.weeb.sh/images/ryv3myFDZ.gif",
        "https://cdn.weeb.sh/images/B1-nQyFDb.gif",
      ];

      personSlapped = message.mentions.users.first();
      if (personSlapped) {
        let slapEmbed = new Discord.MessageEmbed()
          .setTitle(`You slap ${personSlapped.username} :raised_hand:`)
          .setImage(images[math.floor(Math.random() * images.length)])
          .setColor("#035afc")
          .setTimestamp();
        message.channel.send(slapEmbed);
      } else {
        const embed = new Discord.MessageEmbed().setDescription(`That person is not in this guild.`).setColor("#fc0303");
        message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
