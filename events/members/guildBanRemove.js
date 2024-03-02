const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');
const config = require('../../config.json');

module.exports = {
    name: 'guildBanRemove',
    type: 'on',
    async: true,
    async event(client, member) {
        console.log('Guild Ban Remove Event Triggered for Guild ID:', member.guild ? member.guild.id : 'Guild is undefined');

        // Check if member.guild is defined and matches the configured guild
        if (!member.guild || member.guild.id !== config.guild.id) {
            console.error('Guild is undefined for the member or not the configured guild.');
            return;
        }

        try {
            const fetchedLogs = await member.guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_BAN_REMOVE',
            });

            console.log('Fetched Logs:', fetchedLogs.entries);

            const unbanLog = fetchedLogs.entries.first();

            if (!unbanLog) {
                console.error('No unban log found.');
                return;
            }

            await Channels.sendMemberLog(client, Embed.info(`${member.user.tag} - <@${member.id}>`)
                .setTitle('Member Unbanned').addField('ID', "``" + member.id + "``")
                .addField("Ban removed by", `<@${unbanLog.executor.id}>`).setTimestamp());
        } catch (error) {
            console.error('Error fetching audit logs or sending log:', error);
        }
    }
};
