var express = require('express'); // inyección de la dependecia
var app = express(); // creación de la aplicación

var port = process.env.PORT || 3000; // definición del puerto de escucha

app.use('/assets', express.static(__dirname + '/public')); // contenido estático

app.use(express.urlencoded({ extended: false })); // para poder leer los datos del formulario (POST)

app.set('view engine', 'ejs'); // creamos un motor de plantillas

app.use('/', function (req, res, next) {
    console.log('Request Url:' + req.url);
    next();
});

app.get('/', function (req, res) { // página principal
    res.send('<html><head><link rel="stylesheet" type="text/css" href="assets/style.css"></head><body><h1>Hello World!</h1></body></html>')
});

app.get('/student', function (req, res) {
    res.render('student');
});

// Solo 1 de las rutas debe estar disponible a la vez
// app.post('/addStudent', function (req, res) {
//     res.send(`Nombre: ${req.body.nombre} <br> Edad: ${req.body.edad} <br> NSS: ${req.body.nss} <br> Tipo de sangre: ${req.body.tipoSangre} <br> <a href="/student">Volver</a>`);
// });

app.post('/addStudent', function (req, res) {
    res.render('displayData', { // renderiza la vista displayData.ejs y creamos un objeto con los datos del formulario
        nombre: req.body.nombre,
        edad: req.body.edad,
        nss: req.body.nss,
        tipoSangre: req.body.tipoSangre
    });
});

app.listen(port); // escucha en el puerto