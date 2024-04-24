const mysql = require('mysql2');
const express = require('express');
const app = express();



const indexrouter = require('./routers/indexrouter');
const techrouter = require('./routers/techrouter');


app.use(`/public`, express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set ('views', 'views/');

app.use('/', indexrouter, (err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error');
});

app.use ('/techs', techrouter, (err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error');
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})