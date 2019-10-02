const { Command } = require('discord-akairo')

class HelloCommand extends Command {
    constructor() {
        super('hello', {
            aliases: ['hello'],
        })
    }
    exec(message){
        return message.reply('hello!')
    }
}

module.exports = HelloCommand