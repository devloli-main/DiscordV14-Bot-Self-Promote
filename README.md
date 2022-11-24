# Discord Bot v14 User Self Promote
This a simple discord bot that allows users to promote themselves.

## Requirements
- [Node.js](https://nodejs.org/en/) recommended v18.0.0 or higher

## Installation
- Clone the repository
- Run `npm install` to install the dependencies

## Configuration
- Change the `config.js` file to your liking
```js
const { EmbedBuilder } = require('discord.js');

module.exports = {

    // client
    token: 'TOKEN', // Get your token from https://discord.com/developers/applications
    clientId: 'CLIENT_ID', // Get your client id from https://discord.com/developers/applications
    guildId: 'GUILD_ID',
    // How to get your guild id: https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-

    // webhook
    webhooks: {
        error: {
            id: 'WEBHOOK_ID',
            token: 'WEBHOOK_TOKEN'
        }
    }
}
```

## Usage
- Run `node .` to start the bot

## License
[MIT](https://choosealicense.com/licenses/mit/)