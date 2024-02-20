import React, {useContext, useEffect, useState} from "react";
import {ArticleContext} from "./articleContext";
import {LoginContext} from "../login/loginContext";
import {Login} from "../login/login";

interface Article{
    id: any;
    headline: string;
    article: string;
    category: string;
    author: string;
}
export function ListArticle(){
    const [articles, setArticles] = useState<Array<Article>>([]);
    const [loading, setLoading] = useState(true);
    const [websocket, setWebsocket] = useState<WebSocket>();
    const { username } = useContext(LoginContext);

    const { fetchArticles } = useContext(ArticleContext);


    async function loadArticles(){
        setLoading(true);
        setArticles(await fetchArticles());
        setLoading(false);
    }

    useEffect(() => {
        const webSocket = new WebSocket(window.location.origin.replace(/^http/, "ws"));
        webSocket.onmessage = (event) => {
            console.log(event.data);
            setTimeout(() => {
                loadArticles();
            }, 250);
        };
        setWebsocket(webSocket);
        loadArticles();
    }, []);
    if(username){
        return (
            <>
                {loading && <div>Spinner</div>}
                {articles.map((a) => (
                    <div key={a.id}>
                        {a.headline} {a.article} {a.author} {a.category}
                    </div>
                ))}
            </>
        );
    } else{
        return (
            <Login />
        );
    }
}