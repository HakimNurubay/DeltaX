const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Math = require("mathjs");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "ramal",
  aliases: [],
  category: "😁 fun",
  description: "There is a big chance I insult you!",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const wrong = client.emojis.cache.find((x) => x.id === emoji.wrong);
      let question = args.join(" ");
      if (!question) {
        const embed = new Discord.MessageEmbed().setDescription(`**${wrong} You didn't give me the question**`).setColor("RED");
        return message.channel.send(embed);
      }

      let responses = [
        "mungkin.",
        "nggak ah malas jawab kamu bau",
        "males ah jawabnya",
        "ga ah males kamu belum mandi.",
        "bisa jadi sih",
        "ga ah kamu jelek",
        "mungkin tidak.",
        "tahun ini kayaknya",
        "G",
        "Never!",
        "Fuhgeddaboudit.",
        "Ahaha! Iya kah?!?",
        "Pfft.",
        "Sorry, bucko.",
        "jahannam",
        "mandi dulu sono biar ga bau",
        "ga ah kamu bau kek sapi",
        "ga ah males mau jawab",
        "mending gak aku jawab",
        "siapa peduli?",
        "ga peduli",
        "Never, ever, ever.",
        "mungkin iya",
        "Y",
      ];
      let response = responses[Math.floor(Math.random() * responses.length - 1)];

      let embed = new MessageEmbed().setTitle(`Hasil Ramalan`).addFields({ name: "Pertanyaan", value: question, inline: false }, { name: "Jawaban", value: response, inline: false }).setColor(`RANDOM`);
      message.channel.send(embed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
