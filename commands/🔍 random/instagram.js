const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const cooldown = new Set();
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "instagram",
  aliases: ["ig"],
  usage: "<user>",
  category: "🔍 random",
  description: "This command will get information of instagram user.",
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("please slow down and wait 5 second before using this command.").then((i) => i.delete({ timeout: 5000 }));
    } else {
      let user = !args[0] ? "hakimn_world" : args[0];
      let instagram = await fetchInstagram(user);

      if (!instagram) {
        return message.channel.send("Unable to find the provided channel.");
      }

      // Get the top liked image
      let topImage;
      if (instagram.imageData.length > 0) {
        topImage = instagram.imageData[0];
      } else {
        topImage = {
          likes: 0,
          comments: 0,
          image: message.client.user.displayAvatarURL(),
        };
      }

      let embed = new Discord.MessageEmbed()
        .setTitle(instagram.name)
        .setURL(`https://www.instagram.com/${instagram.id}`)
        .setThumbnail(instagram.image)
        .setDescription(instagram.bio)
        .addFields({ name: "Followers", value: instagram.followers, inline: true }, { name: "Following", value: instagram.following, inline: true })
        .setImage(topImage.image)
        .setColor("RANDOM")
        .setFooter(`👍 ${topImage.likes} 💬 ${topImage.comments}`, instagram.image);

      return message.channel.send(embed);

      async function fetchInstagram(id) {
        let url = `https://www.instagram.com/${id}/?__a=1`;
        // Get profile information using url
        let results = await fetch(url);

        // If there's no results return false
        if (results.status !== 200) {
          return false;
        }

        results = await results.json();

        // Get information about the user
        let data = {
          id: results.graphql.user.username,
          name: results.graphql.user.full_name,
          bio: results.graphql.user.biography,
          followers: results.graphql.user.edge_followed_by.count,
          following: results.graphql.user.edge_follow.count,
          image: results.graphql.user.profile_pic_url_hd,
        };

        // Get information about each image
        let images = results.graphql.user.edge_owner_to_timeline_media;
        let imgArr = [];
        for (let i = 0; i < images.edges.length; i++) {
          let imageData = {
            image: images.edges[i].node.display_url,
            likes: images.edges[i].node.edge_liked_by.count,
            comments: images.edges[i].node.edge_media_to_comment.count,
          };
          imgArr.push(imageData);
        }

        // Sort likes from most to least
        await imgArr.sort(function (a, b) {
          return a.likes - b.likes;
        });

        data.imageData = imgArr;

        return data;
      }
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);
  },
};
