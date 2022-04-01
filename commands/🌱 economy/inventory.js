const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const cooldown = new Set();
const emoji = require("../../plugins/emojis.json");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "inventory",
  aliases: ["bag", "backpack"],
  category: "🌱 economy",
  description: "",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let user = message.author;

      let drug = db.fetch(`drugs_${message.author.id}`);
      if (drug === null) drug = 0;

      let cannabis = db.fetch(`cannabis_${message.author.id}`);
      if (cannabis === null) cannabis = 0;

      let gun = db.fetch(`guns_${message.author.id}`);
      if (gun === null) gun = 0;

      let banana = db.fetch(`bananas_${message.author.id}`);
      if (banana === null) banana = 0;

      let chocolate = db.fetch(`chocolate_${message.author.id}`);
      if (chocolate === null) chocolate = 0;

      let bronze = await db.fetch(`bronze_${message.author.id}`);
      if (bronze === null) bronze = 0;

      let pizza = await db.fetch(`pizza_${message.author.id}`);
      if (pizza === null) pizza = 0;

      let tea = db.fetch(`tea_${message.author.id}`);
      if (tea === null) tea = 0;

      let milk = db.fetch(`milk_${message.author.id}`);
      if (milk === null) milk = 0;

      let coffee = db.fetch(`coffee_${message.author.id}`);
      if (coffee === null) coffee = 0;

      let wine = db.fetch(`wine_${message.author.id}`);
      if (wine === null) wine = 0;

      let nikes = await db.fetch(`nikes_${message.author.id}`);
      if (nikes === null) nikes = 0;

      let car = await db.fetch(`car_${message.author.id}`);
      if (car === null) car = 0;

      let mansion = await db.fetch(`mansion_${message.author.id}`);
      if (mansion === null) mansion = 0;

      let moneyEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(
          `**${user}'s Inventory**\n\nBanana: ${banana}:banana:\nChocolate: ${chocolate}:chocolate_bar:\nPizza: ${pizza}:pizza:\nTea: ${tea}:tea:\nMilk: ${milk}:milk:\nCoffee: ${coffee}:coffee:\nWine: ${wine}:wine_glass:\nBronze: ${bronze}\nNikes: ${nikes}:athletic_shoe:\nCar: ${car}:red_car:\nMansion: ${mansion}:house:\nDrug: ${drug}:pill:\nCannabis: ${cannabis}:shamrock:\nGun: ${gun}:gun:`
        );
      message.channel.send(moneyEmbed);
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
