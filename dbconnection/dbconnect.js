const mysql2 = require('mysql2');

const connpool = mysql2.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'issues',

});

module.exports = connpool