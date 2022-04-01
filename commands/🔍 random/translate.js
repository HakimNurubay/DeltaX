const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "translate",
  aliases: [],
  category: "🔍 random",
  description: "This command will translate ur text, you can see iso code here: https://www.loc.gov/standards/iso639-2/php/code_list.php",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const txt = args.slice(1).join(" ");
      const lang = args[0];
      if (!lang) {
        const embed = new Discord.MessageEmbed().setDescription("Plz provide a ISO code of the language!").setColor("#fc0303");
        message.channel.send(embed);
      }
      if (!txt) {
        const embed = new Discord.MessageEmbed().setDescription("Plz provide a text to translate!").setColor("#fc0303");
        message.channel.send(embed);
      }
      translate(txt, { to: lang })
        .then((res) => {
          const embed = new Discord.MessageEmbed().setDescription(res.text).setColor("RANDOM");
          message.channel.send(embed);
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
