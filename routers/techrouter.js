const express = require('express');
const router = express.Router();
const conn = require('../dbconnection/dbconnect.js');
const formidable = require('formidable');

router.get('/', (req, res) => {
    let techs = [];
    conn.query('SELECT * FROM technicians', (err, result) => {
        if (err) {
            console.log(err);
        }
        techs = result;
        res.render('technicians', { techs })
        
    })
})

router.get(`/all`, (req, res) => {
    let techs = [];
    conn.query('SELECT * FROM technicians', (err, result) => {
        if (err) {
            console.log(err);
        }
        techs = result;
        res.send(JSON.stringify(techs))
    })
})

module.exports = router