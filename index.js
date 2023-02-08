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


function send_characters(response){

	let collection = db.collection('characters');
	
	collection({}).toArray().then(query => {
		let names = [];
		
		for (let i = 0; i < characters.length;i++){
			names.puch( characters[i].name );
		}
		
		respones.write(JSON.stringify(query));
		response.end();
		
	});
}

function send_age(response, url){

	if (url.length < 3){
		response.write("ERROR: Edad Erronea");
		response.end();
		return;
	}

	let collection = db.collection('characters');

	collection.find({"name":url[2]}).toArray().then(query => {
		let data = {
			age: character.age
		};
		
		respones.write(JSON.stringify(query));
		response.end();
		
	});
}

let http_server = http.createServer(function(request, result)){
	if (request.url == "/favicon.ico"){
		return;
	}

	let url = request.url.split("/");

	switch(url[1]){
		case "characters":
			send_characters(response);
			break;
		case "age":
			send_age(response, url);
			break;

		default:
			response.write("Pagina principal");
			response.end();
			break;
		
		
	}

	console.log(request.url);

});

http_server.listen(6969);
