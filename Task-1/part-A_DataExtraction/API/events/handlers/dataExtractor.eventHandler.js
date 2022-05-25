var notifier = require('../event')

notifier.on('myEvent', (message) => {
    console.log(message)
})