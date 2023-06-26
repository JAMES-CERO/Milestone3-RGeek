import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './views/homePage';
import NavBar from './views/navbar';
import LoginPage from './views/loginPage';
import ProfilePage from './views/profilePage';
import authReducer from "./state";
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { createTheme } from '@mui/system';
import { themeSettings } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';


function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token)) 
    return (
        <div className="app">
            <BrowserRouter>


                        <Routes>
                            <Route path='/' element={<LoginPage />} />
                            <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to="/" />} />
                            <Route path='/profile/:userId' element={isAuth ? < ProfilePage /> : <Navigate to="/" />} />
                            {/* <Route path='/home' element={ <HomePage />  } />
                            <Route path='/profile/:userId' element={ < ProfilePage />} /> */}
                        </Routes>

      
            </BrowserRouter>
        </div>
    )
}

export default App;
