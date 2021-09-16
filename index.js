const { WebSocket } = require('ws')
const fs = require('fs')
const { callbacks } = require("./utils/assignCallback")
const fetch = require("node-fetch")

let botToken;

class Application {

    start(token) {
        botToken = token;
    }

    Receptor = class Receptor {

        on(event, callback) {
            callbacks[event.toUpperCase() + "Callback"] = callback;
        }

    }

    sendMessage(channel_id, message_content) {

        fetch(`https://discord.com/api/v9//channels/${channel_id}/messages`, {
            method: 'POST',
            headers: {
                authorization: `Bot ${botToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: message_content
            })
        })

    }

    async getChannel(channel_id) {

        let channel = await fetch(`https://discord.com/api/v9//channels/${channel_id}`, {
            method: 'GET',
           headers: {
                authorization: `Bot ${botToken}`,
            }
        })
        .then(response => response.json())

        return channel;

    }

    deleteChannel(channel_id) {

        fetch(`https://discord.com/api/v9//channels/${channel_id}`, {
           method: 'DELETE',
           headers: {
                authorization: `Bot ${botToken}`,
            }
        })

    }

    async getMessage(channel_id, message_id) {

        let message = await fetch(`https://discord.com/api/v9//channels/${channel_id}/messages/${message_id}`, {
            method: 'GET',
            headers: {
                authorization: `Bot ${botToken}`,
            }
        })
        .then(response => response.json())
        
        return message;

    }
    
}

const ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json')

let payload = {
    op: 2,
    d: {
        token: botToken,
        intents: 513,
        properties: {
            $os: 'linux',
            $browser: 'chrome',
            $device: 'chrome'
        }
    }
}

ws.on('open', function open() {
    ws.send(JSON.stringify(payload))
})

ws.on('message', function incoming(data) {
    let response = JSON.parse(data)
    const { t, event, op, d } = response;

    switch (op) {
        case 10: 
            const { heartbeat_interval } = d;
            interval = heartbeat(heartbeat_interval)
            break;
    }
    
    let eventName = t + "Callback"
    if(callbacks[eventName]) {
        if(typeof callbacks[eventName] == "function") {
            callbacks[eventName](d)
        }
    }
})

const heartbeat = (ms) => {
    return setInterval(() => {
        ws.send(JSON.stringify({op: 1, d: null}))
    }, ms)
}