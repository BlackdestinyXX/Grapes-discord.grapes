# Grapes 🍇 - Discord.grapes
### New wrapper for Discord api, soon with fantastic native supports.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Grapes.

```bash
npm install discord.grapes
```

## Documentation

### Inizialize your bot
```javascript
const grapes = require("discord.grapes") // Import the library
const bot = new grapes.Application() // Create new bot
bot.start("bot token") // Start bot with token
```
<hr>

### Methods
#### getMessage

| Param Name    | Param Type  | Required |
| ------------- |-------------| -------- |
| channel_id    | string      |   true   |
| message_id    | string      |   true   |

##### Example
```javascript
<Application instance>.getMessage("channel_id", "message_id")
```
#### sendMessage

| Param Name    | Param Type  | Required |
| ------------- |-------------| -------- |
| channel_id    | string      |   true   |
| message_content    | string      |   true   |
| embeds   | array of objects      |   false   |

##### Example
```javascript
// without embeds
<Application instance>.sendMessage("channel_id", "message_content")
// with embeds
<Application instance>.sendMessage("channel_id", "message_content", [{ title: 'Some title', url: 'https://discord.js.org', description: 'Some description here'}])
```
