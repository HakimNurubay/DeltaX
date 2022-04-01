const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "giphy",
  aliases: [],
  usasge: "<search>",
  category: "🖼️ image",
  description: "This command will search a gif on giphy.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const search = args.join(" ");
      if (!search) return message.channel.send("Plz include what u wanna searching for");
      let giphyKey = "BRFq3vUeoeklrEci3QKlPrmliNpL5ScM";
      var GphApiClient = require("giphy-js-sdk-core");
      giphy = GphApiClient(giphyKey);
      giphy.search("gifs", { q: message.content.substring(5) }).then((response) => {
        var totalResponses = response.data.length;
        var responseIndex = Math.floor(Math.random() * 100 + 1) % totalResponses;
        var finalResponse = response.data[responseIndex];

        const embed = new Discord.MessageEmbed().setTitle(`Giphy Image: ${search}`).setImage(finalResponse.images.fixed_height.url).setURL(finalResponse.images.fixed_height.url).setColor("RANDOM").setFooter("Powered by GIPHY");
        message.channel.send(embed);
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
