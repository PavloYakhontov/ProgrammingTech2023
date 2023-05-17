import React from 'react'

export default function Order(props) {
    return (
        <div className='order'>
            <img src={'img/' + props.item.img} />
            <div className='order-info'>
                <h3>Номер замовлення: #{props.item.id}</h3>
                <h3>Назва товару: {props.item.title}</h3>
                <h3>Кількість: {props.item.med_count}</h3>
                <h3>Дата замовлення: {props.item.date}</h3>
            </div>
        </div>
    )
}
