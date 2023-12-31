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
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexMUI from "components/FlexMUI";;

const NavBar = () => {

    const [mobileMenu, setMobileMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const noMobileScreen = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();

    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const skyblue = theme.palette.neutral.skyblue;

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <FlexMUI padding=' 1rem 6%' backgroundColor="black">
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
                            color: primaryLight,
                        }
                    }}
                >
                    RGeeks
                </Typography>
                {noMobileScreen || mobileMenu ? (
                    <FlexMUI gap='3rem' borderRadius="9px" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search.." />
                        <IconButton>
                            <Search color="pink" />
                        </IconButton>
                    </FlexMUI>
                ) : null}
            </FlexMUI>

            {noMobileScreen ? (
                <FlexMUI gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.mode === 'dark' ? (
                            <DarkMode sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightMode sx={{ color: "lightblue", fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <Message sx={{ color: 'pink', fontSize: "25px" }} />
                    <Notifications sx={{ color: 'pink', fontSize: "25px" }} />
                    <Help sx={{ color: 'pink', fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: 'red',
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: skyblue,
                                },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName} >
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())} > Log Out!</MenuItem>
                        </Select>
                    </FormControl>
                </FlexMUI>
            ) : (
                <IconButton onClick={() => setMobileMenu(!mobileMenu)}>
                    <Menu />
                </IconButton>
            )}

            {/* {mobile sc} */}
            {!noMobileScreen && mobileMenu && (
                <Box position='fixed' backgroundColor='black' right='0' bottom='0' height="100%"
                    zIndex="10" maxWidth="500px" minWidth="300px"
                >
                    <Box display='flex' justifyContent='frex-end' p="1rem">
                        <IconButton onClick={() => setMobileMenu(!mobileMenu)}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/* {Menuitem} */}
                    <FlexMUI display='flex' flexDirection='column' justifyContent="center" alignItems='center' gap='3rem'>
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ color: primaryLight, fontSize: '25px' }}
                        >
                            {theme.palette.mode === 'dark' ? (
                                <DarkMode sx={{ fontSize: '25px' }} />
                            ) : (
                                <LightMode sx={{ color: 'dark', fontSize: '25px' }} />
                            )}
                        </IconButton>
                        <Message sx={{ color: 'pink', fontSize: "25px" }} />
                        <Notifications sx={{ color: 'pink', fontSize: "25px" }} />
                        <Help sx={{ color: 'pink', fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullName}>
                            <Select value={fullName}
                                sx={{
                                    backgroundColor: skyblue,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: 'black',
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                {/* <MenuItem onClick={() => dispatch(setLogout())} > Log Out!
                                </MenuItem> */}
                                    <MenuItem onClick={() => dispatch(setLogout())}>
                                        <FlexMUI
                                            alignItems="center"
                                            color={theme.mode === "dark" ? "red" : "red"} 
                                        >
                                      Log Out!
                                        </FlexMUI>
                                    </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexMUI>
                </Box>
            )}
        </FlexMUI>
    );
};

export default NavBar;