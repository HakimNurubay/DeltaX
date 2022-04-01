const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "dm",
  aliases: [],
  category: "👑 owner",
  description: "This command will dm someone by DeltaX.",
  run: async (client, message, args) => {
    const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
    if (message.author.id == owner) {
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || client.users.cache.get(args[0]);
      if (!user) return message.channel.send("Plz tag someone to DM her/him.").then((i) => i.delete({ timeout: 5000 }));

      let dm = args.slice(1).join(" ");
      if (!dm) return message.channel.send("Plz include what u wanna say.").then((i) => i.delete({ timeout: 5000 }));

      //user.send(dm) || user.user.send(dm)

      user.send(dm).catch((e) => {
        return message.channel.send("This user have closed DMs, i can't send DM to her/him.");
      });
    } else {
      const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
      message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
    }
  },
};
