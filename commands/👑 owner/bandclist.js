const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "bandclist",
  aliases: [""],
  category: "👑 owner",
  description: "",
  run: async (client, message, args) => {
    const check = client.emojis.cache.find((x) => x.id === emoji.check);
    const jonathan = client.emojis.cache.find((x) => x.id === emoji.jonathan);
    const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
    if (message.author.id == owner) {
      const loading_m = client.emojis.cache.find((x) => x.id === "910091613437575208");

      const difarr = [];
      client.guilds.cache.forEach((user) => {
        difarr.push(user);
      });

      var allmember1en = difarr.length;
      let people = 0;
      let peopleToShow = 21;

      let mes = [];

      for (let i = 0; i < allmember1en; i++) {
        var ban = db.fetch(`blacklistedServer_${difarr[i].id}`);
        if (ban === null) continue;
        if (ban === false) continue;
        mes.push({
          name: difarr[i].name,
          id: difarr[i].id,
        });
      }

      const realArr = [];
      mes.sort((a, b) => b.id - a.id);
      for (let k = 0; k < mes.length; k++) {
        people++;
        if (people >= peopleToShow) continue;
        realArr.push(`${mes[k].name} - ${mes[k].id}`);
      }
      var fina1Lb = realArr
        .map((r) => r)
        .map((r, i) => `**${i + 1}.** ${r}`)
        .join("\n");

      let bembed = new Discord.MessageEmbed().setTitle(`Ban Server List of DeltaX`).setDescription(fina1Lb).setColor("RANDOM").setFooter(`Requested by ${message.author.username}`).setTimestamp();
      message.channel.send(bembed);
    } else {
      const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
      message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
    }
  },
};
