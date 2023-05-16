"use strict";

const db = require("../config/db");

class UserStorage {

    static getUserInfo(id) {
        // Promise안에 있는 구문이 성공하면 resolve를 실행, 실패하면 reject 실행
        return new Promise((resolve, reject) => {
            const query = "select * from users where id = ?";
            db.query(query, [id] , (err,data) => {
                if (err) reject(err); // db 쿼리를 실행시 에러나면 -> err를 던짐
                resolve(data[0]); // 성공하면 resolve(data);
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "insert into users(id, name, psword) values (?,?,?)";
            db.query(query, [userInfo.id, userInfo.name, userInfo.psword] , (err) => {
                if (err) reject(`${err}`); // Object objec으로 뜨기때문에 err를 저렇게 처리해야함
                resolve({ success : true }); 
            });
        });
    }

}


module.exports = UserStorage;