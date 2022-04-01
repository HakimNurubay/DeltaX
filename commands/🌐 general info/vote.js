const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "vote",
  aliases: ["votes"],
  category: "🌐 general info",
  description: "Let's keep support us :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const embed = new Discord.MessageEmbed()
        .setAuthor("Voting Required!", client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail("https://images.discordapp.net/icons/264445053596991498/a_8c65db889e7834620df19245d04dda5c.png?size=128")
        .setDescription("Hey This command is for vote DeltaX, Let's Vote us.\n[Click here to vote](https://top.gg/bot/900153413210365972/vote)")
        .setImage("https://cdn.discordapp.com/attachments/901050500240244766/913658636075683910/20211126_061303.png")
        .setColor("RANDOM");
      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
