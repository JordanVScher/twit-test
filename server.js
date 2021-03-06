require('dotenv').config();

// const fs = require('fs');
const Twit = require('twit');

const config = require('./config');

const T = new Twit(config.credencials);
// console.log(T);
//
// function deleteAllWelcomeAndRule(Twi) {
// 	// Tiw === T
// 	// gets every welcome message and deletes them ALL
// 	// also gets rules and deletes the very first one
// 	Twi.get('direct_messages/welcome_messages/list', {
// 	}, (err2, data2) => {
// 		console.log('err list msg => ', err2);
// 		console.log('data list msg=> ', data2);
// 		if (data2.welcome_messages) {
// 			data2.welcome_messages.forEach((message) => {
// 				Twi.delete('direct_messages/welcome_messages/destroy', {
// 					id: message.id,
// 				}, (err, data) => {
// 					console.log('err del msg=> ', err);
// 					console.log('data del msg => ', data);
// 				});
// 			});
// 			if (data2.welcome_message_rules[0]) {
// 				Twi.get('direct_messages/welcome_messages/rules/list', {
// 				}, (err3, data3) => {
// 					console.log('err => ', err3);
// 					console.log('data => ', data3);
// 					Twi.delete('direct_messages/welcome_messages/rules/destroy', {
// 						id: data2.welcome_message_rules[0].id,
// 					}, (err, data) => {
// 						console.log('err => ', err);
// 						console.log('data => ', data);
// 					});
// 				});
// 			} else { console.log('We have no rules left to delete'); }
// 		} else { console.log('We have no welcome messages left to delete'); }
// 	});
// }
//
//
// function createWelcomeAndRule(Twi) {
// // Creating a new Welcome message and a new rule using ths messages id
// 	Twi.post('direct_messages/welcome_messages/new', {
// 		welcome_message: {
// 			name: 'Bem vindo simples',
// 			message_data: { text: 'Olá! Sou o assistente digital do Jordan_scher. :)' },
// 		},
// 	}, (err, data) => {
// 		console.log('err => ', err);
// 		console.log('data => ', data);
// 		console.log('o id => ', data.welcome_message.id);
// 		Twi.post('direct_messages/welcome_messages/rules/new', {
// 			welcome_message_rule: {
// 				welcome_message_id: data.welcome_message.id,
// 			},
// 		}, (err2, data2) => {
// 			console.log('err => ', err2);
// 			console.log('data => ', data2);
// 		});
// 	});
// }

// deleteAllWelcomeAndRule(T);
// createWelcomeAndRule(T);

// T.post('statuses/update', { status: 'aadfgdfgaa #ajudaJordan' }, (err, data) => {
// 	console.log('err =>', err);
// 	console.log('data =>', data.createdAt);
// 	// console.log('response =>', response);
// });

// const stream = T.stream('statuses/filter',
// { tweetMode: 'extended', track: ['#ajudaJordan bob', '#ajudaJordan pop'] });
const stream = T.stream('statuses/filter', {
	tweet_mode: 'extended',
	track: [
		'yukio mishima',
		'mason & dixon',
		'roberto bolaño',
		// 'cormac mccarthy',
		'don delillo',
		'kundera',
		'italo calvino',
		'pynchon',
		// 'vonnegut',
		'william faulkner',
		'garcia marquez',
		'foster wallace',
		'infinite jest',
		'gravitys rainbow',
		"gravity's rainbow",
		'philip roth',
		'graça infinita',
		'cem anos de solidão',
		'salinger',
		'cave story',
		'super metroid',
		// 'super mario world',
		'donkey kong country 2',
		'steamed hams',
		'final fantasy vii',
		'final fantasy 7',
		'FF7',
		'FFVII',
		'final fantasy viii',
		'final fantasy 8',
		'FF8',
		'FFVIII',
		'final fantasy v',
		'final fantasy 5',
		'FF5',
		'FFV',
		'final fantasy vi',
		'final fantasy 6',
		'FF6',
		'FFVI',
		'Evangelion',
		'K-on',
		'Cowboy Bebop',
		'Samurai Champloo',
		'shinsekai yori',
		'made in abyss',
		'berserk',
		'haruhi suzumiya',
		'ping pong: the animation',
		'tatami galaxy',
		// 'hunter x hunter',
		// 'hxh',
		'mahoujin guruguru',
		'hideaki anno',
		'eiichiro oda',
		'shanks',
		'princess tutu',
		'tite kubo',
		// 'naruto',
		// 'hero academia',
		'luluco',
		'inferno cop',
		'yoko kanno',
		'shiro sagisu',
		'nobuo uematsu',
		'#ptutu',
		'steven universe'
	],
	// Mahou Tsukai Tai
});

stream.on('tweet', (tweet) => {
	// console.log('id => ', tweet);
	if ((tweet.retweeted_status && tweet.text.includes('lula')) || (tweet.retweeted_status && tweet.text.includes('#quote')) || tweet.retweeted_status
		|| (tweet.user.lang !== 'en' && tweet.user.lang !== 'pt' && tweet.user.lang !== 'es') ||
		tweet.text.includes('trash') || tweet.text.includes('shit') || tweet.text.includes('overrated') || tweet.text.toLowerCase().includes('trump')) {
		// console.log('xc');
	} else {
		if (tweet.extended_tweet &&
			!((tweet.extended_tweet.full_text.includes('trash') || tweet.extended_tweet.full_text.includes('shit') ||
			tweet.extended_tweet.full_text.includes('overrated') || tweet.extended_tweet.full_text.toLowerCase().includes('trump')))) {
			console.log('full_text => ', tweet.extended_tweet.full_text);
		} else {
			console.log('text => ', tweet.text);
		}
		// console.log('id => ', tweet.user.id_str);
		console.log('name => ', tweet.user.name);
		console.log('screen_name => ', tweet.user.screen_name);
		console.log('location => ', tweet.user.location);
		console.log('flw count => ', tweet.user.followers_count);

		console.log('user_lang => ', tweet.user.lang);
		// console.log('hashtags => ', tweet.entities.hashtags);
		// console.log('likes =>', tweet.favorite_count);
		// console.log('retweets =>', tweet.retweet_count);

		if (tweet.retweeted_status) {
			// check if it's a retweet
			console.log('retweet de => ', tweet.retweeted_status.user.name);
			if (tweet.retweeted_status.truncated === true) {
				console.log('full_text2 => ', tweet.retweeted_status.extended_tweet.full_text); // this is the actual full_text for retweets
			} else {
				console.log('text2 => ', tweet.retweeted_status.text);
			}
		}
		console.log('----------------------');
	}

	// console.log('\nNossa resposta:', tweet.id);
	// setTimeout(() => {
	// 	T.post('statuses/update', {
	// 		status: `@${tweet.user.screen_name} Olá, isso isso e aquilo! ${Date.now()}`,
	// 		in_reply_to_status_id: tweet.id_str,
	// 		// in_reply_to_screen_name: tweet.user.screen_name,
	// 	}, (err, data) => {
	// 		console.log('err =>', err);
	// 		console.log('data =>', data);
	// 	});
	//
	// }, 10000);
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
