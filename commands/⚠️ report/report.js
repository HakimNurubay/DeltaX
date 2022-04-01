const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "report",
  aliases: [],
  category: "⚠️ report",
  description: "If you find someone who against DeltaX TOs just report 'em.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let user = message.mentions.users.first();
      if (!user) return message.channel.send("Plz mention the user to report!").then((i) => i.delete({ timeout: 5000 }));

      let reason = args.slice(1).join(" ");
      if (!reason) return message.channel.send("Plz provide a reason!").then((i) => i.delete({ timeout: 5000 }));

      let Avatar = user.displayAvatarURL();

      const embed = new Discord.MessageEmbed()
        .setTitle("New Report!")
        .setDescription(`This Member <@${message.author.id}> has reported user <@${user.id}>`)
        .setColor("RED")
        .setThumbnail(Avatar)
        .addFields(
          { name: "Member ID", value: `${message.author.id}`, inline: true },
          { name: "Member Tag", value: `${message.author.tag}`, inline: true },
          { name: "Reported ID", value: `${user.id}`, inline: true },
          { name: "Reported Tag", value: `${user.tag}`, inline: true },
          { name: "Reason", value: `${reason}`, inline: true }
        );
      const REP = client.channels.cache.get("901745625232711770");
      REP.send(embed);
      message.reply("Done your report has been sent to the developers!!").then((i) => i.delete({ timeout: 5000 }));
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
