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
connection.connect(function(err) {
    if(err) console.error(err);
    if (err) process.exit(1);
});

axios.get('http://210.125.122.79/webseat/roomview5.asp?room_no=6')
    .then( dataa => {
        const $ = cheerio.load(dataa.data);
        //$('section.book-toc>ul>li>a').each((index, item)=>{$href.push(item.attribs.href)});
        let text = '';
        for(let i = 1; i < 90; i++) {
            text += i+':' + $('div#Layer'+ i +' table tr td').attr('bgcolor') + '\n';
        }
        console.log(text);
        
        connection.query('SELECT text FROM textLogs where ReadingRoomId=1;', (err, results, fields) => {
            if(err) process.exit(1);
            else if (results.length === 0) connection.query('INSERT INTO textLogs(ReadingRoomId,text) VALUES (1,\''+ text +'\');');
            else connection.query('UPDATE textlogs SET text = \''+ text +'\' WHERE ReadingRoomId=1;');  
        });
        //connection.query('INSERT INTO textLogs(ReadingRoomId,text) VALUES (1,\''+ text +'\');');
        //있으면 가져와서 비교, 같으면 넘어감
        //다르면 새 text로 db UPDATE하고 
        //기존 새 text 비교해서 달라진 좌석 구별
        //구별된 자석들 DB에 색깔과 함께 로그 생성
    })
    .finally( err => {
        //connection.end();
    });
