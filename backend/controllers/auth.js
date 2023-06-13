import User from "../models/User";

export const register = async (req, res) => {
    try{
        const {
            firsyname,
            lastname,
            email,
            password,
            pictureURL,
            friends,
            location,
            occupation
        } = req.body;

       
    } catch (err){
        console.log(err, 'error auth')
    }
}