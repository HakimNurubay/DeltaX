const Discord = require("discord.js");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "unban",
  aliases: [],
  category: "🛠️ moderator",
  description: "This command will unban the someone has been banned.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      if (message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) {
        let reason = args.slice(1).join(" ");
        let userId = args[0];
        if (!reason) reason = "No reason provided";
        if (!userId) return message.reply("Plz provide a ID to unban").then((i) => i.delete({ timeout: 5000 }));
        if (isNaN(userId)) return message.reply("Plz provided a valid ID that is numbers").then((i) => i.delete({ timeout: 5000 }));

        message.guild.fetchBans().then(async (bans) => {
          if (bans.size === 0) return message.channel.send("No one is banned this server").then((i) => i.delete({ timeout: 5000 }));
          let BannedUser = bans.find((ban) => ban.user.id == userId);
          if (!BannedUser) return message.channel.send("This user isnt banned!");
          await message.guild.members
            .unban(BannedUser.user, reason)
            .catch((err) => {
              return message.channel.send("Something went wrong!");
            })
            .then(() => {
              message.channel.send(`Successfully unbanned ${userId}`).then((i) => i.delete({ timeout: 5000 }));
            });
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
