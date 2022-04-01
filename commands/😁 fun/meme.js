const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const got = require("got");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "meme",
  aliases: [],
  category: "😁 fun",
  description: "You can use this command to request a meme.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      const memeEmbed = new Discord.MessageEmbed();

      got("https://www.reddit.com/r/meme/random/.json").then((response) => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeURL = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        //let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;

        memeEmbed.setTitle(`${memeTitle}`);
        memeEmbed.setURL(`${memeURL}`);
        memeEmbed.setImage(`${memeImage}`);
        memeEmbed.setColor("RANDOM");
        memeEmbed.setFooter(`👍${memeUpvotes} | 💬${memeNumComments}`);

        message.channel.send(memeEmbed);
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
