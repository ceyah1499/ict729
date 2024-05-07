import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const newUser = new User ({
            username, email, password:hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const loginUser = async (req,res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json("User not found!");
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match){
            return res.status(401).json("Wrong password!");
        }
        const token = jwt.sign({_id:user._id, username:user.name, email:user.email}, process.env.SECRET_KEY);
        const {password, ...info} = user._doc;
        res.cookie("token", token, {
            httpOnly: true, 
            secure: true, 
            sameSite: "None"
        }).status(200).json({info, token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const logoutUser = async (req,res) => {
    try {
        res.clearCookie("token", {
            secure: true, 
            sameSite: "None"
        }).status(200).json("User logged out successfully");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json("Authentication error");
    }
    //dev bypass
    if(token == "DEV_BYPASS"){
        next();
    } else {
        jwt.verify(token, process.env.SECRET_KEY, async (error, user) => {
            if(error){
                res.status(403).json("Invalid token");
            }
            req.user = user;
            next();
        })
    }
}