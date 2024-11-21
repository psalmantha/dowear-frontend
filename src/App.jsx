import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from "./pages/SignupPage"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}
export default App