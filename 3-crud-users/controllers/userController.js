const User = require("../models/userModel");

exports.createUser = async (req, res) => {
    try {

        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.getUsers = async (req, res) => {
    try {

        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.updateUser = async (req, res) => {
    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedUser);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.deleteUser = async (req, res) => {
    try {

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "User Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};