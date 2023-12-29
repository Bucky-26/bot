const  ex = require("express");
const app = ex();
const config = require(__dirname + "/config/config.json");
var bodyParser = require('body-parser');
const port = config.port;
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded     
app.use(bodyParser.json()); // parse application/json
const { bot_start } = require('./login');

const fs = require('fs');
const path = require('path');
const logger = console.log;
const colors = require('colors');



const crypto = require('crypto');
const gradient = require('gradient-string');
var isHexcolor = require('is-hexcolor');
const secretKeyHex = 'ade0d29be076f734932f38e887d7eeae7818f6a9302439ab4cef070c50652e73';
const ivHex = 'e8863304994de91021b007abd79a674c8';
const secretKey = Buffer.from(secretKeyHex, 'hex');
const iv = Buffer.from(ivHex, 'hex');





function encryptData(data, key, iv) {
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
	let EncryptedAppState = cipher.update(data, 'utf8', 'hex');
	EncryptedAppState += cipher.final('hex');
	return EncryptedAppState;
}

try {
	if (fs.existsSync('appstate.json')) {
		const stats = fs.statSync('appstate.json');
		if (stats.size === 0) {
			console.log('appstate.json is empty.');
			return;
		}

		const RawAppState = fs.readFileSync('appstate.json', 'utf8');

		try {
			JSON.parse(RawAppState);
			console.log('Data in appstate.json is not encrypted. Encrypting...');
			const EncryptAppState = encryptData(RawAppState, secretKey, iv);
			fs.writeFileSync('appstate.json', EncryptAppState, 'utf8');
			console.log('Data has been encrypted and saved to appstate.json.');
		} catch (error) {
			console.log('Data in appstate.json is already encrypted.');
		}
	}
} catch (error) {
	console.error(error);
}

function decryptData(EncryptedAppState, key, iv) {
	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
	let decryptedAppState = decipher.update(EncryptedAppState, 'hex', 'utf8');
	decryptedAppState += decipher.final('utf8');
	return decryptedAppState;
}

const securedAppState = fs.readFileSync('appstate.json', 'utf8');
console.log(gradient('blue', 'skyblue')(""));
const decryptedAppState = decryptData(securedAppState, secretKey, iv);

const decryptedJsonData = JSON.parse(decryptedAppState);


bot_start(JSON.parse(decryptedAppState));

const figlet = require('figlet');

function printTextArt(message) {
	figlet(message, function(err, data) {
		if (err) {
			console.log('Error:', err);
			return;
		}
		console.log(data);
	});
}





app.listen(port, () => {
	logger(gradient('blue', 'skyblue')("[ ISOY DEV ]"), `= >` .green, 'DEVELOP BY ADONIS JR S' .blue);
	logger(gradient('blue', 'skyblue')("[ ISOY DEV ]"), `= >` .green, 'Please Follow My Dev' .blue);
	logger(gradient('blue', 'skyblue')("[ ISOY DEV ]"), `= >` .green, 'link: https://www.facebook.com/Buckyy26' .blue);

	
	printTextArt('NEWT AI');
	printTextArt("ISOY DEV");
});