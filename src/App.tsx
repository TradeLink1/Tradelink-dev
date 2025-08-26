import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./static/Header";
import Footer from "./static/Footer";
import Home from "./pages/Homepage/Home";
// import Categories from "./pages/Categories/Categories";
import SellWithUs from "./pages/SellWIthUs/SellWithUs";
import Faq from "./pages/Faq/Faq";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// NEW imports for category flow
import Products from "./pages/Categories/Products";          // Categories list page
import ProductDetails from "./pages/Categories/ProductDetails"; // Sellers in category
import SellerProfile from "./pages/Categories/SellerProfile";   // Single seller profile
import Services from "./pages/Categories/Services";
import { SearchProvider } from "./context/SearchContext";

const App = () => {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Categories" element={<Categories />} /> */}
          {/* Categories flow */}
          <Route path="/Categories/Products" element={<Products />} />
          <Route path="/Categories/Products/:categoryId" element={<ProductDetails />} />
          <Route path="/Categories/Products/:categoryId/seller/:sellerId" element={<SellerProfile />} />
          <Route path="/Categories/Services" element={<Services />} />
          <Route path="/SellWithUs" element={<SellWithUs />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </SearchProvider>
  );
};

export default App;
