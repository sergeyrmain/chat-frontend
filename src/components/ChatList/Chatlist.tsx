import {useEffect, useReducer, useState} from "react";
import ChatWindow from "../ChatWindow/ChatWindow";

export default function Chatlist(props: any)
{
    let [chatlist, setChatlist] = useState([]);
    let [active, setActive] = useState(null);

    useEffect(() =>{
        getChatList()

    },[props['current_user']])

    async function getChatList() {
            if(props['current_user']) {
                const token = localStorage.getItem("token");
                const res = await fetch(
                    `/api/chats?userName=${props['current_user']}`,
                    {
                        method: 'get',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                const json_res = await res.json();
                setChatlist(json_res);
                setActive(json_res[0].chat_id);
                console.log(json_res, 'res')
                return json_res;
            }

    }

    function handleClick(id: any) {
        setActive(id);
    }



    return <div>
        <h4>your Chats</h4>
        <div>
            <ul>
                {chatlist.map((chat: any) => (
                    <button key={chat.chat_id} onClick={() => handleClick(chat.chat_id) }>{chat.user_name} </button>
                ))}
                <ChatWindow {...{active, sender: props['current_user']}}/>
            </ul>
        </div>
    </div>
}