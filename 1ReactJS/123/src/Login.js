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

//const email="sukablya1111t@gmail.com"
//const password="1231456111"

function Old(){
    const navigate = useNavigate();
    return <div>
        <button
          onClick={async event => {
            navigate(`/main`);
          }}
        >Go to main</button>
    </div>;
}

class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.email="";
        this.password="";
        this.logloglog = this.logloglog.bind(this);
        this.znazenya = this.znazenya.bind(this);
        this.znazenya1 = this.znazenya1.bind(this);
        this.LogIn = this.LogIn.bind(this);
        this.auth = getAuth();
      }


logloglog() {console.log(this.email, this.password)};
znazenya(e) {this.email = e.target.value};
znazenya1(e) {this.password = e.target.value};

LogIn () 
{
    setPersistence(this.auth, browserSessionPersistence)
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
}


//createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {const user = userCredential.user;}).catch((error) => {const errorCode = error.code;const errorMessage = error.message;})

render(){
return(
        <div class="bg-success">
        <Old/>
        <button type="submit"   
        //</div>  
        //onClick={logloglog} 
        //onClick ={(e) => (logloglog())}
        onClick={() => this.LogIn()}
        >Prikol12312 </button>
        <h1>Log In</h1>
        <form>
            <label>
            Email
            <input name="email" type="email" placeholder="Email" onChange={(e) => (this.znazenya(e), this.logloglog())}/>
            </label>
            <label>
            Password
            <input name="password" type="password" placeholder="Password" onChange={(e) => (this.znazenya1(e), this.logloglog())} /> 
            </label>
            <button type="submit">Log In</button>
        </form>
        </div>
    );
}
}
export default LogIn;