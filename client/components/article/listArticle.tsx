import React, {useContext, useEffect, useState} from "react";
import {ArticleContext} from "./articleContext";
import {LoginContext} from "../login/loginContext";
import {Login} from "../login/login";

interface Article{
    _id: any;
    headline: string;
    article: string;
    category: string;
    author: string;
}
export function ListArticle(){
    const [articles, setArticles] = useState<Array<Article>>([]);
    const [loading, setLoading] = useState(true);
    const { username } = useContext(LoginContext);

    const { fetchArticles } = useContext(ArticleContext);


    async function loadArticles(){
        setLoading(true);
        try{
            setArticles(await fetchArticles());
        }catch (err){
            console.log("FUCK!");
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const webSocket = new WebSocket(window.location.origin.replace(/^http/, "ws"));
        webSocket.onmessage = (event) => {
            console.log(event.data);
            setTimeout(() => {
                loadArticles();
            }, 250);
        };
        loadArticles();
    }, []);
    if(username){
        return (
            <>
                {loading && <div>Spinner</div>}
                {articles.map((a) => (
                    <div key={a._id}>
                        {a.headline} {a.article} {a.author} {a.category}
                    </div>
                ))}
            </>
        );
    } else{
        return (
            <div>
                <h3>Please log in to read articles</h3><br/>
                <Login />
            </div>
        );
    }
}