import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Routes, BrowserRouter,Route} from 'react-router-dom'
import Chat from "./components/chat/Chat";
import LoginForm from "./components/LoginForm/LoginForm";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(

        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<App/>}/>
                <Route path ="/login" element={<LoginForm/>}/>
                <Route path ="/chat" element={<Chat/>}/>
            </Routes>
        </BrowserRouter>
);

