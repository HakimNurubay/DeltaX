const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "warn-list",
  aliases: ["warns"],
  category: "🛠️ moderator",
  description: "Thisc command will see the warning list of user per server.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        const { guild } = message;
        const warn = client.emojis.cache.find((x) => x.id === emoji.warn);

        const target = message.mentions.users.first();
        const difarr = [];
        guild.members.cache.forEach((user) => {
          difarr.push(user);
        });

        var allmember1en = difarr.length;
        let people = 0;
        let peopleToShow = 21;

        let mes = [];

        for (let i = 0; i < allmember1en; i++) {
          var amount = db.fetch(`warns_${difarr[i].id}+${message.guild.id}`);
          if (amount === null) continue;
          mes.push({
            name: difarr[i].user.username,
            amount: amount,
          });
        }

        const realArr = [];
        mes.sort((a, b) => b.amount - a.amount);
        for (let k = 0; k < mes.length; k++) {
          people++;
          if (people >= peopleToShow) continue;
          realArr.push(`${mes[k].name} - ${mes[k].amount}`);
        }
        var fina1Lb = realArr
          .map((r) => r)
          .map((r, i) => `**${i + 1}.** ${r}`)
          .join("\n");

        let bembed = new Discord.MessageEmbed().setTitle(`${warn} ${message.guild.name} - WARN LIST ${warn}`).setDescription(fina1Lb).setColor("RANDOM").setFooter(`Requested by ${message.author.username}`).setTimestamp();
        message.channel.send(bembed);
      } else {
        message.reply("You don't have permission").then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
