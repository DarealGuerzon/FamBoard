const express = require('express');
const router = express.Router();
const User = require('../models/User');

// add a new user
router.post('/', async (req, res) => {
    try {
        const user = new User({name: req.body.name});
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;