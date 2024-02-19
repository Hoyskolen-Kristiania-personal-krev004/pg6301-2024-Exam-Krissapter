import React from "react";
import {Route, Routes} from "react-router-dom";
import {ListArticle} from "./article/listArticle";
import {AddArticle} from "./article/addArticle";
import {Login} from "./login/login";

export function ArticleRoutes(){
    return(
        <Routes>
            <Route path={"/"} element={<h2>Front Page</h2>} />
            <Route path={"/articles"} element={<ListArticle />} />
            <Route path={"/articles/new"} element={<AddArticle />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"*"} element={<h2>Page not Found</h2>} />
        </Routes>
    );
}