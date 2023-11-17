const express = require('express');
const User = require('../models/Users');
const router = express.Router();

const { body, validationResult } = require('express-validator');

router.post('/login', [
    body('email', 'Enter a Valid email').isEmail(),
    body('password', 'Password entered is incorrect').exists(),
], async (req, res) => {
    let success = false
    //If there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the user with this email exists or not
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const passwordCompare = password===user.password;
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        res.json({ status: "successfully logged in",success:"true",emp_id:user.emp_id });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router