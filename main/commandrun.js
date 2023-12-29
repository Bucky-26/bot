const fs = require("fs");
const path = require("path");
const commands = {};

function initializeCommands(api, event) {
  fs.readdirSync(__dirname + "/commands").forEach((file) => {
    if (file.endsWith(".js")) {
      try {
        const CommandClass = require(path.join(__dirname + `/commands/${file}`));
        const commandInstance = new CommandClass(api, event);
        commands[commandInstance.name] = commandInstance;
        console.log(
          `[ NEWT AI ] `.red,
          `>`.blue,
          `${commandInstance.name} command initialized successfully.`.green
        );
      } catch (error) {
        console.error(
          `[ NEWT AI ]`.red,
          `>`.blue,
          `Error initializing command '${file}': ${error.message}`.red
        );
      }
    }
  });
}

module.exports = {initializeCommands,
  handleCommand: async function ({  args, event, api, prefix, config, approvedID }) {
    
    const input = event.body.trim();

    if (!approvedID.includes(event.threadID) && !config.admin.includes(event.senderID)) {
      return false;
    }

    handleCommandWithPrefix();

    handleCommandWithoutPrefix();

    function handleCommandWithPrefix() {
      if (event.body.startsWith(prefix)) {
        const parts = input.slice(prefix.length).split(" ");
        const commandName = parts[0].toLowerCase();
        const args = parts.slice(1);
        const user = event.senderID;

        const command = commands[commandName];
        if (command) {
          if (config.maintenance.enable && !config.admin.includes(event.senderID)) {
            api.sendMessage(
              "The BOT is Under Maintenance.\nTo Serve You Better\n Sorry for the inconvenience.",
              event.threadID
            );
            return false;
          }
          const userPermission = config.admin.includes(user) ? 1 : 0;
          if (!command.prefix && event.body.startsWith(prefix)) {
            api.sendMessage(
              "This Command didn't need a prefix",
              event.threadID,
              event.messageID
            );
            return false;
          }
          if (userPermission >= command.permission) {
            command.newtExec({ api, event, args, config, approvedID, prefix });
          } else {
            api.sendMessage(
              "You do not have permission to use this command.",
              event.threadID
            );
          }
        } else {
          api.sendMessage("Invalid command.", event.threadID);
        }
      }
    }

    function handleCommandWithoutPrefix() {
      const parts = input.split(" ");
      const commandName = parts[0].toLowerCase();
      const args = parts.slice(1);
      const user = event.senderID;

      const command = commands[commandName];

      if (command) {
        const userPermission = config.admin.includes(user) ? 1 : 0;
        if (command.prefix) {
          api.sendMessage(
            "This Command needs a prefix",
            event.threadID,
            event.messageID
          );
          return false;
        }
        if (userPermission >= command.permission) {
          if (config.maintenance.enable && !config.admin.includes(event.senderID)) {
            api.sendMessage(
              "The BOT is Under Maintenance.\nTo Serve You Better\n Sorry for the inconvenience.",
              event.threadID
            );
            return;
          }
          command.newtExec({ api, event, args, config, approvedID });
        } else {
          api.sendMessage(
            "You do not have permission to use this command.",
            event.threadID
          );
        }
      }
    }
  },
};
