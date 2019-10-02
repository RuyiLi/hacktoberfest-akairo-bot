const { Command } = require('discord-akairo');

class PingCommand extends Command {
	constructor () {
		super('ping', {
			aliases: ['ping'],
			description: {
				content: 'Pings the bot'
			},
			category: 'util',
			cooldown: 10000,
			ratelimit: 2
		});
	}

	exec (message) {
		return message.reply('pong!');
	}
}

module.exports = PingCommand;
