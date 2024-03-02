const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'guildBanAdd',
    type: 'on',
    async event(client, guild, user) {
        try {
            const fetchedLogs = await guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_BAN_ADD',
            });

            const banLog = fetchedLogs.entries.first();

            if (banLog && banLog.target.id === user.id) {
                await Channels.sendMemberLog(client, Embed.info(`${user.tag} - <@${user.id}>`)
                    .setTitle('Member Banned')
                    .addField('ID', "``" + user.id + "``")
                    .addField("Banned by", `<@${banLog.executor.id}>`)
                    .setTimestamp());
            }
        } catch (error) {
            console.error('Error in guildBanAdd event:', error);
        }
    }
};
