import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import Register from "./components/register/Register";
import {useState} from "react";

function App() {

  return (
    <div className="App" >
      <LoginForm/>
      <Register/>
    </div>
  );
}

export default App;
