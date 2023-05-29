import { useState, useContext } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    async function register(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.status !== 200){
            alert('Registration failed')
        } else{
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        }
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }
    return(
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" 
                placeholder="username" 
                value={username} 
                onChange={ev => setUsername(ev.target.value)}></input>
            <input type="password" 
                placeholder="password"
                value={password} 
                onChange={ev => setPassword(ev.target.value)}></input>
            <button>Register</button>
        </form>
    )
}