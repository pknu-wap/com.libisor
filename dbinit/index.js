const mysql = require('mysql');
const path = require('path');
//onst fs = require('fs');
require('dotenv').config();

const conn = mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    database : process.env.dbDb,
    multipleStatements: true 
});
conn.connect( function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }
});

//var qry = 'SOURCE ' + path.normalize(process.cwd()) + path.sep + 'dbinit.sql';
//var sql_string = fs.readFileSync(path.normalize(process.cwd()) + path.sep + 'dbinit.sql', 'utf8');
//위 방법 다 안됨. delimiter 쓰려면 다른 모듈 써야하는데 그냥 수동으로 쿼리 파일 실행 후 텍스트 로그는 js로 추가해라

console.log('아래 명령으로 mysql에서 dbinit.sql 쿼리를 직접 실행해라\n(DONE이 떴으면 textlogs는 생성완료됐다.)');
console.log('SOURCE ' + path.normalize(process.cwd()) + path.sep + 'dbinit.sql');
/*
conn.query( '' , (err, res, fld) => { 
    if(err) { 
        console.error(err);
        process.exit(1);
    }
    */

    //textLogs 모두 gray로 초기화
    let text = '';
    for(i = 1; i < 90; i++) 
         text += `${i}:gray\n`;
    conn.query(`INSERT INTO textlogs(text, readingroomId) VALUES (\'${text}\', 1)`, (err, res, fld) => {
       if(err) {
        console.error(err);
           process.exit(1);
       }
       console.log('DONE');
       conn.end();
  });
//});