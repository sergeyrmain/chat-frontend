import './LoginForm.css'
import React, {useState} from "react";
import {useNavigate} from "react-router";

export default function LoginForm(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();


    async function login() {

        const fd = new FormData()
        fd.append('username', username)
        fd.append('password', password)
        try{
            const response = await fetch(
                `/api/token`,
                {
                    method: 'post',

                    body: fd
                }
            );
            if(response.status == 200)
            {
                const tokenResult = await response.json()
                const token = tokenResult['access_token']
                localStorage.setItem("token", token);
                nav('/chat')
            }
        }
        catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }

    return <div>
        <input type="text" placeholder="Enter your username" required value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password"  placeholder="Enter your password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick ={() => login()}>
            login
        </button>

    </div>
}