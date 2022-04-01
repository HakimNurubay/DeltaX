const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "set-gender",
  aliases: [],
  usage: "boy/girl",
  category: "🤗 biodata",
  description: "This command will verify ur gender.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let boy = args.join("he/him");
      let girl = args.join("she/her");

      const check = client.emojis.cache.find((x) => x.id === emoji.check);
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);

      let gender = db.fetch(`gender_${message.author.id}`);
      if (gender) {
        message.channel.send(`You was verify ur gender, u can change ur gender, just type ${prefix}change-gender`);
        return;
      }
      if (args[0] == "boy") {
        db.set(`gender_${message.author.id}`, boy);
        const embed = new Discord.MessageEmbed().setDescription(`${check} **Successfull** ${check}`).addField("Gender:", boy);
        await message.channel.send(embed);
      } else if (args[0] == "girl") {
        db.set(`gender_${message.author.id}`, girl);
        const embed = new Discord.MessageEmbed().setDescription(`${check} **Successfull** ${check}`).addField("Gender:", girl);
        await message.channel.send(embed);
      } else {
        const embed = new Discord.MessageEmbed().setDescription(`${wrong} Please enter a valid option, type ${prefix}set-gender boy or type ${prefix}set-gender girl to verify ur gender.`);
        await message.channel.send(embed);
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
