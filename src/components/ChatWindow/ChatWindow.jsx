import {useEffect, useState} from "react";

export default function ChatWindow(props) {
    const [ws, setWebsckt] = useState();
    let [messages, setMessages] = useState([]);
    let [messageToSend, setMessageToSend] = useState({message: '', sender: '', receiver: '' , chat_id: ''});

    useEffect(() => {
        console.log('messages')
        getMessages()
        createWebScket()


    }, [props['active']])


    function createWebScket() {
            const url = `ws://localhost:8000/ws/2/`;
            const wsin = new WebSocket(url);

            wsin.onopen = (event) => {
                wsin.send("Connect");
            };

            // recieve message every start page
            wsin.onmessage = (e) => {
                const message = JSON.parse(e.data);
                setMessages([...messages, message]);
            };

            setWebsckt(wsin);
            //clean up function when we close page
            return () => wsin.close();

    }
    async function getMessages() {
        if(props['active']) {
            // setMessages([]);
            const token = localStorage.getItem("token");
            const res = await fetch(
                `/api/messages?chatId=${props['active']}`,
                {
                    method: 'get',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const json_res = await res.json();
            setMessages(json_res);
            return json_res;
        }
    }

    async function sendMessage() {
        console.log(ws)
        if(ws!==undefined) {
            console.log('sendMessage')
            console.log(messageToSend.message);
            console.log(messages)
            let old_messages = messages;
            let new_message = {
                chat_id: messageToSend.chat_id,
                sender: messageToSend.sender,
                receiver: messageToSend.receiver,
                message: messageToSend.message,
                message_time: new Date().getTime()
            }
            old_messages.push(new_message);
            setMessages(old_messages);
            console.log(messages)
            //getMessages();

            ws.send(JSON.stringify(messageToSend));
            setMessageToSend({message: '', sender: '', receiver: '', chat_id: ''});
        }
    }

    function TimestampToTime(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }



    return <div>
        <ul>
            {messages.map((message) => (
                <div>
                    <h6 key={message.id+message.message_time}>{TimestampToTime(message.message_time)}</h6>
                    <h4 key={message.id}>[{message.sender}] {message.message} </h4>

                </div>
            ))}
            <input type="text"  id="messageText" placeholder="Message...." required value={messageToSend.message} onChange={(e)=>setMessageToSend({message: e.target.value, sender: props['sender'], receiver: messages[0]['sender'] === props['sender'] ? messages[0]['receiver']:messages[0]['sender'], chat_id: messages[0]['chat_id']})}/>
            <button onClick ={() => sendMessage()}>send</button>
        </ul>

    </div>

}