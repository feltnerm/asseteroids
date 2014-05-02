var http = require('http');

var st = require('st');

http.createServer(st(process.cwd()+'/static')).listen(1337);
