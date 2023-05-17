import React from 'react'
import '../cards.css'

const Cards = ({item, handleClick}) => {
    const {title, author, price, img} = item;
  return (
    <div className='cards'>
        <div className='image_box'>
            <img src={img} alt="Image" />
        </div>
        <div className='details'>
            <p className='nazva'>{title}</p>
            <p>{author}</p>
            <p>Ціна - {price}Грн</p>
            <button onClick={()=>handleClick(item)}>У кошик</button>
        </div>
    </div>
  )
}

export default Cards