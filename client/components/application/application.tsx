import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ArticleRoutes} from "../articleRoutes";
import {ArticleContext} from "../article/articleContext";
import {LoginNavLink} from "../login/loginNavLink";
import {LoginContext} from "../login/loginContext";

export function Application(){

    const [username, setUsername] = useState("");

    async function loadUser(){
        const res = await fetch("/api/login");
        if (!res.ok){
            throw new Error("Something went wrong while fetching the user " + res.status + res.statusText);
        }
        const user = await res.json();
        setUsername(user.username);
    }

    useEffect(() => {
        loadUser();
    }, []);

    async function fetchArticles(){
        const res = await fetch("/api/articles");

        return res.json();
    }
    async function onNewArticle({ headline, article, category, author }){

        console.log(headline, article, category, author)
        await fetch("/api/articles", {
            method: "POST",
            body: JSON.stringify({ headline, article, category, author }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
    return (
        <LoginContext.Provider value={{ username, loadUser } }>
        <ArticleContext.Provider value={{ fetchArticles, onNewArticle }}>
            <header>
                <h1>News</h1>
            </header>
            <nav>
                <Link to={"/"}>Front Page</Link>
                <Link to={"/articles"}>Articles</Link>
                <Link to={"/articles/new"}>Add Articles</Link>
                <LoginNavLink />
            </nav>
            <main>
                <ArticleRoutes />
            </main>
        </ArticleContext.Provider>
        </LoginContext.Provider>
    );
}