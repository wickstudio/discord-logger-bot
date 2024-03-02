const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'roleCreate',
    type: 'on',
    async: true,
    async event(client, role) {
        const fetchedLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: 'ROLE_CREATE',
        });
        const roleLog = fetchedLogs.entries.first();

        await Channels.sendMemberLog(client, Embed.info(`${role.name} - <@&${role.id}>`)
            .setTitle('Role Created').addField('ID', "``" + role.id + "``", true)
            .addField("Created by", `<@${roleLog.executor.id}>`, true).setTimestamp());
    }
}