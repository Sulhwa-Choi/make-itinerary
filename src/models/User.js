"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        try {
            const {id, psword} = await UserStorage.getUserInfo(client.id);
    
            // console.log(UserStorage.getUserInfo(client.id)); 
            // --> Promise { <pending> } 출력
            // promise를 반환하는 애는 일반적으로 시간이 소요가 됨
            // 그래서 promise 데이터를 다 읽어오지 못해서  pending이 찍힘
            // 데이터를 다 읽어올때까지 기다리라는 await을 써주면 되는데, 얘는 async 함수 안에서만 사용가능함
    
            if (id) {
                if (id === client.id && psword === client.psword) {
                    return {success : true};
                }
                return {success : false , msg : "비밀번호가 틀렸다"};    
            }
            return {success : false , msg : "존재하지 않는 아이디다."}; 
        } catch (err) {
            return {success: false, msg: err };
        }
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return {success : false, msg : err};
        }
        
    }
}

module.exports = User;
