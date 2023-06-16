import { useState } from "react";
import {
    Box,
    Typography,
    useMediaQuery
} from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return( <div>
        <Typography
          fontWeight='bold'
          fontSize='clamp(1rem,2rem,2.5rem)'
          color='red'
          backgroundColor = 'black'
          onClick = {() => navigate('/home')}
          >
             RGeeks
        </Typography>
        
        
    </div>)
}

export default NavBar;