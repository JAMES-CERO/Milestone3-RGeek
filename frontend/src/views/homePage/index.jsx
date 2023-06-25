import { Box } from "@mui/material";
import NavBar from "views/navbar";
import UserW from "views/widgets/UserW"

const HomePage = () => {
    return (
     <Box>
        <NavBar/>
        <Box>
            <UserW>

            </UserW>
        </Box>
     </Box>
    )
}

export default HomePage;