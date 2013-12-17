var nombrebd='vilomi';
var collectionname='estadisticas';
var http = require('http');
var fs = require('fs');
var form = fs.readFileSync('seleccionar.html');
var str = 'Tiempo no modificado';

http.createServer(function (request, response) {

   if (request.method === "POST") {

		request.on('data', function (chunk) {
		str += chunk; 
		}).on('end', function () {
		//console.log(str);
		});
         tiempo=str;
		 
		 str="";
  }
  if (request.method === "PUT") {
  
   
		var fileData = new Buffer(+request.headers['content-length']),
      bufferOffset = 0;
    request.on('data', function (chunk) {
      chunk.copy(fileData, bufferOffset);
      bufferOffset += chunk.length;
	  
	  
	  
	  
    }).on('end', function () {
	
	
	
	
      var rand = (Math.random() * Math.random())
                 .toString(16).replace('.', ''),
        to = 'documentos cargados/' + rand + "-" +
                request.headers['x-uploadedfilename'];
      fs.writeFile(to, fileData, function (err) {
        if (err) { throw err; }
		response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(form);
	response.end();
     	    console.log('Archivo guardado en ' + to);
			 var tipo = request.headers['x-uploadedfilename'].split(".");
console.log('Nombre del Archivo = ' + tipo[0]);
console.log('Tipo de Archivo = ' + tipo[1]);


var extension = tipo[1];
var nombre = tipo[0];

// hacemos referencia a la dependencia
var mongodb = require('mongodb');
 
// obtenemos el server MongoDB que dejamos corriendo
// *** el puerto 27017 es el default de MongoDB
var server = new mongodb.Server("127.0.0.1" ,  27017 ,  {}, {safe: true});
 
// obtenemos la base de datos de prueba que creamos
var dbTest = new mongodb.Db(nombrebd, server, {})
 
// abrimos la base pasando el callback para cuando esté lista para usar
dbTest.open(function (error, client) {
  if (error) throw error;
 
  //en el parámetro client recibimos el cliente para comenzar a hacer llamadas
  //este parámetro sería lo mismo que hicimos por consola al llamar a mongo
   
  //Obtenemos la coleccion personas que creamos antes
  var collection = new mongodb.Collection(client, collectionname);
   
  //insertar
  
  collection.insert({'nombre': nombre, 'tipo' : extension,'tiempo_subida':str});
});


});

});

}
if (request.method === "GET") {
response.writeHead(200, {'Content-Type': 'text/html'});
response.end(form);
}
}).listen(8080);




