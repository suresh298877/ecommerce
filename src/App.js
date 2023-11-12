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
          <Route path='/ecommerce/' element={<Home />} />
          <Route path='/ecommerce/products' element={<AllProducts />} />
          <Route path='/ecommerce/categories' element={<Categories />} />
          <Route path='/ecommerce/category/:category_slug/:category_id' element={<CategoryProduct />} />
          <Route path='/ecommerce/products/:tag' element={<TagProducts />} />
          <Route path="/ecommerce/product/:product_slug/:product_id" element={<ProductDetail />} />
          <Route path='/ecommerce/checkout' element={<Checkout />} />
          <Route path='/ecommerce/confirm-order' element={<ConfirmOrder />} />
          <Route path='/ecommerce/order/success' element={<OrderSuccess />} />
          <Route path='/ecommerce/order/Failure' element={<OrderFailure />} />
          {/* Customer Routes */}
          <Route path='/ecommerce/customer/register' element={<Register />} />
          <Route path='/ecommerce/customer/login' element={<Login />} />
          <Route path='/ecommerce/customer/logout' element={<CustomerLogout />} />
          <Route path='/ecommerce/customer/dashboard' element={<Dashboard />} />
          <Route path='/ecommerce/customer/orders' element={<Orders />} />
          <Route path='/ecommerce/customer/wishlist' element={<Wishlist />} />
          <Route path='/ecommerce/customer/profile' element={<Profile />} />
          <Route path='/ecommerce/customer/addresses' element={<AddressList />} />
          <Route path='/ecommerce/customer/add-address' element={<AddAddress />} />
          <Route path='/ecommerce/customer/update-address/:address_id' element={<UpdateAddress />} />
          <Route path='/ecommerce/customer/change-password' element={<ChangePassword />} />
          {/* Seller Routes */}
          <Route path='/ecommerce/seller/register' element={<SellerRegister />} />
          <Route path='/ecommerce/seller/login' element={<SellerLogin />} />
          <Route path='/ecommerce/seller/logout' element={<SellerLogout />} />
          <Route path='/ecommerce/seller/dashboard' element={<SellerDashboard />} />
          <Route path='/ecommerce/seller/products' element={<SellerProducts />} />
          <Route path='/ecommerce/seller/add-product' element={<AddProduct />} />
          <Route path='/ecommerce/seller/update-product/:product_id' element={<UpdateProduct />} />
          <Route path='/ecommerce/seller/orders' element={<VendorOrders />} />
          <Route path='/ecommerce/seller/customers' element={<Customers />} />
          <Route path='/ecommerce/seller/customer/:customer_id/orderitems' element={<CustomerOrders />} />
          <Route path='/ecommerce/seller/reports' element={<Reports />} />
          <Route path='/ecommerce/seller/daily-report' element={<DailyReport />} />
          <Route path='/ecommerce/seller/profile' element={<VendorProfile />} />
          <Route path='/ecommerce/seller/change-password' element={<VendorChangePassword />} />

        </Routes>
        <Footer />
      </CartContext.Provider>
    </CurrencyContext.Provider>

  );
}

export default App;
