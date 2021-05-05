  
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
        /* 좌석 사이트 스크래핑 해오기 */
        const $ = cheerio.load(dataa.data);
        let text = '';
        for(let i = 1; i < 90; i++) {
            text += i+':' + $('div#Layer'+ i +' table tr td').attr('bgcolor') + '\n';
        }
        // 이전에 스크래핑한 내용 가져오기
       connection.query('SELECT text FROM textLogs where ReadingRoomId=1;', (err, results, fields) => {
            if(err) process.exit(1); 
            else if (results.length === 0) {
                connection.query('INSERT INTO textLogs(ReadingRoomId,text) VALUES (1,\''+ text +'\');', () => {
                    console.log('DONE');
                    connection.end();
                });
            }
            //else if(text===results[0].text) ; // 텍스트가 같으면 람다 종료, 테스트용으로 주석 처리
            else { // (text!==results[0].text) 텍스트가 다르면 달라진 좌석 찾아서 처리
                // 달라진 텍스트 로그 DB에 업데이트
                connection.query('UPDATE textlogs SET text = \''+ text +'\' WHERE ReadingRoomId=1;', (err, res, fld) => {
                    const newLog = text.split('\n',89);
                    const oldLog = results[0].text.split('\n',89);
                    let changeLog = {};
                    // 새 로그 기존 로그 대조, 달라진 좌석 changeLog 객체에 추가
                    for ( log in newLog ) { 
                        if(newLog[log] === oldLog[log]) { // !== 로 바꾸면 달라진거 구별됨(테스트용으로 ===)
                            changeLog[(1+parseInt(log))] = newLog[log].split(':')[1];
                        }
                    }
                    let tor;
                    for ( log in changeLog ) { 
                        if ( changeLog[log] === 'red') tor = 1;
                        else tor = 0;
                        connection.query(`
                        INSERT INTO seatRecords(takeOrReturn, createdAt, updatedAt, SeatId) VALUES (${tor}, NOW(), NOW() ,${log});
                        `);
                    }
                    //console.log(changeLog);
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