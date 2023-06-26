
import {
    ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined
} from "@mui/icons-material"
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";

import FlexMUI from "components/FlexMUI";
import WidgetControl from "components/WidgetControl";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostCon = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => { 
    const dispatch = useDispatch();
    const [hasComments, setHasComments] = useState(false)
    const token = useSelector((state) => state.token)
    const loggedInUserId = useSelector((state) => state.user._id)
    const hasLike = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length;
    const { palette } = useTheme();

    const numberLikes = async () => {
        const response = fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, loggedInUserId})
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost}));
    };

    return (
        <WidgetControl m="2rem 0">
            <Typography>
                {description}
            </Typography>
            {picturePath && (
                <img 
                    width="100%" height="auto" alt="post" src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexMUI mt= "0.25rem">
                <FlexMUI gap="1rem">
                    <FlexMUI gap="0.3rem">
                        <IconButton>
                            {hasLike ? (
                                <FavoriteOutlined sx={{ color: palette.primary.icon }}/>
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography> {likeCount}</Typography>
                    </FlexMUI>
                    <FlexMUI gap="0.3rem">
                    <IconButton>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography> {comments.length}</Typography>
                    </FlexMUI>
                </FlexMUI>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexMUI>
            {hasComments &&(
                <Box>
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetControl>
    );

};

export default PostCon;