import {
    ManageAccountsOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material"
import { Box, Typography, Divider, useTheme } from "@mui/material"
import FlexMUI from "components/FlexMUI"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const UserW = ({ userId, picturePath }) => {

    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.background.default;
    const main = palette.background.alt;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            })
        const data = await response.json();
        setUser(data);
    };
    useEffect(() => {
        getUser();
    }, [])

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        friends
    } = user;

    return (
        <Box>
            <FlexMUI pb='1.1rem' onClick={() => navigate(`/profile/${userId}`)}>
                <FlexMUI>
                    <img image={picturePath} />
                    <Box>
                        <Typography variant="h4" color='dark' fontWeight='500' 
                                    sx={{
                                        "&hover": {
                                            color: palette.primary.light,
                                            cursor:'pointer'
                                        }
                                    }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography>
                            {/* {friends.length} */}
                             friends
                        </Typography>
                        <ManageAccountsOutlined />
                    </Box>
                </FlexMUI>
            </FlexMUI>
            <Divider />

            <Box>
                <Box>
                    <LocationOnOutlined fontSize="large" />
                    <Typography>{location}</Typography>
                </Box>
                <Box>
                    <WorkOutlineOutlined fontSize="large" />
                    <Typography>{occupation}</Typography>
                </Box>
            </Box>
        </Box>
    )

};

export default UserW;