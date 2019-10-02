const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
class EmojiCommand extends Command {
	constructor () {
		super('emoji', {
			aliases: ['emoji', 'emojiinfo', 'einfo'],
			args: [
				{
					id: 'emoji',
					prompt: {
						start: 'Insert an emoji from this server to get started.',
						retry: 'Hmm, that doesnt look like an emoji I recognize. Try again.'
					},
					match: 'content',
					type: 'emoji',
					default: null
				}
			],
			description: {
				content: 'Gets info about specified emoji from this guild',
				usage: '<emoji>',
				examples: [':akairo:', 'akairo', '559524533485305872', '<:akairo:559524533485305872>']
			},
			category: 'util',
			ratelimit: 2
		});
	}

	exec (message, { emoji }) {
		emoji.fetchAuthor().then(authorUser => {
			const embed = new MessageEmbed({
				title: `${emoji.name} | (${emoji.id})`,
				url: emoji.url,
				description: `*Created on ${emoji.createdAt} by ${authorUser.tag}.*`,
				color: 4754303,
				thumbnail: {
					url: emoji.url
				},
				fields: [
					{
						name: 'Animated:',
						value: emoji.animated,
						inline: true
					},
					{
						name: 'Available to:',
						value: ((emoji.roles.size > 0) ? emoji.roles.array().join(', ') : 'Everyone')
					}
				]
			});
			message.channel.send(embed);
		});
	}
}

module.exports = EmojiCommand;
