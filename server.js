require('dotenv').config();

const fs = require('fs');
const Twit = require('twit');

const config = require('./config');

const T = new Twit(config.credencials);


function deleteAllWelcomeAndRule(Twi) {
	// Tiw === T
	// gets every welcome message and deletes them ALL
	// also gets rules and deletes the very first one
	Twi.get('direct_messages/welcome_messages/list', {
	}, (err2, data2) => {
		console.log('err list msg => ', err2);
		console.log('data list msg=> ', data2);
		if (data2.welcome_messages) {
			data2.welcome_messages.forEach((message) => {
				Twi.delete('direct_messages/welcome_messages/destroy', {
					id: message.id,
				}, (err, data) => {
					console.log('err del msg=> ', err);
					console.log('data del msg => ', data);
				});
			});
			if (data2.welcome_message_rules[0]) {
				Twi.get('direct_messages/welcome_messages/rules/list', {
				}, (err3, data3) => {
					console.log('err => ', err3);
					console.log('data => ', data3);
					Twi.delete('direct_messages/welcome_messages/rules/destroy', {
						id: data2.welcome_message_rules[0].id,
					}, (err, data) => {
						console.log('err => ', err);
						console.log('data => ', data);
					});
				});
			} else { console.log('We have no rules left to delete'); }
		} else { console.log('We have no welcome messages left to delete'); }
	});
}


function createWelcomeAndRule(Twi) {
// Creating a new Welcome message and a new rule using ths messages id
	Twi.post('direct_messages/welcome_messages/new', {
		welcome_message: {
			name: 'Bem vindo simples',
			message_data: { text: 'Olá! Sou o assistente digital do Senador Jordan_scher. Venha interagir comigo :)' },
		},
	}, (err, data) => {
		console.log('err => ', err);
		console.log('data => ', data);
		console.log('o id => ', data.welcome_message.id);
		Twi.post('direct_messages/welcome_messages/rules/new', {
			welcome_message_rule: {
				welcome_message_id: data.welcome_message.id,
			},
		}, (err2, data2) => {
			console.log('err => ', err2);
			console.log('data => ', data2);
		});
	});
}

// deleteAllWelcomeAndRule(T);
// createWelcomeAndRule(T);


// const stream = T.stream('statuses/filter', { tweetMode: 'extended', track: 'lula' });
const stream = T.stream('statuses/filter', {
	tweet_mode: 'extended',
	track: ['mason & dixon', 'roberto bolaño', 'Cormac McCarthy', 'don delillo', 'kundera', 'italo calvino', 'pynchon', 'vonnegut', 'william faulkner', 'garcia marquez', 'foster wallace', 'infinite jest', 'gravitys rainbow', "gravity's rainbow"],
});

stream.on('tweet', (tweet) => {
	// console.log('id => ', tweet);

	if (tweet.extended_tweet) {
		console.log('full_text => ', tweet.extended_tweet.full_text);
	} else {
		console.log('text => ', tweet.text);
	}
	console.log('id => ', tweet.user.id_str);
	console.log('name => ', tweet.user.name);
	console.log('screen_name => ', tweet.user.screen_name);
	console.log('user_lang => ', tweet.user.lang);
	console.log('hashtags => ', tweet.entities.hashtags);
	console.log('likes =>', tweet.favorite_count);
	console.log('retweets =>', tweet.retweet_count);

	if (tweet.retweeted_status) { // check if it's a retweet
		console.log('retweet de => ', tweet.retweeted_status.user.name);
		if (tweet.retweeted_status.truncated === true) {
			console.log('full_text2 => ', tweet.retweeted_status.extended_tweet.full_text); // this is the actual full_text for retweets
		} else {
			console.log('text2 => ', tweet.retweeted_status.text);
		}
	}
	console.log('-----------------------');
});


// T.post('direct_messages/new', { screen_name: 'JordanTwo', text: 'aeeeee' }, (err, data) => {
// 	console.log('logging data :', data);
// 	console.log('logging error :', err);
// });

// T.post('statuses/retweet/:id', { id: tweet.id_str }, (err, data) => {
// 	console.log('hora do retweet:', tweet.id_str);
// 	console.log('err => ', err);
// 	console.log('data => ', data);
// });

// get user
// T.get('users/show', { user_id: tweet.user.id_str }, (err, data) => {
// 	console.log('\nSobre o user:');
// 	console.log('err =>', err);
// 	console.log('data =>', data);
// });

// T.post('statuses/update', { status: 'aaaaa' }, (err, data) => {
// 	console.log('err =>', err);
// 	console.log('data =>', data);
// 	// console.log('response =>', response);
// });

// function randomFromArray(images) {
// 	return images[Math.floor(Math.random() * images.length)];
// }
//
// function uploadRandomImage(images) {
// 	console.log('Opening an image');
// 	const imagePath = (`./images/${randomFromArray(images)}`);
// 	const b64content = fs.readFileSync(imagePath, { encoding: 'base64' });
//
// 	console.log('uploading an image');
//
// 	T.post('media/upload', { media_data: b64content }, (err, data) => {
// 		if (err) {
// 			console.log('Error => ', err);
// 		} else {
// 			console.log('Image uploaded, now we tweet it');
//
// 			T.post('statuses/update', {	media_ids: new Array(data.media_id_string) }, (err2, data2) => {
// 				if (err) {
// 					console.log('Error => ', err2);
// 				} else {
// 					console.log('Sucess!');
// 				}
// 			});
// 		}
// 	});
// }
//
//
// fs.readdir('./images', (err, files) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		const images = [];
// 		files.forEach((f) => {
// 			images.push(f);
// 		});
//
// 		setInterval(() => {
// 			uploadRandomImage(images);
// 		}, 60000);
// 	}
// });
