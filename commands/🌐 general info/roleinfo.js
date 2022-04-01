const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "roleinfo",
  aliases: [],
  usage: "<role mention>/<role id>",
  category: "🌐 general info",
  description: "shows stats of the mentioned role.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const embed1 = new Discord.MessageEmbed().setDescription(`**${wrong} Plz Enter A Role**`).setColor("RED");
      const embed2 = new Discord.MessageEmbed().setDescription(`**${wrong} Plz Enter A Valid Role**`).setColor("RED");
      if (!args[0]) return message.channel.send(embed1);
      let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find((r) => r.name.toLowerCase() === args.join(" ").toLocaleLowerCase());
      if (!role) return message.channel.send(embed2);

      const status = {
        false: "No",
        true: "Yes",
      };

      const color = role.hexColor;

      let roleembed = new MessageEmbed()
        .setColor(color)
        .setAuthor(`Role Info`, message.guild.iconURL())
        .setThumbnail(message.guild.iconURL())
        .addField("**ID**", `\`${role.id}\``, true)
        .addField("**Name**", role.name, true)
        .addField("**Hex**", role.hexColor, true)
        .addField("**Members**", role.members.size, true)
        .addField("**Position**", role.position, true)
        .addField("**Mentionable**", status[role.mentionable], true)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL(), true)
        .setTimestamp();

      message.channel.send(roleembed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
