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
import Products from "./pages/Categories/Products"; // Categories list page
import ProductDetails from "./pages/Categories/ProductDetails"; // Sellers in category
import SellerProfile from "./pages/Categories/SellerProfile"; // Single seller profile
import Services from "./pages/Categories/Services";

import { SearchProvider } from "./context/SearchContext";

import DashboardLayout from "./pages/sellersDashboard/DashboardLayout";
import Overview from "./pages/sellersDashboard/Overview";
import MyListings from "./pages/sellersDashboard/MyListings";
import Messages from "./pages/sellersDashboard/Messages";
import UploadProduct from "./pages/sellersDashboard/UploadProduct";
import Settings from "./pages/sellersDashboard/Settings";

import AdminLayout from "./pages/adminDashboard/AdminLayout";
import AdminOverview from "./pages/adminDashboard/AdminOverview";
import AdminSellers from "./pages/adminDashboard/AdminSellers";
import AdminKyc from "./pages/adminDashboard/AdminKyc";
import AdminSellersReport from "./pages/adminDashboard/AdminReports";

import ScrollToTop from "./settings/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/routes/ProtectRoute";

// ------------------ Layout ------------------
const Layout = () => {
  const location = useLocation();

  // hide header/footer on login, register, and dashboards
  const hideHeaderFooter =
    ["/login", "/register"].includes(location.pathname.toLowerCase()) ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

// ------------------ Not Found ------------------
const NotFound = () => (
  <div style={{ padding: 24 }}>
    <h1>404 – Page Not Found</h1>
    <p>Check the URL or use the navigation.</p>
  </div>
);

// ------------------ App ------------------
const App = () => {
  return (
    <div className="mx-auto">
      <AuthProvider>
        <SearchProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/Categories" element={<Categories />} /> */}
                <Route path="/Categories/Products" element={<Products />} />
                <Route
                  path="/Categories/Products/:id"
                  element={<ProductDetails />}
                />
                <Route
                  path="/Categories/Seller/:id"
                  element={<SellerProfile />}
                />
                <Route path="/Categories/Services" element={<Services />} />
                <Route path="/SellWithUs" element={<SellWithUs />} />
                <Route path="/Faq" element={<Faq />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />

                {/* Nested dashboard routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Overview />} />
                  <Route path="upload" element={<UploadProduct />} />
                  <Route path="listings" element={<MyListings />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>

              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="sellers" element={<AdminSellers />} />
                <Route path="reports" element={<AdminSellersReport />} />
                <Route path="kyc" element={<AdminKyc />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
