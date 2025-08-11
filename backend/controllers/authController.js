const User= require('../models/User');

const CryptoJS= require('crypto-js');
const jwt= require('jsonwebtoken');

module.exports = {
    createUser: async(req, res) => {
        try {
            console.log('Registration request received:', req.body);
            
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                location: req.body.location,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
            });
            
            console.log('User object created:', { username: newUser.username, email: newUser.email, location: newUser.location });
            
            await newUser.save();
            console.log('User saved successfully');

            res.status(201).json({message: "User successfully created"})
        } catch (error) {
            console.log('Registration error:', error);
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                return res.status(400).json({message: "Email already exists. Please use a different email address."});
            }
            
            if (error.name === 'ValidationError') {
                return res.status(400).json({message: "Please provide all required fields correctly."});
            }
            

            res.status(500).json({message: error.message || "Registration failed. Please try again."})
        }
    },
    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            
            if (!user) {
                return res.status(401).json({message: "Wrong Credential Provide a Valid E-mail"});
            }

            const decryptedPassword = CryptoJS.AES.decrypt(user.password,process.env.SECRET);
            const decryptedpass = decryptedPassword.toString(CryptoJS.enc.Utf8);

            if (decryptedpass !== req.body.password) {
                return res.status(401).json({message: "Wrong Password"});
            }

            const userToken = jwt.sign(
                {
                    id: user.id
                },process.env.JWT_SEC, {expiresIn: "7d"}
            );

            const {password,__v, createdAt, updatedAt, ...userData} = user._doc;

            res.status(200).json({...userData, token: userToken})
            
        } catch (error) {
             res.status(500).json({message: error})
        }
    },
}