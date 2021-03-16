const express = require('express');
const morgan = require('morgan');
const path  = require('path');

const app = express(); //inicializamos express

//base de datos
const products = [
    {
        id: 1,
        name: 'Laptop'
    },
    {
        id: 2,
        name: 'Microphone'
    },
    {
        id: 3,
        name: 'Pc'
    }
];

// settings
app.set('port', process.env.PORT || 3000) // Se configura en que puerto se va a escuchar, si no hay nada definido toma el puerto 3000

//middlewares
app.use(morgan('dev')); // Sirve para ver que peticiones llegan al servidor
app.use(express.urlencoded({extended: false})) // cuando un formulario de html lo envie atravez de la url 
app.use(express.json());  // Utilizamos Json para poder entender lo que viner del navegador

//routes
app.get('/products/', (req, res) => {
    res.json(products)
});

app.post('/products/', (req, res) => {
    const { name } = req.body; //
    products.push({   //asigna el valor del id al nuevo producto en base al tamaño del arreglo + 1 
        id: products.length + 1,
        name 
    });
    res.json('Successfully created');
      // res.send('datos recibidos');  manda un string como respuesta al servidor 
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    products.forEach((product, i) => {
        if (product.id == id){
            product.name = name;
        }
    })
    res.json('Succesfully Updated');
})


app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    products.forEach((product, i) => {
        if(product.id == id){
            products.splice(i, 1);
        }
    });
    res.json('Succesfully Deleted');

});

//static files
app.use(express.static(path.join(__dirname + '/public')));


// Escucha al puerto que fue definido y lo imprime en consola 
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
}) 
