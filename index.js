const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DeployCommands } = require('./deploy-commands');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
] });
const fs = require('fs');
require('colors');

client.config = require('./config');
client.embeds = client.config.embeds;

(async () => {
    await DeployCommands();
    
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
    
    client.commands = new Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
    }

    if (!fs.existsSync('./database')) fs.mkdirSync('./database');

    client.login(client.config.token);
})();