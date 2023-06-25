import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Select,
    MenuItem,
    FormControl,
    Typography,
    useTheme,
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
    const theme = useTheme();



    return (
        <FlexMUI padding=' 1rem 6%'>
            <FlexMUI gap='1.75rem'>
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

                { noMobileScreen ? (
                    <FlexMUI gap='2rem'>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.mode  === 'black' ? (
                                <DarkMode sx={{fontSize: '25px'}} />
                            ) : (
                                <LightMode sx={{  fontSize: '25px'}} />
                            )}
                        </IconButton>
                        <Message />
                        <Notifications />
                        <Help />
                        <FormControl>
                            <Select>
                                <MenuItem >
                                    <Typography></Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())} > Log Out!</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexMUI>
                ) : (
                    <IconButton onClick={() => setMobileMenu(!mobileMenu)}>
                        <Menu/>
                    </IconButton>
                )}

                {/* {mobile sc} */}
                {!noMobileScreen && mobileMenu && (
                    <Box position='fixed' backgroundColor= 'black'>
                        <Box display='flex' justifyContent='frex-end'>
                            <IconButton onClick={() => setMobileMenu(!mobileMenu)}>
                                <Close />
                            </IconButton>
                        </Box>

                        {/* {Menuitem} */}
                        <FlexMUI display='flex' flexDirection='column' alignItems='center' gap='3rem'>
                        <IconButton 
                            onClick={() => dispatch(setMode())}
                            sx = {{ fontSize: '25px'}}
                            >
                            {theme.mode  === 'black' ? (
                                <DarkMode sx={{fontSize: '25px'}} />
                            ) : (
                                <LightMode sx={{  fontSize: '25px'}} />
                            )}
                        </IconButton>
                        <Message />
                        <Notifications />
                        <Help />
                        <FormControl>
                            <Select>
                                <MenuItem >
                                    <Typography></Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())} > Log Out!</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexMUI>
                    </Box>
                )}

            </FlexMUI>
        </FlexMUI>
    )
}

export default NavBar;