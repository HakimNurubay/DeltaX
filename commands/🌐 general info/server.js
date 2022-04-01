const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

const verificationLevels = {
  NONE: "None",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

const regions = {
  brazil: "Brazil",
  europe: "Europe",
  hongkong: "Hong Kong",
  india: "India",
  japan: "Japan",
  russia: "Russia",
  singapore: "Singapore",
  southafrica: "South Africa",
  sydney: "Sydney",
  "us-central": "US Central",
  "us-east": "US East",
  "us-west": "US West",
  "us-south": "US South",
};

module.exports = {
  name: "server",
  aliases: ["serverinfo", "server-info", "si"],
  category: "🌐 general info",
  description: "You can use this command to see about discord server.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      /*const roles = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map((role) => role.toString())
        .slice(0, -1);*/

      const members = message.guild.members.cache;

      const channels = message.guild.channels.cache;

      const emoji = message.guild.emojis.cache;

      const emojis = message.guild.emojis.cache
        .sort((a, b) => b.position - a.position)
        .map((emoji) => emoji.toString())
        .slice(0, 40);

      const roles = message.guild.roles.cache;

      let emojisdisplay;

      if (emojis.length < 20) {
        emojisdisplay = emojis.join(" ");
      } else {
        emojisdisplay = emojis.slice(20).join(" ");
      }

      //let rolesdisplay;

      /*if (roles.length < 20) {
        rolesdisplay = roles.join(" ");
      } else {
        rolesdisplay = roles.slice(20).join(" ");
      }*/

      var createdDate = moment(message.guild.createdTimestamp).unix();

      const { guild } = message;
      const { name, region, memberCount, owner } = guild;
      const icon = guild.iconURL() || "https://cdn.discordapp.com/embed/avatars/1.png";

      var serverEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Server info of ${name}`, icon)
        .setThumbnail(icon)
        .addFields({ name: "Server Owner", value: `<@${message.guild.owner.user.id}> (\`${message.guild.owner.user.tag}\`)`, inline: true }, { name: "ID", value: `${message.guild.id}`, inline: true })
        .addFields(
          { name: "Members", value: `${message.guild.memberCount}`, inline: false },
          { name: "Online Members", value: `${members.filter((member) => member.presence.status === "online").size}`, inline: false },
          { name: "Server Boost Status", value: `${message.guild.premiumSubscriptionCount || "0"} Boosts (\`Level ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : "0"}\`)`, inline: false }
        )
        .addFields({ name: "Roles", value: `${roles.size}`, inline: true }, { name: "Channels", value: `${channels.size}`, inline: true }, { name: "Created", value: `<t:${createdDate}:f> (<t:${createdDate}:R>)`, inline: false })
        .addField(`Emojis List[${emoji.size}]`, emojisdisplay ? emojisdisplay : "No Emojis")
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTimestamp();
      //.addField(`Roles [${roles.length - 1}]`, rolesdisplay)
      message.channel.send(serverEmbed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
