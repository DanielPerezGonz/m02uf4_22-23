#!/usr/bin/node

const http = require('http');
const { MongoClient } = require('mongodb');
const fs = require('fs');

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
			names.push( characters[i].name );
		}
		
		response.write(JSON.stringify(query));
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

	collection.findOne({"name":url[2]},{"age"}).project({_id:0,age:1}).toArray().then(character => {
		
		if (character.length == 0){
			response.write("ERROR: Introduce un personaje");
			response.end();
			return;
		}
		
		response.write(JSON.stringify(character[0]));
		response.end();
		
	});
}

function send_character_items(response, url){
	let name = url[2].trim;
	if (name == ""){
		response.write("ERROR: URL mal formada");
		response.end();
		
		return;
	}
	
	let collection = db.collection('characters');
	collection.find({"name":name}).toArray().then(character => {
		if (character.length != 1){
			response.write("ERROR: el personaje "+name+" no existe");
			response.end();
			
			return;
		}
		
		let id = character[0].id_character;
		let collection = db.collection('characters_items');
		collection.find ({"id_character":id}).toArray().then(ids => {
			if (ids.length == 0){
				response.write("[]");
				response.end();
				
				return;
			}
			
		}
	})
}

function send_items(response, url){
	if (url.length >= 3){
		send_character_items (response, url);
		
		return;
	}
	
	let collection = db.collection('items');
	
	collection({}).toArray().then(query => {
		let names = [];
		
		for (let i = 0; i < items.length;i++){
			names.push( items[i].item );
		}
		
		response.write(JSON.stringify(query));
		response.end();
		
	});
}

function insert_character(request, response){
	if (request.method != "POSI"){
		response.write("ERROR: Formulario no encontrado");
		response.end();
		return;
	}

	request.on('data', function(character_data){
		data += character_chunk;
	});

	request.on('end'. function(){
		console.log(data);

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
		case "items":
			send_items(response, url);
			break;
		case "character_form":
			insert_character(request, response);
			break;
		default:
			fs.readFile("index.html", function(err, data){ 
				if (err){
					console.error(err);
					response.writeHead(404, {'Content-Type':'text/html'});
					response.write ("Error 404: el archivo no esta en esta castillo");
					response.end();

					return;
				}

				response.writeHead(200, {'Content-Type':'text/html'});

				response.write("Pagina principal");
				response.end();
			});
	}

	console.log(request.url);

});

http_server.listen(6969);
