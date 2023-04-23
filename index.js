#!/bin/node

//#!/usr/bin/env node

const http = require('http');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const qs = require('querystring');

//Connection URL
const url = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(url);

// Database Name

const dbName = 'enbuscadeabascal';

let db;
let collection;

async function db_connect() {

  // Use connect method to connect to the server

  await client.connect();

  console.log('Connected successfully to server');

  db = client.db(dbName);

  //const collection = db.collection('documents');

  return 'Conectando a la base de datos MongoDB';

}

db_connect()

	.then(console.log)
	.catch(console.error);


function send_characters (response){

	collection = db.collection('characters');

	collection.find({}).toArray().then(characters => {
		let characters_name=[];
		for (let i = 0; i < characters.length; i++){
		
			characters_name.push( characters[i].name );
		}
		console.log(names);
		
		response.write(JSON.stringify(characters_name));
		response.end();
	});
	
}

function send_age(response, url){

	if(url.length < 3) {
	
		response.write("ERROR: Edad errónea");
		response.end();
		
		return;
	} 

collection = db.collection('characters');

collection.find({ "name": url[2] }).project({ _id: 0, age: 1}).toArray().then(character => {
	
	console.log(character);

	if (character.length == 0){
		
		response.write("ERROR: Edad errónea");
		response.end();

		return;

	}
	response.write(JSON.stringify(character[0]));
	response.end();
	});
}

function send_Character_Data(response, id_character) {

	collection = db.collection('characters');
	
	collection.find({ "id_character": Number(id_character) }).project({ _id: 0 }).toArray()
		.then(character => {
			response.write(JSON.stringify(character));
			response.end();
		});	
}

let http_server = http.createServer(function(request, response){
	if(request.url == "/favicon.ico"){
		return;
	}

	let url = request.url.split("/");
	let params = request.url.split("?");
	switch (url[1]) {
	
	case "age":
		send_age(response, url);
		break;

	case "characters":
		send_characters(response);
		break;
	
	case "items":
		send_items(response, url);
		break;

	case "weapons":
		send_weapons(response);
		break;

	case "character_form":
		insert_character(request, response);
		break;
		
	default:
	
		if (params[1]) {
			let parameter = params[1].split("=");
			let id_character = parameter[1];
			console.log(id_character);

			send_Character_Data(response, id_character);
			return;
		}
		fs.readFile("index.html", function(err, data){
		if (err){
			
			console.error(err);
			
			response.writeHead(404, {"Content-Type":"text/html"});
			response.write("Error 404: el archivo no está");
			response.end();

			return;
		}
		response.writeHead(200, {"Content-Type":"text/html"});
		response.write(data);

		response.end();
		});

	}

}).listen(2727);

