const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const fetch = require("node-fetch");
const { MessageActionRow, MessageButton } = require("discord-buttons");
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;
const token = require("../../config.json").token;

module.exports = {
  name: "yttogether",
  aliases: ["yt-t"],
  category: "😁 fun",
  description: "This command will start the YouTube Together.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      let channel = message.member.voice.channel;
      if (!channel) return message.channel.send(`${wrong} You have to join voice channel first.`);

      fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
          max_age: 86400,
          max_uses: 0,
          target_application_id: "755600276941176913",
          target_type: 2,
          temporary: false,
          validate: null,
        }),
        headers: {
          Authorization: `Bot ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((invite) => {
          if (!invite.code) return message.channel.send("Oh crap i can't start the YT together.");
          const button = new MessageButton().setStyle("url").setURL(`https://discord.com/invite/${invite.code}`).setLabel(`Join`).setEmoji(emoji.youtube);
          const embed = new Discord.MessageEmbed()
            .setTitle("Youtube Together")
            .setThumbnail("https://cdn.discordapp.com/attachments/802891417310724147/844149868821741589/unknown.png")
            .setDescription("I just started a new Youtube Together session.")
            .setColor("RED");
          message.channel.send(embed, button).then((i) => i.delete({ timeout: 600000 }));
        });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
