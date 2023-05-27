
const User = require("../../models/User");
const Tour = require("../../models/Tour");

const output = {
    home : (req, res)=>{
        res.render("home/index");
    },
    login : (req, res)=>{
        res.render("home/login");
    },
    register : (req, res)=>{
        res.render("home/register");
    },
    tourInfo : (req, res) => {
        res.render("home/tourInfo");
    },
}



const process = {
    login : async (req, res) => {
        const user = new User(req.body); // User class를 인스턴스화 할때 req.body의 값을 들고 생성됨
        const response = await user.login();
        return res.json(response);
    },
    register : async (req, res) => {
        const user = new User(req.body); // User class를 인스턴스화 할때 req.body의 값을 들고 생성됨
        const response = await user.register();
        return res.json(response);
    },
    getTourInfo : async (req, res) => {
        const tour = new Tour(req.body.city); 
        const response = await tour.getTourInfo();
        return res.json(response);
    },
    saveTourInfo : async (req, res) => {
        const tour = new Tour(req.body); 
        const response = await tour.saveTourInfo();
        return res.json(response);
    },
    deleteTourInfo : async (req, res) => {
        const tour = new Tour(req.body); 
        const response = await tour.deleteTourInfo();
        return res.json(response);
    },
}



module.exports = {
    output,
    process,
};