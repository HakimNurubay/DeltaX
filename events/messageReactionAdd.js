const client = require("../index");
const ReactionModel = require("../models/ReactionRole");
module.exports = async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;

  ReactionModel.findOne({ Message: reaction.message.id }, async (err, data) => {
    if (!data) return;
    if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

    const [roleid] = data.Roles[reaction.emoji.name];
    reaction.message.guild.members.cache.get(user.id).roles.add(roleid);
  });
};
