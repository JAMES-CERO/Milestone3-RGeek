import  express  from "express";
import {
    getUserPost,
    getFeed,
    likePost,
} from '../controllers/posts.js'
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//Get

router.get("/", verifyToken, getFeed)
router.get('/:userId/posts', verifyToken, getUserPost)

//Update

router.patch('/:id/like', verifyToken, likePost)

export default router;