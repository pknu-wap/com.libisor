const express = require('express');
const { ReadingRoom, Seat, SeatRecord } = require('../models');

const router = express.Router();

router.get('/:readingRoom/(:seatNumber)?', async (req, res) => {
    try{
    let seatNum = parseInt(req.params.seatNumber);
    console.log(seatNum);
    // 중앙 미래로 노트북 id 1 (열람실 id는 DB 접근 X)
    if(req.params.readingRoom==='CNTMRRNTB') {
        if(seatNum >=1 && seatNum <= 89) {
            const record = await Seat.findAll({
                limit: 1,
                where: {
                    ReadingRoomId: 1,
                    SeatNumber: seatNum
                },
                include: {
                    model: SeatRecord,
                    attributes: ['takeOrReturn', 'createdAt'],
                    limit: 1,
                    order: [ [ 'createdAt', 'DESC' ]]
                }
            });
            console.log(record);
            res.send(record);
        }
    }
} catch (error) {
    console.error(error);
    next(error);
}
});

module.exports = router;