const irc    = require('irc');
const client = new irc.Client('chat.freenode.net', 'mdizzle9d9', {
    // channels:   [ '#agaeq14' ],
    debug:      true,
    showErrors: true
});

client.addListener('error', function (message) {
    console.log('error: ', message);
});

client.addListener('raw', function (message) {
    // console.log(message);

    if (message.command === 'rpl_statsconn') {

        client.join('#agaeq14', (a) => {

            console.log(a);
        });
    }
});

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
});

client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
});

