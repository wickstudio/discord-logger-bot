const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'guildMemberUpdate',
    type: 'on',
    async: true,
    async event(client, member) {
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_ROLE_UPDATE',
        });
        const roleLog = fetchedLogs.entries.first();

        if (roleLog && roleLog.target.id === member.id && roleLog.changes && roleLog.changes.length > 0) {
            const roleChange = roleLog.changes.find(change => change.key === '$remove');
            if (roleChange && roleChange.new) {
                const removedRoles = roleChange.new;
                const oldRole = removedRoles.find(roleId => !roleChange.old?.includes(roleId));

                if (oldRole) {

                    await Channels.sendMemberLog(client, Embed.info(`${member.user.tag} - <@&${oldRole.id}>`)
                        .setTitle('Role Removed').addField('Role ID', "``" + oldRole.id + "``", true)
                        .addField("Removed by", `<@${roleLog.executor.id}>`, true).setTimestamp());
                }
            }
        }
    }
};
