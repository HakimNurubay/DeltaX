const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "user",
  aliases: ["user-info", "ui", "whois"],
  category: "🌐 general info",
  description: "You can use this to see about you or about someone you tagged.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let mentionedMember = message.mentions.members.first() || message.member;

      var permissions = [];
      var acknowledgements = "None";

      var game = mentionedMember.presence.game;

      //emoji
      const discord_employee = client.emojis.cache.find((x) => x.id === "920988026170122242");
      const discord_partner = client.emojis.cache.find((x) => x.id === "920988026463727637");
      const bug_hunter1 = client.emojis.cache.find((x) => x.id === "920988026488897567");
      const bug_hunter2 = client.emojis.cache.find((x) => x.id === "920988026421780530");
      const hypesquad = client.emojis.cache.find((x) => x.id === "920988026077868052");
      const bravery = client.emojis.cache.find((x) => x.id === "920988025905885186");
      const brilliance = client.emojis.cache.find((x) => x.id === "920988025754898443");
      const dc_balance = client.emojis.cache.find((x) => x.id === "920988026316943430");
      const early_supporter = client.emojis.cache.find((x) => x.id === "920988026304352286");
      const dc_system = client.emojis.cache.find((x) => x.id === "920988025964621836");
      const verified_bot = client.emojis.cache.find((x) => x.id === "920988026878980096");
      const developer_badge = client.emojis.cache.find((x) => x.id === "920992206360309810");

      const flags = {
        DISCORD_EMPLOYEE: `${discord_employee}`,
        DISCORD_PARTNER: `${discord_partner}`,
        BUGHUNTER_LEVEL_1: `${bug_hunter1}`,
        BUGHUNTER_LEVEL_2: `${bug_hunter2}`,
        HYPESQUAD_EVENTS: `${hypesquad}`,
        HOUSE_BRAVERY: `${bravery}`,
        HOUSE_BRILLIANCE: `${brilliance}`,
        HOUSE_BALANCE: `${dc_balance}`,
        EARLY_SUPPORTER: `${early_supporter}`,
        TEAM_USER: "Team User",
        SYSTEM: `${dc_system}`,
        VERIFIED_BOT: `${verified_bot}`,
        VERIFIED_DEVELOPER: `${developer_badge}`,
      };

      const userFlags = mentionedMember.user.flags.toArray();

      var status = mentionedMember.presence.status;

      if (status == "dnd") status = "Do Not Disturb";
      if (status == "online") status = "Online";
      if (status == "offline") status = "Offline";
      if (status === "idle") status = "Idle";

      const roles = mentionedMember.roles.cache
        .sort((a, b) => b.position - a.position)
        .map((role) => role.toString())
        .slice(0, -1);

      let displayRoles;

      if (roles.length < 20) {
        displayRoles = roles.join(" ");
      } else {
        displayRoles = roles.slice(20).join(" ");
      }

      // Permissions
      if (mentionedMember.hasPermission("ADMINISTRATOR")) {
        permissions.push("Administrator");
      }

      if (mentionedMember.hasPermission("BAN_MEMBERS")) {
        permissions.push("Ban Members");
      }

      if (mentionedMember.hasPermission("DEAFEN_MEMBERS")) {
        permissions.push("Deafen Members");
      }

      if (mentionedMember.hasPermission("KICK_MEMBERS")) {
        permissions.push("Kick Members");
      }

      if (mentionedMember.hasPermission("MANAGE_CHANNELS")) {
        permissions.push("Manage Channels");
      }

      if (mentionedMember.hasPermission("MANAGE_EMOJIS")) {
        permissions.push("Manage Emojis and Stickers");
      }

      if (mentionedMember.hasPermission("MANAGE_GUILD")) {
        permissions.push("Manage Guild");
      }

      if (mentionedMember.hasPermission("MANAGE_MESSAGES")) {
        permissions.push("Manage Messages");
      }

      if (mentionedMember.hasPermission("MANAGE_NICKNAMES")) {
        permissions.push("Manage Nicknames");
      }

      if (mentionedMember.hasPermission("MANAGE_ROLES")) {
        permissions.push("Manage Roles");
      }

      if (mentionedMember.hasPermission("MANAGE_WEBHOOKS")) {
        permissions.push("Manage Webhooks");
      }

      if (mentionedMember.hasPermission("MOVE_MEMBERS")) {
        permissions.push("Move Members");
      }

      if (mentionedMember.hasPermission("MUTE_MEMBERS")) {
        permissions.push("Mute Members");
      }

      if (permissions.length == 0) {
        permissions.push("No Key Permissions Found");
      }

      if (mentionedMember.user.id == message.guild.ownerID) {
        acknowledgements = "Server Owner";
      }

      var createdDate = moment(mentionedMember.user.createdTimestamp).unix();

      var joinDate = moment(mentionedMember.joinedAt).unix();

      const userEmbed = new Discord.MessageEmbed()
        .setAuthor(`${mentionedMember.user.tag}`, mentionedMember.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setThumbnail(`${mentionedMember.user.displayAvatarURL({ dynamic: true })}`)
        .setDescription(`${mentionedMember.user.toString()}`)
        .addFields({ name: "ID", value: `${mentionedMember.user.id}`, inline: true }, { name: "Nickname", value: `${mentionedMember.user.username}`, inline: true })
        .addField(`Badges [${userFlags.length ? userFlags.length : "0"}]`, userFlags.map((flag) => flags[flag]).join(", ") || "None", false)
        .addFields(
          { name: "Status", value: `${status}`, inline: false },
          {
            name: "Created Date",
            value: `<t:${createdDate}:f> (<t:${createdDate}:R>)`,
            inline: false,
          },
          { name: "Join Date", value: `<t:${joinDate}:f> (<t:${joinDate}:R>)`, inline: false },
          { name: `Roles[${roles.length}]`, value: `${displayRoles}` || "None", inline: false }
        )
        .addField("\n__Permissions:__ ", `${permissions.join(`, `)}`)
        .setColor("RANDOM")
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTimestamp();
      message.channel.send(userEmbed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
