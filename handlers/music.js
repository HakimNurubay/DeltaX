const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const DisTube = require("distube");
const Math = require("mathjs");
const emoji = require("../plugins/emojis.json");
const superagent = require("snekfetch");

module.exports = async (client, message, args, queue) => {
  const filters = ["3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "flanger", "haas", "mcompand", "phaser", "tremolo", "earwax"];
  client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: false, leaveOnEmpty: false, leaveOnFinish: false, leaveOnStop: false, youtubeDL: true, updateYouTubeDL: true });
  const statusd = (queue) =>
    `Volume: ${queue.volume}% | Filter: ${queue.filter || " ❌ Off"} | Loop: ${queue.repeatMode ? (queue.repeatMode == 2 ? "All Queue" : " ✅ This Song") : "Off"} | Autoplay: ${queue.autoplay ? " ✅ On" : " ❌ Off"}`;
  client.distube
    .on("playSong", (message, queue, song) => {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      let playingEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Now Playing`, "https://cdn.discordapp.com/emojis/932118876534214706.gif")
        .setDescription(`Song: [\`${song.name}\`](${song.url})`)
        .addField("Requested by:", `>>> ${song.user}`, true)
        .addField("Duration:", `>>> \`00:00 / ${song.formattedDuration}\``, true)
        .setThumbnail(song.thumbnail)
        .setFooter(statusd(queue));
      message.channel.send(playingEmbed).then(async (msg) => {
        await msg.react("⏭");
        await msg.react("⏯️");
        await msg.react("🔉");
        await msg.react("🔊");
        await msg.react("🔁");
        await msg.react("⏹");

        const filter = (reaction, user) => ["⏭", "⏯️", "🔉", "🔊", "🔁", "⏹"].includes(reaction.emoji.id || reaction.emoji.name) && user.id !== message.client.user.id;
        var collector = await msg.createReactionCollector(filter, {
          time: song.duration > 0 ? song.duration * 1000 : 600000,
        });

        collector.on("collect", async (reaction, user) => {
          //return if no queue available
          if (!queue) return;

          //create member out of the user
          const member = reaction.message.guild.member(user);

          //remoe the reaction
          reaction.users.remove(user);

          if (!member.voice.channel || member.voice.channel.id !== member.guild.me.voice.channel.id)
            return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`**${wrong} ${message.author}, You must join a Voice Channel**`)).then((i) => i.delete({ timeout: 5000 }));

          switch (reaction.emoji.id || reaction.emoji.name) {
            // pause and resume reaction

            case "⏭":
              reaction.users.remove(user).catch(console.error);
              client.distube.skip(message);
              message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`\`Song Skipped\` By ${message.author.username}`));
              collector.stop();
              break;

            case "⏯️":
              reaction.users.remove(user).catch(console.error);
              client.distube.resume(message);
              client.distube.pause(message);
              client.distube.resume(message);
              break;

            // decrease Volume
            case "🔉":
              reaction.users.remove(user).catch(console.error);
              if (queue.volume - 10 <= 0) queue.volume = 0;
              else queue.volume = queue.volume - 10;
              queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
              message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`🔉 Decreased the volume, the volume is now ${queue.volume}%`)).then((msg) => {
                msg.delete({
                  timeout: 5000,
                });
              });
              break;

            // increase Volume
            case "🔊":
              reaction.users.remove(user).catch(console.error);
              if (queue.volume + 10 >= 100) queue.volume = 100;
              else queue.volume = queue.volume + 10;
              queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
              message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`🔊 Increased the volume, the volume is now ${queue.volume}%`)).then((msg) => {
                msg.delete({
                  timeout: 5000,
                });
              });
              break;

            // Loop reaction
            case "🔁":
              reaction.users.remove(user).catch(console.error);
              const mode = ["off", "song", "queue"];
              const random = mode[Math.floor(Math.random() * mode.length)];
              client.distube.setRepeatMode(message, random);
              const embed = new Discord.MessageEmbed().setTitle(`🔁 Loop 🔁`).setDescription(`set loop to ${random}`).setColor("RANDOM").setFooter(`Requested by ${message.author.username}`);
              message.channel.send(embed);
              reaction.users.remove(message.author.id);
              break;

            case "⏹":
              reaction.users.remove(user).catch(console.error);
              queue.songs = [];
              message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`⏹ Music is Stopped by <@${message.author.id}>`));
              try {
                queue.connection.dispatcher.end();
              } catch (error) {
                console.error(error);
                queue.connection.disconnect();
              }
              collector.stop();
              break;

            default:
              reaction.users.remove(user).catch(console.error);
              break;
          }
        });
        collector.on("end", () => {
          msg.reactions.removeAll();
        });
      });
    })
    .on("addSong", (message, queue, song) => {
      let queueEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Added Song`, "https://cdn.discordapp.com/emojis/932118876534214706.gif")
        .setDescription(`Song: [\`${song.name}\`](${song.url})`)
        .addField("Requested by:", `>>> ${song.user}`, true)
        .addField("Duration:", `>>> \`00:00 / ${song.formattedDuration}\``, true)
        .setThumbnail(song.thumbnail)
        .setFooter(statusd(queue));
      message.channel.send(queueEmbed);
    })
    .on("playList", (message, queue, playlist, song) => {
      message.channel.send(`Play \`${playlist.name}\` playlist (${playing.songs.length} songs). \nRequested by: ${song.user}\nNow Playing \`${song.name}\`  -  \`${song.formattedDuration}\`\n${status(queue)}`);
    })
    .on("addList", (message, queue, playlist) => {
      `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue`;
    })
    .on("searchResult", (message, result) => {
      let i = 0;
      message.channel.send(`**Choose an option from below**\n${result.map((song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    .on("searchCancel", (message) => message.channel.send(`**Searching canceled!**`))
    .on("error", (message, e) => {
      console.error(e);
      message.channel.send("An error encountered: " + e);
    });
};
