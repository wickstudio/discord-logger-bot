const { MessageEmbed, User } = require('discord.js');
const Channels = require('../../utils/channels');
const Embed = require('../../utils/embed');

module.exports = {
    name: 'guildMemberRemove',
    type: 'on',
    async event(client, member) {
        const guild = member.guild;

        if (!member.roles) {
            member = new User(client, member.user);
        }

        const roles = member.roles.cache.map((role) => role.id);
        const rolesField = {
            name: 'Roles',
            value: roles.length === 0 ? 'None' : roles.map((r) => `<@&${r}>`).join(', '),
        };

        if (!rolesField.value) rolesField.value = 'None';

        const logs = await guild.fetchAuditLogs({
            type: 'MEMBER_KICK',
            limit: 1,
        }).catch((e) => { });

        let log;
        if (logs && logs.entries && logs.entries.length !== 0) {
            log = logs.entries.first();
        }
        if (!(log.createdTimestamp > (Date.now() - 6000) === false)) {
            const user = log.executor;
            const embed = new MessageEmbed()
                .setAuthor(`${member.user.username}#${member.user.discriminator} ${member.nickname ? `(${member.nickname})` : ''}`, member.user.avatarURL())
                .setColor(7167985)
                .setDescription(`${member.user.username}#${member.user.discriminator} ${member.nickname ? `(${member.nickname})` : ''} was kicked`)
                .addFields(
                    {
                        name: 'User Information',
                        value: `${member.user.username}#${member.user.discriminator} (${member.id}) ${member.toString()} ${member.user.bot ? '\nIs a bot' : ''}`,
                    }
                )
                .setFooter(`${user.username}#${user.discriminator}`, user.avatarURL());

            if (member.roles) {
                embed.addFields(rolesField, {
                    name: 'Joined At',
                    value: `${new Date(member.joinedAt).toUTCString()} (${Math.abs(
                        (new Date().getTime() - member.joinedAt) / 1000 / 60 / 60 / 24
                    ).toFixed(0)} days, ${Math.abs((new Date().getTime() - member.joinedAt) / 1000 / 60 / 60).toFixed(0)} hours ago)`,
                });
            }

            embed.addFields(
                {
                    name: 'Created At',
                    value: `${new Date(member.user.createdAt).toUTCString()} (${Math.abs(
                        (new Date().getTime() - member.user.createdAt) / 1000 / 60 / 60 / 24
                    ).toFixed(0)} days, ${((new Date().getTime() - member.user.createdAt) / 1000 / 60 / 60).toFixed(0)} hours old)`,
                },
                {
                    name: 'Reason',
                    value: log.reason ? log.reason : 'None provided',
                },
                {
                    name: 'ID',
                    value: `\`\`\`ini\nUser = ${member.id}\nPerpetrator = ${user.id}\`\`\``,
                }
            );

            await Channels.sendMemberLog(client, embed);
        } else {
            const embed = new MessageEmbed()
                .setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL())
                .setColor(7167985)
                .setDescription(`${member.user.username}#${member.user.discriminator} left`)
                .addFields(
                    {
                        name: 'User Information',
                        value: `${member.user.username}#${member.user.discriminator} (${member.id}) ${member.toString()} ${member.user.bot ? '\nIs a bot' : ''}`,
                    }
                );

            if (member.roles) {
                embed.addFields(rolesField, {
                    name: 'Joined At',
                    value: `${new Date(member.joinedAt).toUTCString()} (${Math.abs(
                        (new Date().getTime() - member.joinedAt) / 1000 / 60 / 60 / 24
                    ).toFixed(0)} days, ${Math.abs((new Date().getTime() - member.joinedAt) / 1000 / 60 / 60).toFixed(0)} hours ago)`,
                });
            }

            embed.addFields(
                {
                    name: 'Created At',
                    value: `${new Date(member.user.createdAt).toUTCString()} (${Math.abs(
                        (new Date().getTime() - member.user.createdAt) / 1000 / 60 / 60 / 24
                    ).toFixed(0)} days, ${((new Date().getTime() - member.user.createdAt) / 1000 / 60 / 60).toFixed(0)} hours old)`,
                },
                {
                    name: 'ID',
                    value: `\`\`\`ini\nUser = ${member.id}\`\`\``,
                }
            );

            await Channels.sendMemberLog(client, embed);
        }
    },
};
