import { Link } from "react-router-dom";
import React from 'react'
import Logo from './Logo'


export default function Header() {
  return (
  <header className = "header">
      
    <div className="container" id ="page">
    <Link className ="aloo" to="/">Victoria Textile</Link>
        <div className="header__inner">
        <Logo/>
            <div className="Logo_header"></div>

            
            <nav className = "nav">
               <Link className = "nav__link" to="/" >Про нас</Link>
               <Link className = "nav__link" to="/tovar" >Товари</Link>
               <Link className = "nav__link" to="/vidguk">Відгуки</Link>
               <Link className = "nav__link" to="/nashiroboty">Наші роботи</Link>
               
            </nav>

           

        </div>
        </div>
    
    
    
   </header> 
    
  )
}
