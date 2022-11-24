const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-profile')
        .setDescription('📝 Get user self-promote info /user-profile <user>')
        .setDMPermission(false)
        .addUserOption(option => option.setName('user').setDescription('The user to get info from.')),

    async execute(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.user;

        if (!fs.existsSync(`./database/${user.id}.json`)) return interaction.reply({ embeds: [client.config.embeds.E('This user has not self-promoted yet!')], ephemeral: true });

        const data = JSON.parse(fs.readFileSync(`./database/${user.id}.json`));

        const embed = new EmbedBuilder()
            .setTitle('📝 Self-Promote')
            .setDescription(`Here is the self-promote info of:\n\`${user.tag}\``)
            .setColor(client.config.colors.info)
            .addFields(
                { name: 'Name', value: data.name, inline: true },
                { name: 'Age', value: data.age, inline: true },
                { name: 'pronouns', value: data.pronouns, inline: true },
                { name: `About ${user.username}`, value: data.about, inline: false },
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};