import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom'; 
import App1 from './app';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

import app from "./firebase";
import  * as firebase from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {browserSessionPersistence} from "firebase/auth";
import {setPersistence} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {browserLocalPersistence} from "firebase/auth";
import {Navigate} from "react-router-dom";

//const email="sukablya1111t@gmail.com"
//const password="1231456111"


function Loggin (auth, email, password)  
{
    setPersistence(auth, browserLocalPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}


function LogIn1(props){
  const navigate = useNavigate();
  return <div>
      <button className='button_navigate_login'
        onClick={() => {
          

          //Loggin(props.auth, props.email, props.password);
          //console.log(LogIn.LogIn);
        }} 
      >111</button>
  </div>;
}

class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.auth = getAuth();
        this.state = {value: ''};
        this.email="";
        this.password="";
        this.clicked = false;
        this.logloglog = this.logloglog.bind(this);
        this.znazenya = this.znazenya.bind(this);
        this.znazenya1 = this.znazenya1.bind(this);
        this.LogIn = this.LogIn.bind(this);

      }


logloglog() {console.log(this.email, this.password)};
znazenya(e) {this.email = e.target.value};
znazenya1(e) {this.password = e.target.value};

async LogIn () 

{
  await setPersistence(this.auth, browserLocalPersistence)
  .then(() => {
    return signInWithEmailAndPassword(this.auth, this.email, this.password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

  });

 //  signInWithEmailAndPassword(this.auth, this.email, this.password)
 // .then((userCredential) => {const user = userCredential.user; console.log(userCredential.user);})
 // .catch((error) => {const errorCode = error.code;const errorMessage = error.message;})
 if (this.state.clicked) { this.setState({ clicked: false }) } else { this.setState({ clicked: true }) };
}


//createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {const user = userCredential.user;}).catch((error) => {const errorCode = error.code;const errorMessage = error.message;})

render(){
  return(

    <div class="" > {this.state.clicked && <Navigate replace={true} to={"/main"} state={this.state}/>}
    <nav class="navbar bg-dark fixed-top" data-bs-theme="dark">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Тонко та зі смаком</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/singup">Регестрація</a>
                                    </li>
                                </ul>
                </div>
                
            </div>
        </nav>
    </nav>
    
    <div class="container-xxl flex-fill flex-grow"> 
    <div>123</div>
    <div>123</div>
    <div>123</div>
    <form className="form-1">
<p className="field">
<input type="text" name="login" placeholder="Емейл" onChange={(e) => (this.znazenya(e), this.logloglog())}/>
<i class="icon-user icon-large"></i>
</p>
<p class="field">
<input type="password" name="password" placeholder="Пароль" onChange={(e) => (this.znazenya1(e), this.logloglog())}/>
<i class="icon-lock icon-large"></i>
</p>      
<p className="submit">
<button type="button" name="submit" onClick={() => {this.LogIn();} }><i className="icon-arrow-right icon-large" ></i>Login</button>
</p>
</form>
    </div>
    </div>
);
}
}
export default LogIn;