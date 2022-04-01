const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const emoji = require("../../plugins/emojis.json");
const owner = require("../../config.json").owner;
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "banbot",
  aliases: [""],
  category: "👑 owner",
  description: "",
  run: async (client, message, args) => {
    const check = client.emojis.cache.find((x) => x.id === emoji.check);
    const jonathan = client.emojis.cache.find((x) => x.id === emoji.jonathan);
    const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
    if (message.author.id == owner) {
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || client.users.cache.get(args[0]);
      if (!user) return message.channel.send("Plz mention a someone to banned from DeltaX.");
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "No Reason Provided";
      const Blacklisted = db.fetch(`blacklistedUser_${user.id}`);
      if (Blacklisted == true) return message.channel.send("This user is already banned from DeltaX.");
      message.channel.send(`Successfully banned ${user.username} from DeltaX.`);
      db.set(`blacklistedUser_${user.id}`, true);

      let embed = new Discord.MessageEmbed().setDescription(`${jonathan} You have been banned from DeltaX Bot.\nReason: ${reason}`).setColor("#FFFF00");
      user.send(embed).catch((e) => {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} I can't send message to that user**`).setColor("#F04A47");
        return message.channel.send(embed);
      });
    } else {
      const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You don't have permission**`).setColor("#F04A47");
      message.channel.send(embed).then((i) => i.delete({ timeout: 5000 }));
    }

    const target = message.mentions.users.first();
    let Avatar = target.displayAvatarURL();

    const banlogEmbed = new Discord.MessageEmbed()
      .setTitle("New Banned User!")
      .setDescription(`User: <@!${target.id}>`)
      .setColor("RED")
      .setThumbnail(Avatar)
      .addFields({ name: "Banned ID", value: `${target.id}`, inline: true }, { name: "Banned Tag", value: `${target.tag}`, inline: true });

    const banlog = client.channels.cache.get("906117646410452992");
    banlog.send(banlogEmbed);
  },
};
