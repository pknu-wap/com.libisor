const Sequelize =  require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Comment = require('./comment');
const ReadingRoom = require('./readingRoom');
const Seat = require('./seat');
const SeatRecord = require('./seatRecord');
const TextLog = require('./textLog');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Comment = Comment;
db.ReadingRoom = ReadingRoom;
db.Seat = Seat;
db.SeatRecord = SeatRecord;
db.TextLog = TextLog;


// .init(sequelize);
User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Comment.init(sequelize);
ReadingRoom.init(sequelize);
Seat.init(sequelize);
SeatRecord.init(sequelize);
TextLog.init(sequelize);

// .associate(db);
User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Comment.associate(db);
ReadingRoom.associate(db);
Seat.associate(db);
SeatRecord.associate(db);
TextLog.associate(db);

module.exports = db;