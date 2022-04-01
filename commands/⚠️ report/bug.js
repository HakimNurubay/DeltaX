const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "bug",
  category: "⚠️ report",
  aliases: ["bug-report", "report-bug"],
  description: "Any bug? just report and we're fix it :)",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (!args[0]) {
        message.channel.send("Plz Includes Something to report!!");
        return;
      }
      let args1 = args.join(" ");
      const channel = client.channels.cache.get("905257257212731393");
      const embed = new Discord.MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`**Bug Reported**\n**Reporter:** <@!${message.member.id}>\n**Suggestion:** ${args1}\n**Server Name:** ${message.guild.name}\n**Channel Name:** ${message.channel.name}`)
        .setColor("RANDOM");
      channel.send(embed);
      message.reply("Done your bug report has been sent to the developers!!").then((i) => i.delete({ timeout: 5000 }));
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
