import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        const res = await fetch("/api/login", {
           method: "POST",
           body: JSON.stringify({username, password}),
           headers: {
               "Content-Type": "application/json"
           }
        });
        if (!res.ok){
            throw new Error("Something went wrong " + res.statusText);
        }
        navigate("/");
    }
    return(
        <form onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <div>
                Username:<br/>
                <input type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                Password:<br/>
                <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button>Log In</button>
        </form>
    );
}