import React, { useState } from 'react'
import Logo from './Logo'
import Contacts from './Contacts';
import CartItem from './CartItem';
import { BsCart3 } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import Login from './Login';
import Register from './Register';
import CreateOrder from './CreateOrder';
import Account from './Account';

export default function Header(props) {
    let [cartOpen, setCartOpen] = useState(false);
    let [contactsOpen, setContactsOpen] = useState(false);
    let [loginOpen, setLoginOpen] = useState(false);
    let [registerOpen, setRegisterOpen] = useState(false);

    return (
        <header className='header'>
            <nav className='header-select'>
                <div className='logo'>
                    <Logo />
                    <div className='logo-name header-item'>
                        <a href='#!' className='store-name'>
                            <span className='logo-blue'>Phar</span>
                            <span className='logo-green'>macy</span>
                        </a>
                    </div>
                </div>
                <div className='nav header-item'>
                    <ul>
                        <li>
                            <BsCart3 onClick={() => setCartOpen(!cartOpen)} className={`cart-icon ${cartOpen && 'active'}`}/>
                            {cartOpen && (
                                <div className='cart'>
                                    {props.cart.length === 0 ? <h3>Кошик порожній.</h3> : props.cart.map(el => (
                                        <CartItem 
                                        key={el.id} 
                                        item={el} 
                                        increaseItemCount={props.increaseItemCount} 
                                        decreaseItemCount={props.decreaseItemCount}
                                        />
                                    ))}
                                    <hr></hr>
                                    <h3 className='cart-sum'>До сплати: {props.cartSum} ₴</h3>
                                    {props.isLogin && 
                                        <CreateOrder 
                                        cart={props.cart}
                                        setCart={props.setCart}
                                        setCartSum={props.setCartSum}/>
                                    }
                                </div>
                            )}
                        </li>
                        <li className='contacts-nav' onMouseOver={() => setContactsOpen(true)} onMouseOut={() => setContactsOpen(false)}>
                            <BsTelephone className={`contacts-icon ${contactsOpen && 'active'}`}/>
                            {contactsOpen && (
                                <Contacts />
                            )}
                        </li>
                        {props.isLogin ? 
                            <>
                                <Account />
                                <li className='hover-opacity' onClick={() => logOut()}>Вийти</li>
                            </> :
                            <li className='hover-opacity' onClick={() => setLoginOpen(true)}>Вхід</li>
                        }
                    </ul>
                    

                    {loginOpen && (
                        <Login 
                        setLoginOpen={setLoginOpen} 
                        setRegisterOpen={setRegisterOpen} 
                        setIsLogin={props.setIsLogin}
                        />
                    )}



                    {registerOpen && (
                        <Register 
                        setRegisterOpen={setRegisterOpen} 
                        setLoginOpen={setLoginOpen}
                        />
                    )}
                    
                </div>
            </nav>
        </header>
    )

    function logOut(){
        localStorage.removeItem('accesToken');
        localStorage.removeItem('login');
        props.setIsLogin(false);
    }
}
