const mysql = require('mysql');

require('dotenv').config();

const conn = mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    database : process.env.dbDb
})
conn.connect( async function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }
});

conn.query('INSERT INTO readingrooms(name) VALUES (\'CNTMRRNTB\');', (err, res, fld) => {
    console.error(err);
});
for(let i = 1; i <= 89; i++ ) {
    conn.query('INSERT INTO seats(seatNumber, seatedOrNot, ReadingRoomId) VALUES ('+i+'0,1);', (err, res, fld) => {
        console.error(err);
    });
}

setTimeout(function(){conn.end();}, 3000);