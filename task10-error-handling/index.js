require("dotenv").config();

require("./config/db");

const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {

    res.status(500).json({

        success: false,

        message: err.message

    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});