import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom'; 
import App1 from './app';
import Login from './Login';
import PrivateRoute from './PrivateRoute';


import app from "./firebase";
import  * as firebase from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Singup from './Singup';
import PhoneBook from './telefonchiki';
import { BrowserRouter } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

//const email="test1111t@gmail.com"
//const password="1231456111"

render(<App1/>, document.getElementById("App"));  



/*
//createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {const user = userCredential.user;}).catch((error) => {const errorCode = error.code;const errorMessage = error.message;})
const start =(
    <div>
    <button type="submit"   
    //</div>  
    //onClick={logloglog} 
    //onClick ={(e) => (logloglog())}
    onClick={() => regestration()}
    >Prikol </button>
    <h1>Sing up</h1>
    <form>
        <label>
        Email
        <input name="email" type="email" placeholder="Email" onChange={(e) => (znazenya(e), logloglog())}/>
        </label>
        <label>
        Password
        <input name="password" type="password" placeholder="Password" onChange={(e) => (znazenya1(e), logloglog())} /> 
        </label>
        <button type="submit">Sing up</button>
    </form>
    </div>
);
//export default Singup();

let whatIneedRender = <Singup/> 
export default whatIneedRender

function setRender (_whatIneedRender) {whatIneedRender = _whatIneedRender}
export {setRender}

let email=""
let password=""
function logloglog() {console.log(email, password)};
function znazenya(e) {email = e.target.value};
function znazenya1(e) {password = e.target.value};
const auth = getAuth();

function regestration () 
{
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {const user = userCredential.user;})
  .catch((error) => {const errorCode = error.code;const errorMessage = error.message;})
}
*/
