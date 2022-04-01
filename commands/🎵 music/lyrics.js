const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const superagent = require("snekfetch");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "lyrics",
  aliases: [],
  usage: "<song name>",
  category: "🎵 music",
  description: "This command will search about lyrics.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const loading_m = client.emojis.cache.find((x) => x.id === emoji.dc_spin);
      const sus = client.emojis.cache.find((x) => x.id === emoji.sus);

      let title = args.join(" ");
      if (!title) {
        return message.channel.send("Plz provide the song name");
      }
      let embed = new MessageEmbed().setDescription("**Please wait, im looking for the Lyrics, It can take some `few ` seconds**.").setColor("FF0000");
      const msg = await message.channel.send(embed);

      superagent.get(`https://some-random-api.ml/lyrics?title=${title}`).end((err, response) => {
        const lyrics = response.body.lyrics;
        if (lyrics.length > 4095) {
          msg.delete();
          return message.channel.send("Lyrics are too long to be returned as embed");
        }

        let author = response.body.author;
        let title = response.body.title;
        let image = response.body.thumbnail.genius;

        if (lyrics.length < 2048) {
          const lyricsEmbed = new MessageEmbed()
            .setAuthor(author, "https://cdn.discordapp.com/emojis/932118876534214706.gif")
            .setTitle(title)
            .setDescription(lyrics.trim())
            .setThumbnail(image)
            .setColor(`RANDOM`)
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp();
          return msg.edit(lyricsEmbed);
        } else {
          // lyrics.length > 2048
          const firstLyricsEmbed = new MessageEmbed().setAuthor(author, "https://cdn.discordapp.com/emojis/932118876534214706.gif").setTitle(title).setColor("RANDOM").setDescription(lyrics.slice(0, 2048)).setThumbnail(image);
          const secondLyricsEmbed = new MessageEmbed().setColor("RANDOM").setDescription(lyrics.slice(2048, lyrics.length)).setFooter(`Requested by ${message.author.username}`).setTimestamp();
          msg.edit(firstLyricsEmbed);
          message.channel.send(secondLyricsEmbed);
          return;
        }
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
