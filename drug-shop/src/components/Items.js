import React from 'react'
import Item from './Item';

export default function Items(props) {
    const items = props.items;

    return (
        <main className='items'>
            {items.map(el => (
                <Item key={el.id} item={el} onAdd={props.onAdd}/>
            ))}
        </main>
    )
}
