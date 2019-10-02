const { Command } = require('discord-akairo');
const https = require('https');

class UrlSafeCommand extends Command {
	constructor () {
		super('urlsafe', {
			aliases: ['urlsafe'],
			cooldown: 60000,
			ratelimit: 2,
			args: [
				{
					id: 'url',
					type: 'url',
					prompt: {
						start: 'Enter the url: ',
						retry: 'Hmm, this doesnt seem to be a valid url try again.'
					}
				}
			],
			category: 'util'
		});
	}

	exec (msg, { url }) {
		https.get(`https://www.virustotal.com/vtapi/v2/url/report?apikey=${process.env.VIRUSTOTAL_APIKEY}&resource=${url}`, response => {
			let data = '';
			response.on('data', chunk => { data += chunk; });
			response.on('end', () => {
				const positive = JSON.parse(data).positives;
				const total = JSON.parse(data).total;
				if (positive > 0) {
					msg.reply(`${url} is malicious! Detected in ${positive}/${total} scans.`);
				} else {
					msg.reply(`${url} is safe!`);
				}
			});
			response.on('error', (err) => {
				msg.reply('Could not verify this url. Please try again.');
				console.log(err);
			});
		});
	}
}

module.exports = UrlSafeCommand;
