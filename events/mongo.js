const chalk = require("chalk");
const mongoose = require("mongoose");
const mongoPath = require("../config.json").mongoPath;

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
  });

  return mongoose;
};

mongoose.connection.on("connected", () => {
  try {
    console.log(chalk.bold.yellow("[Mongoose] Connected to Database!"));
  } catch (err) {
    console.log(chalk.bold.red("[Mongoose] Connected to Database!"));
    console.log(chalk.red(err));
  }
});
