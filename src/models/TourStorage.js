"use strict";

const db = require("../config/db");
const fs = require('fs');

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
            const query = "insert into attraction (city_code, city_name, korean_name, english_name, price, day_off, description, img) values ? ";
            for (var i = 0 ; i < tours.length; i++) {
                var tour = tours[i];
                var arr = new Array();
                arr[0] = tour.cityCode;
                arr[1] = tour.cityName;
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

    static updateTourInfo(tours) {
        return new Promise((resolve, reject) => {
          var successCount = 0;
          var queryPromises = []; // 쿼리 실행을 Promise로 래핑하기 위한 배열
      
          tours.forEach((tour) => {
            const { aid, cityCode, cityName, koreanName, englishName, price, description, dayOff, image } = tour;
            const query = `UPDATE attraction
                          SET city_code = '${cityCode}',
                              city_name = '${cityName}',
                              korean_name = '${koreanName}',
                              english_name = '${englishName}',
                              price = '${price}',
                              description = '${description}',
                              day_off = '${dayOff}',
                              img = '${image}'
                          WHERE aid = '${aid}'`;
      
            // 각 쿼리 실행을 Promise로 래핑하여 배열에 추가
            queryPromises.push(
              new Promise((resolve, reject) => {
                db.query(query, (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    successCount++;
                    resolve();
                  }
                });
              })
            );
          });
      
          // 모든 쿼리가 완료될 때까지 기다림
          Promise.all(queryPromises)
            .then(() => {
              console.log("successCount : " + successCount);
              console.log("tours.length : " + tours.length)
              if (successCount == tours.length) resolve({ success: true });
            })
            .catch((error) => {
              reject(error);
            });
        });
      }

    static saveImage(img) {
      console.log(img)

        return new Promise((resolve, reject) => {
            const query = "select * from attraction where city_code = 01";
            db.query(query, [cityCode], (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
}

module.exports = TourStorage;