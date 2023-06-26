import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "views/navbar";
import UserW from "views/widgets/UserW"
import PostW from "views/widgets/PostW"
import PostsControl from "views/widgets/PostsControl";

const HomePage = () => {

    const noMobileScreen = useMediaQuery("(min-width: 1000px)");
    const { id, picturePath} = useSelector((state) => state.user);
    
    return (
     <Box>
        <NavBar/>
        <Box display={noMobileScreen ? "flex" : "block"} gap="0.5rem" justifyContent="space-between" width="100%">
            <Box flexBasis={noMobileScreen ? "26%" : undefined}>
                <UserW 
                userId={id} picturePath={picturePath}
                />
            </Box>
            <Box>
                <PostW ></PostW>
                <PostsControl />
            </Box>

            {noMobileScreen && <Box flexBasis="26%"></Box>}
        </Box>
     </Box>
    )
}

export default HomePage;