const { Command } = require('discord-akairo');

class SayCommand extends Command {
	constructor() {
		super('say', {
			aliases: ['say'],
			channel: 'guild',
			args: [
				{
					id: 'thing',
					type: 'string',
					match: 'content'
				}
			],
		});
	}

	async exec(message, { thing }) {
		message.channel.send(thing);
		message.delete();
	}
}

module.exports = SayCommand;