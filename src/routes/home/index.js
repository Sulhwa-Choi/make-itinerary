"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/",ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/tourInfo", ctrl.output.tourInfo);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/getTourInfo", ctrl.process.getTourInfo);
router.post("/saveTourInfo", ctrl.process.saveTourInfo);
router.post("/deleteTourInfo", ctrl.process.deleteTourInfo);
router.post("/updateTourInfo", ctrl.process.updateTourInfo);

module.exports = router;