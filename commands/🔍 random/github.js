const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "github",
  aliases: [],
  category: "🔍 random",
  description: "To check github profile.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const gname = args.join(" ");
      if (!gname) return message.reply("Provide A Valid User To Search."); // If User Is Not Found On GitHub
      const url = `https://api.github.com/users/${gname}`; // Link From BOT Will Get Info

      let response;
      try {
        response = await fetch(url).then((res) => res.json());
      } catch (e) {
        return message.reply("An Error Occured, Try Again Later.");
      }

      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${response.login}(${response.id})`)
        .setURL(response.html_url)
        .setThumbnail(response.avatar_url)
        .setDescription(response.bio ? response.bio : "No Bio") // Bio Of User Searched
        .addField("Public Repositories:-", response.public_repos.toLocaleString()) // Repos Of User Searched
        .addField("Followers:-", response.followers.toLocaleString()) // Followers Of User Searched
        .addField("Following:-", response.following.toLocaleString()) // How Many Following Of User Searched
        .addField("Email:-", response.email ? response.email : "No Email") // Email Of User Searched
        .addField("Company:-", response.company ? response.commands : "No Company") // Company Of User Searched
        .addField("Location:-", response.location ? response.location : "No Location"); // Location Of User Searched
      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
