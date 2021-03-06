var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
var port = process.env.PORT || 1337;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    requireHeader: ['origin', 'x-requested-with'],
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
