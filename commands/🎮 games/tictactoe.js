const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "tictactoe",
  aliases: ["ttt"],
  usage: "<mention>",
  category: "🎮 games",
  description: "Wanna play game with ur friend? try this one :D",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      if (!message.mentions.users.first()) return message.channel.send(`Pls mention someone`);
      var mention = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
      if (!mention) {
        message.channel.send("You didnt mention anyone to play with you");
        return;
      }

      const { tictactoe } = require("easy-games-js");
      const tic = new tictactoe(mention, message);
      tic.init({
        PROVIDE_MEMBER: "Please provide a  member",
        ACCEPT_CHALLENGE: "{user} Do you accept this challange? if yes then type yes in this chat",
        DOESNT_PLAY: "looks like {user} doesnt wanna play",
        WICH_SIDE: "**{user}, Which Side Do You Pick? Type `End` To End the game!**",
        GAME_OVER: "Times up!",
        END: "end",
        INACTIVITY: "game ended due to inactivity!",
        WINNER: "Congrats u have won {winner} ",
        DRAW: "Its a draw",
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
