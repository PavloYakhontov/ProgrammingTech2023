import React from 'react';
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { render } from 'react-dom'; 
import { AuthProvider } from './auth';
import Singup from './Singup';
import PhoneBook from './telefonchiki';

const App1 = ()  => {
  return (
    <div className='vxid'>
    <Router>
    <Routes>
      <Route exact path="/singup" element={<Singup/>} />
      <Route exact path="/" element={<Singup/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/main" element={<PhoneBook/>} />
    </Routes>
    </Router>
    </div>
  );
};

export default App1;

//      <Route exact path="/" element={<Home/>} />
//<Route exact path="/login" element={<Login/>} />