const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "covid",
  aliases: [],
  category: "🔍 random",
  description: "To search about covid cases on each country.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let countries = args.join(" ");
      //

      //
      const noArgs = new Discord.MessageEmbed().setTitle("Invalid Command Usage").setColor("RANDOM").setDescription(`You Can Try Using **${prefix}covid Australia** or **${prefix}covid Singapore**`);
      //
      if (!args[0]) return message.channel.send(noArgs);

      //
      //fetching the data of all the countries
      fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then((response) => response.json())
        .then((data) => {
          //getting the data of the countries
          let confirmed = data.confirmed.value.toLocaleString();
          //let recovered = data.recovered.value.toLocaleString()
          let deaths = data.deaths.value.toLocaleString();

          //
          const embed = new Discord.MessageEmbed()
            .setTitle(`COVID-19 Stats for **${countries}**`)
            .addField("Confirmed Cases", confirmed)
            //.addField('Recovered', recovered)
            .addField("Deaths", deaths)
            .setColor("RANDOM");

          message.channel.send(embed);
        })
        .catch((e) => {
          //
          return message.channel.send("Invalid country provided");
        });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
