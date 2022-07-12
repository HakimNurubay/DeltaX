const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "getinvite",
  aliases: [],
  category: "👑 owner",
  description: "",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.author.id == owner) {
        let guild = null;
        
        const input = args[0]

        if (!input) return message.channel.send("Enter the Name");

        if (input) {
          let fetched = client.guilds.cache.find((g) => g.name === args.join(" "));
          let found = client.guilds.cache.get(input);
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
          let tChannel = guild.channels.cache.find((ch) => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
          if (!tChannel) {
            return message.channel.send("An Error Has Occured Try Again!");
          }
          let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch((err) => {
            return message.channel.send(`${err} has occured!`);
          });
          message.channel.send(invite.url);
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
