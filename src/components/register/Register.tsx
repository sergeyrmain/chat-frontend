import {useState} from "react";


export default function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    async function register() {
        console.log(username)
        console.log(password)
        const body = {'userName': username, 'userPassword': password}
        const fd = new FormData()
        fd.append('userName', username)
        fd.append('userPassword', password)
        try{
            const res = await fetch(
                `http://localhost:8000/users/register`,
                {
                    method: 'post',
                    body: JSON.stringify(body)
                }
            );
            console.log('result is: ', JSON.stringify(res))
        }
        catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }

    return <div>
        <input type="text" placeholder="Enter your username" required value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password"  placeholder="Enter your password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick ={() => register()}>
            register
        </button>
    </div>


}

