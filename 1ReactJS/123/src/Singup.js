import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom'; 
import App1 from './app';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

import app from "./firebase";
import  * as firebase from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import setRender from './index.js';
import PhoneBook from './telefonchiki';
import { redirect } from 'react-router';
import {HiUserRemove} from 'react-icons/hi';

//const email="sukablya1111t@gmail.com"
//const password="1231456111"

import { useNavigate } from "react-router-dom";

function Regestration () {
    let a = () => {createUserWithEmailAndPassword(this.auth, this.email, this.password)
    .then((userCredential) => {const user = userCredential.user;})
    .catch((error) => {const errorCode = error.code;const errorMessage = error.message;})}

    const navigate = useNavigate();
    return <div>
         <button
          onClick={async event => {a(); navigate(`/main`);
          }
        }
        >Create account</button>
    </div>; 
  }
  function Regestration2 () {
    const navigate = useNavigate();
    navigate(`/login`);
    redirect(`/login`);
  }

function Old(){
    const navigate = useNavigate();
    return <div>
        <button className='button_navigate_login'
          onClick={async event => {
            navigate(`/login`);
          }}
        >Go to login page</button>
    </div>;
}

class Singup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.email="";
        this.password="";
        this.logloglog = this.logloglog.bind(this);
        this.znazenya = this.znazenya.bind(this);
        this.znazenya1 = this.znazenya1.bind(this);
        this.regestration = this.regestration.bind(this);
        this.auth = getAuth();
      }


logloglog() {console.log(this.email, this.password)};
znazenya(e) {this.email = e.target.value};
znazenya1(e) {this.password = e.target.value};

regestration () 
{ 
  createUserWithEmailAndPassword(this.auth, this.email, this.password)
  .then((userCredential) => {const user = userCredential.user;})
  .catch((error) => {const errorCode = error.code;const errorMessage = error.message;
  console.log("aaa"); Regestration2()})
}


//createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {const user = userCredential.user;}).catch((error) => {const errorCode = error.code;const errorMessage = error.message;})



render()    
{
const { navigation } = this.props;
return(
    
        <div class="container-xxl flex-fill flex-grow"> 
        <Old/>
        <form className="form-1">
<p className="field">
    <input type="text" name="login" placeholder="Логин или емэйл" onChange={(e) => (this.znazenya(e), this.logloglog())}/>
    <i class="icon-user icon-large"></i>
</p>
    <p class="field">
    <input type="password" name="password" placeholder="Пароль" onChange={(e) => (this.znazenya1(e), this.logloglog())}/>
    <i class="icon-lock icon-large"></i>
</p>      
<p className="submit">
    <button type="button" name="submit" onClick={() => {this.regestration(); redirect("/main")} }><i className="icon-arrow-right icon-large" ></i>Creata account</button>
</p>
</form>
        </div>
    );
}
}
export default Singup;

//<button type="submit"   
//</div>  
//onClick={logloglog} 
//onClick ={(e) => (logloglog())}
//onClick={() => this.regestration()}
//>Prikol </button>

//<center>
//<HiUserRemove/>
//<h1 className='singUpPanel'>Sing up</h1>
//  <h2 className='inputMail'>
//  <label>Email:</label>
//    <input name="email" type="email" placeholder="Email" onChange={(e) => (this.znazenya(e), this.logloglog())} size={5} />
//  </h2>
//  <label>
//  Password
//  <input name="password" type="password" placeholder="Password" onChange={(e) => (this.znazenya1(e), this.logloglog())} className='inputPass' /> 
//  </label>
//  <button className='gay' type="submit" onClick={() => {this.regestration(); redirect("/main")} }>Create account</button>
//  </center>