const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
class BanCommand extends Command {
	constructor() {
		super('ban', {
			aliases: ['ban'],
			category: 'moderation',
			description: {
				content: 'Bans a specified member from the current Discord guild.',
				usage: '<member> <reason>',
			},
			args: [
				{
					id: 'member',
					type: 'member',
				},
				{
					id: 'reason',
					match: 'rest',
					type: 'string',
				},
			],
			channelRestriction: 'guild',
			cooldown: 5000,
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],

		});
	}

	async exec(message, args) {
		const member = args.member;
		const reason = args.reason;
		if (message.channel.type === 'dm') {
			return message.channel.send('This command cannot be used in direct messages.');
		}

		if (!member) {
			return message.channel.send('You did not mention the member you would like to ban!');
		}

		if (!reason) {
			return message.channel.send('You did not give a reason as to why you want to ban this member!');
		}

		await member.ban(reason).then(() => {
			const embed = new RichEmbed()
				.setTitle('Member banned!')
				.setColor(member.displayHexColor)
				.setThumbnail(member.avatarURL)
				.setDescription(
					`**Guild**: ${member.guild.name}\n` +
                    '' +
                    `**Member**: ${member.user.tag}\n` +
                    '' +
                    `**Reason**: ${reason}`,
				)
				.setFooter('Powered by Hacktober 2019');

			message.channel.send(embed);

		}).catch((err) => {
			message.channel.send(`I was unable to kick member **${member.user.tag}**.`);
			this.client.logger.error(err);
		});

	}
}

module.exports = BanCommand;