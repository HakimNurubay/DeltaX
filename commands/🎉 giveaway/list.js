const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ms = require("ms");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "g-list",
  aliases: [],
  usage: "<guild id>",
  category: "🎉 giveaway",
  description: "This command will get the list of the giveaways.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("Please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!args.length) {
          return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} Usage: ${prefix}g-list <g-ID>**`)).then((msg) => msg.delete({ timeout: 50000 }));
        }

        let g_ID = args[0];

        if (!g_ID) {
          return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} Plz Provide a Giveway ID**`)).then((msg) => msg.delete({ timeout: 50000 }));
        }

        let giveaways = client.giveawaysManager.giveaways.filter((g) => g.guildID === `${message.guild.id}` && !g.ended);

        if (!Array.isArray(giveaways)) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} No Giveway Found**`)).then((msg) => msg.delete({ timeout: 50000 }));

        let embed = new MessageEmbed().setTitle(`**Current Running Giveways**`).setColor("RANDOM").setTimestamp();
        await Promise.all(
          giveaways.map(async (x) => {
            if (x.extraData) {
              const guild = client.guilds.cache.get(x.extraData.server);
              const channel = guild.channels.cache.filter((channel) => channel.type === "text").first();
              const inv = await channel.createInvite();
              await embed.addField(
                `\`\`Join Requirement Giveaway:\`\``,
                `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})**\n**Requirement: [Join Now](${inv})**\n**Started At: \`${new Date(x.startAt)}\`**\n**Ends At:** \`${new Date(
                  x.endAt
                )}\`\n**Hosted By:** ${x.hostedBy}`
              );
            } else {
              embed.addField(
                `Normal Giveaway:`,
                `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})\nStarted At: \`${new Date(x.startAt)}\`**\n**Ends At:** \`${new Date(x.endAt)}\`\n**Hosted By:** ${x.hostedBy}`
              );
            }
          })
        );
        message.channel.send(embed).then((msg) => msg.delete({ timeout: 50000 }));
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
