const { Client, Collection, Partials, GatewayIntentBits} = require("discord.js");
const fs = require("fs");
const config = require("./config/config.json")
const colors = require("colors")
// client
const client = new Client({
  shards: "auto",
  partials: [Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User],
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  intents: 131071
});
module.exports = client;
client.setMaxListeners(50);
require("events").defaultMaxListeners = 50;
// Global Variables
client.slashCommands = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.subcmd = new Collection();
client.category = fs.readdirSync("./commands/")
function handlers() {
  client.basicshandlers = Array("command", "events", "slash");
  client.basicshandlers.forEach((handler) => {
    try {
      require(`./handlers/${handler}`)(client);
    } catch (e) {
      console.log(e.stack);
    }
  });
}
handlers();
client.login(config.bot.token);
module.exports.handlers = handlers

//error handling
process.on("unhandledRejection", (reason, p) => {
  console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  // console.log(" [Error_Handling] :: Multiple Resolves");
  // console.log(type, promise, reason);
});










