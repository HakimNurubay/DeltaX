const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  category: "🌱 economy",
  description: "This is will show Global Leaderboard.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const { guild } = message;
      const coin = client.emojis.cache.find((x) => x.id === emoji.coin);
      const banklb = args.join("bank");
      //
      if (args[0] == "global") {
        let money = db.fetch(`money_${message.guild.id}`, { sort: ".data" }) + (`money_${message.guild.id}`, { sort: ".data" });
        if (money === null) money = 0;

        const loading_m = client.emojis.cache.find((x) => x.id === emoji.dc_spin);

        const difarr = [];
        client.users.cache.forEach((user) => {
          difarr.push(user);
        });

        var allmember1en = difarr.length;
        let people = 0;
        let peopleToShow = 20;

        let mes = [];

        for (let i = 0; i < allmember1en; i++) {
          var amount = db.fetch(`money_${difarr[i].id}`);
          if (amount === null) amount = 0;
          var bank = db.fetch(`bank_${difarr[i].id}`);
          if (bank === null) bank = 0;
          mes.push({
            name: difarr[i].username,
            amount: amount + bank,
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

        let bembed = new Discord.MessageEmbed().setTitle(`${loading_m} Global Leaderboard ${loading_m}`).setDescription(fina1Lb).setColor("RANDOM").setFooter(`Requested by ${message.author.username}`).setTimestamp();
        message.channel.send(bembed);
      } else {
        let money = db.fetch(`money_${message.guild.id}`, { sort: ".data" }) + (`money_${message.guild.id}`, { sort: ".data" });
        if (money === null) money = 0;

        const difarr = [];
        guild.members.cache.forEach((user) => {
          difarr.push(user);
        });

        var allmember1en = difarr.length;
        let people = 0;
        let peopleToShow = 21;

        let mes = [];

        for (let i = 0; i < allmember1en; i++) {
          var amount = db.fetch(`money_${difarr[i].id}`);
          if (amount === null) amount = 0;
          var bank = db.fetch(`bank_${difarr[i].id}`);
          if (bank === null) bank = 0;
          mes.push({
            name: difarr[i].user.username,
            amount: amount + bank,
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

        let embed = new Discord.MessageEmbed().setTitle(`${coin} Richest users in ${message.guild.name}`).setDescription(fina1Lb).setColor("RANDOM").setFooter(`Requested by ${message.author.username}`).setTimestamp();
        message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
