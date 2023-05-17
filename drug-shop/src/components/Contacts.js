import React from 'react'
import { BsTelegram } from "react-icons/bs";
import { ImPhone } from "react-icons/im";


export default function Contacts() {
  return (
    <div className='contacts'>
        <h4 className='phone-link'><ImPhone className='phone-icon' />  099 416 72 03</h4>
        <a className='telegram-link' href='https://t.me/MaxLogic' target='_blank'><h4><BsTelegram className='telegram-icon'/>  @MaxLogic</h4></a>
    </div>
  )
}
