const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "top-rank",
  aliases: [],
  category: "ℹ️ info",
  description: "This is will show Top Rank.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const { guild } = message;
      const banklb = args.join("bank");

      const mem = message.guild.members.cache;

      var level = db.fetch(`guild_${message.guild.id}_level_${mem}`, { sort: ".data" }) || 0;

      const difarr = [];
      guild.members.cache.forEach((user) => {
        difarr.push(user);
      });

      var allmember1en = difarr.length;
      let people = 0;
      let peopleToShow = 20;

      let mes = [];

      for (let i = 0; i < allmember1en; i++) {
        var amount = db.fetch(`guild_${message.guild.id}_level_${difarr[i].id}`);
        if (amount === null) amount = 0;
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

      let embed = new Discord.MessageEmbed().setTitle(`${message.guild.name} - Top Rank`).setDescription(fina1Lb).setColor("RANDOM").setFooter(`Requested by ${message.author.username}`).setTimestamp();
      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
