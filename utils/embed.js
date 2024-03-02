const {MessageEmbed} = require('discord.js');
const {colors} = require('../config.json');

module.exports = {
    error(message) {
        return new MessageEmbed().setTitle('⛔ Error').setColor(colors.error).setDescription(message);
    },
    info(message) {
        if (message) {
            return new MessageEmbed().setTitle('ℹ Info').setColor(colors.info).setDescription(message)
                .setURL('https://discord.gg/wicks')
                .setFooter('Wick Studio');
        } else {
            return new MessageEmbed().setTitle('ℹ Info').setColor(colors.info)
                .setURL('https://discord.gg/wicks')
                .setFooter('Wick Studio');
        }
    },
    warning(message) {
        return new MessageEmbed().setTitle('⚠ Warning').setColor(colors.warning).setDescription(message);
    },
}