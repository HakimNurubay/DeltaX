const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const axios = require("axios");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "djsdocs",
  aliases: ["djs", "docs"],
  usage: "<query>",
  category: "🔍 random",
  description: "Displays Discord.JS documentation.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let query = args.join(" ");

      if (!query) {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Plz provide the query**`).setColor("RED");
        return message.channel.send(embed);
      }

      const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;

      axios
        .get(uri)
        .then((embed) => {
          const { data } = embed;

          if (data && !data.error) {
            message.channel.send({ embed: data });
          } else {
            message.reply("Could not find that documentation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
