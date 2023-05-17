import React from 'react'
import '../Amazon.css'
import list   from './data'
import Cards from './Cards'


function Amazon({handleClick}) {
  return (
    <section>
        {
            list.map((item)=>(
                <Cards item={item} handleClick={handleClick}/>
            ))
        }
    </section>
  )
}

export default Amazon