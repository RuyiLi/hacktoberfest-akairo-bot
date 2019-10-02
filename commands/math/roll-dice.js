const { Command } = require('discord-akairo')

class DiceCommand extends Command {
    constructor () {
        super('dice', {
            aliases: ['dice'],
            args: [
                {
                    id: 'x',
                    type: word => {
                        if (!word || isNaN(word)) return null;
                        const num = parseInt(word);
                        if (num < 1 || num > 6) return null;
                        return num;
                    },
                    prompt: {
                        start: 'Guess a number 1-6:',
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
     * @return {boolean} true if x is equal to y, and false otherwise. 
     */
    isEqual (x, y) {
        if (x === y) {
            return true;
        } else {
            return false;
        }
    }

    exec (msg, {x, y}) {
        const ranNum = Math.floor(Math.random() * 6) + 1
        if (this.isEqual(x, ranNum)) 
            return msg.reply(`Your number was ${x} and the random number was ${ranNum}. You win.`);
        return msg.reply(`Your number was ${x} and the random number was ${ranNum}. You lose.`);
    }
}

module.exports = DiceCommand