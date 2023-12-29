const login  = require("fca-project-orion");
const config = require(__dirname + "/config/config.json");
const approved = require('./approved.json')
const prefix = config.prefix;
var fs = require('fs');
const approvedID = approved;


async function bot_start(AppState){
    try {
        login({appState:AppState},(err,api) =>{
            if(err) return console.log(err);
            const platform = process.platform; 
            let userAgent;
    
            if (platform === "win32") {
				userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36";
			} else if (platform === "android") {
				userAgent = "Mozilla/5.0 (Linux; Android 11; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36";
			} else {
				userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/95.0.4638.50 Mobile/15E148 Safari/604.1";
			}

			api.setOptions({
				forceLogin: true,
				listenEvents: true,
				logLevel: "silent",
				selfListen: false,
				userAgent: userAgent,
			});
                const event = require(__dirname + '/main/event.js');
                event.event(({ api , config , prefix , approvedID}));


        });
        }catch(error){
            console.log(error);
        }
}

module.exports = { bot_start };