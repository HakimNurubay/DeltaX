const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const malScraper = require("mal-scraper");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "anime",
  aliases: [],
  category: "😁 fun",
  description: "This command will search about anime.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const search = `${args}`;
      if (!search) {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Plz provide a query to search**`).setColor("RED");
        return message.channel.send(embed);
      }

      malScraper.getInfoFromName(search).then((data) => {
        const malEmbed = new Discord.MessageEmbed()
          .setAuthor(`${args}`.split(",").join(" "))
          .setThumbnail(data.picture)
          .addFields(
            { name: "Premiered", value: `\`${data.premiered}\``, inline: true },
            { name: "Broadcast", value: `\`${data.broadcast}\``, inline: true },
            { name: "Genres", value: `\`${data.genres}\``, inline: true },
            { name: "English Title", value: `\`${data.englishTitle}\``, inline: true },
            { name: "Japanese Title", value: `\`${data.japaneseTitle}\``, inline: true },
            { name: "Type", value: `\`${data.type}\``, inline: true },
            { name: "Episodes", value: `\`${data.episodes}\``, inline: true },
            { name: "Rating", value: `\`${data.rating}\``, inline: true },
            { name: "Aired", value: `\`${data.aired}\``, inline: true },
            { name: "Score", value: `\`${data.score}\``, inline: true },
            { name: "Favorite", value: `\`${data.favorites}\``, inline: true },
            { name: "Ranked", value: `\`${data.ranked}\``, inline: true },
            { name: "Duration", value: `\`${data.duration}\``, inline: true },
            { name: "Studios", value: `\`${data.studios}\``, inline: true },
            { name: "Popularity", value: `\`${data.popularity}\``, inline: true },
            { name: "Members", value: `\`${data.members}\``, inline: true },
            { name: "Score Stats", value: `\`${data.scoreStats}\``, inline: true },
            { name: "Source", value: `\`${data.source}\``, inline: true },
            { name: "Synonyms", value: `\`${data.synonyms}\``, inline: true },
            { name: "Status", value: `\`${data.status}\``, inline: true },
            { name: "Identifier", value: `\`${data.id}\``, inline: true },
            { name: "Link", value: data.url, inline: true }
          )
          .setColor("RANDOM")
          .setTimestamp()
          .setFooter(`Requested ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send(malEmbed);
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
