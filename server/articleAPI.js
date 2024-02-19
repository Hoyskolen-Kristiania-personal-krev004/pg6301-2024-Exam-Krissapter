import express from "express";

export const articleAPI = express.Router();

export function createArticleRouter(db){

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