const Discord = require("discord.js");
const cooldown = new Set();
const { parse } = require("twemoji-parser");
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "addemoji",
  aliases: [],
  category: "🛠️ moderator",
  description: "This command will clear message with max amount is 100 message.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (message.member.hasPermission("MANAGE_EMOJIS", "ADMINISTRATOR")) {
        let isUrl = require("is-url");
        let type = "";
        let name = "";
        let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
        if (emote) {
          emote = emote[0];
          type = "emoji";
          name = args
            .join(" ")
            .replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "")
            .trim()
            .split(" ")[0];
        } else {
          emote = `${args.find((arg) => isUrl(arg))}`;
          name = args.find((arg) => arg != emote);
          type = "url";
        }
        let emoji = { name: "" };
        let Link;
        if (type == "emoji") {
          emoji = Discord.Util.parseEmoji(emote);
          Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`;
        } else {
          const embed1 = new Discord.MessageEmbed().setDescription(`**${wrong} Please provide a name**`).setColor("RED");
          if (!name) return message.channel.send(embed1);
          Link = message.attachments.first() ? message.attachments.first().url : emote;
        }
        message.guild.emojis
          .create(`${Link}`, `${`${name || emoji.name}`}`)
          .then((em) => message.channel.send(em.toString() + " added!"))
          .catch((error) => {
            message.channel.send(`${wrong} | an Error occured`);
            //console.log(error);
          });
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
