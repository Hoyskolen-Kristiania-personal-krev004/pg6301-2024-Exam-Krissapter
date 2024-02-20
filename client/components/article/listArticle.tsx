import React, {useContext, useEffect, useState} from "react";
import {ArticleContext} from "./articleContext";
interface Article{
    id: any;
    headline: string;
    article: string;
    category: string;
    author: string;
}
export function ListArticle(){
    const [articles, setArticles] = useState<Array<Article>>([]);
    const [loading, setLoading] = useState(true);

    const { fetchArticles } = useContext(ArticleContext);


    async function loadArticles(){
        setLoading(true);
        setArticles(await fetchArticles());
        setLoading(false);
    }

    useEffect(() => {
        loadArticles();
    }, []);
    return(
        <>
            {loading && <div>Spinner</div>}
            {articles.map((a) => (
                <div key={a.id}>
                    {a.headline} {a.article} {a.author} {a.category}
                </div>
            ))}
        </>
    );
}