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
    
    static saveTourInfo(tours) {
        return new Promise((resolve, reject) => {
            console.log("here")
            var sqls = ""
            var params = [];
            const query = "insert into attraction (city, city_code, korean_name, english_name, price, day_off, description, img) values ? ";
            for (var i = 0 ; i < tours.length; i++) {
                var tour = tours[i];
                var arr = new Array();
                arr[0] = tour.cityName;
                arr[1] = tour.cityCode;
                arr[2] = tour.koreanName;
                arr[3] = tour.englishName;
                arr[4] = tour.price;
                arr[5] = tour.dayOff;
                arr[6] = tour.description;
                arr[7] = tour.image;
                params.push(arr);
            }

            console.log(params);

            db.query(query, [params] , (err, result) => {
                if (err) reject(`${err}`); // Object objec으로 뜨기때문에 err를 저렇게 처리해야함
                console.log(result);
                resolve({ success : true }); 
            });
        });
    }
}

module.exports = TourStorage;