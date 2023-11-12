import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { Routes, Route, json } from 'react-router-dom';
import Categories from './components/Categories';
import CategoryProduct from './components/CategoryProduct';
import AllProducts from './components/AllProducts';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import OrderFailure from './components/OrderFailure';

// Customer Panel
import Register from './components/Customer/Register';
import Login from './components/Customer/Login';
import Dashboard from './components/Customer/Dashboard';
import Orders from './components/Customer/Orders';
import Wishlist from './components/Customer/Wishlist';
import Profile from './components/Customer/Profile';
import ChangePassword from './components/Customer/ChangePassword';
import AddressList from './components/Customer/AddressList';
import AddAddress from './components/Customer/AddAddress';
import CustomerLogout from './components/Customer/CustomerLogout';

//Seller Panel
import SellerRegister from './components/Seller/SellerRegister';
import SellerLogin from './components/Seller/SellerLogin';
import SellerDashboard from './components/Seller/SellerDashboard';
import SellerProducts from './components/Seller/SellerProducts';
import AddProduct from './components/Seller/AddProduct';
import VendorOrders from './components/Seller/VendorOrders';
import Customers from './components/Seller/Customers';
import Reports from './components/Seller/Reports';
import VendorProfile from './components/Seller/VendorProfile';
import VendorChangePassword from './components/Seller/VendorChangePassword';
import TagProducts from './components/TagProducts';
import { useState } from 'react';
import { CartContext, CurrencyContext } from './Context';
import ConfirmOrder from './components/ConfirmOrder';
import UpdateAddress from './components/Customer/UpdateAddress';
import SellerLogout from './components/Seller/SellerLogout';
import UpdateProduct from './components/Seller/UpdateProduct';
import CustomerOrders from './components/Seller/CustomerOrders';
import DailyReport from './components/Seller/DailyReport';

const checkCart = localStorage.getItem('cartData');
const currentCurrency = localStorage.getItem('currency');
function App() {
  const [cartData, setCartData] = useState(JSON.parse(checkCart));
  const [CurrencyData,setCurrencyData]=useState(currentCurrency);
  return (
    <CurrencyContext.Provider value={{ CurrencyData, setCurrencyData }}>
      <CartContext.Provider value={{ cartData, setCartData }} >
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/category/:category_slug/:category_id' element={<CategoryProduct />} />
          <Route path='/products/:tag' element={<TagProducts />} />
          <Route path="/product/:product_slug/:product_id" element={<ProductDetail />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/confirm-order' element={<ConfirmOrder />} />
          <Route path='/order/success' element={<OrderSuccess />} />
          <Route path='/order/Failure' element={<OrderFailure />} />
          {/* Customer Routes */}
          <Route path='/customer/register' element={<Register />} />
          <Route path='/customer/login' element={<Login />} />
          <Route path='/customer/logout' element={<CustomerLogout />} />
          <Route path='/customer/dashboard' element={<Dashboard />} />
          <Route path='/customer/orders' element={<Orders />} />
          <Route path='/customer/wishlist' element={<Wishlist />} />
          <Route path='/customer/profile' element={<Profile />} />
          <Route path='/customer/addresses' element={<AddressList />} />
          <Route path='/customer/add-address' element={<AddAddress />} />
          <Route path='/customer/update-address/:address_id' element={<UpdateAddress />} />
          <Route path='/customer/change-password' element={<ChangePassword />} />
          {/* Seller Routes */}
          <Route path='/seller/register' element={<SellerRegister />} />
          <Route path='/seller/login' element={<SellerLogin />} />
          <Route path='/seller/logout' element={<SellerLogout />} />
          <Route path='/seller/dashboard' element={<SellerDashboard />} />
          <Route path='/seller/products' element={<SellerProducts />} />
          <Route path='/seller/add-product' element={<AddProduct />} />
          <Route path='/seller/update-product/:product_id' element={<UpdateProduct />} />
          <Route path='/seller/orders' element={<VendorOrders />} />
          <Route path='/seller/customers' element={<Customers />} />
          <Route path='/seller/customer/:customer_id/orderitems' element={<CustomerOrders />} />
          <Route path='/seller/reports' element={<Reports />} />
          <Route path='/seller/daily-report' element={<DailyReport />} />
          <Route path='/seller/profile' element={<VendorProfile />} />
          <Route path='/seller/change-password' element={<VendorChangePassword />} />

        </Routes>
        <Footer />
      </CartContext.Provider>
    </CurrencyContext.Provider>

  );
}

export default App;
