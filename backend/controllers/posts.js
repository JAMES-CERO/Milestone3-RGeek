import Post from "../models/Post.js"
import User from "../models/User";

//Create
export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lasttName: user.lasttName,
            location: user.location,
            description: user.description,
            picturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: {},
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message})
    }
}

//Read

export const getFeed = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post)

    } catch (err) {
        res.status(404).json({ message: err.message})
    }
}

// get 
export const getUserPost = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId })
        res.status(200).json(posts)

    } catch (err) {
        res.status(404).json({ message: err.message})
    }
}
