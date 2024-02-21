import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../login/loginContext";
import {useNavigate} from "react-router-dom";

interface Article{
    id: any;
    headline: string;
    article: string;
    category: string;
    author: string;
}

export function ProfilePage(){
    const [articles, setArticles] = useState<Array<Article>>([]);
    const [loading, setLoading] = useState(true);
    const { username, loadUser } = useContext(LoginContext);
    const navigate = useNavigate();


    async function getAuthoredArticles(){
        const res = await fetch(`api/articles/${username}`);

        return res.json();
    }

    async function loadArticles(){
        setLoading(true);
        try{
            setArticles(await getAuthoredArticles());
        }catch (err){
            console.log("FUCK!");
        }finally {
            setLoading(false);
        }
    }

    async function handleLogout(e: React.SyntheticEvent){
        e.preventDefault();

        const res = await fetch("/api/login", { method: "DELETE" });

        if (!res.ok){
            throw new Error("Failed to log out " + res.status + " " + res.statusText);
        }
        await loadUser();
        navigate("/");
    }
    useEffect(() => {
        loadArticles();
        }
    )
    return(
        <>
            <h2>{ username }</h2>
            {loading}
            {articles.map((a) => (
                <div key={a.id}>
                    {a.headline} {a.article} {a.author} {a.category}
                </div>
            ))}
            <form onSubmit={handleLogout}>
                <button>Log Out</button>
            </form>
        </>
    )
}