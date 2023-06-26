import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './views/homePage';
import LoginPage from './views/loginPage';
import ProfilePage from './views/profilePage';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token)) 
    return (
        <div className="app">
            <BrowserRouter>
               
                    <CssBaseline />
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
