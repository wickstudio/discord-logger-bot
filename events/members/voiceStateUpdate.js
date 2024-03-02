const Embed = require('../../utils/embed');
const Channels = require('../../utils/channels');

module.exports = {
    name: 'voiceStateUpdate',
    type: 'on',
    async: true,
    async event(client, oldVcState, newVcState) {
        if (oldVcState.channel) {
            await Channels.sendMemberLog(client, Embed.info(`${oldVcState.channel.name} - <#${oldVcState.channelID}>`)
                .setTitle('Member Left Channel').addField('ID', "``" + oldVcState.channelID + "``", true)
                .addField("Member", `<@${oldVcState.id}>`, true).setTimestamp());
        }
        if (newVcState.channel) {
            await Channels.sendMemberLog(client, Embed.info(`${newVcState.channel.name} - <#${newVcState.channelID}>`)
                .setTitle('Member Joined Channel').addField('ID', "``" + newVcState.channelID + "``", true)
                .addField("Member", `<@${newVcState.id}>`, true).setTimestamp());
        }
    }
}