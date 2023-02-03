#!/usr/bin/node

const http = require('http');

const { MongoClient } = require('mongodb');

//connection URL
cont url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

let db;

async function db_connect() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  db = client.db(dbName);
  //const collection = db.collection('documents');

  return 'Conectando a la base de datos MongoDB';
}

db_connect()
	.then(info => console.log(info))
	.catch(msg => console.error(msg));

let http_server = http.createServer(function(request, result)){
	let collection = db.collection('characters');
	console.log(collection);
	console.log("alguien se conecta");
	result.write('hola k ase');
	result.end();
}

http_server.listen(6969);