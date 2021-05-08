require('dotenv').config();
const env = process.env;

module.exports = {
development : {
  username: env.MYSQL_USERNAME_dev,
  //env.MYSQL_USERNAME은 불러오고자 하는 데이터의 키값이므로 자유롭게 이름설정이 가능하다.
  password: env.MYSQL_PASSWORD_dev,
  database: env.MYSQL_DATABASE_dev,
  host: env.MYSQL_HOST_dev,
  dialect: "mysql",
  //port: env.MYSQL_PORT
},
production : {
  username: env.MYSQL_USERNAME_prd,
  password: env.MYSQL_PASSWORD_prd,
  database: env.MYSQL_DATABASE_prd,
  host: env.MYSQL_HOST_prd,
  dialect: "mysql",
  //port: env.MYSQL_PORT
},
test : {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  //port: env.MYSQL_PORT
}
}