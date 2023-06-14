import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import homePage from './views/homePage';
import navBar from './views/navbar';
import loginPage from './views/loginPage';
import profilePage from './views/profilePage';

function App() {
  return (
      <div className="app"> 
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<loginPage />} />
                  <Route path='/home' element={<homePage />} />
                  <Route path='/profile/:userId' element={< profilePage />} />
              </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App;
