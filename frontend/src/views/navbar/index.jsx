import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Select,
    MenuItem,
    FormControl,
    Typography,
    useMediaQuery
} from '@mui/material'
import {
    Notifications,
    Search,
    Message,
    DarkMode,
    LightMode,
    Help,
    Menu,
    Close
} from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexMUI from "../../components/FlexMUI";

const NavBar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const noMobileScreen = useMediaQuery("(min-width: 1000px)");



    return (
        <FlexMUI padding=' 1rem 6%'>
            <FlexMUI>
                <Typography
                    fontWeight='bold'
                    fontSize='clamp(1rem,2rem,2.5rem)'
                    color='red'
                    backgroundColor='black'
                    onClick={() => navigate('/home')}
                    sx={{
                        '&:hover': {
                            cursor: 'pointer',
                            // color: 
                        }
                    }}
                >
                    RGeeks
                </Typography>
                { mobileMenu ? (
                    <FlexMUI>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {backgroundColor === 'black' ? (
                                <DarkMode sx={{fontSize: '25px'}} />
                            ) : (
                                <LightMode sx={{ color: 'white', fontSize: '25px'}} />
                            )}
                        </IconButton>
                        <Message />
                        <Notifications />
                        <Help />
                        <FormControl>
                            <Select>
                                <MenuItem></MenuItem>
                            </Select>
                        </FormControl>
                    </FlexMUI>
                ) : (
                    <IconButton>

                    </IconButton>
                )

                }
            </FlexMUI>
        </FlexMUI>
    )
}

export default NavBar;