const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const math = require("mathjs");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "kiss",
  aliases: [],
  category: "😁 fun",
  description: "You can use this for kiss someone :kiss:",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!Member) return message.channel.send("Don't be a sad person, that you don't mention her/him!");

      images = [
        "https://cdn.weeb.sh/images/ByoCoT_vW.gif",
        "https://cdn.weeb.sh/images/BkLQnT_PZ.gif",
        "https://cdn.weeb.sh/images/Bkuk26uvb.gif",
        "https://cdn.weeb.sh/images/Sk1k3TdPW.gif",
        "https://cdn.weeb.sh/images/rymvn6_wW.gif",
        "https://cdn.weeb.sh/images/HkZyXs3A-.gif",
        "https://cdn.weeb.sh/images/Bkk_hpdv-.gif",
        "https://cdn.weeb.sh/images/B1NwJg9Jz.gif",
        "https://cdn.weeb.sh/images/SJINn6OPW.gif",
        "https://cdn.weeb.sh/images/BkLQnT_PZ.gif",
        "https://cdn.weeb.sh/images/H1e7nadP-.gif",
        "https://cdn.weeb.sh/images/S1PCJWASf.gif",
        "https://cdn.weeb.sh/images/r1mcJlFVz.gif",
        "https://cdn.weeb.sh/images/HklBtCvTZ.gif",
        "https://cdn.weeb.sh/images/ryceu6V0W.gif",
        "https://cdn.weeb.sh/images/B12LhT_Pb.gif",
      ];

      personKisses = message.mentions.users.first();
      if (personKisses) {
        let kissEmbed = new Discord.MessageEmbed()
          .setTitle(`You kisses ${personKisses.username} :kiss:`)
          .setImage(images[math.floor(Math.random() * images.length)])
          .setColor("#035afc")
          .setTimestamp();
        message.channel.send(kissEmbed);
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
