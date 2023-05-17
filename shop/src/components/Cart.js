import React, {useEffect, useState} from 'react'
import '../Cart.css'
import '../components/data'

function Cart({cart, setCart, handleChange}) {
    const[price, setPrice] = useState(0);
    const handlePrice = () =>{
        let ans =0;
        cart.map((item) =>(
            ans += item.amount * item.price
        ))
        setPrice(ans);
    }

    const handleRemove = (id) =>{
        const arr = cart.filter((item)=>item.id !==id)
        setCart(arr);
        //handlePrice() 
    }

    useEffect(( )=>{
        handlePrice();
    })
  return (
    <article>
        {
            cart?.map((item)=>(
                <div className='cart_box' key={item.id}>
                    <div className='cart_img'>
                        <img src={item.img}/>
                        <p>{item.title}</p>
                    </div>
                    <div>
                        <button className='plus' onClick={()=>handleChange(item, +1)}>+</button>
                        <button>{item.amount}</button>
                        <button className='minus' onClick={()=>handleChange(item, -1)}>-</button>
                    </div>
                    <div>
                        <span>{item.price} - Ціна за метр</span>
                        <button onClick={()=> handleRemove(item.id)}>Видалити</button>
                    </div>
                </div>
            ))}
            
            <div className='total'>
                <span>Загальна сума:</span>
                <span>Грн - {price}</span>
            </div>
    </article>
  )
}

export default Cart