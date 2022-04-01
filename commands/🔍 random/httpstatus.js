const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const { STATUS_CODES } = require("http");
const fetch = require("node-fetch");
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "httpstatus",
  aliases: [],
  usage: "<status>",
  category: "🔍 random",
  description: "This command will take the output of ur code.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      const status = args[0];
      const repo = status;
      if (!repo) {
        const embed = new MessageEmbed().setColor("RED").setTitle(`${wrong} You didn't provide a Status`).setDescription(`Usage: \`${prefix}httpstatus <status>\``);
        return message.channel.send(embed);
      }
      // 599 isn't standard i think, not in Node.js but it's on http.cat so let's handle it.
      if (status !== "599" && !STATUS_CODES[status]) return message.channel.send("That's an invalid http status code.");
      const embed = new MessageEmbed()
        .setTitle("HTTP Cat")
        .setImage(encodeURI(`https://http.cat/${status}.jpg`))
        .setColor("RANDOM")
        .setDescription(status === "599" ? "Network Connect Timeout Error" : STATUS_CODES[status]);

      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
