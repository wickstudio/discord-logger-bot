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
            const roleChange = roleLog.changes.find(change => change.key === '$add');
            if (roleChange && roleChange.new) {
                const addedRoles = roleChange.new;
                const newRole = addedRoles.find(roleId => !roleChange.old?.includes(roleId));

                if (newRole) {

                    await Channels.sendMemberLog(client, Embed.info(`${member.user.tag} - <@&${newRole.id}>`)
                        .setTitle('Role Given').addField('Role ID', "``" + newRole.id + "``", true)
                        .addField("Given by", `<@${roleLog.executor.id}>`, true).setTimestamp());
                }
            }
        }
    }
};
