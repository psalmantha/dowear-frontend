import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignupPage'
import ViewProduct from './pages/ViewProduct'
import PrivateRoute from './components/common/PrivateRoute'
import ProfilePage from './pages/ProfilePage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import Page from './pages/Page'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/page" element={<Page/>}/>
        <Route path="/product/:productId" element={<ViewProduct/>}/>
        <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
        <Route path="/cart" element={<PrivateRoute><CartPage/></PrivateRoute>}/>
        <Route path="/checkout" element={<PrivateRoute><CheckoutPage/></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App