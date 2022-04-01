const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const fetch = require("node-fetch");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "wikipedia-id",
  aliases: ["wiki-id"],
  category: "🔍 random",
  description: "This command will search something on Wikipedia",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const body = await fetch(`https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}`).then((res) => res.json().catch(() => {}));

      if (!body)
        return message.channel.sendmessage.channel.send({
          embed: {
            color: "RANDOM",

            title: "❌ Error Page Not Found.",
          },
        });

      if (body.title && body.title === "Not found.")
        return message.channel.send({
          embed: {
            color: "RANDOM",

            title: "❌ Error Page Not Found.",
          },
        });

      const embed = new Discord.MessageEmbed()

        .setTitle(`🌐 ${body.title} `)

        .addField(
          "More Info: ",

          `**[Click Here!](${body.content_urls.desktop.page})**`,

          true
        )

        .setDescription(`** ${body.extract}**`)

        .setColor(`RANDOM`)
        .setFooter(`DeltaX Bot WikiPedia Support`, client.user.displayAvatarURL())

        .setTimestamp();

      if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);

      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
