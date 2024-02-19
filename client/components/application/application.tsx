import React from "react";
import {Link} from "react-router-dom";
import {ArticleRoutes} from "../articleRoutes";

export function Application(){
    return (
        <>
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
        </>
    );
}