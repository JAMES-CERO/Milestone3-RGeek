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
       const passwordHash = await bcrypt.hash(password, salt);

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
       res.status(201).json(saveUser);
    } catch (err){
        res.status(404).json({ error: err.message});
    }
}

//loggin 

export const login = async (req, res) => {
    try {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user) return res.status(400).json({msg: "User does not exist"});

    const isMatch = await bcrypt.compare( password, user.password);
    if(!isMatch) return res.status(400).json({msg: "invalid credentials"});

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user})

    } catch(err) {
        res.status(500).json({error: err.message });
    }
}

