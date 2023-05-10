import React from "react";
import app from "./firebase";
import  * as firebase from "firebase/auth";
import {AuthContext} from "./auth";
import { HiUserRemove } from "react-icons/hi";
import {HiUserAdd} from 'react-icons/hi';
import bootstrap from 'bootstrap'


const home = () => { 
  return (
    <div className="container">
<form className="form-1">
<p className="field">
    <input type="text" name="login" placeholder="Логин или емэйл"/>
    <i class="icon-user icon-large"></i>
</p>
    <p class="field">
    <input type="password" name="password" placeholder="Пароль"/>
    <i class="icon-lock icon-large"></i>
</p>      
<p class="submit">
    <button type="submit" name="submit"><i className="icon-arrow-right icon-large"></i></button>
</p>
</form>

</div>);
}

export default home;

/*
<div className="container">
<div className="text-danger">100% wide until small breakpoint</div>
      <h1>Home</h1>
      <HiUserRemove scale="5" width={"50"} size="50px"/>
        <HiUserAdd scale="5" width={"50"} size="50px"/>
      <button onClick={() => firebase.getAuth(app).signOut()}>Sign out</button>
      <button onClick={() => console.log(app, AuthContext)}>AUF</button>
    </div>
*/