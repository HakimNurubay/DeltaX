const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "leavethis",
  aliases: [],
  category: "👑 owner",
  description: "",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.author.id == owner) {
        let guild = null;

        if (!args[0]) return message.channel.send("Enter the Name");

        if (args[0]) {
          let fetched = client.guilds.cache.find((g) => g.name === args.join(" "));
          let found = client.guilds.cache.get(args[0]);
          if (!found) {
            if (fetched) {
              guild = fetched;
            }
          } else {
            guild = found;
          }
        } else {
          return message.channel.send("Invalid Name!");
        }
        if (guild) {
          guild.leave();
          const embed = new Discord.MessageEmbed().setDescription(`**${check} Successfully left the server!**`).setColor("GREEN");
          message.channel.send(embed);
        } else {
          return message.channel.send(`\`${args.join(" ")}\` - Bot is not in this server`);
        }
      } else {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
