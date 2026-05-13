const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword

        });

        res.status(201).json({

            success: true,
            message: "User Registered Successfully",
            user

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){

            return res.status(400).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            { expiresIn: "1h" }

        );

        res.status(200).json({

            success: true,
            message: "Login Successful",
            token

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getUsers = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;

        const limit = 5;

        const search = req.query.search || "";

        const email = req.query.email || "";

        const users = await User.find({

            name: {
                $regex: search,
                $options: "i"
            },

            email: {
                $regex: email,
                $options: "i"
            }

        })

        .skip((page - 1) * limit)

        .limit(limit);

        res.status(200).json({

            success: true,

            currentPage: page,

            totalUsers: users.length,

            users

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.addManyUsers = async (req, res) => {

    try {

        const users = await User.insertMany(req.body);

        res.status(201).json({

            success: true,

            users

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};