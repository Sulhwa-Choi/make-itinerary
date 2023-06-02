"use strict";

const TourStorage = require("./TourStorage");

class Tour {
    constructor(body){
        this.body = body;
    }

    async getTourInfo() {
        const tour = this.body;
        try {
            const tourInfo = await TourStorage.getTourInfo(tour);
            if (tourInfo) {
                return tourInfo;
            } else {
                return {success : false , msg : "정보가 존재하지 않는다"}
            }    
        } catch (err) {
            return {success: false, msg: err };
        } 
    }

    async saveTourInfo () {
        const tour = this.body;
        try {
            const response = await TourStorage.saveTourInfo(tour);
            return response;
        } catch (err) {
            return {success : false, msg : err};
        }
    }

    async deleteTourInfo () {
        const tour = this.body;
        try {
            const response = await TourStorage.deleteTourInfo(tour);
        } catch (err) {
            return {success : false, msg : err};
        }
    }

    async updateTourInfo () {
        const tour = this.body;
        try {
            const response = await TourStorage.updateTourInfo(tour);
            console.log("TOUR.js")
            console.log(response);
            return response;
        } catch (err) {
            console.log("err in Tour.js")
            console.log(err);
            return {success : false, msg : err};
        }
    }
}

module.exports = Tour;