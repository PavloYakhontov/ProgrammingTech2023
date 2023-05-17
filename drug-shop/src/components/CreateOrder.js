import axios from 'axios';
import React from 'react'

export default function CreateOrder(props) {

    const sendRequest = () => {
        const accesToken = localStorage.getItem('accesToken');
        const req = new FormData();
        req.set('token', accesToken);
        if(props.cart.length !== 0)props.cart.map((el) => {
            req.set('medId', el.id);
            req.set('medCount', el.count);
            axios.post('http://pharmacy.com/api/createOrder.php', req)
            .then((response) => {
                
            })
            .catch((error) => {
                console.log(error);
            });
        });
        props.setCart([]);
        props.setCartSum(0);
    }

    return (
        <div className='create-order' onClick={sendRequest}>Замовити</div>
    )
}
