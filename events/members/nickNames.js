const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'guildMemberUpdate',
    type: 'on',
    async event(client, oldMember, newMember) {
        const fetchedLogs = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_UPDATE',
        });

        const nicknameLog = fetchedLogs.entries.first();

        // Check if the log or changes are not available
        if (!nicknameLog || !nicknameLog.changes) return;

        const roleChange = nicknameLog.changes.find(change => change.key === 'nick');
        
        // Check if the roleChange is not available
        if (!roleChange || oldMember.nickname == newMember.nickname) return;
        await Channels.sendMemberLog(client, Embed.info(`${newMember.user.tag}`)
            .setTitle('Nickname Changed')
            .addField('Old Nickname', "``" + (oldMember.nickname || "None") + "``", true)
            .addField('New Nickname', "``" + (newMember.nickname || "None") + "``", true)
            .addField("Changed by", `<@${nicknameLog.executor.id}>`, true)
            .setTimestamp());
    }
};
