import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";


export default function About() {
  const{userInfo, setUserInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
          setUserInfo(userInfo);
      });
    });
  }, []);
  const username = userInfo?.username;
    return (
    <>
    <div className='About'>
        <h1>Welcome to EpicChess</h1>
        <div className='image'>
          <img src="https://miro.medium.com/v2/resize:fit:1400/1*KytpdjnlyeaJoUMnnD-iCA.jpeg" alt=""></img>
        </div>
        {!username && (
        <p>This website allows you to play chess. You have to be logged in to play</p>
        )}
        {username && (
        <><p>This website allows you to play chess. Enjoy playing</p>
        <Link to='/play'>Play</Link></>
        )}
      </div>
    </>
      );
}