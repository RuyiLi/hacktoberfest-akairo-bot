const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
class KickCommand extends Command {
	constructor () {
		super('kick', {
			aliases: ['kick'],
			category: 'moderation',
			description: {
				content: 'Kicks a specified member from the current Discord guild.',
				usage: '<member> <reason>'
			},
			args: [
				{
					id: 'member',
					type: 'member'
				},
				{
					id: 'reason',
					match: 'rest',
					type: 'string'
				}
			],
			channelRestriction: 'guild',
			cooldown: 5000,
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR']

		});
	}

	async exec (message, args) {
		const member = args.member;
		const reason = args.reason;
		if (message.channel.type === 'dm') {
			return message.channel.send('This command cannot be used in direct messages.');
		}

		if (!member) {
			return message.channel.send('You did not mention the member you would like to kick!');
		}

		if (!reason) {
			return message.channel.send('You did not give a reason as to why you want to kick this member!');
		}

		await member.kick(reason).then(() => {
			const embed = new MessageEmbed()
				.setTitle('Member kicked!')
				.setColor(member.displayHexColor)
				.setThumbnail(member.avatarURL)
				.setDescription(
					`**Guild**: ${member.guild.name}\n` +
                    '' +
                    `**Member**: ${member.user.tag}\n` +
                    '' +
                    `**Reason**: ${reason}`
				)
				.setFooter('Powered by Hacktober 2019');

			message.channel.send(embed);
		}).catch((err) => {
			message.channel.send(`I was unable to kick member **${member.user.tag}**.`);
			this.client.logger.error(err);
		});
	}
}

module.exports = KickCommand;
