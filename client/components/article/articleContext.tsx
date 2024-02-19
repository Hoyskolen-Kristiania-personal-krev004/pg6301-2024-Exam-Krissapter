import React from "react";

export const ArticleContext = React.createContext({
    fetchArticles: async () => [],
    onNewArticle: async (article) => {}
});