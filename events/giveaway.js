const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const client = require("../index");
const moment = require("moment");
const cooldown = new Set();
const prefix = require("../config.json").prefix;

/// giveawat bot

// Initialise discord giveaways
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  updateCountdownEvery: 10000,
  storage: "./json db/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "BLUE",
    reaction: "923230926601879572",
  },
});

/* Client's GiveawaysManager Events */
/*
client.giveawaysManager.on("giveawayReactionAdded", async (giveaway, reactor, messageReaction) => {
  if (reactor.user.bot) return;
  try {
    if (giveaway.extraData) {
      await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id);
    }
    reactor.send(
      new MessageEmbed()
        .setTimestamp()
        .setTitle(`Your Entery Approved || You Have Chance to Win`)
        .setDescription(`Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been approved!`)
        .setTimestamp()
    );
  } catch (error) {
    const guildx = client.guilds.cache.get(giveaway.extraData.server);
    messageReaction.users.remove(reactor.user);
    reactor.send(
      new MessageEmbed()
        .setTimestamp()
        .setTitle(" Your Entery Denied | Databse Entery Not Found & Returned!")
        .setDescription(`Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied as you did not join **${guildx.name}**`)
    );
  }
});
// Check if user reacts on an ended giveaway
client.giveawaysManager.on("endedGiveawayReactionAdded", (giveaway, member, reaction) => {
  reaction.users.remove(member.user);
  member.send(new MessageEmbed().setColor("RED").setDescription(`Uff , The Giveway is Already Ended`));
});
// Dm our winners
client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  winners.forEach((member) => {
    member.send(
      new MessageEmbed()
        .setTitle(`🎁 Yeah , Let's Go!`)
        .setDescription(
          `Hello there ${member.user}\n I heard that you have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})**\n Good Job On Winning **${giveaway.prize}!**\nDirect Message the host to claim your prize!!`
        )
        .setFooter(member.user.username, member.user.displayAvatarURL())
        .setTimestamp()
    );
  });
});
// Dm Rerolled winners
client.giveawaysManager.on("giveawayRerolled", (giveaway, winners) => {
  winners.forEach((member) => {
    member.send(
      new MessageEmbed()
        .setTitle(`🎁 Let's goo! We Have A New Winner`)
        .setDescription(
          `Hello there ${member.user}\n I heard that the host rerolled and you have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})**\n Good Job On Winning **${giveaway.prize}!**\nDirect Message the host to claim your prize!!`
        )
        .setFooter(member.user.username, member.user.displayAvatarURL())
        .setTimestamp()
    );
  });
});
// When They Remove Reaction
client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
  return member.send(
    new MessageEmbed()
      .setTimestamp()
      .setTitle("❓ Hold Up Did You Just Remove a Reaction From A Giveaway?")
      .setDescription(
        `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) was recorded but you un-reacted, since you don't need **${giveaway.prize}** I would have to choose someone else 😭`
      )
      .setFooter("Think It was a mistake? Go react again!")
  );
});
*/
