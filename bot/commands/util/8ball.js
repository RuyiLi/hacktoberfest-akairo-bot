const { Command } = require('discord-akairo');

class EightBallCommand extends Command {
	constructor () {
		super('8ball', {
			aliases: ['8ball'],
			description: {
				content: "Magic 8-ball answers to 'yes' or 'no' questions",
				usage: '<question>',
				examples: ['Will I win the lottery?']
			},
			args: [
				{
					id: 'question',
					type: String
				}
			],
			category: 'util',
			ratelimit: 2
		});
	}

	answer () {
		const response = [
			'It is certain.',
			'It is decidedly so.',
			'Without a doubt.',
			'Yes - definitely.',
			'You may rely on it.',
			'As I see it, yes.',
			'Most likely.',
			'Outlook good.',
			'Yes.',
			'Signs point to yes.',
			'Reply hazy, try again.',
			'Ask again later.',
			'Better not tell you now.',
			'Cannot predict now.',
			'Concentrate and ask again.',
			"Don't count on it.",
			'My reply is no.',
			'My sources say no.',
			'Outlook not so good.',
			'Very doubtful.'
		];

		var responseIndex = Math.floor(Math.random() * response.length) + 1;
		return response[responseIndex];
	}

	exec (msg) {
		return msg.reply('🎱 ' + this.answer());
	}
}

module.exports = EightBallCommand;
