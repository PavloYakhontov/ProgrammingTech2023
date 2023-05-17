import React from 'react'
import '../navbar.css'
import Header from './Header'
import { Routes, Route, Link } from "react-router-dom";

const Navbar = ({size, setShow}) => {
  return (
    <nav>
        <Link className='Button1' to="/tovar" onClick={()=> setShow(true)}>Товари</Link>
        <div className='cart' onClick={()=> setShow(false)}>
            <span>
                <i className='fas fa-cart-plus'></i>
            </span>
            <span>{size}</span>
        </div>
        <Routes>
         <Route path="/tovar" element = {<Header/>}/>
        </Routes>
    </nav>
    
  )
}

export default Navbar