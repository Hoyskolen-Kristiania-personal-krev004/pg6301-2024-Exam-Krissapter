import React from "react";

export const ArticleContext = React.createContext({
  fetchArticles: async () => [],
  onNewArticle: async ({
    headline,
    article,
    category,
    author,
  }: {
    headline: any;
    article: any;
    category: any;
    author: any;
  }) => {},
});
