import React from 'react'

export default function Item(props) {
    const imgLink = 'img/' + props.item.img;

    return (
        <div className='item'>
            <img className='item-img' src={imgLink} alt={props.item.title}/>
            <h3 className='item-title'>{props.item.title}</h3>
            <h3><b>{props.item.price} ₴</b></h3>
            <div className='add-to-cart' onClick={() => props.onAdd(props.item)}><h3>У кошик</h3></div>
        </div>
        
    )
}
