const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// create a new user
const addUser = async (req, res) => {
    // check if user already exists
    const isExist = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });

    if (isExist) {
        return res.status(500).json({ isSuccess: false, message: 'User already exist!' });
    } else {
        try {
            // hash the password for safety purposes
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const user = await User.create({ ...req.body, password: hashedPassword });

            // check if user created successfully or not
            if (user) {
                return res.status(200).json({ isSuccess: true, data: user });
            } else {
                return res.status(500).json({ isSuccess: false, message: 'Signup failed!' });
            }
        } catch (err) {
            return res.status(500).json({ isSuccess: false, message: 'Signup failed!' });
        }
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [{ email: req.body.emailOrUsername }, { username: req.body.emailOrUsername }],
        });

        // check if user exists
        if (user) {
            const isPassMatch = await bcrypt.compare(req.body.password, user.password);
            if (isPassMatch) {
                return res.status(200).json({ isSuccess: true, data: user });
            } else {
                return res.status(500).json({ isSuccess: false, message: 'Invalid credential!' });
            }
        } else {
            return res.status(500).json({ isSuccess: false, message: 'Invalid credential!' });
        }
    } catch (err) {
        return res.status(500).json({ isSuccess: false, message: 'Login failed' });
    }
};

// get all users
const getUsers = async (req, res) => {
    try {
        const response = await User.find({ _id: { $ne: req.params.loggedInUserId } }).select('username email _id');
        return res.status(200).json({ isSuccess: true, data: response });
    } catch (err) {
        return res.status(500).json({ isSuccess: false, message: err.message });
    }
};

// get a single user
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('username email _id');
        if (user) {
            return res.status(200).json({ isSuccess: true, data: user });
        } else {
            return res.status(500).json({ isSuccess: false, message: err.message });
        }
    } catch (err) {
        return res.status(500).json({ isSuccess: false, message: err.message });
    }
};

module.exports = { addUser, getUser, getUsers, getSingleUser };
