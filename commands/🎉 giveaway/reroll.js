const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ms = require("ms");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "g-reroll",
  aliases: [],
  usage: "<id>",
  category: "🎉 giveaway",
  description: "This command will reroll the giveaway that was restarted before (doesn't support n!g-fast)",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("Please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!args.length) {
          return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} Usage: ${prefix}g-reroll <g-ID>**`)).then((msg) => msg.delete({ timeout: 50000 }));
        }

        let g_ID = args[0];

        if (!g_ID) {
          return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} Plz Provide a Giveway ID**`)).then((msg) => msg.delete({ timeout: 50000 }));
        }

        // try to found the giveaway with prize then with ID
        let giveaway =
          // Search with giveaway prize
          client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) ||
          // Search with giveaway ID
          client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // If no giveaway was found
        if (!giveaway) {
          return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} No Giveaway Found**`)).then((msg) => msg.delete({ timeout: 50000 }));
        }

        // Reroll the giveaway
        client.giveawaysManager
          .reroll(giveaway.messageID)
          .then(() => {
            // Success message
            message.channel.send(new MessageEmbed().setColor("GREEN").setDescription(`🎁 Giveaway ✅ SuccessFully Rerolled`)).then((msg) => msg.delete({ timeout: 50000 }));
          })
          .catch((e) => {
            if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
              message.channel.send(new MessageEmbed().setColor("RED").setDescription(`🎁 Giveaway is Not Ended!`)).then((msg) => msg.delete({ timeout: 50000 }));
            } else {
              message.channel.send(new MessageEmbed().setColor("RED").setDescription(e)).then((msg) => msg.delete({ timeout: 50000 }));
            }
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
