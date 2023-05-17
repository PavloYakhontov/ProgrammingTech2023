import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";

function App() {
    let [items, setItems] = useState([
        // {
        //     id: 1,
        //     title: 'Парацетамол капсули 500 мг, 10 шт.',
        //     category: 'capsules',
        //     img: 'paracetamol.png',
        //     price: '15.10'
        // },
        // {
        //     id: 2,
        //     title: 'Цитрамон-Дарниця знеболюючі таблетки, 6 шт.',
        //     category: 'pills',
        //     img: 'citramon.png',
        //     price: '14.02'
        // },
        // {
        //     id: 3,
        //     title: 'Анальгін таблетки по 0.5 г, 10 шт. - Дарниця',
        //     category: 'pills',
        //     img: 'analgin.png',
        //     price: '16.43'
        // },
        // {
        //     id: 4,
        //     title: 'Спазмалгон таблетки, 20 шт.',
        //     category: 'pills',
        //     img: 'spazmalgon.png',
        //     price: '99.99'
        // },
        // {
        //     id: 5,
        //     title: 'Но-шпа таблетки по 40 мг, 24 шт.',
        //     category: 'pills',
        //     img: 'noshpa.png',
        //     price: '88.5'
        // },
        // {
        //     id: 6,
        //     title: 'Нурофен Експрес форте капсули м\'які по 400 мг, 10 шт.',
        //     category: 'capsules',
        //     img: 'nurofen.png',
        //     price: '110.08'
        // },
        // {
        //     id: 7,
        //     title: 'Евказолін АКВА спрей назальний, 10 г',
        //     category: 'drops',
        //     img: 'evkazolin.png',
        //     price: '87.5'
        // }
    ]);
    let [currentItems, setCurrentItems] = useState(items);
    let currentCategory = 'all';
    let [cart, setCart] = useState([]);
    let [cartSum, setCartSum] = useState(0);
    let [isLogin, setIsLogin] = useState(false);


    useEffect(() => {
        axios.get("http://pharmacy.com/api/getProducts.php")
          .then(
            (response) => {
                setItems(response.data);
                setCurrentItems(response.data);
            }
        )
        if(localStorage.getItem('accesToken')) setIsLogin(true);
      }, [])
    
    return (
        <div className="wrapper">
            <Header 
            cart={cart} 
            increaseItemCount={increaseItemCount} 
            decreaseItemCount={decreaseItemCount} 
            cartSum={cartSum}
            isLogin={isLogin}
            setIsLogin={setIsLogin} 
            setCart={setCart} 
            setCartSum={setCartSum}/>
            <div className="content">
                <h1>Товари</h1>
                <Categories chooseCategory={chooseCategory}/>
                <Items items={currentItems} onAdd={addToCart}/>
                <hr></hr>
                <Footer />
            </div>
        </div>
    );

    function addToCart(item){
        let itemId = cart.findIndex(el => el.id === item.id);

        if(itemId === -1){
            let itemCopy = Object.assign({}, item);
            itemCopy.count = 1;
            setCart([...cart, itemCopy]);
        }
        else{
            let cartCopy = Object.assign([], cart);
            cartCopy[itemId].count+= 1;
            setCart(cartCopy);
        }

        let newSum = (cartSum + item.price * 1);
        setCartSum(newSum.toFixed(2) * 1);
    }

    function increaseItemCount(item){
        let itemId = cart.findIndex(el => el.id === item.id);
        
        let cartCopy = Object.assign([], cart);
        cartCopy[itemId].count+= 1;
        setCart(cartCopy);
        
        let newSum = (cartSum + item.price * 1);
        setCartSum(newSum.toFixed(2) * 1);
    }

    function decreaseItemCount(item){
        let itemId = cart.findIndex(el => el.id === item.id);
        
        let cartCopy = Object.assign([], cart);
        cartCopy[itemId].count-= 1;
        if(cartCopy[itemId].count === 0){
            cartCopy = cartCopy.filter(el => el.id !== cartCopy[itemId].id)
        }
        setCart(cartCopy);
        
        let newSum = (cartSum - item.price * 1);
        setCartSum(newSum.toFixed(2) * 1);
    }

    function chooseCategory(category){
        currentCategory = category;
        refreshCurrentItems();
    }

    function refreshCurrentItems(){
        if(currentCategory === 'all'){
            setCurrentItems(items);
        }
        else{
            setCurrentItems(items.filter(el => el.cat_name === currentCategory));
        }
    }
}

export default App;
