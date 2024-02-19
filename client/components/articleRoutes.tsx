import React from "react";
import {Route, Routes} from "react-router-dom";

export function ArticleRoutes(){
    return(
        <Routes>
            <Route path={"/"} element={<h2>Front Page</h2>} />
            <Route path={"/articles"} element={<h2>Hello</h2>} />
            <Route path={"/articles/new"} element={<h2>World</h2>} />
            <Route path={"/login"} element={<h2>Not here yet</h2>} />
            <Route path={"*"} element={<h2>Page not Found</h2>} />
        </Routes>
    );
}