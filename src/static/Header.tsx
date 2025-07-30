import Button from "../reusable/Button"
import {Link} from "react-router-dom"
import {useEffect, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx";
import { FiX } from "react-icons/fi";
import Sidebar from "./Sidebar";



const Header = () => {
    const [showDropdown, setShowDropwn] =useState(false)
     const [toggle, setToggle]= useState(false)
  const handleToggle = () =>{
    setToggle(!toggle)
  }
  useEffect(()=>{
    const handleResize =() =>{
      if (window.innerWidth >= 1024){
         setToggle(false)
      }
    }
    window.addEventListener('resize',handleResize);
    return ()=> window.removeEventListener("resize",handleResize);
  },[]);

  return (
    <>
    <div className='px-20 py-5 flex justify-between items-center max-width-[1280px] text-[15px] max-tablet:px-10 sticky top-0 z-50 bg-[#fef6e1] shadow-sm max-mobile:px-5 '>
      <section className='flex gap-18 items-center '>
        <div>
       <Link to="/">
       <img className="w-[150px] max-mobile:w-[130px]" src="/header.png" alt="logo" />
       </Link>
        </div>
        <div className='flex gap-8 text-[#333333] font-medium max-tablet:hidden  '>
            <div onMouseEnter={() => setShowDropwn(true)}
                  onMouseLeave={() => setShowDropwn(false)}
                  className="relative">
         <nav className='hover:text-[#f89216] hover:transistion-colors hover:duration-500 hover:ease-in-out cursor-pointer'>Categories</nav>
          {showDropdown && (
            <div className="absolute top-full left-0  bg-[#f89216] shadow-lg w-34 flex flex-col p-3 justify-center items-center z-50 rounded-md text-white font-semibold gap-2 ">

                <Link to="/Categories/Products" > Products</Link>
                <Link to="/Categories/Services"> Services
                </Link>
            </div>
          )}
         </div>
         <Link to="/AddBusiness"> <nav className='hover:text-[#f89216] hover:transistion-colors hover:duration-500 hover:ease-in-out '>Add Business</nav></Link>
          <Link to="/Faq"> <nav className='hover:text-[#f89216] hover:transistion-colors hover:duration-500 hover:ease-in-out '>FAQs</nav></Link>
         <Link to="/Contact"> <nav className='hover:text-[#f89216] hover:transistion-colors hover:duration-500 hover:ease-in-out '>Contact Us</nav></Link>
        </div>
      </section>
      <section className="flex gap-3 items-center text-[#333333] font-medium text-[15px] max-tablet:hidden">
       <Link to="/Login">  <Button name="Login" border="2px solid #f89216"/></Link>
        <Link to="/Register"> <Button name="Register" bgColor="#f89216"/></Link>

      </section>
      <section className="lg:hidden cursor-pointer ">
       { toggle ? ( <FiX size={30} color="#f89316" onClick={handleToggle} />):(<RxHamburgerMenu size={30} color="#f89216" onClick={handleToggle} /> )}
        
    
      </section >
      
      
      </div>
     <section>
         < div className="lg-hidden">
     {toggle && <Sidebar handleToggle={handleToggle}/>}
    </div>
    
      </section >
      </>
  )
}

export default Header