const Discord = require("discord.js");
const { MessageMenu, MessageMenuOption, MessageActionRow, ButtonCollector } = require("discord-buttons");
module.exports = {
  name: "menu",
  aliases: [],
  description: "",
  run: async (client, message, args) => {
    const FirstOption = new MessageMenuOption().setLabel("Milk").setEmoji("🥛").setValue("select-milk").setDescription("A Milk");

    const SecondOption = new MessageMenuOption().setLabel("Tea").setEmoji("🍵").setValue("select-tea").setDescription("A Tea");

    const ThirdOption = new MessageMenuOption().setLabel("Coffe").setEmoji("☕").setValue("select-coffe").setDescription("A Coffe");

    const FourthOption = new MessageMenuOption().setLabel("Wine").setEmoji("🍷").setValue("select-wine").setDescription("A Wine");

    const FifthOption = new MessageMenuOption().setLabel("Vodka").setEmoji("🍺").setValue("select-vodka").setDescription("A Vodka");

    const SixthOption = new MessageMenuOption().setLabel("Chocolate").setEmoji("🍫").setValue("select-chocolate").setDescription("A Chocolate");

    const dropdownMenu = new MessageMenu()
      .setID("dropdown-menu")
      .setPlaceholder("Select something")
      .addOption(FirstOption)
      .addOption(SecondOption)
      .addOption(ThirdOption)
      .addOption(FourthOption)
      .addOption(FifthOption)
      .addOption(SixthOption);

    const MenuActionRow = new MessageActionRow().addComponent(dropdownMenu);

    message.channel.send("Hi Guys", { components: [MenuActionRow] });
  },
};
