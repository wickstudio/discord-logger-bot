const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'guildMemberAdd',
    type: 'on',
    async: true,
    async event(client, member) {
        await Channels.sendMemberLog(client, Embed.info(`${member.user.tag} - <@${member.id}>`)
            .setTitle('Member Joined').addField('ID', "``" + member.id + "``").setTimestamp());
    }
}