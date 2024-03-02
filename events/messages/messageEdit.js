const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'messageUpdate',
    type: 'on',
    async: true,
    async event(client, oldMessage, newMessage) {
        await Channels.sendMemberLog(client, Embed.info()
            .setTitle('Message Edited')
            .setDescription(`**ID:** \`\`${newMessage.id}\`\`\n\n**Original message:**\n${oldMessage.content}\n\n**New message:**\n${newMessage.content}`)
            .addField('Edited by', `<@${newMessage.author.id}>`, true)
            .setTimestamp());
    }
};
