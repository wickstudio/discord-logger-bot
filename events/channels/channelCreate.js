const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'channelCreate',
    type: 'on',
    async: true,
    async event(client, channel) {
        const fetchedLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_CREATE',
        });

        const creationLog = fetchedLogs.entries.first();

        if (!creationLog) return;

        await Channels.sendMemberLog(client, Embed.info(`${channel.name} - <#${channel.id}>`)
            .setTitle('Channel Created').addField('ID', "``" + channel.id + "``", true)
            .addField("Created by", `<@${creationLog.executor.id}>`, true).setTimestamp());
    }
}