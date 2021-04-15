const mysql = require('mysql');

require('dotenv').config();

const conn = mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    database : process.env.dbDb
});
conn.connect( function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }
});


conn.query('delete from seats;', (err, res, fld) => {
    if(err) console.error(err);
    else {
        conn.query('delete from readingrooms;', (err, res, fld) => {
            if(err) console.error(err);
            else
            conn.query('alter table readingrooms auto_increment=1;', (err, res, fld) => {
                if(err) console.error(err);
                else 
                conn.query('alter table seats auto_increment=1;', (err, res, fld) => {
                    if(err) console.error(err);
                    else
                    conn.query('INSERT INTO readingrooms(name) VALUES (\'CNTMRRNTB\');', (err, res, fld) => {
                        if(err) console.error(err);
                        else {
                            let i;
                        for(i = 1; i <= 89; i++ ) {
                            conn.query('INSERT INTO seats(seatNumber, seatedOrNot, ReadingRoomId) VALUES ('+i+',0,1);', (err, res, fld) => {
                                if(err) console.error(err);
                            });
                        }
                        if (i===90) {
                                console.log('DONE..'); 
                                conn.end();
                        }
                        }
                    });
                });
            });
        });
    }
});