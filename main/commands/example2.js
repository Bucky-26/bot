class NewtCommand {
    constructor(api, event) {
      this.api = api;
      this.event = event;
      this.name = 'example';
      this.description = 'example command';
      this.permission = 0;
      this.prefix = true;
      this.developer = "EASY TECH";
      this.cat = "template";
    }
  
    async  newtExec({ api, event, args, config, approvedID, prefix }) {
      try {
        // Implement your command logic here
        console.log("tw");
       api.sendMessage('Executing NewtCommand...', this.event.threadID, this.event.messageID);
      } catch (error) {
        console.error(error);
        this.api.sendMessage('An error occurred while executing the command.', this.event.threadID, this.event.messageID);
      }
    }
  }
  
  module.exports = NewtCommand;
  