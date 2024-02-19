import React from "react";
import {Link} from "react-router-dom";
import {ArticleRoutes} from "../articleRoutes";
import {ArticleContext} from "../article/articleContext";

export function Application(){

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
            },
        });
    }
    return (
        <ArticleContext.Provider value={{ fetchArticles, onNewArticle }}>
            <header>
                <h1>News</h1>
            </header>
            <nav>
                <Link to={"/"}>Front Page</Link>
                <Link to={"/articles"}>Articles</Link>
                <Link to={"/articles/new"}>Add Articles</Link>
                <Link to={"/login"}>Login</Link>
            </nav>
            <main>
                <ArticleRoutes />
            </main>
        </ArticleContext.Provider>
    );
}