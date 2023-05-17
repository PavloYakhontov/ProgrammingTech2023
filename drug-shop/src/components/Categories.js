import React from 'react'

export default function Categories(props) {
  return (
    <div className='categories'>
        <div className='category' onClick={() => props.chooseCategory('all')}>Всі</div>
        <div className='category' onClick={() => props.chooseCategory('pills')}>Таблетки</div>
        <div className='category' onClick={() => props.chooseCategory('drops')}>Краплі</div>
        <div className='category' onClick={() => props.chooseCategory('capsules')}>Капсули</div>
    </div>
  )
}
