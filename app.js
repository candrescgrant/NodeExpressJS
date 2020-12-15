const express = require('express');
const mongoose = require('mongoose');
const Objeto = require('./models/Objeto');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/basedatos')
    .then(db => console.log('Se conectó la BD'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Bienvenido al proyecto')
});

app.listen(port, () => {
  console.log(`Escuchando en http://localhost:${port}`)
});

//Recibir datos con post y crear el Objeto en la base de datos
app.post('/objetos', async (req, res) => {
    //Si se recibe un objeto bien armado en el frontend, se puede pasar directo el body
    //const objetos = new Objeto(req.body);
    //Si se recibe desordenado, o hay variables que se deben asignar en el backend
    const objetos = new Objeto({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        unArray: req.body.unArray
    });
    objetos.save();
    res.json(objetos);
    console.log(objetos);
});
//Obtener todos los objetos dentro de una 'collection'
app.get('/objetos', async (req, res) => {
    const objetos = await Objeto.find();
    res.json(objetos);
    console.log(objetos);
});
//Obtener un objeto especifico por su _id
app.get('/objetos/:_id', async (req, res) => {
    const objetos = await Objeto.findOne(
        { _id: req.params._id }
    );
    res.json(objetos);
    console.log(objetos);
});
//Borrar un objeto específico por su _id
app.get('/objetos/borrar/:_id', async (req, res) => {
    const objetos = await Objeto.findByIdAndDelete(req.params._id);
    res.send("borrado");
});
//Borrar muchos objetos de la colección de forma masiva, se deben detallar en json {asd: asd}, 
//si dejas un json vacío {} se borra todo
app.get('/borrartodo', async (req, res) => {
    Objeto.deleteMany({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});