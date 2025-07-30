import { Link } from "react-router-dom"
import Button from "../reusable/Button"
import { useState } from "react"


const Sidebar = ({handleToggle}:any) => {
    const [showDropdown,setShowDropwn] =useState(false)
    const toggleDropdown = () =>{
        setShowDropwn (!showDropdown);
    }

  return (
    <div className="fixed  left-0 w-full bg-[#fef6e1] h-full  flex items-center justify-center shadow-lg p-6 z-50 max-mobile:h-[430px] max-width-[1280px]  ">
        <section className="flex flex-col gap-7 text-[#333333] font-semibold text-center text-[16px] max-mobile:gap-3">
            <div onClick={toggleDropdown} className="cursor-pointer hover:text-[#f89216] font-semibold border-b pb-2 border-[#f89216]"> Categories</div>
            {showDropdown && (<div className=" mt-2 flex flex-col justify-center gap-2 text-medium text-[#555]  ">
                <Link to="Categories/Products" onClick={handleToggle} className=" hover:text-[#f89216]">Products</Link>
                 <Link to="Categories/Services" onClick={handleToggle} className="hover:text-[#f89216]">Services</Link>
            </div>)}
         <Link to="/AddBusiness" onClick={handleToggle}><nav className="hover:text-[#f89216] border-b pb-2 border-[#f89216] ">Add Business</nav></Link>
          <Link to="/Faq" onClick={handleToggle}><nav className="hover:text-[#f89216] border-b pb-2 border-[#f89216]">FAQs</nav></Link>
           <Link to="/Contact" onClick={handleToggle}><nav className="hover:text-[#f89216] border-b pb-2 border-[#f89216] ">Contact Us</nav></Link>
            
             <section className="flex flex-col gap-3 pt-3 text-[15px] font-semibold w-full">
       <Link to="/Login">  <Button name="Login" border="2px solid #f89216"/></Link>
        <Link to="/Register"> <Button name="Register" bgColor="#f89216"/></Link>

      </section>
        </section>
    </div>
  )
}

export default Sidebar