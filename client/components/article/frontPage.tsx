import React, { useContext, useEffect, useState } from "react";
import { ArticleContext } from "./articleContext";
interface Article {
  id: any;
  headline: string;
  category: string;
}
export function FrontPage() {
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [articles, setArticles] = useState<Array<Article>>([]);
  const [loading, setLoading] = useState(true);
  const { fetchArticles } = useContext(ArticleContext);

  async function loadArticles() {
    setLoading(true);
    setArticles(await fetchArticles());
    setLoading(false);
  }
  useEffect(() => {
    const webSocket = new WebSocket(
      window.location.origin.replace(/^http/, "ws"),
    );
    webSocket.onmessage = (event) => {
      console.log(event.data);
      setTimeout(() => {
        loadArticles();
      }, 250);
    };
    setWebsocket(webSocket);
    loadArticles();
  }, []);
  return (
    <>
      {loading && <div>Spinner</div>}
      {articles.map((a) => (
        <div key={a.id}>
          <h2>
            {a.category}: {a.headline}
          </h2>
        </div>
      ))}
    </>
  );
}
