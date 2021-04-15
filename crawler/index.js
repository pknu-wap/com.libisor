  
const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    database : process.env.dbDb
});
connection.connect( function(err) {
    if(err) {
        console.error(err);
        process.exit(1);
    }
});

axios.get('http://210.125.122.79/webseat/roomview5.asp?room_no=6')
    .then( dataa => {
        const $ = cheerio.load(dataa.data);
        let text = '';
        for(let i = 1; i < 90; i++) {
            text += i+':' + $('div#Layer'+ i +' table tr td').attr('bgcolor') + '\n';
        }
       connection.query('SELECT text FROM textLogs where ReadingRoomId=1;', (err, results, fields) => {
            if(err) process.exit(1);
            else if (results.length === 0) connection.query('INSERT INTO textLogs(ReadingRoomId,text) VALUES (1,\''+ text +'\');');
            //else if(text===results[0].text) ; // 텍스트가 같으면 람다 종료, 테스트용으로 주석 처리
            else { // (text!==results[0].text) 텍스트가 다르면 달라진 좌석 찾아서 처리
                connection.query('UPDATE textlogs SET text = \''+ text +'\' WHERE ReadingRoomId=1;', (err, res, fld) => {
                    const newLog = text.split('\n');
                    const oldLog = results[0].text.split('\n');
                    newLog.pop(); // 90번 제거
                    oldLog.pop();
                    let changeLog = {};
                    for ( log in newLog ) {
                        if(newLog[log] === oldLog[log]) { // !== 로 바꾸면 달라진거 구별됨(테스트용으로 ===)
                            changeLog[(1+parseInt(log))] = newLog[log].split(':')[1];
                        }
                    }
                    console.log(changeLog);
                    console.log('DONE..');
                    connection.end();
                });
            }
        });
    })
    .catch( err => {
        connection.end();
        process.exit();
    });