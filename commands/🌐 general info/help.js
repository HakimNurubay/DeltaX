const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const Discord = require("discord.js");
const Math = require("mathjs");
const moment = require("moment");
const db = require("quick.db");
const { MessageMenu, MessageMenuOption, MessageActionRow, ButtonCollector, MessageButton } = require("discord-buttons");
const prefix = require("../../config.json").prefix;
const emoji = require("../../plugins/emojis.json");

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "🌐 general info",
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

    const tada = client.emojis.cache.find((x) => x.id === emoji.tada);
    const disk = client.emojis.cache.find((x) => x.id === emoji.disk);

    const { guild } = message;
    const icon = guild.iconURL() || "https://cdn.discordapp.com/embed/avatars/1.png";

    const bar = db.get(`barStyle_${guild.id}`) || "https://i.imgur.com/fhVTAyV.gif";

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `| \`${name}\` |`;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          "💪 **__My Features__**",
          ">>> 🏠 **Welcome Card** and 🚪 **Leave Card**, 🎫 Ticket, 🎵 **Music System** with **Audio Filtering** 🎮 **Minigames** and 🕹 **Fun** Commands\n🛠️ **Administration** and **Auto-Moderation** and much more!"
        )
        .addField("📈 **__STATS__**", `>>> ⚙ **${client.commands.size} Commands**\n📁 on ${client.guilds.cache.size} **Guilds**\n🕔 \`${duration}\` **Uptime**\n📶 \`${Math.round(client.ws.ping)}ms\` **Ping**`)
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed1 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**⚠️ __Report__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "⚠️ report")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed2 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🌐 __General Info__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🌐 general info")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed3 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🌱 __Economy__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🌱 economy")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed4 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**${tada} __Giveaway__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🎉 giveaway")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed5 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🎫 __Ticket__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🎫 ticket")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed6 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🎮 __Games__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🎮 games")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed7 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**${disk} __Music__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🎵 music")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed8 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🏠 __Welcome__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🏠 welcome")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed10 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**👑 __Owner__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "👑 owner")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed12 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**💾 __Backup__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "💾 backup")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed13 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🔍 __Random__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🔍 random")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed14 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🖼️ __Image__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🖼️ image")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed15 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🤖 __Chatbot__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🤖 chatbot")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed16 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🤗 __Biodata__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🤗 biodata")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed17 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**😁 __Fun__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "😁 fun")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed18 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🚀 __Automod__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🚀 automod")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed19 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🚪 __Leave__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🚪 leave")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed20 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🛠️ __Moderator__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🛠️ moderator")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed21 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**🛡 __Security__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "🛡 security")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      const embed22 = new Discord.MessageEmbed()
        .setTitle(`Information of ${client.user.username}`)
        .addField(
          `**ℹ️ __Info__**`,
          `>>> ${client.commands
            .filter((cmd) => cmd.category === "ℹ️ info")
            .map((cmd) => `\`${cmd.name}\``)
            .join(" | ")}`
        )
        .setImage(bar)
        .setThumbnail(icon)
        .setColor("#fffff9")
        .setFooter(`Use ${prefix}help followed by a command name to get more additional information on a command. For example: ${prefix}help ban`);

      let option = new MessageMenuOption().setLabel(`home`).setEmoji("📃").setValue("option").setDescription("Go back to home");

      let option1 = new MessageMenuOption().setLabel(`report`).setEmoji(`⚠️`).setValue("option1").setDescription("This category is about report bug");

      let option2 = new MessageMenuOption().setLabel(`general info`).setEmoji(`🌐`).setValue("option2").setDescription("This category is about General Info");

      let option3 = new MessageMenuOption().setLabel(`economy`).setEmoji(`🌱`).setValue("option3").setDescription("This category is about Economy features");

      let option4 = new MessageMenuOption().setLabel(`giveaway`).setEmoji(`923230926601879572`).setValue("option4").setDescription("This category is about Giveaway features");

      let option5 = new MessageMenuOption().setLabel(`ticket`).setEmoji(`🎫`).setValue("option5").setDescription("This category is about Ticket features");

      let option6 = new MessageMenuOption().setLabel(`games`).setEmoji(`🎮`).setValue("option6").setDescription("This category is about Game features");

      let option7 = new MessageMenuOption().setLabel(`music`).setEmoji(`932118876534214706`).setValue("option7").setDescription("This category is about Music features");

      let option8 = new MessageMenuOption().setLabel(`welcome`).setEmoji(`🏠`).setValue("option8").setDescription("This category is about Welcome logs features");

      let option10 = new MessageMenuOption().setLabel(`owner`).setEmoji(`👑`).setValue("option10").setDescription("This command is for the Owner");

      let option12 = new MessageMenuOption().setLabel(`backup`).setEmoji(`💾`).setValue("option12").setDescription("This category is about Backup Server");

      let option13 = new MessageMenuOption().setLabel(`random`).setEmoji(`🔍`).setValue("option13").setDescription("This category is for Random commands");

      let option14 = new MessageMenuOption().setLabel(`image`).setEmoji(`🖼️`).setValue("option14").setDescription("This category is about Image commands");

      let option15 = new MessageMenuOption().setLabel(`chatbot`).setEmoji(`🤖`).setValue("option15").setDescription("This category is about Ai chat bot");

      let option16 = new MessageMenuOption().setLabel(`biodata`).setEmoji(`🤗`).setValue("option16").setDescription("This category is about Biodata");

      let option17 = new MessageMenuOption().setLabel(`fun`).setEmoji(`😁`).setValue("option17").setDescription("This category is about Fun commands");

      let option18 = new MessageMenuOption().setLabel(`automod`).setEmoji(`🚀`).setValue("option18").setDescription("This category is about Automod features");

      let option19 = new MessageMenuOption().setLabel(`leave`).setEmoji(`🚪`).setValue("option19").setDescription("This category is about Leave logs features");

      let option20 = new MessageMenuOption().setLabel(`moderator`).setEmoji(`🛠️`).setValue("option20").setDescription("This category is about Moderator commands");

      let option21 = new MessageMenuOption().setLabel(`security`).setEmoji(`🛡`).setValue("option21").setDescription("This category is about Security features");

      let option22 = new MessageMenuOption().setLabel(`info`).setEmoji(`ℹ️`).setValue("option22").setDescription("This category is about Info commands");

      let select = new MessageMenu()
        .setID("customid")
        .setPlaceholder("Click here to view the help menu!")
        .addOption(option)
        .addOption(option1)
        .addOption(option2)
        .addOption(option3)
        .addOption(option4)
        .addOption(option5)
        .addOption(option6)
        .addOption(option7)
        .addOption(option8)
        .addOption(option10)
        .addOption(option12)
        .addOption(option13)
        .addOption(option14)
        .addOption(option15)
        .addOption(option16)
        .addOption(option17)
        .addOption(option18)
        .addOption(option19)
        .addOption(option20)
        .addOption(option21)
        .addOption(option22);

      const MenuActionRow = new MessageActionRow().addComponent(select);

      const button = new MessageButton()
        .setStyle("url")
        .setURL("https://discord.com/oauth2/authorize?client_id=900153413210365972&permissions=271641726&response_type=code&scope=bot%20applications.commands%20identify%20guilds&redirect_uri=https%3A%2F%2Fdeltax.crupuk.com")
        .setLabel("Invite");

      const button2 = new MessageButton().setStyle("url").setURL("https://top.gg/bot/900153413210365972/vote").setLabel("Vote");

      const row = new MessageActionRow().addComponents([button, button2]);

      const Sendmenu = await message.channel.send(`**Click the menu below to click the help menu!**`, { embed: embed, components: [MenuActionRow, row] });

      const filter = (button) => button.clicker.user.id === message.author.id;

      let collector = Sendmenu.createMenuCollector(filter, { time: 600000 });

      collector.on("collect", (b) => {
        if (b.values[0] == "option") {
          Sendmenu.edit(embed, select);
        }

        if (b.values[0] == "option1") {
          Sendmenu.edit(embed1, select);
        }

        if (b.values[0] == "option2") {
          Sendmenu.edit(embed2, select);
        }

        if (b.values[0] == "option3") {
          Sendmenu.edit(embed3, select);
        }

        if (b.values[0] == "option4") {
          Sendmenu.edit(embed4, select);
        }

        if (b.values[0] == "option5") {
          Sendmenu.edit(embed5, select);
        }

        if (b.values[0] == "option6") {
          Sendmenu.edit(embed6, select);
        }

        if (b.values[0] == "option7") {
          Sendmenu.edit(embed7, select);
        }

        if (b.values[0] == "option8") {
          Sendmenu.edit(embed8, select);
        }

        if (b.values[0] == "option10") {
          Sendmenu.edit(embed10, select);
        }

        if (b.values[0] == "option12") {
          Sendmenu.edit(embed12, select);
        }

        if (b.values[0] == "option13") {
          Sendmenu.edit(embed13, select);
        }

        if (b.values[0] == "option14") {
          Sendmenu.edit(embed14, select);
        }

        if (b.values[0] == "option15") {
          Sendmenu.edit(embed15, select);
        }

        if (b.values[0] == "option16") {
          Sendmenu.edit(embed16, select);
        }

        if (b.values[0] == "option17") {
          Sendmenu.edit(embed17, select);
        }

        if (b.values[0] == "option18") {
          Sendmenu.edit(embed18, select);
        }

        if (b.values[0] == "option19") {
          Sendmenu.edit(embed19, select);
        }

        if (b.values[0] == "option20") {
          Sendmenu.edit(embed20, select);
        }

        if (b.values[0] == "option21") {
          Sendmenu.edit(embed21, select);
        }

        if (b.values[0] == "option22") {
          Sendmenu.edit(embed22, select);
        }

        b.reply.defer();
      });

      collector.on("end", (b) => {
        Sendmenu.edit("This help menu is expired! Please retype the command to view again.", { embed: embed, components: [row] });
      });
    } else {
      const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

      if (!command) {
        const embed = new MessageEmbed().setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`).setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField("COMMAND:", command.name ? `\`${command.name}\`` : "No name for this command.")
        .addField("ALIASES:", command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases for this command.")
        .addField("USAGE:", command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``)
        .addField("CATEGORY:", command.category ? command.category : "No category for this command.")
        .addField("DESCRIPTION:", command.description ? command.description : "No description for this command.")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }

    /*const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `| \`${name}\` |`;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(`Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setImage(bar)
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

      if (!command) {
        const embed = new MessageEmbed().setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`).setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField("COMMAND:", command.name ? `\`${command.name}\`` : "No name for this command.")
        .addField("ALIASES:", command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases for this command.")
        .addField("USAGE:", command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``)
        .addField("DESCRIPTION:", command.description ? command.description : "No description for this command.")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }*/
  },
};
