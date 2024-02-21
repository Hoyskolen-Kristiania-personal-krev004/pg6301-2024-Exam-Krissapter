import React, {useContext, useEffect, useState} from "react";
import {ArticleContext} from "./articleContext";
import {LoginContext} from "../login/loginContext";
import {Login} from "../login/login";

export function AddArticle(){
    const [headline, setHeadline] = useState("");
    const [article, setArticle] = useState("");
    const [category, setCategory] = useState("Tech");
    const [author, setAuthor] = useState("");
    const [webSocket, setWebsocket] = useState<WebSocket>();
    const { username } = useContext(LoginContext);

    const { onNewArticle } = useContext(ArticleContext);

    async function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();

        webSocket?.send("New Article Added");
        await onNewArticle({ headline, article, category, author });
    }
    useEffect(() => {
        setAuthor(username);
        setWebsocket(new WebSocket(window.location.origin.replace(/^http/, "ws")));
    }, []);
    if(username){
        return(
            <form onSubmit={handleSubmit}>
                <h1>Add Article</h1>
                <div>
                    Headline:<br/>
                    <input value={headline} onChange={(e) => setHeadline(e.target.value)} required/><br/>
                    Article:<br/>
                    <textarea value={article} onChange={(e) => setArticle(e.target.value)} required/><br/>
                    Category:<br/>
                    <select name={category} defaultValue={"Tech"} onChange={(e) => setCategory(e.target.value)} >
                        <option value={"Tech"}>Tech</option>
                        <option value={"Literature"}>Literature</option>
                        <option value={"World"}>World</option>
                    </select><br/>
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        );
    } else {
        return (
            <div>
                <h3>Please log in to add articles</h3><br/>
                <Login />
            </div>
        );
    }

}