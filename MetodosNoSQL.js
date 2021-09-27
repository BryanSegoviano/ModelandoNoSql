const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'Pruebas';
const db = client.db(dbName);
const collection = 'trabajadores';

class MetodosNoSQL {

 async conexionBD() {
  try {
   await client.connect();
   console.log('BD conectada');
  } catch (e) {
   console.error(e);
   client.close();
  }
 }

 async insertarDato(nuevoUsuario) {
  this.conexionBD();
  const result = await client.db(dbName).collection(collection).insertOne(nuevoUsuario);
  console.log('Se agrego el usuario correctamente, id: ' + result.insertedId);
  client.close();
 }

 async borrarDato(nombreBorrar) {
  this.conexionBD();
  const result = await client.db(dbName).collection(collection).deleteOne({nombre: nombreBorrar});
   console.log('Se borró correctamente el dato'); 
  client.close();
 }

 async actualizarUnDato(filtro, nuevosDatos) {
  this.conexionBD();
  const result = await client.db(dbName).collection(collection)
  .updateOne({nombre: filtro}, {$set: {ciudad: nuevosDatos}});
  console.log('Se actualizaron correctamente los datos');
  client.close();
 }

 async consultarPorNombre(nombreBuscar) {
  this.conexionBD();
  const result = await client.db(dbName).collection(collection).findOne({nombre: nombreBuscar});
  if(result){
   console.log('Dato encontrado: ' + JSON.stringify(result));
  }else{
   console.log('No se encontro el dato buscado');
  }
  client.close();
 }

 async consultarTodos() {
  this.conexionBD();
  const result = await client.db(dbName).collection(collection).find({}).toArray();
  console.log('Datos encontrados: ' + JSON.stringify(result));
  client.close();
 }

}

module.exports = MetodosNoSQL;