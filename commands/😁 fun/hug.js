const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const math = require("mathjs");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "hug",
  aliases: [],
  category: "😁 fun",
  description: "You can use this for hug someone :heart:",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!Member) return message.channel.send("Don't be a sad person, that you don't mention her/him!");

      images = [
        "https://i.pinimg.com/originals/85/72/a1/8572a1d1ebaa45fae290e6760b59caac.gif",
        "https://media3.giphy.com/media/l2QDM9Jnim1YVILXa/source.gif",
        "https://64.media.tumblr.com/2a3ec53a742008eb61979af6b7148e8d/tumblr_mt1cllxlBr1s2tbc6o1_500.gif",
        "https://media.tenor.com/images/59bd16406f4e5c78fb5caf51ce446e76/tenor.gif",
        "https://cdn.weeb.sh/images/rJCigAYFZ.gif",
        "https://cdn.weeb.sh/images/HkQs_dXPZ.gif",
        "https://cdn.weeb.sh/images/BJ0sOOmDZ.gif",
        "https://cdn.weeb.sh/images/Sk80wyhqz.gif",
        "https://cdn.weeb.sh/images/SJebhd1Ob.gif",
        "https://cdn.weeb.sh/images/rJnKu_XwZ.gif",
        "https://cdn.weeb.sh/images/Sy65_OQvZ.gif",
        "https://cdn.weeb.sh/images/HkfgF_QvW.gif",
        "https://cdn.weeb.sh/images/B10Tfknqf.gif",
        "https://cdn.discordapp.com/attachments/901050500240244766/901116281632206938/2QEa.gif",
        "https://cdn.weeb.sh/images/BkFnJsnA-.gif",
      ];

      personHugged = message.mentions.users.first();
      if (personHugged) {
        let hugEmbed = new Discord.MessageEmbed()
          .setTitle(`You hug ${personHugged.username} :heart:`)
          .setImage(images[math.floor(Math.random() * images.length)])
          .setColor("#035afc")
          .setTimestamp();
        message.channel.send(hugEmbed);
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
