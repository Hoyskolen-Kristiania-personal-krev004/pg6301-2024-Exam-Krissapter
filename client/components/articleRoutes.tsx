import React from "react";
import {Route, Routes} from "react-router-dom";
import {ListArticle} from "./article/listArticle";
import {AddArticle} from "./article/addArticle";
import {Login} from "./login/login";
import {ProfilePage} from "./profile/profilePage";
import {LoginCallBack} from "./login/loginCallBack";
import {FrontPage} from "./article/frontPage";

export function ArticleRoutes(){
    return(
        <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route path={"/articles"} element={<ListArticle />} />
            <Route path={"/articles/new"} element={<AddArticle />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/login/callback"} element={<LoginCallBack />} />
            <Route path={"/profile"} element={<ProfilePage />} />
            <Route path={"*"} element={<h2>Page not Found</h2>} />
        </Routes>
    );
}