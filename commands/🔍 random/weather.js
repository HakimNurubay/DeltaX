const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const weather = require("weather-js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "weather",
  aliases: [],
  usage: "<city name>",
  category: "🔍 random",
  description: "Shows weather information",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (args.length === 0) {
        let errorembed = new MessageEmbed().setDescription(`**${wrong} Plz enter a location**`).setColor("RED");
        return message.channel.send(errorembed);
      }

      weather.find({ search: args.join(" "), degreeType: "C" }, function (err, result) {
        if (result.length === 0) {
          let errorembed = new MessageEmbed().setDescription(`**${wrong} Plz enter a vaild location**`).setColor("RED");
          return message.channel.send(errorembed);
        }

        var current = result[0].current;
        var location = result[0].location;
        if (err) {
          let errorembed = new MessageEmbed().setDescription(`**${wrong} Plz enter a vaild location**`).setColor("RED");
          return message.channel.send(errorembed);
        }

        let embed = new MessageEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Weather for ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor("RANDOM")
          .addField("Timezone", `UTC${location.timezone}`, true)
          .addField("Degree Type", location.degreetype, true)
          .addField("Temperature", `${current.temperature} Degrees`, true)
          .addField("Feels Like", `${current.feelslike} Degrees`, true)
          .addField("Winds", current.winddisplay, true)
          .addField("Humidity", `${current.humidity}%`, true)
          .setFooter(`Requested by ${message.author.tag}`)
          .setTimestamp();
        message.channel.send(embed);
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
