import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "views/navbar";
import UserW from "views/widgets/UserW"
import PostW from "views/widgets/PostW"
import PostsControl from "views/widgets/PostsControl";

const HomePage = () => {

    const noMobileScreen = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath} = useSelector((state) => state.user);
    
    return (
     <Box>
        <NavBar/>
        <Box display={noMobileScreen ? "flex" : "block"} gap="0.5rem" justifyContent="space-between" width="100%" padding="2rem 6%">
            <Box flexBasis={noMobileScreen ? "26%" : undefined}>
                <UserW 
                userId={ _id} picturePath={picturePath}
                />
            </Box>
            <Box flexBasis={noMobileScreen ? "42%" : undefined}
                  mt={noMobileScreen ? undefined : "2rem"}>
                <PostW picturePath={picturePath} />
                <PostsControl userId={_id} />
            </Box>

            {noMobileScreen && <Box flexBasis="26%"></Box>}
        </Box>
     </Box>
    )
}

export default HomePage;