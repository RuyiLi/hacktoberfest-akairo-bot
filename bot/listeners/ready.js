const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
	constructor () {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client'
		});
	}

	exec () {
		console.log(`Launched ${this.client.user.username}...`);
	}
}

module.exports = ReadyListener;
