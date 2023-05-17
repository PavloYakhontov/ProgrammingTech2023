import React, {useState} from 'react'
import axios from 'axios';
import {AiOutlineCloseCircle} from 'react-icons/ai';

export default function Register(props) {
    let [data, setData] = useState({});
    let [validation, setValidation] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if(validateForm(formData)){
            axios.post('http://pharmacy.com/api/register.php', formData)
            .then((response) => {
                setData(response.data);
                responseMessage(response);
            })
            .catch(function (error){
                let validationCopy = Object.assign({}, validation);
                validationCopy.message = "На сервері сталась невідома помилка.";
                validationCopy.visible = 1;
                setValidation(validationCopy);
            });
        }
    };

    const validateForm = (formData) => {
        const login = formData.get('login');
        const pass = formData.get('password');
        const conf = formData.get('confirm');
        const loginValidation = login.match(/^(?=.{8,24}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/);
        const passValidation = pass.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
        let validateStatus = false;
        let validateMessage = "";

        if(!loginValidation){
            validateMessage = "Недопустимий логін";
            setValidation({status: validateStatus, message: validateMessage, visible: 1});
            return false;
        }
        else if(!passValidation){
            validateMessage = "Пароль повинен мати мінімум 8 символів, 1 букву та 1 цифру";
            setValidation({status: validateStatus, message: validateMessage, visible: 1});
            return false;
        }
        else if(pass !== conf){
            validateMessage = "Паролі не співпадають";
            setValidation({status: validateStatus, message: validateMessage, visible: 1});
            return false;
        }

        validateStatus = 1;
        setValidation({status: validateStatus, message: validateMessage, visible: 0});
        return true;
    }

    const responseMessage = (response) => {
        let validationCopy = Object.assign({}, validation);
        if(response.status === 200 && response.data === ''){
            validationCopy.message = "Реєстрація успішна.";
            validationCopy.visible = 2;
            setValidation(validationCopy);
        }
        else if(response.data.includes('Duplicate')){
            validationCopy.message = "Користувач с таким логіном вже існує.";
            validationCopy.visible = 1;
            setValidation(validationCopy);
        }
    }

    return (
        <div className='register-full'>
            <form className='register-window' onSubmit={handleSubmit}>
                <AiOutlineCloseCircle className='close-icon' onClick={() => props.setRegisterOpen(false)}/>
                <div className='login-inputs'>
                    <h1>Реєстрація</h1>
                    <div className={validation.visible === 2 ? 'validation-succes' : validation.visible === 1 ? 'validation-fail' : 'validation-hidden'}>{validation.message}</div>
                    <input className='input100' type="text" name="login" placeholder="Придумайте логін" />
                    <input className='input100' type='password' name='password' placeholder="Придумайте пароль" />
                    <input className='input100' type='password' name='confirm' placeholder="Повторіть пароль" />
                    <h4 className='register-text'>Вже створили аккаунт? <span className='register' onClick={() => {props.setRegisterOpen(false);props.setLoginOpen(true)}}>Ввійти</span></h4>
                    <input className='login-button' type='submit' value='Зареєструватися' />
                </div>
            </form>
        </div>
    )
}
