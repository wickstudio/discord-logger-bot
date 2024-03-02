const fs = require('fs');

function loadEvents(client, directory) {
    const dir = fs.readdirSync(directory);
    for (const file of dir) {
        if (file.includes('.')) {
            if (file.endsWith('.js')) {
                const {name,type,async,event} = require(`../${directory}/${file}`);
                if (async) {
                    client[type === 'on' ? 'on' : 'once'](name, async (...args) => event(client, ...args));
                } else {
                    client[type === 'on' ? 'on' : 'once'](name, (...args) => event(client, ...args));
                }
            }else{
                console.warn(`Came across file that probably shouldn't be here. (${dir}/${file})`);
            }
        } else {
            loadEvents(client, `${directory}/${file}`);
        }
    }
}

module.exports = loadEvents;