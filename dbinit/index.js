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

//좌석 삭제
conn.query('delete from seats;', (err, res, fld) => { 
    if(err) console.error(err);
    else {
        // 열람실 삭제
        conn.query('delete from readingrooms;', (err, res, fld) => {
            if(err) console.error(err);
            else
            conn.query('delete from textlogs', (err, res, fld) => {
            conn.query('delete from seatRecords', (err, res, fld) => {
            // 열람실 번호 1번 부터 부여
            conn.query('alter table readingrooms auto_increment=1;', (err, res, fld) => {
                if(err) console.error(err);
                else 
                // 번호 1번 부터 부여
                conn.query('alter table seatRecords auto_increment=1;', (err, res, fld) => {
                conn.query('alter table seats auto_increment=1;', (err, res, fld) => {
                    if(err) console.error(err);
                    else
                    // 중앙 미래로 노트북 열람실 추가
                    conn.query('INSERT INTO readingrooms(name) VALUES (\'CNTMRRNTB\');', (err, res, fld) => {
                        if(err) console.error(err);
                        else {
                            let i;
                        for(i = 1; i <= 89; i++ ) { // 좌석 1 ~ 89번 추가
                            conn.query('INSERT INTO seats(seatNumber, seatedOrNot, ReadingRoomId) VALUES ('+i+',0,1);', (err, res, fld) => {
                                if(err) console.error(err);
                            });
                        }
                        // 최초 기본 레코드 주입
                         for (i =1; i<= 89; i++) { 
                        conn.query(`
                        INSERT INTO seatRecords(takeOrReturn, createdAt, updatedAt, SeatId) VALUES (0 , NOW(), NOW() ,${i});
                        `);
                        }
                        //
                        if (i===90) {
                                console.log('DONE..'); 
                                conn.end();
                        }
                        }
                    });
                });
            });
            });
        });
        });
        });
    }
});