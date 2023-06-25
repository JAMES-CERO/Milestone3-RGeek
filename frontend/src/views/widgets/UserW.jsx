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
import UserImage from "components/UserImage"
import WidgetControl from "components/WidgetControl"

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
        <WidgetControl>
            <FlexMUI pb='1.1rem' onClick={() => navigate(`/profile/${userId}`)}>
                <FlexMUI>
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography variant="h4" color='dark' fontWeight='500'
                            sx={{
                                "&hover": {
                                    color: palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {/* {firstName} {lastName} */}
                            first name
                        </Typography>
                        <Typography>
                            {/* {friends.length} */}
                            friends
                        </Typography>
                    </Box>
                </FlexMUI>
                <ManageAccountsOutlined />
            </FlexMUI>
            <Divider />

            <Box p="1ren 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" />
                    <Typography>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" />
                    <Typography>{occupation}</Typography>
                </Box>
            </Box>

        </WidgetControl>
    );

};

export default UserW;