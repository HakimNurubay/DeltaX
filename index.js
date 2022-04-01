const { Collection, MessageEmbed, Client } = require("discord.js");
const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord-buttons");
const db = require("quick.db");
const fetch = require("node-fetch");
const snipes = new Discord.Collection();
const canvacord = require("canvacord");
const fs = require("fs");
const Constants = require("./node_modules/discord.js/src/util/Constants.js");
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`;
const client = new Client({
  restTimeOffset: 0,
  shards: "auto",
  messageCacheLifetime: 60,
  partials: ["MESSAGE", "CHANNEL", "USER", "REACTION"],
  disableEveryone: true,
});
module.exports = client;
require(`./events/antiCrash.js`)(client);
require("./events/mongo.js")();
const disbut = require("discord-buttons");
disbut(client);
const emoji = require("./plugins/emojis.json");
const config = require("./config.json");
const mainprefix = config.mainprefix;
const defaultPrefix = require("./config.json").prefix;
const token = config.token;
const topgg_token = config.topgg_token;
const http = require("http");
const chalk = require("chalk");
const path = require("path");
client.events = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command", "events", "music"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
const Pings = new Collection();
const message = require("./commands/🏠 welcome/message");
const { description } = require("./commands/👑 owner/banlist");

const PORT = 3000 || 3001;
require("http")
  .createServer((_, res) => res.end("Uptime 🚀"))
  .listen(8080);

const { AutoPoster } = require("topgg-autoposter");

const poster = AutoPoster(topgg_token, client); // your discord.js or eris client

// optional
poster.on("posted", (stats) => {
  // ran when succesfully posted
  console.log(`Posted stats to Top.gg | ${stats.serverCount} servers`);
});

client.on("ready", () => {
  setInterval(() => {
    const status = `${client.guilds.cache.size} server! and ${client.users.cache.size} users!`;
    client.user.setPresence({
      afk: true,
      status: "online",
      activity: {
        name: status,
        type: "WATCHING",
      },
    });
  }, 10000);

  console.table({
    "Bot User:": `${client.user.tag}`,
    "Guild(s):": `${client.guilds.cache.size} Servers`,
    "Watching:": `${client.users.cache.size} Members`,
    "Prefix:": `${config.prefix}`,
    "Commands:": `${client.commands.size}`,
    "Discord.js:": `v${Discord.version}`,
    "Node.js:": `${process.version}`,
    "Plattform:": `${process.platform} ${process.arch}`,
    "Memory:": `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
  });

  console.log(`Bot ${client.user.tag} is going online!!`);

  const status = {
    online: "🟢 Online",
    iddle: "🟡 Idle",
    dnd: "🔴 DND",
    offline: "⚫ Offline",
  };

  const ping = `${Math.round(client.ws.ping)}`;

  var color;
  if (ping < 999) {
    color = "BLUE";
  } else {
    color = "RED";
  }

  const resEmbed = new Discord.MessageEmbed()
    .setTitle("⬆️ BOT RESTARTED ⬆️")
    .setThumbnail(client.user.displayAvatarURL())
    .addFields({ name: ":hourglass_flowing_sand: Ping", value: `${ping}ms`, inline: true }, { name: "Status", value: `${status[client.presence.status]}`, inline: true })
    .setColor(color)
    .setTimestamp();

  const Restart = client.channels.cache.get("904191625843048590");
  Restart.send(resEmbed);

});

client.on("message", async (message) => {
  const member = message.mentions.users.first();
  const timeout = 60000;
  Pings.set(`Pinged : ${member}`, Date.now() + timeout);

  setTimeout(() => {
    Pings.delete(`Pinged : ${member}`);
  }, timeout);
});

client.on("messageDelete", async (message) => {
  let ghostping = db.fetch(`gping_${message.guild.id}`);
  if (ghostping == "on") {
    const loading_m = client.emojis.cache.find((x) => x.id === emoji.dc_spin);
    const member = message.mentions.users.first() || message.mentions.guild.roles.everyone;
    if (member) {
      if (member == message.author) return;
      if (client) return;
      if (Pings.has(`Pinged : ${member}`)) {
        message.channel.send(
          new MessageEmbed()
            .setTitle(`${loading_m} Ghost Ping Detected ${loading_m}`)
            .addField(`Author`, message.author.tag, true)
            .addField(`Content`, message.content, true)
            .setColor("RANDOM")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        );
      }
    }
  }
});

client.on("messageDelete", async (message, channel) => {
  snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null,
  });
});

client.on("clickButton", async (button, message, potentialPartialReaction, potentialPartialUser) => {
  if (button.id == "she") {
    const member = button.clicker.member;
    if (member.roles.cache.has("901961214471594034")) {
      button.reply.send(`Removed <@&901961214471594034> from you.`, true);
      const role = button.guild.roles.cache.get("901961214471594034");
      await member.roles.remove(role);
    } else {
      button.reply.send(`Added <@&901961214471594034> to you.`, true);
      const role = button.guild.roles.cache.get("901961214471594034");
      await member.roles.add(role);
    }
  }

  if (button.id == "he") {
    const member = button.clicker.member;
    if (member.roles.cache.has("901961224932196363")) {
      button.reply.send(`Removed <@&901961224932196363> from you.`, true);
      const role = button.guild.roles.cache.get("901961224932196363");
      await member.roles.remove(role);
    } else {
      button.reply.send(`Added <@&901961224932196363> to you.`, true);
      const role = button.guild.roles.cache.get("901961224932196363");
      await member.roles.add(role);
    }
  }

  if (button.id == "lgbt") {
    const member = button.clicker.member;
    if (member.roles.cache.has("916612148090765363")) {
      button.reply.send(`Removed <@&916612148090765363> from you.`, true);
      const role = button.guild.roles.cache.get("916612148090765363");
      await member.roles.remove(role);
    } else {
      button.reply.send(`Added <@&916612148090765363> to you.`, true);
      const role = button.guild.roles.cache.get("916612148090765363");
      await member.roles.add(role);
    }
  }

  if (button.id == "ann") {
    const member = button.clicker.member;
    if (member.roles.cache.has("916612339057442816")) {
      button.reply.send(`Removed <@&916612339057442816> from you.`, true);
      const role = button.guild.roles.cache.get("916612339057442816");
      await member.roles.remove(role);
    } else {
      button.reply.send(`Added <@&916612339057442816> to you.`, true);
      const role = button.guild.roles.cache.get("916612339057442816");
      await member.roles.add(role);
    }
  }

  if (button.id == "giveaway") {
    const member = button.clicker.member;
    if (member.roles.cache.has("916612195876495360")) {
      button.reply.send(`Removed <@&916612195876495360> from you.`, true);
      const role = button.guild.roles.cache.get("916612195876495360");
      await member.roles.remove(role);
    } else {
      button.reply.send(`Added <@&916612195876495360> to you.`, true);
      const role = button.guild.roles.cache.get("916612195876495360");
      await member.roles.add(role);
    }
  }

  if (button.id == "MC") {
    const member = button.clicker.member;
    if (member.roles.cache.has("938038456574169158")) {
      button.reply.send(`Removed <@&938038456574169158> from you.`, true);
      const role = button.guild.roles.cache.get("938038456574169158");
      await member.roles.remove(role);
    } else {
      button.reply.send(`Added <@&938038456574169158> to you.`, true);
      const role = button.guild.roles.cache.get("938038456574169158");
      await member.roles.add(role);
    }
  }

  if (button.id == "upload") {
    const member = button.clicker.member;
    if (member.roles.cache.has("916612509480419328")) {
      button.reply.send(`Removed <@&916612509480419328> from you.`, true);
      const role = button.guild.roles.cache.get("916612509480419328");
      await member.roles.remove(role);
    } else {
      button.reply.send(`Added <@&916612509480419328> to you.`, true);
      const role = button.guild.roles.cache.get("916612509480419328");
      await member.roles.add(role);
    }
  }

  if (button.id == "partner") {
    const member = button.clicker.member;
    if (member.roles.cache.has("916612210078400573")) {
      button.reply.send(`Removed <@&916612210078400573> from you.`, true);
      const role = button.guild.roles.cache.get("916612210078400573");
      await member.roles.remove(role);
    } else {
      button.reply.send(`Added <@&916612210078400573> to you.`, true);
      const role = button.guild.roles.cache.get("916612210078400573");
      await member.roles.add(role);
    }
  }

  if (button.id == "deltax") {
    const member = button.clicker.member;
    if (member.roles.cache.has("916445092657647666")) {
      button.reply.send(`Removed <@&916445092657647666> from you.`, true);
      const role = button.guild.roles.cache.get("916445092657647666");
      await member.roles.remove(role);
    } else {
      button.reply.send(`Added <@&916445092657647666> to you.`, true);
      const role = button.guild.roles.cache.get("916445092657647666");
      await member.roles.add(role);
    }
  }
});

client.on("clickButton", async (button, message) => {
  if (button.id == "nuke") {
    const member = button.clicker.member;
    if (member.hasPermission("MANAGE_GUILD", "ADMINISTRATOR")) {
      var channel = client.channels.cache.get(button.channel.id);
      var posisi = channel.position;
      channel.clone().then((channel2) => {
        channel2.setPosition(posisi);
        channel.delete();

        channel2.send(`Nuked this channel`).then(channel2.send(`https://tenor.com/view/explosion-explode-clouds-of-smoke-gif-17216934`));
      });
    } else {
      button.channel.send(`${member}, I'm sorry u can't use this button.`).then((i) => i.delete({ timeout: 5000 }));
    }
  }

  if (button.id == "ncancel") {
    const member = button.clicker.member;
    if (member.hasPermission("MANAGE_GUILD", "ADMINISTRATOR")) {
      button.channel.bulkDelete(1);
      button.channel.send(":x: Cancelled").then((i) => i.delete({ timeout: 5000 }));
    } else {
      button.channel.send(`${member}, I'm sorry u can't use this button.`).then((i) => i.delete({ timeout: 5000 }));
    }
  }
});

client.on("guildMemberAdd", async (member) => {
  const { guild } = member;

  let background;
  let backgrounds = db.fetch(`backgroundW_${member.guild.id}`);
  if (backgrounds == null) {
    background = "https://cdn.discordapp.com/attachments/868292364517650483/898870746586177546/gradienta-ix_kUDzCczo-unsplash.png";
  } else {
    background = backgrounds;
  }
  const welcomeCard = new canvacord.Welcomer()
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setAvatar(member.user.displayAvatarURL({ format: "png" }))
    .setColor("title", "#923ce8")
    .setColor("username-box", "#923ce8")
    .setColor("discriminator-box", "#923ce8")
    .setColor("message-box", "#923ce8")
    .setColor("border", "#34068a")
    .setColor("avatar", "#550dd1")
    .setText("message", `${guild}`)
    .setBackground(`${background}`)
    .setMemberCount(member.guild.memberCount);

  let Wmessage;
  let Wmessages = db.fetch(`messageW_${member.guild.id}`);
  if (Wmessages == null) {
    Wmessage = `Hi ${member.user.toString()} welcome to **${guild}** 👋`;
  } else {
    Wmessage = Wmessages;
  }

  const welcomeChannelCheck = db.fetch(`welcomeChannel_${member.guild.id}`);
  if (welcomeChannelCheck == null) {
    return;
  } else {
    if (welcomeChannelCheck) {
      const getWelcomeChannel = await db.get(`welcomeChannel_${member.guild.id}`);
      const Wchannel = member.guild.channels.cache.get(getWelcomeChannel);
      if (!Wchannel) {
        return;
      }
      let attachment = new Discord.MessageAttachment(await welcomeCard.build(), "welcome.png");
      Wchannel.send(`${Wmessage}`, attachment).catch((e) => console.log(e));
    } else return;
  }
});

client.on("guildMemberRemove", async (member) => {
  const { guild } = member;

  let background;
  let backgrounds = db.fetch(`backgroundL_${member.guild.id}`);
  if (backgrounds == null) {
    background = "https://cdn.discordapp.com/attachments/868292364517650483/898870746586177546/gradienta-ix_kUDzCczo-unsplash.png";
  } else {
    background = backgrounds;
  }
  const leaveCard = new canvacord.Leaver()
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setAvatar(member.user.displayAvatarURL({ format: "png" }))
    .setColor("title", "#923ce8")
    .setColor("username-box", "#923ce8")
    .setColor("discriminator-box", "#923ce8")
    .setColor("message-box", "#923ce8")
    .setColor("border", "#34068a")
    .setColor("avatar", "#550dd1")
    .setText("message", `${guild}`)
    .setBackground(`${background}`)
    .setMemberCount(member.guild.memberCount);

  let Lmessage;
  let Lmessages = db.fetch(`messageL_${member.guild.id}`);
  if (Lmessages == null) {
    Lmessage = `See ya later ${member.user.toString()} on **${guild}** 😔`;
  } else {
    Lmessage = Lmessages;
  }

  const leaveChannelCheck = db.fetch(`leaveChannel_${member.guild.id}`);
  if (leaveChannelCheck == null) {
    return;
  } else {
    if (leaveChannelCheck) {
      const getLeaveChannel = await db.get(`leaveChannel_${member.guild.id}`);
      const Lchannel = member.guild.channels.cache.get(getLeaveChannel);
      if (!Lchannel) {
        return;
      }
      let attachment = new Discord.MessageAttachment(await leaveCard.build(), "leave.png");
      Lchannel.send(`${Lmessage}`, attachment).catch((e) => console.log(e));
    } else return;
  }
});

client.on("guildMemberAdd", async (member) => {
  if (member.guild.id !== "868139721237331978") return;
  const welcomeCard = new canvacord.Welcomer()
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setAvatar(member.user.displayAvatarURL({ format: "png" }))
    .setColor("title", "#923ce8")
    .setColor("username-box", "#923ce8")
    .setColor("discriminator-box", "#923ce8")
    .setColor("message-box", "#923ce8")
    .setColor("border", "#34068a")
    .setColor("avatar", "#550dd1")
    .setText("message", `${member.guild.name}`)
    .setBackground("https://wallpapercave.com/wp/wp3336005.jpg")
    .setMemberCount(member.guild.memberCount);

  let attachment = new Discord.MessageAttachment(await welcomeCard.build(), "welcome.png");
  const embed = new Discord.MessageEmbed()
    .setTitle(`Welcome to ${member.guild.name}`)
    .setDescription(`${member.user.toString()}\nBe sure to check :\n<#868290903129858088>, To read the rules.\n<#916611385306284033>, To get some role to start with.\n<#916304795957092392>, To chat with our community.`)
    .attachFiles(attachment)
    .setImage(`attachment://welcome.png`)
    .setColor("PURPLE");
  member.guild.channels.cache.get("868158330495979571").send(embed);
});

client.on("guildMemberAdd", async (member) => {
  let message2 = db.fetch(`nickm_${member.guild.id}`);
  if (message2 == null) {
    return;
  }

  const nick = `${message2} ` + `${member.user.username}`;

  //message2 = message2.replace("-username-", `${member.user.username}`);
  member.setNickname(nick);
});
client.on("guildMemberAdd", async (member) => {
  let autor = db.fetch(`autorole_${member.guild.id}`);
  if (autor == null) {
    return;
  }
  var role = member.guild.roles.cache.get(`${autor}`);
  if (!role) {
    return;
  }
  member.roles.add(role).catch((e) => console.log(e));
});

client.on("guildMemberAdd", async (member) => {
  const alt = require("discord-anti-alt");
  const account = new alt.config({
    days: 5, // only user who has less than 2 days ages will got kick
    options: "kick",
  });

  let antialt = db.fetch(`antialt_${member.guild.id}`);
  if (antialt == "enable") {
    let play = account.run(member);
    return;
  }
});

client.on("guildMemberAdd", async (member) => {
  let antibot = db.fetch(`antibot_${member.guild.id}`);
  if (antibot == "enable") {
    if (member.user.bot) {
      let reason = "Anti-Bot Enabled";
      member.kick(reason);
    }
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  require("./events/messageReactionAdd")(reaction, user);
});

client.on("messageReactionRemove", (reaction, user) => {
  require("./events/messageReactionRemove")(reaction, user);
});

const handleTalk = async (message) => {
  const request = require("request-promise-native");
  fetch.default(`http://api.brainshop.ai/get?bid=161947&key=GjCO3jFk9fF1ExoN&uid={message.author.id}&msg={message.content}`);
  const { chat } = require("./config.json");
  message.channel.startTyping(true);
  const options = {
    method: "GET",
    url: chat.url,
    qs: {
      bid: chat.bid,
      key: chat.key,
      uid: `DeltaX-${message.author.id}`,
      msg: message.content,
    },
    json: true,
  };
  let reply = await request(options);
  message.channel.stopTyping(true);
  await message.channel.send(reply.cnt);
};

client.on("message", async (message) => {
  if (message.channel.type === "dm") {
    const args = message.content.split(/\s+/g);

    if (message.author.bot) return;

    let intro = args.join(" ");
    if (intro) {
      const dx = client.emojis.cache.find((x) => x.id === emoji.deltax);
      await message.channel.send(`Ciao!\nI'm DeltaX ready for you! ${dx}`);
    }
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  let chatbot = db.fetch(`chatbotc_${message.guild.id}`);
  if (message.channel.id == chatbot) {
    return handleTalk(message);
  }

  let prefix = await db.get(`guildprefix_${message.guild.id}`);
  if (prefix === null) prefix = mainprefix;

  if (message.mentions.has(client.user)) {
    const adb = client.emojis.cache.find((x) => x.id === emoji.alldiscordbadge);
    message.channel.send(`${adb} My prefix for this server is ${prefix}`).then((i) => i.delete({ timeout: 5000 }));
  }
});

client.on("message", async (message) => {
  if (message.channel.type === "dm") {
    if (message.author.id == "900153413210365972") {
      return;
    } else {
      const dmEmbed = new Discord.MessageEmbed()
        .setTitle("New DM")
        .setThumbnail(message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setTimestamp()
        .setDescription(`**User:** ${message.author.tag}\n**User ID:** ${message.author.id}\n\n**Content:** \`\`\`${message.content}\`\`\``);

      const DMC = client.channels.cache.get("901665844281614336");
      DMC.send(dmEmbed);
    }
  }

  if (message.author.bot) return;

  const Blacklisted = db.fetch(`blacklistedUser_${message.author.id}`);

  if (!message.guild) return;

  const BlacklitServer = db.fetch(`blacklistedServer_${message.guild.id}`);
  //ANTILINK
  let antilink1 = db.fetch(`antilink_${message.guild.id}`);
  if (antilink1 == "on") {
    const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
    let inviteLink = [
      "discord.gg/",
      "dlsocrd.com/",
      "discordnitros.com/",
      "discgrd.com/",
      "discomd.com/",
      "discocd.com/",
      "discord-to.com/",
      "discord-up.com/",
      "discord.com/invite/",
      "dlsccord-apps.club",
      "disccord-apps.com/",
      "goo-gl.me/",
      "discord.gift",
      "discord.gifts/",
      "disceord.gift/",
      "snow.discordchristmas.com/",
      "discordnitro.com/",
    ];
    if (inviteLink.some((word) => message.content.toLowerCase().includes(word))) {
      await message.delete();
      const antilink = new Discord.MessageEmbed().setDescription(`**${wrong} No Advertisements in here**`).setColor("RED");
      return message.channel.send(antilink).then((i) => i.delete({ timeout: 5000 }));
    }
    if (message.content.includes("http://")) {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      await message.delete();
      const antilink = new Discord.MessageEmbed().setDescription(`**${wrong} Only https certified links allowed**`).setColor("RED");
      return message.channel.send(antilink).then((i) => i.delete({ timeout: 5000 }));
    }
  }

  if (!message.guild) return;
  //REMOVED UR AFK
  if (db.has(`afk-${message.author.id}+${message.guild.id}`)) {
    const oldReason = db.get(`afk-${message.author.id}+${message.guild.id}`);
    await db.delete(`afk-${message.author.id}+${message.guild.id}`);
    message.reply(`I was removed your afk, for reason: ${oldReason}`).then((i) => i.delete({ timeout: 5000 }));
  }

  let prefix = await db.get(`guildprefix_${message.guild.id}`);
  if (prefix === null) prefix = mainprefix;

  let prefixes = [`${defaultPrefix}`, `${prefix}`];

  let prefixChoose;
  prefixes.forEach((a) => {
    if (message.content.startsWith(a)) {
      prefixChoose = a;
    }
  });

  if (!message.content.startsWith(prefixChoose)) return;
  if (!message.guild) return;

  //TELL THEM IF I AFK
  let member = message.mentions.members.first();
  if (member) {
    if (db.get(`afk-${member.id}+${message.guild.id}`)) {
      message.channel.send(member.user.tag + " is AFK: " + db.get(`afk-${member.id}+${message.guild.id}`));
    }
  }

  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefixChoose.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  if (BlacklitServer == true) return message.channel.send("You can't use DeltaX on here, because this server has been banned from DeltaX.").then((i) => i.delete({ timeout: 5000 }));
  if (Blacklisted == true) return message.channel.send("You can't use DeltaX because you has been banned from DeltaX.").then((i) => i.delete({ timeout: 5000 }));
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args, prefixChoose);

  xp(message);

  function xp(message) {
    if (message.author.bot) return;
    const randomNumber = Math.floor(Math.random() * 50) + 100;
    db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber);
    db.add(`guild_${message.author.id}_xptotal_${message.author.id}`, randomNumber);
    var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
    var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`);
    var xpNeeded = level * 500;
    if (xpNeeded < xp) {
      var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1);
      db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded);
      message.channel.send(`Congrats ${message.author.username}, you leveled up, you are now level ${newLevel}`).then((i) => i.delete({ timeout: 5000 }));
    }
  }

  if (message.content.startsWith(`${prefixChoose}snipe`)) {
    let snipe = snipes.get(message.channel.id);
    if (!snipe) return message.channel.send("There are no deleted messages in this channel!");

    const embed = new Discord.MessageEmbed().setAuthor(`${snipe.author.tag}`, snipe.author.displayAvatarURL()).setColor("RANDOM").setDescription(snipe.content).setFooter(`Requested by ${message.author.username}`).setTimestamp();
    if (snipe.image) embed.setImage(snipe.image);
    message.channel.send(embed);
  }

  if (message.content.startsWith(`${defaultPrefix}bb`)) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      if (message.guild.id !== "868139721237331978") return message.reply("I'm Sorry this feature isn't avaialable for publics").then((i) => i.delete({ timeout: 5000 }));

      const { guild } = message;
      const icon = guild.iconURL();
      const embed = new Discord.MessageEmbed()
        .setTitle("Reaction Role")
        .setColor("WHITE")
        .addFields([
          { name: ":female_sign: She/her", value: "I am a girl!", inline: true },
          { name: ":male_sign: He/him", value: "I am a boy!", inline: true },
        ])
        .addField(`:rainbow_flag: Lesbian/gay`, `Let us know u if you are a..`)
        .addField(`:eyes: Announcement Ping`, `I want to know everything of the server!`)
        .addField(`:tada: Giveaway!`, `I always wanna be participated on giveaways!`)
        .addField(`🎮 Unlock EmperorMC`, `If you wanna play an amazing minecraft server, press Unlock EmperorMC!`)
        .addField(`:tv: Upload`, `Can i be the first viewer on the new video?`)
        .addField(`:champagne_glass: Partner Ping`, `If u wanna get pinged when there's someone was being a partner with us!`)
        .addField(`:newspaper2: DeltaX Updates`, `What's the new updates on DeltaX? Lemme see`)
        .setImage("https://i.imgur.com/fhVTAyV.gif")
        .setFooter("Hope you enjoy the server! :)", message.guild.iconURL({ dynamic: true, size: 2048 }));

      const button1 = new MessageButton().setStyle("green").setLabel("she/her").setID("she");

      const button2 = new MessageButton().setStyle("green").setLabel("he/him").setID("he");

      const button3 = new MessageButton().setStyle("green").setLabel("lesbian/gay").setID("lgbt");

      const button4 = new MessageButton().setStyle("green").setLabel("Announcement Ping").setID("ann");

      const button5 = new MessageButton().setStyle("green").setLabel("Giveaway Ping").setID("giveaway");

      const button6 = new MessageButton().setStyle("green").setLabel("Unlock EmperorMC").setID("MC");

      const button7 = new MessageButton().setStyle("green").setLabel("Upload Ping").setID("upload");

      const button8 = new MessageButton().setStyle("green").setLabel("Partner Ping").setID("partner");

      const button9 = new MessageButton().setStyle("green").setLabel("DeltaX Updates").setID("deltax");

      const row = new MessageActionRow().addComponents([button1, button2, button3, button4]);

      const row2 = new MessageActionRow().addComponents([button5, button6, button7, button8, button9]);

      message.channel.send({ embed: embed, components: [row, row2] });
    } else {
      message.reply("You don't have permission");
    }
  }

  const { guild } = message;
  const { name } = guild;
  const icon = guild.iconURL() || "https://cdn.discordapp.com/embed/avatars/1.png";
  //if (icon === null) return;

  const cmdEmbed = new Discord.MessageEmbed()
    .setTitle("New Command")
    .setThumbnail(icon)
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`**User:** ${message.author.tag}\n**User ID:** ${message.author.id}\n**Server Name:** ${name}\n**Channel Name:** ${message.channel.name}\n\n**Command:** \`\`\`${prefixChoose}${cmd}\`\`\``);

  const CMDL = client.channels.cache.get("901768565840039977");
  CMDL.send(cmdEmbed);
});

//client.login(process.env.TOKEN);
client.login(token);
