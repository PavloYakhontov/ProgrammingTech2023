import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home">
      <h1>Flappy Bird</h1>
      <button><Link to="/game">Играть</Link></button>
      <br />
      <button><Link to="/login">Вход</Link></button>
    </div>
  );
};

export default HomePage;
