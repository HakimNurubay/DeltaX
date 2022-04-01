const { readFileSync , readdirSync} = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Events");
table.setHeading("Events", "Load status");

const allevents = [];

module.exports = async (client) => {
  try {
    readdirSync("./events/").forEach((file) => {
      const events = readdirSync("./events/").filter((file) =>
        file.endsWith(".js")
      );

      for (let file of events) {
        let pull = require(`../events/${file}`);

        if (pull.name) {
          client.events.set(pull.name, pull);
        }
      }
    });
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
};