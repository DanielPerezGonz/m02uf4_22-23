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
	collection({}).toArray().then(query => {
		let names = [];
		
		for (let i = 0; i < characters.length;i++){
			names.puch( characters[i].name );
		}
		
		respones.write(JSON.stringify(query));
		response.end();
		
	});
	console.log(collection);
	console.log("Alguien se conecta");
});

http_server.listen(6969);