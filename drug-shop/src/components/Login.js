import React, {useState} from 'react'
import axios from 'axios';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { decodeToken } from "react-jwt";

export default function Login(props) {
    let [data, setData] = useState({});
    let [validation, setValidation] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        axios.post('http://pharmacy.com/api/login.php', formData)
            .then((response) => {
                if(response.status === 200 && response.data !== 'Wrong login or pass'){
                    localStorage.setItem('accesToken', response.data);
                    props.setIsLogin(true);
                    props.setLoginOpen(false);
                    const login = decodeToken(localStorage.getItem('accesToken')).login;
                    localStorage.setItem('login', login)
                }
                else if(response.data.includes('Wrong login or pass')){
                    let validationCopy = Object.assign({}, validation);
                    validationCopy.message = "Невірно введений логін чи пароль";
                    validationCopy.visible = 1;
                    setValidation(validationCopy);
                }
                setData(response.data);
            })
            .catch((error) => {
                let validationCopy = Object.assign({}, validation);
                validationCopy.message = "На сервері сталась невідома помилка.";
                validationCopy.visible = 1;
                setValidation(validationCopy);
            });
      };

    return (
        <div className='login-full'>
            <form className='login-window' onSubmit={handleSubmit}>
                <AiOutlineCloseCircle className='close-icon' onClick={() => props.setLoginOpen(false)}/>
                <div className='login-inputs'>
                    <h1>Вхід</h1>
                    <div className={validation.visible === 2 ? 'validation-succes' : validation.visible === 1 ? 'validation-fail' : 'validation-hidden'}>{validation.message}</div>
                    <input className='input100' type="text" name="login" placeholder="Введіть свій логін" />
                    <input className='input100' type='password' name='password' placeholder="Введіть свій пароль" />
                    <h4 className='register-text'>Немає аккаунту? <span className='register' onClick={() => {props.setLoginOpen(false); props.setRegisterOpen(true)}}>Зареєструйтеся</span></h4>
                    <input className='login-button' type='submit' value='Ввійти' />
                </div>
            </form>
        </div>
    )
}
