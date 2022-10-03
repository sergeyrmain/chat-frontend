import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import Chatlist from "../ChatList/Chatlist";



export default function Chat()
{
    const [current_user, setUser] = useState('');
    const nav = useNavigate();

    useEffect(() =>{
        getCurrentUser()

    },[])

    async function logout() {
        const token = localStorage.getItem("token");
        const res = await fetch(
            `/api/logout?form_token=${token}`,
            {
                method: 'post',

            }
        );
        if (res.status === 200) {
            localStorage.removeItem("token");
            nav('/');
        }
    }



    async function getCurrentUser() {
        const token = localStorage.getItem("token");
        const res2 = await fetch(
            `/api/get_current_user`,
            {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        const  username = await res2.json();
        const user = username['detail']
        setUser(user);
        return user;
    }

        return <div>
        <h1>Chat</h1>
            <h3>welcome {current_user}</h3>
            <Chatlist {...{current_user}}/>
            <button  onClick ={() => logout()}>logout</button>
    </div>
}