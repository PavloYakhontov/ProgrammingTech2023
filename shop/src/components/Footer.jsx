import React from 'react'

export default function footer() {
  return (
    <div className='main-footer'>
      <div className = "contacts" id ="/cont">Контакти</div>
            <div className="sectionesag">   </div>
        <div className='container'>
            <div className='row'>
                <ul className='List-unstyled'>
                <li>050-900-7216 (Вікторія Завідфолуші)</li>
                <li>Мукачево, Україна</li>
                <li>Адреса: вул. Ваденберга 3</li>
                </ul>
            </div>
            <div className='row'>
               <p className='col-sm'>
                &copy;{new Date().getFullYear()} VICTORIA TEXTILE | All right reserved | Terms Of Servise | Privacy
               </p>
            </div>
        </div>
    </div>
  )
}
