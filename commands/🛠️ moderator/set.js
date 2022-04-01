const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const { mainprefix } = require("../../config.json");

module.exports = {
  name: "set-prefix",
  aliases: ["setprefix"],
  usage: "<new prefix>",
  category: "🛠️ moderator",
  description: "This command will set the prefix on ur server.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (message.member.hasPermission("ADMINISTRATOR")) {
        let prefix = await db.get(`guildprefix_${message.guild.id}`);
        if (prefix === null) prefix = mainprefix;

        let newprefix = args[0];

        if (newprefix.length > 4) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} U can't enter more than 4 characters**`).setColor("RED");
          return message.channel.send(embed);
        }

        if (!newprefix) {
          const prefixembed = new Discord.MessageEmbed().setDescription(`**${wrong} Plz include the new prefix**`).setColor("RED");
          return message.channel.send(prefixembed);
        }
        let changedprefix = new Discord.MessageEmbed()
          .setTitle(`**Prefix Updated**`)
          .setColor(`RANDOM`)
          .setDescription(`** Old Value **\n${prefix}\n** New Value **\n${newprefix}`)
          .setFooter(message.guild.name, client.user.displayAvatarURL());
        db.delete(`guildprefix_${message.guild.id}`);
        db.set(`guildprefix_${message.guild.id}`, newprefix);
        return message.channel.send(changedprefix);
      } else {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
