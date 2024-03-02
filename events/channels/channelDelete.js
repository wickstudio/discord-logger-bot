const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'channelDelete',
    type: 'on',
    async: true,
    async event(client, channel) {
        const fetchedLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_DELETE',
        });

        const deleteLog = fetchedLogs.entries.first();

        if (!deleteLog) return;

        await Channels.sendMemberLog(client, Embed.info(`${channel.name}`)
            .setTitle('Channel Deleted').addField('ID', "``" + channel.id + "``", true)
            .addField("Deleted by", `<@${deleteLog.executor.id}>`, true).setTimestamp());
    }
}