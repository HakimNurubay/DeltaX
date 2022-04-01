const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const client = require("../../index");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

client.on("clickButton", async (button, message) => {
  const sourcebin = require("sourcebin_js");
  try {
    if (button.id == "createTicket") {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      var adminRole = db.fetch(`TicketAdminRole_${button.guild.id}`);
      var parent = db.fetch(`ticketCategory_${button.guild.id}`);
      var nameer = `ticket-${button.clicker.user.id}`;
      var checkTickets = button.guild.channels.cache.find((c) => c.name == nameer.split(" ").join("-").toLocaleLowerCase());
      if (checkTickets) {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You already open ticket before**`).setColor(0xff0000);
        button.reply.send(embed, true);
        return;
      }
      if (parent) {
        button.guild.channels
          .create(`ticket-${button.clicker.user.id}`, {
            permissionOverwrites: [
              {
                id: adminRole,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
              {
                id: button.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"],
              },
              {
                id: button.clicker.user.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
            ],
            parent: parent,
            reason: "None",
          })
          .then(async (channel) => {
            await button.reply.send(`Ticket created ${channel}`, true);
            let btn = new MessageButton().setStyle("grey").setEmoji("🔒").setLabel("Close").setID("TClose");
            let row = new MessageActionRow().addComponent(btn);
            const embed = new Discord.MessageEmbed()
              .setDescription(`Support will be with you shortly.\nTo close this ticket react with 🔒`)
              .setColor("GREEN")
              .setFooter("DeltaX Ticket Tool - Ticketing without clutter", client.user.displayAvatarURL());

            channel.send(`<@${button.clicker.user.id}> Welcome`, {
              embed: embed,

              component: row,
            });
            channel.setTopic(`Ticket for ${button.clicker.user.tag}\nReason: Nothing`);
          });
      } else {
        button.guild.channels
          .create(`ticket-${button.clicker.user.id}`, {
            permissionOverwrites: [
              {
                id: adminRole,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
              {
                id: button.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"],
              },
              {
                id: button.clicker.user.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
            ],
            reason: "None",
          })
          .then(async (channel) => {
            await button.reply.send(`Ticket created ${channel}`, true);
            let btn = new MessageButton().setStyle("grey").setEmoji("🔒").setLabel("Close").setID("TClose");
            let row = new MessageActionRow().addComponent(btn);
            const embed = new Discord.MessageEmbed()
              .setDescription(`Support will be with you shortly.\nTo close this ticket react with 🔒`)
              .setColor("GREEN")
              .setFooter("DeltaX Ticket Tool - Ticketing without clutter", client.user.displayAvatarURL());

            channel.send(`<@${button.clicker.user.id}> Welcome`, {
              embed: embed,

              component: row,
            });
            channel.setTopic(`Ticket for ${button.clicker.user.tag}\nReason: Nothing`);
          });
      }
    } else if (button.id == "TClose") {
      button.reply.defer();
      let ch = button.channel;
      if (!ch) return;
      let btn = new MessageButton().setStyle("blurple").setEmoji("📝").setLabel("Transcript").setID("trans");
      let btn2 = new MessageButton().setStyle("red").setEmoji("🗑️").setLabel("Delete").setID("Tdelete");
      let row = new MessageActionRow().addComponent(btn).addComponent(btn2);

      const closemebed = new Discord.MessageEmbed().setDescription(`Ticket has been closed by ${button.clicker.user.tag}`).setColor(`YELLOW`);
      ch.send(closemebed);

      ch.send({ embed: { description: "```Support team ticket controls```", color: 0x2f3136 }, component: row });

      var adminRole = db.fetch(`TicketAdminRole_${button.guild.id}`);
      button.channel.overwritePermissions([
        {
          id: adminRole,
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
        },
        {
          id: button.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"],
        },
        {
          id: button.clicker.user.id,
          deny: ["VIEW_CHANNEL"],
        },
      ]);
      ch.setName(`closed-ticket`);
    } else if (button.id == "Tdelete") {
      button.reply.defer();
      button.channel.send({
        embed: {
          description: "Ticket will be deleted in a few seconds",
          color: 0xff0000,
        },
      });
      setTimeout(() => {
        button.channel.delete();
      }, 1000 * 4.3);
    } else if (button.id == "trans") {
      button.reply.defer();
      button.channel.messages.fetch().then(async (messages) => {
        const output = messages
          .array()
          .reverse()
          .map((m) => `${new Date(m.createdAt).toLocaleString("en-US")} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`)
          .join("\n");

        let response;
        try {
          response = await sourcebin.create(
            [
              {
                name: " ",
                content: output,
                languageId: "text",
              },
            ],
            {
              title: `Chat transcript for ${button.channel.name}`,
              description: " ",
            }
          );
        } catch (e) {
          console.log(e);
          return button.channel.send("An error occurred, please try again!");
        }

        const embed = new Discord.MessageEmbed().setDescription(`[\`\`\`📄 View Transcript Of ${button.channel.name}\`\`\`](${response.url})`).setColor("GREEN");
        button.channel.send(`<@${button.clicker.id}>`, embed);
      });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = {
  name: "set-ticket",
  aliases: [],
  category: "🎫 ticket",
  usage: "<mention channel> <mention admin role>",
  description: "This command will set ur ticket categories.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) {
        const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

        let ticketChannel = message.mentions.channels.first();
        if (!ticketChannel) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You must mention the channel**`).setColor("RED");
          return message.channel.send(embed);
        }
        var adminRole = message.mentions.roles.first();
        if (!adminRole) {
          const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You must mention admin role**`).setColor("RED");
          return message.channel.send(embed);
        }
        let TicketName = db.fetch(`TicketName_${message.guild.id}`);
        if (!TicketName) TicketName = "Ticket Tool";

        message.react("✅");
        message.channel.send(`Success!`);
        let btn = new MessageButton().setStyle("red").setLabel("Create Ticket").setEmoji("📩").setID("createTicket");
        let row = new MessageActionRow().addComponent(btn);

        const panel = new Discord.MessageEmbed().setTitle(TicketName).setDescription(`To Create A Ticket React With 📩`).setColor(`RANDOM`).setFooter("DeltaX Ticket Tool - Ticketing without clutter", client.user.displayAvatarURL());
        ticketChannel.send(panel, row).then(async function () {
          db.set(`TicketAdminRole_${message.guild.id}`, adminRole.id);
        });
      } else {
        message.reply("You don't have premission to use that command.").then((i) => i.delete({ timeout: 5000 }));
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
