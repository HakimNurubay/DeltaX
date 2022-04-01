const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const math = require("mathjs");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "punch",
  aliases: [],
  category: "😁 fun",
  description: "You can use this to punch someone :punch:",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!Member) return message.channel.send("Don't be a sad person, that you don't mention her/him!");

      images = [
        "https://cdn.weeb.sh/images/BkdyPTZWz.gif",
        "https://cdn.weeb.sh/images/rkkZP6Z-G.gif",
        "https://cdn.weeb.sh/images/HkFlwpZZf.gif",
        "https://cdn.weeb.sh/images/ryYo_6bWf.gif",
        "https://cdn.weeb.sh/images/SJR-PpZbM.gif",
        "https://cdn.weeb.sh/images/B1-ND6WWM.gif",
        "https://cdn.weeb.sh/images/rJHLDT-Wz.gif",
        "https://cdn.weeb.sh/images/SJvGvT-bf.gif",
        "https://cdn.weeb.sh/images/SJAfH5TOz.gif",
        "https://cdn.weeb.sh/images/B1rZP6b-z.gif",
        "https://cdn.weeb.sh/images/HJfGPTWbf.gif",
      ];

      personPunched = message.mentions.users.first();
      if (personPunched) {
        let punchEmbed = new Discord.MessageEmbed()
          .setTitle(`You punched ${personPunched.username} :punch:`)
          .setImage(images[math.floor(Math.random() * images.length)])
          .setColor("#035afc")
          .setTimestamp();
        message.channel.send(punchEmbed);
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
