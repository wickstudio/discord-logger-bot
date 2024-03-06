# Wick Logger Bot

## Description
Wick Logger Bot - Your Discord server's audit log companion. Effortlessly track all activities, from member events to role changes, ensuring comprehensive server monitoring. Streamline your administrative tasks with ease.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/wickstudio/discord-logger-bot.git
   cd your-bot-repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your bot:
   Create a `config.json` file and add the following content:

   ```json
   {
     "token": "bot_token",
     "log-channels": {
       "members": "channel_id",
       "messages": "channel_id",
       "channels": "channel_id"
     },
     "colors": {
       "error": "#f22c2c",
       "info": "#00c4a2",
       "warning": "#ffda34"
     }
   }
   ```

## Events

### Channel Events
- `channelCreate.js`: Triggers when a new channel is created.
- `channelDelete.js`: Triggers when a channel is deleted.
- `channelNameUpdate.js`: Triggers when the name of a channel is updated.

### Member Events
- `guildBanAdd.js`: Triggers when a member is banned from the server.
- `guildBanRemove.js`: Triggers when a member's ban is removed.
- `guildMemberAdd.js`: Triggers when a new member joins the server.
- `guildMemberRemove.js`: Triggers when a member leaves the server.
- `nickNames.js`: Triggers when a member's nickname is changed.
- `roleCreate.js`: Triggers when a new role is created.
- `roleDelete.js`: Triggers when a role is deleted.
- `roleGiven.js`: Triggers when a member is given a role.
- `roleRemove.js`: Triggers when a role is removed from a member.
- `voiceStateUpdate.js`: Triggers when a member's voice state is updated (Joined / Left).

### Message Events
- `messageDelete.js`: Triggers when a message is deleted.
- `messageDeleteBulk.js`: Triggers when multiple messages are deleted in bulk.
- `messageEdit.js`: Triggers when a message is edited.

### Other Events
- `ready.js`: Triggers when the bot is ready.

## Handlers
- `eventsHandler.js`: Handles the registration and execution of events.

## Utils
- `channels.js`: Provides utility functions related to channels.
- `embed.js`: Provides utility functions for creating embeds.

## Configuration
- `config.json`: Configuration file containing bot settings.

## Usage
1. Fill in the `config.json` file with your bot's details.
2. Type `npm install` to install the required packages.
3. Type `node index.js` to start the bot.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact

- Email : info@wickdev.xyz

- Website : https://wickdev.xyz

- Discord : https://discord.gg/wicks

- Youtube : https://www.youtube.com/@wick_studio


![Wick](https://media.discordapp.net/attachments/875162620502626387/1213097595715461120/Server_Banner.jpg?ex=65f43c2d&is=65e1c72d&hm=160dcbff877d8acf56d9abc619d514aa4b0cd3d8b553b9372f9d78cc06cf3c0d&=&format=webp&width=1186&height=667)
