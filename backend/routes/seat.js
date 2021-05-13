const express = require('express');
const { ReadingRoom, Seat, SeatRecord } = require('../models');

const router = express.Router();

// '/:readingRoom/(:seatNumber)?'
router.get('/:readingRoom', async (req, res) => {
    try{
       /* let seatNum;
    if(req.params.seatNumber == null)
        seatNum = 0;
    else seatNum = parseInt(req.params.seatNumber); */
    // 중앙 미래로 노트북 id 1 (열람실 id는 DB 접근 X)
    if(req.params.readingRoom==='CNTMRRNTB') {
        /*if(seatNum >=1 && seatNum <= 89) {
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
            res.send(record);
        } else { */
            const record = await Seat.findAll({
                where: {
                    ReadingRoomId: 1,
                },
                attributes: {
                    exclude: ['ReadingRoomId']
                },
                include: {
                    model: SeatRecord,
                    attributes: ['takeOrReturn', 'createdAt'],
                    limit: 1,
                    order: [ [ 'createdAt', 'DESC' ]]
                }
            });
            let result = [];
            result.push({});
            await record.forEach(e => {
                let data = {};
                data["seatNumber"] = e.seatNumber;
                data["taken"] = e.SeatRecords[0].takeOrReturn;
                data["time"] = e.SeatRecords[0].createdAt.toISOString().replace('.000Z','');
                result.push(data);
            });
            res.json(result);
       // }
    }
} catch (error) {
    console.error(error);
    next(error);
}
});

module.exports = router;