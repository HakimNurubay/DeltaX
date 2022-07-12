const { Webhook, MessageBuilder } = require("discord-webhook-node");
const webhook = "YOUR_WEBHOOK_LINK";
const hook = new Webhook(webhook);
const IMAGE_URL = "https://cdn.discordapp.com/avatars/864164903287652403/f4563668ff24bd18933b218f0392fe9d.png";
const util = require("util");

module.exports = (client) => {
  process.on("unhandledRejection", (reason, p) => {
    console.log(" [antiCrash] :: Unhandled Rejection/Catch");
    console.log(reason, p);
    hook.setUsername("Crash Detector");
    hook.setAvatar(IMAGE_URL);
    const embedrail = new MessageBuilder()
      .setTitle("[antiCrash]")
      .addField(`Type Error`, `Unhandled Rejection/Catch`)
      .addField(`Logs`, `\`\`\`js\n${util.inspect(reason, p)}\`\`\``)
      .setColor("#303236");
    hook.send(embedrail);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch");
    console.log(err, origin);
    hook.setUsername("Crash Detector");
    hook.setAvatar(IMAGE_URL);
    const embedrail = new MessageBuilder()
      .setTitle("[antiCrash]")
      .addField(`Type Error`, `Uncaught Exception/Catch`)
      .addField(`Logs`, `\`\`\`js\n${util.inspect(err, origin)}\`\`\``)
      .setColor("#303236");
    hook.send(embedrail);
  });
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
    hook.setUsername("Crash Detector");
    hook.setAvatar(IMAGE_URL);
    const embedrail = new MessageBuilder()
      .setTitle("[antiCrash]")
      .addField(`Type Error`, `Uncaught Exception/Catch (MONITOR)`)
      .addField(`Logs`, `\`\`\`js\n${util.inspect(err, origin)}\`\`\``)
      .setColor("#303236");
    hook.send(embedrail);
  });
  process.on("multipleResolves", (type, promise, reason) => {
    console.log(" [antiCrash] :: Multiple Resolves");
    console.log(type, promise, reason);
    hook.setUsername("Crash Detector", `Multiple Resolves`);
    hook.setAvatar(IMAGE_URL);
    const embedrail = new MessageBuilder()
      .addField("[antiCrash]")
      .addField(`Type Error`, `\`\`\`js\n| ${util.inspect(type)}\`\`\``)
      .addField(`Reason`, `\`\`\`js\n| ${util.inspect(reason)}\`\`\``)
      .addField(`Promise`, `\`\`\`js\n| ${util.inspect(promise)}\`\`\``)
      .setColor("#303236");
    hook.send(embedrail);
  });
};
