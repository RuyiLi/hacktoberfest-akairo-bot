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
		this.client.logger.info(`${this.client.user.tag}, ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`, 'ready');
	}
}

module.exports = ReadyListener;
