import express from "express";

export const articleAPI = express.Router();

const ARTICLES = [
    {
        id: 1,
        headline: "MERGE CONFLICT",
        article: "Local student causes merge conflict, millions dead.",
        category: "Tech",
        author: "Test Testsson"
    },
    {
        id: 2,
        headline: "MAJOR BREAKTHROUGH",
        article: "Monkey on typewriter finally decodes lorem ipsum, leaving researchers baffled",
        category: "Literature",
        author: "Chimp McNotAMonkey"
    },
    {
        id: 3,
        headline: "PARCEL ISSUES",
        article: "Parcel kidnapped and refuses to install, gyp ERR suspected culprit",
        category: "Tech",
        author: "Test Testsson"
    },
    {
        id: 4,
        headline: "LOREM IPSUM",
        article: "Lorem Ipsum Dolores etc",
        category: "World",
        author: "Printing Press"
    }
];

articleAPI.get("/api/articles/", (req, res) => {
    res.json(ARTICLES);
});

articleAPI.post("/api/articles", (req, res) => {
    const { headline, article, category, author } = req.body;
    ARTICLES.push({ headline, article, category, author, id: ARTICLES.length });
    res.sendStatus(204);
});