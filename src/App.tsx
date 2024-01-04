import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import UserRoute from './components/UserRoute'
import AdminOrders from './pages/Admin/AdminOrders'
import AdminUser from './pages/Admin/AdminUser'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminProductCreate from './pages/AdminProduct/AdminProductCreate'
import AdminProductUpdate from './pages/AdminProduct/AdminProductUpdate'
import AdminProducts from './pages/AdminProduct/AdminProducts'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Address from './pages/Order/Address'
import PlaceOrder from './pages/Order/PlaceOrder'
import StripeResults from './pages/Order/StripeResults'
import Product from './pages/Product/Product'
import Profile from './pages/User/Profile'
import SignIn from './pages/User/SignIn'
import SignUp from './pages/User/SignUp'

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <div className='globalMaxWidth globalMinHeight'>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/product/:_id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />

            {/* isUser */}
            <Route element={<UserRoute isUser />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/address' element={<Address />} />
              <Route path='/placeOrder' element={<PlaceOrder />} />
              <Route path='/success' element={<StripeResults />} />
              <Route path='/cancel' element={<StripeResults />} />
            </Route>

            {/* admin */}
            <Route path='/admin' element={<UserRoute isAdmin />}>
              <Route path='user/:_id' element={<AdminUser />} />
              <Route path='users' element={<AdminUsers />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='product/create' element={<AdminProductCreate />} />
              <Route
                path='product/update/:_id'
                element={<AdminProductUpdate />}
              />
              <Route path='orders' element={<AdminOrders />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
