const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ms = require("ms");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;
const config = require("../../config.json");

module.exports = {
  name: "g-start",
  aliases: [],
  usage: "<channel> <duration> <winners> <prize>",
  category: "🎉 giveaway",
  description: "",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("Please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const tada = client.emojis.cache.find((x) => x.id === emoji.tada);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!args.length) {
          return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} Usage : ${prefix}g-start <channel> <duration> <winners> <prize>**`)).then((msg) => msg.delete({ timeout: 50000 }));
        }
        let gchannel = message.mentions.channels.first();
        if (!gchannel) {
          return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} Plz Mention a Channel to Start Giveway**`)).then((msg) => msg.delete({ timeout: 10000 }));
        }

        let g_duration = args[1];
        if (!g_duration) {
          return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} Plz Provide the Valid Time Duration of Giveway**`)).then((msg) => msg.delete({ timeout: 10000 }));
        }

        let g_winners = parseInt(args[2]);
        if (isNaN(g_winners) || parseInt(g_winners) <= 0) {
          return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} Plz Provide the winner(s) For Giveaway**`)).then((msg) => msg.delete({ timeout: 10000 }));
        }

        let g_prize = args.slice(3).join(" ");
        if (!g_prize) {
          return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} Plz Enter the Prize to Start Giveway**`)).then((msg) => msg.delete({ timeout: 10000 }));
        }

        // start a giveway

        await client.giveawaysManager.start(gchannel, {
          // The giveaway duration
          time: ms(g_duration),
          // The giveaway prize
          prize: g_prize,
          // The giveaway winner count
          winnerCount: parseInt(g_winners),
          // Who hosts this giveaway
          hostedBy: config.hostedBy ? message.author : null,
          // Messages
          messages: {
            giveaway: (config.everyoneMention ? "@everyone\n" : "") + `${tada} **GIVEAWAY** ${tada}`,
            giveawayEnded: (config.everyoneMention ? "@everyone\n" : "") + `${tada} **GIVEAWAY ENDED** ${tada}`,
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: `React with ${tada} to participate!`,
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
              seconds: "seconds",
              minutes: "minutes",
              hours: "hours",
              days: "days",
              pluralS: false, // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            },
          },
        });

        message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`🎁 Giveaway started in ${gchannel}!`)).then((msg) => msg.delete({ timeout: 20000 }));
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
