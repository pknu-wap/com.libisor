use libisor_dev;
-- 삭제 파트
delete from seatRecords; -- 좌석 기록
delete from textlogs; -- 스크래핑 텍스트
delete from seats; -- 좌석
delete from readingrooms; -- 열람실

-- 속성 파트
alter table seats auto_increment=1;
alter table readingrooms auto_increment=1;
alter table textlogs auto_increment=1;
alter table seatRecords auto_increment=1;

-- 삽입 파트
INSERT INTO readingrooms (name) VALUES ('CNTMRRNTB'); -- 중앙 미래로 노트

DELIMITER $$
DROP PROCEDURE IF EXISTS mrrntbSeats$$
CREATE PROCEDURE mrrntbSeats()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE (i <= 89) DO -- 미래로 노트북 좌석 추가
        INSERT INTO seats (seatNumber, ReadingRoomId) VALUES (i, 1);
        SET i = i + 1; 
    END WHILE;
END$$
DELIMITER ;

DELIMITER $$
DROP PROCEDURE IF EXISTS mrrntbRecords$$
CREATE PROCEDURE mrrntbRecords()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE (i <= 89) DO -- 미래로 노트북 기본 레코드 추가
        INSERT INTO seatRecords (takeOrReturn, SeatId) VALUES (0 , i);
        SET i = i + 1; 
    END WHILE;
    END$$
DELIMITER ;

call mrrntbSeats();
call mrrntbRecords();
-- 크롤링 텍스트 로그는 js에서 텍스트 생성해서 저장