const mysql = require('mysql');
const path = require('path');
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

var qry = 'SOURCE ' + path.normalize(process.cwd()) + path.sep + 'dbinit.sql';

//좌석 삭제
conn.query( qry , (err, res, fld) => { 
    if(err) console.error(err);
    //textLogs 모두 gray로 초기화
    let text = '';
    for(i = 1; i < 90; i++) 
         text += `${i}:gray\n`;
    conn.query(`INSERT INTO textlogs(text, readingroomId) VALUES (\'${text}\', 1)`, (err, res, fld) => {
       if(err) console.error(err);
       conn.end();
  });
});