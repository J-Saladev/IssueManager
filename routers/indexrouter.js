const express = require('express');
const router = express.Router();
const conn = require('../dbconnection/dbconnect.js');
const formidable = require('formidable');


router.get('/', (req, res) => {
    let issues = [];

    conn.query('SELECT * FROM issues', (err, result) => {
        if (err) {
            console.log(err);
        }
        issues = result;
        
        if (issues.length == 0) {
            res.render('index', { issues })
        } else {
            
        
        issues.forEach(issue => {
            issue.status == 1 ? true : false;
            conn.query(`SELECT * FROM technicians WHERE techid = ${issue.techid}`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                
                issue.techname = result[0].name
                
                issue.state = (issue.state).readInt8()
                
                
            })
            
        })
        res.render('index', { issues })
    }
        
        ;
        
        

    })
   
});
router.post('/', (req, res) => {
    let form = new formidable.IncomingForm()
    console.log(req.body)
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        }
        console.log("fields: ", fields)
        conn.query(`SELECT techid FROM technicians WHERE name = '${fields.assignee}'`, (err, result) => {
            if (err) {
                console.log(err);
            }
            fields.techid = result[0].techid; 
            console.log("name to id: ", fields)
            let newissue = {
                id: Math.floor(Math.random() * 1000),
                description: fields.description[0],
                severity: fields.severity[0],
                techid: fields.techid,
                info: fields.info[0],
                state: fields.state[0] == "true" ? 1 : 0
            }
            console.log("new issue: ", newissue)
            conn.query(`INSERT INTO issues SET ?`, newissue, (err, result) => {
            if (err) {
                console.log(err);
            }
        })
        })
       
    })
})
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    conn.query(`DELETE FROM issues WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        }
    })
})

router.get('/change/:id', (req, res) => {
    let id = req.params.id;
    conn.query(`UPDATE issues SET state = !state WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
        }
    })
})

module.exports = router