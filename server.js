require('dotenv').config();

const fs = require('fs');
const Twit = require('twit');

const config = require('./config');

const T = new Twit(config);

// T.post('direct_messages/new', { screen_name: 'RafaelVic', text: 'aeeeee porra' }, (err, data) => {
// 	console.log('logging data :', data);
// 	console.log('logging error :', err);
// });

// T.post('statuses/retweet/:id', { id: tweet.id_str }, (err, data) => {
// 	console.log('hora do retweet:', tweet.id_str);
// 	console.log('err => ', err);
// 	console.log('data => ', data);
// });


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

// get user
// T.get('users/show', { user_id: tweet.user.id_str }, (err, data) => {
// 	console.log('\nSobre o user:');
// 	console.log('err =>', err);
// 	console.log('data =>', data);
// });

// T.post('statuses/update', { status: 'aaaaa' }, (err, data, response) => {
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
