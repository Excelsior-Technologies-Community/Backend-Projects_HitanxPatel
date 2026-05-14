const express = require("express");

const router = express.Router();

const {
    testError
} = require("../controllers/userController");

router.get("/error", testError);

module.exports = router;