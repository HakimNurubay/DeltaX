const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ms = require("ms");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "g-fast",
  aliases: [],
  usage: "<time> <winner> <prize>",
  category: "🎉 giveaway",
  description: "This command will create quick giveaway that cannot reroll.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!args[0]) return message.channel.send(`**How long does the giveaway need to be?**`);
        if (!args[0].endsWith("s") && !args[0].endsWith("h") && !args[0].endsWith["d"] && !args[0].endsWith("m")) return message.channel.send(`**How long does the giveaway need to be?**`);
        if (isNaN(args[0][0])) return message.channel.send(`**How long does the giveaway need to be?**`);
        let winnerCount = args[1];
        let prize = args.slice(2).join(" ");
        if (!args[1]) return message.channel.send(`**How many people can win?**`);
        if (!args[2]) return message.channel.send(`**What is the prize for the giveaway?**`);
        message.delete();

        var botEmbed = new Discord.MessageEmbed()
          .setTitle("🎉**GIVEAWAY**🎉")
          .setDescription(`React with 🎉 to participated!\n**Giveaway Prize **${prize}\n**Giveaway Winners **${winnerCount}\n**Giveaway Ends: **${args[0]}\n**Giveaway Hosted By: **${message.author}`)
          .setColor("RANDOM")
          .setTimestamp(`Ends on ${Date.now() + ms(args[0])}`);

        var message = await message.channel.send(botEmbed);

        message.react("🎉");

        setTimeout(function () {
          var random = 0;
          var winners = [];
          var inList = false;

          var peopleReacted = message.reactions.cache.get("🎉").users.cache.array();

          for (let i = 0; i < peopleReacted.length; i++) {
            if (peopleReacted[i].id == client.user.id) {
              peopleReacted.splice(i, 1);
              continue;
            }
          }
          if (peopleReacted.length == 0) {
            var non = new Discord.MessageEmbed().setColor("RANDOM").setTitle("🎉**GIVEAWAY ENDS**🎉").setDescription(`There are no winners, because no body participated!\n**Giveaway Hosted By: **${message.author}`);
            message.edit(non);
            return message.channel.send(`There are no winners, because no body participated!`);
          }
          if (peopleReacted.length < winnerCount) {
            var non = new Discord.MessageEmbed().setColor("RANDOM").setTitle("🎉**GIVEAWAY ENDS**🎉").setDescription(`There are no winners, because no body participated!\n**Giveaway Hosted By: **${message.author}`);
            message.edit(non);
            return message.channel.send(`There are no winners, because no body participated!`);
          }
          for (let y = 0; y < winnerCount; y++) {
            inList = false;
            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {
              if (winners[0] == peopleReacted[random]) {
                inList = true;
                y--;
                break;
              }
            }
            if (!inList) {
              winners.push(peopleReacted[random]);
            }
          }
          var response = ``;
          for (let y = 0; y < winners.length; y++) {
            response += `${winners[y]}`;

            message.channel.send(`Congratulations ${response}! You won the **${prize}**`);

            var enteralEmbed = new Discord.MessageEmbed().setDescription(`${peopleReacted.length} enterals :arrow_upper_right:`).setColor("RANDOM");
            message.channel.send(enteralEmbed);
          }
        }, ms(args[0]));
      } else {
        message.reply("You don't have premission to use that command.");
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
