module.exports = {
    event: async function({ api , config , prefix , approvedID}){

        api.listenMqtt(async (err,event) =>{
        if(err) return console.log(err);
            const handleCommand = require(__dirname + "/commandrun.js");
         const { initializeCommands } = require(__dirname + "/commandrun.js");
         initializeCommands(api, event);
        switch(event.type){
            case 'message': 
            case "message_reply":

            const parts = event.body.trim().split(" ");
            const args = parts.slice(1);
                handleCommand.handleCommand({  args , event , api , prefix , config , approvedID });
            break;
            case "event":

            break;
        }
        });
    }
}