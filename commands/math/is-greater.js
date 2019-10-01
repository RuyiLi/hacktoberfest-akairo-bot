const { Command } = require('discord-akairo');

class CompareCommand extends Command {
    constructor () {
        super('compare', {
            aliases: [ 'compare' ],
            args: [
                {
                    id: 'x',
                    type: word => {
                        if (!word || isNaN(word)) return null;
                        const num = parseInt(word);
                        if (num < 0) return null;
                        return num;
                    },
                    prompt: {
                        start: 'Enter the first number to compare: ',
                        retry: 'Invalid number. Please enter a valid number.'
                    },
                },
                {
                    id: 'y',
                    type: word => {
                        if (!word || isNaN(word)) return null;
                        const num = parseInt(word);
                        if (num < 0) return null;
                        return num;
                    },
                    prompt: {
                        start: 'Enter the second number to compare: ',
                        retry: 'Invalid number. Please enter a valid number.'
                    },
                },
            ],
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
        while (a) {
            if (a.shift()) { }
            else return false;

            if (b.shift()) { }
            else return true;
        }
    }

    exec (msg, { x, y }) {
        if (this.isGreater(x, y))
            return msg.reply(`${ x } is greater than ${ y }!`);
        return msg.reply(`${ x } is not greater than ${ y } :(`);
    }
}

module.exports = CompareCommand;