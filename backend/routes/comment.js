const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Post } = require('../models');

const router = express.Router();

router.get(async (req, res, next) => { // 최근 코멘트 10개 날리기
    const posts = await Post.findAll({
        limit: 10,
        order: [ [ 'createedAt', 'DESC' ]],
        attributes: ['id', 'content', 'createdAt', 'UserId'],
        include: {
            model: User,
            attributes: ['localId'],
            limit: 1
        }
    });
    res.json(posts);
});

router.post(isLoggedIn, async (req, res, next) => { // 코멘트 작성 
    const { id , comment } = req.body;
    const userId = await Post.findOne({
        attributes: ['id'],
        where: {localId : id}
    });
    // 세션에 저장된 id와 userId가 같은지도 확인 해야함.
    // 아니다 그냥 위 findOne을 하지말고 세션에 저장된 id로 바로 댓글 생성하자.
    await Post.create({
        UserId: userId.id,
        content: comment
    });
    return res.status(200).send('ok');
});

router.delete(isLoggedIn, async (req, res, next) => {
    const { commentId } = req.body;
    // 해당 댓글 UserId와 세션의 user id가 같은지 비교후 맞으면
    await Post.destroy({where: {id: commentId}});
    res.redirect('/');
});

module.exports = router;