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
import {Navigate} from "react-router-dom";

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

class Singup extends React.Component {

    constructor(props) {
        super(props);
        this.clicked = false;
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

async regestration () 
{ 
  await createUserWithEmailAndPassword(this.auth, this.email, this.password)
  .then((userCredential) => {const user = userCredential.user; if (this.state.clicked) { this.setState({ clicked: false }) } else { this.setState({ clicked: true }) };})
  .catch((error) => {const errorCode = error.code;const errorMessage = error.message;
  console.log("aaa");})
}


//createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {const user = userCredential.user;}).catch((error) => {const errorCode = error.code;const errorMessage = error.message;})



render()    
{
const { navigation } = this.props;
return(
    
        <div> 
          <div class="" > {this.state.clicked && <Navigate replace={true} to={"/login"} state={this.state}/>}</div>
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
                                        <a class="nav-link active" aria-current="page" href="/login">В логін</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </nav>
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
    <button type="button" name="submit" onClick={() => {this.regestration()} }><i className="icon-arrow-right icon-large" ></i>Creata account</button>
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