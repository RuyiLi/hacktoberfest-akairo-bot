const {
	AkairoClient,
	CommandHandler,
	ListenerHandler,
	InhibitorHandler
} = require('discord-akairo');
const { join } = require('path');

// Paths
const commandsPath = join(__dirname, '..', 'commands/');
const listenersPath = join(__dirname, '..', 'listeners/');
const inhibitorsPath = join(__dirname, '..', 'inhibitors/');

// Import Logger
const Logger = require('../util/logger');

class HacktoberClient extends AkairoClient {
	constructor () {
		super({ ownerID: process.env.OWNER_ID });

		this.commandHandler = new CommandHandler(this, {
			aliasReplacement: /-/g,
			allowMention: true,
			commandUtil: true,
			commandUtilLifetime: 600000,
			handleEdits: true,
			defaultCooldown: 3000,
			directory: commandsPath,
			prefix: 'htbf!',
			argumentDefaults: {
				prompt: {
					cancel: 'Command has been cancelled.',
					ended: 'Too many retries, command has been cancelled.',
					modifyRetry: (message, text) =>
						`${message.member}, ${text}\n\nType \`cancel\` to cancel this command.`,
					modifyStart: (message, text) =>
						`${message.member}, ${text}\n\nType \`cancel\` to cancel this command.`,
					retries: 3,
					time: 30000,
					timeout: 'Time ran out, command has been cancelled.'
				}
			}
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: listenersPath
		});

		this.inhibitorHandler = new InhibitorHandler(this, {
			directory: inhibitorsPath
		});
		this.logger = Logger;
	}

	_init () {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			inhibitorHandler: this.inhibitorHandler
		});

		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
		this.inhibitorHandler.loadAll();
	}

	async start () {
		this._init();
		this.login(process.env.TOKEN);
	}
}

module.exports = HacktoberClient;
