require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {

    res.send("Home Route Working");

});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({

    name: String,
    email: String

});

const User = mongoose.model("User", userSchema);

app.post("/submit", async (req, res) => {

    const user = await User.create(req.body);

    res.json(user);

});

app.listen(5000, () => {

    console.log("Server Running");

});