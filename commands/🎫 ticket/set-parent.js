const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "set-ticket-category",
  aliases: ["stc"],
  usage: "<mention category>",
  category: "🎫 ticket",
  description: "This command will set ur ticket categories.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) {
        const wrong = client.emojis.cache.find((x) => x.id === "911601188607258636");
        let category = args.join(" ");
        if (isNaN(category))
          return message.channel.send({
            embed: {
              color: 16734039,
              description: "You must enter valid category id",
            },
          });
        if (!category) return message.channel.send("Plz mention that channel wanna be welcome logs.");

        let Check = db.fetch(`ticketCategory_${message.guild.id}`);
        if (Check) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You was set the ticket before, try to delete it first**`).setColor("RED");
          return message.channel.send(embed);
        } else {
          message.channel.send(`Successfully set the ticket <#${category}>.`);
          await db.set(`ticketCategory_${message.guild.id}`, category);
        }
      } else {
        message.reply("You don't have premission to use that command.").then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
