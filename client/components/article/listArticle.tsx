import React, { useEffect, useState} from "react";

export function ListArticle(){
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);




    async function loadArticles(){
        const res = await fetch("/api/articles");

        setLoading(true);
        setArticles(await res.json());
        setLoading(false);
    }

    useEffect(() => {
        loadArticles();
    }, []);
    return(
        <>
            {articles.map((a) => (
                <div key={a.id}>
                    {a.headline} {a.article} {a.author} {a.category}
                </div>
            ))}
        </>
    );
}