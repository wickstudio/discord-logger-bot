const config = require('../config.json');
const channels = config['log-channels'];

module.exports = {
    async sendMemberLog(client, ...args) {
        let channel = client.channels.cache.get(channels.members);
        if (!channel) {
            channel = await client.channels.fetch(channels.members);
        }

        channel.send(...args);
    },
    async sendMessageLog(client, ...args) {
        let channel = client.channels.cache.get(channels.messages);
        if (!channel) {
            channel = await client.channels.fetch(channels.messages);
        }

        channel.send(...args);
    },
    async sendChannelLog(client, ...args) {
        let channel = client.channels.cache.get(channels.channels);
        if (!channel) {
            channel = await client.channels.fetch(channels.channels);
        }

        channel.send(...args);
    }
}