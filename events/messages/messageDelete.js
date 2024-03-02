const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'messageDelete',
    type: 'on',
    async: true,
    async event(client, message) {
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        });
        const deleteLog = fetchedLogs.entries.first();

        if (!deleteLog) return;

        const embed = Embed.info()
            .setTitle('Message Deleted')
            .setDescription(`**ID:** \`\`${message.id}\`\`\n\n**Original message:**\n${message.content}`)
            .addField('Deleted by', `<@${deleteLog.executor.id}>`, true)
            .addField('For', `<@${message.author.id}>`, true) // Added this line
            .setTimestamp();

        await Channels.sendMemberLog(client, embed);
    }
};
