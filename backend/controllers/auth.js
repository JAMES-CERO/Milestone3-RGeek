import bcrypt from 'bcrypt'
import User from "../models/User.js";

export const register = async (req, res) => {
    try{
        const {
            firstname,
            lastname,
            email,
            password,
            pictureURL,
            friends,
            location,
            occupation
        } = req.body;

       const salt = await bcrypt.genSalt();
       const passwordHash = await bcrypt.hash(password, salt)
       const newUser = new User({
            firstname,
            lastname,
            email,
            password: passwordHash,
            pictureURL,
            friends,
            location,
            occupation
       });

       const saveUser = await newUser.save();
       res.status(201).json(saveUser)

    } catch (err){
        res.status(404).json({ error: err.message})
    }
}