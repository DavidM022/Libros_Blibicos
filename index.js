const express = require('express');
const app = express();
const PORT = 3000; // puede cambiar

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises', anioPublicacion: 2020},
    {id: 2 , nombre: 'Exodo', autor: 'Juan', anioPublicacion: 2024},
    {id: 3 , nombre: 'Levitico', autor: 'Moises', anioPublicacion: 1990},
];

let David=[
    {Mensaje:'Bienvenida',nombre:'David Mamani Alanoca', profesion: 'Estudiante'},
];





//manejo de JSON
app.use(express.json());
//endpoint 1 obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});

//enpoont David Mamani Alanoca
app.get('/libros/David_Mamani', (req, res) => {

    res.json(David);
});

//Endpoint 2 
app.get('/libroautor/:autor',(req,res)=>{
    const autorObtenido=req.params.autor
    console.log(autorObtenido);
    const autorEncontrado=librosBiblicos.filter(x=>x.autor=== autorObtenido);
    if (autorEncontrado) {
        res.json(autorEncontrado)
    }
    else{
        res.status(404).json({mensaje:'Autor no encontrado'});
    }
});

//Endpoint 3
app.get('/cantidadlibrosTotal',(req,res)=>{
    const totalLibros=librosBiblicos.length;
    res.json({Total_libros:totalLibros})
})

//Endpoint 4
app.get('/libros/nombre/:texto', (req, res) => {
    const textoBusqueda = req.params.texto;
    const librosEncontrados = librosBiblicos.filter((libro) => libro.nombre.includes(textoBusqueda));

    if (librosEncontrados.length > 0) {
        res.json(librosEncontrados);
    } else {
        res.status(404).json({ MENSAJE: 'No se encontraron libros' });
    }
});

//Endpoint 5
app.get('/libros/ordenar/nombre', (req, res) => {
    const librosOrdenados = librosBiblicos.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    res.json(librosOrdenados);
});




// endpoint 2 obtener libro por ID
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 3 Agregar un libro
app.post('/agregar-libro', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
})
// endpoint 4 Actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1 ){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 5 Eliminar Libro
app.delete('/eliminar-libro/:id', (req, res) => {
    const id = parseInt(req.params.id);
    lBiblico = librosBiblicos.filter( libro => libro.id !== id);
    res.status(201).json({mensaje : 'se ha eliminado el libro'});
    console.log(lBiblico);
});
//endpoint 6 
app.get('/libros/publicacion/:anio', (req, res) => {
    const year =  parseInt(req.params.anio);
    const librosPublicados = librosBiblicos.filter( x => x.anioPublicacion === year);
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros publicados en ese anio'});
    }
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});

