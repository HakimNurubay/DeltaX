const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Canvas = require("canvas");
const Math = require("mathjs");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "ship",
  aliases: [],
  category: "😁 fun",
  description: "This command will ship u with someone you have tagged.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext("2d");

      const broked = client.emojis.cache.find((x) => x.id === emoji.broken);
      const loved = client.emojis.cache.find((x) => x.id === emoji.love);

      const target = message.mentions.users.first();
      if (!target) return message.channel.send("Plz mention someone");
      if (target.id == message.author.id) return message.channel.send("Plz mention someone else");
      const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/868292364517650483/898870746586177546/gradienta-ix_kUDzCczo-unsplash.png");
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

      const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: "png" }));
      ctx.drawImage(avatar, 100, 25, 200, 200);

      const TargetAvatar = await Canvas.loadImage(target.displayAvatarURL({ format: "png" }));
      ctx.drawImage(TargetAvatar, 400, 25, 200, 200);

      const heart = await Canvas.loadImage("https://cdn.discordapp.com/attachments/868292364517650483/898873325089087488/Heart-PNG-Clipart-Background.png");
      const broken = await Canvas.loadImage("https://cdn.discordapp.com/attachments/868292364517650483/898873330302590986/2000px-Broken_heart.svg_-e1414032351581.png");
      const random = Math.floor(Math.random() * 99) + 1;

      if (random >= 50) {
        ctx.drawImage(heart, 275, 60, 150, 150);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "love.png");
        const embed = new Discord.MessageEmbed().setDescription(`${loved} ${message.author.username} + ${target.username} = ${random}%`).attachFiles(attachment).setImage(`attachment://love.png`).setColor("RANDOM").setTimestamp(new Date());
        return message.channel.send(embed);
      } else {
        ctx.drawImage(broken, 275, 60, 150, 150);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "broken.png");
        const embed = new Discord.MessageEmbed()
          .setDescription(`${broked} ${message.author.username} + ${target.username} = ${random}%`)
          .attachFiles(attachment)
          .setImage(`attachment://broken.png`)
          .setColor("RANDOM")
          .setTimestamp(new Date());
        return message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
