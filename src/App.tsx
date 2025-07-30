import Header from "./static/Header"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Homepage/Home"
// import Categories from "./pages/Categories/Categories"
import AddBusiness from "./pages/AddBusiness/AddBusiness"
import Faq from "./pages/Faq/Faq"
import Contact from "./pages/Contact/Contact"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Product from "./pages/Categories/Product"
import Services from "./pages/Categories/Services"
import Footer from "./static/Footer"

const App = () => {
  return (
    <div>
      <BrowserRouter>
            <Header/>
            
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/* <Route path="/Categories" element={<Categories/>}/> */}
          <Route path="/Categories/Products" element={<Product/>}/>
          <Route path="/Categories/Services" element={<Services/>}/>
          <Route path="/AddBusiness" element={< AddBusiness/>}/>
          <Route path="/Faq" element={< Faq/>}/>
          <Route path="/Contact" element={<Contact/>}/> 
          <Route path="/Login" element={<Login/>}/>
          <Route path="Register" element={<Register/>}/>
        </Routes>
         <Footer/>
      </BrowserRouter>

    
    </div>
  )
}

export default App