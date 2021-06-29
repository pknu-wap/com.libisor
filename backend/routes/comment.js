const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
//const { User, Post } = require('../models');
const Sequelize = require('sequelize');
const User = require('../models/user');
const Post = require('../models/post');

const router = express.Router();

router.get('/', async (req, res) => { // 최근 코멘트 10개 날리기
    const posts = await Post.findAll({
        limit: 10,
        order: [ [ 'createdAt', 'DESC' ]],
        attributes: ['id', 'content', 'createdAt', 'UserId','likes'],
        /* belongsTo 상위를 못 가져오는 에러
        include: {
            model: User,
            attributes: ['localId'],
            limit: 1
        } 
        */
    });
    let result = [];
    for ( i in posts) {
        const writer = await User.findOne({
            attributes: ['localId'],
            where: {id : posts[i].UserId},
        });
        let data = {};
        data["commentId"] = posts[i].id;
        if(writer !== null) data["writer"] = writer.localId;
        else data["writer"] = '탈퇴한 유저';
        data["likes"] = posts[i].likes;
        data["content"] = posts[i].content;
        data["createdAt"] = posts[i].createdAt;
        result.push(data);
    }
    return res.json(result);
});

router.post('/', isLoggedIn, async (req, res) => { // 코멘트 작성 
    const { id , comment } = req.body;
    console.log('hkab');
    const userId = await User.findOne({
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

router.post('/like/:commentId', isLoggedIn, async(req,res,next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.commentId}});
        if(post) {
            await post.addLiker(parseInt(req.user.id,10));
            
            const likers = await post.getLikers();
            console.log(post.id+"//////////"+likers.length+'======================================================');
            await Post.update({likes: Sequelize.literal(`${likers.length}`)}, { where: { id: req.params.commentId }});
            res.status(200).send('liked');
        } else {
            res.status(404).send('ERROR');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/', isLoggedIn, async (req, res) => {
    const { commentId } = req.body;
    // 해당 댓글 UserId와 세션의 user id가 같은지 비교후 맞으면
    await Post.destroy({where: {id: commentId}});
    return res.status(200).send('deleted');
});

module.exports = router;