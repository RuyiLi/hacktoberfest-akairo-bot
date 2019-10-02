const { Argument, Command } = require('discord-akairo');

class CompareCommand extends Command {
	constructor () {
		super('compare', {
			aliases: ['compare'],
			description: {
				content: 'Tells if a number is greater than the other',
				usage: '<x> <y>',
				examples: ['1 2']
			},
			category: 'math',
			args: [
				{
					id: 'x',
					type: Argument.range('number', 0, Infinity),
					prompt: {
						start: 'Enter the first number to compare: ',
						retry: 'Invalid number. Please enter a valid positive number.'
					}
				},
				{
					id: 'y',
					type: Argument.range('number', 0, Infinity),
					prompt: {
						start: 'Enter the second number to compare: ',
						retry: 'Invalid number. Please enter a valid positive number.'
					}
				}
			]
		});
	}

	/**
	 * Determines if the first number provided is larger than the second.
	 * Both numbers must not be negative.
	 * @param {number} x
	 * @param {number} y
	 * @return {boolean} true if x is larger than y, and false otherwise.
	 */
	isGreater (x, y) {
		const a = new Array(x).fill(1);
		const b = new Array(y).fill(1);
		// eslint-disable-next-line no-unmodified-loop-condition
		while (a) {
			if (a.shift()) {

			} else return false;

			if (b.shift()) {

			} else return true;
		}
	}

	exec (msg, { x, y }) {
		if (this.isGreater(x, y)) {
			return msg.reply(`${x} is greater than ${y}!`);
		}
		return msg.reply(`${x} is not greater than ${y} :(`);
	}
}

module.exports = CompareCommand;
