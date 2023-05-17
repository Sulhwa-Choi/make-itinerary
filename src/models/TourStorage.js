"use strict";

const db = require("../config/db");

class TourStorage {

    static getTourInfo(cityCode) {
        console.log("cityCode : " + cityCode);
        return new Promise((resolve, reject) => {
            console.log("스토리지까지")
            const query = "select * from attraction where city_code = ?";
            db.query(query, [cityCode], (err, data) => {
                console.log(data);
                if (err) reject(err);
                resolve(data);
            })
        })
    } 
}

module.exports = TourStorage;