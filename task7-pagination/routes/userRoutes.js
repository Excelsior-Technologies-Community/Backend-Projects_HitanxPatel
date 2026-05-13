const express = require("express");

const router = express.Router();

const {
    register,
    login,
    getUsers,
    addManyUsers
} = require("../controllers/userController");

router.post("/register", register);

router.post("/login", login);

router.get("/", getUsers);

router.post("/many", addManyUsers);

module.exports = router;