const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const Canvacord = require("canvacord");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "rank",
  aliases: [],
  category: "ℹ️ info",
  description: "This command will check ur rank.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      var user = message.mentions.users.first() || message.author;
      var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
      var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
      var xpNeeded = level * 500 + 500;
      let background;
      let backgrounds = db.fetch(`backgroundR_${message.author.id}+${message.guild.id}`);
      if (backgrounds == null) {
        background = "https://mcdn.wallpapersafari.com/medium/65/78/J9BthR.jpg";
      } else {
        background = backgrounds;
      }
      const rankcard = new Canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ format: "png" }))
        .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
        .setRequiredXP(xpNeeded)
        .setStatus(user.presence.status)
        .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
        .setRank(1, "RANK", false)
        .setProgressBar("#a81d16", "COLOR")
        .setOverlay("#000000")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("IMAGE", `${background}`);
      rankcard.build().then((data) => {
        const attachement = new Discord.MessageAttachment(data, "rank.png");
        message.channel.send(attachement);
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
