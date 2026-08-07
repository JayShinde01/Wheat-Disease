import React from 'react'
import {BrowserRouter as Router, Routes, Route,Link, useNavigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import OAuthSuccess from './pages/OAuthSuccess'
function App() {
 
  return (
<>

  <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/home' element={<HomePage/>} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Routes>
  </Router>
    <div>App</div>
    


</>
     
  )
}

export default App