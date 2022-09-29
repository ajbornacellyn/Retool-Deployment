import logo from './assets/images/logoRetool.png';
import './App.css';
import Auth from "./components/Auth";
import Menu from "./components/Menu"

import {BrowserRouter, Routes, Route} from "react-router-dom"

import { Box, Typography, TextField, Button } from "@mui/material";

import { ReactSession } from 'react-client-session';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      
      {ReactSession.get("user")? <Menu/> : <Auth/>}
      
      
    </div>
  );
}

export default App;
