const { Command } = require('discord-akairo');
const axios = require('axios');

class UrlSafeCommand extends Command {
    constructor () {
        super('urlsafe', {
            aliases: [ 'urlsafe' ],
            args: [
                {
                    id: 'url',
                    type: word => {
                        if (!word) return null;
                        return word;
                    },
                    prompt: {
                        start: 'Enter the string: ',
                        retry: 'url not exists.'
                    },
                }
            ],
        });
    }

    exec (msg, { url }) {
        axios.get('https://www.virustotal.com/vtapi/v2/url/report', {
            params: {
                apikey: process.env.VIRUSTOTAL_APIKEY,
                resource: url
            }
        }).then(param => {
            if (param.positives > 0)
                msg.reply(`${url} is dangerous!!!`)
            else
                msg.reply(`${url} is ok!!!`)
        }).catch(err => {
            msg.reply(`Unable to verify :(`)
        })
    }
}

module.exports = UrlSafeCommand;