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
import Product from "./pages/Categories/Product";
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
    <BrowserRouter>
      <ScrollToTop />
      <SearchProvider>
        <Routes>
          {/* Layout wrapper */}
          <Route element={<Layout />}>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Public Pages */}
            {/* <Route path="Categories" element={<Categories />} /> */}
            <Route path="Categories/Products" element={<Product />} />
            <Route path="Categories/Services" element={<Services />} />
            <Route path="SellWithUs" element={<SellWithUs />} />
            <Route path="Faq" element={<Faq />} />
            <Route path="Contact" element={<Contact />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />

            {/* Seller Dashboard */}
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="upload" element={<UploadProduct />} />
              <Route path="listings" element={<MyListings />} />
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Admin Dashboard */}
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="sellers" element={<AdminSellers />} />
              <Route path="reports" element={<AdminSellersReport />} />
              <Route path="kyc" element={<AdminKyc />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
};

export default App;
