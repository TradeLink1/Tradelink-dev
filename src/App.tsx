import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Header from "./static/Header";
import Footer from "./static/Footer";
import Home from "./pages/Homepage/Home";
// import Categories from "./pages/Categories/Categories";
import SellWithUs from "./pages/SellWIthUs/SellWithUs";
import Faq from "./pages/Faq/Faq";

import Contact from "./pages/Contact/ContactMain";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// NEW imports for category flow
import Products from "./pages/Categories/Products";          // Categories list page
import ProductDetails from "./pages/Categories/ProductDetails"; // Sellers in category
import SellerProfile from "./pages/Categories/SellerProfile";   // Single seller profile
import Services from "./pages/Categories/Services";
import { SearchProvider } from "./context/SearchContext";
import DashboardLayout from "./pages/sellersDashboard/DashboardLayout";
import Overview from "./pages/sellersDashboard/Overview";
import MyListings from "./pages/sellersDashboard/MyListings";
import Messages from "./pages/sellersDashboard/Messages";
import UploadProduct from "./pages/sellersDashboard/UploadProduct";
import Settings from "./pages/sellersDashboard/Settings";
import AdminLayout from "./pages/adminDashboard/AdminLayout"
import AdminOverview from "./pages/adminDashboard/AdminOverview";
import AdminSellers from "./pages/adminDashboard/AdminSellers";
import AdminKyc from "./pages/adminDashboard/AdminKyc";
import AdminSellersReport from "./pages/adminDashboard/AdminReports";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/routes/ProtectRoute";


const Layout = () => {
  const location = useLocation();

  //  hide header and footer in some pages //
  const hideHeaderFooter = ["/login", "/register"].includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet /> {/* This is where nested routes will render */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <SearchProvider>
        <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Categories" element={<Categories />} /> */}
          <Route path="/Categories/Products" element={<Products />} />
          <Route path="/Categories/Products/:categoryId" element={<ProductDetails />} />
          <Route path="/Categories/Products/:categoryId/seller/:sellerId" element={ <ProtectedRoute><SellerProfile /></ProtectedRoute>} />
          <Route path="/Categories/Services" element={<Services />} />
          <Route path="/SellWithUs" element={<SellWithUs />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </SearchProvider>
  );
};

export default App;