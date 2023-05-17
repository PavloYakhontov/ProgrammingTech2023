import React from 'react'
import {AiFillMinusCircle} from 'react-icons/ai'
import {AiFillPlusCircle} from 'react-icons/ai'

export default function CartItem(props) {
    const imgLink = 'img/' + props.item.img;

    return (
        <div className='cart-item'>
            <img className='cart-item-img' src={imgLink} alt={props.item.title}/>
            <h3 className='cart-item-title'>{props.item.title}</h3>
            <h3 className='cart-item-price'><b>{(props.item.price * props.item.count).toFixed(2)} ₴</b></h3>
            <h3 className='cart-item-count'><b>{props.item.count} шт.</b></h3>
            <div className='plus-minus-buttons'>
                <AiFillPlusCircle className='plus-item-button' onClick={() => props.increaseItemCount(props.item)}/>
                <AiFillMinusCircle className='minus-item-button' onClick={() => props.decreaseItemCount(props.item)}/>
            </div>
        </div>
    )
}
