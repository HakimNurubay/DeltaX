const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Math = require("mathjs");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "slots",
  aliases: [],
  category: "🎮 games",
  description: " Wanna feel like in casino? Try this one :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      var replys1 = [
        ":gem: : :gem: : :gem: ",
        ":lemon: : :lemon: : :lemon: ",
        ":seven: : :seven: : :seven: ",
        ":bell: : :bell: : :bell:",
        ":cherries: : :cherries: : :cherries: ",
        ":star: : :star: : :star: ",
        ":gem: : :star: : :seven: ",
        ":star: : :bell: : :bell:",
        ":star: : :star: : :cherries: ",
        ":gem: : :gem: : :cherries:",
        ":gem: : :seven: : :seven: ",
        ":star: : :bell: : :lemon: ",
        ":star: : :star: : :cherries: ",
        ":seven: : :star: : :star: ",
        ":star: : :star: : :seven: ",
        ":gem: : :gem: : :seven: ",
      ];
      let reponse = replys1[Math.floor(Math.random() * replys1.length)];
      var replys2 = [
        ":gem: : :gem: : :gem: ",
        ":lemon: : :lemon: : :lemon: ",
        ":seven: : :seven: : :seven: ",
        ":bell: : :bell: : :bell:",
        ":cherries: : :cherries: : :cherries: ",
        ":gem: : :star: : :seven: ",
        ":star: : :bell: : :bell:",
        ":star: : :star: : :cherries: ",
        ":gem: : :gem: : :cherries:",
        ":gem: : :seven: : :seven: ",
        ":star: : :bell: : :lemon: ",
        ":star: : :star: : :cherries: ",
        ":seven: : :star: : :star: ",
        ":star: : :star: : :seven: ",
        ":gem: : :gem: : :seven: ",
        ":gem: : :cherries: : :cherries:",
        ":gem: : :bell: : :star:",
      ];
      let reponse2 = replys2[Math.floor(Math.random() * replys2.length)];
      var replys3 = [
        ":lemon: : :lemon: : :lemon: ",
        ":bell: : :bell: : :bell:",
        ":cherries: : :cherries: : :cherries: ",
        ":star: : :star: : :star: ",
        ":gem: : :star: : :seven: ",
        ":star: : :bell: : :bell:",
        ":star: : :star: : :cherries: ",
        ":gem: : :gem: : :cherries:",
        ":gem: : :seven: : :seven: ",
        ":star: : :bell: : :lemon: ",
        ":star: : :star: : :cherries: ",
        ":seven: : :star: : :star: ",
        ":star: : :star: : :seven: ",
        ":gem: : :gem: : :seven: ",
      ];
      let reponse3 = replys3[Math.floor(Math.random() * replys3.length)];
      const embed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(`**[ :slot_machine: ${message.author} launched the slot machine! :slot_machine: ]**`).addField(`${reponse} \n \n${reponse2}**<** \n \n${reponse3}`, `** **`);
      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
