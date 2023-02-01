#!/usr/bin/env node


const http = require('http');
http.createServer(function(request, result){
	res.write('Hola k ase');
	res.end();
}).listen(8080);