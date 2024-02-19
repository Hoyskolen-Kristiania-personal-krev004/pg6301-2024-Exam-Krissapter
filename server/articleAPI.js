import express from "express";

export const articleAPI = express.Router();

export function createArticleRouter(db){
    /*const ARTICLES = [
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
    ];*/

    articleAPI.get("/api/articles/", async (req, res) => {
        const articles = await db.collection("articles").find().limit(40).toArray();
        res.json(articles);
    });

    articleAPI.post("/api/articles", async (req, res) => {
        const { headline, article, category, author } = req.body;
        await db.collection("articles").insertOne({ headline, article, category, author });
        //ARTICLES.push({ headline, article, category, author, id: ARTICLES.length });
        res.sendStatus(204);
    });
}