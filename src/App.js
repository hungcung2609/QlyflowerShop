import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/nav&footer/navbar';
import Footer from './components/nav&footer/footer';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import Products from './pages/products';
import Cart from './pages/cart';
import CheckOut from './pages/checkout';
import { UserProvider } from './components/UserContext';
import Admin from './pages/admin';
import HoaTang from './pages//Flower/hoatang';
import HoaChau from './pages/Flower/hoachau';
import HoaCuoi from './pages/Flower/hoacuoi';
import HoaChucMung from './pages/Flower/hoachucmung';
import HoaChiaBuon from './pages/Flower/hoachiabuon';
import PrivacyPolicy from './pages/privacyPolicy';
import About from './pages/about';
import Contact from './pages/contact';

function App() {
  return (
    <UserProvider>
    <Router>
      {/* Hiển thị Navbar và Footer */}
      <Navbar />
      
      {/* Routes chỉ render khi đến đúng đường dẫn */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/hoatang" element={<HoaTang />} />
        <Route path="/hoachau" element={<HoaChau />} />
        <Route path="/hoacuoi" element={<HoaCuoi />} />
        <Route path="/hoachucmung" element={<HoaChucMung />} />
        <Route path="/hoachiabuon" element={<HoaChiaBuon />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>

      <Footer />
    </Router>
    </UserProvider>
  );
}

export default App;
