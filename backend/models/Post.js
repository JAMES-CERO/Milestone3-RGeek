import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
        min: 5,
        max: 10
    },
    lastName:{
        type: String,
        required: true,
        min: 2,
        max: 10
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: []
    }
},
{ timestamps: true}
);

const Post = mongoose.model("Post", PostSchema);

export default Post;