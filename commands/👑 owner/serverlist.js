const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "serverlist",
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
        let i0 = 0;
        let i1 = 10;
        let page = 1;

        let description =
          `Total Servers - ${client.guilds.cache.size}\n\n` +
          client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map((r) => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
            .slice(0, 10)
            .join("\n");

        let embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setColor("GREEN")
          .setFooter(client.user.username)
          .setTitle(`Page - ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
          .setDescription(description);

        let msg = await message.channel.send(embed);

        await msg.react("⬅");
        await msg.react("➡");
        await msg.react("❌");

        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

        collector.on("collect", async (reaction, user) => {
          if (reaction._emoji.name === "⬅") {
            // Updates variables
            i0 = i0 - 10;
            i1 = i1 - 10;
            page = page - 1;

            // if there is no guild to display, delete the message
            if (i0 + 1 < 0) {
              console.log(i0);
            }
            if (!i0 || !i1) {
            }

            description =
              `Total Servers - ${client.guilds.cache.size}\n\n` +
              client.guilds.cache
                .sort((a, b) => b.memberCount - a.memberCount)
                .map((r) => r)
                .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`)
                .slice(i0, i1)
                .join("\n");

            // Update the embed with new informations
            embed.setTitle(`Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`).setDescription(description);

            // Edit the message
            msg.edit(embed);
          }

          if (reaction._emoji.name === "➡") {
            // Updates variables
            i0 = i0 + 10;
            i1 = i1 + 10;
            page = page + 1;

            // if there is no guild to display, delete the message
            if (i1 > client.guilds.cache.size + 10) {
              return reaction.users.remove(message.author.id);
            }
            if (!i0 || !i1) {
            }

            description =
              `Total Servers - ${client.guilds.cache.size}\n\n` +
              client.guilds.cache
                .sort((a, b) => b.memberCount - a.memberCount)
                .map((r) => r)
                .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`)
                .slice(i0, i1)
                .join("\n");

            // Update the embed with new informations
            embed.setTitle(`Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`).setDescription(description);

            // Edit the message
            msg.edit(embed);
          }

          if (reaction._emoji.name === "❌") {
            return msg.delete();
          }

          // Remove the reaction when the user react to the message
          await reaction.users.remove(message.author.id);
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
