const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ms = require("ms");
const { GiveawaysManager } = require("discord-giveaways");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;
const config = require("../../config.json");

module.exports = {
  name: "g-create",
  aliases: [],
  usage: "",
  category: "🎉 giveaway",
  description: "",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("Please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const tada = client.emojis.cache.find((x) => x.id === emoji.tada);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        const currentGiveaways = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id && !g.ended).length;
        let time = "";
        let winnersCount;
        let prize = "";
        let channel = "";
        let embed = new MessageEmbed().setTitle(`\`\` Create a Giveway \`\``).setColor("RANDOM").setTimestamp();
        const msg = await message.channel.send(embed.setDescription("Mention Channel in Which You Want to Start Giveway \n ** Reply Fast **"));
        let xembed = new MessageEmbed()
          .setTitle("`` Your Time is Expire ``")
          .setColor("RED")
          .setDescription(`You take too Much Time \n > Now type ${prefix}g-create to Create Giveway Again \n ** Don't Forgot Plz Replt Fast **`)
          .setTimestamp();

        const filter = (m) => m.author.id === message.author.id && !m.author.bot;
        const collector = await message.channel.createMessageCollector(filter, {
          max: 3,
          time: 30000,
        });

        collector.on("collect", async (collect) => {
          const response = collect.content;
          let chn = collect.mentions.channels.first() || message.guild.channels.cache.get(response);
          await collect.delete();
          if (!chn) {
            return msg.edit(embed.setDescription("`` Plz Provide a Valid Giveaway Channel to Start Giveway ``"));
          } else {
            channel = chn;
            collector.stop(msg.edit(embed.setDescription(`Plz Provide Giveway Duration to Start Giveway in ${channel} \n ** Reply Fast **`)));
          }
          const collector2 = await message.channel.createMessageCollector(filter, {
            max: 3,
            time: 30000,
          });
          collector2.on("collect", async (collect2) => {
            let mss = ms(collect2.content);
            await collect2.delete();
            if (!mss) {
              return msg.edit(embed.setDescription("You Provied me Invalid Duration Type Valid Duration for Example :- ``10 minutes , 10m``"));
            } else {
              time = mss;
              collector2.stop(msg.edit(embed.setDescription(`How many Winners You Need in Giveaway \n ** Plz Reply Fast **`)));
            }
            const collector3 = await message.channel.createMessageCollector(filter, {
              max: 3,
              time: 30000,
              errors: ["time"],
            });
            collector3.on("collect", async (collect3) => {
              const response3 = collect3.content.toLowerCase();
              await collect3.delete();
              if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
                return msg.edit(embed.setDescription("Oye , Winners Must Greater/Equal to 1 you can put more like 1-10 \n ** Plz Replt Fast **"));
              } else {
                winnersCount = parseInt(response3);
                collector3.stop(msg.edit(embed.setDescription(`Now Finnaly 90% Done , hehe \n Now Enter Prize of Giveway \n ** Plz Reply Fast **`)));
              }
              const collector4 = await message.channel.createMessageCollector(filter, { max: 3, time: 30000 });
              collector4.on("collect", async (collect4) => {
                const response4 = collect4.content.toLowerCase();
                prize = response4;
                await collect4.delete();
                collector4.stop(
                  msg.edit(
                    embed.setDescription(
                      " 🎁 Now , Do you want to have a server joining requirement for the giveaway? If yes, provide the server's permanent invite link!\n**Plz Reply Fast **\n**Bot Must Be In The Server!**\n**Respond with ``none`` If no requirements!**"
                    )
                  )
                );
                const collector5 = await message.channel.createMessageCollector(filter, { max: 1, time: 30000 });
                collector5.on("collect", async (collect5) => {
                  const response5 = collect5.content;
                  await collect5.delete();
                  if (response5.toLowerCase() !== "none") {
                    client.fetchInvite(response5).then(async (invite) => {
                      let client_is_in_server = client.guilds.cache.get(invite.guild.id);
                      if (!client_is_in_server) {
                        return message.channel.send({
                          embed: {
                            color: 000000,
                            author: {
                              name: client.user.username,
                              icon_url: client.user.avatarURL,
                            },
                            title: "You Must Join Server",
                            url: "https://youtube.com/c/HakimNurubay",
                            description: "Aww , I see New Server || For Server Link Requirement i am Must Invited in Invited Link Server",
                            timestamp: new Date(),
                            footer: {
                              icon_url: client.user.avatarURL,
                              text: "You Must Join Server",
                            },
                          },
                        });
                      }

                      collector5.stop(
                        msg.edit(
                          embed.setDescription(
                            `Finally || 🎁 Giveaway has been started in ${channel} for **${prize}** which will last for **${ms(time, {
                              long: true,
                            })}** and there will be **${winnersCount}** winner(s)! and users would have to join ${response5}`
                          )
                        )
                      );
                      client.giveawaysManager.start(channel, {
                        time: parseInt(time),
                        prize: prize,
                        hostedBy: config.hostedBy ? message.author : null,
                        winnerCount: parseInt(winnersCount),
                        messages: {
                          giveaway: "**Giveaway!**",
                          giveawayEnded: "**GIVEAWAY ENDED**",
                          timeRemaining: `**Time Remaining : {duration}**`,
                          inviteToParticipate: `**React with ${tada} to participate!**`,
                          winMessage: "Congratulations, {winners}! You won **{prize}**!",
                          embedFooter: "Giveaways",
                          hostedBy: "**Hosted By: {user}**",
                          noWinner: "**Uh Oh! Looks like we got no reactions on this giveaway :<**.",
                          winners: "Lucky Winner(s) In This Giveaway",
                          endedAt: "Winners rolled at",
                          units: {
                            seconds: "seconds",
                            minutes: "minutes",
                            hours: "hours",
                            days: "days",
                          },
                        },
                        extraData: {
                          server: `${invite.guild.id}`,
                        },
                      });
                    });
                  } else {
                    return message.channel.send(`**Plz use the command \`\`${prefix}g-start\`\` instead to make a giveaway without a server requirement**`);
                  }
                });
              });
            });
          });
        });
        collector.on("end", (collected, reason) => {
          if (reason == "time") {
            message.channel.send(xembed);
          }
        });
        try {
          collector2.on("end", (collected, reason) => {
            if (reason == "time") {
              message.channel.send(xembed);
            }
          });
          collector3.on("end", (collected, reason) => {
            if (reason == "time") {
              message.channel.send(xembed);
            }
          });
          collector4.on("end", (collected, reason) => {
            if (reason == "time") {
              message.channel.send(xembed);
            }
          });
          collector5.on("end", (collected, reason) => {
            if (reason == "time") {
              message.channel.send(xembed);
            }
          });
        } catch (e) {}
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
