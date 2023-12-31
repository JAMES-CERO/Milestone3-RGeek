import express from "express";
import {
    getUser,
    getuserFriends,
    addOrRemoveFriend
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//GET

router.get('/:id', verifyToken, getUser);
router.get("/:id/friends", verifyToken, getuserFriends);

//UPDATE

router.patch("/:id/:friendId", verifyToken, addOrRemoveFriend);

 export default router;