const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "bandc",
  aliases: ["banserver"],
  category: "👑 owner",
  description: "",
  run: async (client, message, args) => {
    const check = client.emojis.cache.find((x) => x.id === emoji.check);
    const jonathan = client.emojis.cache.find((x) => x.id === emoji.jonathan);
    const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
    if (message.author.id == owner) {
      let guild = null;

      if (!args[0]) return message.channel.send("Enter the Name");

      if (args[0]) {
        let fetched = client.guilds.cache.find((g) => g.name === args.join(" "));
        let found = client.guilds.cache.get(args[0]);
        if (!found) {
          if (fetched) {
            guild = fetched;
          }
        } else {
          guild = found;
        }
      } else {
        return message.channel.send("Invalid Name!");
      }
      if (guild) {
        const Blacklisted = db.fetch(`blacklistedServer_${guild.id}`);
        if (Blacklisted == true) return message.channel.send("This Guild is already banned from DeltaX.");
        message.channel.send(`Successfully banned ${guild.name} from DeltaX.`);
        db.set(`blacklistedServer_${guild.id}`, true);

        const icon = guild.iconURL() || "https://cdn.discordapp.com/embed/avatars/1.png";

        const banlogEmbed = new Discord.MessageEmbed()
          .setTitle("New Banned Server!")
          .setDescription(`Server: \`${guild.name}\``)
          .setColor("RED")
          .setThumbnail(icon)
          .addFields({ name: "Banned ID", value: `${guild.id}`, inline: true });

        const banlog = client.channels.cache.get("925413550158123039");
        banlog.send(banlogEmbed);
      } else {
        return message.channel.send(`\`${args.join(" ")}\` - Bot is not in this server`);
      }
    } else {
      const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
      message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
    }
  },
};
