import axios from 'axios';
import React, { useState } from 'react'
import Order from './Order';

export default function Account(props) {

    let [isOrdersOn, setOrdersBool] = useState(false);
    let [orders, setOrders] = useState([]);
    let [isRequested, setRequested] = useState(false);

    const sendRequest = () => {
        if(!isRequested){
            const accesToken = localStorage.getItem('accesToken');
            const req = new FormData();
            req.set('token', accesToken);
            axios.post('http://pharmacy.com/api/accountOrders.php', req)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        } 
    }

    return (
        <li className='account' onClick={() => {sendRequest(); setOrdersBool(!isOrdersOn); setRequested(!isRequested)}}>
            {localStorage.getItem('login')}
            {isOrdersOn && (
                <div className='cart'>
                    <h3>Ваші замовлення: </h3>
                    {orders.map(el => (
                        <Order key={el.id} item={el}/>
                    ))}
                </div>
            )}
        </li>
    )
}
