const gsjson = require('google-spreadsheet-to-json');

const privateKey = require('./private_key.json');


gsjson({
	spreadsheetId: process.env.SPREADKEY,
	credentials: privateKey,
}).then((result) => {
	console.log(result);
}).catch((err) => {
	console.log(err.message);
	console.log(err.stack);
});

// const { extractSheets } = require('spreadsheet-to-json');
// const privateKey = require('./private_key.json');


// extractSheets({
// 	spreadsheetKey: process.env.SPREADKEY,
// 	credentials: privateKey,
// 	sheetsToExtract: [],
// 	// formatCell,
// }, (err, data) => {
// 	if (err) {
// 		console.log(err);
// 		return false;
// 	}
// 	return data.Dialog;
// });


// const GoogleSpreadsheets = require('google-spreadsheets');

// const privatekey = require('./private_key.json');

// const { google } = require('googleapis');

// let jwtClient;
// async function authJWT() {
// 	// configure a JWT auth client
// 	jwtClient = await new google.auth.JWT(
// 		privatekey.client_email,
// 		null,
// 		privatekey.private_key,
// 		['https://www.googleapis.com/auth/spreadsheets',
// 			'https://www.googleapis.com/auth/drive'] // eslint-disable-line comma-dangle
// 	);
// 	// authenticate request
// 	await jwtClient.authorize((err, tokens) => {
// 		if (err) {
// 			console.log('Error at connection => ', err);
// 		} else {
// 			console.log('Token =>', tokens);
// 			console.log('Successfully connected!');
// 		}
// 	});
// }

// module.exports.authJWT = authJWT;

// async function cellRange(range) {
// 	GoogleSpreadsheets({
// 		key: process.env.SPREADKEY,
// 		auth: jwtClient,
// 	}, (err, spreadsheet) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			spreadsheet.worksheets[0].cells({
// 				range, // 'R1C1:R1C2',
// 			}, (err2, cells) => {
// 				if (err2) {
// 					console.log(err2);
// 				}
// 				console.dir(cells);


// 				// Cells will contain a 2 dimensional array with all cell data in the
// 				// range requested.
// 			});
// 		}
// 	});
// }

// module.exports.cellRange = cellRange;
