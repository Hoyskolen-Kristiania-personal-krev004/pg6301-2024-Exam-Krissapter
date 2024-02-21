import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArticleRoutes } from "../articleRoutes";
import { ArticleContext } from "../article/articleContext";
import { LoginNavLink } from "../login/loginNavLink";
import { LoginContext } from "../login/loginContext";
import "../../App.css";

export function Application() {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const GOOGLE_CLIENT_ID =
    "1012467571987-l81oipbjpa6tg3qmkk0jge7vorfrjsau.apps.googleusercontent.com";

  async function loadUser() {
    const res = await fetch("/api/login");
    if (!res.ok) {
      throw new Error(
        "Something went wrong while fetching the user " +
          res.status +
          res.statusText,
      );
    }
    const user = await res.json();
    setUsername(user.username);
    setUser(user);
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function fetchArticles() {
    const res = await fetch("/api/articles");

    return res.json();
  }
  async function onNewArticle({
    headline,
    article,
    category,
    author,
  }: {
    headline: any;
    article: any;
    category: any;
    author: any;
  }) {
    await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({ headline, article, category, author }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      if (!response.ok) {
        alert("That headline already exists");
      }
    });
  }
  return (
    <LoginContext.Provider
      value={{ username, user, loadUser, client_id: GOOGLE_CLIENT_ID }}
    >
      <ArticleContext.Provider value={{ fetchArticles, onNewArticle }}>
        <div className={"container"}>
          <header>
            <h1>News</h1>
          </header>
          <nav>
            <Link to={"/"}>Front Page</Link>
            <br />
            <Link to={"/articles"}>Articles</Link>
            <br />
            <Link to={"/articles/new"}>Add Articles</Link>
            <br />
            <LoginNavLink />
          </nav>
          <main>
            <ArticleRoutes />
          </main>
        </div>
      </ArticleContext.Provider>
    </LoginContext.Provider>
  );
}
