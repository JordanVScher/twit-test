require('dotenv').config();

const fs = require('fs');
const Twit = require('twit');

const config = require('./config');


const T = new Twit(config);

// T.post('statuses/update', { status: 'Hello, world' }, (err, data, response) => {
// 	console.log('err =>', err);
// 	console.log('data =>', data);
// 	// console.log('response =>', response);
// });

function randomFromArray(images) {
	return images[Math.floor(Math.random() * images.length)];
}

function uploadRandomImage(images) {
	console.log('Opening an image');
	const imagePath = (`./images/${randomFromArray(images)}`);
	const b64content = fs.readFileSync(imagePath, { encoding: 'base64' });

	console.log('uploading an image');

	T.post('media/upload', { media_data: b64content }, (err, data) => {
		if (err) {
			console.log('Error => ', err);
		} else {
			console.log('Image uploaded, now we tweet it');

			T.post('statuses/update', {	media_ids: new Array(data.media_id_string) }, (err2, data2) => {
				if (err) {
					console.log('Error => ', err2);
				} else {
					console.log('Sucess!');
				}
			});
		}
	});
}


fs.readdir('./images', (err, files) => {
	if (err) {
		console.log(err);
	} else {
		const images = [];
		files.forEach((f) => {
			images.push(f);
		});

		setInterval(() => {
			uploadRandomImage(images);
		}, 60000);
	}
});
