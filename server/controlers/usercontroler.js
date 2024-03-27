const usermodal = require('../Models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailValidator = require("email-validator");

// Controller for user registration
exports.registerControllers = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                massage: 'please fill all the feiled'
            })
        }

        // Validate email format
        if (!emailValidator.validate(email)) {
            return res.status(400).send({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        const existuser = await usermodal.findOne({ email })
        if (existuser) {
            return res.status(401).send({
                success: false,
                massage: 'email already exits'
            })
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        // Save new user
        const user = new usermodal({ email, password: hashedpassword })
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.SECRETE_KEY, { expiresIn: '1d' });

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
            sucure: true,
            samesite: "none"
        });

        return res.status(201).send({
            success: true,
            massage: 'new user created',
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            massage: 'error in resister callback',
            success: false,
            error
        })
    }
}

// Controller for user login
exports.loginControllers = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({
                message: 'please provide email and password',
                success: false
            })
        }

        const user = await usermodal.findOne({ email });

        if (!user) {
            return res.status(200).send({
                success: false,
                massage: 'email is not register'
            })
        }

        const ismatch = await bcrypt.compare(password, user.password)

        if (!ismatch) {
            return res.status(401).send({
                success: false,
                massage: 'invalid email and password'
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRETE_KEY, { expiresIn: '1d' });

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
            samesite: "none",
            secure: true
        });

        return res.status(200).send({
            success: true,
            massage: 'Login successfully',
            user
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            massage: 'error in login callback',
            success: false,
            error
        })
    }
}
