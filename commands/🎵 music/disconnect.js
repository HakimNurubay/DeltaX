const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const DisTube = require("distube");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "disconnect",
  aliases: [],
  category: "🎵 music",
  description: "This command will playing a song / add to queue that you have request.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (!message.member.voice.channel) {
        const embed = new Discord.MessageEmbed().setDescription(`${wrong} Plz connect to a voice channel first!`).setColor("#fc0303");
        message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
      } else {
        let queue = await client.distube.getQueue(message);
        if (!queue) {
          if (!message.guild.me.voice.channel) {
            const embed = new Discord.MessageEmbed().setDescription(`**${wrong} I'm not on vc right now!**`).setColor("RED");
            return message.channel.send(embed);
          }
          message.guild.me.voice.channel.leave();
          message.react("✅");
          const embed = new Discord.MessageEmbed().setDescription("Done i leave the voice channel!").setColor("#fc0303");
          message.channel.send(embed);
          return;
        }
        message.react("❌");
        const embed = new Discord.MessageEmbed().setDescription("You are still playing a music, stop it first!").setColor("#fc0303");
        message.channel.send(embed);
        return;
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
