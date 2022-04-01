const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "set-ticket-name",
  aliases: [],
  usage: "<<Ticket Name>",
  category: "🎫 ticket",
  description: "This command will set ur ticket name.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) {
        const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

        let TicketName = args.join(" ");
        if (TicketName.length > 15) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} Max title is 15 character, u just input ${TicketName.length} character, try to make it shorter**`).setColor("RED");
          return message.channel.send(embed);
        }
        if (!TicketName) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You must enter the name**`).setColor("RED");
          return message.channel.send(embed);
        }
        db.set(`TicketName_${message.guild.id}`, TicketName);
        message.channel.send("Successfully set the Ticket Name").then((i) => i.delete({ timeout: 5000 }));
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
