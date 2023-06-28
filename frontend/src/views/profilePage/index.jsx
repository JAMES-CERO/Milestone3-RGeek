import UserW from "views/widgets/UserW";
import PostsControl from "views/widgets/PostsControl";
import FriendListW from "views/widgets/FriendListW";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "views/navbar";
import PostW from "views/widgets/PostW";

const ProfilePage = () => {

    const [user, setUser] = useState(null);
    const {userId} = useParams();
    const token = useSelector((state) => state.token)
    const noMobileScreen = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json()
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, [])

    if(!user) return null

    return ( 
        <Box>
            <NavBar />
            <Box display={noMobileScreen ? 'flex' : 'block'} justifyContent='center' width="100%" padding='2rem 6%' gap='2rem' >
                <Box flexBasis={noMobileScreen ? "26%" : undefined} >
                    <UserW userId={userId}  />
                    <Box gap='2rem 0' />
                    <FriendListW userId={userId} />
                </Box>
                <Box flexBasis={noMobileScreen ? "42%" : undefined}
                      mt={noMobileScreen ? undefined : "2rem"}>
                        <PostW picturePath={user.picturePath} />
                        <Box m='2rem 0' />
                        <PostsControl userId={userId} isProfile />
                </Box>
            </Box>           
        </Box>
    )
}

export default ProfilePage;