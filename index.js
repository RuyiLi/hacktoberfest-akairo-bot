const { AkairoClient } = require('discord-akairo');

const client = new AkairoClient({
    prefix: 'htbf!',
    commandDirectory: './commands/',
});

client.login(process.env.TOKEN);