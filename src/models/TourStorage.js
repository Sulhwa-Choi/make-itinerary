"use strict";

const db = require("../config/db");

class TourStorage {

    static getTourInfo(cityCode) {
        return new Promise((resolve, reject) => {
            const query = "select * from attraction where city_code = ?";
            db.query(query, [cityCode], (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
    
    static saveTourInfo(tours) {
        return new Promise((resolve, reject) => {
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

    static deleteTourInfo (tours) {
        return new Promise((resolve, reject) => {
            // DELETE 쿼리 생성
            const conditionsString = tours
                .map(condition => {
                const pairs = Object.entries(condition)
                    .map(([key, value]) => `${key} = '${value}'`);
                return `(${pairs.join(' AND ')})`;
                })
                .join(' OR ');

            const query = `DELETE FROM attraction WHERE ${conditionsString}`;
            console.log(query);

            db.query(query, (err, result) => {
                if (err) reject(`${err}`); 
                resolve({ success : true }); 
            });
        });
    }
}

module.exports = TourStorage;