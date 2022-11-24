const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('self-promote')
        .setDescription('📝 Promote your self! /self-promote <info>')
        .setDMPermission(false),

    async execute(interaction, client) {
        await interaction.reply({ embeds: [client.config.embeds.N('📝', 'Please enter your name.')], ephemeral: true });
        const name = await interaction.channel.awaitMessages({ filter: m => m.author.id === interaction.user.id, max: 1, time: 60000 });
        if (name) name.first().delete();
        if (!name.first()) return interaction.editReply({ embeds: [client.config.embeds.E('You took too long to respond.')], ephemeral: true });

        await interaction.editReply({ embeds: [client.config.embeds.N('📝', 'Please enter your age.')], ephemeral: true });
        const age = await interaction.channel.awaitMessages({ filter: m => m.author.id === interaction.user.id, max: 1, time: 60000 });
        if (isNaN(age.first().content)) return interaction.editReply({ embeds: [client.config.embeds.E('You must enter a number.')], ephemeral: true });
        if (age) age.first().delete();
        if (!age.first()) return interaction.editReply({ embeds: [client.config.embeds.E('You took too long to respond.')], ephemeral: true });

        await interaction.editReply({ embeds: [client.config.embeds.N('📝', 'Please enter your pronouns.')], ephemeral: true });
        const pronouns = await interaction.channel.awaitMessages({ filter: m => m.author.id === interaction.user.id, max: 1, time: 60000 });
        if (pronouns) pronouns.first().delete();
        if (!pronouns.first()) return interaction.editReply({ embeds: [client.config.embeds.E('You took too long to respond.')], ephemeral: true });

        await interaction.editReply({ embeds: [client.config.embeds.N('📝', 'Please enter your about.')], ephemeral: true });
        const about = await interaction.channel.awaitMessages({ filter: m => m.author.id === interaction.user.id, max: 1, time: 60000 });
        if (about) about.first().delete();
        if (!about.first()) return interaction.editReply({ embeds: [client.config.embeds.E('You took too long to respond.')], ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle('📝 Self-Promote')
            .setDescription('Here is your self-promote info:')
            .setColor(client.config.colors.info)
            .addFields(
                { name: 'Name', value: name.first().content, inline: true },
                { name: 'Age', value: age.first().content, inline: true },
                { name: 'pronouns', value: pronouns.first().content, inline: true },
                { name: `About ${interaction.user.username}`, value: about.first().content, inline: false },
            )
            .setTimestamp();

        await interaction.editReply({ content: 'Please type `confirm` to confirm or `cancel` to cancel.', embeds: [embed] });
        const confirm = await interaction.channel.awaitMessages({ filter: m => m.author.id === interaction.user.id, max: 1, time: 60000 });
        if (confirm.first().content.toLowerCase() === 'confirm') {
            const data = {
                name: name.first().content,
                age: age.first().content,
                pronouns: pronouns.first().content,
                about: about.first().content
            };
        
            fs.writeFileSync(`./database/${interaction.user.id}.json`, JSON.stringify(data, null, 4));
            await interaction.editReply({ embeds: [client.config.embeds.S('Your self-promote info has been saved.')], ephemeral: true });
            confirm.first().delete();
        } else if (confirm.first().content.toLowerCase() === 'cancel') {
            await interaction.editReply({ embeds: [client.config.embeds.W('Your self-promote info has been canceled.')], ephemeral: true });
            confirm.first().delete();
        } else {
            await interaction.editReply({ embeds: [client.config.embeds.E('You must type `confirm` or `cancel`.')], ephemeral: true });
            confirm.first().delete();
        }

        if (!confirm.first()) return interaction.editReply({ embeds: [client.config.embeds.E('You took too long to respond.')], ephemeral: true });
    }
}