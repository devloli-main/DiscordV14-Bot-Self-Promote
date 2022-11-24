const { EmbedBuilder } = require('discord.js');

module.exports = {

    // client
    token: 'TOKEN',
    clientId: 'CLIENT_ID',
    guildId: 'GUILD_ID',

    // webhook
    webhooks: {
        error: {
            id: 'WEBHOOK_ID',
            token: 'WEBHOOK_TOKEN'
        }
    },

    // colors
    colors: {
        error: 0xFF0000,
        success: 0x00FF00,
        warning: 0xFFFF00,
        info: 0x710BD7,
    },

    // emojis
    emojis: {
        error: '⛔',
        success: '✅',
        warning: '⚠️',
        info: '📝',
    },

    // embeds
    embeds: {
        E: (description) => {
            const embed = new EmbedBuilder()
                .setColor(module.exports.colors.error)
                .setDescription(`\`${module.exports.emojis.error}\` : ${description}`);
            return embed;
        },
        S: (description) => {
            const embed = new EmbedBuilder()
                .setColor(module.exports.colors.success)
                .setDescription(`\`${module.exports.emojis.success}\` : ${description}`);
            return embed;
        },
        Q: (description) => {
            const embed = new EmbedBuilder()
                .setColor(module.exports.colors.warning)
                .setDescription(`\`${module.exports.emojis.warning}\` : ${description}`);
            return embed;
        },
        I: (description) => {
            const embed = new EmbedBuilder()
                .setColor(module.exports.colors.info)
                .setDescription(`\`${module.exports.emojis.info}\` : ${description}`);
            return embed;
        },
        N: (emoji, description) => {
            const embed = new EmbedBuilder()
                .setColor(module.exports.colors.info)
                .setDescription(`\`${emoji}\` : ${description}`);
            return embed;
        }
    },
}