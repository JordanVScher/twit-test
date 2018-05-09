require('dotenv').config();
/* eslint no-underscore-dangle: 0 */


const Botmaster = require('botmaster');
const TwitterBot = require('botmaster-twitter-dm');
// ESCREVER A Mensagem pra fefa = qual foi o desafio o que resolve
// Lembrar: liga o ngrok e coloca no .env, não aparece nada no ngrok
const domain = process.env.webhook_endpoint;

const botmaster = new Botmaster({ port: 3001, domain });

const twitterSettings = {
	credentials: {
		consumerKey: process.env.consumer_key,
		consumerSecret: process.env.consumer_secret,
		accessToken: process.env.access_token,
		accessTokenSecret: process.env.access_token_secret,
	},
};

const twitterBot = new TwitterBot(twitterSettings);

// console.log(twitterBot);

botmaster.addBot(twitterBot);

botmaster.use({
	type: 'incoming',
	name: 'my-incoming-middleware',
	controller: (bot, update) => {
		// console.log(update); // the full raw
		console.log(bot.__associatedUpdate.message.text); //
		if (Number.isNaN(parseFloat(bot.__associatedUpdate.message.text))) {
			return bot.reply(update, 'Nosso bot ainda está em fase de construção! Digite um número pra ver o dobro!');
		}
		return bot.reply(update, `O dobro de ${bot.__associatedUpdate.message.text} é ${bot.__associatedUpdate.message.text * 2}`);
	},
});
