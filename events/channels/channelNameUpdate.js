const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'channelUpdate',
    type: 'on',
    async: true,
    async event(client, oldChannel, newChannel) {
        if (oldChannel.name === newChannel.name) return;

        const fetchedLogs = await newChannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_UPDATE',
        });

        const nameEditLog = fetchedLogs.entries.first();

        if (!nameEditLog) return;

        await Channels.sendMemberLog(client, Embed.info(`${oldChannel.name} **➜** ${newChannel.name}`)
            .setTitle('Channel Renamed').addField('ID', "``" + newChannel.id + "``", true)
            .addField("Renamed by", `<@${nameEditLog.executor.id}>`, true).setTimestamp());
    }
}