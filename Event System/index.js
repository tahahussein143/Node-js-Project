//#region liberaries
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const logger = require('morgan');
const ejs = require('ejs');
const ejsLayouts = require('express-ejs-layouts');
//#endregion 

//#region variables
const app = express();
const port = 3000;
//#endregion

//#region app server
app.listen(port, 'localhost', (req, res) => {
    console.log(`app is listening at http://localhost:${port}`);
});
//#endregion

//#region View engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')); // E:\nodejs project\Event System   +  \views
//#endregion

//#region Middleware
app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded

app.use(bodyParser.json()) // parse application/json

app.use(multer().array()); // parse multipart/form-data

app.use(bodyParser.text()); // parse text/html

app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('common'));
app.use(ejsLayouts);
// app.disable( 'etag' );

//#endregion

//#region routs
app.get('/', (req, res) => {
    res.render('blog');
})

app.get('/event', (req, res) => {
    res.render('index');
})

app.get('/speakers', (req, res) => {
    res.render('speaker');
})

app.get('/CreateEvent', (req, res) => {
    res.render('CreateEvent')
})


// app.post('/CreateEvent', (req, res) => {

//     let data = {
//         'name': req.body.name,
//         'location': req.body.location,
//         'days': req.body.days,
//         'manths': req.body.manths,
//         'years': req.body.years,
//         'description': req.body.description

//     }
//     res.render('index', { data });
// })



//#endregion