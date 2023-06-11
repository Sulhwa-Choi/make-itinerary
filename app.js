"use strict"

const express = require("express");
const dotenv = require("dotenv"); // 환경변수 세팅 관리용
dotenv.config();

const app = express();

// 라우팅
const home = require("./src/routes/home");

// 앱세팅
app.set("views", "./src/views");
app.set("view engine","ejs");
//app.use(express.static(`${__dirname}/src/public`));
app.use(express.static(`${__dirname}`));

app.use('/img', express.static('img'))
/*
--> 4.16버전 이상 부터는 express 내부에 bodyParser가 포함
app.use(bodyParser.json()); // json데이터를 파싱할 수 있도록
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함된 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extendede : true}));
--> 아래처럼 
*/
app.use(express.json());
//app.use(express.urlencoded({extended: true}));
app.use(express.urlencoded({
    limit:"1000mb",
    extended: true
}));
app.use("/",home); // use : 미들웨어를 등록해주는 메서드

module.exports = app;