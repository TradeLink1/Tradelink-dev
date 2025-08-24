import { BrowserRouter, Routes, Route } from "react-router-dom";
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
// import ProtectRoute from "./components/routes/ProtectRoute";
import AdminLayout from "./pages/adminDashboard/AdminLayout";
import AdminOverview from "./pages/adminDashboard/AdminOverview";
import AdminKyc from "./pages/adminDashboard/AdminKyc";
import AdminSellers from "./pages/adminDashboard/AdminSellers";
import AdminReports from "./pages/adminDashboard/AdminReports";


const App = () => {
   

  return (
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

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="Upload" element={<UploadProduct />} />
            <Route path="listings" element={<MyListings />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        {/* <Footer /> */}
  

        
        
        
        <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminOverview/>} />
        <Route path="kyc" element={<AdminKyc/>} />
        <Route path="sellers" element={<AdminSellers/>} />
        <Route path="reports" element={<AdminReports/>} />
        
        </Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </SearchProvider>
  );
};

export default App;
