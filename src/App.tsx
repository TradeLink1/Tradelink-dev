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
import Product from "./pages/Categories/Products";
import ProductDetails from "./pages/Categories/ProductDetails";
import Services from "./pages/Categories/Services";
import { SearchProvider } from "./context/SearchContext";
import DashboardLayout from "./pages/sellersDashboard/DashboardLayout";
import Overview from "./pages/sellersDashboard/Overview";
import MyListings from "./pages/sellersDashboard/MyListings";
import UploadProduct from "./pages/sellersDashboard/UploadProduct";
import Messages from "./pages/sellersDashboard/Messages";
import Settings from "./pages/sellersDashboard/Settings";
import AdminLayout from "./pages/adminDashboard/AdminLayout";
import AdminOverview from "./pages/adminDashboard/AdminOverview";
import AdminSellers from "./pages/adminDashboard/AdminSellers";
import AdminKyc from "./pages/adminDashboard/AdminKyc";
import AdminSellersReport from "./pages/adminDashboard/AdminReports";
// import ProtectRoute from "./components/routes/ProtectRoute";
import { AuthProvider } from "./context/AuthContext";
import VerifyEmail from "./pages/Register/VerifyEmail";
import SellerProfile from "./pages/Categories/SellerProfile";
import AboutUs from "./pages/aboutus/AboutUs.tsx";
import UserProfile from "./components/userProfile/userProfile.tsx";
import Logout from "./pages/userContents/Logout.tsx";
import UserLayout from "./pages/userContents/UserLayout";
import EditProfile from "./pages/userContents/EditProfile";
import UserSettings from "./pages/userContents/UserSettings.tsx";

const Layout = () => {
  const location = useLocation();

  //  hide header and footer in some pages //
  const hideHeaderFooter = ["/login", "/register","/categories/products","/categories/products/:id","/categories/sellerprofile"].includes(
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
    <div className="mx-auto">
      <AuthProvider>
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/Categories" element={<Categories />} /> */}
                <Route
                  path="/Categories/Products"
                  element={
                  
                      <Product />
                    
                  }
                />
                <Route
                  path="/Categories/Products/:id"
                  element={<ProductDetails />}
                />
                <Route
                  path="/Categories/SellerProfile"
                  element={<SellerProfile />}
                />
                <Route
                  path="/Categories/Services"
                  element={
                  
                      <Services />
              
                  }
                />
                <Route path="/SellWithUs" element={<SellWithUs />} />
                <Route
                  path="/service-provider/:id"
                  element={<SellerProfile />}
                />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/Faq" element={<Faq />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/VerifyEmail/:token" element={<VerifyEmail />} />
              </Route>

              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="upload" element={<UploadProduct />} />
                <Route
                  path="listings"
                  element={<MyListings sellerId="user.id" />}
                />
                <Route path="messages" element={<Messages />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="sellers" element={<AdminSellers />} />
                <Route path="reports" element={<AdminSellersReport />} />
                <Route path="kyc" element={<AdminKyc />} />
              </Route>

              <Route path="/userProfile" element={<UserLayout />}>
                <Route index element={<UserProfile />} />
                <Route path="messages" element={<Messages />} />
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="settings" element={<UserSettings />} />
              </Route>

              <Route path="/logout" element={<Logout />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
