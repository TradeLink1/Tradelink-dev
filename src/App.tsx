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
import UserMessages from "./pages/userContents/UserMessages";
import Messages from "./pages/sellersDashboard/Messages";
import Settings from "./pages/sellersDashboard/Settings";
import AdminLayout from "./pages/adminDashboard/AdminLayout";
import AdminOverview from "./pages/adminDashboard/AdminOverview";
import AdminSellers from "./pages/adminDashboard/AdminSellers";
import AdminKyc from "./pages/adminDashboard/AdminKyc";
import AdminSellersReport from "./pages/adminDashboard/AdminReports";
import { AuthProvider } from "./context/AuthContext";
import VerifyEmail from "./pages/Register/VerifyEmail";
import SellerProfile from "./pages/Categories/SellerProfile";

// new imports
import ScrollToTop from "./components/settings/ScrollToTop.tsx";
import AboutUs from "./pages/aboutus/AboutUs";
import UserProfile from "./components/userProfile/userProfile";
import Logout from "./pages/userContents/Logout";
import UserLayout from "./pages/userContents/UserLayout";
import UserSettings from "./pages/userContents/UserSettings";
import ResetPassword from "./pages/Login/ResetPassword";

const Layout = () => {
  const location = useLocation(); // ✅ Fix: now using the hook
  const currentPath = location.pathname.toLowerCase();

  const hideHeaderFooter =
    ["/login", "/register", "/categories/products", "/seller-profile"].some(
      (path) => currentPath.startsWith(path)
    ) || currentPath.startsWith("/products/");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <div className="mx-auto">
      <AuthProvider>
        <BrowserRouter>
          {/* Wrap SearchProvider here so every component inside Router can use it */}
          <SearchProvider>
            <ScrollToTop />

            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/categories/products" element={<Product />} />
                <Route path="/Categories/Products" element={<Product />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route
                  path="/seller-profile/:sellerId"
                  element={<SellerProfile />}
                />
                <Route path="/Categories/Services" element={<Services />} />

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
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
              </Route>

              {/* Nested dashboard routes */}
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
                <Route path="settings" element={<UserSettings />} />
                <Route path="messages" element={<UserMessages />} />
              </Route>

              <Route path="/logout" element={<Logout />} />
            </Routes>
          </SearchProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
