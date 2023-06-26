import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostCon from "./PostCon";

const PostsControl = ({userId, isProfile = false}) => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`}
        }
    );
        const data = await response.json();
        dispatch(setPosts({ posts: data}));
    }

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`}
        }
    );
        const data = await response.json();
        dispatch(setPosts({ posts: data}))
    }

    return (
        <>
        {posts.map(
            ({ _id,
                userId,
                firstName,
                lastName,
                description,
               location,
                picturePath,
                userPicturePath,
                likes,
                comments 
            
            }) => (
                <PostCon
                key ={_id}
                postId={userId}
                postUserId={firstName}
                name={`${firstName} ${lastName} `}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                />

            )
        )}
        </>
    );


};

export default PostsControl;