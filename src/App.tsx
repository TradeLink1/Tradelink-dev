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
import Product from "./pages/Categories/Product";
import Services from "./pages/Categories/Services";
import { SearchProvider } from "./context/SearchContext";

const App = () => {
  return (
    <div className="max-w-[1900px] mx-auto">
      <SearchProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/Categories" element={<Categories />} /> */}
            <Route path="/Categories/Products" element={<Product />} />
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
    </div>
  );
};

export default App;
