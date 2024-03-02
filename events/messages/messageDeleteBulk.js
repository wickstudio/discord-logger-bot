const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'messageDeleteBulk',
    type: 'on',
    async: true,
    async event(client, messages) {
        const fetchedLogs = await messages.first().guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_BULK_DELETE',
        });
        const bulkDeleteLog = fetchedLogs.entries.first();

        if (!bulkDeleteLog) return;

        await Channels.sendMemberLog(client, Embed.info()
            .setTitle('Messages Deleted').addField('Amount of messages', `${messages.size} messages`, true)
            .addField("Deleted by", `<@${bulkDeleteLog.executor.id}>`, true).setTimestamp());
    }
}