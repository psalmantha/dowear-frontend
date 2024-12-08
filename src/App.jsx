import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignupPage'
import ViewProduct from './pages/ViewProduct'
import PrivateRoute from './components/common/PrivateRoute'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/view" element={<ViewProduct/>}/>
        <Route path="/profile" 
          element={<PrivateRoute><ProfilePage/></PrivateRoute>}
        />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App