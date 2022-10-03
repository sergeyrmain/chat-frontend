import {useEffect, useState} from "react";

export default function ChatWindow(props: any) {
    let [messages, setMessages] = useState([]);
    let [messageToSend, setMessageToSend] = useState({message: '', sender: '', receiver: '' , chat_id: ''});


    useEffect(() => {
        getMessages()

    }, [props['active']])

        async function getMessages() {
        console.log('----props----', props['sender'])
        if(props['active']) {
            setMessages([]);
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
            console.log(messages);
            return json_res;
        }
    }

    function TimestampToTime(timestamp: any) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }

    async function sendMessage() {
        console.log(messageToSend);
        const body = messageToSend;
        const token = localStorage.getItem("token");
        const res = await fetch(
            `/api/messages`,
            {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)

                });
        const json_res = await res.json();
        console.log(json_res);
        await getMessages();
        messageToSend['message'] = '';
            }


    return <div>
        <ul>
            {messages.map((message: any) => (
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